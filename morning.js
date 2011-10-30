$(function(){
  var api_key = '502149483544d6c38f633b3b89f88fd0';

  var today = new Date();
  // consider a previous day as today if it's less than 5am
  if (today.getHours() < 5) today = new Date(new Date() - 1000 * 60 * 60 * 24);

  // offset = UTC - localtime [h]
  var offset = new Date().getTimezoneOffset() / 60;
  // fromUTS = 5am_localtime + offset [s]; UTS -> UTC seconds
  var fromUTS = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 5 + offset) / 1000;
  // toUTS = 1pm_localtime + offset [s]
  var toUTS = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 13 + offset) / 1000;


  $('form#user').live('submit', function(){
    var user = $('#username').val();

    if (!user) $('form + p').html('You have to enter a last.fm username first');
    else { // console.log(user)

      var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&limit=200&user=' + user + '&api_key=' + api_key + '&from=' + fromUTS + '&to=' + toUTS;

      $.get(url, function(data) { // console.log(data)

        // Firefox thinks data.property is a label and throws the invalid label syntax error
        if (navigator.userAgent.match(/Firefox/)) data = eval('(' + data + ')');

        if (data.error) $('form + p').html(data.message);

        else if (data.recenttracks) { // console.log(data.recenttracks)
          if (data.recenttracks.track) {
            var tracks = data.recenttracks.track;
            var first = tracks.length ? tracks[tracks.length - 1] : tracks; // array or one track?
            var tune = first.name;
            $('form + p').html(tune);
          }
          else $('form + p').html("This user's morning was without a song :(");
        }

        else $('form + p').html("There was a problem with fetching user's morning tune");
      });
    }

    return false;
  });

});
