"use strict";

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
function (_React$Component) {
  _inherits(LoginScreen, _React$Component);

  function LoginScreen(props) {
    var _this;

    _classCallCheck(this, LoginScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginScreen).call(this, props));
    _this.state = {
      button_id: "signIn",
      logo_id: "logo"
    };
    _this.mouseOver = _this.mouseOver.bind(_assertThisInitialized(_this));
    _this.mouseOut = _this.mouseOut.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LoginScreen, [{
    key: "mouseOver",
    value: function mouseOver() {
      this.setState({
        button_id: 'button_hover',
        logo_id: 'logo_hover'
      });
    }
  }, {
    key: "mouseOut",
    value: function mouseOut() {
      this.setState({
        button_id: 'signIn',
        logo_id: 'logo'
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "loginForm"
      }, React.createElement("div", {
        className: this.state.logo_id
      }, "MeChat"), React.createElement("div", {
        id: "login_text"
      }, "Login"), React.createElement("input", {
        type: "text",
        name: "",
        id: "login",
        autoComplete: "off"
      }), React.createElement("div", {
        id: "password_text"
      }, "Password"), React.createElement("input", {
        type: "password",
        name: "",
        id: "password",
        autoComplete: "off"
      }), React.createElement("br", null), React.createElement("button", {
        className: this.state.button_id,
        onMouseOver: this.mouseOver,
        onMouseOut: this.mouseOut
      }, "Sign in"));
    }
  }]);

  return LoginScreen;
}(React.Component);

;
ReactDOM.render(React.createElement(LoginScreen, null), document.getElementById('root'));