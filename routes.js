const express = require('express');
const routes = express.Router();
const Posts = require('./data/db');

routes.use(express.json());

routes.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ 
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    Posts.insert(req.body)
      .then(data => {
        res.status(201).json({ ...data, title, contents });
      })
      .catch(() =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  }
});

routes.get('/api/posts', async (req, res) => {
  try {
    const data = await Posts.find(req.query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ 
      error: "The posts information could not be retrieved." 
    })
  }
})

// routes.get('/api/posts', (req, res) => {
//   Posts.find(req.query)
//     .then(data => {
//       res.status(200).json(data)
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The posts information could not be retrieved." })
//     });
// })

routes.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist." 
        })
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      })
    })
})

routes.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(data => {
      if (!data) {
        res.status({
          message: "The post with the specified ID does not exist."
        })
      } else {
        Posts.remove(id)
          .then(() => {
            res.status(200).json(data)
          })
          .catch(error => {
            res.status(500).json({ 
              error: "The post could not be removed" 
            })
          })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      })
    })
})

routes.put('/api/posts/:id', (req, res) => {
  
})

module.exports = routes;