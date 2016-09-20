/*
*	App routes configuration
*/

(function() {
	angular.module('app')
		.config(router);

	// Dependencies injection
	router.$inject = [
		'$stateProvider',
		'$urlRouterProvider'
	];

	function router(
		$stateProvider,
		$urlRouterProvider) {
		/*
		*	Routing configuration (UI-router)
		*/
		
		// Url router setup
		$urlRouterProvider.otherwise('/');

		// States definition
		$stateProvider

		.state('main', {
			url: '/',
			templateUrl: '/pages/main/main.tpl.html',
			controller: 'mainCtrl',
			controllerAs: 'main'
		});
	}
})();
