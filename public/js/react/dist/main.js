"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var loginSplit = document.cookie.split('=');

var Headder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Headder, _React$Component);

  function Headder(props) {
    var _this;

    _classCallCheck(this, Headder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Headder).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(Headder, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "headder"
      }, React.createElement("div", {
        className: "logo"
      }, "MeChat"), React.createElement("div", {
        className: "username"
      }, loginSplit[1]), React.createElement("div", {
        className: "signOut"
      }, React.createElement("button", null, "Sign out")));
    }
  }]);

  return Headder;
}(React.Component);

;

var UsersLsit =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(UsersLsit, _React$Component2);

  function UsersLsit(props) {
    var _this2;

    _classCallCheck(this, UsersLsit);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(UsersLsit).call(this, props));
    _this2.state = {
      list: "kal",
      suka: "fefeae"
    };
    return _this2;
  }

  _createClass(UsersLsit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var userList = [];
      var users = getData('/UsersList').then(function (data) {
        for (var key in data) {
          userList.push(React.createElement("div", {
            key: data[key]._id
          }, data[key].login));

          _this3.setState({
            list: userList
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "usersList"
      }, this.state.list);
    }
  }]);

  return UsersLsit;
}(React.Component);

ReactDOM.render(React.createElement("div", null, React.createElement(Headder, null), React.createElement(UsersLsit, null)), document.getElementById("root"));