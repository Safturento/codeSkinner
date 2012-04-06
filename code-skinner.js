if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

function viewPlain(){

}

var defaultTemplate = "\
<div class='outerCodeWrapper'>\
	<div class='buttons'>\
		<button class='gutterToggle'>numbers</button>\
	</div>\
	<div class='innerCodeWrapper'>\
		<ul class='gutter'>\
			{{#each this}}\
				<li>{{number}}</li>\
			{{/each}}\
		</ul>\
		<ul class='code'>\
			{{#each this}}\
				<li>{{code}}</li>\
			{{/each}}\
		</ul>\
	</div>\
</div>";

(function($, window, document, undefined){
	var SkinnedCode = {
		init: function( options, elem ){
			var self = this;
			self.options = $.extend( {}, $.fn.codeSkinner.defaults, options );
			self.elem = elem;
			self.$elem = $(elem);

			this.skin(self.$elem);
		},

		skin: function(element){
			var options = this.options;
			element.each(function(){
				var $this = $(this),
					codeArray = $this.text().split('\n'),
					offset = $this.data('line') || 0;
				$.each(codeArray, function(i, line){
					codeArray[i] = {
						number: i+offset,
						code: line == '' ? ' ' : line
					}
				});
				skin = Handlebars.compile(options.template);
				
				var $newBlock = $(skin(codeArray)), 
					toggle = $($newBlock.find(options.gutter.toggle)),
					frame = $($newBlock.find(options.gutter.frame));

				toggle.addClass('active');
				toggle.on('click', function(){
					$(this).toggleClass('active');
					frame.animate(options.gutter.animation);
				});
				
				$this.replaceWith($newBlock);
			});
		},

		toggleLineNums: function(){

		}
	}

	$.fn.codeSkinner = function( options ) {
		return this.each(function() {
			var code = Object.create( SkinnedCode );
			
			code.init( options, this );
			$.data( this, 'codeSkinner', code );
		});
	};

	$.fn.codeSkinner.defaults = {
		template: defaultTemplate,
		gutter: {
			frame: '.gutter',
			toggle: '.gutterToggle',
			animation: {
				paddingLeft: 'toggle',
				paddingRight: 'toggle',
				width: 'toggle'
			}
		}
	};

})( jQuery, window, document );