const { InstagramPosts } = require('../../db.js');

const postInsta = async (url) => {
  try {
    await InstagramPosts.create({ url });
  } catch (error) {
    throw Error(error.message);
  }
};

const updateInsta = async ({ url, id }) => {
  try {
    const post = await InstagramPosts.findByPk(id);
    post.url = url;
    await post.save();
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllPosts = async () => {
  try {
    const posts = InstagramPosts.findAll();
    return posts;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  postInsta,
  updateInsta,
  getAllPosts,
};
