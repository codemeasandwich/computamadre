$(document).ready(function(){
  var sitename = $( "#logo" ).data( "sitename" );
  $("article").fitVids();
  $(".newer-posts").html('<i class="fa fa-chevron-left"></i>');
  $(".older-posts").html('<i class="fa fa-chevron-right"></i>');
  $(".featured .article-main .inner").prepend('<i class="fa fa-bookmark"></i>');
  $("blockquote").prepend('<i class="fa fa-quote-left"></i>');
  $('.parallax').scrolly({bgParallax: true});
  $( ".coverContent" ).clone().appendTo( ".topbarContent" ).prepend('<a class="fa fa-arrow-up" href="/"></a>');
  $('a[rel="external"]').click(function(){
    $(this).attr('target','_blank');
  });
  $('.fa.fa-arrow-up').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
    });
});

var t = $("#mainwrap").offset().top;
$(document).scroll(function(){
    if($(this).scrollTop() > t)
    {   
        $('#topbar').fadeIn();
    }
    else
    {   
        $('#topbar').fadeOut();
    }
});
