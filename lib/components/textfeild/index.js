'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function highlightString(keyword, targetString) {
	var pattern = new RegExp(keyword, 'gi'),
	    replace = '<span>' + keyword + '</span>';

	return targetString.replace(pattern, replace);
}

var TextFeild = function (_get__2) {
	_inherits(TextFeild, _get__2);

	function TextFeild(props) {
		_classCallCheck(this, TextFeild);

		var _this = _possibleConstructorReturn(this, (TextFeild.__proto__ || Object.getPrototypeOf(TextFeild)).call(this, props));

		_this.state = {
			data: props.value,
			errorMessage: props.errorMessage || '',
			ACData: props.ACData,
			highlightedIndex: null
		};
		_this._onChange = _this._onChange.bind(_this);
		_this._onBlur = _this._onBlur.bind(_this);
		_this._onKeyDown = _this._onKeyDown.bind(_this);
		_this.ACStyle = {};
		_this.keyDownHandlers = {
			ArrowDown: function ArrowDown(event) {
				event.preventDefault();
				if (this.state.ACData.length === 0) {
					if (props.onRequestOpenAC) props.onRequestOpenAC();
					this.setState({
						highlightedIndex: 0
					});
				} else {
					var highlightedIndex = this.state.highlightedIndex;

					var index = highlightedIndex === null || highlightedIndex === this.state.ACData.length - 1 ? 0 : highlightedIndex + 1;
					this._performAutoCompleteOnKeyUp = true;
					this.setState({
						highlightedIndex: index
					});
				}
			},
			ArrowUp: function ArrowUp(event) {
				event.preventDefault();
				var highlightedIndex = this.state.highlightedIndex;

				var index = highlightedIndex === 0 || highlightedIndex === null ? this.state.ACData.length - 1 : highlightedIndex - 1;
				this._performAutoCompleteOnKeyUp = true;
				this.setState({
					highlightedIndex: index
				});
			},
			Enter: function Enter(event) {
				console.log(event);
				if (this.state.ACData.length === 0) {
					// menu is closed so there is no selection to accept -> do nothing
					return;
				} else if (this.state.highlightedIndex == null) {
					// input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
				} else {
					// text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
					this.select(this.state.ACData[this.state.highlightedIndex].value, this.state.highlightedIndex);
				}
			},
			Escape: function Escape(event) {
				this.setState({
					highlightedIndex: null,
					ACData: []
				});
			}
		};
		return _this;
	}

	_createClass(TextFeild, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.allowMultiLine) {
				var target = _get__('ReactDOM').findDOMNode(this.refs.textarea);
				target.style.height = Math.max(target.scrollHeight, target.clientHeight) + 'px';
				this.initHeight = Math.max(target.scrollHeight, target.clientHeight);
			}

			var MainElement = this.refs.textFeildMain.getBoundingClientRect();
			this.ACStyle.width = MainElement.width;
			//ACStyle.maxHeight = window.innerHeight - MainElement.top - MainElement.height - 10;
		}
	}, {
		key: '_onBlur',
		value: function _onBlur(e) {
			if (this.props.validator) {
				var validObject = {};
				validObject[this.props.name] = e.target.value;
				var validResult = this.props.validator.validate(validObject);
				if (validResult.status) {
					this.setState({
						errorMessage: ''
					});
				} else {
					if (!validResult.errorMessage[this.props.name]) validResult.errorMessage[this.props.name] = '';
					this.setState({
						errorMessage: validResult.errorMessage[this.props.name]
					}, function () {
						this.handleError();
					});
				}
			}
			if (this.state.highlightedIndex !== null) this.setState({ highlightedIndex: null });
			var that = this;
			setTimeout(function () {
				that.props.onBlur(that.props.name, that.state.data);
			}, 200);
		}
	}, {
		key: '_onChange',
		value: function _onChange(e) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.props.filterArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item === e.target.value.slice(-1)) return;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var event = e;
			if (this.props.allowMultiLine) {
				e.target.style.height = Math.max(e.target.scrollHeight, e.target.clientHeight, this.initHeight) + 'px';
			}

			if (this.props.maxWords && e.target.value.length > this.props.maxWords) {
				this.setState({
					data: e.target.value,
					errorMessage: '輸入的字數已達上限',
					ACData: [],
					highlightedIndex: null
				}, function () {
					this.handleError();
				});
			} else {
				this.setState({
					data: e.target.value,
					errorMessage: '',
					highlightedIndex: null
				}, function () {
					this.props.onChange(this.props.name, this.state.data);
				});
			}
		}
	}, {
		key: '_onKeyDown',
		value: function _onKeyDown(e) {
			if (this.props.onKeyDown) {
				var _props$onKeyDown = this.props.onKeyDown;
				var keyName = _props$onKeyDown.keyName;
				var action = _props$onKeyDown.action;
				var ignoreShift = _props$onKeyDown.ignoreShift;

				if (e.key === keyName && (ignoreShift ? !e.shiftKey : true)) {
					var text = this.refs.textarea.value;
					action(text);
				}
			}
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.keyDownHandlers[event.key] && this.props.ACData) {
				this.keyDownHandlers[event.key].call(this, event);
			}
			if (this.props.onKeyDown) this.props.onKeyDown(event);
		}
	}, {
		key: 'ACMouseOver',
		value: function ACMouseOver(index) {
			this.setState({
				highlightedIndex: index
			});
		}
	}, {
		key: 'select',
		value: function select(value, index) {
			this.setState({
				data: value,
				errorMessage: '',
				ACData: []
			});
			this.props.onSelected(value, index + 1);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.data !== nextProps.value && this.props.value !== nextProps.value) {
				this.setState({ data: nextProps.value });
			}
			if (this.state.ACData !== nextProps.ACData && this.props.ACData !== nextProps.ACData) {
				this.setState({ ACData: nextProps.ACData });
			}
			if (this.props.errorMessage !== nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage) {
				this.setState({ errorMessage: nextProps.errorMessage });
			}
		}
	}, {
		key: 'handleError',
		value: function handleError() {
			if (this.state.errorMessage.length > 0 && this.props.onError) {
				this.props.onError(this.props.name, this.state.errorMessage);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var option = {
				onBlur: this._onBlur,
				onChange: this._onChange,
				value: this.state.data,
				placeholder: this.props.placeHolder,
				disabled: this.props.disabled,
				onKeyDown: this._onKeyDown
			};
			var status = '';
			var that = this;

			if (this.state.errorMessage.length > 0) status = 'error ';
			return _get__('React').createElement(
				'div',
				{ className: this.props.className, styleName: 'inputRoot' },
				_get__('React').createElement(
					'div',
					{ styleName: status + 'input', ref: 'textFeildMain' },
					this.props.allowMultiLine ? _get__('React').createElement('textarea', _extends({}, option, {
						ref: 'textarea' })) : _get__('React').createElement('input', _extends({}, option, { onKeyDown: this.handleKeyDown.bind(this) })),
					this.props.maxWords && _get__('React').createElement(
						'span',
						{ styleName: 'maxWord' },
						_get__('React').createElement(
							'span',
							{ styleName: 'front' },
							this.state.data.length
						),
						'/',
						this.props.maxWords
					),
					_get__('React').createElement(
						'div',
						{ styleName: 'errorMessage' },
						this.state.errorMessage
					)
				),
				this.state.ACData && this.state.ACData.length > 0 && _get__('React').createElement(
					'div',
					{ style: this.ACStyle, styleName: 'AClist' },
					this.state.ACData.map(function (item, index) {
						var style = index === this.state.highlightedIndex ? { background: '#def6ff' } : null;
						var transformString = _get__('highlightString')(this.state.data, item.value);
						return _get__('React').createElement('li', { key: index,
							onClick: this.select.bind(this, item.value, index),
							onMouseOver: this.ACMouseOver.bind(this, index),
							style: style,
							dangerouslySetInnerHTML: { __html: transformString } });
					}, this)
				)
			);
		}
	}]);

	return TextFeild;
}(_get__('Component'));

_get__('TextFeild').propTypes = {
	onBlur: _get__('PropTypes').func
};
_get__('TextFeild').defaultProps = {
	errorMessage: '',
	data: '',
	onRequestOpenAC: {},
	filterArray: [],
	onBlur: function onBlur() {}
};

var _DefaultExportValue = _get__('CSSModules')(_get__('TextFeild'), _get__('style'), { allowMultiple: true });

exports.default = _DefaultExportValue;

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _get_original__(variableName);
	} else {
		var value = _RewiredData__[variableName];

		if (value === INTENTIONAL_UNDEFINED) {
			return undefined;
		} else {
			return value;
		}
	}
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'ReactDOM':
			return _reactDom2.default;

		case 'highlightString':
			return highlightString;

		case 'Component':
			return _react.Component;

		case 'TextFeild':
			return TextFeild;

		case 'PropTypes':
			return _react.PropTypes;

		case 'CSSModules':
			return _reactCssModules2.default;

		case 'style':
			return _style2.default;

		case 'React':
			return _react2.default;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
		Object.keys(variableName).forEach(function (name) {
			_RewiredData__[name] = variableName[name];
		});
	} else {
		if (value === undefined) {
			_RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
		} else {
			_RewiredData__[variableName] = value;
		}

		return function () {
			_reset__(variableName);
		};
	}
}

function _reset__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		var result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

var _typeOfOriginalExport = typeof _DefaultExportValue === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
	Object.defineProperty(_DefaultExportValue, name, {
		value: value,
		enumerable: false,
		configurable: true
	});
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
	addNonEnumerableProperty('__get__', _get__);
	addNonEnumerableProperty('__GetDependency__', _get__);
	addNonEnumerableProperty('__Rewire__', _set__);
	addNonEnumerableProperty('__set__', _set__);
	addNonEnumerableProperty('__reset__', _reset__);
	addNonEnumerableProperty('__ResetDependency__', _reset__);
	addNonEnumerableProperty('__with__', _with__);
	addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;