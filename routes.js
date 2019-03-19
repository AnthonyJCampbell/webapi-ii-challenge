const express = require('express');
const routes = express.Router();
const Posts = require('./data/db');

routes.use(express.json());

routes.post('/', (req, res) => {

})

routes.get('/api/posts', (req, res) => {
  Posts.find(req.query)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    });
})

routes.get('/:id', (req, res) => {
  
})

routes.delete('/:id', (req, res) => {

})

routes.put('/:id', (req, res) => {
  
})

module.exports = routes;