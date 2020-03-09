"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var tmp_loginSplit = document.cookie.split(';');
var loginSplit = tmp_loginSplit[0].split('=');

if (loginSplit[0] != "login") {
  loginSplit = tmp_loginSplit[1].split('=');
}

var tmpMessageList = [];

var Headder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Headder, _React$Component);

  function Headder(props) {
    var _this;

    _classCallCheck(this, Headder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Headder).call(this, props));
    _this.state = {};
    _this.signOut = _this.signOut.bind(_assertThisInitialized(_this));
    _this.mouseOverHeadder = _this.mouseOverHeadder.bind(_assertThisInitialized(_this));
    _this.mouseOutHeadder = _this.mouseOutHeadder.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Headder, [{
    key: "signOut",
    value: function signOut() {
      document.cookie = "login=";
      document.cookie = "destination=";
      document.location.href = "/";
    }
  }, {
    key: "mouseOverHeadder",
    value: function mouseOverHeadder() {
      document.getElementsByClassName('headder')[0].id = "headder_hover";
      document.getElementsByClassName('logo')[0].id = "logo_hover";
      document.getElementsByClassName('signOut')[0].id = "signOut_hover";
    }
  }, {
    key: "mouseOutHeadder",
    value: function mouseOutHeadder() {
      document.getElementsByClassName('headder')[0].id = "headder";
      document.getElementsByClassName('logo')[0].id = "logo";
      document.getElementsByClassName('signOut')[0].id = "signOut";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "headder",
        id: "headder"
      }, React.createElement("div", {
        className: "logo",
        id: "logo",
        onMouseOver: this.mouseOverHeadder,
        onMouseOut: this.mouseOutHeadder
      }, "MeChat"), React.createElement("div", {
        className: "username"
      }, loginSplit[1]), React.createElement("div", {
        className: "signOut",
        onClick: this.signOut,
        id: "signOut",
        onMouseOver: this.mouseOverHeadder,
        onMouseOut: this.mouseOutHeadder
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
      list: "",
      activeUser: "",
      socket: new WebSocket('ws://localhost:3001')
    };
    _this2.getUsersList = _this2.getUsersList.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(UsersLsit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var userList = [];
      var usersLogin = [];
      var users = getData('/UsersList').then(function (data) {
        for (var key in data) {
          if (loginSplit[1] != data[key].login) {
            userList.push(React.createElement("div", {
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
        }); //Проверка на присутствие непрочитанных сообщений у пользователя


        var unread = postData('/findMessages', {
          login: loginSplit[1]
        }).then(function (data) {
          for (var _key in data) {
            if (data[_key].sender != loginSplit[1]) {
              var _sender = void 0;

              if (data[_key].users[0] == loginSplit[1]) {
                _sender = data[_key].users[1];
              } else _sender = data[_key].users[0];
            }

            document.getElementById(sender).className = "user unread";
          }
        });
      });
    }
  }, {
    key: "getUsersList",
    value: function getUsersList() {
      var _this4 = this;

      var userList = [];
      var usersLogin = [];
      var users = getData('/UsersList').then(function (data) {
        for (var key in data) {
          if (loginSplit[1] != data[key].login) {
            userList.push(React.createElement("div", {
              key: data[key]._id,
              id: data[key].login,
              onClick: _this4.userChange.bind(_this4, data[key].login),
              className: "user"
            }, data[key].login));
            usersLogin.push(data[key].login);
          }
        }

        _this4.setState({
          list: userList
        });
      });
    }
  }, {
    key: "userChange",
    value: function userChange(id) {
      if (this.state.activeUser != "") {
        document.getElementById(this.state.activeUser).className = "User";
      }

      document.getElementById(id).className = "UserClicked";
      this.setState({
        activeUser: id
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "content"
      }, React.createElement("div", {
        className: "usersList"
      }, this.state.list), React.createElement(Chat, {
        otherUser: this.state.activeUser,
        socket: this.state.socket,
        getUsersList: this.getUsersList
      }));
    }
  }]);

  return UsersLsit;
}(React.Component);

var Chat =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Chat, _React$Component3);

  function Chat(props) {
    var _this5;

    _classCallCheck(this, Chat);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Chat).call(this, props));
    _this5.state = {
      messages: React.createElement("div", {
        className: "messageCover"
      }, "The history of messages will be displayed here."),
      destination: "",
      socket: props.socket,
      readable: [1, 2, 3]
    };
    _this5.sendMessage = _this5.sendMessage.bind(_assertThisInitialized(_this5));
    _this5.keyboardInput = _this5.keyboardInput.bind(_assertThisInitialized(_this5));
    _this5.mouseOverSendButton = _this5.mouseOverSendButton.bind(_assertThisInitialized(_this5));
    _this5.mouseOutSendButton = _this5.mouseOutSendButton.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      var messageTextArea = document.getElementById("messageInput");
      messageTextArea.addEventListener("keydown", this.keyboardInput);

      this.state.socket.onopen = function () {
        _this6.state.socket.send(JSON.stringify({
          login: loginSplit[1],
          operation: "User connect"
        }));

        _this6.state.socket.onmessage = function (message) {
          var data = JSON.parse(message.data);

          if (data.operation == "Send message" && _this6.props.otherUser == data.sender) {
            //Если пользователь на странице диалога с отправителем сообщения
            var newMessage = React.createElement("div", {
              className: "message",
              key: data.id,
              id: data.id
            }, React.createElement("div", {
              className: "messageUsername"
            }, data.sender), React.createElement("div", {
              className: "messageText"
            }, data.message));
            tmpMessageList.push(newMessage);

            _this6.state.socket.send(JSON.stringify({
              sender: loginSplit[1],
              reader: data.sender,
              id: data.id,
              operation: "Was read",
              wasRead: false
            }));

            _this6.setState({
              messages: tmpMessageList
            });
          } else if (data.operation == "Send message" && _this6.props.otherUser != data.sender) {
            document.getElementById(data.sender).className = "user unread";
          } else if (data.operation == "New user") {
            _this6.props.getUsersList();
          } else if (data.operation == "Was read") {
            if (data.reader == _this6.props.otherUser) {
              document.getElementById(data.id).className = "message";

              if (data.wasRead == false) {
                _this6.state.socket.send(JSON.stringify({
                  sender: data.reader,
                  reader: data.sender,
                  id: data.id,
                  operation: "Was read",
                  wasRead: true
                }));
              } else if (data.wasRead == true) {}
            }
          }
        };
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.otherUser !== prevProps.otherUser) {
        this.getMessages();
      }
    }
  }, {
    key: "getMessages",
    value: function getMessages() {
      var _this7 = this;

      var destination = this.props.otherUser;
      tmpMessageList = [];
      document.cookie = "destination=".concat(destination);
      var wasRead = '';
      var messages = getData('/messages').then(function (data) {
        if (data.response == "Empty") {
          _this7.setState({
            messages: React.createElement("div", {
              className: "messageCover"
            }, "The history of messages will be displayed here.")
          });
        } else {
          for (var key in data) {
            if (data[key].wasRead == false) {
              wasRead = 'message unread';

              if (data[key].sender != loginSplit[1]) {
                postData('/wasRead', {
                  id: data[key]._id
                });

                _this7.state.socket.send(JSON.stringify({
                  sender: data[key].sender,
                  reader: loginSplit[1],
                  id: data[key]._id,
                  operation: "Was read",
                  wasRead: false
                }));
              }
            } else wasRead = 'message';

            tmpMessageList.push(React.createElement("div", {
              key: data[key]._id,
              id: data[key]._id,
              className: wasRead
            }, React.createElement("div", {
              className: "messageUsername"
            }, data[key].sender), React.createElement("div", {
              className: "messageText"
            }, data[key].message)));
          }

          _this7.setState({
            messages: tmpMessageList
          });
        }
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage() {
      var _this8 = this;

      var messageText = document.getElementById('messageInput');
      var destination = this.props.otherUser;
      var id = "";
      var sendObj = {
        users: [loginSplit[1], destination],
        destination: destination,
        sender: loginSplit[1],
        messageText: messageText.value
      };

      if (this.props.otherUser != "") {
        postData('/sendMessage', sendObj).then(function (data) {
          id = data.id;
          tmpMessageList.push(React.createElement("div", {
            key: id,
            id: id,
            className: "message unread"
          }, React.createElement("div", {
            className: "messageUsername"
          }, loginSplit[1]), React.createElement("div", {
            className: "messageText"
          }, messageText.value)));
          sendObj.operation = "Send message";
          sendObj.id = id;

          _this8.state.socket.send(JSON.stringify(sendObj));

          _this8.setState({
            messages: tmpMessageList
          });

          messageText.value = '';
        });
      }
    }
  }, {
    key: "keyboardInput",
    value: function keyboardInput(event) {
      if (event.key == 'Enter' && this.props.otherUser != "" && document.getElementById("messageInput").value != '') this.sendMessage();else if (this.props.otherUser == "" && event.key == 'Enter') {
        document.getElementById('messageInput').value = '';
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
    key: "render",
    value: function render() {
      var _React$createElement;

      return React.createElement("div", {
        className: "chat"
      }, React.createElement("div", {
        className: "messages"
      }, this.state.messages), React.createElement("div", {
        className: "messageSender"
      }, React.createElement("textarea", (_React$createElement = {
        name: "",
        id: "messageInput",
        cols: "60",
        rows: "2",
        className: "messageInput"
      }, _defineProperty(_React$createElement, "id", "messageInput"), _defineProperty(_React$createElement, "placeholder", "Write a message..."), _React$createElement)), React.createElement("button", {
        className: "sendButton",
        onClick: this.sendMessage,
        onMouseOver: this.mouseOverSendButton,
        onMouseOut: this.mouseOutSendButton
      }, ">")));
    }
  }]);

  return Chat;
}(React.Component);

ReactDOM.render(React.createElement("div", {
  className: "wrapper"
}, React.createElement(Headder, null), React.createElement(UsersLsit, null)), document.getElementById("root"));