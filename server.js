const express = require('express');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

// gloabl middleware
server.use(express.json());
server.use(logger); // custom middleware used globally

// local middleware
server.use('/posts', postRouter);
server.use('/users', userRouter);

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request made to ${req.url})}`
  );

  next();
};

// route handlers
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// export default server
module.exports = server;
