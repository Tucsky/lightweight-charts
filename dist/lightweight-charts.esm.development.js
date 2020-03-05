/*!
 * @license
 * TradingView Lightweight Charts v2.1.0-dev+202003050952
 * Copyright (c) 2019 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
import { bindToDevicePixelRatio } from 'fancy-canvas/coordinate-space';

var LineType;
(function (LineType) {
    LineType[LineType["Simple"] = 0] = "Simple";
    LineType[LineType["WithSteps"] = 1] = "WithSteps";
})(LineType || (LineType = {}));
var LineStyle;
(function (LineStyle) {
    LineStyle[LineStyle["Solid"] = 0] = "Solid";
    LineStyle[LineStyle["Dotted"] = 1] = "Dotted";
    LineStyle[LineStyle["Dashed"] = 2] = "Dashed";
    LineStyle[LineStyle["LargeDashed"] = 3] = "LargeDashed";
    LineStyle[LineStyle["SparseDotted"] = 4] = "SparseDotted";
})(LineStyle || (LineStyle = {}));
function setLineStyle(ctx, style) {
    var _a;
    var dashPatterns = (_a = {},
        _a[0 /* Solid */] = [],
        _a[1 /* Dotted */] = [ctx.lineWidth, ctx.lineWidth],
        _a[2 /* Dashed */] = [2 * ctx.lineWidth, 2 * ctx.lineWidth],
        _a[3 /* LargeDashed */] = [6 * ctx.lineWidth, 6 * ctx.lineWidth],
        _a[4 /* SparseDotted */] = [ctx.lineWidth, 4 * ctx.lineWidth],
        _a);
    var dashPattern = dashPatterns[style];
    ctx.setLineDash(dashPattern);
}
function drawHorizontalLine(ctx, y, left, right) {
    ctx.beginPath();
    var correction = (ctx.lineWidth % 2) ? 0.5 : 0;
    ctx.moveTo(left, y + correction);
    ctx.lineTo(right, y + correction);
    ctx.stroke();
}
function drawVerticalLine(ctx, x, top, bottom) {
    ctx.beginPath();
    var correction = (ctx.lineWidth % 2) ? 0.5 : 0;
    ctx.moveTo(x + correction, top);
    ctx.lineTo(x + correction, bottom);
    ctx.stroke();
}
function strokeInPixel(ctx, drawFunction) {
    ctx.save();
    if (ctx.lineWidth % 2) {
        ctx.translate(0.5, 0.5);
    }
    drawFunction();
    ctx.restore();
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * Checks an assertion. Throws if the assertion is failed.
 * @param condition Result of the assertion evaluation
 * @param message Text to include in the exception message
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error('Assertion failed' + (message ? ': ' + message : ''));
    }
}
function ensureDefined(value) {
    if (value === undefined) {
        throw new Error('Value is undefined');
    }
    return value;
}
function ensureNotNull(value) {
    if (value === null) {
        throw new Error('Value is null');
    }
    return value;
}
function ensure(value) {
    return ensureNotNull(ensureDefined(value));
}
/**
 * Compile time check for never
 */
function ensureNever(value) {
}

// tslint:disable-next-line:no-any
function merge(dst) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var src = sources_1[_a];
        for (var i in src) {
            if (src[i] === undefined) {
                continue;
            }
            if ('object' !== typeof src[i] || dst[i] === undefined) {
                dst[i] = src[i];
            }
            else {
                merge(dst[i], src[i]);
            }
        }
    }
    return dst;
}
function isNumber(value) {
    return (typeof value === 'number') && (isFinite(value));
}
function isInteger(value) {
    return (typeof value === 'number') && ((value % 1) === 0);
}
function isString(value) {
    return typeof value === 'string';
}
function isNaN$1(value) {
    return !(value <= 0) && !(value > 0);
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function clone(object) {
    // tslint:disable-next-line:no-any
    var o = object;
    if (!o || 'object' !== typeof o) {
        return o;
    }
    // tslint:disable-next-line:no-any
    var c;
    if (Array.isArray(o)) {
        c = [];
    }
    else {
        c = {};
    }
    var p;
    var v;
    for (p in o) {
        if (o.hasOwnProperty(p)) {
            v = o[p];
            if (v && 'object' === typeof v) {
                c[p] = clone(v);
            }
            else {
                c[p] = v;
            }
        }
    }
    return c;
}
function notNull(t) {
    return t !== null;
}
function undefinedIfNull(t) {
    return (t === null) ? undefined : t;
}

var CompositeRenderer = /** @class */ (function () {
    function CompositeRenderer() {
        this._private__renderers = [];
    }
    CompositeRenderer.prototype.setRenderers = function (renderers) {
        this._private__renderers = renderers;
    };
    CompositeRenderer.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        this._private__renderers.forEach(function (r) {
            ctx.save();
            r.draw(ctx, pixelRatio, isHovered, hitTestData);
            ctx.restore();
        });
    };
    return CompositeRenderer;
}());

var ScaledRenderer = /** @class */ (function () {
    function ScaledRenderer() {
    }
    ScaledRenderer.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        ctx.save();
        // actually we must be sure that this scaling applied only once at the same time
        // currently ScaledRenderer could be only nodes renderer (not top-level renderers like CompositeRenderer or something)
        // so this "constraint" is fulfilled for now
        ctx.scale(pixelRatio, pixelRatio);
        this._drawImpl(ctx, isHovered, hitTestData);
        ctx.restore();
    };
    ScaledRenderer.prototype.drawBackground = function (ctx, pixelRatio, isHovered, hitTestData) {
        ctx.save();
        // actually we must be sure that this scaling applied only once at the same time
        // currently ScaledRenderer could be only nodes renderer (not top-level renderers like CompositeRenderer or something)
        // so this "constraint" is fulfilled for now
        ctx.scale(pixelRatio, pixelRatio);
        this._drawBackgroundImpl(ctx, isHovered, hitTestData);
        ctx.restore();
    };
    ScaledRenderer.prototype._drawBackgroundImpl = function (ctx, isHovered, hitTestData) {
    };
    return ScaledRenderer;
}());

var PaneRendererMarks = /** @class */ (function (_super) {
    __extends(PaneRendererMarks, _super);
    function PaneRendererMarks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        return _this;
    }
    PaneRendererMarks.prototype.setData = function (data) {
        this._data = data;
    };
    PaneRendererMarks.prototype._drawImpl = function (ctx) {
        if (this._data === null || this._data.visibleRange === null) {
            return;
        }
        var visibleRange = this._data.visibleRange;
        var data = this._data;
        var draw = function (radius) {
            ctx.beginPath();
            for (var i = visibleRange.to - 1; i >= visibleRange.from; --i) {
                var point = data.items[i];
                ctx.moveTo(point.x, point.y);
                ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            }
            ctx.fill();
        };
        ctx.fillStyle = data.backColor;
        draw(data.radius + 2);
        ctx.fillStyle = data.lineColor;
        draw(data.radius);
    };
    return PaneRendererMarks;
}(ScaledRenderer));

function createEmptyMarkerData(chartOptions) {
    return {
        items: [{
                x: 0,
                y: 0,
                time: 0,
                price: 0,
            }],
        lineColor: '',
        backColor: chartOptions.layout.backgroundColor,
        radius: 0,
        visibleRange: null,
    };
}
var rangeForSinglePoint = { from: 0, to: 1 };
var CrosshairMarksPaneView = /** @class */ (function () {
    function CrosshairMarksPaneView(chartModel, crosshair) {
        this._private__compositeRenderer = new CompositeRenderer();
        this._private__markersRenderers = [];
        this._private__markersData = [];
        this._private__invalidated = true;
        this._private__chartModel = chartModel;
        this._private__crosshair = crosshair;
        this._private__compositeRenderer.setRenderers(this._private__markersRenderers);
    }
    CrosshairMarksPaneView.prototype.update = function (updateType) {
        var _this = this;
        var serieses = this._private__chartModel.serieses();
        if (serieses.length !== this._private__markersRenderers.length) {
            this._private__markersData = serieses.map(function () { return createEmptyMarkerData(_this._private__chartModel.options()); });
            this._private__markersRenderers = this._private__markersData.map(function (data) {
                var res = new PaneRendererMarks();
                res.setData(data);
                return res;
            });
            this._private__compositeRenderer.setRenderers(this._private__markersRenderers);
        }
        this._private__invalidated = true;
    };
    CrosshairMarksPaneView.prototype.renderer = function (height, width, addAnchors) {
        if (this._private__invalidated) {
            this._private__updateImpl();
            this._private__invalidated = false;
        }
        return this._private__compositeRenderer;
    };
    CrosshairMarksPaneView.prototype._private__updateImpl = function () {
        var _this = this;
        var serieses = this._private__chartModel.serieses();
        var timePointIndex = this._private__crosshair.appliedIndex();
        var timeScale = this._private__chartModel.timeScale();
        serieses.forEach(function (s, index) {
            var data = _this._private__markersData[index];
            var seriesData = s.markerDataAtIndex(timePointIndex);
            if (seriesData === null) {
                data.visibleRange = null;
                return;
            }
            var firstValue = ensureNotNull(s.firstValue());
            data.lineColor = s.barColorer().barStyle(timePointIndex).barColor;
            data.backColor = _this._private__chartModel.options().layout.backgroundColor;
            data.radius = seriesData.radius;
            data.items[0].price = seriesData.price;
            data.items[0].y = s.priceScale().priceToCoordinate(seriesData.price, firstValue.value);
            data.items[0].time = timePointIndex;
            data.items[0].x = timeScale.indexToCoordinate(timePointIndex);
            data.visibleRange = rangeForSinglePoint;
        });
    };
    return CrosshairMarksPaneView;
}());

var CrosshairRenderer = /** @class */ (function () {
    function CrosshairRenderer(data) {
        this._private__data = data;
    }
    CrosshairRenderer.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        if (this._private__data === null) {
            return;
        }
        var vertLinesVisible = this._private__data.vertLine.visible;
        var horzLinesVisible = this._private__data.horzLine.visible;
        if (!vertLinesVisible && !horzLinesVisible) {
            return;
        }
        ctx.save();
        var x = Math.round(this._private__data.x * pixelRatio);
        var y = Math.round(this._private__data.y * pixelRatio);
        var w = Math.ceil(this._private__data.w * pixelRatio);
        var h = Math.ceil(this._private__data.h * pixelRatio);
        ctx.lineCap = 'butt';
        if (vertLinesVisible && x >= 0) {
            ctx.lineWidth = Math.floor(this._private__data.vertLine.lineWidth * pixelRatio);
            ctx.strokeStyle = this._private__data.vertLine.color;
            ctx.fillStyle = this._private__data.vertLine.color;
            setLineStyle(ctx, this._private__data.vertLine.lineStyle);
            drawVerticalLine(ctx, x, 0, h);
        }
        if (horzLinesVisible && y >= 0) {
            ctx.lineWidth = Math.floor(this._private__data.horzLine.lineWidth * pixelRatio);
            ctx.strokeStyle = this._private__data.horzLine.color;
            ctx.fillStyle = this._private__data.horzLine.color;
            setLineStyle(ctx, this._private__data.horzLine.lineStyle);
            drawHorizontalLine(ctx, y, 0, w);
        }
        ctx.restore();
    };
    return CrosshairRenderer;
}());

var CrosshairPaneView = /** @class */ (function () {
    function CrosshairPaneView(source) {
        this._private__invalidated = true;
        this._private__rendererData = {
            vertLine: {
                lineWidth: 1,
                lineStyle: 0,
                color: '',
                visible: false,
            },
            horzLine: {
                lineWidth: 1,
                lineStyle: 0,
                color: '',
                visible: false,
            },
            w: 0,
            h: 0,
            x: 0,
            y: 0,
        };
        this._private__renderer = new CrosshairRenderer(this._private__rendererData);
        this._private__source = source;
    }
    CrosshairPaneView.prototype.update = function () {
        this._private__invalidated = true;
    };
    CrosshairPaneView.prototype.renderer = function (height, width) {
        if (this._private__invalidated) {
            this._private__updateImpl();
        }
        return this._private__renderer;
    };
    CrosshairPaneView.prototype._private__updateImpl = function () {
        var visible = this._private__source.visible();
        var pane = ensureNotNull(this._private__source.pane());
        var crosshairOptions = pane.model().options().crosshair;
        var data = this._private__rendererData;
        data.horzLine.visible = visible && this._private__source.horzLineVisible(pane);
        data.vertLine.visible = visible && this._private__source.vertLineVisible();
        data.horzLine.lineWidth = crosshairOptions.horzLine.width;
        data.horzLine.lineStyle = crosshairOptions.horzLine.style;
        data.horzLine.color = crosshairOptions.horzLine.color;
        data.vertLine.lineWidth = crosshairOptions.vertLine.width;
        data.vertLine.lineStyle = crosshairOptions.vertLine.style;
        data.vertLine.color = crosshairOptions.vertLine.color;
        data.w = pane.width();
        data.h = pane.height();
        data.x = this._private__source.appliedX();
        data.y = this._private__source.appliedY();
    };
    return CrosshairPaneView;
}());

var namedColorRgbHexStrings = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    feldspar: '#d19275',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslateblue: '#8470ff',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    violetred: '#d02090',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};
function normalizeInteger(min, n, max) {
    return (isNaN$1(n) ? min :
        n < min ? min :
            n > max ? max :
                Math.round(n));
}
function normalizeNumber(min, n, max) {
    return (isNaN$1(n) ? min :
        n < min ? min :
            n > max ? max :
                // limit the precision of all numbers to at most 4 digits in fractional part
                Math.round(n * 10000) / 10000);
}
function normalizeRgbComponent(component) {
    return normalizeInteger(0, component, 255);
}
function normalizeAlphaComponent(alpha) {
    return normalizeNumber(0, alpha, 1);
}
var RgbShortHexRepresentation;
(function (RgbShortHexRepresentation) {
    /**
     * @example
     * #fb0
     * @example
     * #f0f
     */
    RgbShortHexRepresentation.re = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/;
    function parse(matches) {
        return [
            normalizeRgbComponent(parseInt(matches[1] + matches[1], 16)),
            normalizeRgbComponent(parseInt(matches[2] + matches[2], 16)),
            normalizeRgbComponent(parseInt(matches[3] + matches[3], 16)),
        ];
    }
    RgbShortHexRepresentation.parse = parse;
})(RgbShortHexRepresentation || (RgbShortHexRepresentation = {}));
function tryParseRgbShortHexString(rgbShortHexString) {
    var matches = RgbShortHexRepresentation.re.exec(rgbShortHexString);
    return matches !== null ? RgbShortHexRepresentation.parse(matches) : null;
}
var RgbHexRepresentation;
(function (RgbHexRepresentation) {
    /**
     * @example
     * #00ff00
     * @example
     * #336699
     */
    RgbHexRepresentation.re = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
    function parse(matches) {
        return [
            normalizeRgbComponent(parseInt(matches[1], 16)),
            normalizeRgbComponent(parseInt(matches[2], 16)),
            normalizeRgbComponent(parseInt(matches[3], 16)),
        ];
    }
    RgbHexRepresentation.parse = parse;
})(RgbHexRepresentation || (RgbHexRepresentation = {}));
var RgbRepresentation;
(function (RgbRepresentation) {
    /**
     * @example
     * rgb(123, 234, 45)
     * @example
     * rgb(255,234,245)
     */
    RgbRepresentation.re = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/;
    function parse(matches) {
        return [
            normalizeRgbComponent(parseInt(matches[1], 10)),
            normalizeRgbComponent(parseInt(matches[2], 10)),
            normalizeRgbComponent(parseInt(matches[3], 10)),
        ];
    }
    RgbRepresentation.parse = parse;
})(RgbRepresentation || (RgbRepresentation = {}));
var RgbaRepresentation;
(function (RgbaRepresentation) {
    /**
     * @example
     * rgba(123, 234, 45, 1)
     * @example
     * rgba(255,234,245,0.1)
     */
    RgbaRepresentation.re = /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/;
    function parse(matches) {
        return [
            normalizeRgbComponent(parseInt(matches[1], 10)),
            normalizeRgbComponent(parseInt(matches[2], 10)),
            normalizeRgbComponent(parseInt(matches[3], 10)),
            normalizeAlphaComponent(parseFloat(matches[4])),
        ];
    }
    RgbaRepresentation.parse = parse;
})(RgbaRepresentation || (RgbaRepresentation = {}));
function tryParseRgbHexString(rgbHexString) {
    var matches = RgbHexRepresentation.re.exec(rgbHexString);
    return matches !== null ? RgbHexRepresentation.parse(matches) : null;
}
function tryParseRgbString(rgbString) {
    var matches = RgbRepresentation.re.exec(rgbString);
    return matches !== null ? RgbRepresentation.parse(matches) : null;
}
function tryParseRgbaString(rgbaString) {
    var matches = RgbaRepresentation.re.exec(rgbaString);
    return matches !== null ? RgbaRepresentation.parse(matches) : null;
}
function tryParseRgb(colorString) {
    colorString = colorString.toLowerCase();
    if (colorString in namedColorRgbHexStrings) {
        colorString = namedColorRgbHexStrings[colorString];
    }
    var rgbParseResult = tryParseRgbString(colorString);
    if (rgbParseResult !== null) {
        return rgbParseResult;
    }
    var rgbHexParseResult = tryParseRgbHexString(colorString);
    if (rgbHexParseResult !== null) {
        return rgbHexParseResult;
    }
    var rgbShortHexParseResult = tryParseRgbShortHexString(colorString);
    if (rgbShortHexParseResult !== null) {
        return rgbShortHexParseResult;
    }
    var rgbaParseResult = tryParseRgbaString(colorString);
    if (rgbaParseResult !== null) {
        return [rgbaParseResult[0], rgbaParseResult[1], rgbaParseResult[2]];
    }
    return null;
}
function parseRgb(colorString) {
    var parseResult = tryParseRgb(colorString);
    if (parseResult !== null) {
        return parseResult;
    }
    else {
        throw new Error("Passed color string " + colorString + " does not match any of the known color representations");
    }
}
function rgbToGrayscale(rgbValue) {
    // Originally, the NTSC RGB to YUV formula
    // perfected by @eugene-korobko's black magic
    var redComponentGrayscaleWeight = 0.199;
    var greenComponentGrayscaleWeight = 0.687;
    var blueComponentGrayscaleWeight = 0.114;
    return (redComponentGrayscaleWeight * rgbValue[0] +
        greenComponentGrayscaleWeight * rgbValue[1] +
        blueComponentGrayscaleWeight * rgbValue[2]);
}
function rgbToBlackWhiteString(rgbValue, threshold) {
    if (threshold < 0 || threshold > 255) {
        throw new Error('invalid threshold value, valid values are [0, 255]');
    }
    return rgbToGrayscale(rgbValue) >= threshold ? 'white' : 'black';
}
function rgba(rgb, alpha) {
    return [
        rgb[0],
        rgb[1],
        rgb[2],
        normalizeAlphaComponent(alpha),
    ];
}
function rgbaToString(rgbaValue) {
    return "rgba(" + rgbaValue[0] + ", " + rgbaValue[1] + ", " + rgbaValue[2] + ", " + rgbaValue[3] + ")";
}
function resetTransparency(color) {
    if (isHexColor(color)) {
        return color;
    }
    return rgbaToString(rgba(parseRgb(color), 1));
}
function isHexColor(color) {
    return color.indexOf('#') === 0;
}
function generateTextColor(color) {
    var backColorBW = rgbToBlackWhiteString(parseRgb(color), 160);
    return backColorBW === 'black' ? 'white' : 'black';
}

/** Draw rectangle with outer border defined with parameters. FillStyle is used as color
 * @param ctx context to draw on
 * @param x left outer border of the target rectangle
 * @param y top outer border of the target rectangle
 * @param w width of the target rectangle
 * @param h height of the target rectangle
 * @param lineWidth line width. Must be less than width and height
 */
function strokeRectInnerWithFill(ctx, x, y, w, h, lineWidth) {
    // should not overlap on corners for semi-transparent colors
    // left
    ctx.fillRect(x, y, lineWidth, h);
    // top
    ctx.fillRect(x + lineWidth, y, w - lineWidth * 2, lineWidth);
    // bottom
    ctx.fillRect(x + lineWidth, y + h - lineWidth, w - lineWidth * 2, lineWidth);
    // right
    ctx.fillRect(x + w - lineWidth, y, lineWidth, h);
}
function drawScaled(ctx, ratio, func) {
    ctx.save();
    ctx.scale(ratio, ratio);
    func();
    ctx.restore();
}
function clearRect(ctx, x, y, w, h, clearColor) {
    ctx.save();
    ctx.globalCompositeOperation = 'copy';
    ctx.fillStyle = clearColor;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
}

var PriceAxisViewRenderer = /** @class */ (function () {
    function PriceAxisViewRenderer(data, commonData) {
        this.setData(data, commonData);
    }
    PriceAxisViewRenderer.prototype.setData = function (data, commonData) {
        this._private__data = data;
        this._private__commonData = commonData;
    };
    PriceAxisViewRenderer.prototype.draw = function (ctx, rendererOptions, textWidthCache, width, align, pixelRatio) {
        if (!this._private__data.visible) {
            return;
        }
        ctx.font = rendererOptions.font;
        var tickSize = this._private__data.tickVisible ? rendererOptions.tickLength : 0;
        var horzBorder = rendererOptions.borderSize;
        var paddingTop = rendererOptions.paddingTop;
        var paddingBottom = rendererOptions.paddingBottom;
        var paddingInner = rendererOptions.paddingInner;
        var paddingOuter = rendererOptions.paddingOuter;
        var text = this._private__data.text;
        var textWidth = Math.ceil(textWidthCache.measureText(ctx, text));
        var baselineOffset = rendererOptions.baselineOffset;
        var totalHeight = rendererOptions.fontSize + paddingTop + paddingBottom;
        var halfHeigth = Math.ceil(totalHeight * 0.5);
        var totalWidth = horzBorder + textWidth + paddingInner + paddingOuter + tickSize;
        var yMid = this._private__commonData.coordinate;
        if (this._private__commonData.fixedCoordinate) {
            yMid = this._private__commonData.fixedCoordinate;
        }
        yMid = Math.round(yMid);
        var yTop = yMid - halfHeigth;
        var yBottom = yTop + totalHeight;
        var alignRight = align === 'right';
        var xInside = alignRight ? width : 0;
        var rightScaled = Math.ceil(width * pixelRatio);
        var xOutside = xInside;
        var xTick;
        var xText;
        ctx.fillStyle = resetTransparency(this._private__commonData.background);
        ctx.lineWidth = 1;
        ctx.lineCap = 'butt';
        if (text) {
            if (alignRight) {
                // 2               1
                //
                //              6  5
                //
                // 3               4
                xOutside = xInside - totalWidth;
                xTick = xInside - tickSize;
                xText = xOutside + paddingOuter;
            }
            else {
                // 1               2
                //
                // 6  5
                //
                // 4               3
                xOutside = xInside + totalWidth;
                xTick = xInside + tickSize;
                xText = xInside + horzBorder + tickSize + paddingInner;
            }
            var tickHeight = Math.max(1, Math.floor(pixelRatio));
            var horzBorderScaled = Math.max(1, Math.floor(horzBorder * pixelRatio));
            var xInsideScaled = alignRight ? rightScaled : 0;
            var yTopScaled = Math.round(yTop * pixelRatio);
            var xOutsideScaled = Math.round(xOutside * pixelRatio);
            var yMidScaled = Math.round(yMid * pixelRatio) - Math.floor(pixelRatio * 0.5);
            var yBottomScaled = yMidScaled + tickHeight + (yMidScaled - yTopScaled);
            var xTickScaled = Math.round(xTick * pixelRatio);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xInsideScaled, yTopScaled);
            ctx.lineTo(xOutsideScaled, yTopScaled);
            ctx.lineTo(xOutsideScaled, yBottomScaled);
            ctx.lineTo(xInsideScaled, yBottomScaled);
            ctx.fill();
            // draw border
            ctx.fillStyle = this._private__data.borderColor;
            ctx.fillRect(alignRight ? rightScaled - horzBorderScaled : 0, yTopScaled, horzBorderScaled, yBottomScaled - yTopScaled);
            if (this._private__data.tickVisible) {
                ctx.fillStyle = this._private__commonData.color;
                ctx.fillRect(xInsideScaled, yMidScaled, xTickScaled - xInsideScaled, tickHeight);
            }
            ctx.textAlign = 'left';
            ctx.fillStyle = this._private__commonData.color;
            drawScaled(ctx, pixelRatio, function () {
                ctx.fillText(text, xText, yBottom - paddingBottom - baselineOffset);
            });
            ctx.restore();
        }
    };
    PriceAxisViewRenderer.prototype.height = function (rendererOptions, useSecondLine) {
        if (!this._private__data.visible) {
            return 0;
        }
        return rendererOptions.fontSize + rendererOptions.paddingTop + rendererOptions.paddingBottom;
    };
    return PriceAxisViewRenderer;
}());

var PriceAxisView = /** @class */ (function () {
    function PriceAxisView(ctor) {
        this._private__commonRendererData = {
            coordinate: 0,
            color: '#FFF',
            background: '#000',
        };
        this._private__axisRendererData = {
            text: '',
            visible: false,
            tickVisible: true,
            borderColor: '',
        };
        this._private__paneRendererData = {
            text: '',
            visible: false,
            tickVisible: false,
            borderColor: '',
        };
        this._private__invalidated = true;
        this._private__axisRenderer = new (ctor || PriceAxisViewRenderer)(this._private__axisRendererData, this._private__commonRendererData);
        this._private__paneRenderer = new (ctor || PriceAxisViewRenderer)(this._private__paneRendererData, this._private__commonRendererData);
    }
    PriceAxisView.prototype.text = function () {
        return this._private__axisRendererData.text;
    };
    PriceAxisView.prototype.background = function () {
        return this._private__commonRendererData.background;
    };
    PriceAxisView.prototype.color = function () {
        return generateTextColor(this.background());
    };
    PriceAxisView.prototype.coordinate = function () {
        this._private__updateRendererDataIfNeeded();
        return this._private__commonRendererData.coordinate;
    };
    PriceAxisView.prototype.update = function () {
        this._private__invalidated = true;
    };
    PriceAxisView.prototype.height = function (rendererOptions, useSecondLine) {
        if (useSecondLine === void 0) { useSecondLine = false; }
        return Math.max(this._private__axisRenderer.height(rendererOptions, useSecondLine), this._private__paneRenderer.height(rendererOptions, useSecondLine));
    };
    PriceAxisView.prototype.getFixedCoordinate = function () {
        return this._private__commonRendererData.fixedCoordinate || 0;
    };
    PriceAxisView.prototype.setFixedCoordinate = function (value) {
        this._private__commonRendererData.fixedCoordinate = value;
    };
    PriceAxisView.prototype.isVisible = function () {
        this._private__updateRendererDataIfNeeded();
        return this._private__axisRendererData.visible || this._private__paneRendererData.visible;
    };
    PriceAxisView.prototype.isAxisLabelVisible = function () {
        this._private__updateRendererDataIfNeeded();
        return this._private__axisRendererData.visible;
    };
    PriceAxisView.prototype.isPaneLabelVisible = function () {
        this._private__updateRendererDataIfNeeded();
        return this._private__paneRendererData.visible;
    };
    PriceAxisView.prototype.renderer = function () {
        this._private__updateRendererDataIfNeeded();
        this._private__axisRenderer.setData(this._private__axisRendererData, this._private__commonRendererData);
        this._private__paneRenderer.setData(this._private__paneRendererData, this._private__commonRendererData);
        return this._private__axisRenderer;
    };
    PriceAxisView.prototype.paneRenderer = function () {
        this._private__updateRendererDataIfNeeded();
        this._private__axisRenderer.setData(this._private__axisRendererData, this._private__commonRendererData);
        this._private__paneRenderer.setData(this._private__paneRendererData, this._private__commonRendererData);
        return this._private__paneRenderer;
    };
    PriceAxisView.prototype._private__updateRendererDataIfNeeded = function () {
        if (this._private__invalidated) {
            this._updateRendererData(this._private__axisRendererData, this._private__paneRendererData, this._private__commonRendererData);
            this._private__invalidated = false;
        }
    };
    return PriceAxisView;
}());

var CrosshairPriceAxisView = /** @class */ (function (_super) {
    __extends(CrosshairPriceAxisView, _super);
    function CrosshairPriceAxisView(source, priceScale, valueProvider) {
        var _this = _super.call(this) || this;
        _this._private__source = source;
        _this._private__priceScale = priceScale;
        _this._private__valueProvider = valueProvider;
        return _this;
    }
    CrosshairPriceAxisView.prototype._updateRendererData = function (axisRendererData, paneRendererData, commonRendererData) {
        axisRendererData.visible = false;
        var options = this._private__source.options().horzLine;
        if (!options.labelVisible) {
            return;
        }
        var firstValue = this._private__priceScale.firstValue();
        if (!this._private__source.visible() || this._private__priceScale.isEmpty() || (firstValue === null)) {
            return;
        }
        commonRendererData.background = options.labelBackgroundColor;
        commonRendererData.color = generateTextColor(options.labelBackgroundColor);
        var value = this._private__valueProvider(this._private__priceScale);
        commonRendererData.coordinate = value.coordinate;
        axisRendererData.text = this._private__priceScale.formatPrice(value.price, firstValue);
        axisRendererData.visible = true;
    };
    return CrosshairPriceAxisView;
}(PriceAxisView));

var optimizationReplacementRe = /[1-9]/g;
var TimeAxisViewRenderer = /** @class */ (function () {
    function TimeAxisViewRenderer() {
        this._private__data = null;
    }
    TimeAxisViewRenderer.prototype.setData = function (data) {
        this._private__data = data;
    };
    TimeAxisViewRenderer.prototype.draw = function (ctx, rendererOptions, pixelRatio) {
        var _this = this;
        if (this._private__data === null || this._private__data.visible === false || this._private__data.text.length === 0) {
            return;
        }
        ctx.font = rendererOptions.font;
        var textWidth = Math.round(rendererOptions.widthCache.measureText(ctx, this._private__data.text, optimizationReplacementRe));
        if (textWidth <= 0) {
            return;
        }
        ctx.save();
        var horzMargin = rendererOptions.paddingHorizontal;
        var labelWidth = textWidth + 2 * horzMargin;
        var labelWidthHalf = labelWidth / 2;
        var timeScaleWidth = this._private__data.width;
        var coordinate = this._private__data.coordinate;
        var x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
        if (x1 < 0) {
            coordinate = coordinate + Math.abs(0 - x1);
            x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
        }
        else if (x1 + labelWidth > timeScaleWidth) {
            coordinate = coordinate - Math.abs(timeScaleWidth - (x1 + labelWidth));
            x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
        }
        var x2 = x1 + labelWidth;
        var y1 = 0;
        var y2 = (y1 +
            rendererOptions.borderSize +
            rendererOptions.paddingTop +
            rendererOptions.fontSize +
            rendererOptions.paddingBottom);
        ctx.fillStyle = this._private__data.background;
        var x1scaled = Math.round(x1 * pixelRatio);
        var y1scaled = Math.round(y1 * pixelRatio);
        var x2scaled = Math.round(x2 * pixelRatio);
        var y2scaled = Math.round(y2 * pixelRatio);
        ctx.fillRect(x1scaled, y1scaled, x2scaled - x1scaled, y2scaled - y1scaled);
        var tickX = Math.round(this._private__data.coordinate * pixelRatio);
        var tickTop = y1scaled;
        var tickBottom = Math.round((tickTop + rendererOptions.borderSize + rendererOptions.tickLength) * pixelRatio);
        ctx.fillStyle = this._private__data.color;
        var tickWidth = Math.max(1, Math.floor(pixelRatio));
        var tickOffset = Math.floor(pixelRatio * 0.5);
        ctx.fillRect(tickX - tickOffset, tickTop, tickWidth, tickBottom - tickTop);
        var yText = y2 - rendererOptions.baselineOffset - rendererOptions.paddingBottom;
        ctx.textAlign = 'left';
        ctx.fillStyle = this._private__data.color;
        drawScaled(ctx, pixelRatio, function () {
            ctx.fillText(ensureNotNull(_this._private__data).text, x1 + horzMargin, yText);
        });
        ctx.restore();
    };
    return TimeAxisViewRenderer;
}());

var TimeAxisView = /** @class */ (function () {
    function TimeAxisView() {
        this._text = '';
        this._background = '#585858';
        this._coordinate = 0;
    }
    TimeAxisView.prototype.text = function () {
        return this._text;
    };
    TimeAxisView.prototype.background = function () {
        return this._background;
    };
    TimeAxisView.prototype.color = function () {
        var backgroundBW = rgbToBlackWhiteString(parseRgb(this._background), 150);
        return backgroundBW === 'black' ? 'white' : 'black';
    };
    TimeAxisView.prototype.coordinate = function () {
        return this._coordinate;
    };
    return TimeAxisView;
}());

var CrosshairTimeAxisView = /** @class */ (function (_super) {
    __extends(CrosshairTimeAxisView, _super);
    function CrosshairTimeAxisView(crosshair, model, valueProvider) {
        var _this = _super.call(this) || this;
        _this._private__invalidated = true;
        _this._private__renderer = new TimeAxisViewRenderer();
        _this._private__rendererData = {
            visible: false,
            background: '#4c525e',
            color: 'white',
            text: '',
            width: 0,
            coordinate: NaN,
        };
        _this._private__crosshair = crosshair;
        _this._private__model = model;
        _this._private__valueProvider = valueProvider;
        return _this;
    }
    CrosshairTimeAxisView.prototype.update = function () {
        this._private__invalidated = true;
    };
    CrosshairTimeAxisView.prototype.renderer = function () {
        if (this._private__invalidated) {
            this._private__updateImpl();
            this._private__invalidated = false;
        }
        this._private__renderer.setData(this._private__rendererData);
        return this._private__renderer;
    };
    CrosshairTimeAxisView.prototype._private__updateImpl = function () {
        var data = this._private__rendererData;
        data.visible = false;
        var options = this._private__crosshair.options().vertLine;
        if (!options.labelVisible) {
            return;
        }
        var timeScale = this._private__model.timeScale();
        if (timeScale.isEmpty()) {
            return;
        }
        var currentTime = timeScale.indexToUserTime(this._private__crosshair.appliedIndex());
        data.width = timeScale.width();
        var value = this._private__valueProvider();
        if (!value.time) {
            return;
        }
        data.coordinate = value.coordinate;
        data.text = timeScale.formatDateTime(ensureNotNull(currentTime));
        data.visible = true;
        data.background = options.labelBackgroundColor;
        data.color = generateTextColor(options.labelBackgroundColor);
    };
    return CrosshairTimeAxisView;
}(TimeAxisView));

var DataSource = /** @class */ (function () {
    function DataSource() {
        this._priceScale = null;
        this._private__zorder = 0;
    }
    DataSource.prototype.zorder = function () {
        return this._private__zorder;
    };
    DataSource.prototype.setZorder = function (zorder) {
        this._private__zorder = zorder;
    };
    DataSource.prototype.priceScale = function () {
        return this._priceScale;
    };
    DataSource.prototype.setPriceScale = function (priceScale) {
        this._priceScale = priceScale;
    };
    DataSource.prototype.priceAxisViews = function (pane, priceScale) {
        return [];
    };
    DataSource.prototype.paneViews = function (pane) {
        return [];
    };
    DataSource.prototype.timeAxisViews = function () {
        return [];
    };
    return DataSource;
}());

/**
 * Enum of possible crosshair behavior modes.
 * Normal means that the crosshair always follows the pointer.
 * Magnet means that the vertical line of the crosshair follows the pointer, while the horizontal line is placed on the corresponding series point.
 */
var CrosshairMode;
(function (CrosshairMode) {
    CrosshairMode[CrosshairMode["Normal"] = 0] = "Normal";
    CrosshairMode[CrosshairMode["Magnet"] = 1] = "Magnet";
})(CrosshairMode || (CrosshairMode = {}));
var Crosshair = /** @class */ (function (_super) {
    __extends(Crosshair, _super);
    function Crosshair(model, options) {
        var _this = _super.call(this) || this;
        _this._private__pane = null;
        _this._private__price = NaN;
        _this._private__index = 0;
        _this._private__visible = true;
        _this._private__priceAxisViews = new Map();
        _this._private__subscribed = false;
        _this._private__x = NaN;
        _this._private__y = NaN;
        _this._private__originX = NaN;
        _this._private__originY = NaN;
        _this._private__model = model;
        _this._private__options = options;
        _this._private__markersPaneView = new CrosshairMarksPaneView(model, _this);
        var valuePriceProvider = function (rawPriceProvider, rawCoordinateProvider) {
            return function (priceScale) {
                var coordinate = rawCoordinateProvider();
                var rawPrice = rawPriceProvider();
                if (priceScale === ensureNotNull(_this._private__pane).defaultPriceScale()) {
                    // price must be defined
                    return { price: rawPrice, coordinate: coordinate };
                }
                else {
                    // always convert from coordinate
                    var firstValue = ensureNotNull(priceScale.firstValue());
                    var price = priceScale.coordinateToPrice(coordinate, firstValue);
                    return { price: price, coordinate: coordinate };
                }
            };
        };
        var valueTimeProvider = function (rawIndexProvider, rawCoordinateProvider) {
            return function () {
                return {
                    time: _this._private__model.timeScale().indexToUserTime(rawIndexProvider()),
                    coordinate: rawCoordinateProvider(),
                };
            };
        };
        // for current position always return both price and coordinate
        _this._private__currentPosPriceProvider = valuePriceProvider(function () { return _this._private__price; }, function () { return _this._private__y; });
        var currentPosTimeProvider = valueTimeProvider(function () { return _this._private__index; }, function () { return _this.appliedX(); });
        _this._private__timeAxisView = new CrosshairTimeAxisView(_this, model, currentPosTimeProvider);
        _this._private__paneView = new CrosshairPaneView(_this);
        return _this;
    }
    Crosshair.prototype.index = function () {
        return this._private__index;
    };
    Crosshair.prototype.options = function () {
        return this._private__options;
    };
    Crosshair.prototype.saveOriginCoord = function (x, y) {
        this._private__originX = x;
        this._private__originY = y;
    };
    Crosshair.prototype.clearOriginCoord = function () {
        this._private__originX = NaN;
        this._private__originY = NaN;
    };
    Crosshair.prototype.originCoordX = function () {
        return this._private__originX;
    };
    Crosshair.prototype.originCoordY = function () {
        return this._private__originY;
    };
    Crosshair.prototype.setPosition = function (index, price, pane) {
        if (!this._private__subscribed) {
            this._private__subscribed = true;
        }
        this._private__visible = true;
        this._private__tryToUpdateViews(index, price, pane);
    };
    Crosshair.prototype.appliedIndex = function () {
        return this._private__index;
    };
    Crosshair.prototype.appliedX = function () {
        return this._private__x;
    };
    Crosshair.prototype.appliedY = function () {
        return this._private__y;
    };
    Crosshair.prototype.visible = function () {
        return this._private__visible;
    };
    Crosshair.prototype.clearPosition = function () {
        this._private__visible = false;
        this._private__setIndexToLastSeriesBarIndex();
        this._private__price = NaN;
        this._private__x = NaN;
        this._private__y = NaN;
        this._private__pane = null;
        this.clearOriginCoord();
    };
    Crosshair.prototype.paneViews = function (pane) {
        return this._private__pane !== null ? [this._private__paneView, this._private__markersPaneView] : [];
    };
    Crosshair.prototype.horzLineVisible = function (pane) {
        return pane === this._private__pane && this._private__options.horzLine.visible;
    };
    Crosshair.prototype.vertLineVisible = function () {
        return this._private__options.vertLine.visible;
    };
    Crosshair.prototype.priceAxisViews = function (pane, priceScale) {
        if (!this._private__visible || this._private__pane !== pane) {
            this._private__priceAxisViews.clear();
        }
        var views = [];
        if (this._private__pane === pane) {
            views.push(this._private__createPriceAxisViewOnDemand(this._private__priceAxisViews, priceScale, this._private__currentPosPriceProvider));
        }
        return views;
    };
    Crosshair.prototype.timeAxisViews = function () {
        return this._private__visible ? [this._private__timeAxisView] : [];
    };
    Crosshair.prototype.pane = function () {
        return this._private__pane;
    };
    Crosshair.prototype.updateAllViews = function () {
        this._private__priceAxisViews.forEach(function (value) { return value.update(); });
        this._private__timeAxisView.update();
        this._private__markersPaneView.update();
    };
    Crosshair.prototype._private__priceScaleByPane = function (pane) {
        if (pane && !pane.defaultPriceScale().isEmpty()) {
            return pane.defaultPriceScale();
        }
        return null;
    };
    Crosshair.prototype._private__tryToUpdateViews = function (index, price, pane) {
        if (this._private__tryToUpdateData(index, price, pane)) {
            this.updateAllViews();
        }
    };
    Crosshair.prototype._private__tryToUpdateData = function (newIndex, newPrice, newPane) {
        var oldX = this._private__x;
        var oldY = this._private__y;
        var oldPrice = this._private__price;
        var oldIndex = this._private__index;
        var oldPane = this._private__pane;
        var priceScale = this._private__priceScaleByPane(newPane);
        this._private__index = newIndex;
        this._private__x = isNaN(newIndex) ? NaN : this._private__model.timeScale().indexToCoordinate(newIndex);
        this._private__pane = newPane;
        var firstValue = priceScale !== null ? priceScale.firstValue() : null;
        if (priceScale !== null && firstValue !== null) {
            this._private__price = newPrice;
            this._private__y = priceScale.priceToCoordinate(newPrice, firstValue);
        }
        else {
            this._private__price = NaN;
            this._private__y = NaN;
        }
        return (oldX !== this._private__x || oldY !== this._private__y || oldIndex !== this._private__index ||
            oldPrice !== this._private__price || oldPane !== this._private__pane);
    };
    Crosshair.prototype._private__setIndexToLastSeriesBarIndex = function () {
        var lastIndexes = this._private__model.serieses()
            .map(function (s) { return s.bars().lastIndex(); })
            .filter(notNull);
        var lastBarIndex = (lastIndexes.length === 0) ? null : Math.max.apply(Math, lastIndexes);
        this._private__index = lastBarIndex !== null ? lastBarIndex : NaN;
    };
    Crosshair.prototype._private__createPriceAxisViewOnDemand = function (map, priceScale, valueProvider) {
        var view = map.get(priceScale);
        if (view === undefined) {
            view = new CrosshairPriceAxisView(this, priceScale, valueProvider);
            map.set(priceScale, view);
        }
        return view;
    };
    return Crosshair;
}(DataSource));

var formatterOptions = {
    decimalSign: '.',
    decimalSignFractional: '\'',
};
// length mustn't be more then 16
function numberToStringWithLeadingZero(value, length) {
    if (!isNumber(value)) {
        return 'n/a';
    }
    if (!isInteger(length)) {
        throw new TypeError('invalid length');
    }
    if (length < 0 || length > 16) {
        throw new TypeError('invalid length');
    }
    if (length === 0) {
        return value.toString();
    }
    var dummyString = '0000000000000000';
    return (dummyString + value.toString()).slice(-length);
}
var PriceFormatter = /** @class */ (function () {
    function PriceFormatter(priceScale, minMove, fractional, minMove2) {
        if (!minMove) {
            minMove = 1;
        }
        if (!isNumber(priceScale) || !isInteger(priceScale)) {
            priceScale = 100;
        }
        if (priceScale < 0) {
            throw new TypeError('invalid base');
        }
        this._private__priceScale = priceScale;
        this._private__minMove = minMove;
        this._private__minMove2 = minMove2;
        if (fractional && minMove2 !== undefined && minMove2 > 0 && minMove2 !== 2 && minMove2 !== 4 && minMove2 !== 8) {
            return;
        }
        this._private__fractional = fractional;
        this._private__calculateDecimal();
    }
    PriceFormatter.prototype.format = function (price) {
        // \u2212 is unicode's minus sign https://www.fileformat.info/info/unicode/char/2212/index.htm
        // we should use it because it has the same width as plus sign +
        var sign = price < 0 ? '\u2212' : '';
        price = Math.abs(price);
        if (this._private__fractional) {
            return sign + this._private__formatAsFractional(price);
        }
        return sign + this._private__formatAsDecimal(price);
    };
    PriceFormatter.prototype._private__calculateDecimal = function () {
        // check if this._base is power of 10
        // for double fractional _fractionalLength if for the main fractional only
        this._fractionalLength = 0;
        if (this._private__priceScale > 0 && this._private__minMove > 0) {
            var base = this._private__priceScale;
            if (this._private__fractional && this._private__minMove2) {
                base /= this._private__minMove2;
            }
            while (base > 1) {
                base /= 10;
                this._fractionalLength++;
            }
        }
    };
    PriceFormatter.prototype._private__formatAsDecimal = function (price) {
        var base;
        if (this._private__fractional) {
            // if you really want to format fractional as decimal
            base = Math.pow(10, (this._fractionalLength || 0));
        }
        else {
            base = this._private__priceScale / this._private__minMove;
        }
        var intPart = Math.floor(price);
        var fracString = '';
        var fracLength = this._fractionalLength !== undefined ? this._fractionalLength : NaN;
        if (base > 1) {
            var fracPart = +(Math.round(price * base) - intPart * base).toFixed(this._fractionalLength);
            if (fracPart >= base) {
                fracPart -= base;
                intPart += 1;
            }
            fracString = formatterOptions.decimalSign + numberToStringWithLeadingZero(+fracPart.toFixed(this._fractionalLength) * this._private__minMove, fracLength);
        }
        else {
            // should round int part to min move
            intPart = Math.round(intPart * base) / base;
            // if min move > 1, fractional part is always = 0
            if (fracLength > 0) {
                fracString = formatterOptions.decimalSign + numberToStringWithLeadingZero(0, fracLength);
            }
        }
        return intPart.toFixed(0) + fracString;
    };
    PriceFormatter.prototype._private__formatAsFractional = function (price) {
        // temporary solution - use decimal format with 2 digits
        var base = this._private__priceScale / this._private__minMove;
        var intPart = Math.floor(price);
        var fracPart = Math.round(price * base) - intPart * base;
        if (fracPart === base) {
            fracPart = 0;
            intPart += 1;
        }
        if (!this._fractionalLength) {
            throw new Error('_fractionalLength is not calculated');
        }
        var fracString = '';
        if (this._private__minMove2) {
            var minmove2 = ['0', '5'];
            var minmove4 = ['0', '2', '5', '7'];
            var minmove8 = ['0', '1', '2', '3', '4', '5', '6', '7'];
            // format double fractional
            var secondFract = fracPart % this._private__minMove2;
            fracPart = (fracPart - secondFract) / this._private__minMove2;
            var part1 = numberToStringWithLeadingZero(fracPart, this._fractionalLength);
            var part2 = this._private__minMove2 === 2 ?
                minmove2[secondFract] :
                this._private__minMove2 === 8 ?
                    minmove8[secondFract] :
                    minmove4[secondFract];
            fracString = part1 + formatterOptions.decimalSignFractional + part2;
        }
        else {
            fracString = numberToStringWithLeadingZero(fracPart * this._private__minMove, this._fractionalLength);
        }
        return intPart.toString() + formatterOptions.decimalSignFractional + fracString;
    };
    return PriceFormatter;
}());

var PercentageFormatter = /** @class */ (function (_super) {
    __extends(PercentageFormatter, _super);
    function PercentageFormatter(priceScale) {
        if (priceScale === void 0) { priceScale = 100; }
        return _super.call(this, priceScale) || this;
    }
    PercentageFormatter.prototype.format = function (price) {
        return _super.prototype.format.call(this, price) + "%";
    };
    return PercentageFormatter;
}(PriceFormatter));

// tslint:disable-next-line:invalid-void
var Delegate = /** @class */ (function () {
    function Delegate() {
        this._private__listeners = [];
    }
    Delegate.prototype.subscribe = function (callback, linkedObject, singleshot) {
        var listener = {
            callback: callback,
            linkedObject: linkedObject,
            singleshot: singleshot === true,
        };
        this._private__listeners.push(listener);
    };
    Delegate.prototype.unsubscribe = function (callback) {
        var index = this._private__listeners.findIndex(function (listener) { return callback === listener.callback; });
        if (index > -1) {
            this._private__listeners.splice(index, 1);
        }
    };
    Delegate.prototype.unsubscribeAll = function (linkedObject) {
        this._private__listeners = this._private__listeners.filter(function (listener) { return listener.linkedObject === linkedObject; });
    };
    Delegate.prototype.fire = function (param1, param2) {
        var listenersSnapshot = __spreadArrays(this._private__listeners);
        this._private__listeners = this._private__listeners.filter(function (listener) { return !listener.singleshot; });
        listenersSnapshot.forEach(function (listener) { return listener.callback(param1, param2); });
    };
    Delegate.prototype.hasListeners = function () {
        return this._private__listeners.length > 0;
    };
    Delegate.prototype.destroy = function () {
        this._private__listeners = [];
    };
    return Delegate;
}());

var PriceDataSource = /** @class */ (function (_super) {
    __extends(PriceDataSource, _super);
    function PriceDataSource(model) {
        var _this = _super.call(this) || this;
        _this._private__model = model;
        return _this;
    }
    PriceDataSource.prototype.model = function () {
        return this._private__model;
    };
    PriceDataSource.prototype.minMove = function () {
        return 0;
    };
    PriceDataSource.prototype.autoscaleInfo = function (startTimePoint, endTimePoint) {
        return null;
    };
    return PriceDataSource;
}(DataSource));

var PriceRange = /** @class */ (function () {
    function PriceRange(minValue, maxValue) {
        this._private__minValue = minValue;
        this._private__maxValue = maxValue;
    }
    PriceRange.prototype.equals = function (pr) {
        if (pr === null) {
            return false;
        }
        return this._private__minValue === pr._private__minValue && this._private__maxValue === pr._private__maxValue;
    };
    PriceRange.prototype.clone = function () {
        return new PriceRange(this._private__minValue, this._private__maxValue);
    };
    PriceRange.prototype.minValue = function () {
        return this._private__minValue;
    };
    PriceRange.prototype.setMinValue = function (v) {
        this._private__minValue = v;
    };
    PriceRange.prototype.maxValue = function () {
        return this._private__maxValue;
    };
    PriceRange.prototype.setMaxValue = function (v) {
        this._private__maxValue = v;
    };
    PriceRange.prototype.length = function () {
        return this._private__maxValue - this._private__minValue;
    };
    PriceRange.prototype.isEmpty = function () {
        return this._private__maxValue === this._private__minValue || Number.isNaN(this._private__maxValue) || Number.isNaN(this._private__minValue);
    };
    PriceRange.prototype.merge = function (anotherRange) {
        if (anotherRange === null) {
            return this;
        }
        return new PriceRange(Math.min(this.minValue(), anotherRange.minValue()), Math.max(this.maxValue(), anotherRange.maxValue()));
    };
    PriceRange.prototype.apply = function (min, max) {
        this._private__minValue = Math.min(this._private__minValue, min);
        this._private__maxValue = Math.max(this._private__maxValue, max);
    };
    PriceRange.prototype.set = function (min, max) {
        this._private__minValue = min;
        this._private__maxValue = max;
    };
    PriceRange.prototype.scaleAroundCenter = function (coeff) {
        if (!isNumber(coeff)) {
            return;
        }
        var delta = this._private__maxValue - this._private__minValue;
        if (delta === 0) {
            return;
        }
        var center = (this._private__maxValue + this._private__minValue) * 0.5;
        var maxDelta = this._private__maxValue - center;
        var minDelta = this._private__minValue - center;
        maxDelta *= coeff;
        minDelta *= coeff;
        this._private__maxValue = center + maxDelta;
        this._private__minValue = center + minDelta;
    };
    PriceRange.prototype.shift = function (delta) {
        if (!isNumber(delta)) {
            return;
        }
        this._private__maxValue += delta;
        this._private__minValue += delta;
    };
    PriceRange.prototype.containsStrictly = function (priceRange) {
        return priceRange.minValue() > this._private__minValue &&
            priceRange.maxValue() < this._private__maxValue;
    };
    return PriceRange;
}());

function clamp(value, minVal, maxVal) {
    return Math.min(Math.max(value, minVal), maxVal);
}
function isBaseDecimal(value) {
    if (value < 0) {
        return false;
    }
    for (var current = value; current > 1; current /= 10) {
        if ((current % 10) !== 0) {
            return false;
        }
    }
    return true;
}
function greaterOrEqual(x1, x2, epsilon) {
    return (x2 - x1) <= epsilon;
}
function equal(x1, x2, epsilon) {
    return Math.abs(x1 - x2) < epsilon;
}
function log10(x) {
    if (x <= 0) {
        return NaN;
    }
    return Math.log(x) / Math.log(10);
}
function min(arr) {
    if (arr.length < 1) {
        throw Error('array is empty');
    }
    var minVal = arr[0];
    for (var i = 1; i < arr.length; ++i) {
        if (arr[i] < minVal) {
            minVal = arr[i];
        }
    }
    return minVal;
}
function ceiledEven(x) {
    var ceiled = Math.ceil(x);
    return (ceiled % 2 !== 0) ? ceiled - 1 : ceiled;
}
function ceiledOdd(x) {
    var ceiled = Math.ceil(x);
    return (ceiled % 2 === 0) ? ceiled - 1 : ceiled;
}

var Constants;
(function (Constants) {
    Constants[Constants["LogicalOffset"] = 4] = "LogicalOffset";
    Constants[Constants["CoordOffset"] = 0.0001] = "CoordOffset";
})(Constants || (Constants = {}));
function fromPercent(value, baseValue) {
    if (baseValue < 0) {
        value = -value;
    }
    return (value / 100) * baseValue + baseValue;
}
function toPercent(value, baseValue) {
    var result = 100 * (value - baseValue) / baseValue;
    return (baseValue < 0 ? -result : result);
}
function toPercentRange(priceRange, baseValue) {
    var minPercent = toPercent(priceRange.minValue(), baseValue);
    var maxPercent = toPercent(priceRange.maxValue(), baseValue);
    return new PriceRange(minPercent, maxPercent);
}
function fromIndexedTo100(value, baseValue) {
    value -= 100;
    if (baseValue < 0) {
        value = -value;
    }
    return (value / 100) * baseValue + baseValue;
}
function toIndexedTo100(value, baseValue) {
    var result = 100 * (value - baseValue) / baseValue + 100;
    return (baseValue < 0 ? -result : result);
}
function toIndexedTo100Range(priceRange, baseValue) {
    var minPercent = toIndexedTo100(priceRange.minValue(), baseValue);
    var maxPercent = toIndexedTo100(priceRange.maxValue(), baseValue);
    return new PriceRange(minPercent, maxPercent);
}
function toLog(price) {
    var m = Math.abs(price);
    if (m < 1e-8) {
        return 0;
    }
    var res = log10(m + 0.0001 /* CoordOffset */) + 4 /* LogicalOffset */;
    return ((price < 0) ? -res : res);
}
function fromLog(logical) {
    var m = Math.abs(logical);
    if (m < 1e-8) {
        return 0;
    }
    var res = Math.pow(10, m - 4 /* LogicalOffset */) - 0.0001 /* CoordOffset */;
    return (logical < 0) ? -res : res;
}
function convertPriceRangeToLog(priceRange) {
    if (priceRange === null) {
        return null;
    }
    var min = toLog(priceRange.minValue());
    var max = toLog(priceRange.maxValue());
    return new PriceRange(min, max);
}
function canConvertPriceRangeFromLog(priceRange) {
    if (priceRange === null) {
        return false;
    }
    var min = fromLog(priceRange.minValue());
    var max = fromLog(priceRange.maxValue());
    return isFinite(min) && isFinite(max);
}
function convertPriceRangeFromLog(priceRange) {
    if (priceRange === null) {
        return null;
    }
    var min = fromLog(priceRange.minValue());
    var max = fromLog(priceRange.maxValue());
    return new PriceRange(min, max);
}

var TICK_SPAN_EPSILON = 1e-9;
var PriceTickSpanCalculator = /** @class */ (function () {
    function PriceTickSpanCalculator(base, integralDividers) {
        this._private__base = base;
        this._private__integralDividers = integralDividers;
        if (isBaseDecimal(this._private__base)) {
            this._private__fractionalDividers = [2, 2.5, 2];
        }
        else {
            this._private__fractionalDividers = [];
            for (var baseRest = this._private__base; baseRest !== 1;) {
                if ((baseRest % 2) === 0) {
                    this._private__fractionalDividers.push(2);
                    baseRest /= 2;
                }
                else if ((baseRest % 5) === 0) {
                    this._private__fractionalDividers.push(2);
                    this._private__fractionalDividers.push(2.5);
                    baseRest /= 5;
                }
                else {
                    throw new Error('unexpected base');
                }
                if (this._private__fractionalDividers.length > 100) {
                    throw new Error('something wrong with base');
                }
            }
        }
    }
    PriceTickSpanCalculator.prototype.tickSpan = function (high, low, maxTickSpan) {
        var minMovement = (this._private__base === 0) ? (0) : (1 / this._private__base);
        var tickSpanEpsilon = TICK_SPAN_EPSILON;
        var resultTickSpan = Math.pow(10, Math.max(0, Math.ceil(log10(high - low))));
        var index = 0;
        var c = this._private__integralDividers[0];
        while (true) {
            // the second part is actual for small with very small values like 1e-10
            // greaterOrEqual fails for such values
            var resultTickSpanLargerMinMovement = greaterOrEqual(resultTickSpan, minMovement, tickSpanEpsilon) && resultTickSpan > (minMovement + tickSpanEpsilon);
            var resultTickSpanLargerMaxTickSpan = greaterOrEqual(resultTickSpan, maxTickSpan * c, tickSpanEpsilon);
            var resultTickSpanLarger1 = greaterOrEqual(resultTickSpan, 1, tickSpanEpsilon);
            var haveToContinue = resultTickSpanLargerMinMovement && resultTickSpanLargerMaxTickSpan && resultTickSpanLarger1;
            if (!haveToContinue) {
                break;
            }
            resultTickSpan /= c;
            c = this._private__integralDividers[++index % this._private__integralDividers.length];
        }
        if (resultTickSpan <= (minMovement + tickSpanEpsilon)) {
            resultTickSpan = minMovement;
        }
        resultTickSpan = Math.max(1, resultTickSpan);
        if ((this._private__fractionalDividers.length > 0) && equal(resultTickSpan, 1, tickSpanEpsilon)) {
            index = 0;
            c = this._private__fractionalDividers[0];
            while (greaterOrEqual(resultTickSpan, maxTickSpan * c, tickSpanEpsilon) && resultTickSpan > (minMovement + tickSpanEpsilon)) {
                resultTickSpan /= c;
                c = this._private__fractionalDividers[++index % this._private__fractionalDividers.length];
            }
        }
        return resultTickSpan;
    };
    return PriceTickSpanCalculator;
}());

var TICK_DENSITY = 2.5;
var PriceTickMarkBuilder = /** @class */ (function () {
    function PriceTickMarkBuilder(priceScale, base, coordinateToLogicalFunc, logicalToCoordinateFunc) {
        this._private__marks = [];
        this._private__priceScale = priceScale;
        this._private__base = base;
        this._private__coordinateToLogicalFunc = coordinateToLogicalFunc;
        this._private__logicalToCoordinateFunc = logicalToCoordinateFunc;
    }
    PriceTickMarkBuilder.prototype.setBase = function (base) {
        if (base < 0) {
            throw new Error('base < 0');
        }
        this._private__base = base;
    };
    PriceTickMarkBuilder.prototype.tickSpan = function (high, low) {
        if (high < low) {
            throw new Error('high < low');
        }
        var scaleHeight = this._private__priceScale.height();
        var markHeight = this._private__tickMarkHeight();
        var maxTickSpan = (high - low) * markHeight / scaleHeight;
        var spanCalculator1 = new PriceTickSpanCalculator(this._private__base, [2, 2.5, 2]);
        var spanCalculator2 = new PriceTickSpanCalculator(this._private__base, [2, 2, 2.5]);
        var spanCalculator3 = new PriceTickSpanCalculator(this._private__base, [2.5, 2, 2]);
        var spans = [];
        spans.push(spanCalculator1.tickSpan(high, low, maxTickSpan));
        spans.push(spanCalculator2.tickSpan(high, low, maxTickSpan));
        spans.push(spanCalculator3.tickSpan(high, low, maxTickSpan));
        return min(spans);
    };
    // tslint:disable-next-line:cyclomatic-complexity
    PriceTickMarkBuilder.prototype.rebuildTickMarks = function () {
        var priceScale = this._private__priceScale;
        var firstValue = priceScale.firstValue();
        if (firstValue === null) {
            this._private__marks = [];
            return;
        }
        var scaleHeight = priceScale.height();
        var bottom = this._private__coordinateToLogicalFunc(scaleHeight - 1, firstValue);
        var top = this._private__coordinateToLogicalFunc(0, firstValue);
        var extraTopBottomMargin = this._private__priceScale.options().entireTextOnly ? this._private__fontHeight() / 2 : 0;
        var minCoord = extraTopBottomMargin;
        var maxCoord = scaleHeight - 1 - extraTopBottomMargin;
        var high = Math.max(bottom, top);
        var low = Math.min(bottom, top);
        if (high === low) {
            this._private__marks = [];
            return;
        }
        var span = this.tickSpan(high, low);
        var mod = high % span;
        mod += mod < 0 ? span : 0;
        var sign = (high >= low) ? 1 : -1;
        var prevCoord = null;
        var targetIndex = 0;
        for (var logical = high - mod; logical > low; logical -= span) {
            var coord = this._private__logicalToCoordinateFunc(logical, firstValue, true);
            // check if there is place for it
            // this is required for log scale
            if (prevCoord !== null && Math.abs(coord - prevCoord) < this._private__tickMarkHeight()) {
                continue;
            }
            // check if a tick mark is partially visible and skip it if entireTextOnly is true
            if (coord < minCoord || coord > maxCoord) {
                continue;
            }
            if (targetIndex < this._private__marks.length) {
                this._private__marks[targetIndex].coord = coord;
                this._private__marks[targetIndex].label = priceScale.formatLogical(logical);
            }
            else {
                this._private__marks.push({
                    coord: coord,
                    label: priceScale.formatLogical(logical),
                });
            }
            targetIndex++;
            prevCoord = coord;
            if (priceScale.isLog()) {
                // recalc span
                span = this.tickSpan(logical * sign, low);
            }
        }
        this._private__marks.length = targetIndex;
    };
    PriceTickMarkBuilder.prototype.marks = function () {
        return this._private__marks;
    };
    PriceTickMarkBuilder.prototype._private__fontHeight = function () {
        return this._private__priceScale.fontSize();
    };
    PriceTickMarkBuilder.prototype._private__tickMarkHeight = function () {
        return Math.ceil(this._private__fontHeight() * TICK_DENSITY);
    };
    return PriceTickMarkBuilder;
}());

var VolumeFormatter = /** @class */ (function () {
    function VolumeFormatter(precision) {
        this._private__precision = precision;
    }
    VolumeFormatter.prototype.format = function (vol) {
        var sign = '';
        if (vol < 0) {
            sign = '-';
            vol = -vol;
        }
        if (vol < 995) {
            return sign + this._private__formatNumber(vol);
        }
        else if (vol < 999995) {
            return sign + this._private__formatNumber(vol / 1000) + 'K';
        }
        else if (vol < 999999995) {
            vol = 1000 * Math.round(vol / 1000);
            return sign + this._private__formatNumber(vol / 1000000) + 'M';
        }
        else {
            vol = 1000000 * Math.round(vol / 1000000);
            return sign + this._private__formatNumber(vol / 1000000000) + 'B';
        }
    };
    VolumeFormatter.prototype._private__formatNumber = function (value) {
        var res;
        var priceScale = Math.pow(10, this._private__precision);
        value = Math.round(value * priceScale) / priceScale;
        if (value >= 1e-15 && value < 1) {
            res = value.toFixed(this._private__precision).replace(/\.?0+$/, ''); // regex removes trailing zeroes
        }
        else {
            res = String(value);
        }
        return res.replace(/(\.[1-9]*)0+$/, function (e, p1) { return p1; });
    };
    return VolumeFormatter;
}());

/**
 * BEWARE: The method must be called after beginPath and before stroke/fill/closePath/etc
 */
function walkLine(ctx, points, lineType, visibleRange) {
    if (points.length === 0) {
        return;
    }
    var x = points[visibleRange.from].x;
    var y = points[visibleRange.from].y;
    ctx.moveTo(x, y);
    for (var i = visibleRange.from + 1; i < visibleRange.to; ++i) {
        var currItem = points[i];
        //  x---x---x   or   x---x   o   or   start
        if (lineType === 1 /* WithSteps */) {
            var prevY = points[i - 1].y;
            var currX = currItem.x;
            ctx.lineTo(currX, prevY);
        }
        ctx.lineTo(currItem.x, currItem.y);
    }
}

var PaneRendererArea = /** @class */ (function (_super) {
    __extends(PaneRendererArea, _super);
    function PaneRendererArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        return _this;
    }
    PaneRendererArea.prototype.setData = function (data) {
        this._data = data;
    };
    PaneRendererArea.prototype._drawImpl = function (ctx) {
        if (this._data === null || this._data.items.length === 0 || this._data.visibleRange === null) {
            return;
        }
        ctx.lineCap = 'butt';
        ctx.strokeStyle = this._data.lineColor;
        ctx.lineWidth = this._data.lineWidth;
        setLineStyle(ctx, this._data.lineStyle);
        // walk lines with width=1 to have more accurate gradient's filling
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this._data.items[this._data.visibleRange.from].x, this._data.bottom);
        ctx.lineTo(this._data.items[this._data.visibleRange.from].x, this._data.items[this._data.visibleRange.from].y);
        walkLine(ctx, this._data.items, this._data.lineType, this._data.visibleRange);
        ctx.lineTo(this._data.items[this._data.visibleRange.to - 1].x, this._data.bottom);
        ctx.lineTo(this._data.items[this._data.visibleRange.from].x, this._data.bottom);
        ctx.closePath();
        var gradient = ctx.createLinearGradient(0, 0, 0, this._data.bottom);
        gradient.addColorStop(0, this._data.topColor);
        gradient.addColorStop(1, this._data.bottomColor);
        ctx.fillStyle = gradient;
        ctx.fill();
    };
    return PaneRendererArea;
}(ScaledRenderer));

var PaneRendererLine = /** @class */ (function (_super) {
    __extends(PaneRendererLine, _super);
    function PaneRendererLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        return _this;
    }
    PaneRendererLine.prototype.setData = function (data) {
        this._data = data;
    };
    PaneRendererLine.prototype._drawImpl = function (ctx) {
        if (this._data === null || this._data.items.length === 0 || this._data.visibleRange === null) {
            return;
        }
        ctx.lineCap = 'square';
        ctx.lineWidth = this._data.lineWidth;
        setLineStyle(ctx, this._data.lineStyle);
        ctx.strokeStyle = this._data.lineColor;
        ctx.lineJoin = 'miter';
        ctx.beginPath();
        walkLine(ctx, this._data.items, this._data.lineType, this._data.visibleRange);
        ctx.stroke();
    };
    return PaneRendererLine;
}(ScaledRenderer));

/**
 * Binary function that accepts two arguments (the first of the type of array elements, and the second is always val), and returns a value convertible to bool.
 * The value returned indicates whether the first argument is considered to go before the second.
 * The function shall not modify any of its arguments.
 */
function lowerbound(arr, value, compare, start, to) {
    if (start === void 0) { start = 0; }
    if (to === void 0) { to = arr.length; }
    var count = to - start;
    while (0 < count) {
        var count2 = (count >> 1);
        var mid = start + count2;
        if (compare(arr[mid], value)) {
            start = mid + 1;
            count -= count2 + 1;
        }
        else {
            count = count2;
        }
    }
    return start;
}
function upperbound(arr, value, compare, start, to) {
    if (start === void 0) { start = 0; }
    if (to === void 0) { to = arr.length; }
    var count = to - start;
    while (0 < count) {
        var count2 = (count >> 1);
        var mid = start + count2;
        if (!(compare(value, arr[mid]))) {
            start = mid + 1;
            count -= count2 + 1;
        }
        else {
            count = count2;
        }
    }
    return start;
}

function lowerBoundItemsCompare(item, time) {
    return item.time < time;
}
function upperBoundItemsCompare(time, item) {
    return time < item.time;
}
function visibleTimedValues(items, range, extendedRange) {
    var firstBar = range.firstBar();
    var lastBar = range.lastBar();
    var from = lowerbound(items, firstBar, lowerBoundItemsCompare);
    var to = upperbound(items, lastBar, upperBoundItemsCompare);
    if (!extendedRange) {
        return { from: from, to: to };
    }
    var extendedFrom = from;
    var extendedTo = to;
    if (from > 0 && from < items.length && items[from].time >= firstBar) {
        extendedFrom = from - 1;
    }
    if (to > 0 && to < items.length && items[to - 1].time <= lastBar) {
        extendedTo = to + 1;
    }
    return { from: extendedFrom, to: extendedTo };
}

var SeriesPaneViewBase = /** @class */ (function () {
    function SeriesPaneViewBase(series, model, extendedVisibleRange) {
        this._invalidated = true;
        this._dataInvalidated = true;
        this._items = [];
        this._itemsVisibleRange = null;
        this._series = series;
        this._model = model;
        this._private__extendedVisibleRange = extendedVisibleRange;
    }
    SeriesPaneViewBase.prototype.update = function (updateType) {
        this._invalidated = true;
        if (updateType === 'data') {
            this._dataInvalidated = true;
        }
    };
    SeriesPaneViewBase.prototype._makeValid = function () {
        if (this._dataInvalidated) {
            this._fillRawPoints();
            this._dataInvalidated = false;
        }
        if (this._invalidated) {
            this._updatePoints();
            this._invalidated = false;
        }
    };
    SeriesPaneViewBase.prototype._clearVisibleRange = function () {
        this._itemsVisibleRange = null;
    };
    SeriesPaneViewBase.prototype._updatePoints = function () {
        var priceScale = this._series.priceScale();
        var timeScale = this._model.timeScale();
        this._clearVisibleRange();
        if (timeScale.isEmpty() || priceScale.isEmpty()) {
            return;
        }
        var visibleBars = timeScale.visibleBars();
        if (visibleBars === null) {
            return;
        }
        if (this._series.data().bars().size() === 0) {
            return;
        }
        var firstValue = this._series.firstValue();
        if (firstValue === null) {
            return;
        }
        this._itemsVisibleRange = visibleTimedValues(this._items, visibleBars, this._private__extendedVisibleRange);
        this._convertToCoordinates(priceScale, timeScale, firstValue.value);
    };
    return SeriesPaneViewBase;
}());

var LinePaneViewBase = /** @class */ (function (_super) {
    __extends(LinePaneViewBase, _super);
    function LinePaneViewBase(series, model) {
        return _super.call(this, series, model, true) || this;
    }
    LinePaneViewBase.prototype._convertToCoordinates = function (priceScale, timeScale, firstValue) {
        timeScale.indexesToCoordinates(this._items, undefinedIfNull(this._itemsVisibleRange));
        priceScale.pointsArrayToCoordinates(this._items, firstValue, undefinedIfNull(this._itemsVisibleRange));
    };
    LinePaneViewBase.prototype._createRawItemBase = function (time, price) {
        return {
            time: time,
            price: price,
            x: NaN,
            y: NaN,
        };
    };
    LinePaneViewBase.prototype._fillRawPoints = function () {
        var _this = this;
        var barValueGetter = this._series.barFunction();
        var newItems = [];
        var colorer = this._series.barColorer();
        this._series.bars().each(function (index, bar) {
            var value = barValueGetter(bar.value);
            var item = _this._createRawItem(index, value, colorer);
            newItems.push(item);
            return false;
        });
        this._items = newItems;
    };
    return LinePaneViewBase;
}(SeriesPaneViewBase));

var SeriesAreaPaneView = /** @class */ (function (_super) {
    __extends(SeriesAreaPaneView, _super);
    function SeriesAreaPaneView(series, model) {
        var _this = _super.call(this, series, model) || this;
        _this._private__renderer = new CompositeRenderer();
        _this._private__areaRenderer = new PaneRendererArea();
        _this._private__lineRenderer = new PaneRendererLine();
        _this._private__renderer.setRenderers([_this._private__areaRenderer, _this._private__lineRenderer]);
        return _this;
    }
    SeriesAreaPaneView.prototype.renderer = function (height, width) {
        this._makeValid();
        var areaStyleProperties = this._series.options();
        var data = {
            lineType: areaStyleProperties.lineType,
            items: this._items,
            lineColor: areaStyleProperties.lineColor,
            lineStyle: areaStyleProperties.lineStyle,
            lineWidth: areaStyleProperties.lineWidth,
            topColor: areaStyleProperties.topColor,
            bottomColor: areaStyleProperties.bottomColor,
            bottom: height,
            visibleRange: this._itemsVisibleRange,
        };
        this._private__areaRenderer.setData(data);
        this._private__lineRenderer.setData(data);
        return this._private__renderer;
    };
    SeriesAreaPaneView.prototype._createRawItem = function (time, price) {
        return this._createRawItemBase(time, price);
    };
    return SeriesAreaPaneView;
}(LinePaneViewBase));

function optimalBarWidth(barSpacing, pixelRatio) {
    return Math.floor(barSpacing * 0.3 * pixelRatio);
}
function optimalCandlestickWidth(barSpacing, pixelRatio) {
    var res = Math.floor(barSpacing * 0.8 * pixelRatio);
    var scaledBarSpacing = Math.floor(barSpacing * pixelRatio);
    var optimal = Math.min(res, scaledBarSpacing - 1);
    return Math.max(1, optimal);
}

var PaneRendererBars = /** @class */ (function () {
    function PaneRendererBars() {
        this._private__data = null;
        this._private__barWidth = 0;
        this._private__barLineWidth = 0;
    }
    PaneRendererBars.prototype.setData = function (data) {
        this._private__data = data;
    };
    PaneRendererBars.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        if (this._private__data === null || this._private__data.bars.length === 0 || this._private__data.visibleRange === null) {
            return;
        }
        this._private__barWidth = Math.max(1, Math.floor(optimalBarWidth(this._private__data.barSpacing, pixelRatio)));
        // grid and crosshair have line width = Math.floor(pixelRatio)
        // if this value is odd, we have to make bars' width odd
        // if this value is even, we have to make bars' width even
        // in order of keeping crosshair-over-bar drawing symmetric
        if (this._private__barWidth >= 2) {
            var lineWidth = Math.floor(pixelRatio);
            if ((lineWidth % 2) !== (this._private__barWidth % 2)) {
                this._private__barWidth--;
            }
        }
        // if scale is compressed, bar could become less than 1 CSS pixel
        this._private__barLineWidth = this._private__data.thinBars ? Math.min(this._private__barWidth, Math.floor(pixelRatio)) : this._private__barWidth;
        var prevColor = null;
        for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; ++i) {
            var bar = this._private__data.bars[i];
            if (prevColor !== bar.color) {
                ctx.fillStyle = bar.color;
                prevColor = bar.color;
            }
            var bodyWidthHalf = Math.floor(this._private__barLineWidth * 0.5);
            var bodyCenter = Math.round(bar.x * pixelRatio);
            var bodyLeft = bodyCenter - bodyWidthHalf;
            var bodyWidth = this._private__barLineWidth;
            var bodyRight = bodyLeft + bodyWidth - 1;
            var bodyTop = Math.round(bar.highY * pixelRatio) - bodyWidthHalf;
            var bodyBottom = Math.round(bar.lowY * pixelRatio) + bodyWidthHalf;
            var bodyHeight = Math.max((bodyBottom - bodyTop), this._private__barLineWidth);
            ctx.fillRect(bodyLeft, bodyTop, bodyWidth, bodyHeight);
            var sideWidth = Math.ceil(this._private__barWidth * 1.5);
            if (this._private__barLineWidth <= this._private__barWidth) {
                if (this._private__data.openVisible) {
                    var openLeft = bodyCenter - sideWidth;
                    var openTop = Math.max(bodyTop, Math.round(bar.openY * pixelRatio) - bodyWidthHalf);
                    var openBottom = openTop + bodyWidth - 1;
                    if (openBottom > bodyTop + bodyHeight - 1) {
                        openBottom = bodyTop + bodyHeight - 1;
                        openTop = openBottom - bodyWidth + 1;
                    }
                    ctx.fillRect(openLeft, openTop, bodyLeft - openLeft, openBottom - openTop + 1);
                }
                var closeRight = bodyCenter + sideWidth;
                var closeTop = Math.max(bodyTop, Math.round(bar.closeY * pixelRatio) - bodyWidthHalf);
                var closeBottom = closeTop + bodyWidth - 1;
                if (closeBottom > bodyTop + bodyHeight - 1) {
                    closeBottom = bodyTop + bodyHeight - 1;
                    closeTop = closeBottom - bodyWidth + 1;
                }
                ctx.fillRect(bodyRight + 1, closeTop, closeRight - bodyRight, closeBottom - closeTop + 1);
            }
        }
    };
    return PaneRendererBars;
}());

var BarsPaneViewBase = /** @class */ (function (_super) {
    __extends(BarsPaneViewBase, _super);
    function BarsPaneViewBase(series, model) {
        return _super.call(this, series, model, false) || this;
    }
    BarsPaneViewBase.prototype._convertToCoordinates = function (priceScale, timeScale, firstValue) {
        timeScale.indexesToCoordinates(this._items, undefinedIfNull(this._itemsVisibleRange));
        priceScale.barPricesToCoordinates(this._items, firstValue, undefinedIfNull(this._itemsVisibleRange));
    };
    BarsPaneViewBase.prototype._createDefaultItem = function (time, bar, colorer) {
        return {
            time: time,
            open: bar.value[0 /* Open */],
            high: bar.value[1 /* High */],
            low: bar.value[2 /* Low */],
            close: bar.value[3 /* Close */],
            x: NaN,
            openY: NaN,
            highY: NaN,
            lowY: NaN,
            closeY: NaN,
        };
    };
    BarsPaneViewBase.prototype._fillRawPoints = function () {
        var _this = this;
        var newItems = [];
        var colorer = this._series.barColorer();
        this._series.bars().each(function (index, bar) {
            var item = _this._createRawItem(index, bar, colorer);
            newItems.push(item);
            return false;
        });
        this._items = newItems;
    };
    return BarsPaneViewBase;
}(SeriesPaneViewBase));

var SeriesBarsPaneView = /** @class */ (function (_super) {
    __extends(SeriesBarsPaneView, _super);
    function SeriesBarsPaneView(series, model) {
        var _this = _super.call(this, series, model) || this;
        _this._private__renderer = new PaneRendererBars();
        return _this;
    }
    SeriesBarsPaneView.prototype.renderer = function (height, width) {
        this._makeValid();
        var barStyleProps = this._series.options();
        var data = {
            bars: this._items,
            barSpacing: this._model.timeScale().barSpacing(),
            openVisible: barStyleProps.openVisible,
            thinBars: barStyleProps.thinBars,
            visibleRange: this._itemsVisibleRange,
        };
        this._private__renderer.setData(data);
        return this._private__renderer;
    };
    SeriesBarsPaneView.prototype._createRawItem = function (time, bar, colorer) {
        return __assign(__assign({}, this._createDefaultItem(time, bar, colorer)), { color: colorer.barStyle(time).barColor });
    };
    return SeriesBarsPaneView;
}(BarsPaneViewBase));

var Constants$1;
(function (Constants) {
    Constants[Constants["BarBorderWidth"] = 1] = "BarBorderWidth";
})(Constants$1 || (Constants$1 = {}));
var PaneRendererCandlesticks = /** @class */ (function () {
    function PaneRendererCandlesticks() {
        this._private__data = null;
        // scaled with pixelRatio
        this._private__barWidth = 0;
    }
    PaneRendererCandlesticks.prototype.setData = function (data) {
        this._private__data = data;
    };
    PaneRendererCandlesticks.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        if (this._private__data === null || this._private__data.bars.length === 0 || this._private__data.visibleRange === null) {
            return;
        }
        // now we know pixelRatio and we could calculate barWidth effectively
        this._private__barWidth = optimalCandlestickWidth(this._private__data.barSpacing, pixelRatio);
        // grid and crosshair have line width = Math.floor(pixelRatio)
        // if this value is odd, we have to make candlesticks' width odd
        // if this value is even, we have to make candlesticks' width even
        // in order of keeping crosshair-over-candlesticks drawing symmetric
        if (this._private__barWidth >= 2) {
            var wickWidth = Math.floor(pixelRatio);
            if ((wickWidth % 2) !== (this._private__barWidth % 2)) {
                this._private__barWidth--;
            }
        }
        var bars = this._private__data.bars;
        if (this._private__data.wickVisible) {
            this._private__drawWicks(ctx, bars, this._private__data.visibleRange, pixelRatio);
        }
        if (this._private__data.borderVisible) {
            this._private__drawBorder(ctx, bars, this._private__data.visibleRange, this._private__data.barSpacing, pixelRatio);
        }
        var borderWidth = this._private__calculateBorderWidth(pixelRatio);
        if (!this._private__data.borderVisible || this._private__barWidth > borderWidth * 2) {
            this._private__drawCandles(ctx, bars, this._private__data.visibleRange, pixelRatio);
        }
    };
    PaneRendererCandlesticks.prototype._private__drawWicks = function (ctx, bars, visibleRange, pixelRatio) {
        if (this._private__data === null) {
            return;
        }
        var prevWickColor = '';
        var wickWidth = Math.min(Math.floor(pixelRatio), Math.floor(this._private__data.barSpacing * pixelRatio));
        wickWidth = Math.min(wickWidth, this._private__barWidth);
        var wickOffset = Math.floor(wickWidth * 0.5);
        for (var i = visibleRange.from; i < visibleRange.to; i++) {
            var bar = bars[i];
            if (bar.wickColor !== prevWickColor) {
                ctx.fillStyle = bar.wickColor;
                prevWickColor = bar.wickColor;
            }
            var top_1 = Math.round(Math.min(bar.openY, bar.closeY) * pixelRatio);
            var bottom = Math.round(Math.max(bar.openY, bar.closeY) * pixelRatio);
            var high = Math.round(bar.highY * pixelRatio);
            var low = Math.round(bar.lowY * pixelRatio);
            var scaledX = Math.round(pixelRatio * bar.x);
            ctx.fillRect(scaledX - wickOffset, high, wickWidth, top_1 - high);
            ctx.fillRect(scaledX - wickOffset, bottom + 1, wickWidth, low - bottom);
        }
    };
    PaneRendererCandlesticks.prototype._private__calculateBorderWidth = function (pixelRatio) {
        var borderWidth = Math.floor(1 /* BarBorderWidth */ * pixelRatio);
        if (this._private__barWidth <= 2 * borderWidth) {
            borderWidth = Math.floor((this._private__barWidth - 1) * 0.5);
        }
        var res = Math.max(1, borderWidth);
        if (this._private__barWidth <= res * 2) {
            // do not draw bodies, restore original value
            return Math.floor(1 /* BarBorderWidth */ * pixelRatio);
        }
        return res;
    };
    PaneRendererCandlesticks.prototype._private__drawBorder = function (ctx, bars, visibleRange, barSpacing, pixelRatio) {
        var prevBorderColor = '';
        var borderWidth = this._private__calculateBorderWidth(pixelRatio);
        for (var i = visibleRange.from; i < visibleRange.to; i++) {
            var bar = bars[i];
            if (bar.borderColor !== prevBorderColor) {
                ctx.fillStyle = bar.borderColor;
                prevBorderColor = bar.borderColor;
            }
            var left = Math.round(bar.x * pixelRatio) - Math.floor(this._private__barWidth * 0.5);
            var right = left + this._private__barWidth - 1;
            var top_2 = Math.round(Math.min(bar.openY, bar.closeY) * pixelRatio);
            var bottom = Math.round(Math.max(bar.openY, bar.closeY) * pixelRatio);
            if (barSpacing > 2 * borderWidth) {
                strokeRectInnerWithFill(ctx, left, top_2, right - left + 1, bottom - top_2 + 1, borderWidth);
            }
            else {
                ctx.fillRect(left, top_2, right - left + 1, bottom - top_2 + 1);
            }
        }
    };
    PaneRendererCandlesticks.prototype._private__drawCandles = function (ctx, bars, visibleRange, pixelRatio) {
        if (this._private__data === null) {
            return;
        }
        var prevBarColor = '';
        var borderWidth = this._private__calculateBorderWidth(pixelRatio);
        for (var i = visibleRange.from; i < visibleRange.to; i++) {
            var bar = bars[i];
            var top_3 = Math.round(Math.min(bar.openY, bar.closeY) * pixelRatio);
            var bottom = Math.round(Math.max(bar.openY, bar.closeY) * pixelRatio);
            var left = Math.round(bar.x * pixelRatio) - Math.floor(this._private__barWidth * 0.5);
            var right = left + this._private__barWidth - 1;
            if (this._private__data.borderVisible) {
                left += borderWidth;
                top_3 += borderWidth;
                right -= borderWidth;
                bottom -= borderWidth;
            }
            if (top_3 > bottom) {
                continue;
            }
            if (bar.color !== prevBarColor) {
                var barColor = bar.color;
                ctx.fillStyle = barColor;
                prevBarColor = barColor;
            }
            ctx.fillRect(left, top_3, right - left + 1, bottom - top_3 + 1);
        }
    };
    return PaneRendererCandlesticks;
}());

var SeriesCandlesticksPaneView = /** @class */ (function (_super) {
    __extends(SeriesCandlesticksPaneView, _super);
    function SeriesCandlesticksPaneView(series, model) {
        var _this = _super.call(this, series, model) || this;
        _this._private__renderer = new PaneRendererCandlesticks();
        return _this;
    }
    SeriesCandlesticksPaneView.prototype.renderer = function (height, width) {
        this._makeValid();
        var candlestickStyleProps = this._series.options();
        var data = {
            bars: this._items,
            barSpacing: this._model.timeScale().barSpacing(),
            wickVisible: candlestickStyleProps.wickVisible,
            borderVisible: candlestickStyleProps.borderVisible,
            visibleRange: this._itemsVisibleRange,
        };
        this._private__renderer.setData(data);
        return this._private__renderer;
    };
    SeriesCandlesticksPaneView.prototype._createRawItem = function (time, bar, colorer) {
        var style = colorer.barStyle(time);
        return __assign(__assign({}, this._createDefaultItem(time, bar, colorer)), { color: style.barColor, wickColor: style.barWickColor, borderColor: style.barBorderColor });
    };
    return SeriesCandlesticksPaneView;
}(BarsPaneViewBase));

var showSpacingMinimalBarWidth = 3;
var alignToMinimalWidthLimit = 4;
var PaneRendererHistogram = /** @class */ (function () {
    function PaneRendererHistogram() {
        this._private__data = null;
        this._private__precalculatedCache = [];
    }
    PaneRendererHistogram.prototype.setData = function (data) {
        this._private__data = data;
        this._private__precalculatedCache = [];
    };
    PaneRendererHistogram.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        if (this._private__data === null || this._private__data.items.length === 0 || this._private__data.visibleRange === null) {
            return;
        }
        if (!this._private__precalculatedCache.length) {
            this._private__fillPrecalculatedCache(pixelRatio);
        }
        var histogramBase = Math.round(this._private__data.histogramBase * pixelRatio);
        var lineWidth = Math.max(1, Math.floor(pixelRatio));
        for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; i++) {
            var item = this._private__data.items[i];
            var current = this._private__precalculatedCache[i - this._private__data.visibleRange.from];
            var y = Math.round(item.y * pixelRatio);
            ctx.fillStyle = item.color;
            ctx.fillRect(current.left, y, current.right - current.left + 1, histogramBase - y + lineWidth);
        }
    };
    // tslint:disable-next-line: cyclomatic-complexity
    PaneRendererHistogram.prototype._private__fillPrecalculatedCache = function (pixelRatio) {
        if (this._private__data === null || this._private__data.items.length === 0 || this._private__data.visibleRange === null) {
            this._private__precalculatedCache = [];
            return;
        }
        var spacing = Math.ceil(this._private__data.barSpacing * pixelRatio) <= showSpacingMinimalBarWidth ? 0 : Math.max(1, Math.floor(pixelRatio));
        var columnWidth = Math.round(this._private__data.barSpacing * pixelRatio) - spacing;
        this._private__precalculatedCache = new Array(this._private__data.visibleRange.to - this._private__data.visibleRange.from);
        for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; i++) {
            var item = this._private__data.items[i];
            // force cast to avoid ensureDefined call
            var x = Math.round(item.x * pixelRatio);
            var left = void 0;
            var right = void 0;
            if (columnWidth % 2) {
                var halfWidth = (columnWidth - 1) / 2;
                left = x - halfWidth;
                right = x + halfWidth;
            }
            else {
                // shift pixel to left
                var halfWidth = columnWidth / 2;
                left = x - halfWidth;
                right = x + halfWidth - 1;
            }
            this._private__precalculatedCache[i - this._private__data.visibleRange.from] = {
                left: left,
                right: right,
                roundedCenter: x,
                center: (item.x * pixelRatio),
                time: item.time,
            };
        }
        // correct positions
        for (var i = this._private__data.visibleRange.from + 1; i < this._private__data.visibleRange.to; i++) {
            var current = this._private__precalculatedCache[i - this._private__data.visibleRange.from];
            var prev = this._private__precalculatedCache[i - this._private__data.visibleRange.from - 1];
            if (current.time !== prev.time + 1) {
                continue;
            }
            if (current.left - prev.right !== (spacing + 1)) {
                // have to align
                if (prev.roundedCenter > prev.center) {
                    // prev wasshifted to left, so add pixel to right
                    prev.right = current.left - spacing - 1;
                }
                else {
                    // extend current to left
                    current.left = prev.right + spacing + 1;
                }
            }
        }
        var minWidth = Math.ceil(this._private__data.barSpacing * pixelRatio);
        for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; i++) {
            var current = this._private__precalculatedCache[i - this._private__data.visibleRange.from];
            // this could happen if barspacing < 1
            if (current.right < current.left) {
                current.right = current.left;
            }
            var width = current.right - current.left + 1;
            minWidth = Math.min(width, minWidth);
        }
        if (spacing > 0 && minWidth < alignToMinimalWidthLimit) {
            for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; i++) {
                var current = this._private__precalculatedCache[i - this._private__data.visibleRange.from];
                var width = current.right - current.left + 1;
                if (width > minWidth) {
                    if (current.roundedCenter > current.center) {
                        current.right -= 1;
                    }
                    else {
                        current.left += 1;
                    }
                }
            }
        }
    };
    return PaneRendererHistogram;
}());

function createEmptyHistogramData(barSpacing) {
    return {
        items: [],
        barSpacing: barSpacing,
        histogramBase: NaN,
        visibleRange: null,
    };
}
function createRawItem(time, price, color) {
    return {
        time: time,
        price: price,
        x: NaN,
        y: NaN,
        color: color,
    };
}
var SeriesHistogramPaneView = /** @class */ (function (_super) {
    __extends(SeriesHistogramPaneView, _super);
    function SeriesHistogramPaneView(series, model) {
        var _this = _super.call(this, series, model, false) || this;
        _this._private__compositeRenderer = new CompositeRenderer();
        _this._private__histogramData = createEmptyHistogramData(0);
        _this._private__colorIndexes = new Int32Array(0);
        _this._private__renderer = new PaneRendererHistogram();
        return _this;
    }
    SeriesHistogramPaneView.prototype.renderer = function (height, width) {
        this._makeValid();
        return this._private__compositeRenderer;
    };
    SeriesHistogramPaneView.prototype._fillRawPoints = function () {
        var _this = this;
        var barSpacing = this._model.timeScale().barSpacing();
        var palette = this._series.palette();
        this._private__histogramData = createEmptyHistogramData(barSpacing);
        var barValueGetter = this._series.barFunction();
        this._private__colorIndexes = new Int32Array(this._series.bars().size());
        var targetColorIndex = 0;
        var targetIndex = 0;
        var itemIndex = 0;
        var defaultColor = this._series.options().color;
        this._series.bars().each(function (index, bar) {
            var value = barValueGetter(bar.value);
            var paletteColorIndex = bar.value[4 /* Color */];
            var color = paletteColorIndex != null ? palette.colorByIndex(paletteColorIndex) : defaultColor;
            var item = createRawItem(index, value, color);
            // colorIndex is the paneview's internal palette index
            // this internal palette stores defaultColor by 0 index and pallette colors by paletteColorIndex + 1
            var colorIndex = paletteColorIndex == null ? 0 : paletteColorIndex + 1;
            targetIndex++;
            if (targetIndex < _this._private__histogramData.items.length) {
                _this._private__histogramData.items[targetIndex] = item;
            }
            else {
                _this._private__histogramData.items.push(item);
            }
            _this._items[itemIndex++] = { time: index, x: 0 };
            _this._private__colorIndexes[targetColorIndex++] = colorIndex;
            return false;
        });
        this._private__renderer.setData(this._private__histogramData);
        this._private__compositeRenderer.setRenderers([this._private__renderer]);
    };
    SeriesHistogramPaneView.prototype._clearVisibleRange = function () {
        _super.prototype._clearVisibleRange.call(this);
        this._private__histogramData.visibleRange = null;
    };
    SeriesHistogramPaneView.prototype._convertToCoordinates = function (priceScale, timeScale, firstValue) {
        if (this._itemsVisibleRange === null) {
            return;
        }
        var barSpacing = timeScale.barSpacing();
        var visibleBars = ensureNotNull(timeScale.visibleBars());
        var histogramBase = priceScale.priceToCoordinate(this._series.options().base, firstValue);
        timeScale.indexesToCoordinates(this._private__histogramData.items);
        priceScale.pointsArrayToCoordinates(this._private__histogramData.items, firstValue);
        this._private__histogramData.histogramBase = histogramBase;
        this._private__histogramData.visibleRange = visibleTimedValues(this._private__histogramData.items, visibleBars, false);
        this._private__histogramData.barSpacing = barSpacing;
        // need this to update cache
        this._private__renderer.setData(this._private__histogramData);
    };
    return SeriesHistogramPaneView;
}(SeriesPaneViewBase));

var SeriesLinePaneView = /** @class */ (function (_super) {
    __extends(SeriesLinePaneView, _super);
    function SeriesLinePaneView(series, model) {
        var _this = _super.call(this, series, model) || this;
        _this._private__lineRenderer = new PaneRendererLine();
        return _this;
    }
    SeriesLinePaneView.prototype.renderer = function (height, width) {
        this._makeValid();
        var lineStyleProps = this._series.options();
        var data = {
            items: this._items,
            lineColor: lineStyleProps.color,
            lineStyle: lineStyleProps.lineStyle,
            lineType: lineStyleProps.lineType,
            lineWidth: lineStyleProps.lineWidth,
            visibleRange: this._itemsVisibleRange,
        };
        this._private__lineRenderer.setData(data);
        return this._private__lineRenderer;
    };
    SeriesLinePaneView.prototype._createRawItem = function (time, price) {
        return this._createRawItemBase(time, price);
    };
    return SeriesLinePaneView;
}(LinePaneViewBase));

var defaultReplacementRe = /[2-9]/g;
var TextWidthCache = /** @class */ (function () {
    function TextWidthCache(size) {
        if (size === void 0) { size = 50; }
        this._private__actualSize = 0;
        this._private__usageTick = 1;
        this._private__oldestTick = 1;
        this._private__tick2Labels = {};
        this._private__cache = {};
        this._private__maxSize = size;
    }
    TextWidthCache.prototype.reset = function () {
        this._private__actualSize = 0;
        this._private__cache = {};
        this._private__usageTick = 1;
        this._private__oldestTick = 1;
        this._private__tick2Labels = {};
    };
    TextWidthCache.prototype.measureText = function (ctx, text, optimizationReplacementRe) {
        var re = optimizationReplacementRe || defaultReplacementRe;
        var cacheString = String(text).replace(re, '0');
        if (this._private__cache[cacheString]) {
            return this._private__cache[cacheString].width;
        }
        if (this._private__actualSize === this._private__maxSize) {
            var oldestValue = this._private__tick2Labels[this._private__oldestTick];
            delete this._private__tick2Labels[this._private__oldestTick];
            delete this._private__cache[oldestValue];
            this._private__oldestTick++;
            this._private__actualSize--;
        }
        var width = ctx.measureText(cacheString).width;
        if (width === 0 && !!text.length) {
            // measureText can return 0 in FF depending on a canvas size, don't cache it
            return 0;
        }
        this._private__cache[cacheString] = { width: width, tick: this._private__usageTick };
        this._private__tick2Labels[this._private__usageTick] = cacheString;
        this._private__actualSize++;
        this._private__usageTick++;
        return width;
    };
    return TextWidthCache;
}());

var PanePriceAxisViewRenderer = /** @class */ (function () {
    function PanePriceAxisViewRenderer(textWidthCache) {
        this._private__priceAxisViewRenderer = null;
        this._private__rendererOptions = null;
        this._private__align = 'right';
        this._private__width = 0;
        this._private__textWidthCache = textWidthCache;
    }
    PanePriceAxisViewRenderer.prototype.setParams = function (priceAxisViewRenderer, rendererOptions, width, align) {
        this._private__priceAxisViewRenderer = priceAxisViewRenderer;
        this._private__rendererOptions = rendererOptions;
        this._private__width = width;
        this._private__align = align;
    };
    PanePriceAxisViewRenderer.prototype.draw = function (ctx, pixelRatio) {
        if (this._private__rendererOptions === null || this._private__priceAxisViewRenderer === null) {
            return;
        }
        this._private__priceAxisViewRenderer.draw(ctx, this._private__rendererOptions, this._private__textWidthCache, this._private__width, this._private__align, pixelRatio);
    };
    return PanePriceAxisViewRenderer;
}());
var PanePriceAxisView = /** @class */ (function () {
    function PanePriceAxisView(priceAxisView, dataSource, chartModel) {
        this._private__priceAxisView = priceAxisView;
        this._private__textWidthCache = new TextWidthCache(50); // when should we clear cache?
        this._private__dataSource = dataSource;
        this._private__chartModel = chartModel;
        this._private__fontSize = -1;
        this._private__renderer = new PanePriceAxisViewRenderer(this._private__textWidthCache);
    }
    PanePriceAxisView.prototype.update = function () {
        this._private__priceAxisView.update();
    };
    PanePriceAxisView.prototype.renderer = function (height, width) {
        var pane = this._private__chartModel.paneForSource(this._private__dataSource);
        if (pane === null) {
            return null;
        }
        var priceScale = this._private__dataSource.priceScale();
        if (priceScale === null) {
            return null;
        }
        var position = pane.priceScalePosition();
        if (position === 'overlay') {
            // both source and main source are overlays
            return null;
        }
        var options = this._private__chartModel.priceAxisRendererOptions();
        if (options.fontSize !== this._private__fontSize) {
            this._private__fontSize = options.fontSize;
            this._private__textWidthCache.reset();
        }
        this._private__renderer.setParams(this._private__priceAxisView.paneRenderer(), options, width, position);
        return this._private__renderer;
    };
    return PanePriceAxisView;
}());

var HorizontalLineRenderer = /** @class */ (function () {
    function HorizontalLineRenderer() {
        this._private__data = null;
    }
    HorizontalLineRenderer.prototype.setData = function (data) {
        this._private__data = data;
    };
    HorizontalLineRenderer.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        if (this._private__data === null) {
            return;
        }
        if (this._private__data.visible === false) {
            return;
        }
        var y = Math.round(this._private__data.y * pixelRatio);
        if (y < 0 || y > Math.ceil(this._private__data.height * pixelRatio)) {
            return;
        }
        var width = Math.ceil(this._private__data.width * pixelRatio);
        ctx.lineCap = 'butt';
        ctx.strokeStyle = this._private__data.color;
        ctx.lineWidth = Math.floor(this._private__data.lineWidth * pixelRatio);
        setLineStyle(ctx, this._private__data.lineStyle);
        drawHorizontalLine(ctx, y, 0, width);
    };
    return HorizontalLineRenderer;
}());

var SeriesHorizontalLinePaneView = /** @class */ (function () {
    function SeriesHorizontalLinePaneView(series) {
        this._lineRendererData = {
            width: 0,
            height: 0,
            y: 0,
            color: 'rgba(0, 0, 0, 0)',
            lineWidth: 1,
            lineStyle: 0 /* Solid */,
            visible: false,
        };
        this._lineRenderer = new HorizontalLineRenderer();
        this._private__invalidated = true;
        this._series = series;
        this._model = series.model();
        this._lineRenderer.setData(this._lineRendererData);
    }
    SeriesHorizontalLinePaneView.prototype.update = function () {
        this._private__invalidated = true;
    };
    SeriesHorizontalLinePaneView.prototype.renderer = function (height, width) {
        if (this._private__invalidated) {
            this._updateImpl(height, width);
            this._private__invalidated = false;
        }
        return this._lineRenderer;
    };
    return SeriesHorizontalLinePaneView;
}());

var SeriesHorizontalBaseLinePaneView = /** @class */ (function (_super) {
    __extends(SeriesHorizontalBaseLinePaneView, _super);
    function SeriesHorizontalBaseLinePaneView(series) {
        return _super.call(this, series) || this;
    }
    SeriesHorizontalBaseLinePaneView.prototype._updateImpl = function (height, width) {
        this._lineRendererData.visible = false;
        var priceScale = this._series.priceScale();
        var mode = priceScale.mode().mode;
        if (mode !== 2 /* Percentage */ && mode !== 3 /* IndexedTo100 */) {
            return;
        }
        var seriesOptions = this._series.options();
        if (!seriesOptions.baseLineVisible) {
            return;
        }
        var firstValue = this._series.firstValue();
        if (firstValue === null) {
            return;
        }
        this._lineRendererData.visible = true;
        this._lineRendererData.y = priceScale.priceToCoordinate(firstValue.value, firstValue.value);
        this._lineRendererData.width = width;
        this._lineRendererData.height = height;
        this._lineRendererData.color = seriesOptions.baseLineColor;
        this._lineRendererData.lineWidth = seriesOptions.baseLineWidth;
        this._lineRendererData.lineStyle = seriesOptions.baseLineStyle;
    };
    return SeriesHorizontalBaseLinePaneView;
}(SeriesHorizontalLinePaneView));

var Constants$2;
(function (Constants) {
    Constants[Constants["MinShapeSize"] = 12] = "MinShapeSize";
    Constants[Constants["MaxShapeSize"] = 30] = "MaxShapeSize";
    Constants[Constants["MinShapeMargin"] = 3] = "MinShapeMargin";
})(Constants$2 || (Constants$2 = {}));
function size(barSpacing, coeff) {
    var result = Math.min(Math.max(barSpacing, 12 /* MinShapeSize */), 30 /* MaxShapeSize */) * coeff;
    return ceiledOdd(result);
}
function shapeSize(shape, originalSize) {
    switch (shape) {
        case 'arrowDown':
        case 'arrowUp':
            return size(originalSize, 1);
        case 'circle':
            return size(originalSize, 0.8);
        case 'square':
            return size(originalSize, 0.7);
    }
}
function calculateShapeHeight(barSpacing) {
    return ceiledEven(size(barSpacing, 1));
}
function shapeMargin(barSpacing) {
    return Math.max(size(barSpacing, 0.1), 3 /* MinShapeMargin */);
}

function drawSquare(ctx, centerX, centerY, color, size) {
    var squareSize = shapeSize('square', size);
    var halfSize = (squareSize - 1) / 2;
    var left = centerX - halfSize;
    var top = centerY - halfSize;
    ctx.fillStyle = color;
    ctx.fillRect(left, top, squareSize, squareSize);
}
function hitTestSquare(centerX, centerY, size, x, y) {
    var squareSize = shapeSize('square', size);
    var halfSize = (squareSize - 1) / 2;
    var left = centerX - halfSize;
    var top = centerY - halfSize;
    return x >= left && x <= left + squareSize &&
        y >= top && y <= top + squareSize;
}

function drawArrow(up, ctx, centerX, centerY, color, size) {
    var arrowSize = shapeSize('arrowUp', size);
    var halfArrowSize = (arrowSize - 1) / 2;
    var baseSize = ceiledOdd(size / 2);
    var halfBaseSize = (baseSize - 1) / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    if (up) {
        ctx.moveTo(centerX - halfArrowSize, centerY);
        ctx.lineTo(centerX, centerY - halfArrowSize);
        ctx.lineTo(centerX + halfArrowSize, centerY);
        ctx.lineTo(centerX + halfBaseSize, centerY);
        ctx.lineTo(centerX + halfBaseSize, centerY + halfArrowSize);
        ctx.lineTo(centerX - halfBaseSize, centerY + halfArrowSize);
        ctx.lineTo(centerX - halfBaseSize, centerY);
    }
    else {
        ctx.moveTo(centerX - halfArrowSize, centerY);
        ctx.lineTo(centerX, centerY + halfArrowSize);
        ctx.lineTo(centerX + halfArrowSize, centerY);
        ctx.lineTo(centerX + halfBaseSize, centerY);
        ctx.lineTo(centerX + halfBaseSize, centerY - halfArrowSize);
        ctx.lineTo(centerX - halfBaseSize, centerY - halfArrowSize);
        ctx.lineTo(centerX - halfBaseSize, centerY);
    }
    ctx.fill();
}
function hitTestArrow(up, centerX, centerY, size, x, y) {
    // TODO: implement arrow hit test
    return hitTestSquare(centerX, centerY, size, x, y);
}

function drawCircle(ctx, centerX, centerY, color, size) {
    var circleSize = shapeSize('circle', size);
    var halfSize = (circleSize - 1) / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, halfSize, 0, 2 * Math.PI, false);
    ctx.fill();
}
function hitTestCircle(centerX, centerY, size, x, y) {
    var circleSize = shapeSize('circle', size);
    var tolerance = 2 + circleSize / 2;
    var xOffset = centerX - x;
    var yOffset = centerY - y;
    var dist = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
    return dist <= tolerance;
}

var SeriesMarkersRenderer = /** @class */ (function (_super) {
    __extends(SeriesMarkersRenderer, _super);
    function SeriesMarkersRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._private__data = null;
        return _this;
    }
    SeriesMarkersRenderer.prototype.setData = function (data) {
        this._private__data = data;
    };
    SeriesMarkersRenderer.prototype.hitTest = function (x, y) {
        if (this._private__data === null || this._private__data.visibleRange === null) {
            return null;
        }
        for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; i++) {
            var item = this._private__data.items[i];
            if (hitTestItem(item, x, y)) {
                return {
                    hitTestData: item.internalId,
                    externalId: item.externalId,
                };
            }
        }
        return null;
    };
    SeriesMarkersRenderer.prototype._drawImpl = function (ctx, isHovered, hitTestData) {
        if (this._private__data === null || this._private__data.visibleRange === null) {
            return;
        }
        for (var i = this._private__data.visibleRange.from; i < this._private__data.visibleRange.to; i++) {
            var item = this._private__data.items[i];
            drawItem(item, ctx);
        }
    };
    return SeriesMarkersRenderer;
}(ScaledRenderer));
function drawItem(item, ctx) {
    switch (item.shape) {
        case 'arrowDown':
            drawArrow(false, ctx, item.x, item.y, item.color, item.size);
            return;
        case 'arrowUp':
            drawArrow(true, ctx, item.x, item.y, item.color, item.size);
            return;
        case 'circle':
            drawCircle(ctx, item.x, item.y, item.color, item.size);
            return;
        case 'square':
            drawSquare(ctx, item.x, item.y, item.color, item.size);
            return;
    }
    ensureNever(item.shape);
}
function hitTestItem(item, x, y) {
    switch (item.shape) {
        case 'arrowDown':
            return hitTestArrow(true, item.x, item.y, item.size, x, y);
        case 'arrowUp':
            return hitTestArrow(false, item.x, item.y, item.size, x, y);
        case 'circle':
            return hitTestCircle(item.x, item.y, item.size, x, y);
        case 'square':
            return hitTestSquare(item.x, item.y, item.size, x, y);
    }
    ensureNever(item.shape);
}

function fillSizeAndY(
// tslint:disable-next-line:max-params
rendererItem, marker, seriesData, offsets, shapeMargin, priceScale, timeScale, firstValue) {
    var inBarPrice = isNumber(seriesData) ? seriesData : seriesData.close;
    var highPrice = isNumber(seriesData) ? seriesData : seriesData.high;
    var lowPrice = isNumber(seriesData) ? seriesData : seriesData.low;
    var shapeSize = calculateShapeHeight(timeScale.barSpacing());
    rendererItem.size = shapeSize;
    switch (marker.position) {
        case 'inBar': {
            rendererItem.y = priceScale.priceToCoordinate(inBarPrice, firstValue);
            return;
        }
        case 'aboveBar': {
            rendererItem.y = (priceScale.priceToCoordinate(highPrice, firstValue) - shapeSize / 2 - offsets.aboveBar);
            offsets.aboveBar += shapeSize + shapeMargin;
            return;
        }
        case 'belowBar': {
            rendererItem.y = (priceScale.priceToCoordinate(lowPrice, firstValue) + shapeSize / 2 + offsets.belowBar);
            offsets.belowBar += shapeSize + shapeMargin;
            return;
        }
    }
    ensureNever(marker.position);
}
var SeriesMarkersPaneView = /** @class */ (function () {
    function SeriesMarkersPaneView(series, model) {
        this._private__invalidated = true;
        this._private__dataInvalidated = true;
        this._private__autoScaleMarginsInvalidated = true;
        this._private__autoScaleMargins = null;
        this._private__renderer = new SeriesMarkersRenderer();
        this._private__series = series;
        this._private__model = model;
        this._private__data = {
            items: [],
            visibleRange: null,
        };
    }
    SeriesMarkersPaneView.prototype.update = function (updateType) {
        this._private__invalidated = true;
        this._private__autoScaleMarginsInvalidated = true;
        if (updateType === 'data') {
            this._private__dataInvalidated = true;
        }
    };
    SeriesMarkersPaneView.prototype.renderer = function (height, width, addAnchors) {
        if (this._private__invalidated) {
            this._makeValid();
        }
        this._private__renderer.setData(this._private__data);
        return this._private__renderer;
    };
    SeriesMarkersPaneView.prototype.autoScaleMargins = function () {
        if (this._private__autoScaleMarginsInvalidated) {
            if (this._private__series.indexedMarkers().length > 0) {
                var barSpacing = this._private__model.timeScale().barSpacing();
                var shapeMargin$1 = shapeMargin(barSpacing);
                var marginsAboveAndBelow = calculateShapeHeight(barSpacing) * 1.5 + shapeMargin$1 * 2;
                this._private__autoScaleMargins = {
                    above: marginsAboveAndBelow,
                    below: marginsAboveAndBelow,
                };
            }
            else {
                this._private__autoScaleMargins = null;
            }
            this._private__autoScaleMarginsInvalidated = false;
        }
        return this._private__autoScaleMargins;
    };
    SeriesMarkersPaneView.prototype._makeValid = function () {
        var priceScale = this._private__series.priceScale();
        var timeScale = this._private__model.timeScale();
        var seriesMarkers = this._private__series.indexedMarkers();
        if (this._private__dataInvalidated) {
            this._private__data.items = seriesMarkers.map(function (marker) { return ({
                time: marker.time,
                x: 0,
                y: 0,
                size: 0,
                shape: marker.shape,
                color: marker.color,
                internalId: marker.internalId,
                externalId: marker.id,
            }); });
            this._private__dataInvalidated = false;
        }
        this._private__data.visibleRange = null;
        var visibleBars = timeScale.visibleBars();
        if (visibleBars === null) {
            return;
        }
        var firstValue = this._private__series.firstValue();
        if (firstValue === null) {
            return;
        }
        if (this._private__data.items.length === 0) {
            return;
        }
        var prevTimeIndex = NaN;
        var shapeMargin$1 = shapeMargin(timeScale.barSpacing());
        var offsets = {
            aboveBar: shapeMargin$1,
            belowBar: shapeMargin$1,
        };
        this._private__data.visibleRange = visibleTimedValues(this._private__data.items, visibleBars, true);
        for (var index = this._private__data.visibleRange.from; index < this._private__data.visibleRange.to; index++) {
            var marker = seriesMarkers[index];
            if (marker.time !== prevTimeIndex) {
                // new bar, reset stack counter
                offsets.aboveBar = shapeMargin$1;
                offsets.belowBar = shapeMargin$1;
                prevTimeIndex = marker.time;
            }
            var rendererItem = this._private__data.items[index];
            rendererItem.x = timeScale.indexToCoordinate(marker.time);
            var dataAt = this._private__series.dataAt(marker.time);
            if (dataAt === null) {
                continue;
            }
            fillSizeAndY(rendererItem, marker, dataAt, offsets, shapeMargin$1, priceScale, timeScale, firstValue.value);
        }
        this._private__invalidated = false;
    };
    return SeriesMarkersPaneView;
}());

var SeriesPriceLinePaneView = /** @class */ (function (_super) {
    __extends(SeriesPriceLinePaneView, _super);
    function SeriesPriceLinePaneView(series) {
        return _super.call(this, series) || this;
    }
    SeriesPriceLinePaneView.prototype._updateImpl = function (height, width) {
        var data = this._lineRendererData;
        data.visible = false;
        var seriesOptions = this._series.options();
        if (!seriesOptions.priceLineVisible) {
            return;
        }
        var lastValueData = this._series.lastValueData(undefined, seriesOptions.priceLineSource === 0 /* LastBar */);
        if (lastValueData.noData) {
            return;
        }
        data.visible = true;
        data.y = lastValueData.coordinate;
        data.color = this._series.priceLineColor(lastValueData.color);
        data.width = width;
        data.height = height;
        data.lineWidth = seriesOptions.priceLineWidth;
        data.lineStyle = seriesOptions.priceLineStyle;
    };
    return SeriesPriceLinePaneView;
}(SeriesHorizontalLinePaneView));

var SeriesPriceAxisView = /** @class */ (function (_super) {
    __extends(SeriesPriceAxisView, _super);
    function SeriesPriceAxisView(source, data) {
        var _this = _super.call(this) || this;
        _this._private__source = source;
        _this._private__data = data;
        return _this;
    }
    SeriesPriceAxisView.prototype._getSource = function () {
        return this._private__source;
    };
    SeriesPriceAxisView.prototype._getData = function () {
        return this._private__data;
    };
    // tslint:disable-next-line:cyclomatic-complexity
    SeriesPriceAxisView.prototype._updateRendererData = function (axisRendererData, paneRendererData, commonRendererData) {
        axisRendererData.visible = false;
        paneRendererData.visible = false;
        var seriesOptions = this._private__source.options();
        var showSeriesLastValue = seriesOptions.lastValueVisible;
        var showSymbolLabel = this._private__source.title() !== '';
        var showPriceAndPercentage = seriesOptions.seriesLastValueMode === 0 /* LastPriceAndPercentageValue */;
        var lastValueData = this._private__source.lastValueData(undefined, false);
        if (lastValueData.noData) {
            return;
        }
        if (showSeriesLastValue) {
            axisRendererData.text = this._axisText(lastValueData, showSeriesLastValue, showPriceAndPercentage);
            axisRendererData.visible = axisRendererData.text.length !== 0;
        }
        if (showSymbolLabel || showPriceAndPercentage) {
            paneRendererData.text = this._paneText(lastValueData, showSeriesLastValue, showSymbolLabel, showPriceAndPercentage);
            paneRendererData.visible = paneRendererData.text.length > 0;
        }
        commonRendererData.background = this._private__source.priceLineColor(lastValueData.color);
        commonRendererData.color = generateTextColor(commonRendererData.background);
        commonRendererData.coordinate = lastValueData.coordinate;
        paneRendererData.borderColor = this._private__source.model().options().layout.backgroundColor;
        axisRendererData.borderColor = commonRendererData.background;
    };
    SeriesPriceAxisView.prototype._paneText = function (lastValue, showSeriesLastValue, showSymbolLabel, showPriceAndPercentage) {
        var result = '';
        var title = this._private__source.title();
        if (showSymbolLabel && title.length !== 0) {
            result += title + " ";
        }
        if (showSeriesLastValue && showPriceAndPercentage) {
            result += this._private__source.priceScale().isPercentage() ?
                lastValue.formattedPriceAbsolute : lastValue.formattedPricePercentage;
        }
        return result.trim();
    };
    SeriesPriceAxisView.prototype._axisText = function (lastValueData, showSeriesLastValue, showPriceAndPercentage) {
        if (!showSeriesLastValue) {
            return '';
        }
        if (!showPriceAndPercentage) {
            return lastValueData.text;
        }
        return this._private__source.priceScale().isPercentage() ?
            lastValueData.formattedPricePercentage : lastValueData.formattedPriceAbsolute;
    };
    return SeriesPriceAxisView;
}(PriceAxisView));

var CustomPriceLinePaneView = /** @class */ (function (_super) {
    __extends(CustomPriceLinePaneView, _super);
    function CustomPriceLinePaneView(series, priceLine) {
        var _this = _super.call(this, series) || this;
        _this._private__priceLine = priceLine;
        return _this;
    }
    CustomPriceLinePaneView.prototype._updateImpl = function (height, width) {
        var data = this._lineRendererData;
        data.visible = false;
        var y = this._private__priceLine.yCoord();
        if (y === null) {
            return;
        }
        var lineOptions = this._private__priceLine.options();
        data.visible = true;
        data.y = y;
        data.color = lineOptions.color;
        data.width = width;
        data.height = height;
        data.lineWidth = lineOptions.lineWidth;
        data.lineStyle = lineOptions.lineStyle;
    };
    return CustomPriceLinePaneView;
}(SeriesHorizontalLinePaneView));

var CustomPriceLinePriceAxisView = /** @class */ (function (_super) {
    __extends(CustomPriceLinePriceAxisView, _super);
    function CustomPriceLinePriceAxisView(series, priceLine) {
        var _this = _super.call(this) || this;
        _this._private__series = series;
        _this._private__priceLine = priceLine;
        return _this;
    }
    CustomPriceLinePriceAxisView.prototype._updateRendererData = function (axisRendererData, paneRendererData, commonData) {
        axisRendererData.visible = false;
        paneRendererData.visible = false;
        var options = this._private__priceLine.options();
        var labelVisible = options.axisLabelVisible;
        if (!labelVisible) {
            return;
        }
        var y = this._private__priceLine.yCoord();
        if (y === null) {
            return;
        }
        axisRendererData.text = this._private__series.priceScale().formatPriceAbsolute(options.price);
        axisRendererData.visible = true;
        commonData.background = options.color;
        commonData.color = generateTextColor(options.color);
        commonData.coordinate = y;
    };
    return CustomPriceLinePriceAxisView;
}(PriceAxisView));

var CustomPriceLine = /** @class */ (function () {
    function CustomPriceLine(series, options) {
        this._private__series = series;
        this._private__options = options;
        this._private__priceLineView = new CustomPriceLinePaneView(series, this);
        this._private__priceAxisView = new CustomPriceLinePriceAxisView(series, this);
    }
    CustomPriceLine.prototype.applyOptions = function (options) {
        merge(this._private__options, options);
        this.update();
        this._private__series.model().lightUpdate();
    };
    CustomPriceLine.prototype.options = function () {
        return this._private__options;
    };
    CustomPriceLine.prototype.paneView = function () {
        return this._private__priceLineView;
    };
    CustomPriceLine.prototype.priceAxisView = function () {
        return this._private__priceAxisView;
    };
    CustomPriceLine.prototype.update = function () {
        this._private__priceLineView.update();
        this._private__priceAxisView.update();
    };
    CustomPriceLine.prototype.yCoord = function () {
        var series = this._private__series;
        var priceScale = series.priceScale();
        var timeScale = series.model().timeScale();
        if (timeScale.isEmpty() || priceScale.isEmpty()) {
            return null;
        }
        var firstValue = series.firstValue();
        if (firstValue === null) {
            return null;
        }
        return priceScale.priceToCoordinate(this._private__options.price, firstValue.value);
    };
    return CustomPriceLine;
}());

var Palette = /** @class */ (function () {
    function Palette() {
        this._private__maxUsedIndex = 0;
        this._private__colorToIndex = new Map();
        this._private__indexToColor = new Map();
    }
    Palette.prototype.colorByIndex = function (index) {
        return ensureDefined(this._private__indexToColor.get(index));
    };
    Palette.prototype.addColor = function (color) {
        var res = this._private__colorToIndex.get(color);
        if (res === undefined) {
            res = this._private__maxUsedIndex++;
            this._private__colorToIndex.set(color, res);
            this._private__indexToColor.set(res, color);
        }
        return res;
    };
    Palette.prototype.clear = function () {
        this._private__maxUsedIndex = 0;
        this._private__colorToIndex.clear();
        this._private__indexToColor.clear();
    };
    Palette.prototype.size = function () {
        return this._private__indexToColor.size;
    };
    return Palette;
}());

var emptyResult = {
    barColor: '',
    barBorderColor: '',
    barWickColor: '',
};
var SeriesBarColorer = /** @class */ (function () {
    function SeriesBarColorer(series) {
        this._private__series = series;
    }
    SeriesBarColorer.prototype.barStyle = function (barIndex, precomputedBars) {
        // precomputedBars: {value: [Array BarValues], previousValue: [Array BarValues] | undefined}
        // Used to avoid binary search if bars are already known
        var targetType = this._private__series.seriesType();
        var seriesOptions = this._private__series.options();
        switch (targetType) {
            case 'Line':
                return this._private__lineStyle(seriesOptions);
            case 'Area':
                return this._private__areaStyle(seriesOptions);
            case 'Bar':
                return this._private__barStyle(seriesOptions, barIndex, precomputedBars);
            case 'Candlestick':
                return this._private__candleStyle(seriesOptions, barIndex, precomputedBars);
            case 'Histogram':
                return this._private__histogramStyle(seriesOptions, barIndex, precomputedBars);
        }
        throw new Error('Unknown chart style');
    };
    SeriesBarColorer.prototype._private__barStyle = function (barStyle, barIndex, precomputedBars) {
        var result = __assign({}, emptyResult);
        var upColor = barStyle.upColor;
        var downColor = barStyle.downColor;
        var borderUpColor = upColor;
        var borderDownColor = downColor;
        var currentBar = ensureNotNull(this._private__findBar(barIndex, precomputedBars));
        var isUp = ensure(currentBar.value[0 /* Open */]) <= ensure(currentBar.value[3 /* Close */]);
        result.barColor = isUp ? upColor : downColor;
        result.barBorderColor = isUp ? borderUpColor : borderDownColor;
        return result;
    };
    SeriesBarColorer.prototype._private__candleStyle = function (candlestickStyle, barIndex, precomputedBars) {
        var result = __assign({}, emptyResult);
        var upColor = candlestickStyle.upColor;
        var downColor = candlestickStyle.downColor;
        var borderUpColor = candlestickStyle.borderUpColor;
        var borderDownColor = candlestickStyle.borderDownColor;
        var wickUpColor = candlestickStyle.wickUpColor;
        var wickDownColor = candlestickStyle.wickDownColor;
        var currentBar = ensureNotNull(this._private__findBar(barIndex, precomputedBars));
        var isUp = ensure(currentBar.value[0 /* Open */]) <= ensure(currentBar.value[3 /* Close */]);
        result.barColor = isUp ? upColor : downColor;
        result.barBorderColor = isUp ? borderUpColor : borderDownColor;
        result.barWickColor = isUp ? wickUpColor : wickDownColor;
        return result;
    };
    SeriesBarColorer.prototype._private__areaStyle = function (areaStyle) {
        return __assign(__assign({}, emptyResult), { barColor: areaStyle.lineColor });
    };
    SeriesBarColorer.prototype._private__lineStyle = function (lineStyle) {
        return __assign(__assign({}, emptyResult), { barColor: lineStyle.color });
    };
    SeriesBarColorer.prototype._private__histogramStyle = function (histogramStyle, barIndex, precomputedBars) {
        var result = __assign({}, emptyResult);
        var currentBar = ensureNotNull(this._private__findBar(barIndex, precomputedBars));
        var colorValue = currentBar.value[4 /* Color */];
        if (colorValue != null) {
            var palette = ensureNotNull(this._private__series.palette());
            result.barColor = palette.colorByIndex(colorValue);
        }
        else {
            result.barColor = histogramStyle.color;
        }
        return result;
    };
    SeriesBarColorer.prototype._private__getSeriesBars = function () {
        return this._private__series.bars();
    };
    SeriesBarColorer.prototype._private__findBar = function (barIndex, precomputedBars) {
        if (precomputedBars !== undefined) {
            return precomputedBars.value;
        }
        return this._private__getSeriesBars().valueAt(barIndex);
    };
    return SeriesBarColorer;
}());

var PlotRowSearchMode;
(function (PlotRowSearchMode) {
    PlotRowSearchMode[PlotRowSearchMode["NearestLeft"] = -1] = "NearestLeft";
    PlotRowSearchMode[PlotRowSearchMode["Exact"] = 0] = "Exact";
    PlotRowSearchMode[PlotRowSearchMode["NearestRight"] = 1] = "NearestRight";
})(PlotRowSearchMode || (PlotRowSearchMode = {}));
// TODO: think about changing it dynamically
var CHUNK_SIZE = 30;
/**
 * PlotList is an array of plot rows
 * each plot row consists of key (index in timescale) and plot value map
 */
var PlotList = /** @class */ (function () {
    function PlotList(plotFunctions, emptyValuePredicate) {
        if (plotFunctions === void 0) { plotFunctions = null; }
        if (emptyValuePredicate === void 0) { emptyValuePredicate = null; }
        // TODO: should be renamed to _rows, but the current name is frozen because of myriads of references to it
        this._private__items = [];
        // some PlotList instances are just readonly views of sub-range of data stored in another PlotList
        // _start and _end fields are used to implement such views
        this._private__start = 0;
        // end is an after-last index
        this._private__end = 0;
        this._private__shareRead = false;
        this._private__minMaxCache = new Map();
        this._private__rowSearchCache = new Map();
        this._private__rowSearchCacheWithoutEmptyValues = new Map();
        this._private__plotFunctions = plotFunctions || new Map();
        this._private__emptyValuePredicate = emptyValuePredicate;
    }
    PlotList.prototype.clear = function () {
        this._private__items = [];
        this._private__start = 0;
        this._private__end = 0;
        this._private__shareRead = false;
        this._private__minMaxCache.clear();
        this._private__rowSearchCache.clear();
        this._private__rowSearchCacheWithoutEmptyValues.clear();
    };
    // @returns First row
    PlotList.prototype.first = function () {
        return this.size() > 0 ? this._private__items[this._private__start] : null;
    };
    // @returns Last row
    PlotList.prototype.last = function () {
        return this.size() > 0 ? this._private__items[(this._private__end - 1)] : null;
    };
    PlotList.prototype.firstIndex = function () {
        return this.size() > 0 ? this._private__indexAt(this._private__start) : null;
    };
    PlotList.prototype.lastIndex = function () {
        return this.size() > 0 ? this._private__indexAt((this._private__end - 1)) : null;
    };
    PlotList.prototype.size = function () {
        return this._private__end - this._private__start;
    };
    PlotList.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    PlotList.prototype.contains = function (index) {
        return this._private__search(index, 0 /* Exact */) !== null;
    };
    PlotList.prototype.valueAt = function (index) {
        return this.search(index);
    };
    /**
     * @returns true if new index is added or false if existing index is updated
     */
    PlotList.prototype.add = function (index, time, value) {
        if (this._private__shareRead) {
            return false;
        }
        var row = { index: index, value: value, time: time };
        var pos = this._private__search(index, 0 /* Exact */);
        this._private__rowSearchCache.clear();
        this._private__rowSearchCacheWithoutEmptyValues.clear();
        if (pos === null) {
            this._private__items.splice(this._private__lowerbound(index), 0, row);
            this._private__start = 0;
            this._private__end = this._private__items.length;
            return true;
        }
        else {
            this._private__items[pos] = row;
            return false;
        }
    };
    PlotList.prototype.search = function (index, searchMode, skipEmptyValues) {
        if (searchMode === void 0) { searchMode = 0 /* Exact */; }
        var pos = this._private__search(index, searchMode, skipEmptyValues);
        if (pos === null) {
            return null;
        }
        var item = this._private__valueAt(pos);
        return {
            index: this._private__indexAt(pos),
            time: item.time,
            value: item.value,
        };
    };
    /**
     * Execute fun on each element.
     * Stops iteration if callback function returns true.
     * @param fun Callback function on each element function(index, value): boolean
     */
    PlotList.prototype.each = function (fun) {
        for (var i = this._private__start; i < this._private__end; ++i) {
            var index = this._private__indexAt(i);
            var item = this._private__valueAt(i);
            if (fun(index, item)) {
                break;
            }
        }
    };
    /**
     * @returns Readonly collection of elements in range
     */
    PlotList.prototype.range = function (start, end) {
        var copy = new PlotList(this._private__plotFunctions, this._private__emptyValuePredicate);
        copy._private__items = this._private__items;
        copy._private__start = this._private__lowerbound(start);
        copy._private__end = this._private__upperbound(end);
        copy._private__shareRead = true;
        return copy;
    };
    PlotList.prototype.minMaxOnRangeCached = function (start, end, plots) {
        // this code works for single series only
        // could fail after whitespaces implementation
        if (this.isEmpty()) {
            return null;
        }
        var result = null;
        for (var _i = 0, plots_1 = plots; _i < plots_1.length; _i++) {
            var plot = plots_1[_i];
            var plotMinMax = this._private__minMaxOnRangeCachedImpl(start, end, plot);
            result = mergeMinMax(result, plotMinMax);
        }
        return result;
    };
    PlotList.prototype.merge = function (plotRows) {
        if (this._private__shareRead) {
            return null;
        }
        if (plotRows.length === 0) {
            return null;
        }
        // if we get a bunch of history - just prepend it
        if (this.isEmpty() || plotRows[plotRows.length - 1].index < this._private__items[0].index) {
            return this._private__prepend(plotRows);
        }
        // if we get new rows - just append it
        if (plotRows[0].index > this._private__items[this._private__items.length - 1].index) {
            return this._private__append(plotRows);
        }
        // if we get update for the last row - just replace it
        if (plotRows.length === 1 && plotRows[0].index === this._private__items[this._private__items.length - 1].index) {
            this._private__updateLast(plotRows[0]);
            return plotRows[0];
        }
        return this._private__merge(plotRows);
    };
    PlotList.prototype.remove = function (start) {
        if (this._private__shareRead) {
            return null;
        }
        var startOffset = this._private__search(start, 1 /* NearestRight */);
        if (startOffset === null) {
            return null;
        }
        var removedPlotRows = this._private__items.splice(startOffset);
        // _start should never be modified in this method
        this._private__end = this._private__items.length;
        this._private__minMaxCache.clear();
        this._private__rowSearchCache.clear();
        this._private__rowSearchCacheWithoutEmptyValues.clear();
        return removedPlotRows.length > 0 ? removedPlotRows[0] : null;
    };
    PlotList.prototype._private__indexAt = function (offset) {
        return this._private__items[offset].index;
    };
    PlotList.prototype._private__valueAt = function (offset) {
        return this._private__items[offset];
    };
    PlotList.prototype._private__search = function (index, searchMode, skipEmptyValues) {
        var exactPos = this._private__bsearch(index);
        if (exactPos === null && searchMode !== 0 /* Exact */) {
            switch (searchMode) {
                case -1 /* NearestLeft */:
                    return this._private__searchNearestLeft(index, skipEmptyValues);
                case 1 /* NearestRight */:
                    return this._private__searchNearestRight(index, skipEmptyValues);
                default:
                    throw new TypeError('Unknown search mode');
            }
        }
        // there is a found value or search mode is Exact
        if (!skipEmptyValues || exactPos === null || searchMode === 0 /* Exact */) {
            return exactPos;
        }
        // skipEmptyValues is true, additionally check for emptiness
        switch (searchMode) {
            case -1 /* NearestLeft */:
                return this._private__nonEmptyNearestLeft(exactPos);
            case 1 /* NearestRight */:
                return this._private__nonEmptyNearestRight(exactPos);
            default:
                throw new TypeError('Unknown search mode');
        }
    };
    PlotList.prototype._private__nonEmptyNearestRight = function (index) {
        var predicate = ensureNotNull(this._private__emptyValuePredicate);
        while (index < this._private__end && predicate(this._private__valueAt(index).value)) {
            index = index + 1;
        }
        return index === this._private__end ? null : index;
    };
    PlotList.prototype._private__nonEmptyNearestLeft = function (index) {
        var predicate = ensureNotNull(this._private__emptyValuePredicate);
        while (index >= this._private__start && predicate(this._private__valueAt(index).value)) {
            index = index - 1;
        }
        return index < this._private__start ? null : index;
    };
    PlotList.prototype._private__searchNearestLeft = function (index, skipEmptyValues) {
        var nearestLeftPos = this._private__lowerbound(index);
        if (nearestLeftPos > this._private__start) {
            nearestLeftPos = nearestLeftPos - 1;
        }
        var result = (nearestLeftPos !== this._private__end && this._private__indexAt(nearestLeftPos) < index) ? nearestLeftPos : null;
        if (skipEmptyValues && result !== null) {
            return this._private__nonEmptyNearestLeft(result);
        }
        return result;
    };
    PlotList.prototype._private__searchNearestRight = function (index, skipEmptyValues) {
        var nearestRightPos = this._private__upperbound(index);
        var result = (nearestRightPos !== this._private__end && index < this._private__indexAt(nearestRightPos)) ? nearestRightPos : null;
        if (skipEmptyValues && result !== null) {
            return this._private__nonEmptyNearestRight(result);
        }
        return result;
    };
    PlotList.prototype._private__bsearch = function (index) {
        var start = this._private__lowerbound(index);
        if (start !== this._private__end && !(index < this._private__items[start].index)) {
            return start;
        }
        return null;
    };
    PlotList.prototype._private__lowerbound = function (index) {
        return lowerbound(this._private__items, index, function (a, b) { return a.index < b; }, this._private__start, this._private__end);
    };
    PlotList.prototype._private__upperbound = function (index) {
        return upperbound(this._private__items, index, function (a, b) { return b.index > a; }, this._private__start, this._private__end);
    };
    /**
     * @param endIndex Non-inclusive end
     */
    PlotList.prototype._private__plotMinMax = function (startIndex, endIndex, plot) {
        var result = null;
        var func = this._private__plotFunctions.get(plot.name);
        if (func === undefined) {
            throw new Error("Plot \"" + plot.name + "\" is not registered");
        }
        for (var i = startIndex; i < endIndex; i++) {
            var values = this._private__items[i].value;
            var v = func(values);
            if (v === undefined || v === null || Number.isNaN(v)) {
                continue;
            }
            if (result === null) {
                result = { min: v, max: v };
            }
            else {
                if (v < result.min) {
                    result.min = v;
                }
                if (v > result.max) {
                    result.max = v;
                }
            }
        }
        return result;
    };
    PlotList.prototype._private__invalidateCacheForRow = function (row) {
        var chunkIndex = Math.floor(row.index / CHUNK_SIZE);
        this._private__minMaxCache.forEach(function (cacheItem) { return cacheItem.delete(chunkIndex); });
    };
    PlotList.prototype._private__prepend = function (plotRows) {
        assert(!this._private__shareRead, 'collection should not be readonly');
        assert(plotRows.length !== 0, 'plotRows should not be empty');
        this._private__rowSearchCache.clear();
        this._private__rowSearchCacheWithoutEmptyValues.clear();
        this._private__minMaxCache.clear();
        this._private__items = plotRows.concat(this._private__items);
        this._private__start = 0;
        this._private__end = this._private__items.length;
        return plotRows[0];
    };
    PlotList.prototype._private__append = function (plotRows) {
        assert(!this._private__shareRead, 'collection should not be readonly');
        assert(plotRows.length !== 0, 'plotRows should not be empty');
        this._private__rowSearchCache.clear();
        this._private__rowSearchCacheWithoutEmptyValues.clear();
        this._private__minMaxCache.clear();
        this._private__items = this._private__items.concat(plotRows);
        this._private__start = 0;
        this._private__end = this._private__items.length;
        return plotRows[0];
    };
    PlotList.prototype._private__updateLast = function (plotRow) {
        assert(!this.isEmpty(), 'plot list should not be empty');
        var currentLastRow = this._private__items[this._private__end - 1];
        assert(currentLastRow.index === plotRow.index, 'last row index should match new row index');
        this._private__invalidateCacheForRow(plotRow);
        this._private__rowSearchCache.delete(plotRow.index);
        this._private__rowSearchCacheWithoutEmptyValues.delete(plotRow.index);
        this._private__items[this._private__end - 1] = plotRow;
    };
    PlotList.prototype._private__merge = function (plotRows) {
        assert(plotRows.length !== 0, 'plot rows should not be empty');
        this._private__rowSearchCache.clear();
        this._private__rowSearchCacheWithoutEmptyValues.clear();
        this._private__minMaxCache.clear();
        this._private__items = mergePlotRows(this._private__items, plotRows);
        this._private__start = 0;
        this._private__end = this._private__items.length;
        return plotRows[0];
    };
    PlotList.prototype._private__minMaxOnRangeCachedImpl = function (start, end, plotInfo) {
        // this code works for single series only
        // could fail after whitespaces implementation
        if (this.isEmpty()) {
            return null;
        }
        var result = null;
        // assume that bar indexes only increase
        var firstIndex = ensureNotNull(this.firstIndex());
        var lastIndex = ensureNotNull(this.lastIndex());
        var s = start - plotInfo.offset;
        var e = end - plotInfo.offset;
        s = Math.max(s, firstIndex);
        e = Math.min(e, lastIndex);
        var cachedLow = Math.ceil(s / CHUNK_SIZE) * CHUNK_SIZE;
        var cachedHigh = Math.max(cachedLow, Math.floor(e / CHUNK_SIZE) * CHUNK_SIZE);
        {
            var startIndex = this._private__lowerbound(s);
            var endIndex = this._private__upperbound(Math.min(e, cachedLow, end)); // non-inclusive end
            var plotMinMax = this._private__plotMinMax(startIndex, endIndex, plotInfo);
            result = mergeMinMax(result, plotMinMax);
        }
        var minMaxCache = this._private__minMaxCache.get(plotInfo.name);
        if (minMaxCache === undefined) {
            minMaxCache = new Map();
            this._private__minMaxCache.set(plotInfo.name, minMaxCache);
        }
        // now go cached
        for (var c = Math.max(cachedLow + 1, s); c < cachedHigh; c += CHUNK_SIZE) {
            var chunkIndex = Math.floor(c / CHUNK_SIZE);
            var chunkMinMax = minMaxCache.get(chunkIndex);
            if (chunkMinMax === undefined) {
                var chunkStart = this._private__lowerbound(chunkIndex * CHUNK_SIZE);
                var chunkEnd = this._private__upperbound((chunkIndex + 1) * CHUNK_SIZE - 1);
                chunkMinMax = this._private__plotMinMax(chunkStart, chunkEnd, plotInfo);
                minMaxCache.set(chunkIndex, chunkMinMax);
            }
            result = mergeMinMax(result, chunkMinMax);
        }
        // tail
        {
            var startIndex = this._private__lowerbound(cachedHigh);
            var endIndex = this._private__upperbound(e); // non-inclusive end
            var plotMinMax = this._private__plotMinMax(startIndex, endIndex, plotInfo);
            result = mergeMinMax(result, plotMinMax);
        }
        return result;
    };
    return PlotList;
}());
function mergeMinMax(first, second) {
    if (first === null) {
        return second;
    }
    else {
        if (second === null) {
            return first;
        }
        else {
            // merge MinMax values
            var min = Math.min(first.min, second.min);
            var max = Math.max(first.max, second.max);
            return { min: min, max: max };
        }
    }
}
/**
 * Merges two ordered plot row arrays and returns result (ordered plot row array).
 *
 * BEWARE: If row indexes from plot rows are equal, the new plot row is used.
 *
 * NOTE: Time and memory complexity are O(N+M).
 */
function mergePlotRows(originalPlotRows, newPlotRows) {
    var newArraySize = calcMergedArraySize(originalPlotRows, newPlotRows);
    // tslint:disable-next-line:prefer-array-literal
    var result = new Array(newArraySize);
    var originalRowsIndex = 0;
    var newRowsIndex = 0;
    var originalRowsSize = originalPlotRows.length;
    var newRowsSize = newPlotRows.length;
    var resultRowsIndex = 0;
    while (originalRowsIndex < originalRowsSize && newRowsIndex < newRowsSize) {
        if (originalPlotRows[originalRowsIndex].index < newPlotRows[newRowsIndex].index) {
            result[resultRowsIndex] = originalPlotRows[originalRowsIndex];
            originalRowsIndex++;
        }
        else if (originalPlotRows[originalRowsIndex].index > newPlotRows[newRowsIndex].index) {
            result[resultRowsIndex] = newPlotRows[newRowsIndex];
            newRowsIndex++;
        }
        else {
            result[resultRowsIndex] = newPlotRows[newRowsIndex];
            originalRowsIndex++;
            newRowsIndex++;
        }
        resultRowsIndex++;
    }
    while (originalRowsIndex < originalRowsSize) {
        result[resultRowsIndex] = originalPlotRows[originalRowsIndex];
        originalRowsIndex++;
        resultRowsIndex++;
    }
    while (newRowsIndex < newRowsSize) {
        result[resultRowsIndex] = newPlotRows[newRowsIndex];
        newRowsIndex++;
        resultRowsIndex++;
    }
    return result;
}
function calcMergedArraySize(firstPlotRows, secondPlotRows) {
    var firstPlotsSize = firstPlotRows.length;
    var secondPlotsSize = secondPlotRows.length;
    // new plot rows size is (first plot rows size) + (second plot rows size) - common part size
    // in this case we can just calculate common part size
    var result = firstPlotsSize + secondPlotsSize;
    // TODO: we can move first/second indexes to the right and first/second size to lower/upper bound of opposite array
    // to skip checking uncommon parts
    var firstIndex = 0;
    var secondIndex = 0;
    while (firstIndex < firstPlotsSize && secondIndex < secondPlotsSize) {
        if (firstPlotRows[firstIndex].index < secondPlotRows[secondIndex].index) {
            firstIndex++;
        }
        else if (firstPlotRows[firstIndex].index > secondPlotRows[secondIndex].index) {
            secondIndex++;
        }
        else {
            firstIndex++;
            secondIndex++;
            result--;
        }
    }
    return result;
}

/**
 * Plot's index in plot list tuple for series (or overlay study)
 * @see {Bar}
 */
var SeriesPlotIndex;
(function (SeriesPlotIndex) {
    SeriesPlotIndex[SeriesPlotIndex["Open"] = 0] = "Open";
    SeriesPlotIndex[SeriesPlotIndex["High"] = 1] = "High";
    SeriesPlotIndex[SeriesPlotIndex["Low"] = 2] = "Low";
    SeriesPlotIndex[SeriesPlotIndex["Close"] = 3] = "Close";
    SeriesPlotIndex[SeriesPlotIndex["Color"] = 4] = "Color";
})(SeriesPlotIndex || (SeriesPlotIndex = {}));
var barFunctions = {
    open: function (bar) { return bar[0 /* Open */]; },
    high: function (bar) { return bar[1 /* High */]; },
    low: function (bar) { return bar[2 /* Low */]; },
    close: function (bar) { return bar[3 /* Close */]; },
    hl2: function (bar) {
        return (bar[1 /* High */] +
            bar[2 /* Low */]) / 2;
    },
    hlc3: function (bar) {
        return (bar[1 /* High */] +
            bar[2 /* Low */] +
            bar[3 /* Close */]) / 3;
    },
    ohlc4: function (bar) {
        return (bar[0 /* Open */] +
            bar[1 /* High */] +
            bar[2 /* Low */] +
            bar[3 /* Close */]) / 4;
    },
};
var seriesSource = ['open', 'high', 'low', 'close', 'hl2', 'hlc3', 'ohlc4'];
function seriesPlotFunctionMap() {
    var result = new Map();
    seriesSource.forEach(function (plot, index) {
        result.set(plot, barFunction(plot));
    });
    return result;
}
function barFunction(priceSource) {
    return barFunctions[priceSource];
}
var SeriesData = /** @class */ (function () {
    function SeriesData() {
        this._private__bars = new PlotList(seriesPlotFunctionMap());
    }
    SeriesData.prototype.bars = function () {
        return this._private__bars;
    };
    SeriesData.prototype.size = function () {
        return this._private__bars.size();
    };
    SeriesData.prototype.each = function (fun) {
        this._private__bars.each(fun);
    };
    SeriesData.prototype.clear = function () {
        this._private__bars.clear();
    };
    SeriesData.prototype.isEmpty = function () {
        return this._private__bars.isEmpty();
    };
    SeriesData.prototype.first = function () {
        return this._private__bars.first();
    };
    SeriesData.prototype.last = function () {
        return this._private__bars.last();
    };
    SeriesData.prototype.search = function (index, options) {
        return this.bars().search(index, options);
    };
    SeriesData.prototype.valueAt = function (index) {
        return this.search(index);
    };
    return SeriesData;
}());

var Series = /** @class */ (function (_super) {
    __extends(Series, _super);
    function Series(model, options, seriesType) {
        var _this = _super.call(this, model) || this;
        _this._private__data = new SeriesData();
        _this._private__priceLineView = new SeriesPriceLinePaneView(_this);
        _this._private__customPriceLines = [];
        _this._private__baseHorizontalLineView = new SeriesHorizontalBaseLinePaneView(_this);
        _this._private__endOfData = false;
        _this._private__barColorerCache = null;
        _this._private__palette = new Palette();
        _this._private__markers = [];
        _this._private__indexedMarkers = [];
        _this._private__options = options;
        _this._private__seriesType = seriesType;
        var priceAxisView = new SeriesPriceAxisView(_this, { model: model });
        _this._private__priceAxisViews = [priceAxisView];
        _this._private__panePriceAxisView = new PanePriceAxisView(priceAxisView, _this, model);
        _this._private__recreateFormatter();
        _this._private__updateBarFunction();
        _this._private__barFunction = _this.barFunction(); // redundant
        _this._private__recreatePaneViews();
        return _this;
    }
    Series.prototype.destroy = function () {
    };
    Series.prototype.endOfData = function () {
        return this._private__endOfData;
    };
    Series.prototype.priceLineColor = function (lastBarColor) {
        return this._private__options.priceLineColor || lastBarColor;
    };
    // returns object with:
    // formatted price
    // raw price (if withRawPrice)
    // coordinate
    // color
    // or { "noData":true } if last value could not be found
    // NOTE: should NEVER return null or undefined!
    Series.prototype.lastValueData = function (plot, globalLast, withRawPrice) {
        var noDataRes = { noData: true };
        var priceScale = this.priceScale();
        if (this.model().timeScale().isEmpty() || priceScale.isEmpty() || this.data().isEmpty()) {
            return noDataRes;
        }
        var visibleBars = this.model().timeScale().visibleBars();
        var firstValue = this.firstValue();
        if (visibleBars === null || firstValue === null) {
            return noDataRes;
        }
        // find range of bars inside range
        // TODO: make it more optimal
        var bar;
        var lastIndex;
        if (globalLast) {
            var lastBar = this.data().bars().last();
            if (lastBar === null) {
                return noDataRes;
            }
            bar = lastBar;
            lastIndex = lastBar.index;
        }
        else {
            var endBar = this.data().bars().search(visibleBars.lastBar(), -1 /* NearestLeft */);
            if (endBar === null) {
                return noDataRes;
            }
            bar = this.data().bars().valueAt(endBar.index);
            if (bar === null) {
                return noDataRes;
            }
            lastIndex = endBar.index;
        }
        var price = plot !== undefined ? bar.value[plot] : this._private__barFunction(bar.value);
        var barColorer = this.barColorer();
        var style = barColorer.barStyle(lastIndex, { value: bar });
        var coordinate = priceScale.priceToCoordinate(price, firstValue.value);
        return {
            noData: false,
            price: withRawPrice ? price : undefined,
            text: priceScale.formatPrice(price, firstValue.value),
            formattedPriceAbsolute: priceScale.formatPriceAbsolute(price),
            formattedPricePercentage: priceScale.formatPricePercentage(price, firstValue.value),
            color: style.barColor,
            coordinate: coordinate,
            index: lastIndex,
        };
    };
    Series.prototype.data = function () {
        return this._private__data;
    };
    Series.prototype.barColorer = function () {
        if (this._private__barColorerCache !== null) {
            return this._private__barColorerCache;
        }
        this._private__barColorerCache = new SeriesBarColorer(this);
        return this._private__barColorerCache;
    };
    Series.prototype.options = function () {
        return this._private__options;
    };
    Series.prototype.applyOptions = function (options) {
        var overlay = this._private__options.overlay;
        merge(this._private__options, options);
        this._private__options.overlay = overlay;
        if (overlay && this._priceScale !== null && options.scaleMargins !== undefined) {
            this._priceScale.applyOptions({
                scaleMargins: this._private__options.scaleMargins,
            });
        }
        if (options.priceFormat !== undefined) {
            this._private__recreateFormatter();
        }
        this.model().updateSource(this);
    };
    Series.prototype.clearData = function () {
        this._private__data.clear();
        this._private__palette.clear();
        // we must either re-create pane view on clear data
        // or clear all caches inside pane views
        // but currently we can't separate update/append last bar and full data replacement (update vs setData) in pane views invalidation
        // so let's just re-create all views
        this._private__recreatePaneViews();
    };
    Series.prototype.updateData = function (data, clearData) {
        if (clearData === void 0) { clearData = false; }
        if (clearData) {
            this._private__data.clear();
        }
        this._private__data.bars().merge(data);
        this._private__recalculateMarkers();
        this._private__paneView.update('data');
        this._private__markersPaneView.update('data');
        var sourcePane = this.model().paneForSource(this);
        this.model().recalculatePane(sourcePane);
        this.model().updateSource(this);
        this.model().updateCrosshair();
        this.model().lightUpdate();
    };
    Series.prototype.setMarkers = function (data) {
        this._private__markers = data.map(function (item) { return (__assign({}, item)); });
        this._private__recalculateMarkers();
        var sourcePane = this.model().paneForSource(this);
        this._private__markersPaneView.update('data');
        this.model().recalculatePane(sourcePane);
        this.model().updateSource(this);
        this.model().updateCrosshair();
        this.model().lightUpdate();
    };
    Series.prototype.markers = function () {
        return this._private__markers;
    };
    Series.prototype.indexedMarkers = function () {
        return this._private__indexedMarkers;
    };
    Series.prototype.createPriceLine = function (options) {
        var result = new CustomPriceLine(this, options);
        this._private__customPriceLines.push(result);
        this.model().updateSource(this);
        return result;
    };
    Series.prototype.removePriceLine = function (line) {
        var index = this._private__customPriceLines.indexOf(line);
        if (index !== -1) {
            this._private__customPriceLines.splice(index, 1);
        }
        this.model().updateSource(this);
    };
    Series.prototype.palette = function () {
        return this._private__palette;
    };
    Series.prototype.seriesType = function () {
        return this._private__seriesType;
    };
    Series.prototype.firstValue = function () {
        var bar = this.firstBar();
        if (bar === null) {
            return null;
        }
        return {
            value: this._private__barFunction(bar.value),
            timePoint: bar.time,
        };
    };
    Series.prototype.firstBar = function () {
        var visibleBars = this.model().timeScale().visibleBars();
        if (visibleBars === null) {
            return null;
        }
        var startTimePoint = visibleBars.firstBar();
        return this.data().search(startTimePoint, 1 /* NearestRight */);
    };
    Series.prototype.bars = function () {
        return this._private__data.bars();
    };
    Series.prototype.nearestIndex = function (index, options) {
        var res = this.nearestData(index, options);
        return res ? res.index : null;
    };
    Series.prototype.nearestData = function (index, options) {
        if (!isInteger(index)) {
            return null;
        }
        return this.data().search(index, options);
    };
    Series.prototype.dataAt = function (time) {
        var prices = this.data().valueAt(time);
        if (prices === null) {
            return null;
        }
        if (this._private__seriesType === 'Bar' || this._private__seriesType === 'Candlestick') {
            return {
                open: prices.value[0 /* Open */],
                high: prices.value[1 /* High */],
                low: prices.value[2 /* Low */],
                close: prices.value[3 /* Close */],
            };
        }
        else {
            return this.barFunction()(prices.value);
        }
    };
    Series.prototype.paneViews = function () {
        var res = [];
        if (this.priceScale() === this.model().mainPriceScale()) {
            res.push(this._private__baseHorizontalLineView);
        }
        for (var _i = 0, _a = this._private__customPriceLines; _i < _a.length; _i++) {
            var customPriceLine = _a[_i];
            res.push(customPriceLine.paneView());
        }
        res.push(this._private__paneView);
        res.push(this._private__priceLineView);
        res.push(this._private__panePriceAxisView);
        res.push(this._private__markersPaneView);
        return res;
    };
    Series.prototype.priceAxisViews = function (pane, priceScale) {
        var result = __spreadArrays(this._private__priceAxisViews);
        for (var _i = 0, _a = this._private__customPriceLines; _i < _a.length; _i++) {
            var customPriceLine = _a[_i];
            result.push(customPriceLine.priceAxisView());
        }
        return result;
    };
    Series.prototype.autoscaleInfo = function (startTimePoint, endTimePoint) {
        if (!isInteger(startTimePoint) || !isInteger(endTimePoint) || this.data().isEmpty()) {
            return null;
        }
        // TODO: refactor this
        // series data is strongly hardcoded to keep bars
        var priceSource = (this._private__seriesType === 'Line' || this._private__seriesType === 'Area' || this._private__seriesType === 'Histogram') ? 'close' : null;
        var barsMinMax;
        if (priceSource !== null) {
            barsMinMax = this.data().bars().minMaxOnRangeCached(startTimePoint, endTimePoint, [{ name: priceSource, offset: 0 }]);
        }
        else {
            barsMinMax = this.data().bars().minMaxOnRangeCached(startTimePoint, endTimePoint, [{ name: 'low', offset: 0 }, { name: 'high', offset: 0 }]);
        }
        var range = barsMinMax !== null ? new PriceRange(barsMinMax.min, barsMinMax.max) : null;
        if (this.seriesType() === 'Histogram') {
            var base = this._private__options.base;
            var rangeWithBase = new PriceRange(base, base);
            range = range !== null ? range.merge(rangeWithBase) : rangeWithBase;
        }
        return {
            priceRange: range,
            margins: this._private__markersPaneView.autoScaleMargins(),
        };
    };
    Series.prototype.minMove = function () {
        return this._private__options.priceFormat.minMove;
    };
    Series.prototype.formatter = function () {
        return this._private__formatter;
    };
    Series.prototype.barFunction = function () {
        return this._private__barFunction;
    };
    Series.prototype.updateAllViews = function () {
        this._private__paneView.update();
        this._private__markersPaneView.update();
        for (var _i = 0, _a = this._private__priceAxisViews; _i < _a.length; _i++) {
            var priceAxisView = _a[_i];
            priceAxisView.update();
        }
        for (var _b = 0, _c = this._private__customPriceLines; _b < _c.length; _b++) {
            var customPriceLine = _c[_b];
            customPriceLine.update();
        }
        this._private__priceLineView.update();
        this._private__baseHorizontalLineView.update();
    };
    Series.prototype.setPriceScale = function (priceScale) {
        if (this._priceScale === priceScale) {
            return;
        }
        this._priceScale = priceScale;
    };
    Series.prototype.priceScale = function () {
        return ensureNotNull(this._priceScale);
    };
    Series.prototype.markerDataAtIndex = function (index) {
        var getValue = (this._private__seriesType === 'Line' || this._private__seriesType === 'Area') &&
            this._private__options.crosshairMarkerVisible;
        if (!getValue) {
            return null;
        }
        var bar = this._private__data.valueAt(index);
        if (bar === null) {
            return null;
        }
        var price = this._private__barFunction(bar.value);
        var radius = this._private__markerRadius();
        return { price: price, radius: radius };
    };
    Series.prototype.title = function () {
        return this._private__options.title;
    };
    Series.prototype._private__markerRadius = function () {
        switch (this._private__seriesType) {
            case 'Line':
            case 'Area':
                return this._private__options.crosshairMarkerRadius;
        }
        return 0;
    };
    Series.prototype._private__recreateFormatter = function () {
        switch (this._private__options.priceFormat.type) {
            case 'custom': {
                this._private__formatter = { format: this._private__options.priceFormat.formatter };
                break;
            }
            case 'volume': {
                this._private__formatter = new VolumeFormatter(this._private__options.priceFormat.precision);
                break;
            }
            case 'percent': {
                this._private__formatter = new PercentageFormatter(this._private__options.priceFormat.precision);
                break;
            }
            default: {
                var priceScale = Math.pow(10, this._private__options.priceFormat.precision);
                this._private__formatter = new PriceFormatter(priceScale, this._private__options.priceFormat.minMove * priceScale, false, undefined);
            }
        }
        if (this._priceScale !== null) {
            this._priceScale.updateFormatter();
        }
    };
    Series.prototype._private__updateBarFunction = function () {
        var priceSource = 'close';
        this._private__barFunction = barFunction(priceSource);
    };
    Series.prototype._private__recalculateMarkers = function () {
        var timeScalePoints = this.model().timeScale().points();
        this._private__indexedMarkers = this._private__markers.map(function (marker, index) { return ({
            time: ensureNotNull(timeScalePoints.indexOf(marker.time.timestamp, true)),
            position: marker.position,
            shape: marker.shape,
            color: marker.color,
            id: marker.id,
            internalId: index,
        }); });
    };
    Series.prototype._private__recreatePaneViews = function () {
        this._private__markersPaneView = new SeriesMarkersPaneView(this, this.model());
        switch (this._private__seriesType) {
            case 'Bar': {
                this._private__paneView = new SeriesBarsPaneView(this, this.model());
                break;
            }
            case 'Candlestick': {
                this._private__paneView = new SeriesCandlesticksPaneView(this, this.model());
                break;
            }
            case 'Line': {
                this._private__paneView = new SeriesLinePaneView(this, this.model());
                break;
            }
            case 'Area': {
                this._private__paneView = new SeriesAreaPaneView(this, this.model());
                break;
            }
            case 'Histogram': {
                this._private__paneView = new SeriesHistogramPaneView(this, this.model());
                break;
            }
            default: throw Error('Unknown chart style assigned: ' + this._private__seriesType);
        }
    };
    return Series;
}(PriceDataSource));

function sortSources(sources) {
    return sources.slice().sort(function (s1, s2) {
        return (ensureNotNull(s1.zorder()) - ensureNotNull(s2.zorder()));
    });
}

/**
 * Enum of possible price scale modes
 * Normal mode displays original price values
 * Logarithmic mode makes price scale show logarithms of series values instead of original values
 * Percentage turns the percentage mode on.
 * IndexedTo100 turns the "indexed to 100" mode on
 */
var PriceScaleMode;
(function (PriceScaleMode) {
    PriceScaleMode[PriceScaleMode["Normal"] = 0] = "Normal";
    PriceScaleMode[PriceScaleMode["Logarithmic"] = 1] = "Logarithmic";
    PriceScaleMode[PriceScaleMode["Percentage"] = 2] = "Percentage";
    PriceScaleMode[PriceScaleMode["IndexedTo100"] = 3] = "IndexedTo100";
})(PriceScaleMode || (PriceScaleMode = {}));
var percentageFormatter = new PercentageFormatter();
var defaultPriceFormatter = new PriceFormatter(100, 1);
var PriceScale = /** @class */ (function () {
    function PriceScale(options, layoutOptions, localizationOptions) {
        this._private__height = 0;
        this._private__internalHeightCache = null;
        this._private__internalHeightChanged = new Delegate();
        this._private__priceRange = null;
        this._private__priceRangeSnapshot = null;
        this._private__priceRangeChanged = new Delegate();
        this._private__invalidatedForRange = { isValid: false, visibleBars: null };
        this._private__marginAbove = 0;
        this._private__marginBelow = 0;
        this._private__onMarksChanged = new Delegate();
        this._private__modeChanged = new Delegate();
        this._private__dataSources = [];
        this._private__cachedOrderedSources = null;
        this._private__hasSeries = false;
        this._private__mainSource = null;
        this._private__marksCache = null;
        this._private__scaleStartPoint = null;
        this._private__scrollStartPoint = null;
        this._private__formatter = defaultPriceFormatter;
        this._private__optionsChanged = new Delegate();
        this._private__options = options;
        this._private__layoutOptions = layoutOptions;
        this._private__localizationOptions = localizationOptions;
        this._private__markBuilder = new PriceTickMarkBuilder(this, 100, this._private__coordinateToLogical.bind(this), this._private__logicalToCoordinate.bind(this));
    }
    PriceScale.prototype.options = function () {
        return this._private__options;
    };
    PriceScale.prototype.applyOptions = function (options) {
        merge(this._private__options, options);
        this.updateFormatter();
        if (options.mode !== undefined) {
            this.setMode({ mode: options.mode });
        }
        this._private__optionsChanged.fire();
        if (options.scaleMargins !== undefined) {
            var top_1 = ensureDefined(options.scaleMargins.top);
            var bottom = ensureDefined(options.scaleMargins.bottom);
            if (top_1 < 0 || top_1 > 1) {
                throw new Error("Invalid top margin - expect value between 0 and 1, given=" + top_1);
            }
            if (bottom < 0 || bottom > 1 || top_1 + bottom > 1) {
                throw new Error("Invalid bottom margin - expect value between 0 and 1, given=" + bottom);
            }
            if (top_1 + bottom > 1) {
                throw new Error("Invalid margins - sum of margins must be less than 1, given=" + (top_1 + bottom));
            }
            this._private__invalidateInternalHeightCache();
            this._private__marksCache = null;
        }
    };
    PriceScale.prototype.optionsChanged = function () {
        return this._private__optionsChanged;
    };
    PriceScale.prototype.isAutoScale = function () {
        return this._private__options.autoScale;
    };
    PriceScale.prototype.isLog = function () {
        return this._private__options.mode === 1 /* Logarithmic */;
    };
    PriceScale.prototype.isPercentage = function () {
        return this._private__options.mode === 2 /* Percentage */;
    };
    PriceScale.prototype.isIndexedTo100 = function () {
        return this._private__options.mode === 3 /* IndexedTo100 */;
    };
    PriceScale.prototype.mode = function () {
        return {
            autoScale: this._private__options.autoScale,
            isInverted: this._private__options.invertScale,
            mode: this._private__options.mode,
        };
    };
    // tslint:disable-next-line:cyclomatic-complexity
    PriceScale.prototype.setMode = function (newMode) {
        var oldMode = this.mode();
        var priceRange = null;
        if (newMode.autoScale !== undefined) {
            this._private__options.autoScale = newMode.autoScale;
        }
        if (newMode.mode !== undefined) {
            this._private__options.mode = newMode.mode;
            if (newMode.mode === 2 /* Percentage */ || newMode.mode === 3 /* IndexedTo100 */) {
                this._private__options.autoScale = true;
            }
            // TODO: Remove after making rebuildTickMarks lazy
            this._private__invalidatedForRange.isValid = false;
        }
        // define which scale converted from
        if (oldMode.mode === 1 /* Logarithmic */ && newMode.mode !== oldMode.mode) {
            if (canConvertPriceRangeFromLog(this._private__priceRange)) {
                priceRange = convertPriceRangeFromLog(this._private__priceRange);
                if (priceRange !== null) {
                    this.setPriceRange(priceRange);
                }
            }
            else {
                this._private__options.autoScale = true;
            }
        }
        // define which scale converted to
        if (newMode.mode === 1 /* Logarithmic */ && newMode.mode !== oldMode.mode) {
            priceRange = convertPriceRangeToLog(this._private__priceRange);
            if (priceRange !== null) {
                this.setPriceRange(priceRange);
            }
        }
        var modeChanged = oldMode.mode !== this._private__options.mode;
        if (modeChanged && (oldMode.mode === 2 /* Percentage */ || this.isPercentage())) {
            this.updateFormatter();
        }
        if (modeChanged && (oldMode.mode === 3 /* IndexedTo100 */ || this.isIndexedTo100())) {
            this.updateFormatter();
        }
        if (newMode.isInverted !== undefined && oldMode.isInverted !== newMode.isInverted) {
            this._private__options.invertScale = newMode.isInverted;
            this._private__onIsInvertedChanged();
        }
        this._private__modeChanged.fire(oldMode, this.mode());
    };
    PriceScale.prototype.modeChanged = function () {
        return this._private__modeChanged;
    };
    PriceScale.prototype.fontSize = function () {
        return this._private__layoutOptions.fontSize;
    };
    PriceScale.prototype.height = function () {
        return this._private__height;
    };
    PriceScale.prototype.setHeight = function (value) {
        if (this._private__height === value) {
            return;
        }
        this._private__height = value;
        this._private__invalidateInternalHeightCache();
        this._private__marksCache = null;
    };
    PriceScale.prototype.internalHeight = function () {
        if (this._private__internalHeightCache) {
            return this._private__internalHeightCache;
        }
        var res = this.height() - this._private__topMarginPx() - this._private__bottomMarginPx();
        this._private__internalHeightCache = res;
        return res;
    };
    PriceScale.prototype.internalHeightChanged = function () {
        return this._private__internalHeightChanged;
    };
    PriceScale.prototype.priceRange = function () {
        this._private__makeSureItIsValid();
        return this._private__priceRange;
    };
    PriceScale.prototype.priceRangeChanged = function () {
        return this._private__priceRangeChanged;
    };
    PriceScale.prototype.setPriceRange = function (newPriceRange, isForceSetValue, onlyPriceScaleUpdate) {
        var oldPriceRange = this._private__priceRange;
        if (!isForceSetValue &&
            !(oldPriceRange === null && newPriceRange !== null) &&
            (oldPriceRange === null || oldPriceRange.equals(newPriceRange))) {
            return;
        }
        this._private__marksCache = null;
        this._private__priceRange = newPriceRange;
        if (!onlyPriceScaleUpdate) {
            this._private__priceRangeChanged.fire(oldPriceRange, newPriceRange);
        }
    };
    PriceScale.prototype.isEmpty = function () {
        this._private__makeSureItIsValid();
        return this._private__height === 0 || !this._private__priceRange || this._private__priceRange.isEmpty();
    };
    PriceScale.prototype.invertedCoordinate = function (coordinate) {
        return this.isInverted() ? coordinate : this.height() - 1 - coordinate;
    };
    PriceScale.prototype.priceToCoordinate = function (price, baseValue) {
        if (this.isPercentage()) {
            price = toPercent(price, baseValue);
        }
        else if (this.isIndexedTo100()) {
            price = toIndexedTo100(price, baseValue);
        }
        return this._private__logicalToCoordinate(price, baseValue);
    };
    PriceScale.prototype.pointsArrayToCoordinates = function (points, baseValue, visibleRange) {
        this._private__makeSureItIsValid();
        var bh = this._private__bottomMarginPx();
        var range = ensureNotNull(this.priceRange());
        var min = range.minValue();
        var max = range.maxValue();
        var ih = (this.internalHeight() - 1);
        var isInverted = this.isInverted();
        var hmm = ih / (max - min);
        var fromIndex = (visibleRange === undefined) ? 0 : visibleRange.from;
        var toIndex = (visibleRange === undefined) ? points.length : visibleRange.to;
        var transformFn = this._private__getCoordinateTransformer();
        for (var i = fromIndex; i < toIndex; i++) {
            var point = points[i];
            var price = point.price;
            if (isNaN(price)) {
                continue;
            }
            var logical = price;
            if (transformFn !== null) {
                logical = transformFn(point.price, baseValue);
            }
            var invCoordinate = bh + hmm * (logical - min);
            var coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
            point.y = coordinate;
        }
    };
    PriceScale.prototype.barPricesToCoordinates = function (pricesList, baseValue, visibleRange) {
        this._private__makeSureItIsValid();
        var bh = this._private__bottomMarginPx();
        var range = ensureNotNull(this.priceRange());
        var min = range.minValue();
        var max = range.maxValue();
        var ih = (this.internalHeight() - 1);
        var isInverted = this.isInverted();
        var hmm = ih / (max - min);
        var fromIndex = (visibleRange === undefined) ? 0 : visibleRange.from;
        var toIndex = (visibleRange === undefined) ? pricesList.length : visibleRange.to;
        var transformFn = this._private__getCoordinateTransformer();
        for (var i = fromIndex; i < toIndex; i++) {
            var bar = pricesList[i];
            var openLogical = bar.open;
            var highLogical = bar.high;
            var lowLogical = bar.low;
            var closeLogical = bar.close;
            if (transformFn !== null) {
                openLogical = transformFn(bar.open, baseValue);
                highLogical = transformFn(bar.high, baseValue);
                lowLogical = transformFn(bar.low, baseValue);
                closeLogical = transformFn(bar.close, baseValue);
            }
            var invCoordinate = bh + hmm * (openLogical - min);
            var coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
            bar.openY = coordinate;
            invCoordinate = bh + hmm * (highLogical - min);
            coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
            bar.highY = coordinate;
            invCoordinate = bh + hmm * (lowLogical - min);
            coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
            bar.lowY = coordinate;
            invCoordinate = bh + hmm * (closeLogical - min);
            coordinate = isInverted ? invCoordinate : this._private__height - 1 - invCoordinate;
            bar.closeY = coordinate;
        }
    };
    PriceScale.prototype.coordinateToPrice = function (coordinate, baseValue) {
        var logical = this._private__coordinateToLogical(coordinate, baseValue);
        return this.logicalToPrice(logical, baseValue);
    };
    PriceScale.prototype.logicalToPrice = function (logical, baseValue) {
        var value = logical;
        if (this.isPercentage()) {
            value = fromPercent(value, baseValue);
        }
        else if (this.isIndexedTo100()) {
            value = fromIndexedTo100(value, baseValue);
        }
        return value;
    };
    PriceScale.prototype.dataSources = function () {
        return this._private__dataSources;
    };
    PriceScale.prototype.orderedSources = function () {
        if (this._private__cachedOrderedSources) {
            return this._private__cachedOrderedSources;
        }
        var sources = [];
        for (var i = 0; i < this._private__dataSources.length; i++) {
            var ds = this._private__dataSources[i];
            if (ds.zorder() === null) {
                ds.setZorder(i + 1);
            }
            sources.push(ds);
        }
        sources = sortSources(sources);
        this._private__cachedOrderedSources = sources;
        return this._private__cachedOrderedSources;
    };
    PriceScale.prototype.hasSeries = function () {
        return this._private__hasSeries;
    };
    PriceScale.prototype.addDataSource = function (source) {
        if (this._private__dataSources.indexOf(source) !== -1) {
            return;
        }
        if ((source instanceof Series)) {
            this._private__hasSeries = true;
        }
        this._private__dataSources.push(source);
        this._private__mainSource = null;
        this.updateFormatter();
        this.invalidateSourcesCache();
    };
    PriceScale.prototype.removeDataSource = function (source) {
        var index = this._private__dataSources.indexOf(source);
        if (index === -1) {
            throw new Error('source is not attached to scale');
        }
        this._private__dataSources.splice(index, 1);
        if (source instanceof Series) {
            this._private__hasSeries = false;
        }
        if (!this.mainSource()) {
            this.setMode({
                autoScale: true,
            });
        }
        this._private__mainSource = null;
        this.updateFormatter();
        this.invalidateSourcesCache();
    };
    PriceScale.prototype.mainSource = function () {
        if (this._private__mainSource !== null) {
            return this._private__mainSource;
        }
        var priceSource = null;
        for (var i = 0; i < this._private__dataSources.length; i++) {
            var source = this._private__dataSources[i];
            if (source instanceof Series) {
                priceSource = source;
                break;
            }
            if ((priceSource === null) && (source instanceof PriceDataSource)) {
                priceSource = source;
            }
        }
        this._private__mainSource = priceSource;
        return this._private__mainSource;
    };
    PriceScale.prototype.firstValue = function () {
        // TODO: cache the result
        var result = null;
        for (var _i = 0, _a = this._private__dataSources; _i < _a.length; _i++) {
            var source = _a[_i];
            if (source instanceof PriceDataSource) {
                var firstValue = source.firstValue();
                if (firstValue === null) {
                    continue;
                }
                if (result === null || firstValue.timePoint < result.timePoint) {
                    result = firstValue;
                }
            }
        }
        return result === null ? null : result.value;
    };
    PriceScale.prototype.isInverted = function () {
        return this._private__options.invertScale;
    };
    PriceScale.prototype.marks = function () {
        if (this._private__marksCache) {
            return this._private__marksCache;
        }
        this._private__markBuilder.rebuildTickMarks();
        this._private__marksCache = this._private__markBuilder.marks();
        this._private__onMarksChanged.fire();
        return this._private__marksCache;
    };
    PriceScale.prototype.onMarksChanged = function () {
        return this._private__onMarksChanged;
    };
    PriceScale.prototype.startScale = function (x) {
        if (this.isPercentage() || this.isIndexedTo100()) {
            return;
        }
        if (this._private__scaleStartPoint !== null || this._private__priceRangeSnapshot !== null) {
            return;
        }
        if (this.isEmpty()) {
            return;
        }
        // invert x
        this._private__scaleStartPoint = this._private__height - x;
        this._private__priceRangeSnapshot = ensureNotNull(this.priceRange()).clone();
    };
    PriceScale.prototype.scaleTo = function (x) {
        if (this.isPercentage() || this.isIndexedTo100()) {
            return;
        }
        if (this._private__scaleStartPoint === null) {
            return;
        }
        this.setMode({
            autoScale: false,
        });
        // invert x
        x = this._private__height - x;
        if (x < 0) {
            x = 0;
        }
        var scaleCoeff = (this._private__scaleStartPoint + (this._private__height - 1) * 0.2) / (x + (this._private__height - 1) * 0.2);
        var newPriceRange = ensureNotNull(this._private__priceRangeSnapshot).clone();
        scaleCoeff = Math.max(scaleCoeff, 0.1);
        newPriceRange.scaleAroundCenter(scaleCoeff);
        this.setPriceRange(newPriceRange);
    };
    PriceScale.prototype.endScale = function () {
        if (this.isPercentage() || this.isIndexedTo100()) {
            return;
        }
        this._private__scaleStartPoint = null;
        this._private__priceRangeSnapshot = null;
    };
    PriceScale.prototype.startScroll = function (x) {
        if (this.isAutoScale()) {
            return;
        }
        if (this._private__scrollStartPoint !== null || this._private__priceRangeSnapshot !== null) {
            return;
        }
        if (this.isEmpty()) {
            return;
        }
        this._private__scrollStartPoint = x;
        this._private__priceRangeSnapshot = ensureNotNull(this.priceRange()).clone();
    };
    PriceScale.prototype.scrollTo = function (x) {
        if (this.isAutoScale()) {
            return;
        }
        if (this._private__scrollStartPoint === null) {
            return;
        }
        var priceUnitsPerPixel = ensureNotNull(this.priceRange()).length() / (this.internalHeight() - 1);
        var pixelDelta = x - this._private__scrollStartPoint;
        if (this.isInverted()) {
            pixelDelta *= -1;
        }
        var priceDelta = pixelDelta * priceUnitsPerPixel;
        var newPriceRange = ensureNotNull(this._private__priceRangeSnapshot).clone();
        newPriceRange.shift(priceDelta);
        this.setPriceRange(newPriceRange, true);
        this._private__marksCache = null;
    };
    PriceScale.prototype.endScroll = function () {
        if (this.isAutoScale()) {
            return;
        }
        if (this._private__scrollStartPoint === null) {
            return;
        }
        this._private__scrollStartPoint = null;
        this._private__priceRangeSnapshot = null;
    };
    PriceScale.prototype.formatter = function () {
        if (!this._private__formatter) {
            this.updateFormatter();
        }
        return this._private__formatter;
    };
    PriceScale.prototype.formatPrice = function (price, firstValue) {
        switch (this._private__options.mode) {
            case 2 /* Percentage */:
                return this.formatter().format(toPercent(price, firstValue));
            case 3 /* IndexedTo100 */:
                return this.formatter().format(toIndexedTo100(price, firstValue));
            default:
                return this._private__formatPrice(price);
        }
    };
    PriceScale.prototype.formatLogical = function (logical) {
        switch (this._private__options.mode) {
            case 2 /* Percentage */:
            case 3 /* IndexedTo100 */:
                return this.formatter().format(logical);
            default:
                return this._private__formatPrice(logical);
        }
    };
    PriceScale.prototype.formatPriceAbsolute = function (price) {
        return this._private__formatPrice(price, this._private__mainSourceFormatter());
    };
    PriceScale.prototype.formatPricePercentage = function (price, baseValue) {
        price = toPercent(price, baseValue);
        return percentageFormatter.format(price);
    };
    PriceScale.prototype.sourcesForAutoScale = function () {
        function useSourceForAutoScale(source) {
            return source instanceof PriceDataSource;
        }
        return this._private__dataSources.filter(useSourceForAutoScale);
    };
    PriceScale.prototype.recalculatePriceRange = function (visibleBars) {
        this._private__invalidatedForRange = {
            visibleBars: visibleBars,
            isValid: false,
        };
    };
    PriceScale.prototype.updateAllViews = function () {
        this._private__dataSources.forEach(function (s) { return s.updateAllViews(); });
    };
    PriceScale.prototype.updateFormatter = function () {
        this._private__marksCache = null;
        var mainSource = this.mainSource();
        var base = 100;
        if (mainSource !== null) {
            base = Math.round(1 / mainSource.minMove());
        }
        this._private__formatter = defaultPriceFormatter;
        if (this.isPercentage()) {
            this._private__formatter = percentageFormatter;
            base = 100;
        }
        else if (this.isIndexedTo100()) {
            this._private__formatter = new PriceFormatter(100, 1);
            base = 100;
        }
        else {
            if (mainSource !== null) {
                // user
                this._private__formatter = mainSource.formatter();
            }
        }
        this._private__markBuilder = new PriceTickMarkBuilder(this, base, this._private__coordinateToLogical.bind(this), this._private__logicalToCoordinate.bind(this));
        this._private__markBuilder.rebuildTickMarks();
    };
    PriceScale.prototype.invalidateSourcesCache = function () {
        this._private__cachedOrderedSources = null;
    };
    PriceScale.prototype._private__topMarginPx = function () {
        return this.isInverted()
            ? this._private__options.scaleMargins.bottom * this.height() + this._private__marginBelow
            : this._private__options.scaleMargins.top * this.height() + this._private__marginAbove;
    };
    PriceScale.prototype._private__bottomMarginPx = function () {
        return this.isInverted()
            ? this._private__options.scaleMargins.top * this.height() + this._private__marginAbove
            : this._private__options.scaleMargins.bottom * this.height() + this._private__marginBelow;
    };
    PriceScale.prototype._private__makeSureItIsValid = function () {
        if (!this._private__invalidatedForRange.isValid) {
            this._private__invalidatedForRange.isValid = true;
            this._private__recalculatePriceRangeImpl();
        }
    };
    PriceScale.prototype._private__invalidateInternalHeightCache = function () {
        this._private__internalHeightCache = null;
        this._private__internalHeightChanged.fire();
    };
    PriceScale.prototype._private__logicalToCoordinate = function (logical, baseValue) {
        this._private__makeSureItIsValid();
        if (this.isEmpty()) {
            return 0;
        }
        logical = this.isLog() && logical ? toLog(logical) : logical;
        var range = ensureNotNull(this.priceRange());
        var invCoordinate = this._private__bottomMarginPx() +
            (this.internalHeight() - 1) * (logical - range.minValue()) / range.length();
        var coordinate = this.invertedCoordinate(invCoordinate);
        return coordinate;
    };
    PriceScale.prototype._private__coordinateToLogical = function (coordinate, baseValue) {
        this._private__makeSureItIsValid();
        if (this.isEmpty()) {
            return 0;
        }
        var invCoordinate = this.invertedCoordinate(coordinate);
        var range = ensureNotNull(this.priceRange());
        var logical = range.minValue() + range.length() *
            ((invCoordinate - this._private__bottomMarginPx()) / (this.internalHeight() - 1));
        return this.isLog() ? fromLog(logical) : logical;
    };
    PriceScale.prototype._private__onIsInvertedChanged = function () {
        this._private__marksCache = null;
        this._private__markBuilder.rebuildTickMarks();
    };
    PriceScale.prototype._private__mainSourceFormatter = function () {
        var mainSource = ensureNotNull(this.mainSource());
        return mainSource.formatter();
    };
    // tslint:disable-next-line:cyclomatic-complexity
    PriceScale.prototype._private__recalculatePriceRangeImpl = function () {
        var visibleBars = this._private__invalidatedForRange.visibleBars;
        if (visibleBars === null) {
            return;
        }
        var priceRange = null;
        var sources = this.sourcesForAutoScale();
        var marginAbove = 0;
        var marginBelow = 0;
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            var firstValue = source.firstValue();
            if (firstValue === null) {
                continue;
            }
            var autoScaleInfo = source.autoscaleInfo(visibleBars.firstBar(), visibleBars.lastBar());
            var sourceRange = autoScaleInfo && autoScaleInfo.priceRange;
            if (sourceRange !== null) {
                switch (this._private__options.mode) {
                    case 1 /* Logarithmic */:
                        sourceRange = convertPriceRangeToLog(sourceRange);
                        break;
                    case 2 /* Percentage */:
                        sourceRange = toPercentRange(sourceRange, firstValue.value);
                        break;
                    case 3 /* IndexedTo100 */:
                        sourceRange = toIndexedTo100Range(sourceRange, firstValue.value);
                        break;
                }
                if (priceRange === null) {
                    priceRange = sourceRange;
                }
                else {
                    priceRange = priceRange.merge(ensureNotNull(sourceRange));
                }
                if (autoScaleInfo !== null && autoScaleInfo.margins !== null) {
                    marginAbove = Math.max(marginAbove, autoScaleInfo.margins.above);
                    marginBelow = Math.max(marginAbove, autoScaleInfo.margins.below);
                }
            }
        }
        if (marginAbove !== this._private__marginAbove || marginBelow !== this._private__marginBelow) {
            this._private__marginAbove = marginAbove;
            this._private__marginBelow = marginBelow;
            this._private__marksCache = null;
            this._private__invalidateInternalHeightCache();
        }
        if (priceRange !== null) {
            // keep current range is new is empty
            if (priceRange.minValue() === priceRange.maxValue()) {
                var mainSource = this.mainSource();
                var minMove = mainSource === null || this.isPercentage() || this.isIndexedTo100() ? 1 : mainSource.minMove();
                // if price range is degenerated to 1 point let's extend it by 10 min move values
                // to avoid incorrect range and empty (blank) scale (in case of min tick much greater than 1)
                var extendValue = 5 * minMove;
                priceRange = new PriceRange(priceRange.minValue() - extendValue, priceRange.maxValue() + extendValue);
            }
            this.setPriceRange(priceRange);
        }
        else {
            // reset empty to default
            if (this._private__priceRange === null) {
                this.setPriceRange(new PriceRange(-0.5, 0.5));
            }
        }
        this._private__invalidatedForRange.isValid = true;
    };
    PriceScale.prototype._private__getCoordinateTransformer = function () {
        if (this.isPercentage()) {
            return toPercent;
        }
        else if (this.isIndexedTo100()) {
            return toIndexedTo100;
        }
        else if (this.isLog()) {
            return toLog;
        }
        return null;
    };
    PriceScale.prototype._private__formatPrice = function (price, fallbackFormatter) {
        if (this._private__localizationOptions.priceFormatter === undefined) {
            if (fallbackFormatter === undefined) {
                fallbackFormatter = this.formatter();
            }
            return fallbackFormatter.format(price);
        }
        return this._private__localizationOptions.priceFormatter(price);
    };
    return PriceScale;
}());

function fillUpDownCandlesticksColors(options) {
    if (options.borderColor !== undefined) {
        options.borderUpColor = options.borderColor;
        options.borderDownColor = options.borderColor;
    }
    if (options.wickColor !== undefined) {
        options.wickUpColor = options.wickColor;
        options.wickDownColor = options.wickColor;
    }
}
function precisionByMinMove(minMove) {
    if (minMove >= 1) {
        return 0;
    }
    var i = 0;
    for (; i < 8; i++) {
        var intPart = Math.round(minMove);
        var fractPart = Math.abs(intPart - minMove);
        if (fractPart < 1e-8) {
            return i;
        }
        minMove = minMove * 10;
    }
    return i;
}
var PriceAxisLastValueMode;
(function (PriceAxisLastValueMode) {
    PriceAxisLastValueMode[PriceAxisLastValueMode["LastPriceAndPercentageValue"] = 0] = "LastPriceAndPercentageValue";
    PriceAxisLastValueMode[PriceAxisLastValueMode["LastValueAccordingToScale"] = 1] = "LastValueAccordingToScale";
})(PriceAxisLastValueMode || (PriceAxisLastValueMode = {}));
var PriceLineSource;
(function (PriceLineSource) {
    /**
     * The last bar data
     */
    PriceLineSource[PriceLineSource["LastBar"] = 0] = "LastBar";
    /**
     * The last visible bar in viewport
     */
    PriceLineSource[PriceLineSource["LastVisible"] = 1] = "LastVisible";
})(PriceLineSource || (PriceLineSource = {}));

function isBusinessDay(time) {
    return !isNumber(time) && !isString(time);
}
function isUTCTimestamp(time) {
    return isNumber(time);
}

/**
 * Default font family.
 * Must be used to generate font string when font is not specified.
 */
var defaultFontFamily = "'Trebuchet MS', Roboto, Ubuntu, sans-serif";
/**
 * Generates a font string, which can be used to set in canvas' font property.
 * If no family provided, [defaultFontFamily] will be used.
 */
function makeFont(size, family, style) {
    if (style !== undefined) {
        style = style + " ";
    }
    else {
        style = '';
    }
    if (family === undefined) {
        family = defaultFontFamily;
    }
    return "" + style + size + "px " + family;
}

var RendererConstants;
(function (RendererConstants) {
    RendererConstants[RendererConstants["BorderSize"] = 1] = "BorderSize";
    RendererConstants[RendererConstants["TickLength"] = 4] = "TickLength";
})(RendererConstants || (RendererConstants = {}));
var PriceAxisRendererOptionsProvider = /** @class */ (function () {
    function PriceAxisRendererOptionsProvider(chartModel) {
        this._private__rendererOptions = {
            borderSize: 1 /* BorderSize */,
            tickLength: 4 /* TickLength */,
            fontSize: NaN,
            font: '',
            fontFamily: '',
            color: '',
            paddingBottom: 0,
            paddingInner: 0,
            paddingOuter: 0,
            paddingTop: 0,
            baselineOffset: 0,
        };
        this._private__chartModel = chartModel;
    }
    PriceAxisRendererOptionsProvider.prototype.options = function () {
        var rendererOptions = this._private__rendererOptions;
        var currentFontSize = this._private__fontSize();
        var currentFontFamily = this._private__fontFamily();
        if (rendererOptions.fontSize !== currentFontSize || rendererOptions.fontFamily !== currentFontFamily) {
            rendererOptions.fontSize = currentFontSize;
            rendererOptions.fontFamily = currentFontFamily;
            rendererOptions.font = makeFont(currentFontSize, currentFontFamily);
            rendererOptions.paddingTop = Math.floor(currentFontSize / 3.5);
            rendererOptions.paddingBottom = rendererOptions.paddingTop;
            rendererOptions.paddingInner = Math.max(Math.ceil(currentFontSize / 2 - rendererOptions.tickLength / 2), 0);
            rendererOptions.paddingOuter = Math.ceil(currentFontSize / 2 + rendererOptions.tickLength / 2);
            rendererOptions.baselineOffset = Math.round(currentFontSize / 10);
        }
        rendererOptions.color = this._private__textColor();
        return this._private__rendererOptions;
    };
    PriceAxisRendererOptionsProvider.prototype._private__textColor = function () {
        return this._private__chartModel.options().layout.textColor;
    };
    PriceAxisRendererOptionsProvider.prototype._private__fontSize = function () {
        return this._private__chartModel.options().layout.fontSize;
    };
    PriceAxisRendererOptionsProvider.prototype._private__fontFamily = function () {
        return this._private__chartModel.options().layout.fontFamily;
    };
    return PriceAxisRendererOptionsProvider;
}());

var GridRenderer = /** @class */ (function () {
    function GridRenderer() {
        this._private__data = null;
    }
    GridRenderer.prototype.setData = function (data) {
        this._private__data = data;
    };
    GridRenderer.prototype.draw = function (ctx, pixelRatio, isHovered, hitTestData) {
        var _this = this;
        if (this._private__data === null) {
            return;
        }
        var lineWidth = Math.floor(pixelRatio);
        ctx.lineWidth = lineWidth;
        var height = Math.ceil(this._private__data.h * pixelRatio);
        var width = Math.ceil(this._private__data.w * pixelRatio);
        strokeInPixel(ctx, function () {
            var data = ensureNotNull(_this._private__data);
            if (data.vertLinesVisible) {
                ctx.strokeStyle = data.vertLinesColor;
                setLineStyle(ctx, data.vertLineStyle);
                ctx.beginPath();
                for (var _i = 0, _a = data.timeMarks; _i < _a.length; _i++) {
                    var timeMark = _a[_i];
                    var x = Math.round(timeMark.coord * pixelRatio);
                    ctx.moveTo(x, -lineWidth);
                    ctx.lineTo(x, height + lineWidth);
                }
                ctx.stroke();
            }
            if (data.horzLinesVisible) {
                ctx.strokeStyle = data.horzLinesColor;
                setLineStyle(ctx, data.horzLineStyle);
                ctx.beginPath();
                for (var _b = 0, _c = data.priceMarks; _b < _c.length; _b++) {
                    var priceMark = _c[_b];
                    var y = Math.round(priceMark.coord * pixelRatio);
                    ctx.moveTo(-lineWidth, y);
                    ctx.lineTo(width + lineWidth, y);
                }
                ctx.stroke();
            }
        });
    };
    return GridRenderer;
}());

var GridPaneView = /** @class */ (function () {
    function GridPaneView(pane) {
        this._private__renderer = new GridRenderer();
        this._private__invalidated = true;
        this._private__pane = pane;
    }
    GridPaneView.prototype.update = function () {
        this._private__invalidated = true;
    };
    GridPaneView.prototype.renderer = function (height, width) {
        if (this._private__invalidated) {
            var gridOptions = this._private__pane.model().options().grid;
            var data = {
                h: height,
                w: width,
                horzLinesVisible: gridOptions.horzLines.visible,
                vertLinesVisible: gridOptions.vertLines.visible,
                horzLinesColor: gridOptions.horzLines.color,
                vertLinesColor: gridOptions.vertLines.color,
                horzLineStyle: gridOptions.horzLines.style,
                vertLineStyle: gridOptions.vertLines.style,
                priceMarks: this._private__pane.defaultPriceScale().marks(),
                timeMarks: this._private__pane.model().timeScale().marks() || [],
            };
            this._private__renderer.setData(data);
            this._private__invalidated = false;
        }
        return this._private__renderer;
    };
    return GridPaneView;
}());

var Grid = /** @class */ (function () {
    function Grid() {
        this._private__paneViews = new WeakMap();
        this._private__invalidated = true;
    }
    Grid.prototype.paneViews = function (pane) {
        var paneViews = this._private__paneViews.get(pane);
        if (paneViews === undefined) {
            paneViews = [new GridPaneView(pane)];
            this._private__paneViews.set(pane, paneViews);
        }
        if (this._private__invalidated) {
            paneViews.forEach(function (view) { return view.update(); });
            this._private__invalidated = false;
        }
        return paneViews;
    };
    Grid.prototype.invalidate = function () {
        this._private__invalidated = true;
    };
    return Grid;
}());

var InvalidationLevel;
(function (InvalidationLevel) {
    InvalidationLevel[InvalidationLevel["None"] = 0] = "None";
    InvalidationLevel[InvalidationLevel["Cursor"] = 1] = "Cursor";
    InvalidationLevel[InvalidationLevel["Light"] = 2] = "Light";
    InvalidationLevel[InvalidationLevel["Full"] = 3] = "Full";
})(InvalidationLevel || (InvalidationLevel = {}));
function mergePaneInvalidation(beforeValue, newValue) {
    if (beforeValue === undefined) {
        return newValue;
    }
    var level = Math.max(beforeValue.level, newValue.level);
    var autoScale = beforeValue.autoScale || newValue.autoScale;
    return { level: level, autoScale: autoScale };
}
var InvalidateMask = /** @class */ (function () {
    function InvalidateMask(globalLevel) {
        this._private__invalidatedPanes = new Map();
        this._private__force = false;
        this._private__fitContent = false;
        this._private__targetTimeRange = null;
        this._private__globalLevel = globalLevel;
    }
    InvalidateMask.prototype.invalidatePane = function (paneIndex, invalidation) {
        var prevValue = this._private__invalidatedPanes.get(paneIndex);
        var newValue = mergePaneInvalidation(prevValue, invalidation);
        this._private__invalidatedPanes.set(paneIndex, newValue);
    };
    InvalidateMask.prototype.invalidateAll = function (level) {
        this._private__globalLevel = Math.max(this._private__globalLevel, level);
    };
    InvalidateMask.prototype.fullInvalidation = function () {
        return this._private__globalLevel;
    };
    InvalidateMask.prototype.invalidateForPane = function (paneIndex) {
        var paneInvalidation = this._private__invalidatedPanes.get(paneIndex);
        if (paneInvalidation === undefined) {
            return {
                level: this._private__globalLevel,
            };
        }
        return {
            level: Math.max(this._private__globalLevel, paneInvalidation.level),
            autoScale: paneInvalidation.autoScale,
        };
    };
    InvalidateMask.prototype.setFitContent = function () {
        this._private__fitContent = true;
        this._private__targetTimeRange = null;
    };
    InvalidateMask.prototype.getFitContent = function () {
        return this._private__fitContent;
    };
    InvalidateMask.prototype.setTargetTimeRange = function (range) {
        this._private__targetTimeRange = range;
        this._private__fitContent = false;
    };
    InvalidateMask.prototype.getTargetTimeRange = function () {
        return this._private__targetTimeRange;
    };
    InvalidateMask.prototype.merge = function (other) {
        var _this = this;
        this._private__force = this._private__force || other._private__force;
        if (other._private__fitContent) {
            this.setFitContent();
        }
        if (other._private__targetTimeRange) {
            this.setTargetTimeRange(other._private__targetTimeRange);
        }
        this._private__globalLevel = Math.max(this._private__globalLevel, other._private__globalLevel);
        other._private__invalidatedPanes.forEach(function (invalidation, index) {
            _this.invalidatePane(index, invalidation);
        });
    };
    return InvalidateMask;
}());

var Magnet = /** @class */ (function () {
    function Magnet(options) {
        this._private__options = options;
    }
    Magnet.prototype.align = function (price, index, pane) {
        var res = price;
        if (this._private__options.mode === 0 /* Normal */) {
            return res;
        }
        var defaultPriceScale = pane.defaultPriceScale();
        var firstValue = defaultPriceScale.firstValue();
        if (firstValue === null) {
            return res;
        }
        var y = defaultPriceScale.priceToCoordinate(price, firstValue);
        // get all serieses from the pane
        var serieses = pane.dataSources().filter((function (ds) { return (ds instanceof Series); }));
        var candidates = serieses.reduce(function (acc, series) {
            if (pane.isOverlay(series)) {
                return acc;
            }
            var ps = series.priceScale();
            var bars = series.bars();
            if (ps.isEmpty() || !bars.contains(index)) {
                return acc;
            }
            var bar = bars.valueAt(index);
            if (bar === null) {
                return acc;
            }
            var prices = [
                bar.value[3 /* Close */],
            ];
            // convert bar to pixels
            var firstPrice = ensure(series.firstValue());
            return acc.concat(prices.map(function (barPrice) { return ps.priceToCoordinate(barPrice, firstPrice.value); }));
        }, []);
        if (candidates.length === 0) {
            return res;
        }
        candidates.sort(function (y1, y2) { return Math.abs(y1 - y) - Math.abs(y2 - y); });
        var nearest = candidates[0];
        res = defaultPriceScale.coordinateToPrice(nearest, firstValue);
        return res;
    };
    return Magnet;
}());

var DEFAULT_STRETCH_FACTOR = 1000;
var Pane = /** @class */ (function () {
    function Pane(timeScale, model) {
        this._private__dataSources = [];
        this._private__overlaySources = [];
        this._private__height = 0;
        this._private__width = 0;
        this._private__stretchFactor = DEFAULT_STRETCH_FACTOR;
        this._private__mainDataSource = null;
        this._private__cachedOrderedSources = null;
        this._private__groupedPriceScale = {};
        this._private__destroyed = new Delegate();
        this._private__timeScale = timeScale;
        this._private__model = model;
        this.model()
            .mainPriceScaleOptionsChanged()
            .subscribe(this.onPriceScaleOptionsChanged.bind(this), this);
        this._private__defaultNonOverlayPriceScale = this._private__createPriceScale();
    }
    Pane.prototype.onPriceScaleOptionsChanged = function () {
        this._private__defaultNonOverlayPriceScale.applyOptions(this._private__model.options().priceScale);
    };
    Pane.prototype.destroy = function () {
        this.model()
            .mainPriceScaleOptionsChanged()
            .unsubscribeAll(this);
        this._private__defaultNonOverlayPriceScale.modeChanged().unsubscribeAll(this);
        this._private__dataSources.forEach(function (source) {
            if (source.destroy) {
                source.destroy();
            }
        });
        this._private__destroyed.fire();
    };
    Pane.prototype.stretchFactor = function () {
        return this._private__stretchFactor;
    };
    Pane.prototype.setStretchFactor = function (factor) {
        this._private__stretchFactor = factor;
    };
    Pane.prototype.model = function () {
        return this._private__model;
    };
    Pane.prototype.width = function () {
        return this._private__width;
    };
    Pane.prototype.height = function () {
        return this._private__height;
    };
    Pane.prototype.setWidth = function (width) {
        this._private__width = width;
        this.updateAllViews();
    };
    Pane.prototype.setHeight = function (height) {
        var _this = this;
        this._private__height = height;
        this._private__defaultNonOverlayPriceScale.setHeight(height);
        // process overlays
        this._private__dataSources.forEach(function (ds) {
            if (_this.isOverlay(ds)) {
                var priceScale = ds.priceScale();
                if (priceScale !== null) {
                    priceScale.setHeight(height);
                }
            }
        });
        this.updateAllViews();
    };
    Pane.prototype.dataSources = function () {
        return this._private__dataSources;
    };
    Pane.prototype.isOverlay = function (source) {
        var priceScale = source.priceScale();
        if (priceScale === null) {
            return true;
        }
        return this._private__defaultNonOverlayPriceScale !== priceScale;
    };
    Pane.prototype.addDataSource = function (source, overlay, keepZorder, scaleGroup) {
        var zOrder = this._private__getZOrderMinMax().minZOrder - 1;
        this._private__insertDataSource(source, overlay, zOrder, scaleGroup);
    };
    Pane.prototype.removeDataSource = function (source) {
        var index = this._private__dataSources.indexOf(source);
        assert(index !== -1, 'removeDataSource: invalid data source');
        this._private__dataSources.splice(index, 1);
        if (source === this._private__mainDataSource) {
            this._private__mainDataSource = null;
        }
        var overlayIndex = this._private__overlaySources.indexOf(source);
        if (overlayIndex !== -1) {
            this._private__overlaySources.splice(overlayIndex, 1);
        }
        var priceScale = source.priceScale();
        // if source has owner, it returns owner's price scale
        // and it does not have source in their list
        if (priceScale && priceScale.dataSources().indexOf(source) >= 0) {
            priceScale.removeDataSource(source);
        }
        if (priceScale && priceScale.mainSource() === null) {
            var dataSourceCount = priceScale.dataSources().length;
            assert(dataSourceCount === 0, 'Invalid priceScale state: empty mainSource but non-empty data sources=' +
                dataSourceCount);
            if (priceScale !== this._private__defaultNonOverlayPriceScale) {
                priceScale.modeChanged().unsubscribeAll(this);
            }
        }
        if (source instanceof PriceDataSource) {
            this._private__processMainSourceChange();
        }
        if (priceScale && source instanceof PriceDataSource) {
            priceScale.invalidateSourcesCache();
            this.recalculatePriceScale(priceScale);
        }
        this._private__cachedOrderedSources = null;
    };
    Pane.prototype.priceScalePosition = function () {
        var position = this._private__model.options().priceScale.position;
        return position === 'none' ? 'overlay' : position;
    };
    Pane.prototype.startScalePrice = function (priceScale, x) {
        priceScale.startScale(x);
    };
    Pane.prototype.scalePriceTo = function (priceScale, x) {
        priceScale.scaleTo(x);
        // TODO: be more smart and update only affected views
        this.updateAllViews();
    };
    Pane.prototype.endScalePrice = function (priceScale) {
        priceScale.endScale();
    };
    Pane.prototype.startScrollPrice = function (priceScale, x) {
        priceScale.startScroll(x);
    };
    Pane.prototype.scrollPriceTo = function (priceScale, x) {
        priceScale.scrollTo(x);
        this.updateAllViews();
    };
    Pane.prototype.endScrollPrice = function (priceScale) {
        priceScale.endScroll();
    };
    Pane.prototype.setPriceAutoScale = function (priceScale, autoScale) {
        priceScale.setMode({
            autoScale: autoScale,
        });
        if (this._private__timeScale.isEmpty()) {
            priceScale.setPriceRange(null);
            return;
        }
        this.recalculatePriceScale(priceScale);
    };
    Pane.prototype.updateAllViews = function () {
        this._private__dataSources.forEach(function (source) {
            source.updateAllViews();
        });
    };
    Pane.prototype.defaultPriceScale = function () {
        var mainDataSource = this.mainDataSource();
        var res = mainDataSource !== null ? mainDataSource.priceScale() : null;
        // Every Pane MUST have a price scale! This is mostly a fix of broken charts with empty panes...
        if (res === null) {
            res = this._private__defaultNonOverlayPriceScale;
        }
        return res;
    };
    Pane.prototype.mainDataSource = function () {
        return this._private__mainDataSource;
    };
    Pane.prototype.recalculatePriceScale = function (priceScale) {
        if (priceScale === null || !priceScale.isAutoScale()) {
            return;
        }
        this._private__recalculatePriceScaleImpl(priceScale);
    };
    Pane.prototype.resetPriceScale = function (priceScale) {
        var visibleBars = this._private__timeScale.visibleBars();
        priceScale.setMode({ autoScale: true });
        if (visibleBars !== null) {
            priceScale.recalculatePriceRange(visibleBars);
        }
        this.updateAllViews();
    };
    Pane.prototype.momentaryAutoScale = function () {
        this._private__recalculatePriceScaleImpl(this._private__defaultNonOverlayPriceScale);
    };
    Pane.prototype.recalculate = function () {
        var _this = this;
        this.recalculatePriceScale(this._private__defaultNonOverlayPriceScale);
        this._private__dataSources.forEach(function (ds) {
            if (_this.isOverlay(ds)) {
                _this.recalculatePriceScale(ds.priceScale());
            }
        });
        this.updateAllViews();
        this._private__model.lightUpdate();
    };
    Pane.prototype.isEmpty = function () {
        return this._private__mainDataSource === null;
    };
    Pane.prototype.containsSeries = function () {
        return this._private__dataSources.some(function (ds) { return ds instanceof Series; });
    };
    Pane.prototype.orderedSources = function () {
        if (this._private__cachedOrderedSources === null) {
            this._private__cachedOrderedSources = sortSources(this._private__dataSources);
        }
        return this._private__cachedOrderedSources;
    };
    Pane.prototype.onDestroyed = function () {
        return this._private__destroyed;
    };
    Pane.prototype._private__findSuitableScale = function (source, preferredScale, scaleGroup) {
        if (preferredScale !== 'overlay') {
            return this._private__defaultNonOverlayPriceScale;
        }
        if (scaleGroup) {
            if (!this._private__groupedPriceScale[scaleGroup]) {
                this._private__groupedPriceScale[scaleGroup] = this._private__createPriceScale();
            }
            return this._private__groupedPriceScale[scaleGroup];
        }
        return this._private__createPriceScale(true);
    };
    Pane.prototype._private__recalculatePriceScaleImpl = function (priceScale) {
        // TODO: can use this checks
        var sourceForAutoScale = priceScale.sourcesForAutoScale();
        if (sourceForAutoScale &&
            sourceForAutoScale.length > 0 &&
            !this._private__timeScale.isEmpty()) {
            var visibleBars = this._private__timeScale.visibleBars();
            if (visibleBars !== null) {
                priceScale.recalculatePriceRange(visibleBars);
            }
        }
        priceScale.updateAllViews();
    };
    Pane.prototype._private__getZOrderMinMax = function () {
        var sources = this.orderedSources();
        if (sources.length === 0) {
            return { minZOrder: 0, maxZOrder: 0 };
        }
        var minZOrder = 0;
        var maxZOrder = 0;
        for (var j = 0; j < sources.length; j++) {
            var ds = sources[j];
            var zOrder = ds.zorder();
            if (zOrder !== null) {
                if (zOrder < minZOrder) {
                    minZOrder = zOrder;
                }
                if (zOrder > maxZOrder) {
                    maxZOrder = zOrder;
                }
            }
        }
        return { minZOrder: minZOrder, maxZOrder: maxZOrder };
    };
    Pane.prototype._private__insertDataSource = function (source, overlay, zOrder, scaleGroup) {
        var priceScalePosition = 'overlay';
        var priceScale = null;
        if (!overlay) {
            var optionsPosition = this.model().options().priceScale.position;
            priceScalePosition =
                optionsPosition === 'none' ? 'overlay' : optionsPosition;
        }
        if (source instanceof PriceDataSource) {
            priceScale = this._private__findSuitableScale(source, priceScalePosition, scaleGroup);
        }
        this._private__dataSources.push(source);
        if (overlay) {
            this._private__overlaySources.push(source);
        }
        if (priceScale !== null) {
            priceScale.addDataSource(source);
            source.setPriceScale(priceScale);
        }
        source.setZorder(zOrder);
        this._private__processMainSourceChange();
        if (source instanceof PriceDataSource) {
            this.recalculatePriceScale(priceScale);
        }
        this._private__cachedOrderedSources = null;
    };
    Pane.prototype._private__onPriceScaleModeChanged = function (priceScale, oldMode, newMode) {
        if (oldMode.mode === newMode.mode) {
            return;
        }
        // momentary auto scale if we toggle percentage/indexedTo100 mode
        this._private__recalculatePriceScaleImpl(priceScale);
    };
    Pane.prototype._private__processMainSourceChange = function () {
        if (this._private__mainDataSource === null ||
            this._private__overlaySources.indexOf(this._private__mainDataSource) !== -1) {
            // first check non-overlay sources
            for (var _i = 0, _a = this._private__dataSources; _i < _a.length; _i++) {
                var source = _a[_i];
                if (source instanceof PriceDataSource && !this.isOverlay(source)) {
                    this._private__setMainSource(source);
                    return;
                }
            }
            // then check overlay sources
            for (var _b = 0, _c = this._private__overlaySources; _b < _c.length; _b++) {
                var source = _c[_b];
                if (source instanceof PriceDataSource) {
                    this._private__setMainSource(source);
                    return;
                }
            }
        }
    };
    Pane.prototype._private__setMainSource = function (source) {
        var priceScale = ensureNotNull(source.priceScale());
        this.defaultPriceScale()
            .modeChanged()
            .unsubscribeAll(this);
        priceScale
            .modeChanged()
            .subscribe(this._private__onPriceScaleModeChanged.bind(this, priceScale), this);
        this._private__mainDataSource = source;
    };
    Pane.prototype._private__createPriceScale = function (overlay) {
        var priceScaleOptions = clone(this._private__model.options().priceScale);
        if (overlay) {
            // overlay scales should be normal with auto scale enabled
            priceScaleOptions.autoScale = true;
            priceScaleOptions.mode = 0 /* Normal */;
        }
        var priceScale = new PriceScale(priceScaleOptions, this._private__model.options().layout, this._private__model.options().localization);
        priceScale.setHeight(this.height());
        return priceScale;
    };
    return Pane;
}());

var getMonth = function (date) { return date.getUTCMonth() + 1; };
var getDay = function (date) { return date.getUTCDate(); };
var getYear = function (date) { return date.getUTCFullYear(); };
var dd = function (date) { return numberToStringWithLeadingZero(getDay(date), 2); };
var MMMM = function (date, locale) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1)
    .toLocaleString(locale, { month: 'long' }); };
var MMM = function (date, locale) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1)
    .toLocaleString(locale, { month: 'short' }); };
var MM = function (date) { return numberToStringWithLeadingZero(getMonth(date), 2); };
var yy = function (date) { return numberToStringWithLeadingZero(getYear(date) % 100, 2); };
var yyyy = function (date) { return numberToStringWithLeadingZero(getYear(date), 4); };
/*
 Map of date formatting functions
 */
var dateFormatFunctions = {
    '\'yy MMM dd': function (date, locale) { return "'" + yy(date) + " " + MMM(date, locale) + " " + dd(date); },
    '\'yy MMMM dd': function (date, locale) { return "'" + yy(date) + " " + MMMM(date, locale) + " " + dd(date); },
    'yyyy MMM dd': function (date, locale) { return yyyy(date) + " " + MMM(date, locale) + " " + dd(date); },
    'yyyy MMMM dd': function (date, locale) { return yyyy(date) + " " + MMMM(date, locale) + " " + dd(date); },
    'dd MMM \'yy': function (date, locale) { return dd(date) + " " + MMM(date, locale) + " '" + yy(date); },
    'dd MMMM \'yy': function (date, locale) { return dd(date) + " " + MMMM(date, locale) + " '" + yy(date); },
    'dd MMM yyyy': function (date, locale) { return dd(date) + " " + MMM(date, locale) + " " + yyyy(date); },
    'dd MMMM yyyy': function (date, locale) { return dd(date) + " " + MMMM(date, locale) + " " + yyyy(date); },
    'MMM dd, \'yy': function (date, locale) { return MMM(date, locale) + " " + dd(date) + ", '" + yy(date); },
    'MMMM dd, \'yy': function (date, locale) { return MMMM(date, locale) + " " + dd(date) + ", '" + yy(date); },
    'MMM dd, yyyy': function (date, locale) { return MMM(date, locale) + " " + dd(date) + ", " + yyyy(date); },
    'MMMM dd, yyyy': function (date, locale) { return MMMM(date, locale) + " " + dd(date) + ", " + yyyy(date); },
    'yyyy-MM-dd': function (date, locale) { return yyyy(date) + "-" + MM(date) + "-" + dd(date); },
    'yy-MM-dd': function (date, locale) { return yy(date) + "-" + MM(date) + "-" + dd(date); },
    'yy/MM/dd': function (date, locale) { return yy(date) + "/" + MM(date) + "/" + dd(date); },
    'yyyy/MM/dd': function (date, locale) { return yyyy(date) + "/" + MM(date) + "/" + dd(date); },
    'yy.MM.dd': function (date, locale) { return yy(date) + "." + MM(date) + "." + dd(date); },
    'yyyy.MM.dd': function (date, locale) { return yyyy(date) + "." + MM(date) + "." + dd(date); },
    'dd-MM-yyyy': function (date, locale) { return dd(date) + "-" + MM(date) + "-" + yyyy(date); },
    'dd-MM-yy': function (date, locale) { return dd(date) + "-" + MM(date) + "-" + yy(date); },
    'dd/MM/yy': function (date, locale) { return dd(date) + "/" + MM(date) + "/" + yy(date); },
    'dd/MM/yyyy': function (date, locale) { return dd(date) + "/" + MM(date) + "/" + yyyy(date); },
    'dd.MM.yy': function (date, locale) { return dd(date) + "." + MM(date) + "." + yy(date); },
    'dd.MM.yyyy': function (date, locale) { return dd(date) + "." + MM(date) + "." + yyyy(date); },
    'MM-dd-yy': function (date, locale) { return MM(date) + "-" + dd(date) + "-" + yy(date); },
    'MM-dd-yyyy': function (date, locale) { return MM(date) + "-" + dd(date) + "-" + yyyy(date); },
    'MM/dd/yy': function (date, locale) { return MM(date) + "/" + dd(date) + "/" + yy(date); },
    'MM/dd/yyyy': function (date, locale) { return MM(date) + "/" + dd(date) + "/" + yyyy(date); },
    'MM.dd.yy': function (date, locale) { return MM(date) + "." + dd(date) + "." + yy(date); },
    'MM.dd.yyyy': function (date, locale) { return MM(date) + "." + dd(date) + "." + yyyy(date); },
};

var DateFormatter = /** @class */ (function () {
    function DateFormatter(dateFormat, locale) {
        if (dateFormat === void 0) { dateFormat = 'yyyy-MM-dd'; }
        if (locale === void 0) { locale = 'default'; }
        this._private__dateFormatFunc = dateFormatFunctions[dateFormat];
        this._private__locale = locale;
    }
    DateFormatter.prototype.format = function (date) {
        return this._private__dateFormatFunc(date, this._private__locale);
    };
    return DateFormatter;
}());

var TimeFormatter = /** @class */ (function () {
    function TimeFormatter(format) {
        this._private__formatStr = format || '%h:%m:%s';
    }
    TimeFormatter.prototype.format = function (date) {
        return this._private__formatStr.replace('%h', numberToStringWithLeadingZero(date.getUTCHours(), 2)).
            replace('%m', numberToStringWithLeadingZero(date.getUTCMinutes(), 2)).
            replace('%s', numberToStringWithLeadingZero(date.getUTCSeconds(), 2));
    };
    return TimeFormatter;
}());

var defaultParams = {
    dateFormat: 'yyyy-MM-dd',
    timeFormat: '%h:%m:%s',
    dateTimeSeparator: ' ',
    locale: 'default',
};
var DateTimeFormatter = /** @class */ (function () {
    function DateTimeFormatter(params) {
        if (params === void 0) { params = {}; }
        var formatterParams = __assign(__assign({}, defaultParams), params);
        this._private__dateFormatter = new DateFormatter(formatterParams.dateFormat, formatterParams.locale);
        this._private__timeFormatter = new TimeFormatter(formatterParams.timeFormat);
        this._private__separator = formatterParams.dateTimeSeparator;
    }
    DateTimeFormatter.prototype.format = function (dateTime) {
        return "" + this._private__dateFormatter.format(dateTime) + this._private__separator + this._private__timeFormatter.format(dateTime);
    };
    return DateTimeFormatter;
}());

var BarsRange = /** @class */ (function () {
    function BarsRange(firstBar, lastBar) {
        assert(firstBar <= lastBar, 'The last bar in the bars range should be greater than or equal to the first bar');
        this._private__firstBar = firstBar;
        this._private__lastBar = lastBar;
    }
    BarsRange.prototype.firstBar = function () {
        return this._private__firstBar;
    };
    BarsRange.prototype.lastBar = function () {
        return this._private__lastBar;
    };
    BarsRange.prototype.count = function () {
        return this._private__lastBar - this._private__firstBar + 1;
    };
    BarsRange.prototype.contains = function (index) {
        return this._private__firstBar <= index && index <= this._private__lastBar;
    };
    BarsRange.prototype.equals = function (other) {
        return this._private__firstBar === other.firstBar() && this._private__lastBar === other.lastBar();
    };
    return BarsRange;
}());

var FormattedLabelsCache = /** @class */ (function () {
    function FormattedLabelsCache(format, size) {
        if (size === void 0) { size = 50; }
        this._private__actualSize = 0;
        this._private__usageTick = 1;
        this._private__oldestTick = 1;
        this._private__cache = new Map();
        this._private__tick2Labels = new Map();
        this._private__format = format;
        this._private__maxSize = size;
    }
    FormattedLabelsCache.prototype.format = function (value) {
        var tick = this._private__cache.get(value.valueOf());
        if (tick !== undefined) {
            return tick.string;
        }
        if (this._private__actualSize === this._private__maxSize) {
            var oldestValue = this._private__tick2Labels.get(this._private__oldestTick);
            this._private__tick2Labels.delete(this._private__oldestTick);
            this._private__cache.delete(ensureDefined(oldestValue));
            this._private__oldestTick++;
            this._private__actualSize--;
        }
        var str = this._private__format(value);
        this._private__cache.set(value.valueOf(), { string: str, tick: this._private__usageTick });
        this._private__tick2Labels.set(this._private__usageTick, value.valueOf());
        this._private__actualSize++;
        this._private__usageTick++;
        return str;
    };
    return FormattedLabelsCache;
}());

function sortByIndexAsc(a, b) {
    return a.index - b.index;
}
var TickMarks = /** @class */ (function () {
    function TickMarks() {
        this._private__minIndex = Infinity;
        this._private__maxIndex = -Infinity;
        // Hash of tick marks
        this._private__marksByIndex = new Map();
        // Sparse array with ordered arrays of tick marks
        this._private__marksBySpan = [];
        this._private__changed = new Delegate();
        this._private__cache = null;
        this._private__maxBar = NaN;
    }
    TickMarks.prototype.reset = function () {
        this._private__marksByIndex.clear();
        this._private__marksBySpan = [];
        this._private__minIndex = Infinity;
        this._private__maxIndex = -Infinity;
        this._private__cache = null;
        this._private__changed.fire();
    };
    // tslint:disable-next-line:cyclomatic-complexity
    TickMarks.prototype.merge = function (tickMarks) {
        var marksBySpan = this._private__marksBySpan;
        var unsortedSpans = {};
        for (var _i = 0, tickMarks_1 = tickMarks; _i < tickMarks_1.length; _i++) {
            var tickMark = tickMarks_1[_i];
            var index = tickMark.index;
            var span = tickMark.span;
            var existingTickMark = this._private__marksByIndex.get(tickMark.index);
            if (existingTickMark) {
                if (existingTickMark.index === tickMark.index && existingTickMark.span === tickMark.span) {
                    // We don't need to do anything, just update time (if it differs)
                    existingTickMark.time = tickMark.time;
                    continue;
                }
                // TickMark exists, but it differs. We need to remove it first
                this._private__removeTickMark(existingTickMark);
            }
            // Set into hash
            this._private__marksByIndex.set(index, tickMark);
            if (this._private__minIndex > index) { // It's not the same as `this.minIndex > index`, mind the NaN
                this._private__minIndex = index;
            }
            if (this._private__maxIndex < index) {
                this._private__maxIndex = index;
            }
            // Store it in span arrays
            var marks = marksBySpan[span];
            if (marks === undefined) {
                marks = [];
                marksBySpan[span] = marks;
            }
            marks.push(tickMark);
            unsortedSpans[span] = true;
        }
        // Clean up and sort arrays
        for (var span = marksBySpan.length; span--;) {
            var marks = marksBySpan[span];
            if (marks === undefined) {
                continue;
            }
            if (marks.length === 0) {
                delete marksBySpan[span];
            }
            if (unsortedSpans[span]) {
                marks.sort(sortByIndexAsc);
            }
        }
        this._private__cache = null;
        this._private__changed.fire();
    };
    TickMarks.prototype.indexToTime = function (index) {
        var tickMark = this._private__marksByIndex.get(index);
        if (tickMark === undefined) {
            return null;
        }
        return tickMark.time;
    };
    TickMarks.prototype.nearestIndex = function (time) {
        var left = this._private__minIndex;
        var right = this._private__maxIndex;
        while (right - left > 2) {
            if (ensureDefined(this._private__marksByIndex.get(left)).time.timestamp * 1000 === time) {
                return left;
            }
            if (ensureDefined(this._private__marksByIndex.get(right)).time.timestamp * 1000 === time) {
                return right;
            }
            var center = Math.round((left + right) / 2);
            if (ensureDefined(this._private__marksByIndex.get(center)).time.timestamp * 1000 > time) {
                right = center;
            }
            else {
                left = center;
            }
        }
        return left;
    };
    TickMarks.prototype.build = function (spacing, maxWidth) {
        var maxBar = Math.ceil(maxWidth / spacing);
        if (this._private__maxBar === maxBar && this._private__cache) {
            return this._private__cache;
        }
        this._private__maxBar = maxBar;
        var marks = [];
        for (var span = this._private__marksBySpan.length; span--;) {
            if (!this._private__marksBySpan[span]) {
                continue;
            }
            // Built tickMarks are now prevMarks, and marks it as new array
            var prevMarks = marks;
            marks = [];
            var prevMarksLength = prevMarks.length;
            var prevMarksPointer = 0;
            var currentSpan = ensureDefined(this._private__marksBySpan[span]);
            var currentSpanLength = currentSpan.length;
            var rightIndex = Infinity;
            var leftIndex = -Infinity;
            for (var i = 0; i < currentSpanLength; i++) {
                var mark = currentSpan[i];
                var currentIndex = mark.index;
                // Determine indexes with which current index will be compared
                // All marks to the right is moved to new array
                while (prevMarksPointer < prevMarksLength) {
                    var lastMark = prevMarks[prevMarksPointer];
                    var lastIndex = lastMark.index;
                    if (lastIndex < currentIndex) {
                        prevMarksPointer++;
                        marks.push(lastMark);
                        leftIndex = lastIndex;
                        rightIndex = Infinity;
                    }
                    else {
                        rightIndex = lastIndex;
                        break;
                    }
                }
                if (rightIndex - currentIndex >= maxBar && currentIndex - leftIndex >= maxBar) {
                    // TickMark fits. Place it into new array
                    marks.push(mark);
                    leftIndex = currentIndex;
                }
            }
            // Place all unused tickMarks into new array;
            for (; prevMarksPointer < prevMarksLength; prevMarksPointer++) {
                marks.push(prevMarks[prevMarksPointer]);
            }
        }
        this._private__cache = marks;
        return this._private__cache;
    };
    TickMarks.prototype._private__removeTickMark = function (tickMark) {
        var index = tickMark.index;
        if (this._private__marksByIndex.get(index) !== tickMark) {
            return;
        }
        this._private__marksByIndex.delete(index);
        if (index <= this._private__minIndex) {
            this._private__minIndex++;
        }
        if (index >= this._private__maxIndex) {
            this._private__maxIndex--;
        }
        if (this._private__maxIndex < this._private__minIndex) {
            this._private__minIndex = Infinity;
            this._private__maxIndex = -Infinity;
        }
        var spanArray = ensureDefined(this._private__marksBySpan[tickMark.span]);
        var position = spanArray.indexOf(tickMark);
        if (position !== -1) {
            // Keeps array sorted
            spanArray.splice(position, 1);
        }
    };
    return TickMarks;
}());

/**
 * This is the collection of time points, that allows to store and find the every time point using it's index.
 */
var TimePoints = /** @class */ (function () {
    function TimePoints() {
        this._private__items = [];
    }
    TimePoints.prototype.clear = function () {
        this._private__items = [];
    };
    TimePoints.prototype.size = function () {
        return this._private__items.length;
    };
    TimePoints.prototype.firstIndex = function () {
        return this._private__offsetToIndex(0);
    };
    TimePoints.prototype.lastIndex = function () {
        return this._private__offsetToIndex(this._private__items.length - 1);
    };
    TimePoints.prototype.merge = function (index, values) {
        if (values.length === 0) {
            return;
        }
        // assume that 'values' contains at least one TimePoint
        if (this._private__items.length === 0) {
            this._private__items = values;
            return;
        }
        var start = index;
        if (start < 0) {
            var n = Math.abs(start);
            if (values.length < n) {
                return;
            }
            // tslint:disable-next-line:prefer-array-literal
            this._private__items = new Array(n).concat(this._private__items);
            // tslint:disable-next-line:no-shadowed-variable
            for (var i_1 = 0; i_1 < values.length; ++i_1) {
                this._private__items[index + i_1] = values[i_1];
            }
            return;
        }
        var i = start;
        for (; i < this._private__items.length && (i - start) < values.length; ++i) {
            this._private__items[i] = values[i - start];
        }
        var end = start + values.length;
        if (end > this._private__items.length) {
            var n = end - this._private__items.length;
            for (var j = i; j < i + n; ++j) {
                this._private__items.push(values[j - start]);
            }
        }
    };
    TimePoints.prototype.valueAt = function (index) {
        var offset = this._private__indexToOffset(index);
        if (offset !== null) {
            return this._private__items[offset];
        }
        return null;
    };
    TimePoints.prototype.indexOf = function (time, findNearest) {
        if (this._private__items.length < 1) {
            // no time points available
            return null;
        }
        if (time > this._private__items[this._private__items.length - 1].timestamp) {
            // special case
            return findNearest ? this._private__items.length - 1 : null;
        }
        for (var i = 0; i < this._private__items.length; ++i) {
            if (time === this._private__items[i].timestamp) {
                return i;
            }
            if (time < this._private__items[i].timestamp) {
                return findNearest ? i : null;
            }
        }
        // in fact, this code is unreachable because we already
        // have special case for time > this._items[this._items.length - 1]
        return null;
    };
    TimePoints.prototype.closestIndexLeft = function (time) {
        var items = this._private__items;
        if (!items.length) {
            return null;
        }
        if (Number.isNaN(time.timestamp)) {
            return null;
        }
        var maxOffset = items.length - 1;
        var maxTime = items[maxOffset];
        if (time >= maxTime) {
            return maxOffset;
        }
        var minOffset = 0;
        var minTime = items[minOffset];
        if (time < minTime) {
            return null;
        }
        else if (time === minTime) {
            return minOffset;
        }
        // binary search
        while (maxOffset > minOffset + 1) {
            var testOffset = (minOffset + maxOffset) >> 1;
            var testValue = items[testOffset];
            if (testValue.timestamp > time.timestamp) {
                maxOffset = testOffset;
            }
            else if (testValue.timestamp < time.timestamp) {
                minOffset = testOffset;
            }
            else if (testValue.timestamp === time.timestamp) {
                return testOffset;
            }
            else {
                return null;
            }
        }
        return minOffset;
    };
    TimePoints.prototype._private__offsetToIndex = function (offset) {
        if (0 <= offset && offset < this.size()) {
            return offset;
        }
        return null;
    };
    TimePoints.prototype._private__indexToOffset = function (index) {
        if (0 <= index && index < this.size()) {
            return index;
        }
        return null;
    };
    return TimePoints;
}());

var Constants$3;
(function (Constants) {
    Constants[Constants["DefaultAnimationDuration"] = 400] = "DefaultAnimationDuration";
    Constants[Constants["MinBarSpacing"] = 0.5] = "MinBarSpacing";
    // make sure that this (1 / MinVisibleBarsCount) >= coeff in max bar spacing
    Constants[Constants["MinVisibleBarsCount"] = 2] = "MinVisibleBarsCount";
})(Constants$3 || (Constants$3 = {}));
var MarkSpanBorder;
(function (MarkSpanBorder) {
    MarkSpanBorder[MarkSpanBorder["Minute"] = 20] = "Minute";
    MarkSpanBorder[MarkSpanBorder["Hour"] = 30] = "Hour";
    MarkSpanBorder[MarkSpanBorder["Day"] = 40] = "Day";
    MarkSpanBorder[MarkSpanBorder["Week"] = 50] = "Week";
    MarkSpanBorder[MarkSpanBorder["Month"] = 60] = "Month";
    MarkSpanBorder[MarkSpanBorder["Year"] = 70] = "Year";
})(MarkSpanBorder || (MarkSpanBorder = {}));
var TimeScale = /** @class */ (function () {
    function TimeScale(model, options, localizationOptions) {
        this._private__width = 0;
        this._private__baseIndexOrNull = null;
        this._private__points = new TimePoints();
        this._private__scrollStartPoint = null;
        this._private__scaleStartPoint = null;
        this._private__tickMarks = new TickMarks();
        this._private__formattedBySpan = new Map();
        this._private__visibleBars = null;
        this._private__visibleBarsInvalidated = true;
        this._private__visibleBarsChanged = new Delegate();
        this._private__optionsApplied = new Delegate();
        this._private__leftEdgeIndex = null;
        this._private__commonTransitionStartState = null;
        this._private__timeMarksCache = null;
        this._private__labels = [];
        this._private__options = options;
        this._private__localizationOptions = localizationOptions;
        this._private__rightOffset = options.rightOffset;
        this._private__barSpacing = options.barSpacing;
        this._private__model = model;
        this._private__updateDateTimeFormatter();
    }
    TimeScale.prototype.options = function () {
        return this._private__options;
    };
    TimeScale.prototype.applyLocalizationOptions = function (localizationOptions) {
        merge(this._private__localizationOptions, localizationOptions);
        this._private__invalidateTickMarks();
        this._private__updateDateTimeFormatter();
    };
    TimeScale.prototype.applyOptions = function (options, localizationOptions) {
        merge(this._private__options, options);
        if (this._private__options.fixLeftEdge) {
            this._private__fixLeftEdge();
        }
        else {
            this._private__leftEdgeIndex = null;
        }
        // note that bar spacing should be applied before right offset
        // because right offset depends on bar spacing
        if (options.barSpacing !== undefined) {
            this.setBarSpacing(options.barSpacing);
        }
        if (options.rightOffset !== undefined) {
            this.setRightOffset(options.rightOffset);
        }
        this._private__invalidateTickMarks();
        this._private__updateDateTimeFormatter();
        this._private__optionsApplied.fire();
    };
    TimeScale.prototype.isEmpty = function () {
        return this._private__width === 0 || this._private__points.size() === 0;
    };
    TimeScale.prototype.visibleBars = function () {
        if (this._private__visibleBarsInvalidated) {
            this._private__visibleBarsInvalidated = false;
            this._private__updateVisibleBars();
        }
        return this._private__visibleBars;
    };
    TimeScale.prototype.tickMarks = function () {
        return this._private__tickMarks;
    };
    TimeScale.prototype.points = function () {
        return this._private__points;
    };
    TimeScale.prototype.width = function () {
        return this._private__width;
    };
    TimeScale.prototype.setWidth = function (width) {
        if (!isFinite(width) || width <= 0) {
            return;
        }
        if (this._private__width === width) {
            return;
        }
        if (this._private__options.lockVisibleTimeRangeOnResize && this._private__width) {
            // recalculate bar spacing
            var newBarSpacing = this._private__barSpacing * width / this._private__width;
            this._private__setBarSpacing(newBarSpacing);
        }
        // if time scale is scrolled to the end of data and we have fixed right edge
        // keep left edge instead of right
        // we need it to avoid "shaking" if the last bar visibility affects time scale width
        if (this._private__leftEdgeIndex !== null) {
            var firstVisibleBar = ensureNotNull(this.visibleBars()).firstBar();
            // firstVisibleBar could be less than this._leftEdgeIndex
            // since index is a center of bar
            if (firstVisibleBar <= this._private__leftEdgeIndex) {
                var delta = this._private__width - width;
                // reduce  _rightOffset means move right
                // we could move more than required - this will be fixed by _correctOffset()
                this._private__rightOffset -= Math.round(delta / this._private__barSpacing) + 1;
            }
        }
        this._private__width = width;
        this._private__visibleBarsInvalidated = true;
        // updating bar spacing should be first because right offset depends on it
        this._private__correctBarSpacing();
        this._private__correctOffset();
    };
    TimeScale.prototype.indexToCoordinate = function (index) {
        if (this.isEmpty() || !isInteger(index)) {
            return 0;
        }
        var baseIndex = this.baseIndex();
        var deltaFromRight = baseIndex + this._private__rightOffset - index;
        var coordinate = this._private__width - (deltaFromRight + 0.5) * this._private__barSpacing;
        return coordinate;
    };
    TimeScale.prototype.indexesToCoordinates = function (points, visibleRange) {
        var baseIndex = this.baseIndex();
        var indexFrom = (visibleRange === undefined) ? 0 : visibleRange.from;
        var indexTo = (visibleRange === undefined) ? points.length : visibleRange.to;
        for (var i = indexFrom; i < indexTo; i++) {
            var index = points[i].time;
            var deltaFromRight = baseIndex + this._private__rightOffset - index;
            var coordinate = this._private__width - (deltaFromRight + 0.5) * this._private__barSpacing;
            points[i].x = coordinate;
        }
    };
    TimeScale.prototype.indexToUserTime = function (index) {
        return this._private__tickMarks.indexToTime(index);
    };
    TimeScale.prototype.coordinateToIndex = function (x) {
        return Math.ceil(this._private__coordinateToFloatIndex(x));
    };
    TimeScale.prototype.setRightOffset = function (offset) {
        this._private__visibleBarsInvalidated = true;
        this._private__rightOffset = offset;
        this._private__correctOffset();
        this._private__model.recalculateAllPanes();
        this._private__model.lightUpdate();
    };
    TimeScale.prototype.barSpacing = function () {
        return this._private__barSpacing;
    };
    TimeScale.prototype.setBarSpacing = function (newBarSpacing) {
        this._private__setBarSpacing(newBarSpacing);
        // do not allow scroll out of visible bars
        this._private__correctOffset();
        this._private__model.recalculateAllPanes();
        this._private__model.lightUpdate();
    };
    TimeScale.prototype.rightOffset = function () {
        return this._private__rightOffset;
    };
    TimeScale.prototype.marks = function () {
        if (this.isEmpty()) {
            return null;
        }
        if (this._private__timeMarksCache !== null) {
            return this._private__timeMarksCache;
        }
        var spacing = this._private__barSpacing;
        var fontSize = this._private__model.options().layout.fontSize;
        var maxLabelWidth = (fontSize + 4) * 5;
        var indexPerLabel = Math.round(maxLabelWidth / spacing);
        var visibleBars = ensureNotNull(this.visibleBars());
        var firstBar = Math.max(visibleBars.firstBar(), visibleBars.firstBar() - indexPerLabel);
        var lastBar = Math.max(visibleBars.lastBar(), visibleBars.lastBar() - indexPerLabel);
        var items = this._private__tickMarks.build(spacing, maxLabelWidth);
        var targetIndex = 0;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var tm = items_1[_i];
            if (!(firstBar <= tm.index && tm.index <= lastBar)) {
                continue;
            }
            var time = this._private__tickMarks.indexToTime(tm.index);
            if (time === null) {
                continue;
            }
            if (targetIndex < this._private__labels.length) {
                var label = this._private__labels[targetIndex];
                label.coord = this.indexToCoordinate(tm.index);
                label.label = this._private__formatLabel(time, tm.span);
                label.span = tm.span;
                label.major = false;
            }
            else {
                this._private__labels.push({
                    coord: this.indexToCoordinate(tm.index),
                    label: this._private__formatLabel(time, tm.span),
                    span: tm.span,
                    major: false,
                });
            }
            targetIndex++;
        }
        this._private__labels.length = targetIndex;
        this._private__timeMarksCache = this._private__labels;
        return this._private__labels;
    };
    TimeScale.prototype.reset = function () {
        this._private__visibleBarsInvalidated = true;
        this._private__points = new TimePoints();
        this._private__scrollStartPoint = null;
        this._private__scaleStartPoint = null;
        this._private__clearCommonTransitionsStartState();
        this._private__tickMarks.reset();
        this._private__leftEdgeIndex = null;
    };
    TimeScale.prototype.restoreDefault = function () {
        this._private__visibleBarsInvalidated = true;
        this.setBarSpacing(this._private__options.barSpacing);
        this.setRightOffset(this._private__options.rightOffset);
    };
    TimeScale.prototype.fixLeftEdge = function () {
        return this._private__options.fixLeftEdge;
    };
    TimeScale.prototype.setBaseIndex = function (baseIndex) {
        this._private__visibleBarsInvalidated = true;
        this._private__baseIndexOrNull = baseIndex;
        this._private__correctOffset();
        this._private__fixLeftEdge();
    };
    /**
     * Zoom in/out the scale around a `zoomPoint` on `scale` value.
     * @param zoomPoint - X coordinate of the point to apply the zoom.
     *   If `rightBarStaysOnScroll` option is disabled, then will be used to restore right offset.
     * @param scale - Zoom value (in 1/10 parts of current bar spacing).
     *   Negative value means zoom out, positive - zoom in.
     */
    TimeScale.prototype.zoom = function (zoomPoint, scale) {
        var floatIndexAtZoomPoint = this._private__coordinateToFloatIndex(zoomPoint);
        var barSpacing = this.barSpacing();
        var newBarSpacing = barSpacing + scale * (barSpacing / 10);
        // zoom in/out bar spacing
        this.setBarSpacing(newBarSpacing);
        if (!this._private__options.rightBarStaysOnScroll) {
            // and then correct right offset to move index under zoomPoint back to its coordinate
            this.setRightOffset(this.rightOffset() + (floatIndexAtZoomPoint - this._private__coordinateToFloatIndex(zoomPoint)));
        }
    };
    TimeScale.prototype.startScale = function (x) {
        if (this._private__scrollStartPoint) {
            this.endScroll();
        }
        if (this._private__scaleStartPoint !== null || this._private__commonTransitionStartState !== null) {
            return;
        }
        if (this.isEmpty()) {
            return;
        }
        this._private__scaleStartPoint = x;
        this._private__saveCommonTransitionsStartState();
    };
    TimeScale.prototype.scaleTo = function (x) {
        if (this._private__commonTransitionStartState === null) {
            return;
        }
        var startLengthFromRight = clamp(this._private__width - x, 0, this._private__width);
        var currentLengthFromRight = clamp(this._private__width - ensureNotNull(this._private__scaleStartPoint), 0, this._private__width);
        if (startLengthFromRight === 0 || currentLengthFromRight === 0) {
            return;
        }
        this.setBarSpacing(this._private__commonTransitionStartState.barSpacing * startLengthFromRight / currentLengthFromRight);
    };
    TimeScale.prototype.endScale = function () {
        if (this._private__scaleStartPoint === null) {
            return;
        }
        this._private__scaleStartPoint = null;
        this._private__clearCommonTransitionsStartState();
    };
    TimeScale.prototype.startScroll = function (x) {
        if (this._private__scrollStartPoint !== null || this._private__commonTransitionStartState !== null) {
            return;
        }
        if (this.isEmpty()) {
            return;
        }
        this._private__scrollStartPoint = x;
        this._private__saveCommonTransitionsStartState();
    };
    TimeScale.prototype.scrollTo = function (x) {
        this._private__visibleBarsInvalidated = true;
        if (this._private__scrollStartPoint === null) {
            return;
        }
        var shiftInLogical = (this._private__scrollStartPoint - x) / this.barSpacing();
        this._private__rightOffset = ensureNotNull(this._private__commonTransitionStartState).rightOffset + shiftInLogical;
        this._private__visibleBarsInvalidated = true;
        // do not allow scroll out of visible bars
        this._private__correctOffset();
    };
    TimeScale.prototype.endScroll = function () {
        if (this._private__scrollStartPoint === null) {
            return;
        }
        this._private__scrollStartPoint = null;
        this._private__clearCommonTransitionsStartState();
    };
    TimeScale.prototype.scrollToRealTime = function () {
        this.scrollToOffsetAnimated(this._private__options.rightOffset);
    };
    TimeScale.prototype.scrollToOffsetAnimated = function (offset, animationDuration) {
        var _this = this;
        if (animationDuration === void 0) { animationDuration = 400 /* DefaultAnimationDuration */; }
        if (!isFinite(offset)) {
            throw new RangeError('offset is required and must be finite number');
        }
        if (!isFinite(animationDuration) || animationDuration <= 0) {
            throw new RangeError('animationDuration (optional) must be finite positive number');
        }
        var source = this._private__rightOffset;
        var animationStart = new Date().getTime();
        var animationFn = function () {
            var animationProgress = (new Date().getTime() - animationStart) / animationDuration;
            var finishAnimation = animationProgress >= 1;
            var rightOffset = finishAnimation ? offset : source + (offset - source) * animationProgress;
            _this.setRightOffset(rightOffset);
            if (!finishAnimation) {
                setTimeout(animationFn, 20);
            }
        };
        animationFn();
    };
    TimeScale.prototype.update = function (index, values, marks) {
        this._private__visibleBarsInvalidated = true;
        if (values.length > 0) {
            // we have some time points to merge
            var oldSize = this._private__points.size();
            this._private__points.merge(index, values);
            if (this._private__rightOffset < 0 && (this._private__points.size() === oldSize + 1)) {
                this._private__rightOffset -= 1;
                this._private__visibleBarsInvalidated = true;
            }
        }
        this._private__tickMarks.merge(marks);
        this._private__correctOffset();
    };
    TimeScale.prototype.visibleBarsChanged = function () {
        return this._private__visibleBarsChanged;
    };
    TimeScale.prototype.optionsApplied = function () {
        return this._private__optionsApplied;
    };
    TimeScale.prototype.baseIndex = function () {
        // null is used to known that baseIndex is not set yet
        // so in methods which should known whether it is set or not
        // we should check field `_baseIndexOrNull` instead of getter `baseIndex()`
        // see minRightOffset for example
        return this._private__baseIndexOrNull || 0;
    };
    TimeScale.prototype.setVisibleRange = function (range) {
        var length = range.count();
        this._private__setBarSpacing(this._private__width / length);
        this._private__rightOffset = range.lastBar() - this.baseIndex();
        this._private__correctOffset();
        this._private__visibleBarsInvalidated = true;
        this._private__model.recalculateAllPanes();
        this._private__model.lightUpdate();
    };
    TimeScale.prototype.fitContent = function () {
        var first = this._private__points.firstIndex();
        var last = this._private__points.lastIndex();
        if (first === null || last === null) {
            return;
        }
        this.setVisibleRange(new BarsRange(first, last + this._private__options.rightOffset));
    };
    TimeScale.prototype.setTimePointsRange = function (range) {
        var points = this.points();
        var firstIndex = points.firstIndex();
        var lastIndex = points.lastIndex();
        if (firstIndex === null || lastIndex === null) {
            return;
        }
        var firstPoint = ensureNotNull(points.valueAt(firstIndex)).timestamp;
        var lastPoint = ensureNotNull(points.valueAt(lastIndex)).timestamp;
        var barRange = new BarsRange(ensureNotNull(points.indexOf(Math.max(firstPoint, range.from.timestamp), true)), ensureNotNull(points.indexOf(Math.min(lastPoint, range.to.timestamp), true)));
        this.setVisibleRange(barRange);
    };
    TimeScale.prototype.formatDateTime = function (time) {
        if (this._private__localizationOptions.timeFormatter !== undefined) {
            return this._private__localizationOptions.timeFormatter(time.businessDay || time.timestamp);
        }
        return this._private__dateTimeFormatter.format(new Date(time.timestamp * 1000));
    };
    TimeScale.prototype._private__rightOffsetForCoordinate = function (x) {
        return (this._private__width + 1 - x) / this._private__barSpacing;
    };
    TimeScale.prototype._private__coordinateToFloatIndex = function (x) {
        var deltaFromRight = this._private__rightOffsetForCoordinate(x);
        var baseIndex = this.baseIndex();
        var index = baseIndex + this._private__rightOffset - deltaFromRight;
        // JavaScript uses very strange rounding
        // we need rounding to avoid problems with calculation errors
        return Math.round(index * 1000000) / 1000000;
    };
    TimeScale.prototype._private__setBarSpacing = function (newBarSpacing) {
        var oldBarSpacing = this._private__barSpacing;
        this._private__barSpacing = newBarSpacing;
        this._private__correctBarSpacing();
        // this._barSpacing might be changed in _correctBarSpacing
        if (oldBarSpacing !== this._private__barSpacing) {
            this._private__visibleBarsInvalidated = true;
            this._private__resetTimeMarksCache();
        }
    };
    TimeScale.prototype._private__updateVisibleBars = function () {
        if (this.isEmpty()) {
            this._private__setVisibleBars(null);
            return;
        }
        var baseIndex = this.baseIndex();
        var newBarsLength = Math.ceil(this._private__width / this._private__barSpacing) - 1;
        var rightIndex = Math.round(this._private__rightOffset + baseIndex);
        var leftIndex = rightIndex - newBarsLength;
        this._private__setVisibleBars(new BarsRange(leftIndex, rightIndex));
    };
    TimeScale.prototype._private__correctBarSpacing = function () {
        if (this._private__barSpacing < 0.5 /* MinBarSpacing */) {
            this._private__barSpacing = 0.5 /* MinBarSpacing */;
            this._private__visibleBarsInvalidated = true;
        }
        if (this._private__width !== 0) {
            // make sure that this (1 / Constants.MinVisibleBarsCount) >= coeff in max bar spacing (it's 0.5 here)
            var maxBarSpacing = this._private__width * 0.5;
            if (this._private__barSpacing > maxBarSpacing) {
                this._private__barSpacing = maxBarSpacing;
                this._private__visibleBarsInvalidated = true;
            }
        }
    };
    TimeScale.prototype._private__correctOffset = function () {
        // block scrolling of to future
        var maxRightOffset = this._private__maxRightOffset();
        if (this._private__rightOffset > maxRightOffset) {
            this._private__rightOffset = maxRightOffset;
            this._private__visibleBarsInvalidated = true;
        }
        // block scrolling of to past
        var minRightOffset = this._private__minRightOffset();
        if (minRightOffset !== null && this._private__rightOffset < minRightOffset) {
            this._private__rightOffset = minRightOffset;
            this._private__visibleBarsInvalidated = true;
        }
    };
    TimeScale.prototype._private__minRightOffset = function () {
        var firstIndex = this._private__points.firstIndex();
        var baseIndex = this._private__baseIndexOrNull;
        if (firstIndex === null || baseIndex === null) {
            return null;
        }
        if (this._private__leftEdgeIndex !== null) {
            var barsEstimation = this._private__width / this._private__barSpacing;
            return this._private__leftEdgeIndex - baseIndex + barsEstimation - 1;
        }
        return firstIndex - baseIndex - 1 + Math.min(2 /* MinVisibleBarsCount */, this._private__points.size());
    };
    TimeScale.prototype._private__maxRightOffset = function () {
        return (this._private__width / this._private__barSpacing) - Math.min(2 /* MinVisibleBarsCount */, this._private__points.size());
    };
    TimeScale.prototype._private__saveCommonTransitionsStartState = function () {
        this._private__commonTransitionStartState = {
            barSpacing: this.barSpacing(),
            rightOffset: this.rightOffset(),
        };
    };
    TimeScale.prototype._private__clearCommonTransitionsStartState = function () {
        this._private__commonTransitionStartState = null;
    };
    TimeScale.prototype._private__formatLabel = function (time, span) {
        var _this = this;
        var formatter = this._private__formattedBySpan.get(span);
        if (formatter === undefined) {
            formatter = new FormattedLabelsCache(function (date) {
                return _this._private__formatLabelImpl(date, span);
            });
            this._private__formattedBySpan.set(span, formatter);
        }
        if (time.businessDay === undefined) {
            return formatter.format(new Date(time.timestamp * 1000));
        }
        else {
            return formatter.format(new Date(Date.UTC(time.businessDay.year, time.businessDay.month - 1, time.businessDay.day)));
        }
    };
    TimeScale.prototype._private__formatLabelImpl = function (d, span) {
        var formatOptions = {};
        var timeVisible = this._private__options.timeVisible;
        if (span < 20 /* Minute */ && timeVisible) {
            formatOptions.hour12 = false;
            formatOptions.hour = '2-digit';
            formatOptions.minute = '2-digit';
            if (this._private__options.secondsVisible) {
                formatOptions.second = '2-digit';
            }
        }
        else if (span < 40 /* Day */ && timeVisible) {
            formatOptions.hour12 = false;
            formatOptions.hour = '2-digit';
            formatOptions.minute = '2-digit';
        }
        else if (span < 50 /* Week */) {
            formatOptions.day = 'numeric';
        }
        else if (span < 60 /* Month */) {
            formatOptions.day = 'numeric';
        }
        else if (span < 70 /* Year */) {
            formatOptions.month = 'short';
        }
        else {
            formatOptions.year = 'numeric';
        }
        // from given date we should use only as UTC date or timestamp
        // but to format as locale date we can convert UTC date to local date
        var localDateFromUtc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
        return localDateFromUtc.toLocaleString(this._private__localizationOptions.locale, formatOptions);
    };
    TimeScale.prototype._private__setVisibleBars = function (visibleBars) {
        if (visibleBars === null && this._private__visibleBars === null) {
            return;
        }
        var oldVisibleBars = this._private__visibleBars;
        this._private__visibleBars = visibleBars;
        if (this._private__visibleBars === null || oldVisibleBars !== null && !this._private__visibleBars.equals(oldVisibleBars)) {
            this._private__visibleBarsChanged.fire();
        }
        // TODO: reset only coords in case when this._visibleBars has not been changed
        this._private__resetTimeMarksCache();
    };
    TimeScale.prototype._private__resetTimeMarksCache = function () {
        this._private__timeMarksCache = null;
    };
    TimeScale.prototype._private__invalidateTickMarks = function () {
        this._private__resetTimeMarksCache();
        this._private__formattedBySpan.clear();
    };
    TimeScale.prototype._private__updateDateTimeFormatter = function () {
        var dateFormat = this._private__localizationOptions.dateFormat;
        if (this._private__options.timeVisible) {
            this._private__dateTimeFormatter = new DateTimeFormatter({
                dateFormat: dateFormat,
                timeFormat: this._private__options.secondsVisible ? '%h:%m:%s' : '%h:%m',
                dateTimeSeparator: '   ',
                locale: this._private__localizationOptions.locale,
            });
        }
        else {
            this._private__dateTimeFormatter = new DateFormatter(dateFormat, this._private__localizationOptions.locale);
        }
    };
    TimeScale.prototype._private__fixLeftEdge = function () {
        if (!this._private__options.fixLeftEdge) {
            return;
        }
        var firstIndex = this._private__points.firstIndex();
        if (firstIndex === null || this._private__leftEdgeIndex === firstIndex) {
            return;
        }
        this._private__leftEdgeIndex = firstIndex;
        var delta = ensureNotNull(this.visibleBars()).firstBar() - firstIndex;
        if (delta < 0) {
            var leftEdgeOffset = this._private__rightOffset - delta - 1;
            this.setRightOffset(leftEdgeOffset);
        }
    };
    return TimeScale;
}());

var WatermarkRenderer = /** @class */ (function (_super) {
    __extends(WatermarkRenderer, _super);
    function WatermarkRenderer(data) {
        var _this = _super.call(this) || this;
        _this._private__metricsCache = new Map();
        _this._private__data = data;
        return _this;
    }
    WatermarkRenderer.prototype._drawImpl = function (ctx) {
    };
    WatermarkRenderer.prototype._drawBackgroundImpl = function (ctx) {
        if (!this._private__data.visible) {
            return;
        }
        ctx.save();
        var textHeight = 0;
        for (var _i = 0, _a = this._private__data.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            if (line.text.length === 0) {
                continue;
            }
            ctx.font = line.font;
            var textWidth = this._private__metrics(ctx, line.text);
            if (textWidth > this._private__data.width) {
                line.zoom = this._private__data.width / textWidth;
            }
            else {
                line.zoom = 1;
            }
            textHeight += line.lineHeight * line.zoom;
        }
        var vertOffset = 0;
        switch (this._private__data.vertAlign) {
            case 'top':
                vertOffset = 0;
                break;
            case 'center':
                vertOffset = Math.max((this._private__data.height - textHeight) / 2, 0);
                break;
            case 'bottom':
                vertOffset = Math.max((this._private__data.height - textHeight), 0);
                break;
        }
        ctx.fillStyle = this._private__data.color;
        for (var _b = 0, _c = this._private__data.lines; _b < _c.length; _b++) {
            var line = _c[_b];
            ctx.save();
            var horzOffset = 0;
            switch (this._private__data.horzAlign) {
                case 'left':
                    ctx.textAlign = 'left';
                    horzOffset = line.lineHeight / 2;
                    break;
                case 'center':
                    ctx.textAlign = 'center';
                    horzOffset = this._private__data.width / 2;
                    break;
                case 'right':
                    ctx.textAlign = 'right';
                    horzOffset = this._private__data.width - 1 - line.lineHeight / 2;
                    break;
            }
            ctx.translate(horzOffset, vertOffset);
            ctx.textBaseline = 'top';
            ctx.font = line.font;
            ctx.scale(line.zoom, line.zoom);
            ctx.fillText(line.text, 0, line.vertOffset);
            ctx.restore();
            vertOffset += line.lineHeight * line.zoom;
        }
        ctx.restore();
    };
    WatermarkRenderer.prototype._private__metrics = function (ctx, text) {
        var fontCache = this._private__fontCache(ctx.font);
        var result = fontCache.get(text);
        if (result === undefined) {
            result = ctx.measureText(text).width;
            fontCache.set(text, result);
        }
        return result;
    };
    WatermarkRenderer.prototype._private__fontCache = function (font) {
        var fontCache = this._private__metricsCache.get(font);
        if (fontCache === undefined) {
            fontCache = new Map();
            this._private__metricsCache.set(font, fontCache);
        }
        return fontCache;
    };
    return WatermarkRenderer;
}(ScaledRenderer));

var WatermarkPaneView = /** @class */ (function () {
    function WatermarkPaneView(source) {
        this._private__invalidated = true;
        this._private__rendererData = {
            visible: false,
            color: '',
            height: 0,
            width: 0,
            lines: [],
            vertAlign: 'center',
            horzAlign: 'center',
        };
        this._private__renderer = new WatermarkRenderer(this._private__rendererData);
        this._private__source = source;
    }
    WatermarkPaneView.prototype.update = function () {
        this._private__invalidated = true;
    };
    WatermarkPaneView.prototype.renderer = function (height, width) {
        if (this._private__invalidated) {
            this._private__updateImpl(height, width);
            this._private__invalidated = false;
        }
        return this._private__renderer;
    };
    WatermarkPaneView.prototype._private__updateImpl = function (height, width) {
        var options = this._private__source.options();
        var data = this._private__rendererData;
        data.visible = options.visible;
        if (!data.visible) {
            return;
        }
        data.color = options.color;
        data.width = width;
        data.height = height;
        data.horzAlign = options.horzAlign;
        data.vertAlign = options.vertAlign;
        data.lines = [
            {
                text: options.text,
                font: makeFont(options.fontSize),
                lineHeight: options.fontSize * 1.2,
                vertOffset: 0,
                zoom: 0,
            },
        ];
    };
    return WatermarkPaneView;
}());

var Watermark = /** @class */ (function (_super) {
    __extends(Watermark, _super);
    function Watermark(model, options) {
        var _this = _super.call(this) || this;
        _this._private__options = options;
        _this._private__paneView = new WatermarkPaneView(_this);
        return _this;
    }
    Watermark.prototype.paneViews = function () {
        return [this._private__paneView];
    };
    Watermark.prototype.options = function () {
        return this._private__options;
    };
    Watermark.prototype.updateAllViews = function () {
        this._private__paneView.update();
    };
    return Watermark;
}(DataSource));

var ChartModel = /** @class */ (function () {
    function ChartModel(invalidateHandler, options) {
        this._private__panes = [];
        this._private__serieses = [];
        this._private__width = 0;
        this._private__initialTimeScrollPos = null;
        this._private__hoveredSource = null;
        this._private__mainPriceScaleOptionsChanged = new Delegate();
        this._private__crosshairMoved = new Delegate();
        this._private__invalidateHandler = invalidateHandler;
        this._private__options = options;
        this._private__rendererOptionsProvider = new PriceAxisRendererOptionsProvider(this);
        this._private__timeScale = new TimeScale(this, options.timeScale, this._private__options.localization);
        this._private__grid = new Grid();
        this._private__crosshair = new Crosshair(this, options.crosshair);
        this._private__magnet = new Magnet(options.crosshair);
        this._private__watermark = new Watermark(this, options.watermark);
        this.createPane();
        this._private__panes[0].setStretchFactor(DEFAULT_STRETCH_FACTOR * 2);
        this._private__panes[0].addDataSource(this._private__watermark, true, false);
    }
    ChartModel.prototype.fullUpdate = function () {
        this._private__invalidate(new InvalidateMask(3 /* Full */));
    };
    ChartModel.prototype.lightUpdate = function () {
        this._private__invalidate(new InvalidateMask(2 /* Light */));
    };
    ChartModel.prototype.updateSource = function (source) {
        var inv = this._private__invalidationMaskForSource(source);
        this._private__invalidate(inv);
    };
    ChartModel.prototype.hoveredSource = function () {
        return this._private__hoveredSource;
    };
    ChartModel.prototype.setHoveredSource = function (source) {
        var prevSource = this._private__hoveredSource;
        this._private__hoveredSource = source;
        if (prevSource !== null) {
            this.updateSource(prevSource.source);
        }
        if (source !== null) {
            this.updateSource(source.source);
        }
    };
    ChartModel.prototype.options = function () {
        return this._private__options;
    };
    ChartModel.prototype.applyOptions = function (options) {
        // TODO: implement this
        merge(this._private__options, options);
        if (options.priceScale !== undefined) {
            this.mainPriceScale().applyOptions(options.priceScale);
            this._private__mainPriceScaleOptionsChanged.fire();
        }
        if (options.timeScale !== undefined) {
            this._private__timeScale.applyOptions(options.timeScale);
        }
        if (options.localization !== undefined) {
            this._private__timeScale.applyLocalizationOptions(options.localization);
            this.mainPriceScale().updateFormatter();
        }
        this.fullUpdate();
    };
    ChartModel.prototype.updateAllPaneViews = function () {
        this._private__panes.forEach(function (p) { return p.updateAllViews(); });
        this.updateCrosshair();
    };
    ChartModel.prototype.timeScale = function () {
        return this._private__timeScale;
    };
    ChartModel.prototype.panes = function () {
        return this._private__panes;
    };
    ChartModel.prototype.gridSource = function () {
        return this._private__grid;
    };
    ChartModel.prototype.watermarkSource = function () {
        return this._private__watermark;
    };
    ChartModel.prototype.crosshairSource = function () {
        return this._private__crosshair;
    };
    ChartModel.prototype.crosshairMoved = function () {
        return this._private__crosshairMoved;
    };
    ChartModel.prototype.width = function () {
        return this._private__width;
    };
    ChartModel.prototype.setPaneHeight = function (pane, height) {
        pane.setHeight(height);
        this.recalculateAllPanes();
        this.lightUpdate();
    };
    ChartModel.prototype.setWidth = function (width) {
        this._private__width = width;
        this._private__timeScale.setWidth(this._private__width);
        this._private__panes.forEach(function (pane) { return pane.setWidth(width); });
        this.recalculateAllPanes();
    };
    ChartModel.prototype.createPane = function (index) {
        var pane = new Pane(this._private__timeScale, this);
        if (index !== undefined) {
            this._private__panes.splice(index, 0, pane);
        }
        else {
            // adding to the end - common case
            this._private__panes.push(pane);
        }
        var actualIndex = index === undefined ? this._private__panes.length - 1 : index;
        // we always do autoscaling on the creation
        // if autoscale option is true, it is ok, just recalculate by invalidation mask
        // if autoscale option is false, autoscale anyway on the first draw
        // also there is a scenario when autoscale is true in constructor and false later on applyOptions
        var mask = new InvalidateMask(3 /* Full */);
        mask.invalidatePane(actualIndex, {
            level: 0 /* None */,
            autoScale: true,
        });
        this.invalidate(mask);
        return pane;
    };
    ChartModel.prototype.startScalePrice = function (pane, priceScale, x) {
        pane.startScalePrice(priceScale, x);
    };
    ChartModel.prototype.scalePriceTo = function (pane, priceScale, x) {
        pane.scalePriceTo(priceScale, x);
        this.updateCrosshair();
        this._private__invalidate(this._private__paneInvalidationMask(pane, 2 /* Light */));
    };
    ChartModel.prototype.endScalePrice = function (pane, priceScale) {
        pane.endScalePrice(priceScale);
        this._private__invalidate(this._private__paneInvalidationMask(pane, 2 /* Light */));
    };
    ChartModel.prototype.startScrollPrice = function (pane, priceScale, x) {
        if (priceScale.isAutoScale()) {
            return;
        }
        pane.startScrollPrice(priceScale, x);
    };
    ChartModel.prototype.scrollPriceTo = function (pane, priceScale, x) {
        if (priceScale.isAutoScale()) {
            return;
        }
        pane.scrollPriceTo(priceScale, x);
        this.updateCrosshair();
        this._private__invalidate(this._private__paneInvalidationMask(pane, 2 /* Light */));
    };
    ChartModel.prototype.endScrollPrice = function (pane, priceScale) {
        if (priceScale.isAutoScale()) {
            return;
        }
        pane.endScrollPrice(priceScale);
        this._private__invalidate(this._private__paneInvalidationMask(pane, 2 /* Light */));
    };
    ChartModel.prototype.setPriceAutoScale = function (pane, priceScale, autoScale) {
        pane.setPriceAutoScale(priceScale, autoScale);
        this._private__invalidate(this._private__paneInvalidationMask(pane, 2 /* Light */));
    };
    ChartModel.prototype.resetPriceScale = function (pane, priceScale) {
        pane.resetPriceScale(priceScale);
        this._private__invalidate(this._private__paneInvalidationMask(pane, 2 /* Light */));
    };
    ChartModel.prototype.startScaleTime = function (position) {
        this._private__timeScale.startScale(position);
    };
    /**
     * Zoom in/out the chart (depends on scale value).
     * @param pointX - X coordinate of the point to apply the zoom (the point which should stay on its place)
     * @param scale - Zoom value. Negative value means zoom out, positive - zoom in.
     */
    ChartModel.prototype.zoomTime = function (pointX, scale) {
        var timeScale = this.timeScale();
        if (timeScale.isEmpty() || scale === 0) {
            return;
        }
        var timeScaleWidth = timeScale.width();
        pointX = Math.max(1, Math.min(pointX, timeScaleWidth));
        timeScale.zoom(pointX, scale);
        this.updateCrosshair();
        this.recalculateAllPanes();
        this.lightUpdate();
    };
    ChartModel.prototype.scrollChart = function (x) {
        this.startScrollTime(0);
        this.scrollTimeTo(x);
        this.endScrollTime();
    };
    ChartModel.prototype.scaleTimeTo = function (x) {
        this._private__timeScale.scaleTo(x);
        this.recalculateAllPanes();
        this.updateCrosshair();
        this.lightUpdate();
    };
    ChartModel.prototype.endScaleTime = function () {
        this._private__timeScale.endScale();
        this.lightUpdate();
    };
    ChartModel.prototype.startScrollTime = function (x) {
        this._private__initialTimeScrollPos = x;
        this._private__timeScale.startScroll(x);
    };
    ChartModel.prototype.scrollTimeTo = function (x) {
        var res = false;
        if (this._private__initialTimeScrollPos !== null &&
            Math.abs(x - this._private__initialTimeScrollPos) > 20) {
            this._private__initialTimeScrollPos = null;
            res = true;
        }
        this._private__timeScale.scrollTo(x);
        this.recalculateAllPanes();
        this.updateCrosshair();
        this.lightUpdate();
        return res;
    };
    ChartModel.prototype.endScrollTime = function () {
        this._private__timeScale.endScroll();
        this.lightUpdate();
        this._private__initialTimeScrollPos = null;
    };
    ChartModel.prototype.resetTimeScale = function () {
        this._private__timeScale.restoreDefault();
        this.recalculateAllPanes();
        this.updateCrosshair();
        this.lightUpdate();
    };
    ChartModel.prototype.invalidate = function (mask) {
        if (this._private__invalidateHandler) {
            this._private__invalidateHandler(mask);
        }
        this._private__grid.invalidate();
        this.lightUpdate();
    };
    ChartModel.prototype.dataSources = function () {
        return this._private__panes.reduce(function (arr, pane) { return arr.concat(pane.dataSources()); }, []);
    };
    ChartModel.prototype.serieses = function () {
        return this._private__serieses;
    };
    ChartModel.prototype.setAndSaveCurrentPosition = function (x, y, pane) {
        this._private__crosshair.saveOriginCoord(x, y);
        var price = NaN;
        var index = this._private__timeScale.coordinateToIndex(x);
        var visibleBars = this._private__timeScale.visibleBars();
        if (visibleBars !== null) {
            index = Math.min(Math.max(visibleBars.firstBar(), index), visibleBars.lastBar());
        }
        var mainSource = pane.mainDataSource();
        if (mainSource !== null) {
            var priceScale = pane.defaultPriceScale();
            var firstValue = priceScale.firstValue();
            if (firstValue !== null) {
                price = priceScale.coordinateToPrice(y, firstValue);
            }
            price = this._private__magnet.align(price, index, pane);
        }
        this._private__crosshair.setPosition(index, price, pane);
        this._private__cursorUpdate();
        this._private__crosshairMoved.fire(this._private__crosshair.appliedIndex(), { x: x, y: y });
    };
    ChartModel.prototype.clearCurrentPosition = function () {
        var crosshair = this.crosshairSource();
        crosshair.clearPosition();
        this._private__cursorUpdate();
        this._private__crosshairMoved.fire(null, null);
    };
    ChartModel.prototype.updateCrosshair = function () {
        // apply magnet
        var pane = this._private__crosshair.pane();
        if (pane !== null) {
            var x = this._private__crosshair.originCoordX();
            var y = this._private__crosshair.originCoordY();
            this.setAndSaveCurrentPosition(x, y, pane);
        }
    };
    ChartModel.prototype.updateTimeScale = function (index, values, marks, clearFlag) {
        if (clearFlag) {
            // refresh timescale
            this._private__timeScale.reset();
        }
        this._private__timeScale.update(index, values, marks);
    };
    ChartModel.prototype.updateTimeScaleBaseIndex = function (earliestRowIndex) {
        // get the latest series bar index
        var lastSeriesBarIndex = this._private__serieses.reduce(function (currentRes, series) {
            var seriesBars = series.bars();
            if (seriesBars.isEmpty()) {
                return currentRes;
            }
            var currentLastIndex = ensureNotNull(seriesBars.lastIndex());
            return currentRes === undefined
                ? currentLastIndex
                : Math.max(currentLastIndex, currentRes);
        }, undefined);
        if (lastSeriesBarIndex !== undefined) {
            var timeScale = this._private__timeScale;
            var currentBaseIndex = timeScale.baseIndex();
            var visibleBars = timeScale.visibleBars();
            // if time scale cannot return current visible bars range (e.g. time scale has zero-width)
            // then we do not need to update right offset to shift visible bars range to have the same right offset as we have before new bar
            // (and actually we cannot)
            if (visibleBars !== null) {
                var isLastSeriesBarVisible = visibleBars.contains(currentBaseIndex);
                if (earliestRowIndex !== undefined &&
                    earliestRowIndex > 0 &&
                    !isLastSeriesBarVisible) {
                    var compensationShift = lastSeriesBarIndex - currentBaseIndex;
                    timeScale.setRightOffset(timeScale.rightOffset() - compensationShift);
                }
            }
            timeScale.setBaseIndex(lastSeriesBarIndex);
        }
        this.updateCrosshair();
        this.recalculateAllPanes();
        this.lightUpdate();
    };
    ChartModel.prototype.recalculatePane = function (pane) {
        if (pane !== null) {
            pane.recalculate();
        }
    };
    ChartModel.prototype.paneForSource = function (source) {
        var pane = this._private__panes.find(function (p) {
            return p.orderedSources().includes(source);
        });
        return pane === undefined ? null : pane;
    };
    ChartModel.prototype.recalculateAllPanes = function () {
        this._private__panes.forEach(function (p) { return p.recalculate(); });
        this.updateAllPaneViews();
    };
    ChartModel.prototype.destroy = function () {
        this._private__panes.forEach(function (p) { return p.destroy(); });
        this._private__panes.length = 0;
        // to avoid memleaks
        this._private__options.localization.priceFormatter = undefined;
        this._private__options.localization.timeFormatter = undefined;
    };
    ChartModel.prototype.setPriceAutoScaleForAllMainSources = function () {
        this._private__panes.map(function (p) { return p.mainDataSource(); })
            .forEach(function (s) {
            if (s !== null) {
                var priceScale = ensureNotNull(s.priceScale());
                priceScale.setMode({
                    autoScale: true,
                });
            }
        });
    };
    ChartModel.prototype.rendererOptionsProvider = function () {
        return this._private__rendererOptionsProvider;
    };
    ChartModel.prototype.priceAxisRendererOptions = function () {
        return this._private__rendererOptionsProvider.options();
    };
    ChartModel.prototype.mainPriceScaleOptionsChanged = function () {
        return this._private__mainPriceScaleOptionsChanged;
    };
    ChartModel.prototype.mainPriceScale = function () {
        return this._private__panes[0].defaultPriceScale();
    };
    ChartModel.prototype.createSeries = function (seriesType, options) {
        var pane = this._private__panes[0];
        var series = this._private__createSeries(options, seriesType, pane);
        this._private__serieses.push(series);
        if (this._private__serieses.length === 1) {
            // call fullUpdate to recalculate chart's parts geometry
            this.fullUpdate();
        }
        else {
            this.lightUpdate();
        }
        return series;
    };
    ChartModel.prototype.removeSeries = function (series) {
        var pane = this.paneForSource(series);
        var seriesIndex = this._private__serieses.indexOf(series);
        assert(seriesIndex !== -1, 'Series not found');
        this._private__serieses.splice(seriesIndex, 1);
        ensureNotNull(pane).removeDataSource(series);
        if (series.destroy) {
            series.destroy();
        }
    };
    ChartModel.prototype.fitContent = function () {
        var mask = new InvalidateMask(2 /* Light */);
        mask.setFitContent();
        this._private__invalidate(mask);
    };
    ChartModel.prototype.setTargetTimeRange = function (range) {
        var mask = new InvalidateMask(2 /* Light */);
        mask.setTargetTimeRange(range);
        this._private__invalidate(mask);
    };
    ChartModel.prototype._private__paneInvalidationMask = function (pane, level) {
        var inv = new InvalidateMask(level);
        if (pane !== null) {
            var index = this._private__panes.indexOf(pane);
            inv.invalidatePane(index, {
                level: level,
            });
        }
        return inv;
    };
    ChartModel.prototype._private__invalidationMaskForSource = function (source, invalidateType) {
        if (invalidateType === undefined) {
            invalidateType = 2 /* Light */;
        }
        return this._private__paneInvalidationMask(this.paneForSource(source), invalidateType);
    };
    ChartModel.prototype._private__invalidate = function (mask) {
        if (this._private__invalidateHandler) {
            this._private__invalidateHandler(mask);
        }
        this._private__grid.invalidate();
    };
    ChartModel.prototype._private__cursorUpdate = function () {
        this._private__invalidate(new InvalidateMask(1 /* Cursor */));
    };
    ChartModel.prototype._private__createSeries = function (options, seriesType, pane) {
        var series = new Series(this, options, seriesType);
        pane.addDataSource(series, Boolean(options.overlay), false, options.scaleGroup);
        if (options.overlay) {
            // let's apply that options again to apply margins
            series.applyOptions(options);
        }
        return series;
    };
    return ChartModel;
}());

var Size = /** @class */ (function () {
    function Size(w, h) {
        this.w = w;
        this.h = h;
    }
    Size.prototype.equals = function (size) {
        return (this.w === size.w) && (this.h === size.h);
    };
    return Size;
}());
function getCanvasDevicePixelRatio(canvas) {
    return canvas.ownerDocument &&
        canvas.ownerDocument.defaultView &&
        canvas.ownerDocument.defaultView.devicePixelRatio
        || 1;
}
function getContext2D(canvas) {
    var ctx = ensureNotNull(canvas.getContext('2d'));
    // sometimes (very often) ctx getContext returns the same context every time
    // and there might be previous transformation
    // so let's reset it to be sure that everything is ok
    // do no use resetTransform to respect Edge
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    return ctx;
}
function createCanvas(doc) {
    var canvas = doc.createElement('canvas');
    disableSelection(canvas);
    return canvas;
}
function createPreconfiguredCanvas(doc, size) {
    var canvas = createCanvas(doc);
    var pixelRatio = getCanvasDevicePixelRatio(canvas);
    // we should keep the layout size...
    canvas.style.width = size.w + "px";
    canvas.style.height = size.h + "px";
    // ...but multiply coordinate space dimensions to device pixel ratio
    canvas.width = size.w * pixelRatio;
    canvas.height = size.h * pixelRatio;
    return canvas;
}
function createBoundCanvas(parentElement, size) {
    var doc = ensureNotNull(parentElement.ownerDocument);
    var canvas = createCanvas(doc);
    parentElement.appendChild(canvas);
    var binding = bindToDevicePixelRatio(canvas);
    binding.resizeCanvas({
        width: size.w,
        height: size.h,
    });
    return binding;
}
function disableSelection(canvas) {
    canvas.style.userSelect = 'none';
    canvas.style.webkitUserSelect = 'none';
    canvas.style.msUserSelect = 'none';
    // tslint:disable-next-line:no-any
    canvas.style.MozUserSelect = 'none';
    canvas.style.webkitTapHighlightColor = 'transparent';
}

function checkTouchEvents() {
    if ('ontouchstart' in window) {
        return true;
    }
    // tslint:disable-next-line:no-any
    return Boolean(window.DocumentTouch && document instanceof window.DocumentTouch);
}
var touch = !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || checkTouchEvents();
var mobileTouch = 'onorientationchange' in window && touch;
// actually we shouldn't check that values
// we even don't need to know what browser/UA/etc is (in almost all cases, except special ones)
// so, in MouseEventHandler/PaneWidget we should check what event happened (touch or mouse)
// not check current UA to detect "mobile" device
var android = /Android/i.test(navigator.userAgent);
var iOS = /iPhone|iPad|iPod|AppleWebKit.+Mobile/i.test(navigator.userAgent);
var isMobile = android || iOS;

// we can use `const name = 500;` but with `const enum` this values will be inlined into code
// so we do not need to have it as variables
var Delay;
(function (Delay) {
    Delay[Delay["ResetClick"] = 500] = "ResetClick";
    Delay[Delay["LongTap"] = 240] = "LongTap";
})(Delay || (Delay = {}));
// TODO: get rid of a lot of boolean flags, probably we should replace it with some enum
var MouseEventHandler = /** @class */ (function () {
    function MouseEventHandler(target, handler, options) {
        this._private__clickCount = 0;
        this._private__clickTimeoutId = null;
        this._private__longTapTimeoutId = null;
        this._private__longTapActive = false;
        this._private__mouseMoveStartPosition = null;
        this._private__moveExceededManhattanDistance = false;
        this._private__cancelClick = false;
        this._private__unsubscribeOutsideEvents = null;
        this._private__unsubscribeMousemove = null;
        this._private__unsubscribeRoot = null;
        this._private__startPinchMiddlePoint = null;
        this._private__startPinchDistance = 0;
        this._private__pinchPrevented = false;
        this._private__preventDragProcess = false;
        this._private__mousePressed = false;
        this._private__target = target;
        this._private__handler = handler;
        this._private__options = options;
        this._private__init();
    }
    MouseEventHandler.prototype.destroy = function () {
        if (this._private__unsubscribeOutsideEvents !== null) {
            this._private__unsubscribeOutsideEvents();
            this._private__unsubscribeOutsideEvents = null;
        }
        if (this._private__unsubscribeMousemove !== null) {
            this._private__unsubscribeMousemove();
            this._private__unsubscribeMousemove = null;
        }
        if (this._private__unsubscribeRoot !== null) {
            this._private__unsubscribeRoot();
            this._private__unsubscribeRoot = null;
        }
        this._private__clearLongTapTimeout();
        this._private__resetClickTimeout();
    };
    MouseEventHandler.prototype._private__mouseEnterHandler = function (enterEvent) {
        var _this = this;
        if (this._private__unsubscribeMousemove) {
            this._private__unsubscribeMousemove();
        }
        {
            var boundMouseMoveHandler_1 = this._private__mouseMoveHandler.bind(this);
            this._private__unsubscribeMousemove = function () {
                _this._private__target.removeEventListener('mousemove', boundMouseMoveHandler_1);
            };
            this._private__target.addEventListener('mousemove', boundMouseMoveHandler_1);
        }
        if (isTouchEvent(enterEvent)) {
            this._private__mouseMoveHandler(enterEvent);
        }
        var compatEvent = this._private__makeCompatEvent(enterEvent);
        this._private__processEvent(compatEvent, this._private__handler.mouseEnterEvent);
    };
    MouseEventHandler.prototype._private__resetClickTimeout = function () {
        if (this._private__clickTimeoutId !== null) {
            clearTimeout(this._private__clickTimeoutId);
        }
        this._private__clickCount = 0;
        this._private__clickTimeoutId = null;
    };
    MouseEventHandler.prototype._private__mouseMoveHandler = function (moveEvent) {
        if (this._private__mousePressed && !isTouchEvent(moveEvent)) {
            return;
        }
        var compatEvent = this._private__makeCompatEvent(moveEvent);
        this._private__processEvent(compatEvent, this._private__handler.mouseMoveEvent);
    };
    // tslint:disable-next-line:cyclomatic-complexity
    MouseEventHandler.prototype._private__mouseMoveWithDownHandler = function (moveEvent) {
        if ('button' in moveEvent && moveEvent.button !== 0 /* Left */) {
            return;
        }
        if (this._private__startPinchMiddlePoint !== null) {
            return;
        }
        var isTouch = isTouchEvent(moveEvent);
        if (this._private__preventDragProcess && isTouch) {
            return;
        }
        // prevent pinch if move event comes faster than the second touch
        this._private__pinchPrevented = true;
        var compatEvent = this._private__makeCompatEvent(moveEvent);
        var startMouseMovePos = ensure(this._private__mouseMoveStartPosition);
        var xOffset = Math.abs(startMouseMovePos.x - compatEvent.pageX);
        var yOffset = Math.abs(startMouseMovePos.y - compatEvent.pageY);
        var moveExceededManhattanDistance = xOffset + yOffset > 5;
        if (!moveExceededManhattanDistance && isTouch) {
            return;
        }
        if (moveExceededManhattanDistance && !this._private__moveExceededManhattanDistance && isTouch) {
            // vertical drag is more important than horizontal drag
            // because we scroll the page vertically often than horizontally
            var correctedXOffset = xOffset * 0.5;
            // a drag can be only if touch page scroll isn't allowed
            var isVertDrag = yOffset >= correctedXOffset && !this._private__options.treatVertTouchDragAsPageScroll;
            var isHorzDrag = correctedXOffset > yOffset && !this._private__options.treatHorzTouchDragAsPageScroll;
            // if drag event happened then we should revert preventDefault state to original one
            // and try to process the drag event
            // else we shouldn't prevent default of the event and ignore processing the drag event
            if (!isVertDrag && !isHorzDrag) {
                this._private__preventDragProcess = true;
            }
        }
        if (moveExceededManhattanDistance) {
            this._private__moveExceededManhattanDistance = true;
            // if manhattan distance is more that 5 - we should cancel click event
            this._private__cancelClick = true;
            if (isTouch) {
                this._private__clearLongTapTimeout();
            }
        }
        if (!this._private__preventDragProcess) {
            this._private__processEvent(compatEvent, this._private__handler.pressedMouseMoveEvent);
            // we should prevent default in case of touch only
            // to prevent scroll of the page
            if (isTouch) {
                preventDefault(moveEvent);
            }
        }
    };
    MouseEventHandler.prototype._private__mouseUpHandler = function (mouseUpEvent) {
        if ('button' in mouseUpEvent && mouseUpEvent.button !== 0 /* Left */) {
            return;
        }
        var compatEvent = this._private__makeCompatEvent(mouseUpEvent);
        this._private__clearLongTapTimeout();
        this._private__mouseMoveStartPosition = null;
        this._private__mousePressed = false;
        if (this._private__unsubscribeRoot) {
            this._private__unsubscribeRoot();
            this._private__unsubscribeRoot = null;
        }
        if (isTouchEvent(mouseUpEvent)) {
            this._private__mouseLeaveHandler(mouseUpEvent);
        }
        this._private__processEvent(compatEvent, this._private__handler.mouseUpEvent);
        ++this._private__clickCount;
        if (this._private__clickTimeoutId && this._private__clickCount > 1) {
            this._private__processEvent(compatEvent, this._private__handler.mouseDoubleClickEvent);
            this._private__resetClickTimeout();
        }
        else {
            if (!this._private__cancelClick) {
                this._private__processEvent(compatEvent, this._private__handler.mouseClickEvent);
            }
        }
        // prevent safari's dblclick-to-zoom
        // we handle mouseDoubleClickEvent here ourself
        if (isTouchEvent(mouseUpEvent)) {
            preventDefault(mouseUpEvent);
            this._private__mouseLeaveHandler(mouseUpEvent);
            if (mouseUpEvent.touches.length === 0) {
                this._private__longTapActive = false;
            }
        }
    };
    MouseEventHandler.prototype._private__clearLongTapTimeout = function () {
        if (this._private__longTapTimeoutId === null) {
            return;
        }
        clearTimeout(this._private__longTapTimeoutId);
        this._private__longTapTimeoutId = null;
    };
    MouseEventHandler.prototype._private__mouseDownHandler = function (downEvent) {
        if ('button' in downEvent && downEvent.button !== 0 /* Left */) {
            return;
        }
        var compatEvent = this._private__makeCompatEvent(downEvent);
        this._private__cancelClick = false;
        this._private__moveExceededManhattanDistance = false;
        this._private__preventDragProcess = false;
        if (isTouchEvent(downEvent)) {
            this._private__mouseEnterHandler(downEvent);
        }
        this._private__mouseMoveStartPosition = {
            x: compatEvent.pageX,
            y: compatEvent.pageY,
        };
        if (this._private__unsubscribeRoot) {
            this._private__unsubscribeRoot();
            this._private__unsubscribeRoot = null;
        }
        {
            var boundMouseMoveWithDownHandler_1 = this._private__mouseMoveWithDownHandler.bind(this);
            var boundMouseUpHandler_1 = this._private__mouseUpHandler.bind(this);
            var rootElement_1 = this._private__target.ownerDocument.documentElement;
            this._private__unsubscribeRoot = function () {
                rootElement_1.removeEventListener('touchmove', boundMouseMoveWithDownHandler_1);
                rootElement_1.removeEventListener('touchend', boundMouseUpHandler_1);
                rootElement_1.removeEventListener('mousemove', boundMouseMoveWithDownHandler_1);
                rootElement_1.removeEventListener('mouseup', boundMouseUpHandler_1);
            };
            rootElement_1.addEventListener('touchmove', boundMouseMoveWithDownHandler_1, { passive: false });
            rootElement_1.addEventListener('touchend', boundMouseUpHandler_1, { passive: false });
            this._private__clearLongTapTimeout();
            if (isTouchEvent(downEvent) && downEvent.touches.length === 1) {
                this._private__longTapTimeoutId = setTimeout(this._private__longTapHandler.bind(this, downEvent), 240 /* LongTap */);
            }
            else {
                rootElement_1.addEventListener('mousemove', boundMouseMoveWithDownHandler_1);
                rootElement_1.addEventListener('mouseup', boundMouseUpHandler_1);
            }
        }
        this._private__mousePressed = true;
        this._private__processEvent(compatEvent, this._private__handler.mouseDownEvent);
        if (!this._private__clickTimeoutId) {
            this._private__clickCount = 0;
            this._private__clickTimeoutId = setTimeout(this._private__resetClickTimeout.bind(this), 500 /* ResetClick */);
        }
    };
    MouseEventHandler.prototype._private__init = function () {
        var _this = this;
        this._private__target.addEventListener('mouseenter', this._private__mouseEnterHandler.bind(this));
        this._private__target.addEventListener('touchcancel', this._private__clearLongTapTimeout.bind(this));
        {
            var doc_1 = this._private__target.ownerDocument;
            var outsideHandler_1 = function (event) {
                if (!_this._private__handler.mouseDownOutsideEvent) {
                    return;
                }
                if (event.target && _this._private__target.contains(event.target)) {
                    return;
                }
                _this._private__handler.mouseDownOutsideEvent();
            };
            this._private__unsubscribeOutsideEvents = function () {
                doc_1.removeEventListener('mousedown', outsideHandler_1);
                doc_1.removeEventListener('touchstart', outsideHandler_1);
            };
            doc_1.addEventListener('mousedown', outsideHandler_1);
            doc_1.addEventListener('touchstart', outsideHandler_1, { passive: true });
        }
        this._private__target.addEventListener('mouseleave', this._private__mouseLeaveHandler.bind(this));
        this._private__target.addEventListener('touchstart', this._private__mouseDownHandler.bind(this), { passive: true });
        if (!mobileTouch) {
            this._private__target.addEventListener('mousedown', this._private__mouseDownHandler.bind(this));
        }
        this._private__initPinch();
        // Hey mobile Safari, what's up?
        // If mobile Safari doesn't have any touchmove handler with passive=false
        // it treats a touchstart and the following touchmove events as cancelable=false,
        // so we can't prevent them (as soon we subscribe on touchmove inside handler of touchstart).
        // And we'll get scroll of the page along with chart's one instead of only chart's scroll.
        this._private__target.addEventListener('touchmove', function () { }, { passive: false });
    };
    MouseEventHandler.prototype._private__initPinch = function () {
        var _this = this;
        if (this._private__handler.pinchStartEvent === undefined &&
            this._private__handler.pinchEvent === undefined &&
            this._private__handler.pinchEndEvent === undefined) {
            return;
        }
        this._private__target.addEventListener('touchstart', function (event) { return _this._private__checkPinchState(event.touches); }, { passive: true });
        this._private__target.addEventListener('touchmove', function (event) {
            if (event.touches.length !== 2 || _this._private__startPinchMiddlePoint === null) {
                return;
            }
            if (_this._private__handler.pinchEvent !== undefined) {
                var currentDistance = getDistance(event.touches[0], event.touches[1]);
                var scale = currentDistance / _this._private__startPinchDistance;
                _this._private__handler.pinchEvent(_this._private__startPinchMiddlePoint, scale);
                preventDefault(event);
            }
        }, { passive: false });
        this._private__target.addEventListener('touchend', function (event) {
            _this._private__checkPinchState(event.touches);
        });
    };
    MouseEventHandler.prototype._private__checkPinchState = function (touches) {
        if (touches.length === 1) {
            this._private__pinchPrevented = false;
        }
        if (touches.length !== 2 || this._private__pinchPrevented || this._private__longTapActive) {
            this._private__stopPinch();
        }
        else {
            this._private__startPinch(touches);
        }
    };
    MouseEventHandler.prototype._private__startPinch = function (touches) {
        var box = getBoundingClientRect(this._private__target);
        this._private__startPinchMiddlePoint = {
            x: ((touches[0].clientX - box.left) + (touches[1].clientX - box.left)) / 2,
            y: ((touches[0].clientY - box.top) + (touches[1].clientY - box.top)) / 2,
        };
        this._private__startPinchDistance = getDistance(touches[0], touches[1]);
        if (this._private__handler.pinchStartEvent !== undefined) {
            this._private__handler.pinchStartEvent();
        }
        this._private__clearLongTapTimeout();
    };
    MouseEventHandler.prototype._private__stopPinch = function () {
        if (this._private__startPinchMiddlePoint === null) {
            return;
        }
        this._private__startPinchMiddlePoint = null;
        if (this._private__handler.pinchEndEvent !== undefined) {
            this._private__handler.pinchEndEvent();
        }
    };
    MouseEventHandler.prototype._private__mouseLeaveHandler = function (event) {
        if (this._private__unsubscribeMousemove) {
            this._private__unsubscribeMousemove();
        }
        var compatEvent = this._private__makeCompatEvent(event);
        this._private__processEvent(compatEvent, this._private__handler.mouseLeaveEvent);
    };
    MouseEventHandler.prototype._private__longTapHandler = function (event) {
        var compatEvent = this._private__makeCompatEvent(event);
        this._private__processEvent(compatEvent, this._private__handler.longTapEvent);
        this._private__cancelClick = true;
        // long tap is active untill touchend event with 0 touches occured
        this._private__longTapActive = true;
    };
    MouseEventHandler.prototype._private__processEvent = function (event, callback) {
        if (!callback) {
            return;
        }
        callback.call(this._private__handler, event);
    };
    MouseEventHandler.prototype._private__makeCompatEvent = function (event) {
        // TouchEvent has no clientX/Y coordinates:
        // We have to use the last Touch instead
        var eventLike;
        if ('touches' in event && event.touches.length) {
            eventLike = event.touches[0];
        }
        else if ('changedTouches' in event && event.changedTouches.length) {
            eventLike = event.changedTouches[0];
        }
        else {
            eventLike = event;
        }
        var box = getBoundingClientRect(this._private__target);
        return {
            clientX: eventLike.clientX,
            clientY: eventLike.clientY,
            pageX: eventLike.pageX,
            pageY: eventLike.pageY,
            screenX: eventLike.screenX,
            screenY: eventLike.screenY,
            localX: eventLike.clientX - box.left,
            localY: eventLike.clientY - box.top,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey,
            type: event.type.startsWith('mouse') ? 'mouse' : 'touch',
            target: eventLike.target,
            view: event.view,
        };
    };
    return MouseEventHandler;
}());
function getBoundingClientRect(element) {
    return element.getBoundingClientRect() || { left: 0, top: 0 };
}
function getDistance(p1, p2) {
    var xDiff = p1.clientX - p2.clientX;
    var yDiff = p1.clientY - p2.clientY;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function isTouchEvent(event) {
    return Boolean(event.touches);
}
function preventDefault(event) {
    if (event.cancelable) {
        event.preventDefault();
    }
}

var SEPARATOR_HEIGHT = 1;
var PaneSeparator = /** @class */ (function () {
    function PaneSeparator(chartWidget, topPaneIndex, bottomPaneIndex, disableResize) {
        this._private__startY = 0;
        this._private__deltaY = 0;
        this._private__totalHeight = 0;
        this._private__totalStretch = 0;
        this._private__minPaneHeight = 0;
        this._private__maxPaneHeight = 0;
        this._private__pixelStretchFactor = 0;
        this._private__chartWidget = chartWidget;
        this._private__paneA = chartWidget.paneWidgets()[topPaneIndex];
        this._private__paneB = chartWidget.paneWidgets()[bottomPaneIndex];
        this._private__rowElement = document.createElement('tr');
        this._private__rowElement.style.height = SEPARATOR_HEIGHT + 'px';
        this._private__cell = document.createElement('td');
        this._private__cell.style.padding = '0';
        this._private__cell.setAttribute('colspan', '3');
        this._private__updateBorderColor();
        this._private__rowElement.appendChild(this._private__cell);
        if (disableResize) {
            this._private__handle = null;
            this._private__mouseEventHandler = null;
        }
        else {
            this._private__handle = document.createElement('div');
            this._private__handle.style.position = 'absolute';
            this._private__handle.style.zIndex = '50';
            this._private__handle.style.height = '5px';
            this._private__handle.style.width = '100%';
            this._private__handle.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            this._private__handle.style.cursor = 'ns-resize';
            this._private__cell.appendChild(this._private__handle);
            var handlers = {
                mouseDownEvent: this._private__mouseDownEvent.bind(this),
                pressedMouseMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
                mouseUpEvent: this._private__mouseUpEvent.bind(this),
            };
            this._private__mouseEventHandler = new MouseEventHandler(this._private__handle, handlers, {
                treatVertTouchDragAsPageScroll: false,
                treatHorzTouchDragAsPageScroll: true,
            });
        }
    }
    PaneSeparator.prototype.destroy = function () {
        if (this._private__mouseEventHandler !== null) {
            this._private__mouseEventHandler.destroy();
        }
    };
    PaneSeparator.prototype.getElement = function () {
        return this._private__rowElement;
    };
    PaneSeparator.prototype.getSize = function () {
        return new Size(this._private__paneA.getSize().w, SEPARATOR_HEIGHT);
    };
    PaneSeparator.prototype.getImage = function () {
        var size = this.getSize();
        var res = createPreconfiguredCanvas(document, size);
        var ctx = getContext2D(res);
        ctx.fillStyle = this._private__chartWidget.options().timeScale.borderColor;
        ctx.fillRect(0, 0, size.w, size.h);
        return res;
    };
    PaneSeparator.prototype.update = function () {
        this._private__updateBorderColor();
    };
    PaneSeparator.prototype._private__updateBorderColor = function () {
        this._private__cell.style.background = this._private__chartWidget.options().timeScale.borderColor;
    };
    PaneSeparator.prototype._private__mouseDownEvent = function (event) {
        this._private__startY = event.pageY;
        this._private__deltaY = 0;
        this._private__totalHeight = this._private__paneA.getSize().h + this._private__paneB.getSize().h;
        this._private__totalStretch = this._private__paneA.stretchFactor() + this._private__paneB.stretchFactor();
        this._private__minPaneHeight = 30;
        this._private__maxPaneHeight = this._private__totalHeight - this._private__minPaneHeight;
        this._private__pixelStretchFactor = this._private__totalStretch / this._private__totalHeight;
    };
    PaneSeparator.prototype._private__pressedMouseMoveEvent = function (event) {
        this._private__deltaY = (event.pageY - this._private__startY);
        var upperHeight = this._private__paneA.getSize().h;
        var newUpperPaneHeight = clamp(upperHeight + this._private__deltaY, this._private__minPaneHeight, this._private__maxPaneHeight);
        var newUpperPaneStretch = newUpperPaneHeight * this._private__pixelStretchFactor;
        var newLowerPaneStretch = this._private__totalStretch - newUpperPaneStretch;
        this._private__paneA.setStretchFactor(newUpperPaneStretch);
        this._private__paneB.setStretchFactor(newLowerPaneStretch);
        this._private__chartWidget.adjustSize();
        if (this._private__paneA.getSize().h !== upperHeight) {
            this._private__startY = event.pageY;
        }
    };
    PaneSeparator.prototype._private__mouseUpEvent = function (event) {
        this._private__startY = 0;
        this._private__deltaY = 0;
        this._private__totalHeight = 0;
        this._private__totalStretch = 0;
        this._private__minPaneHeight = 0;
        this._private__maxPaneHeight = 0;
        this._private__pixelStretchFactor = 0;
    };
    return PaneSeparator;
}());

var MAX_COUNT = 200;
var LabelsImageCache = /** @class */ (function () {
    function LabelsImageCache(fontSize, color, fontFamily, fontStyle) {
        this._private__textWidthCache = new TextWidthCache(MAX_COUNT);
        this._private__fontSize = 0;
        this._private__color = '';
        this._private__font = '';
        this._private__keys = [];
        this._private__hash = new Map();
        this._private__fontSize = fontSize;
        this._private__color = color;
        this._private__font = makeFont(fontSize, fontFamily, fontStyle);
    }
    LabelsImageCache.prototype.destroy = function () {
        delete this._private__textWidthCache;
        this._private__keys = [];
        this._private__hash.clear();
    };
    LabelsImageCache.prototype.paintTo = function (ctx, text, x, y, align) {
        var label = this._private__getLabelImage(ctx, text);
        if (align !== 'left') {
            var pixelRatio = getCanvasDevicePixelRatio(ctx.canvas);
            x -= Math.floor(label.textWidth * pixelRatio);
        }
        y -= Math.floor(label.height / 2);
        ctx.drawImage(label.canvas, x, y, label.width, label.height);
    };
    LabelsImageCache.prototype._private__getLabelImage = function (ctx, text) {
        var _this = this;
        var item;
        if (this._private__hash.has(text)) {
            // Cache hit!
            item = ensureDefined(this._private__hash.get(text));
        }
        else {
            if (this._private__keys.length >= MAX_COUNT) {
                var key = ensureDefined(this._private__keys.shift());
                this._private__hash.delete(key);
            }
            var pixelRatio = getCanvasDevicePixelRatio(ctx.canvas);
            var margin_1 = Math.ceil(this._private__fontSize / 4.5);
            var baselineOffset_1 = Math.round(this._private__fontSize / 10);
            var textWidth = Math.ceil(this._private__textWidthCache.measureText(ctx, text));
            var width = ceiledEven(Math.round(textWidth + margin_1 * 2));
            var height_1 = ceiledEven(this._private__fontSize + margin_1 * 2);
            var canvas = createPreconfiguredCanvas(document, new Size(width, height_1));
            // Allocate new
            item = {
                text: text,
                textWidth: Math.round(Math.max(1, textWidth)),
                width: Math.ceil(width * pixelRatio),
                height: Math.ceil(height_1 * pixelRatio),
                canvas: canvas,
            };
            if (textWidth !== 0) {
                this._private__keys.push(item.text);
                this._private__hash.set(item.text, item);
            }
            ctx = getContext2D(item.canvas);
            drawScaled(ctx, pixelRatio, function () {
                ctx.font = _this._private__font;
                ctx.fillStyle = _this._private__color;
                ctx.fillText(text, 0, height_1 - margin_1 - baselineOffset_1);
            });
        }
        return item;
    };
    return LabelsImageCache;
}());

var CursorType;
(function (CursorType) {
    CursorType[CursorType["Default"] = 0] = "Default";
    CursorType[CursorType["NsResize"] = 1] = "NsResize";
})(CursorType || (CursorType = {}));
var PriceAxisWidget = /** @class */ (function () {
    function PriceAxisWidget(pane, options, rendererOptionsProvider, side) {
        var _this = this;
        this._private__priceScale = null;
        this._private__size = null;
        this._private__updateTimeout = null;
        this._private__mousedown = false;
        this._private__isVisible = true;
        this._private__widthCache = new TextWidthCache(50);
        this._private__tickMarksCache = new LabelsImageCache(11, '#000');
        this._private__color = null;
        this._private__font = null;
        this._private__prevOptimalWidth = 0;
        this._private__canvasConfiguredHandler = function () {
            _this._private__recreateTickMarksCache(_this._private__rendererOptionsProvider.options());
            var model = _this._private__pane.chart().model();
            model.lightUpdate();
        };
        this._private__topCanvasConfiguredHandler = function () {
            var model = _this._private__pane.chart().model();
            model.lightUpdate();
        };
        this._private__pane = pane;
        this._private__options = options;
        this._private__rendererOptionsProvider = rendererOptionsProvider;
        this._private__isLeft = side === 'left';
        this._private__cell = document.createElement('div');
        this._private__cell.style.height = '100%';
        this._private__cell.style.overflow = 'hidden';
        this._private__cell.style.width = '25px';
        this._private__cell.style.left = '0';
        this._private__cell.style.position = 'relative';
        this._private__canvasBinding = createBoundCanvas(this._private__cell, new Size(16, 16));
        this._private__canvasBinding.subscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        var canvas = this._private__canvasBinding.canvas;
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        canvas.style.left = '0';
        canvas.style.top = '0';
        this._private__topCanvasBinding = createBoundCanvas(this._private__cell, new Size(16, 16));
        this._private__topCanvasBinding.subscribeCanvasConfigured(this._private__topCanvasConfiguredHandler);
        var topCanvas = this._private__topCanvasBinding.canvas;
        topCanvas.style.position = 'absolute';
        topCanvas.style.zIndex = '2';
        topCanvas.style.left = '0';
        topCanvas.style.top = '0';
        var handler = {
            mouseDownEvent: this._private__mouseDownEvent.bind(this),
            pressedMouseMoveEvent: this._private__pressedMouseMoveEvent.bind(this),
            mouseDownOutsideEvent: this._private__mouseDownOutsideEvent.bind(this),
            mouseUpEvent: this._private__mouseUpEvent.bind(this),
            mouseDoubleClickEvent: this._private__mouseDoubleClickEvent.bind(this),
            mouseEnterEvent: this._private__mouseEnterEvent.bind(this),
            mouseLeaveEvent: this._private__mouseLeaveEvent.bind(this),
        };
        this._private__mouseEventHandler = new MouseEventHandler(this._private__topCanvasBinding.canvas, handler, {
            treatVertTouchDragAsPageScroll: false,
            treatHorzTouchDragAsPageScroll: true,
        });
    }
    PriceAxisWidget.prototype.destroy = function () {
        this._private__mouseEventHandler.destroy();
        this._private__topCanvasBinding.unsubscribeCanvasConfigured(this._private__topCanvasConfiguredHandler);
        this._private__topCanvasBinding.destroy();
        this._private__canvasBinding.unsubscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        this._private__canvasBinding.destroy();
        if (this._private__priceScale !== null) {
            this._private__priceScale.onMarksChanged().unsubscribeAll(this);
            this._private__priceScale.optionsChanged().unsubscribeAll(this);
        }
        this._private__priceScale = null;
        if (this._private__updateTimeout !== null) {
            clearTimeout(this._private__updateTimeout);
            this._private__updateTimeout = null;
        }
        this._private__tickMarksCache.destroy();
    };
    PriceAxisWidget.prototype.getElement = function () {
        return this._private__cell;
    };
    PriceAxisWidget.prototype.backgroundColor = function () {
        return this._private__options.backgroundColor;
    };
    PriceAxisWidget.prototype.lineColor = function () {
        return this._private__pane.chart().options().priceScale.borderColor;
    };
    PriceAxisWidget.prototype.textColor = function () {
        return this._private__options.textColor;
    };
    PriceAxisWidget.prototype.fontSize = function () {
        return this._private__options.fontSize;
    };
    PriceAxisWidget.prototype.baseFont = function () {
        return makeFont(this.fontSize(), this._private__options.fontFamily);
    };
    PriceAxisWidget.prototype.rendererOptions = function () {
        var options = this._private__rendererOptionsProvider.options();
        var isColorChanged = this._private__color !== options.color;
        var isFontChanged = this._private__font !== options.font;
        if (isColorChanged || isFontChanged) {
            this._private__recreateTickMarksCache(options);
            this._private__color = options.color;
        }
        if (isFontChanged) {
            this._private__widthCache.reset();
            this._private__font = options.font;
        }
        return options;
    };
    PriceAxisWidget.prototype.optimalWidth = function () {
        if (!this.isVisible() || this._private__priceScale === null) {
            return 0;
        }
        // need some reasonable value for scale while initialization
        var tickMarkMaxWidth = 34;
        var rendererOptions = this.rendererOptions();
        var ctx = getContext2D(this._private__canvasBinding.canvas);
        var tickMarks = this._private__priceScale.marks();
        ctx.font = this.baseFont();
        if (tickMarks.length > 0) {
            tickMarkMaxWidth = Math.max(this._private__widthCache.measureText(ctx, tickMarks[0].label), this._private__widthCache.measureText(ctx, tickMarks[tickMarks.length - 1].label));
        }
        var views = this._private__backLabels();
        for (var j = views.length; j--;) {
            var width = this._private__widthCache.measureText(ctx, views[j].text());
            if (width > tickMarkMaxWidth) {
                tickMarkMaxWidth = width;
            }
        }
        var res = Math.ceil(rendererOptions.borderSize +
            rendererOptions.tickLength +
            rendererOptions.paddingInner +
            rendererOptions.paddingOuter +
            tickMarkMaxWidth);
        // make it even
        res += res % 2;
        return res;
    };
    PriceAxisWidget.prototype.setSize = function (size) {
        if (size.w < 0 || size.h < 0) {
            throw new Error('Try to set invalid size to PriceAxisWidget ' + JSON.stringify(size));
        }
        if (this._private__size === null || !this._private__size.equals(size)) {
            this._private__size = size;
            this._private__canvasBinding.resizeCanvas({ width: size.w, height: size.h });
            this._private__topCanvasBinding.resizeCanvas({ width: size.w, height: size.h });
            this._private__cell.style.width = size.w + 'px';
            // need this for IE11
            this._private__cell.style.height = size.h + 'px';
            this._private__cell.style.minWidth = size.w + 'px'; // for right calculate position of .pane-legend
        }
    };
    PriceAxisWidget.prototype.getWidth = function () {
        return ensureNotNull(this._private__size).w;
    };
    PriceAxisWidget.prototype.setPriceScale = function (priceScale) {
        if (this._private__priceScale === priceScale) {
            return;
        }
        if (this._private__priceScale !== null) {
            this._private__priceScale.onMarksChanged().unsubscribeAll(this);
            this._private__priceScale.optionsChanged().unsubscribeAll(this);
        }
        this._private__priceScale = priceScale;
        priceScale.onMarksChanged().subscribe(this._private__onMarksChanged.bind(this), this);
    };
    PriceAxisWidget.prototype.priceScale = function () {
        return this._private__priceScale;
    };
    PriceAxisWidget.prototype.isVisible = function () {
        return this._private__isVisible;
    };
    PriceAxisWidget.prototype.setVisible = function (visible) {
        if (visible === this._private__isVisible) {
            return;
        }
        if (visible) {
            this._private__cell.style.display = 'table-cell';
        }
        else {
            this._private__cell.style.display = 'none';
        }
        this._private__isVisible = visible;
    };
    PriceAxisWidget.prototype.setAutoScale = function (on) {
        var pane = this._private__pane.state();
        var model = this._private__pane.chart().model();
        model.setPriceAutoScale(pane, ensureNotNull(this.priceScale()), on);
    };
    PriceAxisWidget.prototype.reset = function () {
        var pane = this._private__pane.state();
        var model = this._private__pane.chart().model();
        model.resetPriceScale(pane, ensureNotNull(this.priceScale()));
    };
    PriceAxisWidget.prototype.paint = function (type) {
        if (!this._private__isVisible || this._private__size === null) {
            return;
        }
        if (type !== 1 /* Cursor */) {
            var ctx = getContext2D(this._private__canvasBinding.canvas);
            this._private__alignLabels();
            this._private__drawBackground(ctx, this._private__canvasBinding.pixelRatio);
            this._private__drawBorder(ctx, this._private__canvasBinding.pixelRatio);
            this._private__drawTickMarks(ctx, this._private__canvasBinding.pixelRatio);
            this._private__drawBackLabels(ctx, this._private__canvasBinding.pixelRatio);
        }
        var topCtx = getContext2D(this._private__topCanvasBinding.canvas);
        var width = this._private__size.w;
        var height = this._private__size.h;
        drawScaled(topCtx, this._private__topCanvasBinding.pixelRatio, function () {
            topCtx.clearRect(0, 0, width, height);
        });
        this._private__drawCrosshairLabel(topCtx, this._private__topCanvasBinding.pixelRatio);
    };
    PriceAxisWidget.prototype.getImage = function () {
        return this._private__canvasBinding.canvas;
    };
    PriceAxisWidget.prototype.isLeft = function () {
        return this._private__isLeft;
    };
    PriceAxisWidget.prototype._private__mouseDownEvent = function (e) {
        if (this._private__priceScale === null || this._private__priceScale.isEmpty() || !this._private__pane.chart().options().handleScale.axisPressedMouseMove) {
            return;
        }
        var model = this._private__pane.chart().model();
        var pane = this._private__pane.state();
        this._private__mousedown = true;
        model.startScalePrice(pane, this._private__priceScale, e.localY);
    };
    PriceAxisWidget.prototype._private__pressedMouseMoveEvent = function (e) {
        if (this._private__priceScale === null || !this._private__pane.chart().options().handleScale.axisPressedMouseMove) {
            return;
        }
        var model = this._private__pane.chart().model();
        var pane = this._private__pane.state();
        var priceScale = this._private__priceScale;
        model.scalePriceTo(pane, priceScale, e.localY);
    };
    PriceAxisWidget.prototype._private__mouseDownOutsideEvent = function () {
        if (this._private__priceScale === null || !this._private__pane.chart().options().handleScale.axisPressedMouseMove) {
            return;
        }
        var model = this._private__pane.chart().model();
        var pane = this._private__pane.state();
        var priceScale = this._private__priceScale;
        if (this._private__mousedown) {
            this._private__mousedown = false;
            model.endScalePrice(pane, priceScale);
        }
    };
    PriceAxisWidget.prototype._private__mouseUpEvent = function (e) {
        if (this._private__priceScale === null || !this._private__pane.chart().options().handleScale.axisPressedMouseMove) {
            return;
        }
        var model = this._private__pane.chart().model();
        var pane = this._private__pane.state();
        this._private__mousedown = false;
        model.endScalePrice(pane, this._private__priceScale);
    };
    PriceAxisWidget.prototype._private__mouseDoubleClickEvent = function (e) {
        if (this._private__pane.chart().options().handleScale.axisDoubleClickReset) {
            this.reset();
        }
    };
    PriceAxisWidget.prototype._private__mouseEnterEvent = function (e) {
        if (this._private__priceScale === null) {
            return;
        }
        var model = this._private__pane.chart().model();
        if (model.options().handleScale.axisPressedMouseMove && !this._private__priceScale.isPercentage() && !this._private__priceScale.isIndexedTo100()) {
            this._private__setCursor(1 /* NsResize */);
        }
    };
    PriceAxisWidget.prototype._private__mouseLeaveEvent = function (e) {
        this._private__setCursor(0 /* Default */);
    };
    PriceAxisWidget.prototype._private__backLabels = function () {
        var _this = this;
        var res = [];
        var priceScale = (this._private__priceScale === null) ? undefined : this._private__priceScale;
        var addViewsForSources = function (sources) {
            for (var i = 0; i < sources.length; ++i) {
                var source = sources[i];
                var views = source.priceAxisViews(_this._private__pane.state(), priceScale);
                for (var j = 0; j < views.length; j++) {
                    res.push(views[j]);
                }
            }
        };
        // calculate max and min coordinates for views on selection
        // crosshair individually
        addViewsForSources(this._private__pane.state().orderedSources());
        return res;
    };
    PriceAxisWidget.prototype._private__drawBackground = function (ctx, pixelRatio) {
        var _this = this;
        if (this._private__size === null) {
            return;
        }
        var width = this._private__size.w;
        var height = this._private__size.h;
        drawScaled(ctx, pixelRatio, function () {
            clearRect(ctx, 0, 0, width, height, _this.backgroundColor());
        });
    };
    PriceAxisWidget.prototype._private__drawBorder = function (ctx, pixelRatio) {
        if (this._private__size === null || this._private__priceScale === null || !this._private__priceScale.options().borderVisible) {
            return;
        }
        ctx.save();
        ctx.fillStyle = this.lineColor();
        var borderSize = Math.max(1, Math.floor(this.rendererOptions().borderSize * pixelRatio));
        var left;
        if (this._private__isLeft) {
            left = Math.floor(this._private__size.w * pixelRatio) - borderSize;
        }
        else {
            left = 0;
        }
        ctx.fillRect(left, 0, borderSize, Math.ceil(this._private__size.h * pixelRatio));
        ctx.restore();
    };
    PriceAxisWidget.prototype._private__drawTickMarks = function (ctx, pixelRatio) {
        if (this._private__size === null || this._private__priceScale === null) {
            return;
        }
        var tickMarks = this._private__priceScale.marks();
        ctx.save();
        ctx.strokeStyle = this.lineColor();
        ctx.font = this.baseFont();
        ctx.fillStyle = this.lineColor();
        var rendererOptions = this.rendererOptions();
        var drawTicks = this._private__priceScale.options().borderVisible;
        var tickMarkLeftX = this._private__isLeft ?
            Math.floor((this._private__size.w - rendererOptions.tickLength) * pixelRatio - rendererOptions.borderSize * pixelRatio) :
            Math.floor(rendererOptions.borderSize * pixelRatio);
        var textLeftX = this._private__isLeft ?
            Math.round(tickMarkLeftX - rendererOptions.paddingInner * pixelRatio) :
            Math.round(tickMarkLeftX + rendererOptions.tickLength * pixelRatio + rendererOptions.paddingInner * pixelRatio);
        var textAlign = this._private__isLeft ? 'right' : 'left';
        var tickHeight = Math.max(1, Math.floor(pixelRatio));
        var tickOffset = Math.floor(pixelRatio * 0.5);
        if (drawTicks) {
            var tickLength = Math.round(rendererOptions.tickLength * pixelRatio);
            ctx.beginPath();
            for (var _i = 0, tickMarks_1 = tickMarks; _i < tickMarks_1.length; _i++) {
                var tickMark = tickMarks_1[_i];
                ctx.rect(tickMarkLeftX, Math.round(tickMark.coord * pixelRatio) - tickOffset, tickLength, tickHeight);
            }
            ctx.fill();
        }
        ctx.fillStyle = this.textColor();
        for (var _a = 0, tickMarks_2 = tickMarks; _a < tickMarks_2.length; _a++) {
            var tickMark = tickMarks_2[_a];
            this._private__tickMarksCache.paintTo(ctx, tickMark.label, textLeftX, Math.round(tickMark.coord * pixelRatio), textAlign);
        }
        ctx.restore();
    };
    PriceAxisWidget.prototype._private__alignLabels = function () {
        if (this._private__size === null || this._private__priceScale === null) {
            return;
        }
        var center = this._private__size.h / 2;
        var views = [];
        var orderedSources = this._private__priceScale.orderedSources().slice(); // Copy of array
        var pane = this._private__pane;
        var paneState = pane.state();
        var rendererOptions = this.rendererOptions();
        // if we are default price scale, append labels from no-scale
        var isDefault = this._private__priceScale === paneState.defaultPriceScale();
        if (isDefault) {
            this._private__pane.state().orderedSources().forEach(function (source) {
                if (paneState.isOverlay(source)) {
                    orderedSources.push(source);
                }
            });
        }
        var mainSource = this._private__priceScale.mainSource();
        var priceScale = this._private__priceScale;
        var updateForSources = function (sources) {
            sources.forEach(function (source) {
                var sourceViews = source.priceAxisViews(paneState, priceScale);
                // never align selected sources
                sourceViews.forEach(function (view) {
                    view.setFixedCoordinate(null);
                    if (view.isVisible()) {
                        views.push(view);
                    }
                });
                if (mainSource === source && sourceViews.length > 0) {
                    center = sourceViews[0].coordinate();
                }
            });
        };
        // crosshair individually
        updateForSources(orderedSources);
        // split into two parts
        var top = views.filter(function (view) { return view.coordinate() <= center; });
        var bottom = views.filter(function (view) { return view.coordinate() > center; });
        // sort top from center to top
        top.sort(function (l, r) { return r.coordinate() - l.coordinate(); });
        // share center label
        if (top.length && bottom.length) {
            bottom.push(top[0]);
        }
        bottom.sort(function (l, r) { return l.coordinate() - r.coordinate(); });
        views.forEach(function (view) { return view.setFixedCoordinate(view.coordinate()); });
        var options = this._private__priceScale.options();
        if (!options.alignLabels) {
            return;
        }
        for (var i = 1; i < top.length; i++) {
            var view = top[i];
            var prev = top[i - 1];
            var height = prev.height(rendererOptions, false);
            var coordinate = view.coordinate();
            var prevFixedCoordinate = prev.getFixedCoordinate();
            if (coordinate > prevFixedCoordinate - height) {
                view.setFixedCoordinate(prevFixedCoordinate - height);
            }
        }
        for (var j = 1; j < bottom.length; j++) {
            var view = bottom[j];
            var prev = bottom[j - 1];
            var height = prev.height(rendererOptions, true);
            var coordinate = view.coordinate();
            var prevFixedCoordinate = prev.getFixedCoordinate();
            if (coordinate < prevFixedCoordinate + height) {
                view.setFixedCoordinate(prevFixedCoordinate + height);
            }
        }
    };
    PriceAxisWidget.prototype._private__drawBackLabels = function (ctx, pixelRatio) {
        var _this = this;
        if (this._private__size === null) {
            return;
        }
        ctx.save();
        var size = this._private__size;
        var views = this._private__backLabels();
        var rendererOptions = this.rendererOptions();
        var align = this._private__isLeft ? 'right' : 'left';
        views.forEach(function (view) {
            if (view.isAxisLabelVisible()) {
                var renderer = view.renderer();
                ctx.save();
                renderer.draw(ctx, rendererOptions, _this._private__widthCache, size.w, align, pixelRatio);
                ctx.restore();
            }
        });
        ctx.restore();
    };
    PriceAxisWidget.prototype._private__drawCrosshairLabel = function (ctx, pixelRatio) {
        var _this = this;
        if (this._private__size === null || this._private__priceScale === null) {
            return;
        }
        ctx.save();
        var size = this._private__size;
        var model = this._private__pane.chart().model();
        var views = []; // array of arrays
        var pane = this._private__pane.state();
        var v = model.crosshairSource().priceAxisViews(pane, this._private__priceScale);
        if (v.length) {
            views.push(v);
        }
        var ro = this.rendererOptions();
        var align = this._private__isLeft ? 'right' : 'left';
        views.forEach(function (arr) {
            arr.forEach(function (view) {
                ctx.save();
                view.renderer().draw(ctx, ro, _this._private__widthCache, size.w, align, pixelRatio);
                ctx.restore();
            });
        });
        ctx.restore();
    };
    PriceAxisWidget.prototype._private__setCursor = function (type) {
        this._private__cell.style.cursor = type === 1 /* NsResize */ ? 'ns-resize' : 'default';
    };
    PriceAxisWidget.prototype._private__onMarksChanged = function () {
        var _this = this;
        var width = this.optimalWidth();
        if (this._private__prevOptimalWidth < width) {
            // avoid price scale is shrunk
            // using < instead !== to avoid infinite changes
            var chart_1 = this._private__pane.chart();
            if (this._private__updateTimeout === null) {
                this._private__updateTimeout = setTimeout(function () {
                    if (chart_1) {
                        chart_1.model().fullUpdate();
                    }
                    _this._private__updateTimeout = null;
                }, 100);
            }
        }
        this._private__prevOptimalWidth = width;
    };
    PriceAxisWidget.prototype._private__recreateTickMarksCache = function (options) {
        this._private__tickMarksCache.destroy();
        this._private__tickMarksCache = new LabelsImageCache(options.fontSize, options.color, options.fontFamily);
    };
    return PriceAxisWidget;
}());

// actually we should check what event happened (touch or mouse)
// not check current UA to detect "mobile" device
var trackCrosshairOnlyAfterLongTap = isMobile;
var PaneWidget = /** @class */ (function () {
    function PaneWidget(chart, state) {
        var _this = this;
        this._private__size = new Size(0, 0);
        this._private__priceAxisWidget = null;
        this._private__startScrollingPos = null;
        this._private__isScrolling = false;
        this._private__priceAxisPosition = 'none';
        this._private__clicked = new Delegate();
        this._private__prevPinchScale = 0;
        this._private__longTap = false;
        this._private__startTrackPoint = null;
        this._private__exitTrackingModeOnNextTry = false;
        this._private__initCrosshairPosition = null;
        this._private__canvasConfiguredHandler = function () { return _this._private__state && _this._private__model().lightUpdate(); };
        this._private__topCanvasConfiguredHandler = function () { return _this._private__state && _this._private__model().lightUpdate(); };
        this._private__chart = chart;
        this._private__state = state;
        this._private__state.onDestroyed().subscribe(this._private__onStateDestroyed.bind(this), this, true);
        this._private__paneCell = document.createElement('td');
        this._private__paneCell.style.padding = '0';
        this._private__paneCell.style.position = 'relative';
        var paneWrapper = document.createElement('div');
        paneWrapper.style.width = '100%';
        paneWrapper.style.height = '100%';
        paneWrapper.style.position = 'relative';
        paneWrapper.style.overflow = 'hidden';
        this._private__leftAxisCell = document.createElement('td');
        this._private__leftAxisCell.style.padding = '0';
        this._private__rightAxisCell = document.createElement('td');
        this._private__rightAxisCell.style.padding = '0';
        this._private__paneCell.appendChild(paneWrapper);
        this._private__canvasBinding = createBoundCanvas(paneWrapper, new Size(16, 16));
        this._private__canvasBinding.subscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        var canvas = this._private__canvasBinding.canvas;
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        canvas.style.left = '0';
        canvas.style.top = '0';
        this._private__topCanvasBinding = createBoundCanvas(paneWrapper, new Size(16, 16));
        this._private__topCanvasBinding.subscribeCanvasConfigured(this._private__topCanvasConfiguredHandler);
        var topCanvas = this._private__topCanvasBinding.canvas;
        topCanvas.style.position = 'absolute';
        topCanvas.style.zIndex = '2';
        topCanvas.style.left = '0';
        topCanvas.style.top = '0';
        this._private__rowElement = document.createElement('tr');
        this._private__rowElement.appendChild(this._private__leftAxisCell);
        this._private__rowElement.appendChild(this._private__paneCell);
        this._private__rowElement.appendChild(this._private__rightAxisCell);
        this._private__recreatePriceAxisWidgetImpl();
        chart.model().mainPriceScaleOptionsChanged().subscribe(this._private__recreatePriceAxisWidget.bind(this), this);
        this.updatePriceAxisWidget();
        var scrollOptions = this.chart().options().handleScroll;
        this._private__mouseEventHandler = new MouseEventHandler(this._private__topCanvasBinding.canvas, this, {
            treatVertTouchDragAsPageScroll: !scrollOptions.vertTouchDrag,
            treatHorzTouchDragAsPageScroll: !scrollOptions.horzTouchDrag,
        });
    }
    PaneWidget.prototype.destroy = function () {
        if (this._private__priceAxisWidget !== null) {
            this._private__priceAxisWidget.destroy();
        }
        this._private__topCanvasBinding.unsubscribeCanvasConfigured(this._private__topCanvasConfiguredHandler);
        this._private__topCanvasBinding.destroy();
        this._private__canvasBinding.unsubscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        this._private__canvasBinding.destroy();
        if (this._private__state !== null) {
            this._private__state.onDestroyed().unsubscribeAll(this);
        }
        this._private__mouseEventHandler.destroy();
    };
    PaneWidget.prototype.state = function () {
        return ensureNotNull(this._private__state);
    };
    PaneWidget.prototype.stateOrNull = function () {
        return this._private__state;
    };
    PaneWidget.prototype.setState = function (pane) {
        if (this._private__state !== null) {
            this._private__state.onDestroyed().unsubscribeAll(this);
        }
        this._private__state = pane;
        if (this._private__state !== null) {
            this._private__state.onDestroyed().subscribe(PaneWidget.prototype._private__onStateDestroyed.bind(this), this, true);
        }
        this.updatePriceAxisWidget();
    };
    PaneWidget.prototype.chart = function () {
        return this._private__chart;
    };
    PaneWidget.prototype.getElement = function () {
        return this._private__rowElement;
    };
    PaneWidget.prototype.updatePriceAxisWidget = function () {
        if (this._private__state === null || this._private__priceAxisWidget === null) {
            return;
        }
        if (this._private__model().serieses().length === 0) {
            return;
        }
        var priceScale = this._private__state.defaultPriceScale();
        this._private__priceAxisWidget.setPriceScale(ensureNotNull(priceScale));
    };
    PaneWidget.prototype.stretchFactor = function () {
        return this._private__state !== null ? this._private__state.stretchFactor() : 0;
    };
    PaneWidget.prototype.setStretchFactor = function (stretchFactor) {
        if (this._private__state) {
            this._private__state.setStretchFactor(stretchFactor);
        }
    };
    PaneWidget.prototype.mouseEnterEvent = function (event) {
        if (!this._private__state) {
            return;
        }
        var x = event.localX;
        var y = event.localY;
        if (!mobileTouch) {
            this._private__setCrosshairPosition(x, y);
        }
    };
    PaneWidget.prototype.mouseDownEvent = function (event) {
        this._private__longTap = false;
        this._private__exitTrackingModeOnNextTry = this._private__startTrackPoint !== null;
        if (!this._private__state) {
            return;
        }
        if (document.activeElement !== document.body && document.activeElement !== document.documentElement) {
            // If any focusable element except the page itself is focused, remove the focus
            ensureNotNull(document.activeElement).blur();
        }
        else {
            // Clear selection
            var selection = document.getSelection();
            if (selection !== null) {
                selection.removeAllRanges();
            }
        }
        var model = this._private__model();
        var priceScale = this._private__state.defaultPriceScale();
        if (priceScale.isEmpty() || model.timeScale().isEmpty()) {
            return;
        }
        if (this._private__startTrackPoint !== null) {
            var crosshair = model.crosshairSource();
            this._private__initCrosshairPosition = { x: crosshair.appliedX(), y: crosshair.appliedY() };
            this._private__startTrackPoint = { x: event.localX, y: event.localY };
        }
        if (!mobileTouch) {
            this._private__setCrosshairPosition(event.localX, event.localY);
        }
    };
    PaneWidget.prototype.mouseMoveEvent = function (event) {
        if (!this._private__state) {
            return;
        }
        var x = event.localX;
        var y = event.localY;
        if (this._private__preventCrosshairMove()) {
            this._private__clearCrosshairPosition();
        }
        if (!mobileTouch) {
            this._private__setCrosshairPosition(x, y);
            var hitTest = this.hitTest(x, y);
            this._private__model().setHoveredSource(hitTest && { source: hitTest.source, object: hitTest.object });
            if (hitTest !== null && hitTest.view.moveHandler !== undefined) {
                hitTest.view.moveHandler(x, y);
            }
        }
    };
    PaneWidget.prototype.mouseClickEvent = function (event) {
        if (this._private__state === null) {
            return;
        }
        var x = event.localX;
        var y = event.localY;
        var hitTest = this.hitTest(x, y);
        if (hitTest !== null && hitTest.view.clickHandler !== undefined) {
            hitTest.view.clickHandler(x, y);
        }
        if (this._private__clicked.hasListeners()) {
            var currentTime = this._private__model().crosshairSource().appliedIndex();
            this._private__clicked.fire(currentTime, { x: x, y: y });
        }
        this._private__tryExitTrackingMode();
    };
    // tslint:disable-next-line:cyclomatic-complexity
    PaneWidget.prototype.pressedMouseMoveEvent = function (event) {
        if (this._private__state === null) {
            return;
        }
        var model = this._private__model();
        var x = event.localX;
        var y = event.localY;
        if (this._private__startTrackPoint !== null) {
            // tracking mode: move crosshair
            this._private__exitTrackingModeOnNextTry = false;
            var origPoint = ensureNotNull(this._private__initCrosshairPosition);
            var newX = origPoint.x + (x - this._private__startTrackPoint.x);
            var newY = origPoint.y + (y - this._private__startTrackPoint.y);
            this._private__setCrosshairPosition(newX, newY);
        }
        else if (!this._private__preventCrosshairMove()) {
            this._private__setCrosshairPosition(x, y);
        }
        if (model.timeScale().isEmpty()) {
            return;
        }
        var scrollOptions = this._private__chart.options().handleScroll;
        if ((!scrollOptions.pressedMouseMove || event.type === 'touch') &&
            (!scrollOptions.horzTouchDrag && !scrollOptions.vertTouchDrag || event.type === 'mouse')) {
            return;
        }
        var priceScale = this._private__state.defaultPriceScale();
        if (this._private__startScrollingPos === null && !this._private__preventScroll()) {
            this._private__startScrollingPos = {
                x: event.clientX,
                y: event.clientY,
            };
        }
        if (this._private__startScrollingPos !== null &&
            (this._private__startScrollingPos.x !== event.clientX || this._private__startScrollingPos.y !== event.clientY)) {
            if (!this._private__isScrolling) {
                if (!priceScale.isEmpty()) {
                    model.startScrollPrice(this._private__state, priceScale, event.localY);
                }
                model.startScrollTime(event.localX);
                this._private__isScrolling = true;
            }
        }
        if (this._private__isScrolling) {
            // this allows scrolling not default price scales
            if (!priceScale.isEmpty()) {
                model.scrollPriceTo(this._private__state, priceScale, event.localY);
            }
            model.scrollTimeTo(event.localX);
        }
    };
    PaneWidget.prototype.mouseUpEvent = function (event) {
        if (this._private__state === null) {
            return;
        }
        this._private__longTap = false;
        var model = this._private__model();
        if (this._private__isScrolling) {
            var priceScale = this._private__state.defaultPriceScale();
            // this allows scrolling not default price scales
            model.endScrollPrice(this._private__state, priceScale);
            model.endScrollTime();
            this._private__startScrollingPos = null;
            this._private__isScrolling = false;
        }
    };
    PaneWidget.prototype.longTapEvent = function (event) {
        this._private__longTap = true;
        if (this._private__startTrackPoint === null && trackCrosshairOnlyAfterLongTap) {
            var point = { x: event.localX, y: event.localY };
            this._private__startTrackingMode(point, point);
        }
    };
    PaneWidget.prototype.mouseLeaveEvent = function (event) {
        if (this._private__state === null) {
            return;
        }
        this._private__state.model().setHoveredSource(null);
        if (!isMobile) {
            this._private__clearCrosshairPosition();
        }
    };
    PaneWidget.prototype.clicked = function () {
        return this._private__clicked;
    };
    PaneWidget.prototype.pinchStartEvent = function () {
        this._private__prevPinchScale = 1;
    };
    PaneWidget.prototype.pinchEvent = function (middlePoint, scale) {
        if (!this._private__chart.options().handleScale.pinch) {
            return;
        }
        var zoomScale = (scale - this._private__prevPinchScale) * 5;
        this._private__prevPinchScale = scale;
        this._private__model().zoomTime(middlePoint.x, zoomScale);
    };
    PaneWidget.prototype.hitTest = function (x, y) {
        var state = this._private__state;
        if (state === null) {
            return null;
        }
        var sources = state.orderedSources();
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            var sourceResult = this._private__hitTestPaneView(source.paneViews(state), x, y);
            if (sourceResult !== null) {
                return {
                    source: source,
                    view: sourceResult.view,
                    object: sourceResult.object,
                };
            }
        }
        return null;
    };
    PaneWidget.prototype.setPriceAxisSize = function (width) {
        ensureNotNull(this._private__priceAxisWidget).setSize(new Size(width, this._private__size.h));
    };
    PaneWidget.prototype.getSize = function () {
        return this._private__size;
    };
    PaneWidget.prototype.setSize = function (size) {
        if (size.w < 0 || size.h < 0) {
            throw new Error('Try to set invalid size to PaneWidget ' + JSON.stringify(size));
        }
        if (this._private__size.equals(size)) {
            return;
        }
        this._private__size = size;
        this._private__canvasBinding.resizeCanvas({ width: size.w, height: size.h });
        this._private__topCanvasBinding.resizeCanvas({ width: size.w, height: size.h });
        this._private__paneCell.style.width = size.w + 'px';
        this._private__paneCell.style.height = size.h + 'px';
    };
    PaneWidget.prototype.recalculatePriceScale = function () {
        var pane = ensureNotNull(this._private__state);
        pane.recalculatePriceScale(pane.defaultPriceScale());
        for (var _i = 0, _a = pane.dataSources(); _i < _a.length; _i++) {
            var source = _a[_i];
            if (pane.isOverlay(source)) {
                var priceScale = source.priceScale();
                if (priceScale !== null) {
                    pane.recalculatePriceScale(priceScale);
                }
                // for overlay drawings price scale is owner's price scale
                // however owner's price scale could not contain ds
                source.updateAllViews();
            }
        }
    };
    PaneWidget.prototype.getImage = function () {
        return this._private__canvasBinding.canvas;
    };
    PaneWidget.prototype.paint = function (type) {
        if (type === 0) {
            return;
        }
        if (this._private__state === null) {
            return;
        }
        if (type > 1 /* Cursor */) {
            this.recalculatePriceScale();
        }
        if (this._private__priceAxisWidget !== null) {
            this._private__priceAxisWidget.paint(type);
        }
        if (type !== 1 /* Cursor */) {
            var ctx = getContext2D(this._private__canvasBinding.canvas);
            ctx.save();
            this._private__drawBackground(ctx, this._private__backgroundColor(), this._private__canvasBinding.pixelRatio);
            if (this._private__state) {
                this._private__drawGrid(ctx, this._private__canvasBinding.pixelRatio);
                this._private__drawWatermark(ctx, this._private__canvasBinding.pixelRatio);
                this._private__drawSources(ctx, this._private__canvasBinding.pixelRatio);
            }
            ctx.restore();
        }
        var topCtx = getContext2D(this._private__topCanvasBinding.canvas);
        topCtx.clearRect(0, 0, Math.ceil(this._private__size.w * this._private__topCanvasBinding.pixelRatio), Math.ceil(this._private__size.h * this._private__topCanvasBinding.pixelRatio));
        this._private__drawCrosshair(topCtx, this._private__topCanvasBinding.pixelRatio);
    };
    PaneWidget.prototype.priceAxisWidget = function () {
        return this._private__priceAxisWidget;
    };
    PaneWidget.prototype._private__backgroundColor = function () {
        return this._private__chart.options().layout.backgroundColor;
    };
    PaneWidget.prototype._private__onStateDestroyed = function () {
        if (this._private__state !== null) {
            this._private__state.onDestroyed().unsubscribeAll(this);
        }
        this._private__state = null;
    };
    PaneWidget.prototype._private__drawBackground = function (ctx, color, pixelRatio) {
        var _this = this;
        drawScaled(ctx, pixelRatio, function () {
            clearRect(ctx, 0, 0, _this._private__size.w, _this._private__size.h, color);
        });
    };
    PaneWidget.prototype._private__drawGrid = function (ctx, pixelRatio) {
        var state = ensureNotNull(this._private__state);
        var source = this._private__model().gridSource();
        // NOTE: grid source requires Pane instance for paneViews (for the nonce)
        var paneViews = source.paneViews(state);
        var height = state.height();
        var width = state.width();
        for (var _i = 0, paneViews_1 = paneViews; _i < paneViews_1.length; _i++) {
            var paneView = paneViews_1[_i];
            ctx.save();
            var renderer = paneView.renderer(height, width);
            if (renderer !== null) {
                renderer.draw(ctx, pixelRatio, false);
            }
            ctx.restore();
        }
    };
    PaneWidget.prototype._private__drawWatermark = function (ctx, pixelRatio) {
        var source = this._private__model().watermarkSource();
        if (source === null) {
            return;
        }
        var state = ensureNotNull(this._private__state);
        if (!state.containsSeries()) {
            return;
        }
        var paneViews = source.paneViews();
        var height = state.height();
        var width = state.width();
        for (var _i = 0, paneViews_2 = paneViews; _i < paneViews_2.length; _i++) {
            var paneView = paneViews_2[_i];
            ctx.save();
            var renderer = paneView.renderer(height, width);
            if (renderer !== null) {
                renderer.draw(ctx, pixelRatio, false);
            }
            ctx.restore();
        }
    };
    PaneWidget.prototype._private__drawCrosshair = function (ctx, pixelRatio) {
        this._private__drawSource(this._private__model().crosshairSource(), ctx, pixelRatio);
    };
    PaneWidget.prototype._private__drawSources = function (ctx, pixelRatio) {
        var state = ensureNotNull(this._private__state);
        var sources = state.orderedSources();
        var crosshairSource = this._private__model().crosshairSource();
        for (var _i = 0, sources_2 = sources; _i < sources_2.length; _i++) {
            var source = sources_2[_i];
            this._private__drawSourceBackground(source, ctx, pixelRatio);
        }
        for (var _a = 0, sources_3 = sources; _a < sources_3.length; _a++) {
            var source = sources_3[_a];
            if (source !== crosshairSource) {
                this._private__drawSource(source, ctx, pixelRatio);
            }
        }
    };
    PaneWidget.prototype._private__drawSource = function (source, ctx, pixelRatio) {
        var state = ensureNotNull(this._private__state);
        var paneViews = source.paneViews(state);
        var height = state.height();
        var width = state.width();
        var hoveredSource = state.model().hoveredSource();
        var isHovered = hoveredSource !== null && hoveredSource.source === source;
        var objecId = hoveredSource !== null && isHovered && hoveredSource.object !== undefined
            ? hoveredSource.object.hitTestData
            : undefined;
        for (var _i = 0, paneViews_3 = paneViews; _i < paneViews_3.length; _i++) {
            var paneView = paneViews_3[_i];
            var renderer = paneView.renderer(height, width);
            if (renderer !== null) {
                ctx.save();
                renderer.draw(ctx, pixelRatio, isHovered, objecId);
                ctx.restore();
            }
        }
    };
    PaneWidget.prototype._private__drawSourceBackground = function (source, ctx, pixelRatio) {
        var state = ensureNotNull(this._private__state);
        var paneViews = source.paneViews(state);
        var height = state.height();
        var width = state.width();
        var hoveredSource = state.model().hoveredSource();
        var isHovered = hoveredSource !== null && hoveredSource.source === source;
        var objecId = hoveredSource !== null && isHovered && hoveredSource.object !== undefined
            ? hoveredSource.object.hitTestData
            : undefined;
        for (var _i = 0, paneViews_4 = paneViews; _i < paneViews_4.length; _i++) {
            var paneView = paneViews_4[_i];
            var renderer = paneView.renderer(height, width);
            if (renderer !== null && renderer.drawBackground !== undefined) {
                ctx.save();
                renderer.drawBackground(ctx, pixelRatio, isHovered, objecId);
                ctx.restore();
            }
        }
    };
    PaneWidget.prototype._private__hitTestPaneView = function (paneViews, x, y) {
        for (var _i = 0, paneViews_5 = paneViews; _i < paneViews_5.length; _i++) {
            var paneView = paneViews_5[_i];
            var renderer = paneView.renderer(this._private__size.h, this._private__size.w);
            if (renderer !== null && renderer.hitTest) {
                var result = renderer.hitTest(x, y);
                if (result !== null) {
                    return {
                        view: paneView,
                        object: result,
                    };
                }
            }
        }
        return null;
    };
    PaneWidget.prototype._private__recreatePriceAxisWidget = function () {
        this._private__recreatePriceAxisWidgetImpl();
        this._private__chart.adjustSize();
    };
    PaneWidget.prototype._private__recreatePriceAxisWidgetImpl = function () {
        if (this._private__state === null) {
            return;
        }
        var chart = this._private__chart;
        var axisPosition = this._private__state.defaultPriceScale().options().position;
        if (this._private__priceAxisPosition === axisPosition) {
            return;
        }
        if (this._private__priceAxisWidget !== null) {
            if (this._private__priceAxisWidget.isLeft()) {
                this._private__leftAxisCell.removeChild(this._private__priceAxisWidget.getElement());
            }
            else {
                this._private__rightAxisCell.removeChild(this._private__priceAxisWidget.getElement());
            }
            this._private__priceAxisWidget.destroy();
            this._private__priceAxisWidget = null;
        }
        if (axisPosition !== 'none') {
            var rendererOptionsProvider = chart.model().rendererOptionsProvider();
            this._private__priceAxisWidget = new PriceAxisWidget(this, chart.options().layout, rendererOptionsProvider, axisPosition);
            if (axisPosition === 'left') {
                this._private__leftAxisCell.appendChild(this._private__priceAxisWidget.getElement());
            }
            if (axisPosition === 'right') {
                this._private__rightAxisCell.appendChild(this._private__priceAxisWidget.getElement());
            }
        }
        this._private__priceAxisPosition = axisPosition;
    };
    PaneWidget.prototype._private__preventCrosshairMove = function () {
        return trackCrosshairOnlyAfterLongTap && this._private__startTrackPoint === null;
    };
    PaneWidget.prototype._private__preventScroll = function () {
        return trackCrosshairOnlyAfterLongTap && this._private__longTap || this._private__startTrackPoint !== null;
    };
    PaneWidget.prototype._private__correctXCoord = function (x) {
        return Math.max(0, Math.min(x, this._private__size.w - 1));
    };
    PaneWidget.prototype._private__correctYCoord = function (y) {
        return Math.max(0, Math.min(y, this._private__size.h - 1));
    };
    PaneWidget.prototype._private__setCrosshairPosition = function (x, y) {
        this._private__model().setAndSaveCurrentPosition(this._private__correctXCoord(x), this._private__correctYCoord(y), ensureNotNull(this._private__state));
    };
    PaneWidget.prototype._private__clearCrosshairPosition = function () {
        this._private__model().clearCurrentPosition();
    };
    PaneWidget.prototype._private__tryExitTrackingMode = function () {
        if (this._private__exitTrackingModeOnNextTry) {
            this._private__startTrackPoint = null;
            this._private__clearCrosshairPosition();
        }
    };
    PaneWidget.prototype._private__startTrackingMode = function (startTrackPoint, crossHairPosition) {
        this._private__startTrackPoint = startTrackPoint;
        this._private__exitTrackingModeOnNextTry = false;
        this._private__setCrosshairPosition(crossHairPosition.x, crossHairPosition.y);
        var crosshair = this._private__model().crosshairSource();
        this._private__initCrosshairPosition = { x: crosshair.appliedX(), y: crosshair.appliedY() };
    };
    PaneWidget.prototype._private__model = function () {
        return this._private__chart.model();
    };
    return PaneWidget;
}());

var PriceAxisStub = /** @class */ (function () {
    function PriceAxisStub(side, options, params, borderVisible) {
        var _this = this;
        this._private__invalidated = true;
        this._private__size = new Size(0, 0);
        this._private__canvasConfiguredHandler = function () { return _this.paint(3 /* Full */); };
        this._private__isLeft = side === 'left';
        this._private__rendererOptionsProvider = params.rendererOptionsProvider;
        this._private__options = options;
        this._private__borderVisible = borderVisible;
        this._private__cell = document.createElement('div');
        this._private__cell.style.width = '25px';
        this._private__cell.style.height = '100%';
        this._private__cell.style.overflow = 'hidden';
        this._private__canvasBinding = createBoundCanvas(this._private__cell, new Size(16, 16));
        this._private__canvasBinding.subscribeCanvasConfigured(this._private__canvasConfiguredHandler);
    }
    PriceAxisStub.prototype.destroy = function () {
        this._private__canvasBinding.unsubscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        this._private__canvasBinding.destroy();
    };
    PriceAxisStub.prototype.update = function () {
        this._private__invalidated = true;
    };
    PriceAxisStub.prototype.getElement = function () {
        return this._private__cell;
    };
    PriceAxisStub.prototype.getSize = function () {
        return this._private__size;
    };
    PriceAxisStub.prototype.setSize = function (size) {
        if (size.w < 0 || size.h < 0) {
            throw new Error('Try to set invalid size to PriceAxisStub ' + JSON.stringify(size));
        }
        if (!this._private__size.equals(size)) {
            this._private__size = size;
            this._private__canvasBinding.resizeCanvas({ width: size.w, height: size.h });
            this._private__cell.style.width = size.w + "px";
            this._private__cell.style.minWidth = size.w + "px"; // for right calculate position of .pane-legend
            this._private__cell.style.height = size.h + "px";
            this._private__invalidated = true;
        }
    };
    PriceAxisStub.prototype.paint = function (type) {
        if (type < 3 /* Full */ && !this._private__invalidated) {
            return;
        }
        if (this._private__size.w === 0 || this._private__size.h === 0) {
            return;
        }
        this._private__invalidated = false;
        var ctx = getContext2D(this._private__canvasBinding.canvas);
        this._private__drawBackground(ctx, this._private__canvasBinding.pixelRatio);
        this._private__drawBorder(ctx, this._private__canvasBinding.pixelRatio);
    };
    PriceAxisStub.prototype.getImage = function () {
        return this._private__canvasBinding.canvas;
    };
    PriceAxisStub.prototype.isLeft = function () {
        return this._private__isLeft;
    };
    PriceAxisStub.prototype._private__drawBorder = function (ctx, pixelRatio) {
        if (!this._private__borderVisible()) {
            return;
        }
        var width = this._private__size.w;
        ctx.save();
        ctx.fillStyle = this._private__options.timeScale.borderColor;
        var borderSize = Math.floor(this._private__rendererOptionsProvider.options().borderSize * pixelRatio);
        var left = (this._private__isLeft) ? Math.round(width * pixelRatio) - borderSize : 0;
        ctx.fillRect(left, 0, borderSize, borderSize);
        ctx.restore();
    };
    PriceAxisStub.prototype._private__drawBackground = function (ctx, pixelRatio) {
        var _this = this;
        drawScaled(ctx, pixelRatio, function () {
            clearRect(ctx, 0, 0, _this._private__size.w, _this._private__size.h, _this._private__options.layout.backgroundColor);
        });
    };
    return PriceAxisStub;
}());

var Constants$4;
(function (Constants) {
    Constants[Constants["BorderSize"] = 1] = "BorderSize";
    Constants[Constants["TickLength"] = 3] = "TickLength";
})(Constants$4 || (Constants$4 = {}));
var CursorType$1;
(function (CursorType) {
    CursorType[CursorType["Default"] = 0] = "Default";
    CursorType[CursorType["EwResize"] = 1] = "EwResize";
})(CursorType$1 || (CursorType$1 = {}));
function markWithGreaterSpan(a, b) {
    return a.span > b.span ? a : b;
}
var TimeAxisWidget = /** @class */ (function () {
    function TimeAxisWidget(chartWidget) {
        var _this = this;
        this._private__stub = null;
        this._private__minVisibleSpan = 70 /* Year */;
        this._private__rendererOptions = null;
        this._private__mouseDown = false;
        this._private__size = new Size(0, 0);
        this._private__priceAxisPosition = 'none';
        this._private__canvasConfiguredHandler = function () { return _this._private__chart.model().lightUpdate(); };
        this._private__topCanvasConfiguredHandler = function () { return _this._private__chart.model().lightUpdate(); };
        this._private__chart = chartWidget;
        this._private__options = chartWidget.options().layout;
        this._private__element = document.createElement('tr');
        this._private__leftStubCell = document.createElement('td');
        this._private__leftStubCell.style.padding = '0';
        this._private__rightStubCell = document.createElement('td');
        this._private__rightStubCell.style.padding = '0';
        this._private__cell = document.createElement('td');
        this._private__cell.style.height = '25px';
        this._private__cell.style.padding = '0';
        this._private__dv = document.createElement('div');
        this._private__dv.style.width = '100%';
        this._private__dv.style.height = '100%';
        this._private__dv.style.position = 'relative';
        this._private__dv.style.overflow = 'hidden';
        this._private__cell.appendChild(this._private__dv);
        this._private__canvasBinding = createBoundCanvas(this._private__dv, new Size(16, 16));
        this._private__canvasBinding.subscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        var canvas = this._private__canvasBinding.canvas;
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        canvas.style.left = '0';
        canvas.style.top = '0';
        this._private__topCanvasBinding = createBoundCanvas(this._private__dv, new Size(16, 16));
        this._private__topCanvasBinding.subscribeCanvasConfigured(this._private__topCanvasConfiguredHandler);
        var topCanvas = this._private__topCanvasBinding.canvas;
        topCanvas.style.position = 'absolute';
        topCanvas.style.zIndex = '2';
        topCanvas.style.left = '0';
        topCanvas.style.top = '0';
        this._private__element.appendChild(this._private__leftStubCell);
        this._private__element.appendChild(this._private__cell);
        this._private__element.appendChild(this._private__rightStubCell);
        this._private__recreateStub();
        this._private__chart.model().mainPriceScaleOptionsChanged().subscribe(this._private__recreateStub.bind(this), this);
        this._private__mouseEventHandler = new MouseEventHandler(this._private__topCanvasBinding.canvas, this, {
            treatVertTouchDragAsPageScroll: true,
            treatHorzTouchDragAsPageScroll: false,
        });
    }
    TimeAxisWidget.prototype.destroy = function () {
        this._private__mouseEventHandler.destroy();
        if (this._private__stub !== null) {
            this._private__stub.destroy();
        }
        this._private__topCanvasBinding.unsubscribeCanvasConfigured(this._private__topCanvasConfiguredHandler);
        this._private__topCanvasBinding.destroy();
        this._private__canvasBinding.unsubscribeCanvasConfigured(this._private__canvasConfiguredHandler);
        this._private__canvasBinding.destroy();
    };
    TimeAxisWidget.prototype.getElement = function () {
        return this._private__element;
    };
    TimeAxisWidget.prototype.stub = function () {
        return this._private__stub;
    };
    TimeAxisWidget.prototype.mouseDownEvent = function (event) {
        if (this._private__mouseDown) {
            return;
        }
        this._private__mouseDown = true;
        var model = this._private__chart.model();
        if (model.timeScale().isEmpty() || !this._private__chart.options().handleScale.axisPressedMouseMove) {
            return;
        }
        model.startScaleTime(event.localX);
    };
    TimeAxisWidget.prototype.mouseDownOutsideEvent = function () {
        var model = this._private__chart.model();
        if (!model.timeScale().isEmpty() && this._private__mouseDown) {
            this._private__mouseDown = false;
            if (this._private__chart.options().handleScale.axisPressedMouseMove) {
                model.endScaleTime();
            }
        }
    };
    TimeAxisWidget.prototype.pressedMouseMoveEvent = function (event) {
        var model = this._private__chart.model();
        if (model.timeScale().isEmpty() || !this._private__chart.options().handleScale.axisPressedMouseMove) {
            return;
        }
        model.scaleTimeTo(event.localX);
    };
    TimeAxisWidget.prototype.mouseUpEvent = function (event) {
        this._private__mouseDown = false;
        var model = this._private__chart.model();
        if (model.timeScale().isEmpty() && !this._private__chart.options().handleScale.axisPressedMouseMove) {
            return;
        }
        model.endScaleTime();
    };
    TimeAxisWidget.prototype.mouseDoubleClickEvent = function () {
        if (this._private__chart.options().handleScale.axisDoubleClickReset) {
            this._private__chart.model().resetTimeScale();
        }
    };
    TimeAxisWidget.prototype.mouseEnterEvent = function (e) {
        if (this._private__chart.model().options().handleScale.axisPressedMouseMove) {
            this._private__setCursor(1 /* EwResize */);
        }
    };
    TimeAxisWidget.prototype.mouseLeaveEvent = function (e) {
        this._private__setCursor(0 /* Default */);
    };
    TimeAxisWidget.prototype.getSize = function () {
        return this._private__size;
    };
    TimeAxisWidget.prototype.setSizes = function (timeAxisSize, stubWidth) {
        if (!this._private__size || !this._private__size.equals(timeAxisSize)) {
            this._private__size = timeAxisSize;
            this._private__canvasBinding.resizeCanvas({ width: timeAxisSize.w, height: timeAxisSize.h });
            this._private__topCanvasBinding.resizeCanvas({ width: timeAxisSize.w, height: timeAxisSize.h });
            this._private__cell.style.width = timeAxisSize.w + 'px';
            this._private__cell.style.height = timeAxisSize.h + 'px';
        }
        if (this._private__stub !== null) {
            this._private__stub.setSize(new Size(stubWidth, timeAxisSize.h));
        }
    };
    TimeAxisWidget.prototype.width = function () {
        return this._private__size.w;
    };
    TimeAxisWidget.prototype.height = function () {
        return this._private__size.h;
    };
    TimeAxisWidget.prototype.optimalHeight = function () {
        var rendererOptions = this._private__getRendererOptions();
        return Math.ceil(
        // rendererOptions.offsetSize +
        rendererOptions.borderSize +
            rendererOptions.tickLength +
            rendererOptions.fontSize +
            rendererOptions.paddingTop +
            rendererOptions.paddingBottom);
    };
    TimeAxisWidget.prototype.update = function () {
        var _this = this;
        var tickMarks = this._private__chart.model().timeScale().marks();
        if (!tickMarks) {
            return;
        }
        this._private__minVisibleSpan = 70 /* Year */;
        tickMarks.forEach(function (tickMark) {
            _this._private__minVisibleSpan = Math.min(tickMark.span, _this._private__minVisibleSpan);
        });
    };
    TimeAxisWidget.prototype.getImage = function () {
        return this._private__canvasBinding.canvas;
    };
    TimeAxisWidget.prototype.paint = function (type) {
        if (type === 0 /* None */) {
            return;
        }
        if (type !== 1 /* Cursor */) {
            var ctx = getContext2D(this._private__canvasBinding.canvas);
            this._private__drawBackground(ctx, this._private__canvasBinding.pixelRatio);
            this._private__drawBorder(ctx, this._private__canvasBinding.pixelRatio);
            this._private__drawTickMarks(ctx, this._private__canvasBinding.pixelRatio);
            this._private__drawBackLabels(ctx, this._private__canvasBinding.pixelRatio);
            if (this._private__stub !== null) {
                this._private__stub.paint(type);
            }
        }
        var topCtx = getContext2D(this._private__topCanvasBinding.canvas);
        this._private__drawCrosshairLabel(topCtx, this._private__topCanvasBinding.pixelRatio);
    };
    TimeAxisWidget.prototype._private__drawBackground = function (ctx, pixelRatio) {
        var _this = this;
        drawScaled(ctx, pixelRatio, function () {
            clearRect(ctx, 0, 0, _this._private__size.w, _this._private__size.h, _this._private__backgroundColor());
        });
    };
    TimeAxisWidget.prototype._private__drawBorder = function (ctx, pixelRatio) {
        if (this._private__chart.options().timeScale.borderVisible) {
            ctx.save();
            ctx.fillStyle = this._private__lineColor();
            var borderSize = Math.max(1, Math.floor(this._private__getRendererOptions().borderSize * pixelRatio));
            ctx.fillRect(0, 0, Math.ceil(this._private__size.w * pixelRatio), borderSize);
            ctx.restore();
        }
    };
    TimeAxisWidget.prototype._private__drawTickMarks = function (ctx, pixelRatio) {
        var _this = this;
        var tickMarks = this._private__chart.model().timeScale().marks();
        if (!tickMarks || tickMarks.length === 0) {
            return;
        }
        // select max span
        /*
        5 * ?SEC -> 11;
        15 * ?SEC -> 12;
        30 * ?SEC -> 13;
        ?MIN -> 20;
        5 * ?MIN -> 21;
        15 * ?MIN -> 21;
        30 * ?MIN -> 22;
        ?HOUR -> 30;
        3 * ?HOUR -> 31;
        6 * ?HOUR -> 32;
        12 * ?HOUR -> 33;
        ?DAY -> 40;
        ?WEEK -> 50;
        ?MONTH -> 60;
        ?YEAR -> 70
        */
        var maxSpan = tickMarks.reduce(markWithGreaterSpan, tickMarks[0]).span;
        // special case: it looks strange if 15:00 is bold but 14:00 is not
        // so if maxSpan > 30 and < 40 reduce it to 30
        if (maxSpan > 30 && maxSpan < 40) {
            maxSpan = 30;
        }
        ctx.save();
        ctx.strokeStyle = this._private__lineColor();
        var rendererOptions = this._private__getRendererOptions();
        var yText = (rendererOptions.borderSize +
            rendererOptions.tickLength +
            rendererOptions.paddingTop +
            rendererOptions.fontSize -
            rendererOptions.baselineOffset);
        ctx.textAlign = 'center';
        ctx.fillStyle = this._private__lineColor();
        var borderSize = Math.floor(this._private__getRendererOptions().borderSize * pixelRatio);
        var tickWidth = Math.max(1, Math.floor(pixelRatio));
        var tickOffset = Math.floor(pixelRatio * 0.5);
        if (this._private__chart.model().timeScale().options().borderVisible) {
            ctx.beginPath();
            var tickLen = Math.round(rendererOptions.tickLength * pixelRatio);
            for (var index = tickMarks.length; index--;) {
                var x = Math.round(tickMarks[index].coord * pixelRatio);
                ctx.rect(x - tickOffset, borderSize, tickWidth, tickLen);
            }
            ctx.fill();
        }
        ctx.fillStyle = this._private__textColor();
        drawScaled(ctx, pixelRatio, function () {
            // draw base marks
            ctx.font = _this._private__baseFont();
            for (var _i = 0, tickMarks_1 = tickMarks; _i < tickMarks_1.length; _i++) {
                var tickMark = tickMarks_1[_i];
                if (tickMark.span < maxSpan) {
                    ctx.fillText(tickMark.label, tickMark.coord, yText);
                }
            }
            ctx.font = _this._private__baseBoldFont();
            for (var _a = 0, tickMarks_2 = tickMarks; _a < tickMarks_2.length; _a++) {
                var tickMark = tickMarks_2[_a];
                if (tickMark.span >= maxSpan) {
                    ctx.fillText(tickMark.label, tickMark.coord, yText);
                }
            }
        });
    };
    TimeAxisWidget.prototype._private__drawBackLabels = function (ctx, pixelRatio) {
        ctx.save();
        var topLevelSources = new Set();
        var model = this._private__chart.model();
        var sources = model.dataSources();
        topLevelSources.add(model.crosshairSource());
        var rendererOptions = this._private__getRendererOptions();
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            if (topLevelSources.has(source)) {
                continue;
            }
            var views = source.timeAxisViews();
            for (var _a = 0, views_1 = views; _a < views_1.length; _a++) {
                var view = views_1[_a];
                view.renderer().draw(ctx, rendererOptions, pixelRatio);
            }
        }
        ctx.restore();
    };
    TimeAxisWidget.prototype._private__drawCrosshairLabel = function (ctx, pixelRatio) {
        ctx.save();
        ctx.clearRect(0, 0, Math.ceil(this._private__size.w * pixelRatio), Math.ceil(this._private__size.h * pixelRatio));
        var model = this._private__chart.model();
        var views = []; // array of arrays
        var timeAxisViews = model.crosshairSource().timeAxisViews();
        views.push(timeAxisViews);
        var renderingOptions = this._private__getRendererOptions();
        views.forEach(function (arr) {
            arr.forEach(function (view) {
                ctx.save();
                view.renderer().draw(ctx, renderingOptions, pixelRatio);
                ctx.restore();
            });
        });
        ctx.restore();
    };
    TimeAxisWidget.prototype._private__backgroundColor = function () {
        return this._private__options.backgroundColor;
    };
    TimeAxisWidget.prototype._private__lineColor = function () {
        return this._private__chart.options().timeScale.borderColor;
    };
    TimeAxisWidget.prototype._private__textColor = function () {
        return this._private__options.textColor;
    };
    TimeAxisWidget.prototype._private__fontSize = function () {
        return this._private__options.fontSize;
    };
    TimeAxisWidget.prototype._private__baseFont = function () {
        return makeFont(this._private__fontSize(), this._private__options.fontFamily);
    };
    TimeAxisWidget.prototype._private__baseBoldFont = function () {
        return makeFont(this._private__fontSize(), this._private__options.fontFamily, 'bold');
    };
    TimeAxisWidget.prototype._private__getRendererOptions = function () {
        if (this._private__rendererOptions === null) {
            this._private__rendererOptions = {
                borderSize: 1 /* BorderSize */,
                baselineOffset: NaN,
                paddingTop: NaN,
                paddingBottom: NaN,
                paddingHorizontal: NaN,
                tickLength: 3 /* TickLength */,
                fontSize: NaN,
                font: '',
                widthCache: new TextWidthCache(),
            };
        }
        var rendererOptions = this._private__rendererOptions;
        var newFont = this._private__baseFont();
        if (rendererOptions.font !== newFont) {
            var fontSize = this._private__fontSize();
            rendererOptions.fontSize = fontSize;
            rendererOptions.font = newFont;
            rendererOptions.paddingTop = Math.ceil(fontSize / 2.5);
            rendererOptions.paddingBottom = rendererOptions.paddingTop;
            rendererOptions.paddingHorizontal = Math.ceil(fontSize / 2);
            rendererOptions.baselineOffset = Math.round(this._private__fontSize() / 5);
            rendererOptions.widthCache.reset();
        }
        return this._private__rendererOptions;
    };
    TimeAxisWidget.prototype._private__setCursor = function (type) {
        this._private__cell.style.cursor = type === 1 /* EwResize */ ? 'ew-resize' : 'default';
    };
    TimeAxisWidget.prototype._private__recreateStub = function () {
        var priceAxisPosition = this._private__chart.model().mainPriceScale().options().position;
        if (priceAxisPosition === this._private__priceAxisPosition) {
            return;
        }
        if (this._private__stub !== null) {
            if (this._private__stub.isLeft()) {
                this._private__leftStubCell.removeChild(this._private__stub.getElement());
            }
            else {
                this._private__rightStubCell.removeChild(this._private__stub.getElement());
            }
            this._private__stub.destroy();
            this._private__stub = null;
        }
        if (priceAxisPosition !== 'none') {
            var rendererOptionsProvider = this._private__chart.model().rendererOptionsProvider();
            var params = {
                rendererOptionsProvider: rendererOptionsProvider,
            };
            var model_1 = this._private__chart.model();
            var borderVisibleGetter = function () {
                return model_1.mainPriceScale().options().borderVisible && model_1.timeScale().options().borderVisible;
            };
            this._private__stub = new PriceAxisStub(priceAxisPosition, this._private__chart.options(), params, borderVisibleGetter);
            var stubCell = priceAxisPosition === 'left' ? this._private__leftStubCell : this._private__rightStubCell;
            stubCell.appendChild(this._private__stub.getElement());
        }
        this._private__priceAxisPosition = priceAxisPosition;
    };
    return TimeAxisWidget;
}());

var ChartWidget = /** @class */ (function () {
    function ChartWidget(container, options) {
        var _this = this;
        this._private__paneWidgets = [];
        this._private__paneSeparators = [];
        this._private__drawRafId = 0;
        this._private__priceAxisWidthChanged = new Delegate();
        this._private__height = 0;
        this._private__width = 0;
        this._private__priceAxisWidth = 0;
        this._private__invalidateMask = null;
        this._private__drawPlanned = false;
        this._private__clicked = new Delegate();
        this._private__crosshairMoved = new Delegate();
        this._private__options = options;
        this._private__element = document.createElement('div');
        this._private__element.classList.add('tv-lightweight-charts');
        this._private__element.style.overflow = 'hidden';
        this._private__element.style.width = '100%';
        this._private__element.style.height = '100%';
        this._private__tableElement = document.createElement('table');
        this._private__tableElement.setAttribute('cellspacing', '0');
        this._private__element.appendChild(this._private__tableElement);
        this._private__onWheelBound = this._private__onMousewheel.bind(this);
        this._private__element.addEventListener('wheel', this._private__onWheelBound, { passive: false });
        this._private__model = new ChartModel(this._private__invalidateHandler.bind(this), this._private__options);
        this.model().crosshairMoved().subscribe(this._private__onPaneWidgetCrosshairMoved.bind(this), this);
        this._private__timeAxisWidget = new TimeAxisWidget(this);
        this._private__tableElement.appendChild(this._private__timeAxisWidget.getElement());
        var width = this._private__options.width;
        var height = this._private__options.height;
        if (width === 0 && height === 0) {
            var containerRect = container.getBoundingClientRect();
            // TODO: Fix it better
            // on Hi-DPI CSS size * Device Pixel Ratio should be integer to avoid smoothing
            // For chart widget we decreases because we must be inside container.
            // For time axis this is not important, since it just affects space for pane widgets
            width = Math.floor(containerRect.width);
            if (width % 2) {
                width -= 1;
            }
            height = Math.floor(containerRect.height);
            if (height % 2) {
                height -= 1;
            }
        }
        width = Math.max(70, width);
        height = Math.max(50, height);
        // BEWARE: resize must be called BEFORE _syncGuiWithModel (in constructor only)
        // or after but with adjustSize to properly update time scale
        this.resize(width, height);
        this._private__syncGuiWithModel();
        container.appendChild(this._private__element);
        this._private__updateTimeAxisVisibility();
        this._private__model.timeScale().optionsApplied().subscribe(function () {
            _this._private__updateTimeAxisVisibility();
            _this.adjustSize();
        }, this);
    }
    ChartWidget.prototype.model = function () {
        return this._private__model;
    };
    ChartWidget.prototype.options = function () {
        return this._private__options;
    };
    ChartWidget.prototype.paneWidgets = function () {
        return this._private__paneWidgets;
    };
    ChartWidget.prototype.destroy = function () {
        this._private__element.removeEventListener('wheel', this._private__onWheelBound);
        if (this._private__drawRafId !== 0) {
            window.cancelAnimationFrame(this._private__drawRafId);
        }
        this._private__model.crosshairMoved().unsubscribeAll(this);
        this._private__model.timeScale().optionsApplied().unsubscribeAll(this);
        this._private__model.destroy();
        for (var _i = 0, _a = this._private__paneWidgets; _i < _a.length; _i++) {
            var paneWidget = _a[_i];
            this._private__tableElement.removeChild(paneWidget.getElement());
            paneWidget.clicked().unsubscribeAll(this);
            paneWidget.destroy();
        }
        this._private__paneWidgets = [];
        for (var _b = 0, _c = this._private__paneSeparators; _b < _c.length; _b++) {
            var paneSeparator = _c[_b];
            this._private__destroySeparator(paneSeparator);
        }
        this._private__paneSeparators = [];
        ensureNotNull(this._private__timeAxisWidget).destroy();
        if (this._private__element.parentElement !== null) {
            this._private__element.parentElement.removeChild(this._private__element);
        }
        this._private__crosshairMoved.destroy();
        this._private__clicked.destroy();
        delete this._private__element;
    };
    ChartWidget.prototype.resize = function (width, height, forceRepaint) {
        if (forceRepaint === void 0) { forceRepaint = false; }
        if (this._private__height === height && this._private__width === width) {
            return;
        }
        this._private__height = height;
        this._private__width = width;
        var heightStr = height + 'px';
        var widthStr = width + 'px';
        ensureNotNull(this._private__element).style.height = heightStr;
        ensureNotNull(this._private__element).style.width = widthStr;
        this._private__tableElement.style.height = heightStr;
        this._private__tableElement.style.width = widthStr;
        if (forceRepaint) {
            this._private__drawImpl(new InvalidateMask(3 /* Full */));
        }
        else {
            this._private__model.fullUpdate();
        }
    };
    ChartWidget.prototype.paint = function (invalidateMask) {
        if (invalidateMask === undefined) {
            invalidateMask = new InvalidateMask(3 /* Full */);
        }
        for (var i = 0; i < this._private__paneWidgets.length; i++) {
            this._private__paneWidgets[i].paint(invalidateMask.invalidateForPane(i).level);
        }
        this._private__timeAxisWidget.paint(invalidateMask.fullInvalidation());
    };
    ChartWidget.prototype.adjustSize = function () {
        this._private__adjustSizeImpl();
        this._private__model.fullUpdate();
    };
    ChartWidget.prototype.applyOptions = function (options) {
        this._private__model.applyOptions(options);
        this._private__updateTimeAxisVisibility();
        var width = options.width || this._private__width;
        var height = options.height || this._private__height;
        this.resize(width, height);
    };
    ChartWidget.prototype.clicked = function () {
        return this._private__clicked;
    };
    ChartWidget.prototype.crosshairMoved = function () {
        return this._private__crosshairMoved;
    };
    ChartWidget.prototype.takeScreenshot = function () {
        var _this = this;
        if (this._private__invalidateMask !== null) {
            this._private__drawImpl(this._private__invalidateMask);
            this._private__invalidateMask = null;
        }
        // calculate target size
        var firstPane = this._private__paneWidgets[0];
        var targetCanvas = createPreconfiguredCanvas(document, new Size(this._private__width, this._private__height));
        var ctx = getContext2D(targetCanvas);
        var pixelRatio = getCanvasDevicePixelRatio(targetCanvas);
        drawScaled(ctx, pixelRatio, function () {
            var targetX = 0;
            var targetY = 0;
            var drawPriceAxises = function () {
                for (var paneIndex = 0; paneIndex < _this._private__paneWidgets.length; paneIndex++) {
                    var paneWidget = _this._private__paneWidgets[paneIndex];
                    var paneWidgetHeight = paneWidget.getSize().h;
                    var priceAxisWidget = ensureNotNull(paneWidget.priceAxisWidget());
                    var image = priceAxisWidget.getImage();
                    ctx.drawImage(image, targetX, targetY, priceAxisWidget.getWidth(), paneWidgetHeight);
                    targetY += paneWidgetHeight;
                    if (paneIndex < _this._private__paneWidgets.length - 1) {
                        targetY += SEPARATOR_HEIGHT;
                    }
                }
            };
            // draw left price scale if exists
            if (_this._private__options.priceScale.position === 'left') {
                drawPriceAxises();
                targetX = ensureNotNull(firstPane.priceAxisWidget()).getWidth();
            }
            targetY = 0;
            for (var paneIndex = 0; paneIndex < _this._private__paneWidgets.length; paneIndex++) {
                var paneWidget = _this._private__paneWidgets[paneIndex];
                var paneWidgetSize = paneWidget.getSize();
                var image = paneWidget.getImage();
                ctx.drawImage(image, targetX, targetY, paneWidgetSize.w, paneWidgetSize.h);
                targetY += paneWidgetSize.h;
                if (paneIndex < _this._private__paneWidgets.length - 1) {
                    var separator = _this._private__paneSeparators[paneIndex];
                    var separatorSize = separator.getSize();
                    var separatorImage = separator.getImage();
                    ctx.drawImage(separatorImage, targetX, targetY, separatorSize.w, separatorSize.h);
                    targetY += separatorSize.h;
                }
            }
            targetX += firstPane.getSize().w;
            if (_this._private__options.priceScale.position === 'right') {
                targetY = 0;
                drawPriceAxises();
            }
            var drawStub = function () {
                var stub = ensureNotNull(_this._private__timeAxisWidget.stub());
                var size = stub.getSize();
                var image = stub.getImage();
                ctx.drawImage(image, targetX, targetY, size.w, size.h);
            };
            // draw time scale
            if (_this._private__options.timeScale.visible) {
                targetX = 0;
                if (_this._private__options.priceScale.position === 'left') {
                    drawStub();
                    targetX = ensureNotNull(firstPane.priceAxisWidget()).getWidth();
                }
                var size = _this._private__timeAxisWidget.getSize();
                var image = _this._private__timeAxisWidget.getImage();
                ctx.drawImage(image, targetX, targetY, size.w, size.h);
                if (_this._private__options.priceScale.position === 'right') {
                    targetX = firstPane.getSize().w;
                    drawStub();
                    ctx.restore();
                }
            }
        });
        return targetCanvas;
    };
    ChartWidget.prototype._private__adjustSizeImpl = function () {
        var totalStretch = 0;
        var priceAxisWidth = 0;
        for (var _i = 0, _a = this._private__paneWidgets; _i < _a.length; _i++) {
            var paneWidget = _a[_i];
            if (this._private__options.priceScale.position !== 'none') {
                priceAxisWidth = Math.max(priceAxisWidth, ensureNotNull(paneWidget.priceAxisWidget()).optimalWidth());
            }
            totalStretch += paneWidget.stretchFactor();
        }
        var width = this._private__width;
        var height = this._private__height;
        var paneWidth = Math.max(width - priceAxisWidth, 0);
        var separatorCount = this._private__paneSeparators.length;
        var separatorHeight = SEPARATOR_HEIGHT;
        var separatorsHeight = separatorHeight * separatorCount;
        var timeAxisHeight = this._private__options.timeScale.visible ? this._private__timeAxisWidget.optimalHeight() : 0;
        // TODO: Fix it better
        // on Hi-DPI CSS size * Device Pixel Ratio should be integer to avoid smoothing
        if (timeAxisHeight % 2) {
            timeAxisHeight += 1;
        }
        var otherWidgetHeight = separatorsHeight + timeAxisHeight;
        var totalPaneHeight = height < otherWidgetHeight ? 0 : height - otherWidgetHeight;
        var stretchPixels = totalPaneHeight / totalStretch;
        var accumulatedHeight = 0;
        for (var paneIndex = 0; paneIndex < this._private__paneWidgets.length; ++paneIndex) {
            var paneWidget = this._private__paneWidgets[paneIndex];
            paneWidget.setState(this._private__model.panes()[paneIndex]);
            var paneHeight = 0;
            var calculatePaneHeight = 0;
            if (paneIndex === this._private__paneWidgets.length - 1) {
                calculatePaneHeight = totalPaneHeight - accumulatedHeight;
            }
            else {
                calculatePaneHeight = Math.round(paneWidget.stretchFactor() * stretchPixels);
            }
            paneHeight = Math.max(calculatePaneHeight, 2);
            accumulatedHeight += paneHeight;
            paneWidget.setSize(new Size(paneWidth, paneHeight));
            if (this._private__options.priceScale.position !== 'none') {
                paneWidget.setPriceAxisSize(priceAxisWidth);
            }
            if (paneWidget.state()) {
                this._private__model.setPaneHeight(paneWidget.state(), paneHeight);
            }
        }
        this._private__timeAxisWidget.setSizes(new Size(paneWidth, timeAxisHeight), priceAxisWidth);
        this._private__model.setWidth(paneWidth);
        if (this._private__priceAxisWidth !== priceAxisWidth) {
            this._private__priceAxisWidth = priceAxisWidth;
            this._private__priceAxisWidthChanged.fire(priceAxisWidth);
        }
    };
    ChartWidget.prototype._private__onMousewheel = function (event) {
        var deltaX = event.deltaX / 100;
        var deltaY = -(event.deltaY / 100);
        if ((deltaX === 0 || !this._private__options.handleScroll.mouseWheel) &&
            (deltaY === 0 || !this._private__options.handleScale.mouseWheel)) {
            return;
        }
        if (event.cancelable) {
            event.preventDefault();
        }
        switch (event.deltaMode) {
            case event.DOM_DELTA_PAGE:
                // one screen at time scroll mode
                deltaX *= 120;
                deltaY *= 120;
                break;
            case event.DOM_DELTA_LINE:
                // one line at time scroll mode
                deltaX *= 32;
                deltaY *= 32;
                break;
        }
        if (deltaY !== 0 && this._private__options.handleScale.mouseWheel) {
            var zoomScale = Math.sign(deltaY) * Math.min(1, Math.abs(deltaY));
            var scrollPosition = event.clientX - this._private__element.getBoundingClientRect().left;
            this.model().zoomTime(scrollPosition, zoomScale);
        }
        if (deltaX !== 0 && this._private__options.handleScroll.mouseWheel) {
            this.model().scrollChart(deltaX * -80); // 80 is a made up coefficient, and minus is for the "natural" scroll
        }
    };
    ChartWidget.prototype._private__drawImpl = function (invalidateMask) {
        var invalidationType = invalidateMask.fullInvalidation();
        // actions for full invalidation ONLY (not shared with light)
        if (invalidationType === 3 /* Full */) {
            this._private__updateGui();
        }
        // light or full invalidate actions
        if (invalidationType === 3 /* Full */ ||
            invalidationType === 2 /* Light */) {
            var panes = this._private__model.panes();
            for (var i = 0; i < panes.length; i++) {
                if (invalidateMask.invalidateForPane(i).autoScale) {
                    panes[i].momentaryAutoScale();
                }
            }
            if (invalidateMask.getFitContent()) {
                this._private__model.timeScale().fitContent();
            }
            var targetTimeRange = invalidateMask.getTargetTimeRange();
            if (targetTimeRange !== null) {
                this._private__model.timeScale().setTimePointsRange(targetTimeRange);
            }
            this._private__timeAxisWidget.update();
        }
        this.paint(invalidateMask);
    };
    ChartWidget.prototype._private__invalidateHandler = function (invalidateMask) {
        var _this = this;
        if (this._private__invalidateMask !== null) {
            this._private__invalidateMask.merge(invalidateMask);
        }
        else {
            this._private__invalidateMask = invalidateMask;
        }
        if (!this._private__drawPlanned) {
            this._private__drawPlanned = true;
            this._private__drawRafId = window.requestAnimationFrame(function () {
                _this._private__drawPlanned = false;
                _this._private__drawRafId = 0;
                if (_this._private__invalidateMask !== null) {
                    _this._private__drawImpl(_this._private__invalidateMask);
                    _this._private__invalidateMask = null;
                }
            });
        }
    };
    ChartWidget.prototype._private__updateGui = function () {
        this._private__syncGuiWithModel();
    };
    ChartWidget.prototype._private__destroySeparator = function (separator) {
        this._private__tableElement.removeChild(separator.getElement());
        separator.destroy();
    };
    ChartWidget.prototype._private__syncGuiWithModel = function () {
        var panes = this._private__model.panes();
        var targetPaneWidgetsCount = panes.length;
        var actualPaneWidgetsCount = this._private__paneWidgets.length;
        // Remove (if needed) pane widgets and separators
        for (var i = targetPaneWidgetsCount; i < actualPaneWidgetsCount; i++) {
            var paneWidget = ensureDefined(this._private__paneWidgets.pop());
            this._private__tableElement.removeChild(paneWidget.getElement());
            paneWidget.clicked().unsubscribeAll(this);
            paneWidget.destroy();
            var paneSeparator = this._private__paneSeparators.pop();
            if (paneSeparator !== undefined) {
                this._private__destroySeparator(paneSeparator);
            }
        }
        // Create (if needed) new pane widgets and separators
        for (var i = actualPaneWidgetsCount; i < targetPaneWidgetsCount; i++) {
            var paneWidget = new PaneWidget(this, panes[i]);
            paneWidget.clicked().subscribe(this._private__onPaneWidgetClicked.bind(this), this);
            this._private__paneWidgets.push(paneWidget);
            // create and insert separator
            if (i > 1) {
                var paneSeparator = new PaneSeparator(this, i - 1, i, true);
                this._private__paneSeparators.push(paneSeparator);
                this._private__tableElement.insertBefore(paneSeparator.getElement(), this._private__timeAxisWidget.getElement());
            }
            // insert paneWidget
            this._private__tableElement.insertBefore(paneWidget.getElement(), this._private__timeAxisWidget.getElement());
        }
        for (var i = 0; i < targetPaneWidgetsCount; i++) {
            var state = panes[i];
            var paneWidget = this._private__paneWidgets[i];
            if (paneWidget.state() !== state) {
                paneWidget.setState(state);
            }
            else {
                paneWidget.updatePriceAxisWidget();
            }
        }
        this._private__updateTimeAxisVisibility();
        this._private__adjustSizeImpl();
    };
    ChartWidget.prototype._private__getMouseEventParamsImpl = function (time, point) {
        var seriesPrices = new Map();
        if (time !== null) {
            var serieses = this._private__model.serieses();
            serieses.forEach(function (s) {
                // TODO: replace with search left
                var prices = s.dataAt(time);
                if (prices !== null) {
                    seriesPrices.set(s, prices);
                }
            });
        }
        var clientTime;
        if (time !== null) {
            var timePoint = this._private__model.timeScale().indexToUserTime(time);
            if (timePoint !== null) {
                clientTime = timePoint;
            }
        }
        var hoveredSource = this.model().hoveredSource();
        var hoveredSeries = hoveredSource !== null && hoveredSource.source instanceof Series
            ? hoveredSource.source
            : undefined;
        var hoveredObject = hoveredSource !== null && hoveredSource.object !== undefined
            ? hoveredSource.object.externalId
            : undefined;
        return {
            time: clientTime,
            point: point || undefined,
            hoveredSeries: hoveredSeries,
            seriesPrices: seriesPrices,
            hoveredObject: hoveredObject,
        };
    };
    ChartWidget.prototype._private__onPaneWidgetClicked = function (time, point) {
        var _this = this;
        this._private__clicked.fire(function () { return _this._private__getMouseEventParamsImpl(time, point); });
    };
    ChartWidget.prototype._private__onPaneWidgetCrosshairMoved = function (time, point) {
        var _this = this;
        this._private__crosshairMoved.fire(function () { return _this._private__getMouseEventParamsImpl(time, point); });
    };
    ChartWidget.prototype._private__updateTimeAxisVisibility = function () {
        var display = this._private__options.timeScale.visible ? '' : 'none';
        this._private__timeAxisWidget.getElement().style.display = display;
    };
    return ChartWidget;
}());

/// <reference types="_build-time-constants" />
function newSeriesUpdatePacket() {
    return {
        update: [],
    };
}
function businessDayConverter(time) {
    if (!isBusinessDay(time)) {
        throw new Error('time must be of type BusinessDay');
    }
    var date = new Date(Date.UTC(time.year, time.month - 1, time.day, 0, 0, 0, 0));
    return {
        timestamp: Math.round(date.getTime() / 1000),
        businessDay: time,
    };
}
function timestampConverter(time) {
    if (!isUTCTimestamp(time)) {
        throw new Error('time must be of type isUTCTimestamp');
    }
    return {
        timestamp: time,
    };
}
function selectTimeConverter(data) {
    if (data.length === 0) {
        return null;
    }
    if (isBusinessDay(data[0].time)) {
        return businessDayConverter;
    }
    return timestampConverter;
}
function convertTime(time) {
    if (isUTCTimestamp(time)) {
        return timestampConverter(time);
    }
    if (!isBusinessDay(time)) {
        return businessDayConverter(stringToBusinessDay(time));
    }
    return businessDayConverter(time);
}
function getLineBasedSeriesItemValue(item, palette) {
    var val = item.value;
    // default value
    var color = null;
    if ('color' in item) {
        if (item.color !== undefined) {
            color = palette.addColor(item.color);
        }
    }
    return [val, val, val, val, color];
}
function getOHLCBasedSeriesItemValue(bar, palette) {
    return [bar.open, bar.high, bar.low, bar.close, null];
}
var seriesItemValueFnMap = {
    Candlestick: getOHLCBasedSeriesItemValue,
    Bar: getOHLCBasedSeriesItemValue,
    Area: getLineBasedSeriesItemValue,
    Histogram: getLineBasedSeriesItemValue,
    Line: getLineBasedSeriesItemValue,
};
function seriesItemValueFn(seriesType) {
    return seriesItemValueFnMap[seriesType];
}
function hours(count) {
    return count * 60 * 60 * 1000;
}
function minutes(count) {
    return count * 60 * 1000;
}
function seconds(count) {
    return count * 1000;
}
var spanDivisors = [
    {
        divisor: 1, span: 20,
    },
    {
        divisor: seconds(1), span: 19,
    },
    {
        divisor: minutes(1), span: 20,
    },
    {
        divisor: minutes(5), span: 21,
    },
    {
        divisor: minutes(30), span: 22,
    },
    {
        divisor: hours(1), span: 30,
    },
    {
        divisor: hours(3), span: 31,
    },
    {
        divisor: hours(6), span: 32,
    },
    {
        divisor: hours(12), span: 33,
    },
];
function spanByTime(time, previousTime) {
    // function days(count) { return count * 24 * 60 * 60 * 1000; }
    if (previousTime !== null) {
        var lastTime = new Date(previousTime.timestamp * 1000);
        var currentTime = new Date(time.timestamp * 1000);
        if (currentTime.getUTCFullYear() !== lastTime.getUTCFullYear()) {
            return 70;
        }
        else if (currentTime.getUTCMonth() !== lastTime.getUTCMonth()) {
            return 60;
        }
        else if (currentTime.getUTCDate() !== lastTime.getUTCDate()) {
            return 50;
        }
        for (var i = spanDivisors.length - 1; i >= 0; --i) {
            if (Math.floor(lastTime.getTime() / spanDivisors[i].divisor) !== Math.floor(currentTime.getTime() / spanDivisors[i].divisor)) {
                return spanDivisors[i].span;
            }
        }
    }
    return 20;
}
function compareTimePoints(a, b) {
    return a.timestamp < b.timestamp;
}
var validDateRegex = /^\d\d\d\d-\d\d\-\d\d$/;
function stringToBusinessDay(value) {
    {
        // in some browsers (I look at your Chrome) the Date constructor may accept invalid date string
        // but parses them in "implementation specific" way
        // for example 2019-1-1 isn't the same as 2019-01-01 (for Chrome both are "valid" date strings)
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=968939
        // so, we need to be sure that date has valid format to avoid strange behavior and hours of debugging
        // but let's do this in development build only because of perf
        if (!validDateRegex.test(value)) {
            throw new Error("Invalid date string=" + value + ", expected format=yyyy-mm-dd");
        }
    }
    var d = new Date(value);
    if (isNaN(d.getTime())) {
        throw new Error("Invalid date string=" + value + ", expected format=yyyy-mm-dd");
    }
    return {
        day: d.getUTCDate(),
        month: d.getUTCMonth() + 1,
        year: d.getUTCFullYear(),
    };
}
function convertStringToBusinessDay(value) {
    if (isString(value.time)) {
        value.time = stringToBusinessDay(value.time);
    }
}
function convertStringsToBusinessDays(data) {
    return data.forEach(convertStringToBusinessDay);
}
var DataLayer = /** @class */ (function () {
    function DataLayer() {
        this._private__pointDataByTimePoint = new Map();
        this._private__timePointsByIndex = new Map();
        this._private__sortedTimePoints = [];
    }
    DataLayer.prototype.destroy = function () {
        this._private__pointDataByTimePoint.clear();
        this._private__timePointsByIndex.clear();
        this._private__sortedTimePoints = [];
    };
    DataLayer.prototype.setSeriesData = function (series, data) {
        var _this = this;
        series.clearData();
        convertStringsToBusinessDays(data);
        this._private__pointDataByTimePoint.forEach(function (value) { return value.mapping.delete(series); });
        var timeConverter = selectTimeConverter(data);
        if (timeConverter !== null) {
            data.forEach(function (item) {
                var time = timeConverter(item.time);
                var timePointData = _this._private__pointDataByTimePoint.get(time.timestamp) ||
                    { index: 0, mapping: new Map(), timePoint: time };
                timePointData.mapping.set(series, item);
                _this._private__pointDataByTimePoint.set(time.timestamp, timePointData);
            });
        }
        // remove from points items without series
        var newPoints = new Map();
        this._private__pointDataByTimePoint.forEach(function (pointData, key) {
            if (pointData.mapping.size > 0) {
                newPoints.set(key, pointData);
            }
        });
        return this._private__setNewPoints(newPoints);
    };
    DataLayer.prototype.removeSeries = function (series) {
        return this.setSeriesData(series, []);
    };
    DataLayer.prototype.updateSeriesData = function (series, data) {
        // check types
        convertStringToBusinessDay(data);
        var bars = series.data().bars();
        if (bars.size() > 0) {
            var lastTime = ensureNotNull(bars.last()).time;
            if (lastTime.businessDay !== undefined) {
                // time must be BusinessDay
                if (!isBusinessDay(data.time)) {
                    throw new Error('time must be of type BusinessDay');
                }
            }
            else {
                if (!isUTCTimestamp(data.time)) {
                    throw new Error('time must be of type isUTCTimestamp');
                }
            }
        }
        var changedTimePointTime = ensureNotNull(selectTimeConverter([data]))(data.time);
        var pointData = this._private__pointDataByTimePoint.get(changedTimePointTime.timestamp) ||
            { index: 0, mapping: new Map(), timePoint: changedTimePointTime };
        var newPoint = pointData.mapping.size === 0;
        pointData.mapping.set(series, data);
        var updateAllSeries = false;
        if (newPoint) {
            var index = this._private__pointDataByTimePoint.size;
            if (this._private__sortedTimePoints.length > 0 && this._private__sortedTimePoints[this._private__sortedTimePoints.length - 1].timestamp > changedTimePointTime.timestamp) {
                // new point in the middle
                index = upperbound(this._private__sortedTimePoints, changedTimePointTime, compareTimePoints);
                this._private__sortedTimePoints.splice(index, 0, changedTimePointTime);
                this._private__incrementIndicesFrom(index);
                updateAllSeries = true;
            }
            else {
                // new point in the end
                this._private__sortedTimePoints.push(changedTimePointTime);
            }
            pointData.index = index;
            this._private__timePointsByIndex.set(pointData.index, changedTimePointTime);
        }
        this._private__pointDataByTimePoint.set(changedTimePointTime.timestamp, pointData);
        var seriesUpdates = new Map();
        var _loop_1 = function (index) {
            var timePoint = ensureDefined(this_1._private__timePointsByIndex.get(index));
            var currentIndexData = ensureDefined(this_1._private__pointDataByTimePoint.get(timePoint.timestamp));
            currentIndexData.mapping.forEach(function (currentData, currentSeries) {
                if (!updateAllSeries && currentSeries !== series) {
                    return;
                }
                var getItemValues = seriesItemValueFn(currentSeries.seriesType());
                var packet = seriesUpdates.get(currentSeries) || newSeriesUpdatePacket();
                var seriesUpdate = {
                    index: index,
                    time: timePoint,
                    value: getItemValues(currentData, currentSeries.palette()),
                };
                packet.update.push(seriesUpdate);
                seriesUpdates.set(currentSeries, packet);
            });
        };
        var this_1 = this;
        for (var index = pointData.index; index < this._private__pointDataByTimePoint.size; ++index) {
            _loop_1(index);
        }
        var marks = newPoint ? this._private__generateMarksSinceIndex(pointData.index) : [];
        var timePointChanges = newPoint ? this._private__sortedTimePoints.slice(pointData.index) : [];
        var timeScaleUpdate = {
            seriesUpdates: seriesUpdates,
            changes: timePointChanges,
            index: pointData.index,
            marks: marks,
        };
        return {
            timeScaleUpdate: timeScaleUpdate,
        };
    };
    DataLayer.prototype._private__setNewPoints = function (newPoints) {
        var _this = this;
        this._private__pointDataByTimePoint = newPoints;
        this._private__sortedTimePoints = Array.from(this._private__pointDataByTimePoint.values()).map(function (d) { return d.timePoint; });
        this._private__sortedTimePoints.sort(function (t1, t2) { return t1.timestamp - t2.timestamp; });
        var seriesUpdates = new Map();
        this._private__sortedTimePoints.forEach(function (time, index) {
            var pointData = ensureDefined(_this._private__pointDataByTimePoint.get(time.timestamp));
            pointData.index = index;
            pointData.mapping.forEach(function (targetData, targetSeries) {
                // add point to series
                var getItemValues = seriesItemValueFn(targetSeries.seriesType());
                var packet = seriesUpdates.get(targetSeries) || newSeriesUpdatePacket();
                var seriesUpdate = {
                    index: index,
                    time: time,
                    value: getItemValues(targetData, targetSeries.palette()),
                };
                packet.update.push(seriesUpdate);
                seriesUpdates.set(targetSeries, packet);
            });
        });
        var prevTime = null;
        var marks = this._private__sortedTimePoints.map(function (time, index) {
            var span = spanByTime(time, prevTime);
            prevTime = time;
            return {
                span: span,
                time: time,
                index: index,
            };
        });
        var timeScaleUpdate = {
            seriesUpdates: seriesUpdates,
            changes: this._private__sortedTimePoints.slice(),
            index: 0,
            marks: marks,
        };
        this._private__rebuildTimePointsByIndex();
        return {
            timeScaleUpdate: timeScaleUpdate,
        };
    };
    DataLayer.prototype._private__incrementIndicesFrom = function (index) {
        for (var indexToUpdate = this._private__timePointsByIndex.size - 1; indexToUpdate >= index; --indexToUpdate) {
            var timePoint = ensureDefined(this._private__timePointsByIndex.get(indexToUpdate));
            var updatedData = ensureDefined(this._private__pointDataByTimePoint.get(timePoint.timestamp));
            var newIndex = indexToUpdate + 1;
            updatedData.index = newIndex;
            this._private__timePointsByIndex.delete(indexToUpdate);
            this._private__timePointsByIndex.set(newIndex, timePoint);
        }
    };
    DataLayer.prototype._private__rebuildTimePointsByIndex = function () {
        var _this = this;
        this._private__timePointsByIndex.clear();
        this._private__pointDataByTimePoint.forEach(function (data, timePoint) {
            _this._private__timePointsByIndex.set(data.index, data.timePoint);
        });
    };
    DataLayer.prototype._private__generateMarksSinceIndex = function (startIndex) {
        var result = [];
        var prevTime = this._private__timePointsByIndex.get(startIndex - 1) || null;
        for (var index = startIndex; index < this._private__timePointsByIndex.size; ++index) {
            var time = ensureDefined(this._private__timePointsByIndex.get(index));
            var span = spanByTime(time, prevTime);
            prevTime = time;
            result.push({
                span: span,
                time: time,
                index: index,
            });
        }
        return result;
    };
    return DataLayer;
}());

var priceLineOptionsDefaults = {
    color: '#FF0000',
    price: 0,
    lineStyle: 2 /* Dashed */,
    lineWidth: 1,
    axisLabelVisible: true,
};

var PriceLine = /** @class */ (function () {
    function PriceLine(priceLine) {
        this._private__priceLine = priceLine;
    }
    PriceLine.prototype.applyOptions = function (options) {
        this._private__priceLine.applyOptions(options);
    };
    PriceLine.prototype.options = function () {
        return this._private__priceLine.options();
    };
    PriceLine.prototype.priceLine = function () {
        return this._private__priceLine;
    };
    return PriceLine;
}());

var SeriesApi = /** @class */ (function () {
    function SeriesApi(series, dataUpdatesConsumer) {
        this._series = series;
        this._dataUpdatesConsumer = dataUpdatesConsumer;
    }
    SeriesApi.prototype.destroy = function () {
        delete this._series;
        delete this._dataUpdatesConsumer;
    };
    SeriesApi.prototype.priceFormatter = function () {
        return this._series.formatter();
    };
    SeriesApi.prototype.series = function () {
        return this._series;
    };
    SeriesApi.prototype.priceToCoordinate = function (price) {
        var firstValue = this._series.firstValue();
        if (firstValue === null) {
            return null;
        }
        return this._series.priceScale().priceToCoordinate(price, firstValue.value);
    };
    SeriesApi.prototype.coordinateToPrice = function (coordinate) {
        var firstValue = this._series.firstValue();
        if (firstValue === null) {
            return null;
        }
        return this._series.priceScale().coordinateToPrice(coordinate, firstValue.value);
    };
    SeriesApi.prototype.setData = function (data) {
        this._dataUpdatesConsumer.applyNewData(this._series, data);
    };
    SeriesApi.prototype.update = function (bar) {
        this._dataUpdatesConsumer.updateData(this._series, bar);
    };
    SeriesApi.prototype.setMarkers = function (data) {
        var convertedMarkers = data.map(function (marker) { return (__assign(__assign({}, marker), { time: convertTime(marker.time) })); });
        this._series.setMarkers(convertedMarkers);
    };
    SeriesApi.prototype.applyOptions = function (options) {
        this._series.applyOptions(options);
    };
    SeriesApi.prototype.options = function () {
        return clone(this._series.options());
    };
    SeriesApi.prototype.createPriceLine = function (options) {
        var strictOptions = merge(clone(priceLineOptionsDefaults), options);
        var priceLine = this._series.createPriceLine(strictOptions);
        return new PriceLine(priceLine);
    };
    SeriesApi.prototype.removePriceLine = function (line) {
        this._series.removePriceLine(line.priceLine());
    };
    return SeriesApi;
}());

var CandlestickSeriesApi = /** @class */ (function (_super) {
    __extends(CandlestickSeriesApi, _super);
    function CandlestickSeriesApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandlestickSeriesApi.prototype.applyOptions = function (options) {
        fillUpDownCandlesticksColors(options);
        _super.prototype.applyOptions.call(this, options);
    };
    return CandlestickSeriesApi;
}(SeriesApi));

var crosshairOptionsDefaults = {
    vertLine: {
        color: '#758696',
        width: 1,
        style: 3 /* LargeDashed */,
        visible: true,
        labelVisible: true,
        labelBackgroundColor: '#4c525e',
    },
    horzLine: {
        color: '#758696',
        width: 1,
        style: 3 /* LargeDashed */,
        visible: true,
        labelVisible: true,
        labelBackgroundColor: '#4c525e',
    },
    mode: 1 /* Magnet */,
};

var gridOptionsDefaults = {
    vertLines: {
        color: '#D6DCDE',
        style: 0 /* Solid */,
        visible: true,
    },
    horzLines: {
        color: '#D6DCDE',
        style: 0 /* Solid */,
        visible: true,
    },
};

var layoutOptionsDefaults = {
    backgroundColor: '#FFFFFF',
    textColor: '#191919',
    fontSize: 11,
    fontFamily: defaultFontFamily,
};

var priceScaleOptionsDefaults = {
    autoScale: true,
    mode: 0 /* Normal */,
    invertScale: false,
    alignLabels: true,
    position: 'right',
    borderVisible: true,
    borderColor: '#2B2B43',
    entireTextOnly: false,
    scaleMargins: {
        bottom: 0.1,
        top: 0.2,
    },
};

var timeScaleOptionsDefaults = {
    rightOffset: 0,
    barSpacing: 6,
    fixLeftEdge: false,
    lockVisibleTimeRangeOnResize: false,
    rightBarStaysOnScroll: false,
    borderVisible: true,
    borderColor: '#2B2B43',
    visible: true,
    timeVisible: false,
    secondsVisible: true,
};

var watermarkOptionsDefaults = {
    color: 'rgba(0, 0, 0, 0)',
    visible: false,
    fontSize: 48,
    text: '',
    horzAlign: 'center',
    vertAlign: 'center',
};

var chartOptionsDefaults = {
    width: 0,
    height: 0,
    layout: layoutOptionsDefaults,
    crosshair: crosshairOptionsDefaults,
    grid: gridOptionsDefaults,
    priceScale: priceScaleOptionsDefaults,
    timeScale: timeScaleOptionsDefaults,
    watermark: watermarkOptionsDefaults,
    localization: {
        locale: navigator.language,
        dateFormat: 'dd MMM \'yy',
    },
    handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
    },
    handleScale: {
        axisPressedMouseMove: true,
        axisDoubleClickReset: true,
        mouseWheel: true,
        pinch: true,
    },
};

var candlestickStyleDefaults = {
    upColor: '#26a69a',
    downColor: '#ef5350',
    wickVisible: true,
    borderVisible: true,
    borderColor: '#378658',
    borderUpColor: '#26a69a',
    borderDownColor: '#ef5350',
    wickColor: '#737375',
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
};
var barStyleDefaults = {
    upColor: '#26a69a',
    downColor: '#ef5350',
    openVisible: true,
    thinBars: true,
};
var lineStyleDefaults = {
    color: '#2196f3',
    lineStyle: 0 /* Solid */,
    lineWidth: 3,
    lineType: 0 /* Simple */,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
};
var areaStyleDefaults = {
    topColor: 'rgba( 46, 220, 135, 0.4)',
    bottomColor: 'rgba( 40, 221, 100, 0)',
    lineColor: '#33D778',
    lineStyle: 0 /* Solid */,
    lineWidth: 3,
    lineType: 0 /* Simple */,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
};
var histogramStyleDefaults = {
    color: '#26a69a',
    base: 0,
};
var seriesOptionsDefaults = {
    title: '',
    lastValueVisible: true,
    priceLineVisible: true,
    priceLineSource: 0 /* LastBar */,
    priceLineWidth: 1,
    priceLineColor: '',
    priceLineStyle: 2 /* Dashed */,
    baseLineVisible: true,
    baseLineWidth: 1,
    baseLineColor: '#B2B5BE',
    baseLineStyle: 0 /* Solid */,
    priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
    },
    scaleGroup: '',
};

var PriceScaleApi = /** @class */ (function () {
    function PriceScaleApi(model) {
        this._private__chartModel = model;
    }
    PriceScaleApi.prototype.destroy = function () {
        delete this._private__chartModel;
    };
    PriceScaleApi.prototype.applyOptions = function (options) {
        this._private__chartModel.applyOptions({ priceScale: options });
    };
    PriceScaleApi.prototype.options = function () {
        return this._private__priceScale().options();
    };
    PriceScaleApi.prototype._private__priceScale = function () {
        return this._private__chartModel.mainPriceScale();
    };
    return PriceScaleApi;
}());

var Constants$5;
(function (Constants) {
    Constants[Constants["AnimationDurationMs"] = 1000] = "AnimationDurationMs";
})(Constants$5 || (Constants$5 = {}));
var TimeScaleApi = /** @class */ (function () {
    function TimeScaleApi(model) {
        this._private__model = model;
    }
    TimeScaleApi.prototype.destroy = function () {
        delete this._private__model;
    };
    TimeScaleApi.prototype.scrollPosition = function () {
        return this._private__timeScale().rightOffset();
    };
    TimeScaleApi.prototype.scrollToPosition = function (position, animated) {
        if (!animated) {
            this._private__timeScale().setRightOffset(position);
            return;
        }
        this._private__timeScale().scrollToOffsetAnimated(position, 1000 /* AnimationDurationMs */);
    };
    TimeScaleApi.prototype.scrollToRealTime = function () {
        this._private__timeScale().scrollToRealTime();
    };
    TimeScaleApi.prototype.getVisibleRange = function () {
        var visibleBars = this._private__timeScale().visibleBars();
        if (visibleBars === null) {
            return null;
        }
        var points = this._private__model.timeScale().points();
        var firstIndex = ensureNotNull(points.firstIndex());
        var lastIndex = ensureNotNull(points.lastIndex());
        return {
            from: timePointToTime(ensureNotNull(points.valueAt(Math.max(firstIndex, visibleBars.firstBar())))),
            to: timePointToTime(ensureNotNull(points.valueAt(Math.min(lastIndex, visibleBars.lastBar())))),
        };
    };
    TimeScaleApi.prototype.setVisibleRange = function (range) {
        var convertedRange = {
            from: convertTime(range.from),
            to: convertTime(range.to),
        };
        this._private__model.setTargetTimeRange(convertedRange);
    };
    TimeScaleApi.prototype.resetTimeScale = function () {
        this._private__model.resetTimeScale();
    };
    TimeScaleApi.prototype.fitContent = function () {
        this._private__model.fitContent();
    };
    TimeScaleApi.prototype.applyOptions = function (options) {
        this._private__timeScale().applyOptions(options);
    };
    TimeScaleApi.prototype.options = function () {
        return clone(this._private__timeScale().options());
    };
    TimeScaleApi.prototype._private__timeScale = function () {
        return this._private__model.timeScale();
    };
    return TimeScaleApi;
}());
function timePointToTime(point) {
    return point.businessDay || point.timestamp;
}

function patchPriceFormat(priceFormat) {
    if (priceFormat === undefined || priceFormat.type === 'custom') {
        return;
    }
    var priceFormatBuiltIn = priceFormat;
    if (priceFormatBuiltIn.minMove !== undefined && priceFormatBuiltIn.precision === undefined) {
        priceFormatBuiltIn.precision = precisionByMinMove(priceFormatBuiltIn.minMove);
    }
}
function toInternalOptions(options) {
    var handleScale = options.handleScale;
    if (isBoolean(handleScale)) {
        options.handleScale = {
            axisDoubleClickReset: handleScale,
            axisPressedMouseMove: handleScale,
            mouseWheel: handleScale,
            pinch: handleScale,
        };
    }
    var handleScroll = options.handleScroll;
    if (isBoolean(handleScroll)) {
        options.handleScroll = {
            horzTouchDrag: handleScroll,
            vertTouchDrag: handleScroll,
            mouseWheel: handleScroll,
            pressedMouseMove: handleScroll,
        };
    }
    return options;
}
var ChartApi = /** @class */ (function () {
    function ChartApi(container, options) {
        var _this = this;
        this._private__dataLayer = new DataLayer();
        this._private__timeRangeChanged = new Delegate();
        this._private__seriesMap = new Map();
        this._private__seriesMapReversed = new Map();
        this._private__clickedDelegate = new Delegate();
        this._private__crosshairMovedDelegate = new Delegate();
        var internalOptions = (options === undefined) ?
            clone(chartOptionsDefaults) :
            merge(clone(chartOptionsDefaults), toInternalOptions(options));
        this._private__chartWidget = new ChartWidget(container, internalOptions);
        this._private__chartWidget.model().timeScale().visibleBarsChanged().subscribe(this._private__onVisibleBarsChanged.bind(this));
        this._private__chartWidget.clicked().subscribe(function (paramSupplier) {
            if (_this._private__clickedDelegate.hasListeners()) {
                _this._private__clickedDelegate.fire(_this._private__convertMouseParams(paramSupplier()));
            }
        }, this);
        this._private__chartWidget.crosshairMoved().subscribe(function (paramSupplier) {
            if (_this._private__crosshairMovedDelegate.hasListeners()) {
                _this._private__crosshairMovedDelegate.fire(_this._private__convertMouseParams(paramSupplier()));
            }
        }, this);
        var model = this._private__chartWidget.model();
        this._private__priceScaleApi = new PriceScaleApi(model);
        this._private__timeScaleApi = new TimeScaleApi(model);
    }
    ChartApi.prototype.remove = function () {
        this._private__chartWidget.model().timeScale().visibleBarsChanged().unsubscribeAll(this);
        this._private__chartWidget.clicked().unsubscribeAll(this);
        this._private__chartWidget.crosshairMoved().unsubscribeAll(this);
        this._private__priceScaleApi.destroy();
        this._private__timeScaleApi.destroy();
        this._private__chartWidget.destroy();
        delete this._private__chartWidget;
        this._private__seriesMap.forEach(function (series, api) {
            api.destroy();
        });
        this._private__seriesMap.clear();
        this._private__seriesMapReversed.clear();
        this._private__timeRangeChanged.destroy();
        this._private__clickedDelegate.destroy();
        this._private__crosshairMovedDelegate.destroy();
        this._private__dataLayer.destroy();
        delete this._private__dataLayer;
    };
    ChartApi.prototype.resize = function (width, height, forceRepaint) {
        this._private__chartWidget.resize(width, height, forceRepaint);
    };
    ChartApi.prototype.addAreaSeries = function (options) {
        if (options === void 0) { options = {}; }
        patchPriceFormat(options.priceFormat);
        var strictOptions = merge(clone(seriesOptionsDefaults), areaStyleDefaults, options);
        var series = this._private__chartWidget.model().createSeries('Area', strictOptions);
        var res = new SeriesApi(series, this);
        this._private__seriesMap.set(res, series);
        this._private__seriesMapReversed.set(series, res);
        return res;
    };
    ChartApi.prototype.addBarSeries = function (options) {
        if (options === void 0) { options = {}; }
        patchPriceFormat(options.priceFormat);
        var strictOptions = merge(clone(seriesOptionsDefaults), barStyleDefaults, options);
        var series = this._private__chartWidget.model().createSeries('Bar', strictOptions);
        var res = new SeriesApi(series, this);
        this._private__seriesMap.set(res, series);
        this._private__seriesMapReversed.set(series, res);
        return res;
    };
    ChartApi.prototype.addCandlestickSeries = function (options) {
        if (options === void 0) { options = {}; }
        fillUpDownCandlesticksColors(options);
        patchPriceFormat(options.priceFormat);
        var strictOptions = merge(clone(seriesOptionsDefaults), candlestickStyleDefaults, options);
        var series = this._private__chartWidget.model().createSeries('Candlestick', strictOptions);
        var res = new CandlestickSeriesApi(series, this);
        this._private__seriesMap.set(res, series);
        this._private__seriesMapReversed.set(series, res);
        return res;
    };
    ChartApi.prototype.addHistogramSeries = function (options) {
        if (options === void 0) { options = {}; }
        patchPriceFormat(options.priceFormat);
        var strictOptions = merge(clone(seriesOptionsDefaults), histogramStyleDefaults, options);
        var series = this._private__chartWidget.model().createSeries('Histogram', strictOptions);
        var res = new SeriesApi(series, this);
        this._private__seriesMap.set(res, series);
        this._private__seriesMapReversed.set(series, res);
        return res;
    };
    ChartApi.prototype.addLineSeries = function (options) {
        if (options === void 0) { options = {}; }
        patchPriceFormat(options.priceFormat);
        var strictOptions = merge(clone(seriesOptionsDefaults), lineStyleDefaults, options);
        var series = this._private__chartWidget.model().createSeries('Line', strictOptions);
        var res = new SeriesApi(series, this);
        this._private__seriesMap.set(res, series);
        this._private__seriesMapReversed.set(series, res);
        return res;
    };
    ChartApi.prototype.removeSeries = function (seriesApi) {
        var seriesObj = seriesApi;
        var series = ensureDefined(this._private__seriesMap.get(seriesObj));
        var update = this._private__dataLayer.removeSeries(series);
        var model = this._private__chartWidget.model();
        model.removeSeries(series);
        var timeScaleUpdate = update.timeScaleUpdate;
        model.updateTimeScale(timeScaleUpdate.index, timeScaleUpdate.changes, timeScaleUpdate.marks, true);
        timeScaleUpdate.seriesUpdates.forEach(function (value, key) {
            key.updateData(value.update);
        });
        model.updateTimeScaleBaseIndex(0);
        this._private__seriesMap.delete(seriesObj);
        this._private__seriesMapReversed.delete(series);
    };
    ChartApi.prototype.applyNewData = function (series, data) {
        var update = this._private__dataLayer.setSeriesData(series, data);
        var model = this._private__chartWidget.model();
        var timeScaleUpdate = update.timeScaleUpdate;
        model.updateTimeScale(timeScaleUpdate.index, timeScaleUpdate.changes, timeScaleUpdate.marks, true);
        timeScaleUpdate.seriesUpdates.forEach(function (value, key) {
            // the latest arg `true` must be removed in https://github.com/tradingview/lightweight-charts/issues/270
            // here we don't need to clear palettes because they were just filled in DataLayer
            // see https://github.com/tradingview/lightweight-charts/pull/330#discussion_r379415805
            key.updateData(value.update, true);
        });
        model.updateTimeScaleBaseIndex(0);
    };
    ChartApi.prototype.updateData = function (series, data) {
        var update = this._private__dataLayer.updateSeriesData(series, data);
        var model = this._private__chartWidget.model();
        var timeScaleUpdate = update.timeScaleUpdate;
        model.updateTimeScale(timeScaleUpdate.index, timeScaleUpdate.changes, timeScaleUpdate.marks, false);
        timeScaleUpdate.seriesUpdates.forEach(function (value, key) {
            key.updateData(value.update);
        });
        model.updateTimeScaleBaseIndex(0);
    };
    ChartApi.prototype.subscribeClick = function (handler) {
        this._private__clickedDelegate.subscribe(handler);
    };
    ChartApi.prototype.unsubscribeClick = function (handler) {
        this._private__clickedDelegate.unsubscribe(handler);
    };
    ChartApi.prototype.subscribeCrosshairMove = function (handler) {
        this._private__crosshairMovedDelegate.subscribe(handler);
    };
    ChartApi.prototype.unsubscribeCrosshairMove = function (handler) {
        this._private__crosshairMovedDelegate.unsubscribe(handler);
    };
    ChartApi.prototype.subscribeVisibleTimeRangeChange = function (handler) {
        this._private__timeRangeChanged.subscribe(handler);
    };
    ChartApi.prototype.unsubscribeVisibleTimeRangeChange = function (handler) {
        this._private__timeRangeChanged.unsubscribe(handler);
    };
    // TODO: add more subscriptions
    ChartApi.prototype.priceScale = function () {
        return this._private__priceScaleApi;
    };
    ChartApi.prototype.timeScale = function () {
        return this._private__timeScaleApi;
    };
    ChartApi.prototype.applyOptions = function (options) {
        this._private__chartWidget.applyOptions(toInternalOptions(options));
    };
    ChartApi.prototype.options = function () {
        return this._private__chartWidget.options();
    };
    ChartApi.prototype.takeScreenshot = function () {
        return this._private__chartWidget.takeScreenshot();
    };
    ChartApi.prototype._private__onVisibleBarsChanged = function () {
        if (this._private__timeRangeChanged.hasListeners()) {
            this._private__timeRangeChanged.fire(this.timeScale().getVisibleRange());
        }
    };
    ChartApi.prototype._private__mapSeriesToApi = function (series) {
        return ensureDefined(this._private__seriesMapReversed.get(series));
    };
    ChartApi.prototype._private__convertMouseParams = function (param) {
        var _this = this;
        var seriesPrices = new Map();
        param.seriesPrices.forEach(function (price, series) {
            seriesPrices.set(_this._private__mapSeriesToApi(series), price);
        });
        var hoveredSeries = param.hoveredSeries === undefined ? undefined : this._private__mapSeriesToApi(param.hoveredSeries);
        return {
            time: param.time && (param.time.businessDay || param.time.timestamp),
            point: param.point,
            hoveredSeries: hoveredSeries,
            hoveredMarkerId: param.hoveredObject,
            seriesPrices: seriesPrices,
        };
    };
    return ChartApi;
}());

/**
 * This function is the main entry point of the Lightweight Charting Library
 * @param container - id of HTML element or element itself
 * @param options - any subset of ChartOptions to be applied at start.
 * @returns an interface to the created chart
 */
function createChart(container, options) {
    var htmlElement = ensureNotNull(isString(container) ? document.getElementById(container) : container);
    return new ChartApi(htmlElement, options);
}

/// <reference types="_build-time-constants" />
function version() {
    return "2.1.0-dev+202003050952";
}

export { CrosshairMode, LineStyle, LineType, PriceLineSource, PriceScaleMode, createChart, isBusinessDay, isUTCTimestamp, version };
