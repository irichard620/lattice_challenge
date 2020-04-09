const express = require("express");
const router = express.Router();
const fetch = require('cross-fetch');

const {API_KEY, BASE_API_URL} = require("../config");

router.get("/:query", function(req, res, next) {
  fetch(`${BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${req.params.query}`)
    .then(movies => movies.json())
    .then(movies => res.json(movies))
    .catch(e => res.status(500).send('Could not access TMDB server'))
});

module.exports = router;
