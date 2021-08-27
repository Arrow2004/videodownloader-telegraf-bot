function testUrl(url) {
  let a =
    /^(http:\/\/)|(https:\/\/)+(www.youtube.com)|(www.instagram.com)|(youtu.be)+\/+\w/i;
  return a.test(url);
}
function testYoutube(url) {
  let a = /^(http:\/\/)|(https:\/\/)+(www.youtube.com)|(youtu.be)\/+\w/i;
  return a.test(url);
}
function testInsta(url) {
  let a = /^(http:\/\/)|(https:\/\/)+www.instagram.com\/+p+\/+\w/i;
  return a.test(url);
}
module.exports.testUrl = testUrl;
module.exports.testYoutube = testYoutube;
module.exports.testInsta = testInsta;
