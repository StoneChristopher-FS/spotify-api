const express = require('express');
const app = express();
const axios = require('axios');
const qs = require('qs');
const randomString = require('randomstring');
const SpotifyWebApi = require('spotify-web-api-node');
const Token = require('../models/token');

require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET= process.env.CLIENT_SECRET;
const REDIRECT_URI= process.env.REDIRECT_URI;
const now = new Date().getTime();

const updateToken = async (data) => {
    return await Token.findOneAndUpdate({}, data)
}

const status = async (req, res, next) => {
    const token = await Token.findOne();
    const valid = (token != null && token.expires_in > now) ? true 
    : app.get('/refresh', async (req, res) => {
        const token = await Token.findOne({});
    
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        })
        .then(response => {
            console.log('Token expired.... retrieving new token')
            const data = response.data;
            const updatedToken = {
                access_token: data.access_token,
                token_type: data.token_type,
                scope: data.scope,
                expires_in: now + data.expires_in
            }
            res.send(data)
            updateToken(updatedToken);
        })
        .catch(err => {
            res.send(err);
        })
    })
    req.valid = valid;
    next();
}

app.get('/login', async (req, res) => {
    const state = randomString.generate(16);
    const scope = 'user-read-private'

    res.redirect('https://accounts.spotify.com/authorize?' + 
    qs.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
    }));
});

app.get('/auth', status, async (req, res) => {
    let token = await Token.findOne({});
    const code = req.query.code || null;
    
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        }
    })
    .then(response => {
        const data = response.data
        if(response.status === 200) {
            // Test to show account info with using API and access token
            axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `${data.token_type} ${data.access_token}`
                }
            })
            .then(response => {
                res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
            })
            .catch(err => {
                res.send(err)
            })
            if(token === null) {
                const createToken = new Token ({
                    access_token: data.access_token,
                    token_type: data.token_type,
                    scope: data.scope,
                    expires_in: now + data.expires_in,
                    refresh_token: data.refresh_token
                })
                token = createToken;
                token.save();
            } else {
                const updatedToken = {
                    access_token: data.access_token,
                    token_type: data.token_type,
                    scope: data.scope,
                    expires_in: now + data.expires_in,
                    refresh_token: data.refresh_token
                }
                updateToken(updatedToken);
            }
        } else {
            res.send(response);
        }
    })
    .catch(err => {
        res.send(err);
    })
});

module.exports = app;