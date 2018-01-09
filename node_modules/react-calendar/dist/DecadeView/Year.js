'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'react-calendar__decade-view__years__year';

var Year = function Year(_ref) {
  var active = _ref.active,
      date = _ref.date,
      hasActive = _ref.hasActive,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      tileClassName = _ref.tileClassName,
      tileContent = _ref.tileContent,
      year = _ref.year;
  return _react2.default.createElement(
    'button',
    {
      className: (0, _mergeClassNames2.default)(className, active && 'react-calendar__tile--active', hasActive && 'react-calendar__tile--hasActive', 'react-calendar__tile', tileClassName instanceof Function ? tileClassName({ date: date, view: 'decade' }) : tileClassName),
      disabled: minDate && (0, _dates.getBeginOfYear)(minDate) > date || maxDate && (0, _dates.getEndOfYear)(maxDate) < date,
      onClick: onClick && function () {
        return onClick(date);
      },
      style: { flexGrow: 1 },
      type: 'button'
    },
    _react2.default.createElement(
      'time',
      { dateTime: year + 'T00:00:00.000' },
      year
    ),
    tileContent instanceof Function ? tileContent({ date: date, view: 'decade' }) : tileContent
  );
};

Year.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  hasActive: _propTypes2.default.bool.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  tileClassName: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes3.isClassName]),
  tileContent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  year: _propTypes2.default.number.isRequired
};

exports.default = Year;