var alumi = {

	init:function() {
		var that = this;
		that.hook();
	},

	extend:function(namespace, funct) {
		var that = this;
		that.extended[namespace] = funct;
		that.hooks.push(namespace);
	},

	extension:function(namespace, arr) {
		var that = this;
		return that.extended[namespace](arr);
	},

	event:function(scope, event, funct) {
		var that = this;
		that.events[scope] = {event: event, function: funct};
	},

	hook:function() {
		var that = this;
		$.each(that.hooks, function(i,h) {
			that.extension(h, that);
		});

	}

};

alumi.extended = [];
alumi.hooks = [];
alumi.scope = [];
alumi.events = [];



