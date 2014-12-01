var test = require('tape');
var csspec = require('./index.js');


test('Test ID', function (t) {
	t.plan(1);

	csspec('#id', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [100]);
	});
});

test('Test Class', function (t) {
	t.plan(1);

	csspec('.class', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [10]);
	});
});
test('Test Multiple Classes', function (t) {
	t.plan(1);

	csspec('.class.class2', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [20]);
	});
});

test('Test Attribute', function (t) {
	t.plan(1);

	csspec('[rel^="external"]', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [10]);
	});
});

test('Test Multiple Attributes', function (t) {
	t.plan(1);

	csspec('[rel^="external"][href^=/][foo=bar]', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [30]);
	});
});

test('Test Pseudo-class', function (t) {
	t.plan(1);

	csspec(':hover', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [10]);
	});
});
test('Test Multiple Pseudo-classes', function (t) {
	t.plan(1);

	csspec(':hover:active', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [20]);
	});
});

test('Test Tag', function (t) {
	t.plan(1);

	csspec('div', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [1]);
	});
});

test('Test Pseudo-element', function (t) {
	t.plan(1);

	csspec(':before', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [1]);
	});
});

test('Test Everything', function (t) {
	t.plan(1);
	// 100 + 10 + 10 + 10 + 10 + 1 + 10 + 10 + 1 + 1 = 163
	csspec('#id .foo.class[href^=/][foo=bar] tag:hover:active a:before', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [163]);
	});
});

test('Test Multiple Selectors', function (t) {
	t.plan(1);
	// 100 + 10 + 10 + 10 + 10 + 1 + 10 + 10 + 1 + 1 = 163
	csspec('#id .foo.class[href^=/][foo=bar] tag:hover:active a:before, div, #id .class', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [163, 1, 110]);
	});
});

test('Test Universal', function (t) {
	t.plan(1);

	csspec('*', function(err, s) {
		if (err) throw err;

		t.deepEqual(s, [0]);
	});
});