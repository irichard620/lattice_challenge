const express = require("express");
const router = express.Router();
const fetch = require('cross-fetch');

const {BASE_API_URL} = require("../config");

router.get("/:id/cast", function(req, res, next) {
  fetch(`${BASE_API_URL}/movie/${req.params.id}/credits?api_key=${process.env.API_KEY}`)
    .then(cast => cast.json())
    .then(cast => res.json(cast))
    .catch(e => res.status(500).send('Could not access TMDB server'))
});

router.get("/:id/related", function(req, res, next) {
  fetch(`${BASE_API_URL}/movie/${req.params.id}/similar?api_key=${process.env.API_KEY}`)
    .then(movies => movies.json())
    .then(movies => res.json(movies))
    .catch(e => res.status(500).send('Could not access TMDB server'))
});

router.get("/:id", function(req, res, next) {
  fetch(`${BASE_API_URL}/movie/${req.params.id}?api_key=${process.env.API_KEY}`)
    .then(movie => movie.json())
    .then(movie => res.json(movie))
    .catch(e => res.status(500).send('Could not access TMDB server'))
});

router.get("/", function(req, res, next) {
  fetch(`${BASE_API_URL}/movie/popular?api_key=${process.env.API_KEY}`)
    .then(movies => movies.json())
    .then(movies => res.json(movies))
    .catch(e => res.status(500).send('Could not access TMDB server'))
});

module.exports = router;
