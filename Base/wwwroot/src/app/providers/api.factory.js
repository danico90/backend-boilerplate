(function() {
	angular
		.module('services')
		.factory('api', api);

	api.$inject = [
		'$http'
	];

	function api($http) {
		return {
			call: call
		};

		function call(method, url, data) {
			return $http({
				method: method.toUpperCase(),
				url: formatUrl(url),
				data: data || null
			});
		}
	}

	function formatUrl(url) {
		return url;
	}
})();
