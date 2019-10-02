const express = require('express');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

// gloabl middleware
server.use(express.json());
server.use(logger); // custom middleware used globally
server.use(locked);

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

function locked(req, res, next) {
  if(req.url === '/locked') {
    console.log('You may enter.');
    res.send('You may enter.');
    next();
  } else {
    console.log('You are locked outside the door.');
    res.send('You are locked outside the door.');
  }
};

// route handlers
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.get('/locked', locked, (req, res) => {
  res.send()
})

// export default server
module.exports = server;
