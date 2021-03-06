// tests/routes/toLink.js
var test = require('tape');

/**
 * define a helper to assert an object is an Array
 */
function assertArray(t, val) {
    t.equal(Object.prototype.toString.call(val), '[object Array]');
}

// ************************** prepareLink() *************************************

test('Module should complete the link', function (t) {
    t.plan(1);
    var checkLink = require('../../metier/checkLink');
    t.equal(checkLink.prepareLink("www.free.fr"), "http://www.free.fr");
});

test('Module should work with empty paremeters', function (t) {
    t.plan(1);
    var checkLink = require('../../metier/checkLink');
    t.equal(checkLink.prepareLink(""), "http://");
});

test('Module should return the same link', function (t) {
    t.plan(1);
    var checkLink = require('../../metier/checkLink');
    t.equal(checkLink.prepareLink("https://www.gtte.com/alteza?com=ty&86=AE"), "https://www.gtte.com/alteza?com=ty&86=AE");
});

// ************************** verifyLink() *************************************

test('Module should return true', function (t) {
    t.plan(2);
    var checkLink = require('../../metier/checkLink');
    t.ok(checkLink.verifyLink("https://www.gtte.com/alteza?com=ty&86=AE"));
    t.ok(checkLink.verifyLink("gtte.com/alteza?com=ty&86=AE"));
});

test('Module should return false', function (t) {
    t.plan(2);
    var checkLink = require('../../metier/checkLink');
    t.notOk(checkLink.verifyLink("com/alteza?com=ty&86=AE"));
    t.notOk(checkLink.verifyLink(""));
});