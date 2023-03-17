"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageLogger = exports.SessionStorageLogger = exports.NullLogger = exports.NoLoggerFactoryException = exports.LoggerBase = exports.LogType = exports.Log = exports.LocalStorageLogger = exports.InvalidLoggerTypeException = exports.InvalidLoggerException = exports.DynamicLogger = exports.DOMLogger = exports.ConsoleLogger = exports.ConsoleColors = exports.ChainLogger = exports.ArrayLogger = void 0;
exports.colorize = colorize;
exports.formatDate = formatDate;
exports.merge = merge;
var _locustjsBase = require("locustjs-base");
var _locustjsStorage = require("locustjs-storage");
var _locustjsException = require("locustjs-exception");
var _locustjsEnum = _interopRequireDefault(require("locustjs-enum"));
var _htmlencode = require("htmlencode");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var LogType = _locustjsEnum["default"].define({
  info: 0,
  log: 1,
  debug: 2,
  trace: 3,
  warn: 4,
  danger: 5,
  success: 6,
  fail: 7,
  abort: 8,
  suggest: 9,
  cancel: 10
}, "LogType");
exports.LogType = LogType;
var ConsoleColors = {
  BackColor: {
    Black: 40,
    Red: 41,
    Green: 42,
    Yellow: 43,
    Blue: 44,
    Magenta: 45,
    Cyan: 46,
    White: 47,
    Gray: 100,
    BrightRed: 101,
    BrightGreen: 102,
    BrightYellow: 103,
    BrightBlue: 104,
    BrightMagenta: 105,
    BrightCyan: 106,
    BrightWhite: 107
  },
  ForeColor: {
    Black: 30,
    Red: 31,
    Green: 32,
    Yellow: 33,
    Blue: 34,
    Magenta: 35,
    Cyan: 36,
    White: 37,
    Gray: 90,
    BrightRed: 91,
    BrightGreen: 92,
    BrightYellow: 93,
    BrightBlue: 94,
    BrightMagenta: 95,
    BrightCyan: 96,
    BrightWhite: 97
  },
  Modifier: {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m"
  }
};
exports.ConsoleColors = ConsoleColors;
var InvalidLoggerTypeException = /*#__PURE__*/function (_Exception) {
  _inherits(InvalidLoggerTypeException, _Exception);
  var _super = _createSuper(InvalidLoggerTypeException);
  function InvalidLoggerTypeException() {
    _classCallCheck(this, InvalidLoggerTypeException);
    return _super.apply(this, arguments);
  }
  return _createClass(InvalidLoggerTypeException);
}(_locustjsException.Exception);
exports.InvalidLoggerTypeException = InvalidLoggerTypeException;
var NoLoggerFactoryException = /*#__PURE__*/function (_Exception2) {
  _inherits(NoLoggerFactoryException, _Exception2);
  var _super2 = _createSuper(NoLoggerFactoryException);
  function NoLoggerFactoryException() {
    _classCallCheck(this, NoLoggerFactoryException);
    return _super2.apply(this, arguments);
  }
  return _createClass(NoLoggerFactoryException);
}(_locustjsException.Exception);
exports.NoLoggerFactoryException = NoLoggerFactoryException;
var InvalidLoggerException = /*#__PURE__*/function (_Exception3) {
  _inherits(InvalidLoggerException, _Exception3);
  var _super3 = _createSuper(InvalidLoggerException);
  function InvalidLoggerException() {
    _classCallCheck(this, InvalidLoggerException);
    return _super3.apply(this, arguments);
  }
  return _createClass(InvalidLoggerException);
}(_locustjsException.Exception);
exports.InvalidLoggerException = InvalidLoggerException;
var Log = /*#__PURE__*/_createClass(function Log(type, host, scope, exception) {
  _classCallCheck(this, Log);
  this.date = new Date();
  this.type = LogType.getString(type, LogType.log);
  this.scope = (0, _locustjsBase.isString)(scope) ? scope : undefined;
  for (var _len = arguments.length, data = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    data[_key - 4] = arguments[_key];
  }
  this.data = data.length > 1 ? data : data.length > 0 ? data[0] : undefined;
  this.host = (0, _locustjsBase.isString)(host) ? host : undefined;
  this.exception = (0, _locustjsBase.isEmpty)(exception) ? undefined : new _locustjsException.Exception(exception);
  this.batch = data.length > 1;
});
exports.Log = Log;
function formatDate(d, type) {
  var result;
  if (type == "utc") {
    result = d.getUTCFullYear() + "/" + ("0" + d.getUTCDate()).slice(-2) + "/" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + " " + ("0" + d.getUTCHours()).slice(-2) + ":" + ("0" + d.getUTCMinutes()).slice(-2) + ":" + ("0" + d.getUTCSeconds()).slice(-2) + "." + d.getUTCMilliseconds();
  } else {
    result = d.getFullYear() + "/" + ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "." + d.getMilliseconds();
  }
  return result;
}
function merge(obj, keyValueSeparator, itemSeparator) {
  return obj ? Object.keys(obj).reduce(function (prev, curr) {
    return (prev ? prev + itemSeparator : "") + curr + keyValueSeparator + obj[curr];
  }, "") : "";
}
function colorize(text, color) {
  var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var result = "";
  if (color) {
    if (color.bc) {
      result += "\x1B[".concat(color.bc, "m");
    }
    if (color.fc) {
      result += "\x1B[".concat(color.fc, "m");
    }
    if (reset) {
      result += text + ConsoleColors.Modifier.Reset;
    }
  } else {
    result = text || "";
  }
  return result;
}

/*
options: {
  host: string, // host
}
*/
var LoggerBase = /*#__PURE__*/function () {
  function LoggerBase(options) {
    _classCallCheck(this, LoggerBase);
    (0, _locustjsException.throwIfInstantiateAbstract)(LoggerBase, this);
    this.options = Object.assign({}, options);
    this._scopes = [];
    this.scope = '';
  }
  _createClass(LoggerBase, [{
    key: "getScope",
    value: function getScope() {
      return this.scope;
    }
  }, {
    key: "enterScope",
    value: function enterScope(value) {
      this._scopes.push(this.scope);
      this.scope = (0, _locustjsBase.isFunction)(value) ? value.name : (0, _locustjsBase.isString)(value) ? value : '';
    }
  }, {
    key: "exitScope",
    value: function exitScope() {
      this.scope = this._scopes.pop();
    }
  }, {
    key: "host",
    get: function get() {
      return this.options.host;
    },
    set: function set(value) {
      this.options.host = value;
    }
    /*
      overloads:
          _createLog(type, ...data)
          _createLog(type, Exception, ...data)  // locustjs Exception
          _createLog(type, Error, ...data)      // javascript error
      */
  }, {
    key: "_createLog",
    value: function _createLog(type) {
      var result;
      for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }
      var arg0 = data.length > 0 ? data[0] : undefined;
      if ((0, _locustjsBase.isAnObject)(arg0) && (arg0 instanceof _locustjsException.Exception || arg0 instanceof Error)) {
        result = _construct(Log, [type, this.options.host, this.scope, arg0].concat(_toConsumableArray(data.slice(1))));
      } else {
        result = _construct(Log, [type, this.options.host, this.scope, undefined].concat(data));
      }
      return result;
    }
  }, {
    key: "_logInternal",
    value: function _logInternal(log) {
      (0, _locustjsException.throwNotImplementedException)("_logInternal", this.host);
    }
  }, {
    key: "clear",
    value: function clear() {
      (0, _locustjsException.throwNotImplementedException)("clear", this.host);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      (0, _locustjsException.throwNotImplementedException)("getAll", this.host);
    }
    /*
    // *********** UNDER DEVELOPMENT ***************
    // filters: fromIndex, toIndex, fromDate, toDate, types, host, categories
    // orderBy: 
    // orderDir
    // top
    // page: 
    // pageSize: 
    getRange(rangeOptions) {
      throwNotSpportedException("getRange", this.host);
    }
    // *********** UNDER DEVELOPMENT ***************
    */
  }, {
    key: "_log",
    value: function _log(type) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      if (args && args.length) {
        var log = this._createLog.apply(this, [type].concat(args));
        return this._logInternal(log);
      }
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this._log.apply(this, [LogType.log].concat(args));
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return this._log.apply(this, [LogType.debug].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return this._log.apply(this, [LogType.warn].concat(args));
    }
  }, {
    key: "danger",
    value: function danger() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      return this._log.apply(this, [LogType.danger].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      return this._log.apply(this, [LogType.info].concat(args));
    }
  }, {
    key: "success",
    value: function success() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      return this._log.apply(this, [LogType.success].concat(args));
    }
  }, {
    key: "fail",
    value: function fail() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      return this._log.apply(this, [LogType.fail].concat(args));
    }
  }, {
    key: "abort",
    value: function abort() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }
      return this._log.apply(this, [LogType.abort].concat(args));
    }
  }, {
    key: "suggest",
    value: function suggest() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }
      return this._log.apply(this, [LogType.suggest].concat(args));
    }
  }, {
    key: "trace",
    value: function trace() {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }
      return this._log.apply(this, [LogType.trace].concat(args));
    }
  }, {
    key: "cancel",
    value: function cancel() {
      for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }
      return this._log.apply(this, [LogType.cancel].concat(args));
    }
  }]);
  return LoggerBase;
}();
/*
options: {
  next: LoggerBase, // next logger
  filter: array | string,  // list of log types to be logged; default = '*' i.e. all lgo types
  unattended: bool, // whether or not this logger acts in an unattended behavior,
                    // i.e. it actually logs, but pretends it does not, thus, logging is passed 
                    // to the next logger in the chain; default = undefiend = false
}
*/
exports.LoggerBase = LoggerBase;
var ChainLogger = /*#__PURE__*/function (_LoggerBase) {
  _inherits(ChainLogger, _LoggerBase);
  var _super4 = _createSuper(ChainLogger);
  function ChainLogger(options) {
    var _this;
    _classCallCheck(this, ChainLogger);
    _this = _super4.call(this, options);
    (0, _locustjsException.throwIfInstantiateAbstract)(ChainLogger, _assertThisInitialized(_this));
    if ((0, _locustjsBase.isNull)(_this.options.next)) {
      _this.options.next = new NullLogger();
    }
    (0, _locustjsException.throwIfNotInstanceOf)("options.next", LoggerBase, _this.options.next, _this.host);
    _this.options.filter = "*";
    _this.options.unattended = false;
    return _this;
  }
  _createClass(ChainLogger, [{
    key: "next",
    get: function get() {
      return this.options.next;
    }
  }, {
    key: "canLog",
    value: function canLog(log) {
      var filter = (0, _locustjsBase.isSomeArray)(this.options.filter) ? this.options.filter : (0, _locustjsBase.isSomeString)(this.options.filter) ? this.options.filter.split(",") : ["*"];
      return filter.findIndex(function (x) {
        var type = (0, _locustjsBase.isNumber)(x) ? LogType.getString(x) : (x || "").toString().trim().toLowerCase();
        return type == "*" || type == "all" || type == log.type;
      }) >= 0;
    }
  }, {
    key: "__logInternal",
    value: function __logInternal(log) {
      (0, _locustjsException.throwNotImplementedException)("__logInternal", this.host);
    }
  }, {
    key: "_logInternal",
    value: function _logInternal(log) {
      var result = this.__logInternal(log);
      if (result === undefined) {
        result = this.options.unattended == false || this.options.unattended == undefined;
      }
      return result;
    }
  }, {
    key: "_log",
    value: function _log(type) {
      for (var _len15 = arguments.length, args = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        args[_key15 - 1] = arguments[_key15];
      }
      try {
        if (args && args.length) {
          var log = this._createLog.apply(this, [type].concat(args));
          var logged = false;
          if (this.canLog(log)) {
            logged = this._logInternal(log);
          }
          if (!(logged == null || logged == true)) {
            if (this.next instanceof LoggerBase) {
              var _this$next$log;
              (_this$next$log = this.next.log)[type].apply(_this$next$log, args);
            }
          }
        }
      } catch (e) {
        if (this.next && this.next instanceof LoggerBase) {
          var _this$next;
          var method = LogType.getString(type);
          this.next[method](e);
          (_this$next = this.next)[method].apply(_this$next, args);
        } else {
          throw e;
        }
      }
    }
  }]);
  return ChainLogger;
}(LoggerBase);
exports.ChainLogger = ChainLogger;
var ArrayLogger = /*#__PURE__*/function (_ChainLogger) {
  _inherits(ArrayLogger, _ChainLogger);
  var _super5 = _createSuper(ArrayLogger);
  function ArrayLogger(options) {
    var _this2;
    _classCallCheck(this, ArrayLogger);
    _this2 = _super5.call(this, options);
    _this2._logs = [];
    return _this2;
  }
  _createClass(ArrayLogger, [{
    key: "__logInternal",
    value: function __logInternal(log) {
      this._logs.push(log);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._logs;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._logs = [];
    }
  }]);
  return ArrayLogger;
}(ChainLogger);
/*
  options: {
    styles: object,  // color customization object
    dateType: 'utc' | 'current' (default)
    env: 'node' | 'web' (default)
  }
*/
exports.ArrayLogger = ArrayLogger;
var ConsoleLogger = /*#__PURE__*/function (_ChainLogger2) {
  _inherits(ConsoleLogger, _ChainLogger2);
  var _super6 = _createSuper(ConsoleLogger);
  function ConsoleLogger(options) {
    var _this3;
    _classCallCheck(this, ConsoleLogger);
    _this3 = _super6.call(this, options);
    if (!(0, _locustjsBase.isObject)(_this3.options.styles)) {
      _this3.options.styles = {};
    }
    if (_this3.options.env == "node") {
      _this3._initNodeColoring();
    } else {
      _this3._initWebColoring();
    }
    return _this3;
  }
  _createClass(ConsoleLogger, [{
    key: "_initNodeColoring",
    value: function _initNodeColoring() {
      var scope = {
        fc: ConsoleColors.ForeColor.Blue,
        bc: ConsoleColors.BackColor.Black
      };
      var host = {
        fc: ConsoleColors.ForeColor.Black,
        bc: ConsoleColors.BackColor.BrightCyan
      };
      var date = {
        fc: ConsoleColors.ForeColor.BrightYellow,
        bc: ConsoleColors.BackColor.Black
      };
      this._initStyle("log", this._labelNode(ConsoleColors.ForeColor.White), date, scope, host);
      this._initStyle("info", this._labelNode(ConsoleColors.ForeColor.BrightBlue), date, scope, host);
      this._initStyle("debug", this._labelNode(ConsoleColors.ForeColor.Magenta), date, scope, host);
      this._initStyle("trace", this._labelNode(ConsoleColors.ForeColor.Black, ConsoleColors.BackColor.Cyan), date, scope, host);
      this._initStyle("warn", this._labelNode(ConsoleColors.ForeColor.White, ConsoleColors.BackColor.Magenta), date, scope, host);
      this._initStyle("danger", this._labelNode(ConsoleColors.ForeColor.BrightRed), date, scope, host);
      this._initStyle("success", this._labelNode(ConsoleColors.ForeColor.Green), date, scope, host);
      this._initStyle("fail", this._labelNode(ConsoleColors.ForeColor.Red), date, scope, host);
      this._initStyle("abort", this._labelNode(ConsoleColors.ForeColor.Black, ConsoleColors.BackColor.White), date, scope, host);
      this._initStyle("suggest", this._labelNode(ConsoleColors.ForeColor.BrightMagenta), date, scope, host);
      this._initStyle("cancel", this._labelNode(ConsoleColors.ForeColor.Yellow), date, scope, host);
    }
  }, {
    key: "_initWebColoring",
    value: function _initWebColoring() {
      var scope = {
        color: "darkblue",
        "font-weight": "bold"
      };
      var host = {
        color: "black",
        "background-color": "lightcyan"
      };
      var date = {
        color: "blue"
      };
      this._initStyle("info", this._labelWeb("blue"), date, scope, host);
      this._initStyle("debug", this._labelWeb("darkmagenta"), date, scope, host);
      this._initStyle("trace", this._labelWeb("cyan", "black"), date, scope, host);
      this._initStyle("warn", this._labelWeb("magenta"), date, scope, host);
      this._initStyle("danger", this._labelWeb("red"), date, scope, host);
      this._initStyle("success", this._labelWeb("green"), date, scope, host);
      this._initStyle("fail", this._labelWeb("darkred"), date, scope, host);
      this._initStyle("abort", this._labelWeb("black"), date, scope, host);
      this._initStyle("suggest", this._labelWeb("purple"), date, scope, host);
      this._initStyle("cancel", this._labelWeb("darkorange"), date, scope, host);
    }
  }, {
    key: "_labelWeb",
    value: function _labelWeb(bg) {
      var fc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "white";
      return {
        color: fc,
        "background-color": bg
      };
    }
  }, {
    key: "_labelNode",
    value: function _labelNode(fc) {
      var bc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ConsoleColors.BackColor.Black;
      return {
        fc: fc,
        bc: bc
      };
    }
  }, {
    key: "_initStyle",
    value: function _initStyle(type, label, date, scope, host) {
      if (!(0, _locustjsBase.isObject)(this.options.styles[type])) {
        this.options.styles[type] = {};
      }
      if (!(0, _locustjsBase.isObject)(this.options.styles[type].label)) {
        this.options.styles[type].label = {};
      }
      if (!(0, _locustjsBase.isObject)(this.options.styles[type].date)) {
        this.options.styles[type].date = {};
      }
      if (!(0, _locustjsBase.isObject)(this.options.styles[type].scope)) {
        this.options.styles[type].scope = {};
      }
      if (!(0, _locustjsBase.isObject)(this.options.styles[type].host)) {
        this.options.styles[type].host = {};
      }
      this._assignStyle(this.options.styles[type].label, label);
      this._assignStyle(this.options.styles[type].scope, scope);
      this._assignStyle(this.options.styles[type].host, host);
      this._assignStyle(this.options.styles[type].date, date);
    }
  }, {
    key: "_assignStyle",
    value: function _assignStyle(obj, style) {
      Object.keys(style).forEach(function (key) {
        if (!(0, _locustjsBase.isString)(obj[key])) {
          obj[key] = style[key];
        }
      });
    }
  }, {
    key: "__logInternal",
    value: function __logInternal(log) {
      if (this.options.env == "node") {
        this._logNode(log);
      } else {
        this._logWeb(log);
      }
    }
  }, {
    key: "_logNode",
    value: function _logNode(log) {
      var _console;
      var style = this.options.styles[log.type] || {};
      var prefix = "".concat(colorize(formatDate(log.date, this.options.dateType), style.date), " ").concat(colorize(" ".concat(log.type.toUpperCase(), " "), style.label));
      if ((0, _locustjsBase.isSomeString)(log.host)) {
        prefix += " ".concat(colorize(" ".concat(log.host, " "), style.host), " ");
      }
      if ((0, _locustjsBase.isSomeString)(log.scope)) {
        prefix += " ".concat(colorize(log.scope, style.scope), " ");
      }
      var args = [prefix];
      if (log.batch) {
        args.splice.apply(args, [args.length, 0].concat(_toConsumableArray(log.data)));
      } else {
        args.push(log.data);
      }
      if (log.exception) {
        args.push(log.exception);
      }
      var type = LogType.getNumber(log.type);
      var method = "";
      switch (type) {
        case LogType.debug:
          method = "debug";
          break;
        case LogType.danger:
          method = "error";
          break;
        case LogType.trace:
          method = "trace";
          break;
        case LogType.warn:
          method = "warn";
          break;
        case LogType.info:
          method = "info";
          break;
        default:
          method = "log";
          break;
      }
      (_console = console)[method].apply(_console, args);
    }
  }, {
    key: "_logWeb",
    value: function _logWeb(log) {
      var _console2;
      var prefix = "%c".concat(formatDate(log.date, this.options.dateType), " %c ").concat(log.type.toUpperCase(), " ");
      var style = this.options.styles[log.type] || {};
      var colors = [merge(style.date, ":", ";"), merge(style.label, ":", ";")];
      if ((0, _locustjsBase.isSomeString)(log.host)) {
        prefix += "%c ".concat(log.host, " ");
        colors.push(merge(style.host, ":", ";"));
      }
      if ((0, _locustjsBase.isSomeString)(log.scope)) {
        prefix += "%c ".concat(log.scope, " ");
        colors.push(merge(style.scope, ":", ";"));
      }
      var args = [prefix].concat(colors);
      if (log.batch) {
        args.splice.apply(args, [args.length, 0].concat(_toConsumableArray(log.data)));
      } else {
        args.push(log.data);
      }
      if (log.exception) {
        args.push(log.exception);
      }
      var type = LogType.getNumber(log.type);
      var method = "";
      switch (type) {
        case LogType.debug:
          method = "debug";
          break;
        case LogType.danger:
          method = "error";
          break;
        case LogType.trace:
          method = "trace";
          break;
        case LogType.warn:
          method = "warn";
          break;
        case LogType.info:
          method = "info";
          break;
        default:
          method = "log";
          break;
      }
      (_console2 = console)[method].apply(_console2, _toConsumableArray(args));
    }
  }, {
    key: "getAll",
    value: function getAll() {
      (0, _locustjsException.throwNotSupportedException)("getAll", this.host);
    }
  }, {
    key: "clear",
    value: function clear() {
      console.clear();
    }
  }]);
  return ConsoleLogger;
}(ChainLogger);
/*
  options: {
    storeKey: string // storage item key where logs will be stored at. default = 'logs'
    store: 
    bufferSize: number // number of logs to be buffered before flushing into store. default = 5
  }
*/
exports.ConsoleLogger = ConsoleLogger;
var StorageLogger = /*#__PURE__*/function (_ArrayLogger) {
  _inherits(StorageLogger, _ArrayLogger);
  var _super7 = _createSuper(StorageLogger);
  function StorageLogger(options) {
    var _this4;
    _classCallCheck(this, StorageLogger);
    _this4 = _super7.call(this, options);
    (0, _locustjsException.throwIfInstantiateAbstract)(StorageLogger, _assertThisInitialized(_this4));
    if (!(0, _locustjsBase.isSomeString)(_this4.options.storeKey)) {
      _this4.options.storeKey = "logs";
    }
    if ((0, _locustjsBase.isEmpty)(_this4.options.store)) {
      (0, _locustjsException.throwIfNotInstanceOf)("options.store", _locustjsStorage.StorageBase, _this4.options.store, _this4.host);
    }
    if (!(0, _locustjsBase.isNumeric)(_this4.options.bufferSize)) {
      _this4.options.bufferSize = 5;
    }
    _this4._new_log_count = 0;
    return _this4;
  }
  _createClass(StorageLogger, [{
    key: "__logInternal",
    value: function __logInternal(log) {
      _get(_getPrototypeOf(StorageLogger.prototype), "__logInternal", this).call(this, log);
      if (this.options.bufferSize > 0) {
        this._new_log_count++;
        if (this._new_log_count >= this.options.bufferSize) {
          this.options.store.setItem(this.options.storeKey, this.getAll());
          this._new_log_count = 0;
        }
      } else {
        this.options.store.setItem(this.options.storeKey, this.getAll());
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      _get(_getPrototypeOf(StorageLogger.prototype), "clear", this).call(this);
      this._new_log_count = 0;
      this.options.store.setItem(this.options.storeKey, []);
    }
  }]);
  return StorageLogger;
}(ArrayLogger);
exports.StorageLogger = StorageLogger;
var LocalStorageLogger = /*#__PURE__*/function (_StorageLogger) {
  _inherits(LocalStorageLogger, _StorageLogger);
  var _super8 = _createSuper(LocalStorageLogger);
  function LocalStorageLogger(options) {
    _classCallCheck(this, LocalStorageLogger);
    return _super8.call(this, Object.assign(options, {
      store: new _locustjsStorage.LocalStorageJson()
    }));
  }
  return _createClass(LocalStorageLogger);
}(StorageLogger);
exports.LocalStorageLogger = LocalStorageLogger;
var SessionStorageLogger = /*#__PURE__*/function (_StorageLogger2) {
  _inherits(SessionStorageLogger, _StorageLogger2);
  var _super9 = _createSuper(SessionStorageLogger);
  function SessionStorageLogger(options) {
    _classCallCheck(this, SessionStorageLogger);
    return _super9.call(this, Object.assign(options, {
      store: new _locustjsStorage.SessionStorageJson()
    }));
  }
  return _createClass(SessionStorageLogger);
}(StorageLogger);
/*
  options: {
    target: string (css selector) | object // a DOM node or css selector of a DOM node where logs should be appended to.
                                           // default = #dom-logger
    onInit: func // custom log table creator
    onNewLog: func // custom log table record
    className: string // css className of target node. default = dom-logger
    format: func // custom format
  }
*/
exports.SessionStorageLogger = SessionStorageLogger;
var DOMLogger = /*#__PURE__*/function (_ChainLogger3) {
  _inherits(DOMLogger, _ChainLogger3);
  var _super10 = _createSuper(DOMLogger);
  function DOMLogger(options) {
    var _this5;
    _classCallCheck(this, DOMLogger);
    _this5 = _super10.call(this, options);
    _this5.target = _this5.options.target || "#dom-logger";
    _this5._init();
    return _this5;
  }
  _createClass(DOMLogger, [{
    key: "target",
    get: function get() {
      return this._target;
    },
    set: function set(value) {
      if ((0, _locustjsBase.isjQueryElement)(value)) {
        this._target = value.length ? value[0] : null;
      } else if ((0, _locustjsBase.isString)(value)) {
        this._target = document.querySelector(value);
      } else {
        this._target = (0, _locustjsBase.isObject)(value) && (0, _locustjsBase.isFunction)(value.querySelector) ? value : null;
      }
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this6 = this;
      var recreate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this._count = 0;
      if (this.target && (this.target.querySelectorAll('tbody tr').length == 0 || recreate)) {
        if ((0, _locustjsBase.isFunction)(this.options.onInit)) {
          var result = this.options.onInit(this);
          if ((0, _locustjsBase.isSomeString)(result)) {
            this.target.innerHTML = result;
          } else if ((0, _locustjsBase.isObject)(result) && (0, _locustjsBase.isFunction)(result.querySelector)) {
            this.target.appendChild(result);
          }
        } else {
          var _className = this.options.className || "dom-logger";
          this.target.innerHTML = "\n          <table class=\"".concat(_className, "\">\n              <thead>\n                  <tr>\n                    <th>Row</th>\n                    <th>Type</th>\n                    <th>Date</th>\n                    <th>Scope/Host</th>\n                    <th>Data/Exception</th>\n                  </tr>\n              </thead>\n              <tbody>\n              </tbody>\n          </table>");
        }
        if ((0, _locustjsBase.isFunction)(this.options.onRowClick)) {
          document.querySelectorAll("".concat(className, " table tbody tr")).forEach(function (tr) {
            tr.onclick = _this6.options.onRowClick;
          });
        }
      }
    }
  }, {
    key: "__logInternal",
    value: function __logInternal(log) {
      if (this.target) {
        var tr;
        if ((0, _locustjsBase.isFunction)(this.options.onNewLog)) {
          tr = this.options.onNewLog(this, log, this._count);
        } else {
          var body = this.target.querySelector("tbody");
          if (body) {
            tr = document.createElement("TR");
            tr.setAttribute('class', log.type);
            var tdRow = document.createElement("TD");
            var tdType = document.createElement("TD");
            var tdDate = document.createElement("TD");
            var tdScopeHost = document.createElement("TD");
            var tdDataException = document.createElement("TD");
            tdRow.innerHTML = "<div>".concat(this._count + 1, "</div>");
            tdType.innerHTML = "<div>".concat(log.type, "</div>");
            tdDate.innerHTML = "<div>".concat(formatDate(log.date), "</div>");
            tdScopeHost.innerHTML = "".concat(log.scope ? "<span class=\"scope\">".concat(log.scope, "</span>") : "").concat(log.host ? "<span class=\"host\">".concat(log.host, "</span>") : "");
            var data;
            var exception;
            try {
              if ((0, _locustjsBase.isFunction)(this.options.format)) {
                data = this.options.format(this, log, 'data');
                exception = this.options.format(this, log, 'exception');
              } else {
                data = log.data ? JSON.stringify(log.data, null, 2) : '';
                exception = log.exception ? JSON.stringify(log.exception, null, 2) : '';
              }
            } catch (err) {
              this.danger(err);
            }
            var dataHtml = (0, _htmlencode.htmlEncode)(data);
            var exceptionHtml = (0, _htmlencode.htmlEncode)(exception);
            tdDataException.innerHTML = "".concat(data ? "<div class=\"data\" title=\"".concat(dataHtml.replace(/"/g, '&quot;'), "\">").concat(dataHtml, "</div>") : "").concat(exception ? "<div class=\"exception\" title=\"".concat(exceptionHtml.replace(/"/g, '&quot;'), "\">").concat(exceptionHtml, "</div>") : "");
            tr.appendChild(tdRow);
            tr.appendChild(tdType);
            tr.appendChild(tdDate);
            tr.appendChild(tdScopeHost);
            tr.appendChild(tdDataException);
          }
          if ((0, _locustjsBase.isObject)(tr) && (0, _locustjsBase.isFunction)(tr.querySelector)) {
            body.appendChild(tr);
          }
        }
        this._count++;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this._init(true);
    }
  }]);
  return DOMLogger;
}(ChainLogger);
exports.DOMLogger = DOMLogger;
var NullLogger = /*#__PURE__*/function (_LoggerBase2) {
  _inherits(NullLogger, _LoggerBase2);
  var _super11 = _createSuper(NullLogger);
  function NullLogger() {
    _classCallCheck(this, NullLogger);
    return _super11.apply(this, arguments);
  }
  _createClass(NullLogger, [{
    key: "_logInternal",
    value: function _logInternal() {}
  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "getAll",
    value: function getAll() {
      return [];
    }
  }]);
  return NullLogger;
}(LoggerBase);
/*
  options: {
    dom: object // custom options for DOMLogger
    store: object // custom options for store logger types
    console: object // custom options for console logger
    factory: func // custom factory for creating loggers
    next: LoggerBase // default next logger
  }
*/
exports.NullLogger = NullLogger;
var DynamicLogger = /*#__PURE__*/function (_LoggerBase3) {
  _inherits(DynamicLogger, _LoggerBase3);
  var _super12 = _createSuper(DynamicLogger);
  function DynamicLogger(options) {
    var _this7;
    _classCallCheck(this, DynamicLogger);
    _this7 = _super12.call(this, Object.assign({
      dom: {},
      store: {},
      array: {},
      factory: null,
      console: {}
    }, options));
    _this7.type = "null";
    return _this7;
  }
  _createClass(DynamicLogger, [{
    key: "getScope",
    value: function getScope() {
      return this._instance.getScope();
    }
  }, {
    key: "enterScope",
    value: function enterScope(value) {
      this._instance.enterScope(value);
    }
  }, {
    key: "exitScope",
    value: function exitScope() {
      this._instance.exitScope();
    }
  }, {
    key: "_createLogger",
    value: function _createLogger(factory, type, fallback) {
      var result;
      try {
        if ((0, _locustjsBase.isFunction)(factory)) {
          result = factory(this, type);
        }
        if (result == null) {
          if ((0, _locustjsBase.isFunction)(fallback)) {
            result = fallback();
          } else {
            throw new NoLoggerFactoryException();
          }
        }
        if (result == null) {
          throw new InvalidLoggerTypeException();
        } else {
          if (!(result instanceof LoggerBase)) {
            throw new InvalidLoggerException();
          }
        }
      } catch (e) {
        this.enterScope("DynamicLogger._createLogger");
        this.danger(e);
        this.exitScope();
      }
      return result;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(value) {
      var _this8 = this;
      var logger;
      var fallback;
      value = (value || "").toString().trim().toLowerCase();
      switch (value) {
        case "console":
          fallback = function fallback() {
            return new ConsoleLogger(_objectSpread({
              host: _this8.options.host,
              next: _this8.options.next
            }, _this8.options.console));
          };
          break;
        case "dom":
          fallback = function fallback() {
            return new DOMLogger(_objectSpread({
              host: _this8.options.host,
              next: _this8.options.next
            }, _this8.options.dom));
          };
          break;
        case "":
        case "null":
          fallback = function fallback() {
            return new NullLogger();
          };
          break;
        case "array":
          fallback = function fallback() {
            return new ArrayLogger(_objectSpread({
              host: _this8.options.host,
              next: _this8.options.next
            }, _this8.options.array));
          };
          break;
        case "localstorage":
          fallback = function fallback() {
            return new LocalStorageLogger(_objectSpread({
              host: _this8.options.host,
              next: _this8.options.next
            }, _this8.options.store));
          };
          break;
        case "sessionstorage":
          fallback = function fallback() {
            return new SessionStorageLogger(_objectSpread({
              host: _this8.options.host,
              next: _this8.options.next
            }, _this8.options.store));
          };
          break;
        default:
          fallback = function fallback() {
            return null;
          };
          break;
      }
      logger = this._createLogger(this.options.factory, value, fallback);
      if (logger) {
        this._instance = logger;
        this._type = value;
      }
    }
  }, {
    key: "_log",
    value: function _log(type) {
      var _type = LogType.getString(type);
      if ((0, _locustjsBase.isFunction)(this._instance[_type])) {
        var _this$_instance;
        for (var _len16 = arguments.length, args = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
          args[_key16 - 1] = arguments[_key16];
        }
        (_this$_instance = this._instance)[_type].apply(_this$_instance, args);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this._instance.clear();
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._instance.getAll();
    }
  }]);
  return DynamicLogger;
}(LoggerBase);
exports.DynamicLogger = DynamicLogger;
