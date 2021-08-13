const glob = require('glob');
const fs = require('fs');

const roles = new Set([
  'generate-rcq',
  'generate-rcs',
  'generate-rcy',
  'update-rcq-rank',
  'update-rcs-rank',
  'update-rcy-rank',
  'generate-report-pdf',

  'add-academic-year',
  'edit-academic-year',
  'view-academic-year',
  'set-active-year',
]);

glob(`./utils/templates/**/*.js`, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    const template = require(file);
    template.roles.forEach((role) => {
      roles.add(role);
    });
  });

  fs.writeFileSync(
    `${__dirname}/database/roles.js`,
    `module.exports = ${JSON.stringify(
      Array.from(roles).sort(),
      null,
      2
    ).replace(/"/g, "'")};
`
  );

  console.log('Generated permissions');
});
