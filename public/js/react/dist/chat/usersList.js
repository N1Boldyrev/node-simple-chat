"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _chat = require("./chat.jsx");

var _fetch = require("../../../fetch.js");

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

var UsersList =
/*#__PURE__*/
function (_Component) {
  _inherits(UsersList, _Component);

  function UsersList(props) {
    var _this;

    _classCallCheck(this, UsersList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UsersList).call(this, props));
    _this.state = {
      list: "",
      activeUser: "",
      socket: new WebSocket('ws://localhost:3001')
    };
    _this.userChange = _this.userChange.bind(_assertThisInitialized(_this));
    _this.getUsersList = _this.getUsersList.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UsersList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var userList = [];
      var usersLogin = [];
      var users = (0, _fetch.getData)('/UsersList').then(function (data) {
        for (var key in data) {
          if (_this2.props.loginSplit != data[key].login) {
            userList.push(_react["default"].createElement("div", {
              key: data[key]._id,
              id: data[key].login,
              onClick: _this2.userChange.bind(_this2, data[key].login),
              className: "user"
            }, data[key].login));
            usersLogin.push(data[key].login);
          }
        }

        _this2.setState({
          list: userList
        });

        if (_this2.props.lastActiveUser != '') {
          //При входе на страницу открывает последний диалог
          _this2.userChange(_this2.props.lastActiveUser);
        } //Проверка на присутствие непрочитанных сообщений у пользователя


        var unread = (0, _fetch.postData)('/findMessages', {
          login: _this2.props.loginSplit
        }).then(function (data) {
          var sender = '';

          if (data.response != "Empty") {
            for (var _key in data) {
              if (data[_key].sender != _this2.props.loginSplit) {
                if (data[_key].users[0] == _this2.props.loginSplit) {
                  sender = data[_key].users[1];
                } else sender = data[_key].users[0];
              }

              document.getElementById(sender).className = "user unread";
            }
          }
        });
      });
    }
  }, {
    key: "getUsersList",
    value: function getUsersList() {
      var _this3 = this;

      //Получение зарегестрированных пользователей
      var userList = [];
      var usersLogin = [];
      var users = (0, _fetch.getData)('/UsersList').then(function (data) {
        for (var key in data) {
          if (_this3.props.loginSplit != data[key].login) {
            userList.push(_react["default"].createElement("div", {
              key: data[key]._id,
              id: data[key].login,
              onClick: _this3.userChange.bind(_this3, data[key].login),
              className: "user"
            }, data[key].login));
            usersLogin.push(data[key].login);
          }
        }

        _this3.setState({
          list: userList
        });
      });
    }
  }, {
    key: "userChange",
    value: function userChange(id) {
      if (this.state.activeUser != "" && id != "") {
        document.getElementById(this.state.activeUser).className = "User";
      }

      document.getElementById(id).className = "UserClicked";
      this.setState({
        activeUser: id
      });
      document.cookie = "lastActiveUser=".concat(id);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "content"
      }, _react["default"].createElement("div", {
        className: "usersList"
      }, this.state.list), _react["default"].createElement(_chat.Chat, {
        loginSplit: this.props.loginSplit,
        otherUser: this.state.activeUser,
        socket: this.state.socket,
        userChange: this.userChange,
        getUsersList: this.getUsersList
      }));
    }
  }]);

  return UsersList;
}(_react.Component);

exports.UsersList = UsersList;