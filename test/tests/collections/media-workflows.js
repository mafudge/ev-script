define(function(require) {

    'use strict';

    var q = QUnit,
        _ = require('underscore'),
        testUtil = require('test/util'),
        evSettings = require('ev-config'),
        BaseCollection = require('ev-script/collections/base'),
        MediaWorkflows = require('ev-script/collections/media-workflows');

    q.module('Testing ev-script/collections/media-workflows', {
        setup: testUtil.setupHelper('ev-script/collections/media-workflows', {
            postAuthCallback: function() {
                this.workflows = new MediaWorkflows([], {
                    appId: this.appId
                });
            }
        }),
        teardown: testUtil.teardownHelper()
    });

    q.test('test extends base', 1, function() {
        // Make sure we're extending BaseCollection
        q.ok(this.workflows instanceof BaseCollection);
    });

    q.test('test initialize', 2, function() {
        // Make sure we've called BaseCollections initialize which sets
        // appId and config
        q.strictEqual(this.workflows.appId, this.appId);
        q.deepEqual(this.workflows.config, evSettings);
    });

    q.test('test parse', 2, function() {
        var data = this.workflows.parse({
            Data: 'foo',
            Settings: 'bar'
        });
        q.strictEqual(data, 'foo', 'expected parse to return Data value');
        q.strictEqual(this.workflows.settings, 'bar', 'expected parse to retrieve settings');
    });

    q.asyncTest('test fetch', 2, function() {
        var cacheKey = 'test';
        this.workflows.fetch({
            cacheKey: cacheKey,
            success: _.bind(function(collection, response, options) {
                console.log(JSON.stringify(collection));
                q.ok(collection.size() > 0);
                // Make sure caching is working
                q.deepEqual(this.workflows.getCached(cacheKey), response);
                q.start();
            }, this),
            error: function(collection, response, options) {
                q.ok(false, response.status);
                q.start();
            }
        });
    });
});
