(function() {

    'use strict';

    QUnit.config.autostart = false;

    require.config({
        baseUrl: '../lib/bower',
        paths: {
            'ev-script': '../../src/ev-script',
            'ev-config': '../../ev-config',
            'ev-scroll-loader': '../ev-scroll-loader',
            'test': '../../test',
            'jquery':  'jquery/jquery',
            'jquery-ui': 'jquery-ui/jquery-ui',
            'jquery.cookie': 'jquery.cookie/jquery.cookie',
            'jquery.plupload.queue': 'plupload/js/jquery.plupload.queue/jquery.plupload.queue',
            'plupload': 'plupload/js/plupload.full',
            'text': 'text/text',
            'underscore': 'lodash/dist/lodash.underscore',
            'backbone': 'backbone/backbone'
        },
        shim: {
            'jquery': {
                exports: 'jQuery'
            },
            'jquery-ui': ['jquery'],
            'jquery.cookie': ['jquery'],
            'plupload': [],
            'jquery.ui.plupload': ['jquery', 'plupload'],
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            }
        }
    });

    var testModules = [
        // Load our shims here
        'jquery',
        'jquery-ui',
        'jquery.cookie',
        'underscore',
        'backbone',
        // Test modules
        'test/tests/auth/basic/auth',
        'test/tests/auth/basic/view',
        'test/tests/auth/forms/auth',
        // TODO - 'tests/auth/forms/view',
        'test/tests/util/cache',
        'test/tests/util/events',
        'test/tests/collections/base',
        'test/tests/collections/organizations',
        'test/tests/collections/libraries',
        'test/tests/collections/media-workflows',
        'test/tests/collections/playlists',
        'test/tests/collections/videos',
        'test/tests/collections/identity-providers',
        'test/tests/models/playlist-settings',
        'test/tests/models/video-settings',
        'test/tests/models/video-encoding',
        'test/tests/models/current-user',
        'test/tests/views/base',
        'test/tests/views/field'
    ];

    require(testModules, function() {
        QUnit.start();
    });

}());
