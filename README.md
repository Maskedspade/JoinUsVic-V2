JoinUsVic is a web app that provides insightful information about downtown Victoria manifested through 3D model rendered by WebGL inside the web browser.

## Project Setup

Project Setup based on [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

**WARNING: Please mind node version and use v.8.9.4. To use this version: run `nvm use 8.9.4`**

1. To setup React: install dependencies: `npm install` in project root directory
    - To start your React server in development mode on PORT 3000: run `npm start`
2. To setup Rails (server end): go to 'joinusvicdata-app' folder => run `bundle install`
3. Create 2 new local databases in psql: run `psql` => run `CREATE DATABASE joinusvic;` & `CREATE DATABASE joinusvic_test;`

**WARNING: If you're working with Vagrant or vitual machines, run `rails s -b 0.0.0.0` to bind**
4. Now seed your database!! Run `bin/rails db:setup`
    - To start your Rails server: run `rails s`

### To View
  * Open [http://localhost:3000](http://localhost:3000) to view it in the browser
  * Open [http://localhost:8080](http://localhost:8080) to view it in the browser

