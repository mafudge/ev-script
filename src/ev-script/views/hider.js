/*global define*/
define(function(require) {

    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone');

    return Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'hideHandler', 'logoutHandler', 'render');
            this.picker = options.picker;
            this.app = options.app;
            this.app.eventAggr.bind('authSet', this.render);
            this.app.eventAggr.bind('authRemoved', this.render);
        },
        events: {
            'click a.action-hide': 'hideHandler',
            'click a.action-logout': 'logoutHandler'
        },
        render: function() {
            var html = '<a class="action-hide" href="#" title="Hide Picker">Hide</a>' + (this.app.auth.hasAuth() ? '<a class="action-logout" href="#" title="Logout">Logout</a>' : '');
            this.$el.html(html);
        },
        hideHandler: function(e) {
            this.picker.hidePicker();
            e.preventDefault();
        },
        logoutHandler: function(e) {
            this.app.auth.removeAuth();
            e.preventDefault();
        }
    });

});
