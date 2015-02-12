var app = angular.module('itunes');

app.service('itunesService', function($http, $q){

    this.getArtist = function(artist) {
    	var deferred = $q.defer();
    	$http({
    		method: "JSONP",
    		url:'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    	}).then(function(response){
    		deferred.resolve(response.data.results);
    		console.log(response)
    	})

    	return deferred.promise;
    }
});