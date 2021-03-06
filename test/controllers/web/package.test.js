/*!
 * cnpmjs.org - test/controllers/web/package.test.js
 *
 * Copyright(c) cnpmjs.org and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 */

'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var request = require('supertest');
var app = require('../../../servers/web');

describe('controllers/web/package.test.js', function () {
  before(function (done) {
    app.listen(0, done);
  });
  after(function (done) {
    app.close(done);
  });

  describe('GET /package/:name', function (done) {
    it('should get 200', function (done) {
      request(app)
      .get('/package/cutter')
      .expect(200)
      .expect(/<div id="package">/)
      .expect(/<th>Maintainers<\/th>/)
      .expect(/<th>Version<\/th>/, done);
    });

    it('should get 404', function (done) {
      request(app)
      .get('/package/not-exist-module')
      .expect(404, done);
    });
  });

  describe('GET /package/:name/:version', function (done) {
    it('should 200 when get by version', function (done) {
      request(app)
      .get('/package/cutter/0.0.2')
      .expect(200)
      .expect(/<div id="package">/)
      .expect(/<th>Maintainers<\/th>/)
      .expect(/<th>Version<\/th>/, done);
    });

    it('should 200 when get by tag', function (done) {
      request(app)
      .get('/package/cutter/latest')
      .expect(200)
      .expect(/<div id="package">/)
      .expect(/<th>Maintainers<\/th>/)
      .expect(/<th>Version<\/th>/, done);
    });
    it('should 404 when get by version not exist', function (done) {
      request(app)
      .get('/package/cutter/1.1.2')
      .expect(404, done);
    });

    it('should 404 when get by tag', function (done) {
      request(app)
      .get('/package/cutter/notexisttag')
      .expect(404, done);
    });
  });

  describe('GET　/browse/keyword/:word', function () {
    it('should list by keyword ok', function (done) {
      request(app)
      .get('/browse/keyword/cnpm')
      .expect(200)
      .expect(/Packages match/, done);
    });

    it('should list no match ok', function (done) {
      request(app)
      .get('/browse/keyword/notexistpackage')
      .expect(200)
      .expect(/Can not found package match notexistpackage/, done);
    });
  });

  describe('GET /sync/:name', function (done) {
    it('should display ok', function (done) {
      request(app)
      .get('/sync/cutter')
      .expect(200)
      .expect(/Sync Package/)
      .expect(/Log/, done);
    });
  });
});
