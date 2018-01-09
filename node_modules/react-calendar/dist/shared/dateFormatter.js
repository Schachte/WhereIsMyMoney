'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatShortWeekday = exports.formatMonth = exports.formatMonthYear = exports.formatDate = undefined;

var _locales = require('./locales');

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _locales.getLocale)();

  var stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 */
var toSafeHour = function toSafeHour(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
};

var formatDate = exports.formatDate = function formatDate(date) {
  return getFormatter({ day: 'numeric', month: 'numeric', year: 'numeric' })(toSafeHour(date));
};

var formatMonthYear = exports.formatMonthYear = function formatMonthYear(date) {
  return getFormatter({ month: 'long', year: 'numeric' })(toSafeHour(date));
};

var formatMonth = exports.formatMonth = function formatMonth(date) {
  return getFormatter({ month: 'long' })(toSafeHour(date));
};

var formatShortWeekday = exports.formatShortWeekday = function formatShortWeekday(date) {
  return getFormatter({ weekday: 'short' })(toSafeHour(date));
};