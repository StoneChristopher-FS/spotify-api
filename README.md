# Project & Portfolio 3

#### Christopher Stone
#### Student ID: #0004708104
#### Email: cmstone@student.fullsail.edu
#### Course: WDV339-O

# Project Overview

Using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/), this show a random set of new release albums and categories along with displaying a users profile. It will also have full login authentication with JWT tokens.

I plan to add to this in the future and the README will be updated with more functionality as it develops.

# Prerequisites

- NodeJS >= 16.15.1
- Express >= 4.18.1
- npm >= 8.12.1
- MongoDB >= 1.32.6
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions

# Getting Started

- Install dependencies
	- npm install (will install all modules in all sub directories)

- Start Application
	- npm start

# Links

Important links to project

- [http://localhost:3000](http://localhost:3000) - Home page for client side app
- [http://localhost:3001/spotify/v1/login](http://localhost:3001/spotify/v1/login) - API call to Spotify Login
- [http://localhost:3001/spotify/v1/status](http://localhost:3001/spotify/v1/status) - Will return true/false based on token expired stats
- [http://localhost:3001/spotify/v1/me](http://localhost:3001/spotify/v1/me) - API call to user profile info
- [http://localhost:3001/spotify/v1/browse/new-releases](http://localhost:3001/spotify/v1/browse/new-releases) - API call to new-release albums
- [http://localhost:3001/spotify/v1/browse/categories](http://localhost:3001/spotify/v1/browse/categories) - API call to categories


