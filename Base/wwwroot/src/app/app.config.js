/*
*	App main configuration
*/

(function() {
	angular
		.module('app')
		.config(config);

	// Dependencies injection
	config.$inject = [];

	function config($httpProvider) {}
})();