const express = require('express');
const router = express.Router();
const qs = require('qs');
const randomString = require('randomstring');
const SpotifyWebApi = require('spotify-web-api-node');
const Token = require('../models/token');

require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET= process.env.CLIENT_SECRET;
const REDIRECT_URI= process.env.REDIRECT_URI;

const updateToken = async (data) => {
    return await Token.findOneAndUpdate({}, data)
}

router.get('/login', async (req, res) => {
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

router.post('/auth', async (req, res) => {
    let token = await Token.findOne()
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: REDIRECT_URI,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    });

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            if(token === null) {
                const createToken = new Token ({
                    access_token: data.body.access_token,
                    token_type: data.body.token_type,
                    scope: data.body.scope,
                    expires_in: data.body.expires_in,
                    refresh_token: data.body.refresh_token
                })
                token = createToken;
            } else {
                const updatedToken = {
                    access_token: data.body.access_token,
                    token_type: data.body.token_type,
                    scope: data.body.scope,
                    expires_in: data.body.expires_in,
                    refresh_token: data.body.refresh_token
                }
                updateToken(updatedToken);
            }
            try{
                token.save()
                return res.status(201).json({
                    token,
                    message: 'Success'
                })
            } catch(err) {
                return res.status(400).json({
                    error: err.message
                })
            }
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;