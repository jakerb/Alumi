alumi.extend('loop', function(sys) {
	var that = this;
	sys.loop = {};

	$('*[data-loop]').each(function(k,v) {
		
		var scope = $(this).data('loop');
		var key = $(this).data('key');
		var value = $(this).data('value');
		var data = $(this).html();
		var item = "";
		var dedupe = [];

		if(sys.scope[scope]) {
			$.each(sys.scope[scope], function(k, v) {
				sys.bind.replace(key, value, function(key, value) {
					var i = "";
					i = data.replace(key, k);
					i = i.replace(value, v);
					if(!dedupe[k]) {
						dedupe[k] = true;
						item = item + i;
					}
					
				});
			});

			$(this).html(item);
		}
					
	});
});