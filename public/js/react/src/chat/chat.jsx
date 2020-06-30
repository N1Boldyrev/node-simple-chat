import React, { Component } from 'react';
import { PopUpMessage } from './popUpMessage.jsx';
import {postData, getData} from  '../../../fetch.js';

let tmpMessageList = [];

export class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: <div className = "messageCover">Здесь будет показана история сообщений</div>,
            destination:"",
            socket: props.socket,
            readable : [1, 2 , 3],
            popUpMsg: "",
            popUpSender:"",
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.mouseOverSendButton = this.mouseOverSendButton.bind(this);
        this.mouseOutSendButton = this.mouseOutSendButton.bind(this);
        this.readKey = this.readKey.bind(this);
    }

    componentDidMount(){
        this.state.socket.onopen = () =>{
            this.state.socket.send(JSON.stringify({login: this.props.loginSplit, operation: "User connect"}));
            this.state.socket.onmessage = message => {
               let data = JSON.parse(message.data);
               if(data.operation == "Send message" && this.props.otherUser == data.sender){ //Если пользователь на странице диалога с отправителем сообщения
                    let newMessage = <div className = "message" key = {data.id} id = {data.id}>
                        <div className= "messageUsername">{data.sender}</div>
                        <div className="messageText">{data.message}</div>
               </div>;
                    tmpMessageList.push(newMessage);
                    
                    this.state.socket.send(JSON.stringify({
                        sender: this.props.loginSplit, reader: data.sender, id: data.id , operation: "Was read", wasRead: false
                    }));

                    this.setState({
                        messages: tmpMessageList
                    });
                    
               }

               else if(data.operation == "Send message" && this.props.otherUser != data.sender){
                   document.getElementById(data.sender).className = "user unread";
                   this.setState({
                       popUpMsg: data.message,
                       popUpSender: data.sender
                   });
                   document.getElementById('messageSound').play();
               }

               else if(data.operation == "New user"){
                   this.props.getUsersList();
               }

               else if(data.operation == "Was read"){
                   if(data.reader == this.props.otherUser){
                       document.getElementById(data.id).className = "message";
                       if(data.wasRead == false){
                       this.state.socket.send(JSON.stringify({
                        sender: data.reader, reader: data.sender, id: data.id , operation: "Was read", wasRead: true
                    }));
                }
                   }
               }
            };
        }

        document.addEventListener("keydown", this.readKey);
        document.addEventListener("keyup", this.keyUp);
    }

    componentDidUpdate(prevProps){
        if(this.props.otherUser !== prevProps.otherUser){
            this.getMessages();
        }
        document.getElementsByClassName('messages')[0].scrollTop = document.getElementsByClassName('messages')[0].scrollHeight; //скролл сообщений в самый низ
    }

    readKey(event){
        let input = document.getElementById("messageInput");
        let button = document.getElementsByClassName('sendButton')[0];
        input.focus();
        if(event.code == "Enter" && input.value != ''){
            event.preventDefault();
            this.sendMessage();
            button.style.background = '#3AB4A8';
        }
        else if(event.code == "Enter"){
            event.preventDefault();
            button.style.background = '#3AB4A8';
        }
    }

    keyUp(event){
        if(event.code == "Enter"){
            document.getElementsByClassName('sendButton')[0].style.background = '#A762E5';
        }
    }

    getMessages(){
            let destination = this.props.otherUser;
            tmpMessageList = [];
            document.cookie = `destination=${destination}`;
            let wasRead = '';
            let messages = getData('/messages')
            .then(data =>{
                if(data.response == "Empty"){
                    this.setState({messages: <div className = "messageCover">Здесь будет показана история сообщений</div>});
                }
                else{
                    for(let key in data){
                        if(data[key].wasRead == false){
                            wasRead = 'message unread';
                            if(data[key].sender != this.props.loginSplit){
                                postData('/wasRead', {id: data[key]._id});
                                this.state.socket.send(JSON.stringify({
                                    sender: data[key].sender, reader: this.props.loginSplit,id: data[key]._id, operation: "Was read", wasRead: false
                                }));
                            }
                        }
                        else
                            wasRead = 'message';

                        tmpMessageList.push(<div key = {data[key]._id} id = {data[key]._id} className = {wasRead}>
                        <div className= "messageUsername">{data[key].sender}</div>
                        <div className="messageText">{data[key].message}</div>
                    </div>);
                    }
                    this.setState({
                        messages: tmpMessageList,
                    });
                }   
            });
    }


    sendMessage(){
        let messageText = document.getElementById('messageInput');
        let destination = this.props.otherUser;
        let id = "";
        let sendObj = {
            users:[this.props.loginSplit, destination], 
            destination: destination, 
            sender: this.props.loginSplit, 
            messageText: messageText.value
        }
        if(this.props.otherUser != "" && messageText.value != ""){
        
        postData('/sendMessage',sendObj).then(data =>{
            id = data.id;
            tmpMessageList.push(<div key = {id} id = {id} className = "message unread">
            <div className= "messageUsername">{this.props.loginSplit}</div>
            <div className="messageText">{messageText.value}</div>
        </div>);

            sendObj.operation = "Send message";
            sendObj.id = id;
            this.state.socket.send(JSON.stringify(sendObj));


        this.setState({messages: tmpMessageList}, () =>{
            document.getElementsByClassName('messages')[0].scrollTop = document.getElementsByClassName('messages')[0].scrollHeight; //скролл сообщений в самый низ
            messageText.value = '';
        });
        })
        }
    }


        mouseOverSendButton(){
            document.getElementById("messageInput").className = "messageInput_hover";
        }
        mouseOutSendButton(){
            document.getElementById("messageInput").className ="messageInput";
        }

    render() {
        return (
             <div className="chat">
                 <div className="messages">{this.state.messages}</div>
                 <div className="messageSender">
                <textarea name="" id="messageInput" cols="60" rows="2" className="messageInput" id ="messageInput" placeholder = "Напишите сообщение..."></textarea>
                <button className="sendButton" onClick = {this.sendMessage} onMouseOver = {this.mouseOverSendButton} onMouseOut = {this.mouseOutSendButton}>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
                
                </button>
                 </div>
                 <PopUpMessage sender = {this.state.popUpSender} message = {this.state.popUpMsg} userChange = {this.props.userChange}/>
             </div>
        );
    }
}
