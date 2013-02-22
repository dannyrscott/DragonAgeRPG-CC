(function(app){
	if (!app.Views) {app.Views = {};}
	app.Views.CharacterListView = Backbone.View.extend({

		el: '._characterList',

		events: {
			"click ._charLoad" : "loadChar"
		},

		initialize: function () {
			_.bindAll(this, 'render', 'loadChar');
		},

		loadChar: function(e) {
			e.preventDefault();
			console.log('click');
			var $this = $(e.target),
				id =$this.attr('cid');
			DragonAgeCC.currentChar.clear({silent:true});
			DragonAgeCC.currentChar.set(DragonAgeCC.allChars.get(id).toJSON(),{silent:true});
			DragonAgeCC.currentChar.view.render();
		},

		render: function() {
			var data = this.model.toJSON();
			data.cid = this.model.cid;
			this.$el.append(Handlebars.templates['characterList'](data));
		},

	});
})(DragonAgeCC);