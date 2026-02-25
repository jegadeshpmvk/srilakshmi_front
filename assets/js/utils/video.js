//Embed Video as overlay
var video = {
    embedUrl: function (link, autoplay, loop) {
        if (typeof autoplay == "undefined")
            autoplay = true;
        if (typeof loop == "undefined")
            loop = false;

        var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
        var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
        var embedUrl = "";

        if (pattern1.test(link)) {
            embedUrl = link.replace(pattern1, "https://player.vimeo.com/video/$1");
            if (autoplay) {
                embedUrl += "?autoplay=1&background=1";
                if (loop)
                    embedUrl += "&loop=1";
            }
            else if (loop)
                embedUrl += "?loop=1";
        }
        else if (pattern2.test(link)) {
            embedUrl = link.replace(pattern2, "https://www.youtube.com/embed/$1?rel=0&amp;showinfo=0&controls=0");
            if (autoplay)
                embedUrl += "&autoplay=1&mute=1";
            if (loop) {
                var id = this.getID(embedUrl);
                embedUrl += "&loop=1&playlist=" + id;
            }
        }

        return embedUrl;
    },
    getID: function (url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    },
    embed: function (link) {
        var url = this.embedUrl(link);
        this.iframeEmbed(url);
    },
    iframeEmbed: function (link) {
        var iframe = '<iframe width="420" height="345" src="' + link + '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>',
            html = '<div class="overlay video-overlay">' + iframe + '<a class="close">&#215;</a></div>';

        $('body').append(html);
        this.objectFit();

        scrollbar.disable('has-overlay');
    },
    close: function () {
        scrollbar.enable('has-overlay', function () {
            $('.video-overlay').remove();
        });
    },
    objectFit: function () {
        var wid = 1280,
            hei = 720,
            wrapper = $('.overlay'),
            wrapperWid = wrapper.width() * .9,
            wrapperHei = wrapper.height() * .9,
            newWid = wrapperWid,
            newHei = Math.floor(newWid * hei / wid);

        if (newHei > wrapperHei) {
            newHei = wrapperHei;
            newWid = Math.floor(newHei * wid / hei);
        }

        $('.video-overlay iframe').css({
            'width': newWid + 'px',
            'height': newHei + 'px'
        });
    }
};