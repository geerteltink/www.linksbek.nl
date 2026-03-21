import { DateTime } from 'luxon';
import striptags from 'striptags';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import pluginRss from '@11ty/eleventy-plugin-rss';
import Image from '@11ty/eleventy-img';
import { minify } from 'html-minifier-terser';
import collections from './src/_lib/collections.js';
import footnote_plugin from 'markdown-it-footnote';

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
    sizes: sizes || '100vw',
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
}

export default async function (eleventyConfig) {
  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addAsyncShortcode('image', imageShortcode);

  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .setLocale('nl')
      .toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter('isoDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('isoDateTime', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISO();
  });

  eleventyConfig.addFilter('summary', (data) => {
    return striptags(data.replace(/<h1[^>]*>([\s\S]*?)<\/h1[^>]*>/, ''))
      .substring(0, 200)
      .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
      .trim()
      .concat('...');
  });

  eleventyConfig.addFilter('getRandom', function (collection) {
    const slicedCollection = collection.slice(5);

    return slicedCollection.splice(
      Math.floor(Math.random() * slicedCollection.length),
      1,
    )[0];
  });

  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(footnote_plugin));

  eleventyConfig.addWatchTarget('./src/_lib');
  eleventyConfig.addWatchTarget('./src/assets');

  eleventyConfig.addPassthroughCopy('./src/favicon.png');
  eleventyConfig.addPassthroughCopy('./src/assets/images/logo-linksbek.gif');
  eleventyConfig.addPassthroughCopy('./src/assets/videos/');

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.NODE_ENV === 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });
}

// This named export is optional
export const config = {
  dir: {
    input: 'src',
    output: '_site',
    data: '_data',
    includes: '_includes',
  },
  templateFormats: ['html', 'njk', 'md', '11ty.js'],
  passthroughFileCopy: true,
  //markdownTemplateEngine: 'liquid',
  //htmlTemplateEngine: 'liquid',
  //dataTemplateEngine: false
};
