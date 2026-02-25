<!DOCTYPE html>
<html lang="en-US" class="no-js no-svg">

<head>
    <script type="text/javascript">
        /*! modernizr 3.6.0 (Custom Build) | MIT *
         * https://modernizr.com/download/?-cors-cssanimations-csstransforms-csstransitions-hiddenscroll-hovermq-requestanimationframe-touchevents-video-setclasses-cssclassprefix:self_ !*/
        ! function(e, n, t) {
            function r(e, n) {
                return typeof e === n
            }

            function o() {
                var e, n, t, o, i, s, a;
                for (var l in C)
                    if (C.hasOwnProperty(l)) {
                        if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                            for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                        for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), w.push((o ? "" : "no-") + a.join("-"))
                    }
            }

            function i(e) {
                var n = x.className,
                    t = Modernizr._config.classPrefix || "";
                if (b && (n = n.baseVal), Modernizr._config.enableJSClass) {
                    var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
                    n = n.replace(r, "$1" + t + "js$2")
                }
                Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), b ? x.className.baseVal = n : x.className = n)
            }

            function s() {
                return "function" != typeof n.createElement ? n.createElement(arguments[0]) : b ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
            }

            function a(e) {
                return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
                    return n + t.toUpperCase()
                }).replace(/^-/, "")
            }

            function l(e, n) {
                if ("object" == typeof e)
                    for (var t in e) P(e, t) && l(t, e[t]);
                else {
                    e = e.toLowerCase();
                    var r = e.split("."),
                        o = Modernizr[r[0]];
                    if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;
                    n = "function" == typeof n ? n() : n, 1 == r.length ? Modernizr[r[0]] = n : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = n), i([(n && 0 != n ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, n)
                }
                return Modernizr
            }

            function u() {
                var e = n.body;
                return e || (e = s(b ? "svg" : "body"), e.fake = !0), e
            }

            function f(e, t, r, o) {
                var i, a, l, f, c = "modernizr",
                    d = s("div"),
                    p = u();
                if (parseInt(r, 10))
                    for (; r--;) l = s("div"), l.id = o ? o[r] : c + (r + 1), d.appendChild(l);
                return i = s("style"), i.type = "text/css", i.id = "s" + c, (p.fake ? p : d).appendChild(i), p.appendChild(d), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), a = t(d, e), p.fake ? (p.parentNode.removeChild(p), x.style.overflow = f, x.offsetHeight) : d.parentNode.removeChild(d), !!a
            }

            function c(e, n) {
                return !!~("" + e).indexOf(n)
            }

            function d(e, n) {
                return function() {
                    return e.apply(n, arguments)
                }
            }

            function p(e, n, t) {
                var o;
                for (var i in e)
                    if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? d(o, t || n) : o);
                return !1
            }

            function m(e) {
                return e.replace(/([A-Z])/g, function(e, n) {
                    return "-" + n.toLowerCase()
                }).replace(/^ms-/, "-ms-")
            }

            function v(n, t, r) {
                var o;
                if ("getComputedStyle" in e) {
                    o = getComputedStyle.call(e, n, t);
                    var i = e.console;
                    if (null !== o) r && (o = o.getPropertyValue(r));
                    else if (i) {
                        var s = i.error ? "error" : "log";
                        i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
                    }
                } else o = !t && n.currentStyle && n.currentStyle[r];
                return o
            }

            function h(n, r) {
                var o = n.length;
                if ("CSS" in e && "supports" in e.CSS) {
                    for (; o--;)
                        if (e.CSS.supports(m(n[o]), r)) return !0;
                    return !1
                }
                if ("CSSSupportsRule" in e) {
                    for (var i = []; o--;) i.push("(" + m(n[o]) + ":" + r + ")");
                    return i = i.join(" or "), f("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
                        return "absolute" == v(e, null, "position")
                    })
                }
                return t
            }

            function y(e, n, o, i) {
                function l() {
                    f && (delete O.style, delete O.modElem)
                }
                if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
                    var u = h(e, o);
                    if (!r(u, "undefined")) return u
                }
                for (var f, d, p, m, v, y = ["modernizr", "tspan", "samp"]; !O.style && y.length;) f = !0, O.modElem = s(y.shift()), O.style = O.modElem.style;
                for (p = e.length, d = 0; p > d; d++)
                    if (m = e[d], v = O.style[m], c(m, "-") && (m = a(m)), O.style[m] !== t) {
                        if (i || r(o, "undefined")) return l(), "pfx" == n ? m : !0;
                        try {
                            O.style[m] = o
                        } catch (g) {}
                        if (O.style[m] != v) return l(), "pfx" == n ? m : !0
                    } return l(), !1
            }

            function g(e, n, t, o, i) {
                var s = e.charAt(0).toUpperCase() + e.slice(1),
                    a = (e + " " + L.join(s + " ") + s).split(" ");
                return r(n, "string") || r(n, "undefined") ? y(a, n, o, i) : (a = (e + " " + j.join(s + " ") + s).split(" "), p(a, n, t))
            }

            function _(e, n, r) {
                return g(e, t, t, n, r)
            }
            var w = [],
                C = [],
                T = {
                    _version: "3.6.0",
                    _config: {
                        classPrefix: "self_",
                        enableClasses: !0,
                        enableJSClass: !0,
                        usePrefixes: !0
                    },
                    _q: [],
                    on: function(e, n) {
                        var t = this;
                        setTimeout(function() {
                            n(t[e])
                        }, 0)
                    },
                    addTest: function(e, n, t) {
                        C.push({
                            name: e,
                            fn: n,
                            options: t
                        })
                    },
                    addAsyncTest: function(e) {
                        C.push({
                            name: null,
                            fn: e
                        })
                    }
                },
                Modernizr = function() {};
            Modernizr.prototype = T, Modernizr = new Modernizr, Modernizr.addTest("cors", "XMLHttpRequest" in e && "withCredentials" in new XMLHttpRequest);
            var S = T._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
            T._prefixes = S;
            var x = n.documentElement,
                b = "svg" === x.nodeName.toLowerCase();
            Modernizr.addTest("video", function() {
                var e = s("video"),
                    n = !1;
                try {
                    n = !!e.canPlayType, n && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), n.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), n.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
                } catch (t) {}
                return n
            });
            var P;
            ! function() {
                var e = {}.hasOwnProperty;
                P = r(e, "undefined") || r(e.call, "undefined") ? function(e, n) {
                    return n in e && r(e.constructor.prototype[n], "undefined")
                } : function(n, t) {
                    return e.call(n, t)
                }
            }(), T._l = {}, T.on = function(e, n) {
                this._l[e] || (this._l[e] = []), this._l[e].push(n), Modernizr.hasOwnProperty(e) && setTimeout(function() {
                    Modernizr._trigger(e, Modernizr[e])
                }, 0)
            }, T._trigger = function(e, n) {
                if (this._l[e]) {
                    var t = this._l[e];
                    setTimeout(function() {
                        var e, r;
                        for (e = 0; e < t.length; e++)(r = t[e])(n)
                    }, 0), delete this._l[e]
                }
            }, Modernizr._q.push(function() {
                T.addTest = l
            });
            var z = T.testStyles = f;
            Modernizr.addTest("hiddenscroll", function() {
                return z("#modernizr {width:100px;height:100px;overflow:scroll}", function(e) {
                    return e.offsetWidth === e.clientWidth
                })
            }), Modernizr.addTest("touchevents", function() {
                var t;
                if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;
                else {
                    var r = ["@media (", S.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                    z(r, function(e) {
                        t = 9 === e.offsetTop
                    })
                }
                return t
            });
            var E = function() {
                var n = e.matchMedia || e.msMatchMedia;
                return n ? function(e) {
                    var t = n(e);
                    return t && t.matches || !1
                } : function(n) {
                    var t = !1;
                    return f("@media " + n + " { #modernizr { position: absolute; } }", function(n) {
                        t = "absolute" == (e.getComputedStyle ? e.getComputedStyle(n, null) : n.currentStyle).position
                    }), t
                }
            }();
            T.mq = E, Modernizr.addTest("hovermq", E("(hover)"));
            var q = "Moz O ms Webkit",
                j = T._config.usePrefixes ? q.toLowerCase().split(" ") : [];
            T._domPrefixes = j;
            var L = T._config.usePrefixes ? q.split(" ") : [];
            T._cssomPrefixes = L;
            var N = function(n) {
                var r, o = S.length,
                    i = e.CSSRule;
                if ("undefined" == typeof i) return t;
                if (!n) return !1;
                if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;
                for (var s = 0; o > s; s++) {
                    var a = S[s],
                        l = a.toUpperCase() + "_" + r;
                    if (l in i) return "@-" + a.toLowerCase() + "-" + n
                }
                return !1
            };
            T.atRule = N;
            var A = {
                elem: s("modernizr")
            };
            Modernizr._q.push(function() {
                delete A.elem
            });
            var O = {
                style: A.elem.style
            };
            Modernizr._q.unshift(function() {
                delete O.style
            }), T.testAllProps = g;
            var R = T.prefixed = function(e, n, t) {
                return 0 === e.indexOf("@") ? N(e) : (-1 != e.indexOf("-") && (e = a(e)), n ? g(e, n, t) : g(e, "pfx"))
            };
            Modernizr.addTest("requestanimationframe", !!R("requestAnimationFrame", e), {
                aliases: ["raf"]
            }), T.testAllProps = _, Modernizr.addTest("csstransitions", _("transition", "all", !0)), Modernizr.addTest("csstransforms", function() {
                return -1 === navigator.userAgent.indexOf("Android 2.") && _("transform", "scale(1)", !0)
            }), Modernizr.addTest("cssanimations", _("animationName", "a", !0)), o(), i(w), delete T.addTest, delete T.addAsyncTest;
            for (var $ = 0; $ < Modernizr._q.length; $++) Modernizr._q[$]();
            e.Modernizr = Modernizr
        }(window, document);
    </script>
    <meta charset="UTF-8">
    <title>Sivakasi Cracker Store - Order Diwali Crackers in Tamilnadu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">

    <link rel="stylesheet" href="../assets/css/main.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="../assets/css/swiper-bundle.min.css" type="text/css">
    <link rel="stylesheet" href="../assets/css/font.css" type="text/css">
    <link rel="stylesheet" href="../assets/css/stylesheet.css" type="text/css">
    
    <link rel="shortcut icon" href="https://srilaxmiscrackers.com/assets/images/logo.png" type="image/x-icon">
    <link rel="apple-touch-icon" href="https://srilaxmiscrackers.com/assets/images/logo.png">
</head>

<body>
    <div class="viewport">
        <div class="header">
            <div class="top_header">
                <div class="container">
                    <div class="header_row d_flex just_content_btw align_item">
                        <div class="">Diwali sale is open now. Minimum Order Value is ₹3000/- Happy Diwali....!!!!</div>
                        <a class="btn blink">Estimate Now</a>
                    </div>
                </div>
            </div>
            <div class="header_menu">
                <div class="container">
                    <div class="header_row d_flex just_content_btw align_item">
                        <div class="logo">
                            <a class="logo_a" href="/"><img src="../assets/images/logo.png" /></a>
                        </div>
                        <div class="menu">
                            <ul>
                                <li class=""><a class="active">Home</a></li>
                                <li class=""><a class="">Home</a></li>
                                <li class=""><a class="">Home</a></li>
                                <li class=""><a class="">Home</a></li>
                                <li class=""><a class="">Home</a></li>
                                <li class=""><a class="">Home</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">