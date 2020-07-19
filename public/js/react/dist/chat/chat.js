"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;

var _react = _interopRequireWildcard(require("react"));

var _popUpMessage = require("./popUpMessage.jsx");

var _fetch = require("../../../fetch.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var tmpMessageList = [];

var Chat =
/*#__PURE__*/
function (_Component) {
  _inherits(Chat, _Component);

  function Chat(props) {
    var _this;

    _classCallCheck(this, Chat);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chat).call(this, props));
    _this.state = {
      messages: _react["default"].createElement("div", {
        className: "messageCover"
      }, "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0430 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439"),
      destination: "",
      socket: props.socket,
      readable: [1, 2, 3],
      popUpMsg: "",
      popUpSender: "",
      typing: false
    };
    _this.sendMessage = _this.sendMessage.bind(_assertThisInitialized(_this));
    _this.mouseOverSendButton = _this.mouseOverSendButton.bind(_assertThisInitialized(_this));
    _this.mouseOutSendButton = _this.mouseOutSendButton.bind(_assertThisInitialized(_this));
    _this.readKey = _this.readKey.bind(_assertThisInitialized(_this));
    _this.typingDetection = _this.typingDetection.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.state.socket.onopen = function () {
        _this2.state.socket.send(JSON.stringify({
          login: _this2.props.loginSplit,
          operation: "User connect"
        }));

        _this2.state.socket.onmessage = function (message) {
          var data = JSON.parse(message.data);

          if (data.operation == "Send message" && _this2.props.otherUser == data.sender) {
            //Если пользователь на странице диалога с отправителем сообщения
            var newMessage = _react["default"].createElement("div", {
              className: "message",
              key: data.id,
              id: data.id
            }, _react["default"].createElement("div", {
              className: "messageUsername"
            }, data.sender), _react["default"].createElement("div", {
              className: "messageText"
            }, data.message));

            tmpMessageList.push(newMessage);

            _this2.state.socket.send(JSON.stringify({
              sender: _this2.props.loginSplit,
              reader: data.sender,
              id: data.id,
              operation: "Was read",
              wasRead: false
            }));

            _this2.setState({
              messages: tmpMessageList
            });
          } else if (data.operation == "Send message" && _this2.props.otherUser != data.sender) {
            document.getElementById(data.sender).className = "user unread";

            _this2.setState({
              popUpMsg: data.message,
              popUpSender: data.sender
            });

            document.getElementById('messageSound').play();
          } else if (data.operation == "New user") {
            _this2.props.getUsersList();
          } else if (data.operation == "Was read") {
            if (data.reader == _this2.props.otherUser) {
              document.getElementById(data.id).className = "message";

              if (data.wasRead == false) {
                _this2.state.socket.send(JSON.stringify({
                  sender: data.reader,
                  reader: data.sender,
                  id: data.id,
                  operation: "Was read",
                  wasRead: true
                }));
              }
            }
          } else if (data.operation == 'typing') {
            if (_this2.props.otherUser == data.sender) {
              if (data.typing == true) {
                document.getElementsByClassName('typingDetection')[0].style.display = 'block';
              }

              if (data.typing == false) {
                document.getElementsByClassName('typingDetection')[0].style.display = 'none';
              }
            }
          }
        };
      };

      document.addEventListener("keydown", this.readKey);
      document.addEventListener("keyup", this.keyUp);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.otherUser !== prevProps.otherUser) {
        this.getMessages();
        document.getElementsByClassName('typingDetection')[0].style.display = 'none';
      }

      document.getElementsByClassName('messages')[0].scrollTop = document.getElementsByClassName('messages')[0].scrollHeight; //скролл сообщений в самый низ
    }
  }, {
    key: "readKey",
    value: function readKey(event) {
      var input = document.getElementById("messageInput");
      var svg = document.getElementsByTagName('svg')[0];
      input.focus();

      if (event.code == "Enter" && input.value != '') {
        event.preventDefault();
        this.sendMessage();
        svg.style.fill = '#3AB4A8';
      } else if (event.code == "Enter") {
        event.preventDefault();
        svg.style.fill = '#3AB4A8';
      }
    }
  }, {
    key: "keyUp",
    value: function keyUp(event) {
      if (event.code == "Enter") {
        document.getElementsByTagName('svg')[0].style.fill = '#A762E5';
      }
    }
  }, {
    key: "getMessages",
    value: function getMessages() {
      var _this3 = this;

      var destination = this.props.otherUser;
      tmpMessageList = [];
      document.cookie = "destination=".concat(destination);
      var wasRead = '';
      var messages = (0, _fetch.getData)('/messages').then(function (data) {
        if (data.response == "Empty") {
          _this3.setState({
            messages: _react["default"].createElement("div", {
              className: "messageCover"
            }, "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0430 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439")
          });
        } else {
          for (var key in data) {
            if (data[key].wasRead == false) {
              wasRead = 'message unread';

              if (data[key].sender != _this3.props.loginSplit) {
                (0, _fetch.postData)('/wasRead', {
                  id: data[key]._id
                });

                _this3.state.socket.send(JSON.stringify({
                  sender: data[key].sender,
                  reader: _this3.props.loginSplit,
                  id: data[key]._id,
                  operation: "Was read",
                  wasRead: false
                }));
              }
            } else wasRead = 'message';

            tmpMessageList.push(_react["default"].createElement("div", {
              key: data[key]._id,
              id: data[key]._id,
              className: wasRead
            }, _react["default"].createElement("div", {
              className: "messageUsername"
            }, data[key].sender), _react["default"].createElement("div", {
              className: "messageText"
            }, data[key].message)));
          }

          _this3.setState({
            messages: tmpMessageList
          });
        }
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage() {
      var _this4 = this;

      var messageText = document.getElementById('messageInput');
      var destination = this.props.otherUser;
      var id = "";
      var sendObj = {
        users: [this.props.loginSplit, destination],
        destination: destination,
        sender: this.props.loginSplit,
        messageText: messageText.value
      };

      if (this.props.otherUser != "" && messageText.value != "") {
        (0, _fetch.postData)('/sendMessage', sendObj).then(function (data) {
          id = data.id;
          tmpMessageList.push(_react["default"].createElement("div", {
            key: id,
            id: id,
            className: "message unread"
          }, _react["default"].createElement("div", {
            className: "messageUsername"
          }, _this4.props.loginSplit), _react["default"].createElement("div", {
            className: "messageText"
          }, messageText.value)));
          sendObj.operation = "Send message";
          sendObj.id = id;

          _this4.state.socket.send(JSON.stringify(sendObj));

          _this4.setState({
            messages: tmpMessageList,
            typing: false
          }, function () {
            document.getElementsByClassName('messages')[0].scrollTop = document.getElementsByClassName('messages')[0].scrollHeight; //скролл сообщений в самый низ

            messageText.value = '';
            var obj = {
              //Отправляем оповещение о конце набора сообщения вебсокету
              destination: _this4.props.otherUser,
              sender: _this4.props.loginSplit,
              operation: 'typing',
              typing: false
            };

            _this4.state.socket.send(JSON.stringify(obj));
          });
        });
      }
    }
  }, {
    key: "mouseOverSendButton",
    value: function mouseOverSendButton() {
      document.getElementById("messageInput").className = "messageInput_hover";
    }
  }, {
    key: "mouseOutSendButton",
    value: function mouseOutSendButton() {
      document.getElementById("messageInput").className = "messageInput";
    }
  }, {
    key: "typingDetection",
    value: function typingDetection() {
      var _this5 = this;

      //Отслеживает, пишет ли пользователь сообщение
      if (this.state.typing == false) {
        var obj = {
          destination: this.props.otherUser,
          sender: this.props.loginSplit,
          operation: 'typing',
          typing: true
        };
        this.setState({
          typing: true
        });
        this.state.socket.send(JSON.stringify(obj));
        setTimeout(function () {
          if (_this5.state.typing != false) {
            // Перепроверяем перед переключением, потому что может быть переключено в false после отправки сообщения
            _this5.setState({
              typing: false
            });

            obj.typing = false;

            _this5.state.socket.send(JSON.stringify(obj));
          }
        }, 3000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _React$createElement;

      return _react["default"].createElement("div", {
        className: "chat"
      }, _react["default"].createElement("div", {
        className: "chatHeadder"
      }, _react["default"].createElement("span", {
        className: "chatHeadderUser"
      }, this.props.otherUser), _react["default"].createElement("span", {
        className: "typingDetection"
      }, "\u043D\u0430\u0431\u0438\u0440\u0430\u0435\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435...")), _react["default"].createElement("div", {
        className: "messages"
      }, this.state.messages), _react["default"].createElement("div", {
        className: "messageSender"
      }, _react["default"].createElement("textarea", (_React$createElement = {
        name: "",
        id: "messageInput",
        cols: "60",
        rows: "2",
        className: "messageInput"
      }, _defineProperty(_React$createElement, "id", "messageInput"), _defineProperty(_React$createElement, "placeholder", "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435..."), _defineProperty(_React$createElement, "onInput", this.typingDetection), _React$createElement)), _react["default"].createElement("button", {
        className: "sendButton",
        onClick: this.sendMessage,
        onMouseOver: this.mouseOverSendButton,
        onMouseOut: this.mouseOutSendButton
      }, _react["default"].createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, _react["default"].createElement("path", {
        d: "M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
      })))), _react["default"].createElement(_popUpMessage.PopUpMessage, {
        sender: this.state.popUpSender,
        message: this.state.popUpMsg,
        userChange: this.props.userChange
      }));
    }
  }]);

  return Chat;
}(_react.Component);

exports.Chat = Chat;