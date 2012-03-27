	var codeSkinner = {
		init: function(config){
			if(!config){config = [];}
			this.template = config.template || this.getDefaultTemplate();
			console.log();
			this.skin();
		},
		skin: function(){
			var template = this.template;
			
			$.each($('pre'), function(){
				var $this = $(this),
					codeArray = [];
				$.each($this.text().split('\n'), function(i, line){
					codeArray[i] = {
						isOdd: i%2,
						code: line
					};
				})
				skin = Handlebars.compile(template);
				$this.replaceWith(skin(codeArray));
			});
		},
		getDefaultTemplate: function(){ //store this within a function so it's only created if we need it
			return "<ol class='code'>" + 
						"{{#each this}}" + 
							"<li {{#if isOdd}} class='odd'{{/if}}>" + 
								"{{code}}" + 
							"</li>"+
						"{{/each}}"+
					"</ol>";
		}
	}
	

