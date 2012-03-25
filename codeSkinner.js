var codeSkinner = {
	init: function(config){
		this.template = config.template;
		this.skin();
	},
	skin: function(){
		var template = this.template;
		
		$.each($('pre'), function(){
			var $this = $(this),
				codeArray = [];
			$.each($this.text().split('\n'), function(i, line){
				codeArray[i] = {
					isOdd: (i%2==0),
					code: line
				};
			})
			skin = Handlebars.compile(template);
			$this.replaceWith(skin(codeArray));
		});
	}
}

