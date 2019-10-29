[![Website list-i-t.herokuapp.com](https://img.shields.io/website-up-down-green-red/https/list-i-t.herokuapp.com/.svg)](https://list-i-t.herokuapp.com/)

# ListIt - Making managing a bucket list easy, fast and convienient

## Vision

To enable anyone keep a record of their goals and to help them articulate the journey to achieving them.

## Features

- Users can sign up
- Users can sign in
- Users can create bucket lists
- Users can view a their bucket lists
- User can edit the name of a specific bucket list
- Users can search for a bucket list by its name
- Users can add more goals to a specific bucketlist
- Users can mark a specific goal as completed or pending
- Users can delete a bucket list
- Users can delete a specific goal in a bucketlist

## Technology

- Node 10.15.0
- MongoDB
- React

## Getting Started

To get a copy of this project up and running on your local machine for testing and development, you would need to have a minimum of the underlisted prerequisities installed on your local machine. However, if you would like to get a feel of the App first, click [here](https://list-i-t.herokuapp.com/).

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT bash

### Installing

To get started, clone this repository on your local machine using the following steps:

Open your terminal and navigate to the folder you want the project to be and enter the the following commands:

```
$ git clone -b develop https://github.com/daylay92/ListIt.git
$ cd ListIt
$ npm install
$ npm run client-install
```

#### Tip

The `client-install` is used to install the dependencies of the React client side scripts.

Create a `.env` file and add the environment variables described in the .env.sample file. Below are the relevant environment variables worth adding:

- `SECRET` - JWT secret for signing access token.
- `MONGODB_URI` - Connection string for monogodb database.

## Starting the dev servers

```bash
npm run dev
```

## API

The API is currently in version 1 (v1) and it is hosted on heroku at [Base URL](https://list-i-t.herokuapp.com/api/v1)

## API Documentation

You can find the documentation here [API DOCS](https://documenter.getpostman.com/view/6550121/SW11Vd19). Note that the documentation here is only to save as a guide towards making requests and not as a hard rule. Testing the endpoints without updating parameters like Authentication token and Ids would yield unexpected results.

## Test API endpoints

The application's API endpoints can be tested locally through localhost on port 3400 or through the live [url](https://list-i-t.herokuapp.com/api/v1) using postman

1. Run the application while postman is open
2. Go to postman and test against the endpoints below :-

### Endpoints to test

| Method | Endpoint                                         | Enable a user to:                                     | Authentication |
| ------ | ------------------------------------------------ | ----------------------------------------------------- | -------------- |
| POST   | api/v1/auth/signup                               | Create user account                                   | Not required   |
| POST   | api/v1/auth/signin                               | Login a user                                          | Not required   |
| POST   | api/v1/bucketList                                | Creates a new bucket list                             | Required       |
| PATCH  | api/v1/bucketList/<:bucketListId>                | Updates the name of a bucket list                     | Required       |
| GET    | api/v1/bucketList                                | Gets a collection of the bucket list of a user        | Required       |
| DELETE | api/v1/bucketList/<:bucketListId>                | Delete a bucket list by its Id                        | Required       |
| POST   | api/v1/bucketList/<:bucketListId>/goal           | Add a new goal to an existing bucket list             | Required       |
| PATCH  | api/v1/bucketList/<:bucketListId>/goal/<:goalId> | Updates the status of a goal to compeleted or pending | Required       |
| DELETE | api/v1/bucketList/<:bucketListId>/goal/<:goalId> | Deletes a goal by its Id                              | Required       |

## Template UI
The App is hosted [here](https://list-i-t.herokuapp.com).


## Technologies

- Node JS
- Express
- MongoDB
- React
- Babel

## Author

- **Ayodele Akinbohun**
