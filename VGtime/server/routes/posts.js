var express = require('express'),
	router = express.Router();

var	PostsModel = require('../models/posts')
	CommentsModel = require('../models/comments'),
	CORS = require('../middlewares/cors');

router.get('/', CORS, (req, res) => {
	PostsModel.findPostsList()
	.then((doc) => {
		sendResponse(res, 200, doc);
	}).catch((err) => {
		sendResponse(res, 400, err);
	});
});

router.get('/postDetail', CORS, (req, res) => {
	let pId = req.query.postId;

	if (!pId) return sendResponse(res, 400, {errMsg: 'PostId is required.'});

	PostsModel.findPostDetail(pId)
	.then((doc) => {
		sendResponse(res, 200, doc);
	}).catch((err) => {
		sendResponse(res, 400, err);
	});
});

router.get('/comments', CORS, (req, res) => {
	let pId = req.query.postId;

	if (!pId) return sendResponse(res, 400, {errMsg: 'PostId is required.'});

	CommentsModel.findCommentsById(pId)
	.then((doc) => {
		sendResponse(res, 200, doc);
	}).catch((err) => {
		sendResponse(res, 400, err);
	});
});

router.post('/addComment', CORS, (req, res) => {
	let pId = req.query.postId,
		content = req.query.content;

	if (!pId) return sendResponse(res, 400, {errMsg: 'PostId is required.'});

	let data = {
		author: '590053ba955d740d6c4044b2',
		content: content,
		postId: pId
	}

	CommentsModel.createComment(data, (result) => {
		res.send(result);
	})
});

router.get('/delComment', CORS, (req, res) => {
	let pId = req.params.postId,
		cId = req.query.commentId;

	CommentsModel.deleteComment(cId, (result) => {
		res.send(result);
	});
});

function sendResponse(res, statusCode, doc) {
	var resJSON = {
		statusCode: statusCode,
		result: doc
	};
	res.send(resJSON);
}

module.exports = router;