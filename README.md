# Project & Portfolio 3

#### Christopher Stone
#### Student ID: #0004708104
#### Email: cmstone@student.fullsail.edu
#### Course: WDV339-O

# Project Overview

Using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/), this application will allow the search of any artist or song on the Spotify database and return the results to the user. It will also have full login authentication with JWT tokens.

Additional project information and capabilities will be added to this README on a regular basis.

# Prerequisites

- NodeJS >= 16.15.1
- Express >= 4.18.1
- npm >= 8.12.1
- Xcode >= 13.4.1

# Getting Started

- Install dependencies
	- cd api
	- npm install

- Start API server
	- cd api
	- npm run start

Additional steps TBD...

## Other Considerations

Ports `3000`, and `3001` must be open on host OS. Make sure no other applications are running on those ports by running the following command: 

	sudo lsof -nP -i4TCP:3000 | grep LISTEN && sudo lsof -nP -i4TCP:3001 | grep LISTEN

If any results shows are displayed then you must close the application running on either of those ports. 

# Links

- TBD
