const ghpages = require('gh-pages');

ghpages.publish(
  'dist',
  {
    message: `Update ${new Date().toISOString()}`,
    push: false,
  },
  err => {
    console.error(err);
  }
);
