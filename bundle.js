(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const hashbow = require('hashbow');

exports.getTabProps = function (uid, parentProps, props) {
  return Object.assign({}, props, {
    dabColor: hashbow(props.text)
  });
};

exports.decorateTab = function (Tab, { React }) {
  return class extends Tab {
    render() {
      const dab = React.createElement('span', {
        className: 'tab_dibdab',
        style: {
          'background-color': this.props.dabColor
        }
      });
      const customChildrenBefore = Array.from(this.props.customChildrenBefore || []).concat(dab);
      return React.createElement(Tab, Object.assign({}, this.props, { customChildrenBefore }));
    }
  }
};

exports.decorateConfig = function (config) {
  return Object.assign({}, config, {
    css: `
      ${config.css || ''}
      .tab_dibdab {
        position: absolute;
        left: 13px;
        top: 13px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    `
  });
};

},{"hashbow":2}],2:[function(require,module,exports){
var hslToHex = require('tie-dye/hslToHex');

function hashbow(input, saturation, lightness) {

  var inputAsString, sum;
  saturation = saturation || 50;
  lightness = lightness || 50;

  var greyValues = [null, undefined, [], {}, '', new RegExp()];

  if (greyValues.indexOf(input) != -1) {
    return hslToHex(0, 0, lightness);
  }

  switch (input.constructor) {
    case Function:
    case RegExp:
      inputAsString = input.toString();
    break;
    case Object:
    case Array:
      inputAsString = JSON.stringify(input);
    break;
    case Number:
      sum = input;
    break;
    case Boolean:
      return hslToHex(input ? 120 : 0, saturation, lightness);
    break;
    case String:
    default:
      inputAsString = input;
  }

  if (sum === undefined) {
    sum = 0;
    inputAsString.split('').forEach(function (letter) {
      sum += letter.charCodeAt(0);
    });
  }

  sum = Math.abs(sum * sum);

  return hslToHex(sum % 360, saturation, lightness);
}

module.exports = hashbow;

},{"tie-dye/hslToHex":3}],3:[function(require,module,exports){
var hslToRgb = require('./hslToRgb');
var rgbToHex = require('./rgbToHex');

function hslToHex(h, s, l) {
  var rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

module.exports = hslToHex;

},{"./hslToRgb":4,"./rgbToHex":6}],4:[function(require,module,exports){
var hueToRgb = require('./hueToRgb');

/**
 * Convert a color from HSL to RGB
 *
 * @param {number} h - A value from 0 - 360
 * @param {number} s - A value from 0 - 100
 * @param {number} l - A value from 0 - 100
 * @returns {object} With the signature {r: 0-255, g: 0-255, b: 0-255}
 */
function hslToRgb(h, s, l) {

  h /= 360;
  s /= 100;
  l /= 100;

  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return ({
    r: r * 255,
    g: g * 255,
    b: b * 255
  });
}

module.exports = hslToRgb;

},{"./hueToRgb":5}],5:[function(require,module,exports){
function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

module.exports = hueToRgb;

},{}],6:[function(require,module,exports){
/**
 * Convert a color from RGB to hexidecimal
 *
 * @param {number} r - A value from 0 - 255
 * @param {number} g - A value from 0 - 255
 * @param {number} b - A value from 0 - 255
 * @returns {string} In the format #000000
 */
function rgbToHex(r, g, b) {
  var integer = ((Math.round(r) & 0xFF) << 16)
    + ((Math.round(g) & 0xFF) << 8)
    + (Math.round(b) & 0xFF);

  var string = integer.toString(16).toUpperCase();
  return '#' + ('000000'.substring(string.length) + string);
}

module.exports = rgbToHex;

},{}]},{},[1]);
