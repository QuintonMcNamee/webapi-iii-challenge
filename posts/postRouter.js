const express = require('express');

const postDb = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;

  postDb.getById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;

  postDb.remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
    });
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  const id = req.params.id;
  const test = req.body;

  postDb.update(id, test)
    .then(response => {
      if(!response) {
        res.status(404).json({ message: "Error" });
      }
      else {
        res.status(200).json({ message: "Success!" });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;

  postDb.getById(id)
    .then(response => {
      if(!response) {
        res.status(404).json({ message: "Error" });
      }
      else {
        req.post = response;
        next();
      };
    })
    .catch(error => {
      console.log(error);
    });
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
