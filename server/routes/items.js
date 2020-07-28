const express = require("express");
const router = new express.Router();
const fileUpload = require("../config/cloudinary");
const itemModel = require("../models/Item");
// const userModel = require('../models/User');

router.get("/", (req, res, next) => {
  itemModel
    .find()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  itemModel
    .findById(req.params.id)
    .populate("style")
    .then((oneItem) => {
      res.status(200).json(oneItem);
    })
    .catch(next);
});

router.post("/", fileUpload.single("avatar"), (req, res, next) => {
  console.log("est ce que j'arrive ici ?");
  console.log("req body is here", req.body);
  console.log(req.file);
  if (req.file) {
    req.body.avatar = req.file.path;
  }
  itemModel
    .create(req.body)
    .then((newItem) => {
      res.status(201).json(newItem);
    })
    .catch(next);
});

router.patch("/:id", (req, res, next) => {
  itemModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updateItem) => {
      res.status(200).json(updateItem);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  itemModel
    .findByIdAndRemove(req.params.id)
    .then((item) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
