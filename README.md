# React/JWT Example Application

This is an example authentication and authorization application built with React and React-Redux.

There are many ways to go about authentication and token management within a React application but this was the way that made the most sense to me. Needless to say, this is an opinionated example.

On top of just storage and usage of the JWT token, I've also put in role management for the front end. Since JWT cannot be changed on the fly, it is a secure way to retrieve the roles from state.

**A few key elements:**

* Client-side build
    * ES6 (Transpiled with Babel)
    * React
    * Redux
* Server-side build
    * node 4.2.3
    * koa
* Gulp for building

*If you are not familiar with these key components, I would suggest reading up on them so you can get the most out of this example application.*

## Dependencies

* NodeJS 4+
* Gulp in global (`npm i -g gulp`)

## Get up and running

```terminal
npm i
npm start
```

This will build the source with babel, watch for changes, and start a web server at http://localhost:3000
