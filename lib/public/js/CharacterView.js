(function(app){
	if (!app.Views) {app.Views = {};}
	app.Views.CharacterView = Backbone.View.extend({

		el: '._character',
		theForm: '#character',

		events: {
			"change input": "valueChanged"
		},

		initialize: function () {
			_.bindAll(this, 'render', 'valueChanged');
		},

		valueChanged: function(e) {
			this.model.clear({silent:true});
			this.model.set(Backbone.Syphon.serialize(this));
		},

		render: function() {
			this.$el.html(Handlebars.templates['character'](this.model.toJSON()));
		},

	});
})(DragonAgeCC);