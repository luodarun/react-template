const viewGenerator = require('./plop-templates/view/prompt');

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator);
};
