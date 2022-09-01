const express = require('express');
const app = express();
const axios = require('axios');
const qs = require('qs');
const randomString = require('randomstring');
const SpotifyWebApi = require('spotify-web-api-node');
const Token = require('../models/token');

require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const now = Math.floor(Date.now() / 1000);

const updateToken = async (data) => {
    return await Token.findOneAndUpdate({}, data)
}

const status = async (req, res, next) => {
    const token = await Token.findOne({});
    const valid = (token != {} && token.expires_in > now)
    if (valid) {
        req.token = token;
    } else {
        await axios({
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
            updateToken(updatedToken);
            req.token = updatedToken;
        })
        .catch(err => {
            res.redirect('http://localhost:3000');
        })
    }
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

app.get('/auth', async (req, res) => {
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
            res.redirect('http://localhost:3000/?' + 
            qs.stringify({
                access_token: data.access_token
            }));
            if(token === null) {
                const createToken = new Token ({
                    access_token: data.access_token,
                    token_type: data.token_type,
                    scope: data.scope,
                    expires_in: now + data.expires_in,
                    refresh_token: data.refresh_token
                })
                createToken.save();
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
            res.redirect(`/?${
                qs.stringify({
                    error: 'Invalid Token'
                })
            }`);
        }
    })
    .catch(err => {
        res.send(err);
    })
});

app.get('/status', status, async (req, res) => {
    const token = await Token.findOne({});
    const valid = (req.token != {} && token.expires_in > now)
    
    res.send(valid)
})

app.get('/me', status, async (req, res) => {
    const { access_token, token_type } = req.token;

    await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    })
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/browse/new-releases', status, async (req, res) => {
    const { access_token, token_type } = req.token;
    const offset = Math.floor(Math.random() * (100 - 10 + 1) + 1);

    await axios.get('https://api.spotify.com/v1/browse/new-releases', {
        params: {
            country: 'us',
            limit: 5,
            offset: offset
        },
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    })
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/browse/categories', status, async (req, res) => {
    const { access_token, token_type } = req.token;
    const offset = Math.floor(Math.random() * (45- 5 + 1) + 1);

    await axios.get('https://api.spotify.com/v1/browse/categories', {
        params: {
            country: 'us',
            limit: 5,
            offset: offset
        },
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    })
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = app;