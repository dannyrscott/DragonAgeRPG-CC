(function(app){
	if (!app.Collections) {app.Collections = {};}
	app.Collections.CharacterCollection = Backbone.Collection.extend({

		model: app.Models.CharacterModel,

		initialize: function () {
			_.bindAll(this, 'onReset','onAddModel');
			this.on('reset', this.onReset);
			this.on('add', this.onAddModel);
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