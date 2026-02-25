var root = {
    _width: 0,
    _height: 0,
    _position: 0,
    setup: function (init) {
        this._width = $(window).width();
        this._height = $(window).height();

        root.bannerSlider();
        this.disableRightClick();


    },
    scrollEvent: function (init) {
        requestAnimationFrame(function () {
            //Add layer behind sticky menu
            var st = $(window).scrollTop();
            if (st >= 100)
                $('html').addClass('self-scrolled');
            else
                $('html').removeClass('self-scrolled');

        });
    },
    bannerSlider: function () {
        var swiper = new Swiper(".banner_slider", {
            grabCursor: true,
            effect: "creative",
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            pagination: {
                el: ".banner_slider .swiper-pagination",
                clickable: true
            },
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        });
    },
    disableRightClick: function () {
        $(document).on("contextmenu", function (e) {
            e.preventDefault();
            alert("Right-click is disabled.");
        });
        setInterval(function () {
            const devtoolsOpen = window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160;
            if (devtoolsOpen) {
                document.body.innerHTML = '<div class="dev_tool_enabled"><h1>DevTools is not allowed.</h1></div>';
            }
        }, 1000);
    },
}