/*global window*/
(function() {

    'use strict';

    /*global document*/
    require.config({
        baseUrl: '../../lib/bower',
        paths: {
            'ev-script': '../../dist/ev-script',
            'jquery':  'jquery/jquery',
            'jquery-ui': 'jquery-ui/jquery-ui',
            'jquery.cookie': 'jquery.cookie/jquery.cookie',
            'jquery.plupload.queue': 'plupload/js/jquery.plupload.queue/jquery.plupload.queue',
            'plupload': 'plupload/js/plupload.full',
            'underscore': 'lodash/dist/lodash.underscore',
            'backbone': 'backbone/backbone',
            'ev-config': '../../ev-config'
        },
        shim: {
            'jquery': {
                exports: 'jQuery'
            },
            'jquery-ui': ['jquery'],
            'jquery.cookie': ['jquery'],
            'plupload': [],
            'jquery.plupload.queue': ['jquery', 'plupload'],
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            }
        }
    });

    require(['ev-config', 'ev-script', 'jquery'], function(evSettings, EV, $) {


        var app = new EV.EnsembleApp(evSettings);

        app.appEvents.bind('fieldUpdated', function($field, value) {
            var $videoEmbed = $('.video-embed');
            var $playlistEmbed = $('.playlist-embed');
            if ($field[0].id === 'video') {
                if (value) {
                    app.handleEmbed($videoEmbed, new EV.VideoSettings(value));
                } else {
                    $videoEmbed.html('');
                }
            } else if ($field[0].id === 'playlist') {
                if (value) {
                    app.handleEmbed($playlistEmbed, new EV.PlaylistSettings(value));
                } else {
                    $playlistEmbed.html('');
                }
            }
        });

        $(document).ready(function() {
            app.done(function() {
                app.handleField($('#videoWrap')[0], new EV.VideoSettings(), '#video');
                app.handleField($('#playlistWrap')[0], new EV.PlaylistSettings(), '#playlist');
            }).fail(function(message) {
                window.alert(message);
            });
        });
    });

}());
