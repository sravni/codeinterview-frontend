# Codeinterview-frontend &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](blob/main/LICENSE.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](how-to-contribute.html#your-first-pull-request)

## What is Codeinterview?
Codeinterview is a project for conducting interviews for a developer position.

Out of the box:
* Codeinterview allows you to create, edit, delete an interview
* Codeinterview allows you to create a websocket room for livecoding
* Codeinterview allows you to evaluate the interview based on many parameters
* Codeinterview allows you to save your tasks for interviews. At the time of the interview, you can conveniently find the desired task and quickly use its interview

## Available Languages for livecoding

- JavaScript
- Typescript
- Go
- C#
- Python

## Structure
`./client` - Browser application by [Create React App](https://create-react-app.dev/)
`./server` - Server application by [Nest.js](https://nestjs.com/)

## Getting Started
To start using codeinterview you need to launch 3 services.
This service is responsible for the frontend and operation of the websocket room.

1. Install dependencies in `./client` and `./server` folders
    `yarn --cwd=./client`
    `yarn --cwd=./server`

3. Build browser application
    `yarn --cwd=./client build`

4. Copy `./server/.env.example` to `./server/.env`
5. Create [Github Oauth application](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) for application authenticaton
6. Set parameters in Github OAuth application 
   **Authorization callback URL**  
   `http://localhost:3001/auth/callback`

   **Homepage URL** 
   `http://localhost:3001`
7. Paste `Client ID` and `Client Secret` from Github OAuth application in `.env`
8. Build server application
    `yarn --cwd=./server build`
9. Start application
    `yarn ---cwd=./server start`

## Docker
1. Make Docker image by `./Dockerfile`
    `docker build -t codeinterview-frontend .`
2. Run docker image with enviroment variables from `.env`
    `docker run --env-file ./server/.env codeinterview-frontend`