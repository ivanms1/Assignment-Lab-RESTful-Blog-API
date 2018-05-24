const express = require('express');
const comments = express.Router();
const { check, validationResult } = require('express-validator/check');

const store = require('../db/store')

comments.get('/:id/comments', (req, res) => {
	res.status(200).send(store.posts[req.params.id].comments)
});

comments.post('/:id/comments', [
	check('text').trim().isLength({min: 1 })
	], (req, res) => {
	let comment = {
		text: req.body.text
	};
	const errors = validationResult(req);
 	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  	}
	store.posts[req.params.id].comments.push(comment);
	res.status(201).send(store.posts[req.params.id].comments);
});

comments.put('/:id/comments/:commentId', (req, res) => {
	Object.assign(store.posts[req.params.id].comments[req.params.commentId], req.body);
	res.status(200).send(store.posts[req.params.id].comments)
});

comments.delete('/:id/comments/:commentId', (req, res) => {
	store.posts[req.params.id].comments.splice(req.params.commentId, 1);
	res.status(204).send();
});

module.exports = comments;