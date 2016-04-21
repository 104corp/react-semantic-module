'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _transitions = require('util/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _overlay = require('util/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var position = {};

var List = function (_Component) {
	_inherits(List, _Component);

	function List() {
		_classCallCheck(this, List);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
	}

	_createClass(List, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.getListDom(this.refs.listContainer, this.refs.listArrow, this.refs.dropDownInnerList.offsetHeight + 15);
		}
	}, {
		key: 'render',
		value: function render() {
			var tt = this.props.targetStyle;
			var arrowPosition = this.props.midPosition + 12;
			var show = this.props.open ? 'visible' : 'hidden';
			var dropStyle = this.props.open ? {
				visibility: 'visible',
				height: this.refs.dropDownInnerList.offsetHeight + 30
			} : {
				visibility: 'hidden',
				height: 0
			};
			var listStyle = this.props.top ? 'list top' : 'list';
			return _react2.default.createElement(
				'div',
				{ style: { visibility: show, position: 'relative' } },
				_react2.default.createElement(_overlay2.default, {
					onRequestClose: this.props.clickAway }),
				_react2.default.createElement(
					'div',
					{ styleName: 'container', ref: 'listContainer', style: dropStyle },
					_react2.default.createElement(
						'div',
						{ ref: 'dropDownInnerList',
							styleName: listStyle },
						_react2.default.createElement('div', { styleName: 'arrow', ref: 'listArrow' }),
						this.props.content
					)
				)
			);
		}
	}]);

	return List;
}(_react.Component);

List.defaultProps = {
	width: 100
};
exports.default = (0, _reactCssModules2.default)(List, _style2.default, { allowMultiple: true });