module.exports.register = function (Handlebars, options)  {

	Handlebars.registerHelper('spacer', function(size) {

		return new Handlebars.SafeString('<tr><td class="spacer" height="' + size + '" style="height: ' + size + 'px;" >&nbsp;</td></tr>');
	});

	Handlebars.registerHelper('col-spacer', function() {
		return new Handlebars.SafeString('<td class="col-spacer" width="8">&nbsp;</td>');
	});

};
