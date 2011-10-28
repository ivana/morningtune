$(function(){
  var today = new Date();

  // offset = UTC - localtime [h]
  var offset = new Date().getTimezoneOffset() / 60;
  // fromUTS = 5am_localtime + offset [s]; UTS -> UTC seconds
  var fromUTS = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 5 + offset) / 1000;
  // toUTS = 1pm_localtime + offset [s]
  var toUTS = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 13 + offset) / 1000;

  var user = 'erin4';
  var api_key = '502149483544d6c38f633b3b89f88fd0';
  var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&limit=200&user=' + user + '&api_key=' + api_key + '&from=' + fromUTS + '&to=' + toUTS;

  $.get(url, function(data){
    console.log(data.recenttracks.track[data.recenttracks.track.length - 1].name)
  });
});