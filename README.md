JoinUsVic is a web app that provides insightful(-ish) information about downtown Victoria manifested through 3D model rendered by WebGL inside the web browser.

## Project Setup

Project Setup based on [Create React App](https://github.com/facebook/create-react-app).

This is Version II of the project. [Version I](https://github.com/yhfreeman/JoinUsVic-V1) is also available where the set up of Rails and React App are not separated. We later found out that separating the two would help with future deployment of the app. 

*If the project runs on VM in development mode, we suggest creating an `.env` file => add `CHOKIDAR_USEPOLLING=true` inside of app/client/ directory which could be necessary for auto refresh on change in React*

## Getting Started

**WARNING: Please mind node version and use v.8.9.4. To use this version: run `nvm use 8.9.4`**

1. To setup React: navigate to /app/client => run dependencies installation: `npm install`
    - To start your React server in development mode on PORT 3000: run `npm start`
2. To setup Rails (server end): in root directory => run `bundle install`
3. Create 2 new local databases in psql: run `psql` => run `CREATE DATABASE joinusvic;` & `CREATE DATABASE joinusvic_test;`
4. Now seed your database!! Run `bin/rails db:setup`
    - To start your Rails server: run `rails s`

**WARNING: If you're working with Vagrant or vitual machines, run `rails s -b 0.0.0.0` to bind**

### To View
  * Open [http://localhost:3000](http://localhost:3000) to view Rails in the browser
  * Open [http://localhost:8080](http://localhost:8080) to view our app in the browser

## Fireframing & Design Phase(hover for page info)

![Landing](https://github.com/yhfreeman/JoinUsVic-V2/blob/master/docs/landing-page.png "Landing Page")

![Landing-selected](https://github.com/yhfreeman/JoinUsVic-V2/blob/master/docs/landing-page-keyword-selected.png "Landing Page on Keyword select")

![FunFacts](https://github.com/yhfreeman/JoinUsVic-V2/blob/master/docs/funfacts-page.png "Fun Facts Page with Sidebar")

## Database Design

MANY locations    -    MANY keywords
MANY locations    -    ONE anchor
MANY ratings      -    ONE location
MANY funfacts     -    ONE location

ERD:
![ERD](https://github.com/yhfreeman/JoinUsVic-V2/blob/master/docs/databaseERD.png "Database ERD")

## Screenshots && Gifs

