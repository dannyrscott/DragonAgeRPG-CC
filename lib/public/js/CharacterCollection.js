(function(app){
	if (!app.Collections) {app.Collections = {};}
	app.Collections.CharacterCollection = Backbone.Collection.extend({

		model: app.Models.CharacterModel,

		initialize: function () {
			_.bindAll(this, 'onReset');
			this.on('reset', this.onReset);
		},

		onAddModel: function(theModel) {
			theModel.view = new app.Views.CharacterListView({
				model: theModel
			});
			theModel.view.render();
		},

		onReset: function() {
			var _self = this;

			this.forEach(function(v){
				_self.onAddModel(v);
			});
		}
	});
})(DragonAgeCC);