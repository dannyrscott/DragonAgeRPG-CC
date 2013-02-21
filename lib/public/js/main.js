(function($) {

	$(document).ready(function() {

		DragonAgeCC.currentChar = new DragonAgeCC.Models.CharacterModel({});
		DragonAgeCC.allChars = new DragonAgeCC.Collections.CharacterCollection();
		DragonAgeCC.startDB();
	});


})(jQuery)