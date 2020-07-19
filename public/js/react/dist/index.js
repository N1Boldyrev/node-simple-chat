"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _fetch = require("../../fetch.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoginScreen =
/*#__PURE__*/
function (_Component) {
  _inherits(LoginScreen, _Component);

  function LoginScreen(props) {
    var _this;

    _classCallCheck(this, LoginScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginScreen).call(this, props));
    _this.state = {
      button_id: "signIn",
      logo_id: "logo",
      form_id: "loginForm",
      socket: new WebSocket('ws://localhost:3001'),
      socketOpen: false
    };
    _this.mouseOver = _this.mouseOver.bind(_assertThisInitialized(_this));
    _this.mouseOut = _this.mouseOut.bind(_assertThisInitialized(_this));
    _this.signUp = _this.signUp.bind(_assertThisInitialized(_this));
    _this.signIn = _this.signIn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.state.socket.onopen = function () {
        _this2.setState({
          socketOpen: true
        });
      };
    }
  }, {
    key: "mouseOver",
    value: function mouseOver() {
      this.setState({
        button_id: 'button_hover',
        logo_id: 'logo_hover',
        form_id: "loginForm_hover"
      });
    }
  }, {
    key: "mouseOut",
    value: function mouseOut() {
      this.setState({
        button_id: 'signIn',
        logo_id: 'logo',
        form_id: "loginForm"
      });
    }
  }, {
    key: "fieldsFill",
    value: function fieldsFill(login, password, message) {
      if (login.value == '' || password.value == '') {
        var errorMsg = '';

        if (login.value == '' && password.value == '') {
          errorMsg = 'Неверные логин и пароль';
          login.className = 'wrongInput';
          password.className = 'wrongInput';
        } else if (login.value == '') {
          errorMsg = 'Неверный логин';
          login.className = 'wrongInput';
        } else {
          errorMsg = 'Неверный пароль';
          password.className = 'wrongInput';
        }

        message.innerText = errorMsg;
        message.className = "errorMessage";
        message.style.opacity = 1;
        return false;
      } else return true;
    }
  }, {
    key: "signUp",
    value: function signUp() {
      var _this3 = this;

      var login = document.getElementById('login');
      var password = document.getElementById('password');
      var message = document.getElementById('message');

      if (this.fieldsFill(login, password, message) == true) {
        (0, _fetch.postData)('/signUp', {
          login: login.value,
          password: password.value
        }).then(function (data) {
          if (data.status == "already exists") {
            message.className = "errorMessage";
            message.style.opacity = 1;
            message.innerText = 'Такой пользователь уже зарегистрирован';
            login.className = 'wrongInput';
            password.className = 'wrongInput';
          } else if (data.status == 'ok') {
            message.className = "successMessage";
            message.style.opacity = 1;
            message.innerText = 'Вы были зарегистрированы, попробуйте войти';
          } else throw new Error("Server error");

          login.value = '';
          password.value = '';

          if (_this3.state.socketOpen == true) {
            _this3.state.socket.send(JSON.stringify({
              operation: "New user"
            }));
          }
        })["catch"](function (error) {
          return console.log(error);
        });
      }
    }
  }, {
    key: "signIn",
    value: function signIn() {
      var login = document.getElementById('login');
      var password = document.getElementById('password');
      var message = document.getElementById('message');

      if (this.fieldsFill(login, password, message) == true) {
        (0, _fetch.postData)('/signIn', {
          login: login.value,
          password: password.value
        }).then(function (data) {
          if (data.validation == false) {
            message.style.opacity = 1;
            message.className = "errorMessage";
            message.innerText = 'Неверный логин или пароль';
            login.value = '';
            password.value = '';
          } else {
            document.location.href = '/';
          }
        });
      }
    }
  }, {
    key: "inputValChanged",
    value: function inputValChanged(id, classname) {
      document.getElementById(id).className = classname;
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        id: this.state.form_id
      }, _react["default"].createElement("div", {
        className: this.state.logo_id
      }, "MeChat"), _react["default"].createElement("div", {
        id: "login_text"
      }, "\u041B\u043E\u0433\u0438\u043D"), _react["default"].createElement("input", {
        type: "text",
        name: "",
        id: "login",
        autoComplete: "off",
        className: "login",
        onChange: this.inputValChanged.bind(this, 'login', 'login')
      }), _react["default"].createElement("div", {
        id: "password_text"
      }, "\u041F\u0430\u0440\u043E\u043B\u044C"), _react["default"].createElement("input", {
        type: "password",
        name: "",
        id: "password",
        autoComplete: "off",
        className: "password",
        onChange: this.inputValChanged.bind(this, 'password', 'password')
      }), _react["default"].createElement("br", null), _react["default"].createElement("button", {
        className: this.state.button_id,
        onMouseOver: this.mouseOver,
        onMouseOut: this.mouseOut,
        onClick: this.signIn
      }, "\u0412\u043E\u0439\u0442\u0438"), _react["default"].createElement("div", {
        className: "signUp"
      }, _react["default"].createElement("a", {
        onClick: this.signUp
      }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")), _react["default"].createElement("div", {
        id: "message",
        className: "errorMessage"
      }, "ERROR MSG HERE"));
    }
  }]);

  return LoginScreen;
}(_react.Component);

;

_reactDom["default"].render(_react["default"].createElement(LoginScreen, null), document.getElementById('root'));