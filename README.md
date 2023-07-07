# Varthak Technologies Assignment

## 👁️‍🗨️Please refer to the Postman documentation from the given link below:-
https://documenter.getpostman.com/view/25625593/2s93zFYzQd


## :space_invader:Tech Stack Used:

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://#/">Node Js</a></li>
    <li><a href="https://#/">TypeScript</a></li>
    <li><a href="https://#/">Express</a></li>
    <li><a href="https://reactjs.org/">Mongo DB</a></li>
    <li><a href="https://chakra-ui.com/">Mongoose</a></li>
  </ul>
</details>

<details>
<summary>Packages</summary>
  <ul>
    <li><a href="#">nodemon</a></li>
    <li><a href="#">bycrypt</a></li>
    <li><a href="#">jsonwebtoken</a></li>
  </ul>
</details>

## :accessibility: How to run it into your local system:

- At first, do a git clone of this repository (Note: Environment variables are present in the config folder so you don't need to take care of that)
```
git clone https://github.com/blackcode1996/Varthak-Technologies-Assignment.git
```
- Go inside the backend folder
```
cd backend
```
- After cloning and going inside the backend folder in your local system install all node modules using
```
npm i 
```
- At last run the command (npm start)
```
npm run dev
```
## 🏛️Features:

- Authentication of the user.
- Login/signup.
- Role-based authorization of the user.
- Creating, viewing all books, and viewing books published by you according to role.
- watching new and old published books according to time.

## 🔡Small documentation:

For detail documentation please refer to the postman documentation - https://documenter.getpostman.com/view/25625593/2s93zFYzQd

- For User Register
```http
POST https://fantastic-tan-crayfish.cyclic.app/user/register

Default role for users will be "VIEWER"
```


- For User Login
```http
POST https://fantastic-tan-crayfish.cyclic.app/user/login
```

- For changing roles
```http
POST https://fantastic-tan-crayfish.cyclic.app/user/updateroles


Note - You need to pass a valid authorization token in the headers.
```
  
- For Viewing all books
```http
GET https://fantastic-tan-crayfish.cyclic.app/books/viewallbooks

Note - This access is limited to the users who have "VIEW_ALL" as roles.
Note - You need to pass a valid authorization token in the headers.
```

- For Viewing specific user books
```http
GET https://fantastic-tan-crayfish.cyclic.app/books/viewuserbooks

Note - This access is limited to the users who have "VIEWER" as roles.
Note - You need to pass a valid authorization token in the headers.
```

- For Adding books
```http
POST https://fantastic-tan-crayfish.cyclic.app/books/create

Note - This is accessable to users who have "CREATOR" in its roles.
Note - You need to pass a valid authorization token in the headers.
```

- For Watching all old books created after 10 minutes
```http
GET https://fantastic-tan-crayfish.cyclic.app/books/oldbooks?old=1

Note - This access is limited to the users who have "VIEW_ALL" as roles.
Note - You need to pass a valid authorization token in the headers.
```

- For Watching all new books created within 10 minutes
```http
GET https://fantastic-tan-crayfish.cyclic.app/books/newbooks?new=1

Note - This access is limited to the users who have "VIEW_ALL" as roles.
Note - You need to pass a valid authorization token in the headers.
```

