'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = require('../Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _Decade = require('./Decade');

var _Decade2 = _interopRequireDefault(_Decade);

var _dates = require('../shared/dates');

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Decades = function (_PureComponent) {
  _inherits(Decades, _PureComponent);

  function Decades() {
    _classCallCheck(this, Decades);

    return _possibleConstructorReturn(this, (Decades.__proto__ || Object.getPrototypeOf(Decades)).apply(this, arguments));
  }

  _createClass(Decades, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          tileClassName = _props.tileClassName,
          tileContent = _props.tileContent,
          value = _props.value,
          valueType = _props.valueType;


      var decadeProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        tileClassName: tileClassName,
        tileContent: tileContent
      };

      var decades = [];
      for (var decade = start; decade <= end; decade += 10) {
        var date = (0, _dates.getBeginOfDecade)(decade);

        decades.push(_react2.default.createElement(_Decade2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'decade'), {
          date: date,
          decade: decade,
          key: decade
        }, decadeProps)));
      }

      return _react2.default.createElement(
        _Flex2.default,
        {
          className: 'react-calendar__century-view__decades',
          count: 3,
          wrap: true
        },
        decades
      );
    }
  }, {
    key: 'start',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getBeginOfCenturyYear)(activeStartDate);
    }
  }, {
    key: 'end',
    get: function get() {
      return this.start + 99;
    }
  }]);

  return Decades;
}(_react.PureComponent);

exports.default = Decades;


Decades.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  tileClassName: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes3.isClassName]),
  tileContent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};