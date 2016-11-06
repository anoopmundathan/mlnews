'use strict';

$(document).ready(function() {
  $('.news').click(function(e) {
    e.preventDefault();

    $("p").remove();
    var href = $(this).attr('href');
    var self = $(this);
    
    getNews(href, function(data) {
      self.append('<p>' + data.news + '</p>');
    });

  }); // click

  function getNews(href, callback) {
      $.ajax('/news', {
        data : { link : href },
        success : function(data) {
          callback(data);
        }
      }); // End of ajax
  }

}); // document.ready
