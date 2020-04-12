const express = require("express");
const router = express.Router();
const fetch = require('cross-fetch');

const {BASE_API_URL} = require("../config");

router.get("/:id", function(req, res, next) {
  fetch(`${BASE_API_URL}/person/${req.params.id}?api_key=${process.env.API_KEY}`)
    .then(person => person.json())
    .then(person => res.json(person))
    .catch(e => res.status(500).send('Could not access TMDB server'))
});

module.exports = router;
