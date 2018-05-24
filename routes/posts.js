const express = require('express');
const posts = express.Router();
const { check, validationResult } = require('express-validator/check');


let store = require('../db/store')

posts.get('/', (req, res) => {
	if(req.query.id) return res.status(200).send(store.posts[req.query.id]);
	res.send(store)
});

posts.post('/', [
	check('name').trim().isLength({min: 1 }),
	check('text').trim().isLength({ min: 5 })
	], (req, res) => {
	let post = {
		name: req.body.name,
		url: req.body.url,
		text: req.body.text,
		comments: []
	}

	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  	}

	store.posts.push(post);
	res.status(200).send(store)
});

posts.put('/:id', (req, res) => {
	Object.assign(store.posts[req.params.id], req.body);
	res.status(200).send(store.posts[req.params.id]);
});

posts.delete('/:id', (req, res) => {
	store.posts.splice(req.params.id, 1);
	res.status(204).send(store.posts);
});



module.exports = posts;