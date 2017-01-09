module.exports.register = function (Handlebars, options)  {
	Handlebars.registerHelper('contact-btn-row', function(url) {
	  url = Handlebars.escapeExpression(url);
	  // text = Handlebars.escapeExpression(text);

	  return new Handlebars.SafeString(
	    "<tr >\
				<td class=\"col-6\">\
					<table width=\"595\">\
						<tr class=\"align-center\" align=\"center\">\
							<td>\
								<a href="+ url +">\
									<button class=\"btn btn-default h2 light-text\" type=\"button\" name=\"link\">See Details</button>\
								</a>\
							</td>\
							<td>\
									<button class=\"btn btn-dark h2 light-text\" type=\"button\" name=\"phone number\">Call Now: (800) 778-6060</button>\
							</td>\
						</tr>\
					</table>\
				</td>\
			</tr>"
	  );
	});
};
