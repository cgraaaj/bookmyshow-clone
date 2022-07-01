# Getting Started with Bookmyshow Clone

## About this Project

This project is baiscally a Single Page application developed using react, python and sqlite for #BookMyShow Clone.

# Available Features - Frontend

The basic functionalities available for the client is as follows

- Login
- View Dashboard
  - Movies
  - Shows list
  - Booking details

## ToDo

- Slide cards for booking based on location
- Booking shows
- Invite friends

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Available Features - Backend

The Backend is built using flask python to support the client side of the application

The endpoints supported by backend are as follows

- User Authentication

  - POST user/login
  - POST user/logout
  - POST user/register

- Dashboard
  - GET movies
  - GET shows
  - GET show/#movieid

## ToDo

- Datamase management instead of dumbs json

## Available Scripts

### `python3 app.py`

Rusn the backend server on your local.

# Deployment

## Docker

Docker images has been pushed to docker repo which is publically accessable

Create a common network in docker, which acts as a brige to make the client server and nginx conencted to eachother

- Network
  - docker network create bms

Run the docker images as intructed below on your local

- Client
  - docker run -d --name client --network=betrue raju6713/bms-frontend:amd64
- Server
  - docker run -d -p 5000:5000 --name api --network=betrue raju6713/bms-backend:amd64
- Nginx
  - docker run -d -p 8080:80 --name ngx --network=betrue raju6713/bms-nginx:amd64

**_NOTE:_** Please make sure no other containers running on the name client, api, ngx on your docker network
