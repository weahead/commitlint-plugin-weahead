const message = require('@commitlint/message').default;

const { containsHTML } = require('../utils');

module.exports = function(parsed, when) {
  const { header } = parsed;

  const negated = when === 'always';

  const headerContainsHTML = containsHTML(header);

  return [
    negated ? headerContainsHTML : !headerContainsHTML,
    message(['header', negated ? 'must' : 'must not', 'contain any HTML']),
  ];
};
