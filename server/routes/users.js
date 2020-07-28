/*------------------------------------------
// ALBUMS ROUTING
------------------------------------------*/

// GET /albums => get's us all the albums from the database.
// GET /albums/:id get's us one album matching an id.
// POST /albums => create an album.
// PATCH /albums/:id => updates an album with the specified id.
// /DELETE /albums/:id => deletes an album with the specified id.

const express = require('express');
const router = new express.Router();
const userModel = require('../models/User');

router.get('/', (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  userModel
      .findById(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    userModel
      .create(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  router.patch('/number', (req, res) => {
    userModel
      .findByIdAndUpdate(req.session.currentUser._id, req.body, {new: true})
      .then((updatedNum) => {
        res.status(200).json(updatedNum);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  router.patch('/edit', (req, res) => {
    userModel
      .findByIdAndUpdate(req.session.currentUser._id, req.body, {new: true})
      .then((updatedProfile) => {
        res.status(200).json(updatedProfile);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.patch('/:id', (req, res) => {
    userModel
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  router.delete('/:id', (req, res) => {
    userModel
      .findByIdAndDelete(req.params.id)
      .then(() => {
        res.sendStatus(204)
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

module.exports = router;
