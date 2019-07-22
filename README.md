# Wunderlist
## This is the documentation for the Wunderlist 2.0 Build Week project

This project was built with Node Express and is currently deployed on Heroku at [https://wunderlist-2.herokuapp.com/](https://wunderlist-2.herokuapp.com/).
The documentation can also be found at [Apidocs generated documenation](http://wunderlist2.surge.sh).

The following dependencies were used:
- Node
- Express
- PostgreSQL (Production)
- SQLite3 (Development)
- Knex
- Knex Cleaner
- Bcryptjs
- JsonWebToken
- Cors
- Helmet
- Dotenv
- Faker
- BodyParser
- Nodemon (Development)
- Cross-Env (Development)
- Jest (Development)
- Supertest (Development)

## Getting Started

Install Dependencies

```js
yarn install
```
Run Database Migrations
```js
knex migrate:latest
```
Run Database Seeds
```js
knex seed:run
```
Run test
```js
yarn test
```
Run server
```js
yarn server
```

## Restrictions
If you like to make a request to the todos or users endpoint, a valid JSON web token is required in your request headers under authorization.  This token is acquired by successfully registering an account or loggin in.  

Sample `Axios` config:
```js
axios.create({
    baseUrl: "https://wunderlist-2.herokuapp.com/",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : // JsonWebToken
    }
});
```

Also, for testing to run successfully you will have to remove the authentication piece of middleware from the todos route in the `server.js` file.

## Auth Routes

### Register

```js
POST /api/auth/register
```

Parameters

| Name      | Type   | Description       | Required |
| --------- | ------ | ----------------- | -------- |
| username  | String | User's username   | Yes      |
| password  | String | User's password   | Yes      |
| firstName | String | User's first name | Yes      |
| lastName  | String | User's last name  | Yes      |

**POST** This will create a new user and send back a token.  

#### Examples

##### Register Request


```json
{
   "username" : "harry",
   "password" : "potter",
   "firstName" : "harry",
   "lastName" : "potter"
}
```
##### Register Success Response

```json
{
  "message": "Welcome harry!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoiaGFycnkiLCJpYXQiOjE1NjE1NzIzMTksImV4cCI6MTU2MjE3NzExOX0.VCaGen64x_WEkVueJof8XKZxOImjxK09tNN6tiYSZZw",
  "userID": 33
}
```

##### Register Error Response

```json
{
   "message" : "Please fill out all required fields."
}
```

### Login

```js
POST /api/auth/login
```

Parameters

| Field    | Type   | Description     | Required |
| -------- | ------ | --------------- | -------- |
| username | String | User's username | Yes      |
| password | String | User's password | Yes      |

**POST** This will log the user in, and send back a token.

#### Examples

##### Login Request
```json
{
    "username": "hermione",
    "password": "granger"
}
```

##### Login Success Response

```json
{
    "message": "Welcome hermione!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoiaGVybWlvbmUiLCJpYXQiOjE1NjE0MTU2OTQsImV4cCI6MTU2MjAyMDQ5NH0.rwTCYJ97VA7IvxT0D2uwY3yHljUr0EPNlKQv-P8HloQ",
    "userID": 33
}
```

##### Login Error Response

```json
{
   "message": "Username or password incorrect"
}
```

## Todo Routes

### Get All Todos
```js
GET /api/todos
```
**GET** This will return a array of todos.

#### Examples

##### Get All Todos Success Response

```json
[
 {
  "id": 64,
  "user_id": null,
  "title": "Lambda",
  "task": "Build Documentation",
  "notes": null,
  "setDate": "Tomorrow",
  "completed": null,
  "created_at": "2019-07-21T14:30:01.322Z",
  "updated_at": "2019-07-21T14:30:01.322Z"
 },
 {
  "id": 65,
  "user_id": null,
  "title": "Lambda",
  "task": "WEBPT8 TL",
  "notes": null,
  "setDate": "Tonight",
  "completed": null,
  "created_at": "2019-07-21T14:30:32.381Z",
  "updated_at": "2019-07-21T14:30:32.381Z"
 },
 {
  "id": 66,
  "user_id": null,
  "title": "Lambda",
  "task": "WEB20 Context Project",
  "notes": null,
  "setDate": "Tuesday",
  "completed": null,
  "created_at": "2019-07-21T14:30:48.287Z",
  "updated_at": "2019-07-21T14:30:48.287Z"
 },
 {
  "id": 67,
  "user_id": 42,
  "title": "Insomnia",
  "task": "Trying Wunderlist End Points, Edit Todo",
  "notes": null,
  "setDate": "Tuesday",
  "completed": null,
  "created_at": "2019-07-21T14:36:03.690Z",
  "updated_at": "2019-07-21T14:36:03.690Z"
 }
]
```
##### Get all Todos Error Response
```json
{
    "message": "Todos cound not be found ${error}"
}
```

### Get Single Todo
```js
GET /api/todos/:id
```
**GET** This will return an object corresponding to the todo `id`;

#### Examples

##### Get Single Success Response
```json
{
    "id": 67,
    "user_id": 42,
    "title": "Insomnia",
    "task": "Trying Wunderlist End Points, Edit Todo",
    "notes": null,
    "setDate": "Tuesday",
    "completed": null,
    "created_at": "2019-07-21T14:36:03.690Z",
    "updated_at": "2019-07-21T14:36:03.690Z"
}
```

##### Get Single Error Response
```json
{
  "message": "Todo with specified ID does not exist"
}
```

### Add New Todo
```js
POST /api/todos
```
Parameters

| Field     | Type    | Description             | Required |
| --------- | ------- | ----------------------- | -------- |
| title     | String  | Title of your todo      | Yes      |
| task      | String  | Your todo description   | Yes      |
| setDate   | String  | When is your todo due?  | Yes      |
| user_id   | Number  | User's current Id       | Yes      |
| notes     | String  | Notes on your todo      | No       |
| completed | Boolean | Is your todo completed? | No       |

**POST** This will add a new todo, and return the created object.

#### Examples
##### Add Todo Request

```json
{
   "title" : "Insomnia",
   "task" : "Trying Wunderlist End Points",
   "setDate" : "Tuesday"
   "user_id" : 42
}
```

##### Add Todo Success Response
```json
{
    "id": 67,
    "user_id": 42,
    "title": "Insomnia",
    "task": "Trying Wunderlist End Points",
    "notes": null,
    "setDate": "Tuesday",
    "completed": null,
    "created_at": "2019-07-21T14:36:03.690Z",
    "updated_at": "2019-07-21T14:36:03.690Z"
}
```

##### Add Todo Error Response
```json
{
    "message": "Please fill out the required fields."
}
```

### Edit Todo
```js
PUT /api/todos/:id
```
Parameters

**At least one field is required**

| Field     | Type    | Description             | Required |
| --------- | ------- | ----------------------- | -------- |
| title     | String  | Title of your todo      | No       |
| task      | String  | Your todo description   | No       |
| setDate   | String  | When is your todo due?  | No       |
| user_id   | Number  | User's current Id       | No       |
| notes     | String  | Notes on your todo      | No       |
| completed | Boolean | Is your todo completed? | No       |

**PUT** This will edit the todo at the provided `id`.

#### Examples

##### Edit Todo Request
```json
{
    "task" : "Trying Wunderlist End Points, Edit Todo",
    "user_id" : 42 
}
```
##### Edit Todo Success Response
```json
{
    "id": 67,
    "user_id": 42,
    "title": "Insomnia",
    "task": "Trying Wunderlist End Points, Edit Todo",
    "notes": null,
    "setDate": "Tuesday",
    "completed": null,
    "created_at": "2019-07-21T14:36:03.690Z",
    "updated_at": "2019-07-21T14:36:03.690Z"
}
```
##### Edit Todo Error Response
```json
{
  "message": "The Todo with the specified ID does not exist."
}
```

### Delete Todo
```js
DELETE /api/todos/:id
```

**DELETE** This will delete the todo at the provided `id`.

#### Examples

##### Delete Todo Success Response
```json
{
    "message": "The Todo has been successfully deleted."
}
```
##### Delete Todo Error Example
```json
{
    "message": "The Todo with the specified ID does not exist."
}
```
## Users Routes
### Get User Profile
```js
GET /api/users/:id
```

**GET** This allows a user to view their specific proifle by `id`.

#### Examples
##### Get User Profile Success Response
```json
{
   "id": 33,
   "first_name": "harry",
   "last_name": "potter",
   "username": "harry",
   "created_at": "2019-07-21T14:28:45.483Z",
   "updated_at": "2019-07-21T14:28:45.483Z"
}
```
##### Get User Profile Error Response
```json
{
   "message": "User with specified ID does not exist.""
}
```
### Edit User Profile
```js
PUT /api/users/:id
```
Parameters

**At least one Field is Required**

| Name      | Type   | Description       | Required |
| --------- | ------ | ----------------- | -------- |
| username  | String | User's username   | No       |
| password  | String | User's password   | No       |
| firstName | String | User's first name | No       |
| lastName  | String | User's last name  | No       |

**PUT** This allows a user to edit their specific profile.

#### Examples
##### Edit user Request
```json
{
  "username" : "potter"
}
```
##### Edit user Success Response
```json
{
   "id": 33,
   "first_name": "harry",
   "last_name": "potter",
   "username": "potter",
   "created_at": "2019-07-21T14:28:45.483Z",
   "updated_at": "2019-07-21T14:28:45.483Z"
}
```
##### Edit user Error Response
```json
{
   "message": "The user with the specified ID does not exist."
}
```
### Delete User Profile
```js
DELETE /api/users/:id
```

**DELETE** This will delete the user at the provided `id`.

#### Examples
##### Delete User Success Response
```json
{
   "message": "The user has been successfully deleted."
}
```
##### Delete User Error Response
```json
{
   "message": "User with specified ID does not exist.""
}
```
