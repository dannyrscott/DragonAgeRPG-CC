(function(app){
	if (!app.Models) {app.Models = {};}
	app.Models.CharacterModel = Backbone.Model.extend({

		initialize: function() {
			console.log('model start');
			_.bindAll(this, 'onChange');
			this.on('change', this.onChange);

			this.onChange();
		},

		onChange: function() {
			if (!this.view) {
				this.view = new app.Views.CharacterView({
					model: this
				});
			}
			this.view.render();
		}
	});
})(DragonAgeCC);