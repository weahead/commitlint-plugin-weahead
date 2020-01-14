module.exports = {
  containsHTML: function(str) {
    let containsHTML;
    if (typeof str === 'string') {
      return /<\/?[a-z][\s\S]*>/i.test(str);
    }
    return containsHTML;
  },
};
