const message = require('@commitlint/message').default;

const { containsHTML } = require('../utils');

module.exports = function(parsed, when) {
  const { header: subject } = parsed;

  const negated = when === 'always';

  const headerContainsHTML = containsHTML(subject);

  return [
    negated ? headerContainsHTML : !headerContainsHTML,
    message(['subject', negated ? 'must' : 'must not', 'contain any HTML']),
  ];
};
