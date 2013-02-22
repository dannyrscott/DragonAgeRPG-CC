(function($) {

	$(document).ready(function() {

		DragonAgeCC.currentChar = new DragonAgeCC.Models.CharacterModel({});
		DragonAgeCC.currentChar.view = new DragonAgeCC.Views.CharacterView({
			model: DragonAgeCC.currentChar
		});
		DragonAgeCC.currentChar.view.render();
		DragonAgeCC.allChars = new DragonAgeCC.Collections.CharacterCollection();
		DragonAgeCC.startDB();
	});


})(jQuery)