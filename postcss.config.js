const purgecss = require('@fullhuman/postcss-purgecss').default;
const cssnano = require('cssnano');
const path = require('path');

module.exports = ctx => {
  const from = ctx.options.from || '';
  const normalized = path.normalize(from);
  const isMobile = normalized.includes(`${path.sep}mo${path.sep}`);

  return {
    plugins: [
      purgecss({
        content: isMobile
          ? ['./mo/**/*.html', './resources/frontAssets/mo/js/main.js']
          : ['./pc/**/*.html', './resources/frontAssets/pc/js/main.js'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
      cssnano({ preset: 'default' }),
    ],
  };
};
