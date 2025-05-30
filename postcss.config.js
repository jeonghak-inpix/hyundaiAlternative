const purgecss = require('@fullhuman/postcss-purgecss').default;
const cssnano = require('cssnano');

const isMobile = process.env.POSTCSS_ENV === 'mo';

module.exports = {
  plugins: [
    purgecss({
      content: isMobile
        ? ['./mo/**/*.html', './resources/frontAssets/mo/js/**/*.js']
        : ['./pc/**/*.html', './resources/frontAssets/pc/js/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    cssnano({ preset: 'default' }),
  ],
};
