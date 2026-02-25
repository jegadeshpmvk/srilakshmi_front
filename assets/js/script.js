$(function () {
    /*********************
     ALL CLICKS
     *********************/

    //Open a overlay
    $('body').on('click', 'a.video_player', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.preventDefault();
        video.embed(this.href);
    });


    

    //Close overlay
    $('body').on('click', '.video-overlay .close', function (e) {
        e.stopPropagation();
        video.close();
    });


    root.setup(1);

    $(window).resize(function () {
        root.setup(0);
    });

    $(window).scroll(root.scrollEvent);
});

$(window).on('load', function () {
    root.scrollEvent();
});