alumi.extend('replace', function(sys) {
	var that = this;
	sys.replace = {
		dataAttr: 'replace',
		seperator: ':'
	};


	$('*[data-replace]').each(function(k,v) {
		var exp = $(this).data(sys.replace.dataAttr);
		exp = exp.split(sys.replace.seperator);

		var scope = sys.scope[exp[1]] ? sys.scope[exp[1]] : exp[1];
		var num = $(this).text().split(exp[0]);

		for (var i = num.length - 1; i >= 0; i--) {
			$(this).text($(this).text().replace(exp[0], scope));
		};

	});
});