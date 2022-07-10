const meta = require('./meta.json');

module.exports = {
  summary: (data) => {
    if (data.description) {
      return data.description;
    }

    if (data.tags === undefined) {
      return meta.description;
    }

    if (!data.tags.includes('post')) {
      return meta.description;
    }

    return null;
  }
}
