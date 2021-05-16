const express = require("express");
const router = express.Router();
const { Favourite } = require("../models/Favourite");

router.post("/add", (req, res) => {
  const favourite = new Favourite(req.body);

  favourite.save((err, info) => {
    if (err) res.status(400).send("failed in adding data into DB");

    res.status(200).json({ success: true, data: info });
  });
});

router.post("/delete", (req, res) => {
  Favourite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) res.status(400).send("failed in adding data into DB");
    return res.status(200).json({ success: true, data: info });
  });
});

router.post("/number", (req, res) => {
  const selectedMovieId = req.body.movieId;
  Favourite.find({ movieId: selectedMovieId }).exec((err, info) => {
    if (err) {
      res.status(404).send("failed in finding MovieId");
    }
    if (info) {
      console.log("success! we found!", info);
      res.status(200).json({
        success: true,
        data: info.length,
      });
    }
  });
});

router.post("/getfavourites", (req, res) => {
  console.log("userFrom?: ", req.body.userFrom);
  Favourite.find({ userFrom: req.body.userFrom }).exec((err, info) => {
    if (err) {
      res.status(404).send("failed in finding MovieId");
    }
    if (info) {
      console.log("success! we found!", info);
      res.status(200).json({
        success: true,
        data: info,
      });
    }
  });
});

router.post("/deletefrompage", (req, res) => {
  Favourite.findOneAndDelete({
    userFrom: req.body.userFrom,
    movieId: req.body.movieId,
  }).exec((err, info) => {
    if (err) {
      res.status(404).send("failed in finding MovieId");
    }
    if (info) {
      res.status(200).json({
        success: true,
        data: info,
      });
    }
  });
});

router.post("/favourited", (req, res) => {
  Favourite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) {
      return res.status(404).send("failed in userId and MovieId");
    }
    if (info) {
      var value = false;
      if (info.length !== 0) {
        value = true;
      }

      res.status(200).json({
        success: true,
        data: value,
      });
    }
  });
});

module.exports = router;
