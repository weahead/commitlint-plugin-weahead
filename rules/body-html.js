const message = require('@commitlint/message').default;

const { containsHTML } = require('../utils');

module.exports = function(parsed, when) {
  const { body } = parsed;

  const negated = when === 'always';

  const bodyContainsHTML = containsHTML(body);

  return [
    negated ? bodyContainsHTML : !bodyContainsHTML,
    message(['body', negated ? 'must' : 'must not', 'contain any HTML']),
  ];
};
