const express = require('express');

const userDb = require('./userDb.js');

const postDb = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const test = req.body;

  userDb.insert(test)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  let post = req.body;

  postDb.insert(post)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/', (req, res) => {
  userDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id;

  userDb.getUserPosts(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;

  userDb.getUserPosts(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;

  userDb.remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  const test = req.body;

  userDb.update(id, test)
    .then(response => {
      res.status(200).json(update);
    })
    .catch(error => {
      console.log(error);
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  userDb.getById(id)
    .then(response => {
      if(!response) {
        res.status(404).json({ message: "Error" });
      }
      else {
        req.user = response;
        next();
      }
    })
    .catch(error => {
      console.log(error);
    });
};

function validateUser(req, res, next) {
  const test1 = req.body.name;
  const test2 = req.body;

  if(!test1) {
    res.status(404).json({ message: "Error" });
  }

  if(!test2) {
    res.status(404).json({ message: "Error" });
  }

  next();

};

function validatePost(req, res, next) {
  const test = req.body.text;
  const test2 = Object.keys(req.body);

  if(!test) {
    res.status(404).json({ message: "Error" });
  }

  if(test2 === 0) {
    res.status(404).json({ message: "Error" });
  }

  next();

};

module.exports = router;
