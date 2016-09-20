/*
*	Modules definition
*/

(function() {
	// Pages module defition and injection
	angular.module('pages', []);
	// Components module defition and injection
	angular.module('components', []);
	// Services module defition and injection
	angular.module('services', []);
	// Utils module defition and injection
	angular.module('util', []);
	// Vendors module definition and injection
	angular.module('vendor', [
		'ui.router'
	]);
	// App main Module definition and injection
	angular.module('app', [
		'templates',
		'vendor',
		'components',
		'pages',
		'util'
	]);
})();