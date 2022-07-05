const { DateTime } = require('luxon');
const _ = require('lodash');

function getPosts(collectionApi) {
  return collectionApi.getFilteredByTag('post').reverse().filter(post => {
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }

    if (post.data.draft === true) {
      return false;
    }

    let now = new Date().getTime();
    if (now < post.date.getTime()) {
      return false;
    }

    return true;
  });
}

function getByDate(collectionApi, dateFormat) {
  const postsByDate = {};
  const posts = getPosts(collectionApi);

  /*
  return _.chain(getPosts(collectionApi))
    .groupBy((post) => post.date.getFullYear())
    .toPairs()
    .reverse()
    .value();
  */

  posts.forEach((post) => {
    if (!post.date) {
      return;
    }

    let d = DateTime.fromJSDate(post.date).toFormat(dateFormat);

    if (!postsByDate[d]) {
      postsByDate[d] = new Array();
    }
    postsByDate[d].push(post);
  });

  return postsByDate;
}

exports.postsByYear = (collectionApi) => {
  return getByDate(collectionApi, 'yyyy');
}

exports.posts = (collectionApi) => {
  return getPosts(collectionApi);
}
