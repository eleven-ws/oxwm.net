'use strict';

var GLOBALSITE = {
  COMMON: {},
  TOP: {}
};

GLOBALSITE.COMMON = {
  init: function () {
    this.RANGE_SP.init();
    this.UA_TABLET.init();
    this.UA_CLASS.init();
    this.GNAV.init();
    this.LOCATION_CHECK.init();
    this.SMOOTH_SCROLL.init();
    this.SCROLL_TOP.init();
    this.SEPARATE_WITH_SPAN.init();
  }
};

GLOBALSITE.COMMON.VARIABLES = {
  range_sp: !0
};

GLOBALSITE.COMMON.RANGE_SP = {
  init: function () {
    var i = window.matchMedia('(max-width: 768px)');

    function n(i) {
      i.matches
        ? (GLOBALSITE.COMMON.VARIABLES.range_sp = !0)
        : (GLOBALSITE.COMMON.VARIABLES.range_sp = !1);
    }

    i.addListener(n);
    n(i);
  }
};

GLOBALSITE.COMMON.UA_TABLET = {
  init: function () {
    var i = navigator.userAgent.toLowerCase();
    var n = -1 !== i.indexOf('ipad');
    var i = -1 !== i.indexOf('android') && -1 === i.indexOf('mobile');

    (!n && !i) || $("meta[name='viewport']").attr('content', 'width=1280px');
  }
};

GLOBALSITE.COMMON.UA_CLASS = {
  init: function () {
    var i = window.navigator.userAgent.toLowerCase();
    var n = '';

    -1 != i.indexOf('msie') || -1 != i.indexOf('trident')
      ? (n = 'browse-ie')
      : -1 != i.indexOf('edge')
      ? (n = 'browse-edge')
      : -1 != i.indexOf('chrome')
      ? (n = 'browse-chrome')
      : -1 != i.indexOf('safari')
      ? (n = 'browse-safari')
      : -1 != i.indexOf('firefox')
      ? (n = 'browse-firefox')
      : -1 != i.indexOf('opera') && (n = 'browse-opera'),
      $('body').addClass(n);
  }
};

(GLOBALSITE.COMMON.GNAV = {
  init: function () {
    var e = $('body'),
      i = $('.js-gnav-switch'),
      t = 'is-gnav-open';
    if (!i.length) return !1;
    e.append('<div class="l-overlay js-overlay"></div>'),
      i.click(function (i) {
        var n;
        i.preventDefault(),
          (n = window.innerHeight),
          GLOBALSITE.COMMON.VARIABLES.range_sp
            ? ((i = $('.p-header').height()),
              $('.p-gnav').css({ height: n - i }))
            : $('.p-gnav').removeAttr('style'),
          e.toggleClass(t);
      }),
      $('.js-overlay').click(function () {
        e.removeClass(t);
      }),
      $('.l-gnav').find('[class*="current"] a').addClass('is-current');
  }
}),
  (GLOBALSITE.COMMON.LOCATION_CHECK = {
    init: function () {
      var i = '#menu-gnav',
        n = location.pathname.split('/'),
        e = n[1];
      '' !== e &&
        ('news' === e && '' !== n[2]
          ? $('a[href*="/' + e + n[2] + '"]', i)
          : $('a[href*="/' + e + '"]', i)
        ).attr('aria-current', 'page');
    }
  }),
  (GLOBALSITE.COMMON.SMOOTH_SCROLL = {
    init: function () {
      $('a[href^="#anc"]').on('click.scroll', function () {
        var i = $(this).attr('href'),
          i = $(i);
        if (i) {
          i = i.offset().top;
          return (
            $('html, body').animate({ scrollTop: i }, 500, function () {
              $(window).trigger('scroll');
            }),
            !1
          );
        }
      });
    }
  }),
  (GLOBALSITE.COMMON.SCROLL_TOP = {
    init: function () {
      var i = $('#js-scroll-top');
      $(window).on('scroll', function () {
        100 < $(this).scrollTop() ? i.fadeIn() : i.fadeOut();
      }),
        i.click(function (i) {
          $('body,html').animate({ scrollTop: 0 }, 500), i.preventDefault();
        });
    }
  }),
  (GLOBALSITE.COMMON.SEPARATE_WITH_SPAN = {
    init: function () {
      $('.js-separate')
        .children()
        .addBack()
        .contents()
        .each(function () {
          var i;
          3 == this.nodeType &&
            (i = $(this)).replaceWith(
              i.text().replace(/(\S)/g, '<span>$&</span>')
            );
        });
    }
  }),
  (GLOBALSITE.TOP = {
    init: function () {
      this.SLICK.init();
    }
  }),
  (GLOBALSITE.TOP.SLICK = {
    init: function () {
      var o;
      var n = $('.js-slick');
      var i = n.children().length;

      1 < i
        ? ((o = 'is-active-next'),
          i < 4 && n.addClass('disabled-slick-pc'),
          n.on('beforeChange', function (i, t, a, s) {
            n.find('.slick-slide').each(function (i, n) {
              var e = $(n),
                n = e.attr('data-slick-index');
              s == t.slideCount - 1 && 0 == a
                ? '-1' == n
                  ? e.addClass(o)
                  : e.removeClass(o)
                : 0 == s && n == t.slideCount
                ? e.addClass(o)
                : e.removeClass(o);
            });
          }),
          n.fadeIn(1e3).slick({
            autoplay: !1,
            arrows: !0,
            centerMode: !1,
            centerPadding: '0',
            dots: !0,
            draggable: !1,
            prevArrow: '<div class="slick-prev"><span>PREV</span></div>',
            nextArrow: '<div class="slick-next"><span>NEXT</span></div>',
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            responsive: [
              {
                breakpoint: 768,
                settings: { centerMode: !0, slidesToShow: 1 }
              }
            ]
          }))
        : n.css('display', 'flex');
    }
  });

$(function () {
  GLOBALSITE.COMMON.init();
  // $('body.home').length && GLOBALSITE.TOP.init();
  $('body').length && GLOBALSITE.TOP.init();
});

$(window).on('load', function () {
  $('body').addClass('initialized');
});
