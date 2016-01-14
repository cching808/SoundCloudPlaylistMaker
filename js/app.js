'use strict';

    angular.module('app', ['ui.bootstrap']); // declare module

    var SongController = function($scope, $modal, $log){
        $scope.songs=[];
        $scope.playlist=[];

        $scope.onclick = function () {
            $scope.songs.length = 0;
            SC.get('/tracks', { genres:$scope.tracks }, function (tracks) {
                for(var i = 0; i < tracks.length; i++) {
                    tracks[i].selected = false;
                    $scope.songs.push(tracks[i]); //push each object into songs array
                    console.log("during");
                }//Loop through array of track objects
                $scope.songs.sort(function(a,b) {
                    return b.playback_count - a.playback_count;
                });

                $scope.user = '';
                $scope.$apply(); // perform proper scope life cycle, watch changes on songs.
            }); // get tracks by genre from soundcloud

        };//run on click

        $scope.selectedSongs = [];
        $scope.addTo = function () {
            //console.log($scope.songs);
            //$scope.selectedSongs = [];
            for(var i = 0; i < $scope.songs.length; i++) {
                console.log("inside for");
                if($scope.songs[i].selected)
                {
                    $scope.selectedSongs.push({ "songs": $scope.songs[i], "index": $scope.selectedSongs.length });
                    //console.log("adding songs" + "selectedSongs: " + $scope.selectedSongs);
                }
            }
            //console.log("after apply");

        };
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.open = function (index) {
            console.log("inside open");
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    index: function() {
                        return index;
                    },
                    songs: function () {
                        return $scope.selectedSongs;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }; // declare controller

    var ModalInstanceCtrl = function($scope, $modalInstance, songs, index){
        $scope.selectedSongs = songs;
        //console.log("object:" + $scope.selectedSongs[index].songs.permalink_url);

        $scope.index = index;
        var track_url = $scope.selectedSongs[index].songs.permalink_url;

        console.log("track url:" + track_url);

        $scope.playSong = function () {
            SC.oEmbed(track_url, { auto_play: true, maxheight: 300, iframe: true}, document.getElementById("modal_view"));
        };


        $scope.delete = function () {
                //console.log("inside delete: " + $scope.selectedSongs[index].songs.title);
                $scope.selectedSongs.splice(index, 1);
                for(var i = index; i < $scope.selectedSongs.length; i++) {
                    $scope.selectedSongs[i].index--;
                }
               // $scope.selectedSongs.length--;
                $modalInstance.close($scope.selectedSongs);

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

function ran_col() { //function name
    var color = '#'; // hexadecimal starting symbol
    var letters = ['FF7C00','046D90','928b3f','C7191D','E7CC00','55B955','61142B']; //Set your colors here
    color += letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('posts').style.background = color; // Setting the random color on your div element.
}