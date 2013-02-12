define(function(require) {

    'use strict';

    var q = QUnit,
        _ = require('underscore'),
        cacheUtil = require('ev-script/util/cache'),
        authUtil = require('ev-script/util/auth'),
        evSettings = require('ev-config'),
        BaseCollection = require('ev-script/collections/base'),
        Libraries = require('ev-script/collections/libraries');

    q.module('Testing ev-script/collections/libraries', {
        setup: function() {
            this.appId = Math.random();
            cacheUtil.setAppConfig(this.appId, evSettings);
            authUtil.setAuth(evSettings.authId, null, evSettings.authPath, evSettings.testUser, evSettings.testPass);
            this.libs = new Libraries([], {
                appId: this.appId
            });
        },
    });

    q.test('test extends base', 1, function() {
        // Make sure we're extending BaseCollection
        q.ok(this.libs instanceof BaseCollection);
    });

    q.test('test initialize', 2, function() {
        // Make sure we've called BaseCollections initialize which sets
        // appId and config
        q.strictEqual(this.libs.appId, this.appId);
        q.deepEqual(this.libs.config, evSettings);
    });

    q.asyncTest('test fetch', 1, function() {
        this.libs.fetch({
            success: function(collection, response, options) {
                q.start();
                console.log(JSON.stringify(collection));
                q.ok(collection.size() > 0);
            }
        });
    });
});
