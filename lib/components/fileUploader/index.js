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

var _fileUpload = require('../../utils/fileUpload.js');

var _IDMaker = require('../../utils/IDMaker.js');

var _IDMaker2 = _interopRequireDefault(_IDMaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof regeneratorRuntime === 'undefined') require('babel-polyfill');

var FileUploader = function (_Component) {
    _inherits(FileUploader, _Component);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));

        _this.counter = 0;
        _this.fileList = {};

        _this.handleClick = function (e) {
            if (_this.props.onTriggerUpload) _this.props.onTriggerUpload(e);
            _this.refs.fileInput.click();
        };
        _this.cleanInput = function () {
            if (_this.refs.fileInput) _this.refs.fileInput.value = null;
        };

        _this.handleFileInput = function (e) {
            return _this._handleFileInput(e);
        };

        _this.logObject = function (object) {
            return Object.assign({}, object);
        };

        _this.generatorProcess = regeneratorRuntime.mark(function _callee(ID, signatureData, snap) {
            var signature, uploadS3;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.fileList[ID]) {
                                _context.next = 21;
                                break;
                            }

                            _context.next = 3;
                            return (0, _fileUpload.getSignature)(this.fileList[ID].originFile, signatureData);

                        case 3:
                            signature = _context.sent;

                            this.fileList[ID].signature = signature;
                            this.fileList[ID].status = 'uploading';
                            this.fileList[ID].snapTag = snap;
                            if (this.props.getSignatureDone) this.props.getSignatureDone(this.logObject(this.fileList[ID]));

                            _context.next = 10;
                            return (0, _fileUpload.uploadToS3)(this.fileList[ID].originFile, signature);

                        case 10:
                            uploadS3 = _context.sent;

                            this.fileList[ID].status = 'uploadDone';
                            if (this.props.uploadToS3Done) this.props.uploadToS3Done(this.logObject(this.fileList[ID]));

                            if (this.props.dontWaitSuccess) {
                                _context.next = 20;
                                break;
                            }

                            this.fileList[ID].status = 'transforming';
                            _context.next = 17;
                            return (0, _fileUpload.waitUrlSuccess)(signature.fileId, this.fileList[ID].snapTag);

                        case 17:
                            this.fileList[ID].transformedFile = _context.sent;

                            this.fileList[ID].status = 'transformDone';
                            if (this.props.urlTransformDone) this.props.urlTransformDone(this.logObject(this.fileList[ID]));

                        case 20:

                            this.cleanInput();

                        case 21:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });

        _this.runGenerator = function (gen) {

            function go(result) {
                if (result.done) return;
                result.value.then(function (r) {
                    go(gen.next(r));
                });
            }
            go(gen.next());
        };
        return _this;
    }

    _createClass(FileUploader, [{
        key: '_handleFileInput',
        value: function _handleFileInput(e) {
            var _this2 = this;

            var files = Array.prototype.slice.call(e.target.files, 0);
            var signatureData = {
                apnum: this.props.apnum,
                pid: this.props.pid
            };
            var snap = '';
            var that = this;

            files.forEach(function (f) {
                if (typeof _fileUpload.MIMEMap[f.type] !== 'undefined') {

                    var ID = (0, _IDMaker2.default)(3, _this2.counter);
                    _this2.counter++;

                    that.fileList[ID] = {
                        id: ID,
                        type: _fileUpload.MIMEMap[f.type],
                        originFile: f,
                        status: 'initial',
                        transformedFile: null
                    };

                    if (that.props.getFileInfo) that.props.getFileInfo(that.fileList[ID]);
                    signatureData.extra = that.props.mediaInfo[_fileUpload.MIMEMap[f.type]].uploadInfo;
                    snap = that.props.mediaInfo[_fileUpload.MIMEMap[f.type]].snapTag;
                    var gen = that.generatorProcess(ID, signatureData, snap);
                    that.runGenerator(gen);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                { styleName: 'fileUpload', onClick: this.handleClick, className: this.props.className },
                this.props.children,
                _react2.default.createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
                    onChange: this.handleFileInput })
            );
        }
    }]);

    return FileUploader;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(FileUploader, _style2.default);