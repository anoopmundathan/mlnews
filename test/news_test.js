var expect = require('chai').expect;

describe('News', function() {
  it('should fetch latest news from sites', function() {
    var fetchNews = require('../news').fetchNews;
    expect(fetchNews()).to.be.equal('Hi');
  });
});
