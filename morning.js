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
    $('form ~ p, section, footer').remove();
    var user = $('#username').val();

    if (!user) $('form').after('<p>You have to enter a last.fm username first</p>');
    else {

      var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&limit=200&user=' + user + '&api_key=' + api_key + '&from=' + fromUTS + '&to=' + toUTS + '&callback=?';

      $.getJSON(url, function(data) {

        if (data.error) $('form').after('<p>' + data.message + '</p>');

        else if (data.recenttracks) {
          if (data.recenttracks.track) {
            var tracks = data.recenttracks.track;
            var first = tracks.length ? tracks[tracks.length - 1] : tracks; // array or one track?

            var tune = first.name;
            var artist = first.artist['#text'];
            var album = first.album['#text'];
            var imgurl = first.image[first.image.length - 1]['#text'];
            var time = new Date(first.date.uts * 1000).toTimeString();

            $('form').after('<section><h1>' + artist + ' - ' + tune + '</h1></section>');
            if (imgurl)
              $('section').append('<figure><img src="' + imgurl + '" /><figcaption> from <em>' + album + '</em></figcaption></figure>');
            $('section').append('<p>played at ' + time + '</p>');
            $('section').after('<footer><p>Powered by AudioScrobbler</p><a href="http://www.last.fm"><img alt="last.fm logo" src="lastfm_black.gif"></a></footer>');
          }
          else $('form').after("<p>This user's morning was without a song</p>");
        }

        else $('form').after("<p>There was a problem with fetching user's morning tune</p>");
      });
    }

    return false;
  });

});
