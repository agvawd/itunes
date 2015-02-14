var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){
    
    $scope.defaultInfo = {
      search: '',
      mediaType: "all",
      sortBy: "artistName"
    }

    $scope.filterOptions = {
      filterText: ""
    };

    $scope.sortInfo = $scope.defaultInfo.sortBy;

    $scope.getSongData = function() { 
      itunesService.getArtist($scope.artist).then(function(response){
        var cleanSongs = [];
        for(var i = 0; i < response.length; i++) {
          cleanSongs.push({
            Artist: response[i].artistName,
            Collection: response[i].collectionName,
            AlbumArt: response[i].artworkUrl30,
            Type: response[i].primaryGenreName,
            Song: response[i].trackName,
            TrackPrice: response[i].trackPrice,
            CollectionPrice: response[i].collectionPrice
          })
        }
        $scope.songData = cleanSongs;
      });
    };


    $scope.updateSortInfo = function() {
      $scope.gridOptions.sortBy($scope.defaultInfo.sortBy);
    }

  $scope.gridOptions = { 
      data: 'songData',
      height: '110px',
      filterOptions: $scope.filterOptions,
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Song', displayName: 'Song'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'TrackPrice', displayName: 'Track Price'},
        {field: 'CollectionPrice', displayName: 'Collection Price'}
      ]
  };
});