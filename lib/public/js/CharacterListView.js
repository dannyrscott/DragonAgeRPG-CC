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

			var $this = $(e.target),
				id =$this.attr('cid');
			DragonAgeCC.currentChar.set(DragonAgeCC.allChars.get(id).toJSON());
		},

		render: function() {
			var data = this.model.toJSON();
			data.cid = this.model.cid;
			this.$el.append(Handlebars.templates['characterList'](data));
		},

	});
})(DragonAgeCC);