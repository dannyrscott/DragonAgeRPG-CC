(function(app){
	if (!app.Models) {app.Models = {};}
	app.Models.CharacterListModel = Backbone.Model.extend({

		initialize: function() {

			_.bindAll(this, 'onChange');
			this.on('change', this.onChange);

			this.onChange();
		},

		onChange: function() {
			// if (!this.view) {
			// 	this.view = new app.Views.CharacterView({
			// 		model: this
			// 	});
			// }
			if (this.view) {
				this.view.render();
				app.storeCharacter(this.toJSON());
			}

		}
	});
})(DragonAgeCC);