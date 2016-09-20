(function() {
	angular
		.module('util')
		.factory('guid', guid);

	function guid() {
		return newGuid;
	}

	function newGuid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	function s4(): string {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
})();
