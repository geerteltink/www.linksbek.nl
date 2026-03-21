import { DateTime } from 'luxon';

function getPosts(collectionApi) {
  return collectionApi
    .getFilteredByTag('post')
    .reverse()
    .filter((post) => {
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

  posts.forEach((post) => {
    if (!post.date) {
      return;
    }

    let d = DateTime.fromJSDate(post.date).toFormat(dateFormat);

    if (!postsByDate[d]) {
      postsByDate[d] = [];
    }
    postsByDate[d].push(post);
  });

  return postsByDate;
}

export const postsByYear = (collectionApi) => {
  return getByDate(collectionApi, 'yyyy');
};

export const posts = (collectionApi) => {
  return getPosts(collectionApi);
};

export default {
  postsByYear,
  posts,
};
