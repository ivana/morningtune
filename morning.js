$(function(){
  var api_key = '502149483544d6c38f633b3b89f88fd0';
  var today = new Date();

  // offset = UTC - localtime [h]
  var offset = new Date().getTimezoneOffset() / 60;
  // fromUTS = 5am_localtime + offset [s]; UTS -> UTC seconds
  var fromUTS = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 5 + offset) / 1000;
  // toUTS = 1pm_localtime + offset [s]
  var toUTS = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 13 + offset) / 1000;

  $('form#user').submit(function(){
    var user = $('#username').val();

    if (!user) console.log('You have to enter a last.fm username first');
    else { // console.log(user)

      var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&limit=200&user=' + user + '&api_key=' + api_key + '&from=' + fromUTS + '&to=' + toUTS;

      $.get(url, function(data) {
        if (data.error) console.log(data.message);

        else if (data.recenttracks) { // console.log(data.recenttracks)
          if (data.recenttracks.track) {
            var tune = data.recenttracks.track[data.recenttracks.track.length - 1].name;
            console.log(tune);
          }
          else console.log("This user's morning was without a song :(");
        }

        else console.log("There was a problem with fetching user's morning tune");
      });
    }

    return false;
  });

});
