!(function (a, b, c, d) {
    function e(b, c) {
        (this.obj = a(b)),
            (this.o = a.extend({}, a.fn[f].defaults, c)),
            (this.objId = this.obj.attr("id")),
            (this.pwCtrls = ".jarviswidget-ctrls"),
            (this.widget = this.obj.find(this.o.widgets)),
            (this.toggleClass = this.o.toggleClass.split("|")),
            (this.editClass = this.o.editClass.split("|")),
            (this.fullscreenClass = this.o.fullscreenClass.split("|")),
            (this.customClass = this.o.customClass.split("|")),
            (this.storage = { enabled: this.o.localStorage }),
            (this.initialized = !1),
            this.init();
    }
    var f = "jarvisWidgets",
        g = ("ontouchstart" in b || (b.DocumentTouch && c instanceof DocumentTouch) ? "touchstart" : "click") + "." + f;
    (e.prototype = {
        _runLoaderWidget: function (a) {
            var b = this;
            b.o.indicator === !0 && a.parents(b.o.widgets).find(".jarviswidget-loader:first").stop(!0, !0).fadeIn(100).delay(b.o.indicatorTime).fadeOut(100);
        },
        _getPastTimestamp: function (a) {
            var b = this,
                c = new Date(a),
                d = c.getMonth() + 1,
                e = c.getDate(),
                f = c.getFullYear(),
                g = c.getHours(),
                h = c.getMinutes(),
                i = c.getUTCSeconds();
            10 > d && (d = "0" + d), 10 > e && (e = "0" + e), 10 > g && (g = "0" + g), 10 > h && (h = "0" + h), 10 > i && (i = "0" + i);
            var j = b.o.timestampFormat.replace(/%d%/g, e).replace(/%m%/g, d).replace(/%y%/g, f).replace(/%h%/g, g).replace(/%i%/g, h).replace(/%s%/g, i);
            return j;
        },
        _loadAjaxFile: function (b, c, d) {
            var e = this;
            b.find(".widget-body").load(c, function (c, d, f) {
                var g = a(this);
                if (("error" == d && g.html('<h4 class="alert alert-danger">' + e.o.labelError + "<b> " + f.status + " " + f.statusText + "</b></h4>"), "success" == d)) {
                    var h = b.find(e.o.timestampPlaceholder);
                    h.length && h.html(e._getPastTimestamp(new Date())), "function" == typeof e.o.afterLoad && e.o.afterLoad.call(this, b);
                }
                e = null;
            }),
                this._runLoaderWidget(d);
        },
        _loadKeys: function () {
            var a = this;
            if (a.o.ajaxnav === !0) {
                var b = location.hash.replace(/^#/, "");
                (a.storage.keySettings = "Plugin_settings_" + b + "_" + a.objId), (a.storage.keyPosition = "Plugin_position_" + b + "_" + a.objId);
            } else if (a.initialized === !1) {
                var b = a.o.pageKey || location.pathname;
                (a.storage.keySettings = "jarvisWidgets_settings_" + b + "_" + a.objId), (a.storage.keyPosition = "jarvisWidgets_position_" + b + "_" + a.objId);
            }
        },
        _saveSettingsWidget: function () {
            var b = this,
                c = b.storage;
            b._loadKeys();
            var d = b.obj
                    .find(b.o.widgets)
                    .map(function () {
                        var b = {};
                        return (
                            (b.id = a(this).attr("id")),
                            (b.style = a(this).attr("data-widget-attstyle")),
                            (b.title = a(this).children("header").children("h2").text()),
                            (b.hidden = "none" == a(this).css("display") ? 1 : 0),
                            (b.collapsed = a(this).hasClass("jarviswidget-collapsed") ? 1 : 0),
                            b
                        );
                    })
                    .get(),
                e = JSON.stringify({ widget: d });
            c.enabled && c.getKeySettings != e && (localStorage.setItem(c.keySettings, e), (c.getKeySettings = e)), "function" == typeof b.o.onSave && b.o.onSave.call(this, null, e, c.keySettings);
        },
        _savePositionWidget: function () {
            var b = this,
                c = b.storage;
            b._loadKeys();
            var d = b.obj
                    .find(b.o.grid + ".sortable-grid")
                    .map(function () {
                        var c = a(this)
                            .children(b.o.widgets)
                            .map(function () {
                                return { id: a(this).attr("id") };
                            })
                            .get();
                        return { section: c };
                    })
                    .get(),
                e = JSON.stringify({ grid: d });
            c.enabled && c.getKeyPosition != e && (localStorage.setItem(c.keyPosition, e), (c.getKeyPosition = e)), "function" == typeof b.o.onSave && b.o.onSave.call(this, e, c.keyPosition);
        },
        init: function () {
            var b = this;
            if (!b.initialized) {
                if (
                    (b._initStorage(b.storage),
                    a("#" + b.objId).length || alert("It looks like your using a class instead of an ID, dont do that!"),
                    b.o.rtl === !0 && a("body").addClass("rtl"),
                    a(b.o.grid).each(function () {
                        a(this).find(b.o.widgets).length && a(this).addClass("sortable-grid");
                    }),
                    b.storage.enabled && b.storage.getKeyPosition)
                ) {
                    var c = JSON.parse(b.storage.getKeyPosition);
                    for (var e in c.grid) {
                        var h = b.obj.find(b.o.grid + ".sortable-grid").eq(e);
                        for (var i in c.grid[e].section) h.append(a("#" + c.grid[e].section[i].id));
                    }
                }
                if (b.storage.enabled && b.storage.getKeySettings) {
                    var j = JSON.parse(b.storage.getKeySettings);
                    for (var e in j.widget) {
                        var k = a("#" + j.widget[e].id);
                        j.widget[e].style &&
                            k
                                .removeClassPrefix("jarviswidget-color-")
                                .addClass(j.widget[e].style)
                                .attr("data-widget-attstyle", "" + j.widget[e].style),
                            1 == j.widget[e].hidden ? k.hide(1) : k.show(1).removeAttr("data-widget-hidden"),
                            1 == j.widget[e].collapsed && k.addClass("jarviswidget-collapsed").children("div").hide(1),
                            k.children("header").children("h2").text() != j.widget[e].title && k.children("header").children("h2").text(j.widget[e].title);
                    }
                }
                if (
                    (b.widget.each(function () {
                        var c,
                            e,
                            f,
                            g,
                            h,
                            i,
                            j,
                            k,
                            l = a(this),
                            m = a(this).children("header");
                        if (!m.parent().attr("role")) {
                            l.data("widget-hidden") === !0 && l.hide(),
                                l.data("widget-collapsed") === !0 && l.addClass("jarviswidget-collapsed").children("div").hide(),
                                (c =
                                    b.o.customButton === !0 && l.data("widget-custombutton") === d && 0 !== b.customClass[0].length
                                        ? '<a href="javascript:void(0);" class="button-icon jarviswidget-custom-btn"><i class="' + b.customClass[0] + '"></i></a>'
                                        : ""),
                                (e =
                                    b.o.deleteButton === !0 && l.data("widget-deletebutton") === d
                                        ? '<a href="javascript:void(0);" class="button-icon jarviswidget-delete-btn" rel="tooltip" title="Delete" data-placement="bottom"><i class="' + b.o.deleteClass + '"></i></a>'
                                        : ""),
                                (f =
                                    b.o.editButton === !0 && l.data("widget-editbutton") === d
                                        ? '<a href="javascript:void(0);" class="button-icon jarviswidget-edit-btn" rel="tooltip" title="Edit" data-placement="bottom"><i class="' + b.editClass[0] + '"></i></a>'
                                        : ""),
                                (g =
                                    b.o.fullscreenButton === !0 && l.data("widget-fullscreenbutton") === d
                                        ? '<a href="javascript:void(0);" class="button-icon jarviswidget-fullscreen-btn" rel="tooltip" title="Fullscreen" data-placement="bottom"><i class="' + b.fullscreenClass[0] + '"></i></a>'
                                        : ""),
                                b.o.colorButton === !0 && l.data("widget-colorbutton") === d
                                    ? ((h =
                                          '<a data-toggle="dropdown" class="dropdown-toggle color-box selector" href="javascript:void(0);"></a><ul class="dropdown-menu arrow-box-up-right color-select pull-right"><li><span class="bg-color-green" data-widget-setstyle="jarviswidget-color-green" rel="tooltip" data-placement="left" data-original-title="Green Grass"></span></li><li><span class="bg-color-greenDark" data-widget-setstyle="jarviswidget-color-greenDark" rel="tooltip" data-placement="top" data-original-title="Dark Green"></span></li><li><span class="bg-color-greenLight" data-widget-setstyle="jarviswidget-color-greenLight" rel="tooltip" data-placement="top" data-original-title="Light Green"></span></li><li><span class="bg-color-purple" data-widget-setstyle="jarviswidget-color-purple" rel="tooltip" data-placement="top" data-original-title="Purple"></span></li><li><span class="bg-color-magenta" data-widget-setstyle="jarviswidget-color-magenta" rel="tooltip" data-placement="top" data-original-title="Magenta"></span></li><li><span class="bg-color-pink" data-widget-setstyle="jarviswidget-color-pink" rel="tooltip" data-placement="right" data-original-title="Pink"></span></li><li><span class="bg-color-pinkDark" data-widget-setstyle="jarviswidget-color-pinkDark" rel="tooltip" data-placement="left" data-original-title="Fade Pink"></span></li><li><span class="bg-color-blueLight" data-widget-setstyle="jarviswidget-color-blueLight" rel="tooltip" data-placement="top" data-original-title="Light Blue"></span></li><li><span class="bg-color-teal" data-widget-setstyle="jarviswidget-color-teal" rel="tooltip" data-placement="top" data-original-title="Teal"></span></li><li><span class="bg-color-blue" data-widget-setstyle="jarviswidget-color-blue" rel="tooltip" data-placement="top" data-original-title="Ocean Blue"></span></li><li><span class="bg-color-blueDark" data-widget-setstyle="jarviswidget-color-blueDark" rel="tooltip" data-placement="top" data-original-title="Night Sky"></span></li><li><span class="bg-color-darken" data-widget-setstyle="jarviswidget-color-darken" rel="tooltip" data-placement="right" data-original-title="Night"></span></li><li><span class="bg-color-yellow" data-widget-setstyle="jarviswidget-color-yellow" rel="tooltip" data-placement="left" data-original-title="Day Light"></span></li><li><span class="bg-color-orange" data-widget-setstyle="jarviswidget-color-orange" rel="tooltip" data-placement="bottom" data-original-title="Orange"></span></li><li><span class="bg-color-orangeDark" data-widget-setstyle="jarviswidget-color-orangeDark" rel="tooltip" data-placement="bottom" data-original-title="Dark Orange"></span></li><li><span class="bg-color-red" data-widget-setstyle="jarviswidget-color-red" rel="tooltip" data-placement="bottom" data-original-title="Red Rose"></span></li><li><span class="bg-color-redLight" data-widget-setstyle="jarviswidget-color-redLight" rel="tooltip" data-placement="bottom" data-original-title="Light Red"></span></li><li><span class="bg-color-white" data-widget-setstyle="jarviswidget-color-white" rel="tooltip" data-placement="right" data-original-title="Purity"></span></li><li><a href="javascript:void(0);" class="jarviswidget-remove-colors" data-widget-setstyle="" rel="tooltip" data-placement="bottom" data-original-title="Reset widget color to default">Remove</a></li></ul>'),
                                      m.prepend('<div class="widget-toolbar">' + h + "</div>"))
                                    : (h = ""),
                                b.o.toggleButton === !0 && l.data("widget-togglebutton") === d
                                    ? ((j = l.data("widget-collapsed") === !0 || l.hasClass("jarviswidget-collapsed") ? b.toggleClass[1] : b.toggleClass[0]),
                                      (i = '<a href="javascript:void(0);" class="button-icon jarviswidget-toggle-btn" rel="tooltip" title="Collapse" data-placement="bottom"><i class="' + j + '"></i></a>'))
                                    : (i = ""),
                                (k =
                                    b.o.refreshButton === !0 && l.data("widget-refreshbutton") !== !1 && l.data("widget-load")
                                        ? '<a href="javascript:void(0);" class="button-icon jarviswidget-refresh-btn" data-loading-text="&nbsp;&nbsp;Loading...&nbsp;" rel="tooltip" title="Refresh" data-placement="bottom"><i class="' +
                                          b.o.refreshButtonClass +
                                          '"></i></a>'
                                        : "");
                            var n = b.o.buttonOrder
                                .replace(/%refresh%/g, k)
                                .replace(/%delete%/g, e)
                                .replace(/%custom%/g, c)
                                .replace(/%fullscreen%/g, g)
                                .replace(/%edit%/g, f)
                                .replace(/%toggle%/g, i);
                            ("" !== k || "" !== e || "" !== c || "" !== g || "" !== f || "" !== i) && m.prepend('<div class="jarviswidget-ctrls">' + n + "</div>"),
                                b.o.sortable === !0 && l.data("widget-sortable") === d && l.addClass("jarviswidget-sortable"),
                                l.find(b.o.editPlaceholder).length &&
                                    l
                                        .find(b.o.editPlaceholder)
                                        .find("input")
                                        .val(a.trim(m.children("h2").text())),
                                m.append('<span class="jarviswidget-loader"><i class="fa fa-refresh fa-spin"></i></span>'),
                                l.attr("role", "widget").children("div").attr("role", "content").prev("header").attr("role", "heading").children("div").attr("role", "menu");
                        }
                    }),
                    b.o.buttonsHidden === !0 && a(b.o.pwCtrls).hide(),
                    a(".jarviswidget header [rel=tooltip]").tooltip(),
                    b.obj.find("[data-widget-load]").each(function () {
                        var c = a(this),
                            d = c.children(),
                            e = c.data("widget-load"),
                            f = 1e3 * c.data("widget-refresh");
                        c.children();
                        c.find(".jarviswidget-ajax-placeholder").length ||
                            (c.children("widget-body").append('<div class="jarviswidget-ajax-placeholder">' + b.o.loadingLabel + "</div>"),
                            c.data("widget-refresh") > 0
                                ? (b._loadAjaxFile(c, e, d),
                                  a.intervalArr.push(
                                      setInterval(function () {
                                          b._loadAjaxFile(c, e, d);
                                      }, f)
                                  ))
                                : b._loadAjaxFile(c, e, d));
                    }),
                    b.o.sortable === !0 && jQuery.ui)
                ) {
                    var l = b.obj.find(b.o.grid + ".sortable-grid").not("[data-widget-excludegrid]");
                    l.sortable({
                        items: l.find(b.o.widgets + ".jarviswidget-sortable"),
                        connectWith: l,
                        placeholder: b.o.placeholderClass,
                        cursor: "move",
                        revert: !0,
                        opacity: b.o.opacity,
                        delay: 200,
                        cancel: ".button-icon, #jarviswidget-fullscreen-mode > div",
                        zIndex: 1e4,
                        handle: b.o.dragHandle,
                        forcePlaceholderSize: !0,
                        forceHelperSize: !0,
                        update: function (a, c) {
                            b._runLoaderWidget(c.item.children()), b._savePositionWidget(), "function" == typeof b.o.onChange && b.o.onChange.call(this, c.item);
                        },
                    });
                }
                b.o.buttonsHidden === !0 &&
                    b.widget
                        .children("header")
                        .on("mouseenter." + f, function () {
                            a(this).children(b.o.pwCtrls).stop(!0, !0).fadeTo(100, 1);
                        })
                        .on("mouseleave." + f, function () {
                            a(this).children(b.o.pwCtrls).stop(!0, !0).fadeTo(100, 0);
                        }),
                    b._clickEvents(),
                    b.storage.enabled &&
                        (a(b.o.deleteSettingsKey).on(g, this, function (a) {
                            var c = confirm(b.o.settingsKeyLabel);
                            c && localStorage.removeItem(keySettings), a.preventDefault();
                        }),
                        a(b.o.deletePositionKey).on(g, this, function (a) {
                            var c = confirm(b.o.positionKeyLabel);
                            c && localStorage.removeItem(keyPosition), a.preventDefault();
                        })),
                    (initialized = !0);
            }
        },
        _initStorage: function (a) {
            (a.enabled =
                a.enabled &&
                !!(function () {
                    var a,
                        b = +new Date();
                    try {
                        return localStorage.setItem(b, b), (a = localStorage.getItem(b) == b), localStorage.removeItem(b), a;
                    } catch (c) {}
                })()),
                this._loadKeys(),
                a.enabled && ((a.getKeySettings = localStorage.getItem(a.keySettings)), (a.getKeyPosition = localStorage.getItem(a.keyPosition)));
        },
        _clickEvents: function () {
            function c() {
                if (a("#jarviswidget-fullscreen-mode").length) {
                    var c = a(b).height(),
                        e = a("#jarviswidget-fullscreen-mode").children(d.o.widgets).children("header").height();
                    a("#jarviswidget-fullscreen-mode")
                        .children(d.o.widgets)
                        .children("div")
                        .height(c - e - 15);
                }
            }
            var d = this,
                e = d.widget.children("header");
            e.on(g, ".jarviswidget-toggle-btn", function (b) {
                var c = a(this),
                    e = c.parents(d.o.widgets);
                d._runLoaderWidget(c),
                    e.hasClass("jarviswidget-collapsed")
                        ? c
                              .children()
                              .removeClass(d.toggleClass[1])
                              .addClass(d.toggleClass[0])
                              .parents(d.o.widgets)
                              .removeClass("jarviswidget-collapsed")
                              .children("[role=content]")
                              .slideDown(d.o.toggleSpeed, function () {
                                  d._saveSettingsWidget();
                              })
                        : c
                              .children()
                              .removeClass(d.toggleClass[0])
                              .addClass(d.toggleClass[1])
                              .parents(d.o.widgets)
                              .addClass("jarviswidget-collapsed")
                              .children("[role=content]")
                              .slideUp(d.o.toggleSpeed, function () {
                                  d._saveSettingsWidget();
                              }),
                    "function" == typeof d.o.onToggle && d.o.onToggle.call(this, e),
                    b.preventDefault();
            }),
                e.on(g, ".jarviswidget-fullscreen-btn", function (b) {
                    var e = a(this).parents(d.o.widgets),
                        f = e.children("div");
                    d._runLoaderWidget(a(this)),
                        a("#jarviswidget-fullscreen-mode").length
                            ? (a(".nooverflow").removeClass("nooverflow"),
                              e
                                  .unwrap("<div>")
                                  .children("div")
                                  .removeAttr("style")
                                  .end()
                                  .find(".jarviswidget-fullscreen-btn:first")
                                  .children()
                                  .removeClass(d.fullscreenClass[1])
                                  .addClass(d.fullscreenClass[0])
                                  .parents(d.pwCtrls)
                                  .children("a")
                                  .show(),
                              f.hasClass("jarviswidget-visible") && f.hide().removeClass("jarviswidget-visible"))
                            : (a("body").addClass("nooverflow"),
                              e
                                  .wrap('<div id="jarviswidget-fullscreen-mode"/>')
                                  .parent()
                                  .find(".jarviswidget-fullscreen-btn:first")
                                  .children()
                                  .removeClass(d.fullscreenClass[0])
                                  .addClass(d.fullscreenClass[1])
                                  .parents(d.pwCtrls)
                                  .children("a:not(.jarviswidget-fullscreen-btn)")
                                  .hide(),
                              f.is(":hidden") && f.show().addClass("jarviswidget-visible")),
                        c(),
                        "function" == typeof d.o.onFullscreen && d.o.onFullscreen.call(this, e),
                        b.preventDefault();
                }),
                a(b).on("resize." + f, function () {
                    c();
                }),
                e.on(g, ".jarviswidget-edit-btn", function (b) {
                    var c = a(this).parents(d.o.widgets);
                    d._runLoaderWidget(a(this)),
                        c.find(d.o.editPlaceholder).is(":visible")
                            ? a(this)
                                  .children()
                                  .removeClass(d.editClass[1])
                                  .addClass(d.editClass[0])
                                  .parents(d.o.widgets)
                                  .find(d.o.editPlaceholder)
                                  .slideUp(d.o.editSpeed, function () {
                                      d._saveSettingsWidget();
                                  })
                            : a(this).children().removeClass(d.editClass[0]).addClass(d.editClass[1]).parents(d.o.widgets).find(d.o.editPlaceholder).slideDown(d.o.editSpeed),
                        "function" == typeof d.o.onEdit && d.o.onEdit.call(this, c),
                        b.preventDefault();
                }),
                a(d.o.editPlaceholder)
                    .find("input")
                    .keyup(function () {
                        a(this).parents(d.o.widgets).children("header").children("h2").text(a(this).val());
                    }),
                e.on(g, "[data-widget-setstyle]", function (b) {
                    var c = a(this).data("widget-setstyle"),
                        e = "";
                    a(this)
                        .parents(d.o.editPlaceholder)
                        .find("[data-widget-setstyle]")
                        .each(function () {
                            e += a(this).data("widget-setstyle") + " ";
                        }),
                        a(this)
                            .parents(d.o.widgets)
                            .attr("data-widget-attstyle", "" + c)
                            .removeClassPrefix("jarviswidget-color-")
                            .addClass(c),
                        d._runLoaderWidget(a(this)),
                        d._saveSettingsWidget(),
                        b.preventDefault();
                }),
                e.on(g, ".jarviswidget-custom-btn", function (b) {
                    var c = a(this).parents(d.o.widgets);
                    d._runLoaderWidget(a(this)),
                        a(this).children("." + d.customClass[0]).length
                            ? (a(this).children().removeClass(d.customClass[0]).addClass(d.customClass[1]), "function" == typeof d.o.customStart && d.o.customStart.call(this, c))
                            : (a(this).children().removeClass(d.customClass[1]).addClass(d.customClass[0]), "function" == typeof d.o.customEnd && d.o.customEnd.call(this, c)),
                        d._saveSettingsWidget(),
                        b.preventDefault();
                }),
                e.on(g, ".jarviswidget-delete-btn", function (b) {
                    var c = a(this).parents(d.o.widgets),
                        e = c.attr("id"),
                        f = c.children("header").children("h2").text();
                    a.SmartMessageBox
                        ? a.SmartMessageBox({ title: "<i class='fa fa-times' style='color:#ed1c24'></i> " + d.o.labelDelete + ' "' + f + '"', content: d.o.deleteMsg, buttons: "[No][Yes]" }, function (b) {
                              "Yes" == b &&
                                  (d._runLoaderWidget(a(this)),
                                  a("#" + e).fadeOut(d.o.deleteSpeed, function () {
                                      a(this).remove(), "function" == typeof d.o.onDelete && d.o.onDelete.call(this, c);
                                  }));
                          })
                        : a("#" + e).fadeOut(d.o.deleteSpeed, function () {
                              a(this).remove(), "function" == typeof d.o.onDelete && d.o.onDelete.call(this, c);
                          }),
                        b.preventDefault();
                }),
                e.on(g, ".jarviswidget-refresh-btn", function (b) {
                    var c = a(this).parents(d.o.widgets),
                        e = c.data("widget-load"),
                        f = c.children(),
                        g = a(this);
                    g.button("loading"),
                        f.addClass("widget-body-ajax-loading"),
                        setTimeout(function () {
                            g.button("reset"), f.removeClass("widget-body-ajax-loading"), d._loadAjaxFile(c, e, f);
                        }, 1e3),
                        b.preventDefault();
                }),
                (e = null);
        },
        destroy: function () {
            var c = this,
                d = "." + f,
                e = c.obj.find(c.o.grid + ".sortable-grid").not("[data-widget-excludegrid]");
            e.sortable("destroy"), c.widget.children("header").off(d), a(c.o.deleteSettingsKey).off(d), a(c.o.deletePositionKey).off(d), a(b).off(d), c.obj.removeData(f);
        },
    }),
        (a.fn[f] = function (b) {
            return this.each(function () {
                var c = a(this),
                    d = c.data(f);
                if (!d) {
                    var g = "object" == typeof b && b;
                    c.data(f, (d = new e(this, g)));
                }
                "string" == typeof b && d[b]();
            });
        }),
        (a.fn[f].defaults = {
            grid: "section",
            widgets: ".jarviswidget",
            localStorage: !0,
            deleteSettingsKey: "",
            settingsKeyLabel: "Reset settings?",
            deletePositionKey: "",
            positionKeyLabel: "Reset position?",
            sortable: !0,
            buttonsHidden: !1,
            toggleButton: !0,
            toggleClass: "min-10 | plus-10",
            toggleSpeed: 200,
            onToggle: function () {},
            deleteButton: !0,
            deleteMsg: "Warning: This action cannot be undone",
            deleteClass: "trashcan-10",
            deleteSpeed: 200,
            onDelete: function () {},
            editButton: !0,
            editPlaceholder: ".jarviswidget-editbox",
            editClass: "pencil-10 | delete-10",
            editSpeed: 200,
            onEdit: function () {},
            colorButton: !0,
            fullscreenButton: !0,
            fullscreenClass: "fullscreen-10 | normalscreen-10",
            fullscreenDiff: 3,
            onFullscreen: function () {},
            customButton: !0,
            customClass: "",
            customStart: function () {},
            customEnd: function () {},
            buttonOrder: "%refresh% %delete% %custom% %edit% %fullscreen% %toggle%",
            opacity: 1,
            dragHandle: "> header",
            placeholderClass: "jarviswidget-placeholder",
            indicator: !0,
            indicatorTime: 600,
            ajax: !0,
            loadingLabel: "loading...",
            timestampPlaceholder: ".jarviswidget-timestamp",
            timestampFormat: "Last update: %m%/%d%/%y% %h%:%i%:%s%",
            refreshButton: !0,
            refreshButtonClass: "refresh-10",
            labelError: "Sorry but there was a error:",
            labelUpdated: "Last Update:",
            labelRefresh: "Refresh",
            labelDelete: "Delete widget:",
            afterLoad: function () {},
            rtl: !1,
            onChange: function () {},
            onSave: function () {},
            ajaxnav: !0,
        }),
        (a.fn.removeClassPrefix = function (b) {
            return (
                this.each(function (c, d) {
                    var e = d.className.split(" ").map(function (a) {
                        return 0 === a.indexOf(b) ? "" : a;
                    });
                    d.className = a.trim(e.join(" "));
                }),
                this
            );
        });
})(jQuery, window, document);
