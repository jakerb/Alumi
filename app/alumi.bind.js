alumi.extend('bind', function(sys) {
	var that = this;
	sys.bind = {
		open: '{{',
		key: 'bind',
		namespace: '*[data-app]',
		close: '}}',
		models: []
	};

	sys.bind.listener = function(bin) {

		var ns = sys.bind.namespace;
		var el = '*[data-bind="' + bin + '"]';

		if(sys.events[bin]) {
			var event = sys.events[bin].event;
			$(ns).find(el).on(event, function(e) {
				sys.events[bin].function();
			});
		}

		$(ns).find(el).on('keyup', function(e) {
			var data = $(this).val() ? $(this).val() : $(this).text();
			$('*[data-listen="'+bin+'"]').text(data);
		});
	};

	sys.bind.replace = function(f, r, funct) {
		var find = sys.bind.open + f + sys.bind.close;
		var replace = sys.bind.open + r + sys.bind.close;
		if($(sys.bind.namespace + ' *:contains("' + f + '")').length) {
			for (var i = $(sys.bind.namespace + ' *:contains("' + f + '")').length; i >= 0; i--) {
				funct(find, replace);
			};
		} else {
			for (var i = $(sys.bind.namespace + ' *:contains("' + find + ')').length; i >= 0; i--) {
				funct(find, replace);
			};
		}
	};

	$('*[data-bind]').each(function(k,v) {
		var bind = $(this).data(sys.bind.key);
		var dom = $(sys.bind.namespace).html();
		var find = sys.bind.open + bind + sys.bind.close;

		var scope = sys.scope[bind] ? sys.scope[bind] : ''; 

		sys.bind.replace(bind, scope, function() {
			dom = dom.replace(find, '<ns data-listen="'+bind+'">'+scope+'</ns>');
			$(sys.bind.namespace).html(dom);
		});

		

		sys.bind.listener(bind);

		sys.bind.models.push(bind);

	});

});