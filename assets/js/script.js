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

    $('body').on('click', '.faq_title', function () {

        var item = $(this).closest('.faq_item');
        var content = item.find('.faq_content');

        // Close other items
        $('.faq_item').not(item).removeClass('active')
            .find('.faq_content').stop(true, true).slideUp(300);

        // Toggle current
        if (item.hasClass('active')) {
            item.removeClass('active');
            content.stop(true, true).slideUp(300);
        } else {
            item.addClass('active');
            content.stop(true, true).slideDown(300);
        }

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