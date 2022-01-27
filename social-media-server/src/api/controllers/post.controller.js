const {
  getAllPosts,
  createNewPost,
  fetchPostWithId,
  editPostWithId,
  deletePostWithId,
  likePostWithId,
  sharePostWithId,
  fetchFeedPage,
} = require("../services/postProvider.js");

// Get all posts of a user with userId ( pagination )
exports.fetchAllPosts = async (req, res, next) => {
  const { userId, pageNo, pageLimit } = req.params;
  const loggedUser = req.user;

  try {
    const response = await getAllPosts(userId, loggedUser, pageNo, pageLimit, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const path = req.file.path;
  const postDetails = req.body;

  try {
    const response = await createNewPost(loggedUserId, path, postDetails, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.fetchPost = async (req, res, next) => {
  const loggedUser = req.user;
  const { postId } = req.params;

  try {
    const response = await fetchPostWithId(loggedUser, postId, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.editPost = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const { postId } = req.params;
  const path = req.file.path;
  const postDetails = req.body; 

  try {
    const response = await editPostWithId(loggedUserId, postId, postDetails, path, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const { postId } = req.params;

  try {
    const response = await deletePostWithId(loggedUserId, postId, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const { postId } = req.params;

  try {
    const response = await likePostWithId(loggedUserId, postId, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.sharePost = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const { postId } = req.params;
  const postDetails = req.body;

  try {
    const response = await sharePostWithId(loggedUserId, postId, postDetails, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getFeed = async (req, res, next) => {
  const { pageNo, pageLimit } = req.params;
  const loggedUserId = req.user._id;

  try {
    pageNo = pageNo || 1;
    pageLimit = pageLimit || 20;
    let offset = pageLimit*(pageNo-1);
    const response = await fetchFeedPage(loggedUserId, offset, pageLimit, next);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};