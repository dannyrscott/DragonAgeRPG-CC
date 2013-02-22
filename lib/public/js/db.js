// https://developer.mozilla.org/en/IndexedDB/Using_IndexedDB
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;


DragonAgeCC.db;

DragonAgeCC.getCharacters = function() {
	var transaction = db.transaction(["characters"], "readonly");
	var objectStore = transaction.objectStore("characters");
	var chars = [];
	objectStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			chars.push(cursor.value);
			DragonAgeCC.allChars.add(cursor.value);
			cursor.continue();
		}
	};
};
DragonAgeCC.storeCharacter = function(data) {
	var _self = this;
	if (_.isEmpty(data)) { //No Data, do nothing
		return false;
	}
	var request = db.transaction(["characters"], "readwrite")
					.objectStore("characters")
					.put(data);

	request.onsuccess = function(event) {
		//_self.getCharacters();
	};


}
DragonAgeCC.startDB = function(){
	var _self = this;
	var openRequest = indexedDB.open("characters",2);

	openRequest.onupgradeneeded = function(e) {

		console.log("running onupgradeneeded");
		var thisDb = e.target.result;

		//temp delete
		//thisDb.deleteObjectStore("note");

		//Create Note
		if(!thisDb.objectStoreNames.contains("characters")) {
			var objectStore = thisDb.createObjectStore("characters", { keyPath: "name"});
			objectStore.createIndex("name", "name", { unique: true });
		}

	}

	openRequest.onsuccess = function(e) {
		db = e.target.result;

		db.onerror = function(event) {
		  // Generic error handler for all errors targeted at this database's
		  // requests!
		  alert("Database error: " + event.target.errorCode);
		  console.dir(event.target);
		};


		_self.getCharacters();
	}


}