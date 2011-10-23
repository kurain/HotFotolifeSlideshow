(function($){

var base_url = 'http://f.hatena.ne.jp/hotfoto?mode=rss';
//var base_url = 'http://f.hatena.ne.jp/r_kurain/rss';
var $container;
var currentIndex = 0;
var photoURLs = [];

function showPhoto(){
    if(currentIndex >= photoURLs.length){
        currentIndex = 0;
    }
    $container.fadeOut(
        "slow",
        function(){
            $container.attr('src',photoURLs[currentIndex]);
            $container.fadeIn("slow");
        }
    );
    currentIndex++;
    setTimeout( showPhoto, 7000 );
}

function setup(){
    $container = $('#photo');
    var $window = $(window);
    $container.css('maxWidth', $window.width());
    $container.css('maxHeight', $window.height());

    var $photoContainer = $('#container');
    $photoContainer.css('width', $window.width());
    $photoContainer.css('height', $window.height());

    $.yql(
        "SELECT * FROM rss WHERE url=#{url}",
        {
          url: base_url
        },
        function (data) {
            var items = shuffle( data.query.results.item );
            var $body = $('body');
            photoURLs = $.map(items, function(n,i){
                return n.imageurl;
            });
            showPhoto();
            $.each(photoURLs,function(){
                $('<img>').attr('src',this).hide().appendTo($body).remove();
            });
        }
    );
};

function shuffle(arr) {
    for( // see http://www.yelotofu.com/2008/08/jquery-shuffle-plugin/
      var j, x, i = arr.length; i;
      j = parseInt(Math.random() * i),
      x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
}

$(setup);

})(jQuery);