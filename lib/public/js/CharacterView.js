(function(app){
	if (!app.Views) {app.Views = {};}
	app.Views.CharacterView = Backbone.View.extend({

		el: '._character',

		events: {
		},

		initialize: function () {
			_.bindAll(this, 'render');
		},

		render: function() {
			this.$el.html(Handlebars.templates['character'](this.model.toJSON()));
		},

	});
})(DragonAgeCC);