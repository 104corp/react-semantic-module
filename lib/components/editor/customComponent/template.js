'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YoutubeBlock = exports.LinkBlock = exports.HyperLinkBlock = exports.DocumentBlock = exports.AudioBlock = exports.VideoBlock = exports.ImgBlock = exports.ErrorBlock = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorBlock = (0, _reactCssModules2.default)(function (parent) {
    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block' },
        _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
        _react2.default.createElement(
            'div',
            { styleName: 'loading-preset' },
            _react2.default.createElement('div', { styleName: 'play-icon error' }),
            _react2.default.createElement(
                'p',
                { styleName: 'errorText' },
                '\u4E0A\u50B3\u767C\u751F\u932F\u8AA4\uFF0C\u8ACB\u91CD\u65B0\u4E0A\u50B3'
            )
        )
    );
}, _style2.default, { allowMultiple: true });

var ImgBlock = (0, _reactCssModules2.default)(function (_ref) {
    var parent = _ref.parent;
    var props = _ref.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block', style: { 'textAlign': 'center' } },
        props.loading ? _react2.default.createElement(
            'div',
            { styleName: 'mask-block loading' },
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement('img', { styleName: 'article-image', src: props.fakeSrc }),
            _react2.default.createElement('div', { styleName: 'loading' }),
            _react2.default.createElement('div', { styleName: 'mask' })
        ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement('img', { styleName: 'article-image', src: props.fakeSrc })
        )
    );
}, _style2.default, { allowMultiple: true });

var VideoBlock = (0, _reactCssModules2.default)(function (_ref2) {
    var parent = _ref2.parent;
    var props = _ref2.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block' },
        props.loading ? _react2.default.createElement(
            'div',
            { styleName: 'loading-preset' },
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement('div', { styleName: 'play-icon video' }),
            _react2.default.createElement('div', { styleName: 'loader' })
        ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement('video', { controls: true, src: props.src })
        )
    );
}, _style2.default, { allowMultiple: true });

var AudioBlock = (0, _reactCssModules2.default)(function (_ref3) {
    var parent = _ref3.parent;
    var props = _ref3.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block' },
        props.loading ? _react2.default.createElement(
            'div',
            { styleName: 'loading-preset audio' },
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement('div', { styleName: 'play-icon audio' }),
            _react2.default.createElement('div', { styleName: 'loader' })
        ) : _react2.default.createElement(
            'div',
            { styleName: 'mid-block' },
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement(
                'div',
                { styleName: 'title' },
                props.name
            ),
            _react2.default.createElement('audio', { controls: true, src: props.src })
        )
    );
}, _style2.default, { allowMultiple: true });

var DocumentBlock = (0, _reactCssModules2.default)(function (_ref4) {
    var parent = _ref4.parent;
    var props = _ref4.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block' },
        props.loading ? _react2.default.createElement(
            'div',
            { styleName: 'loading-preset document' },
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement('div', { styleName: 'play-icon document' }),
            _react2.default.createElement('div', { styleName: 'loader' })
        ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
            _react2.default.createElement(
                'div',
                { styleName: 'loading-preset' },
                _react2.default.createElement('div', { styleName: 'play-icon document' }),
                _react2.default.createElement(
                    'div',
                    { styleName: 'mid-title' },
                    props.name
                )
            )
        )
    );
}, _style2.default, { allowMultiple: true });

var YoutubeBlock = (0, _reactCssModules2.default)(function (_ref5) {
    var parent = _ref5.parent;
    var props = _ref5.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block' },
        _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
        _react2.default.createElement(
            'a',
            { href: props.url, target: '_blank' },
            props.url
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('iframe', { width: '476', height: '267.5',
                src: "https://www.youtube.com/embed/" + props.file })
        )
    );
}, _style2.default, { allowMultiple: true });

var HyperLinkBlock = (0, _reactCssModules2.default)(function (_ref6) {
    var parent = _ref6.parent;
    var props = _ref6.props;


    var removeBlock = function removeBlock() {
        parent.props.blockProps.onRequestRemove(parent.props.block.getKey(), parent.state.props.id);
    };

    return _react2.default.createElement(
        'div',
        { styleName: 'block' },
        _react2.default.createElement('div', { styleName: 'close', onClick: removeBlock }),
        _react2.default.createElement(
            'a',
            { href: props.url, target: '_blank' },
            _react2.default.createElement(
                'span',
                { styleName: 'link' },
                props.url
            ),
            props.loading ? _react2.default.createElement(
                'div',
                { styleName: 'linkLoading' },
                _react2.default.createElement('div', { styleName: 'loading' })
            ) : _react2.default.createElement(
                'div',
                { styleName: 'linkBlock' },
                _react2.default.createElement('img', { src: props.img.url }),
                _react2.default.createElement(
                    'div',
                    { styleName: 'info' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        props.title
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        props.description
                    ),
                    _react2.default.createElement(
                        'span',
                        { styleName: 'tag104' },
                        'plus.104.com.tw'
                    )
                )
            )
        )
    );
}, _style2.default, { allowMultiple: true });

var LinkBlock = (0, _reactCssModules2.default)(function (_ref7) {
    var parent = _ref7.parent;
    var props = _ref7.props;


    return _react2.default.createElement(
        'a',
        { href: props.url, target: '_blank' },
        props.url
    );
}, _style2.default, { allowMultiple: true });

exports.ErrorBlock = ErrorBlock;
exports.ImgBlock = ImgBlock;
exports.VideoBlock = VideoBlock;
exports.AudioBlock = AudioBlock;
exports.DocumentBlock = DocumentBlock;
exports.HyperLinkBlock = HyperLinkBlock;
exports.LinkBlock = LinkBlock;
exports.YoutubeBlock = YoutubeBlock;