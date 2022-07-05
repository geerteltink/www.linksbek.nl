const { DateTime } = require('luxon');
const striptags = require("striptags");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [400, 800, 1280, 1920],
    formats: ['webp', 'jpeg'],
    outputDir: '_site/assets/images',
    urlPath: '/assets/images',
  });

  let imageAttributes = {
    alt,
    class: 'img-fluid',
    sizes: '100vw',
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection('posts', function (collectionApi) {
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
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addAsyncShortcode('image', imageShortcode);

  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).setLocale('nl').toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter('isoDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('summary', (data) => {
    return striptags(data.replace(/<h1[^>]*>([\s\S]*?)<\/h1[^>]*>/, ''))
      .substring(0, 200)
      .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
      .trim()
      .concat('...');
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
      includes: "_includes"
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    passthroughFileCopy: true,
    //markdownTemplateEngine: "liquid",
    //htmlTemplateEngine: "liquid",
    //dataTemplateEngine: false
  }
};
