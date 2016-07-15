'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomComponent = function (_Component) {
	_inherits(CustomComponent, _Component);

	function CustomComponent() {
		_classCallCheck(this, CustomComponent);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomComponent).apply(this, arguments));
	}

	_createClass(CustomComponent, [{
		key: 'handleClick',
		value: function handleClick(e) {
			this.props.blockProps.onRequestRemove(this.props.block.getKey());
		}
	}, {
		key: 'render',
		value: function render() {

			var entity = _draftJs.Entity.get(this.props.block.getEntityAt(0));
			var props = entity.getData();
			var type = entity.getType();
			switch (type) {
				case 'IMAGE':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'mask-block' },
							_react2.default.createElement('img', { styleName: 'article-image', src: props.fakeSrc }),
							_react2.default.createElement('div', { styleName: 'mask' })
						) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement('img', { styleName: 'article-image', src: props.fakeSrc })
						)
					);
				case 'VIDEO':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'loading-preset' },
							_react2.default.createElement('div', { styleName: 'play-icon video' })
						) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement('video', { controls: true, src: props.src })
						)
					);
				case 'AUDIO':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						props.loading ? _react2.default.createElement(
							'div',
							{ styleName: 'loading-preset audio' },
							_react2.default.createElement('div', { styleName: 'play-icon audio' })
						) : _react2.default.createElement(
							'div',
							{ styleName: 'mid-block' },
							_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
							_react2.default.createElement(
								'div',
								{ styleName: 'title' },
								props.name
							),
							_react2.default.createElement('audio', { controls: true, src: props.src })
						)
					);
				case 'HYPERLINK':
					return _react2.default.createElement(
						'div',
						null,
						' ',
						props.src,
						' '
					);
				case 'YOUTUBE':
					return _react2.default.createElement(
						'div',
						{ styleName: 'block' },
						_react2.default.createElement('div', { styleName: 'close', onClick: this.handleClick.bind(this) }),
						_react2.default.createElement(
							'a',
							{ href: props.text, target: '_blank' },
							props.text
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('iframe', { width: '476', height: '267.5',
								src: "https://www.youtube.com/embed/" + props.file })
						)
					);
				default:
					return false;
			}
		}
	}]);

	return CustomComponent;
}(_react.Component);

;
exports.default = (0, _reactCssModules2.default)(CustomComponent, _style2.default, { allowMultiple: true });
/*
class ImageComponent extends Component {
	render(){
		console.log(this.props);
		return <img src={this.props.src} contentEditable={false}/>;
	}
}

export default ImageComponent;*/