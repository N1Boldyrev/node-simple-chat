let loginSplit = document.cookie.split(';');
loginSplit = loginSplit[0].split('=');
let tmpMessageList = [];

class Headder extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.signOut = this.signOut.bind(this);
        this.mouseOverHeadder = this.mouseOverHeadder.bind(this);
        this.mouseOutHeadder = this.mouseOutHeadder.bind(this);
    };

    signOut(){
        document.cookie = "login=";
        document.location.href = "/";
    }

    mouseOverHeadder(){
        document.getElementsByClassName('headder')[0].id = "headder_hover";
        document.getElementsByClassName('logo')[0].id = "logo_hover";
        document.getElementsByClassName('signOut')[0].id = "signOut_hover";
    }

    mouseOutHeadder(){
        document.getElementsByClassName('headder')[0].id = "headder";
        document.getElementsByClassName('logo')[0].id = "logo";
        document.getElementsByClassName('signOut')[0].id = "signOut";
    }
        
        render() {
            return (
                 <div className="headder" id = "headder">
                     <div className="logo" id = "logo" onMouseOver = {this.mouseOverHeadder} onMouseOut = {this.mouseOutHeadder}>MeChat</div>
                     <div className="username">{loginSplit[1]}</div>
                     <div className="signOut" onClick = {this.signOut} id="signOut" onMouseOver = {this.mouseOverHeadder} onMouseOut = {this.mouseOutHeadder}>
                         <button>Sign out</button>
                         </div>
                 </div>
            );
        }
};

class UsersLsit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:"", 
            activeUser: "",
            socket: new WebSocket('ws://localhost:3001')
        };

        this.getUsersList = this.getUsersList.bind(this);
    }

    componentDidMount(){
        let userList = [];
        let usersLogin =[];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                if(loginSplit[1] != data[key].login){
                userList.push(<div key = {data[key]._id} id = {data[key].login} onClick = {this.userChange.bind(this, data[key].login)} className = "user">
                    {data[key].login}
                    </div>);
                usersLogin.push(data[key].login);
                }
            }
            this.setState({list: userList});

            //Проверка на присутствие непрочитанных сообщений у пользователя
            let unread = postData('/findMessages', {login: loginSplit[1]})
            .then(data => {
                for(let key in data){
                    if(data[key].sender != loginSplit[1]){
                        let sender;
                        if(data[key].users[0] == loginSplit[1]){
                            sender = data[key].users[1];
                        }
                        else sender = data[key].users[0];
                    }
                    document.getElementById(sender).className = "user unread";
                }
            })
        });
    }

    getUsersList(){
        let userList = [];
        let usersLogin =[];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                if(loginSplit[1] != data[key].login){
                userList.push(<div key = {data[key]._id} id = {data[key].login} onClick = {this.userChange.bind(this, data[key].login)} className = "user">
                    {data[key].login}
                    </div>);
                usersLogin.push(data[key].login);
                }
            }
            this.setState({list: userList});
    })
}

    userChange(id){
        if(this.state.activeUser != ""){
            document.getElementById(this.state.activeUser).className = "User";
        }
            document.getElementById(id).className = "UserClicked";
            this.setState({activeUser: id});
    }

    render() {
        return (
            <div className = "content">
                 <div className="usersList">   
                   {this.state.list}
                </div>
                 <Chat otherUser = {this.state.activeUser}  socket = {this.state.socket} getUsersList = {this.getUsersList}/>
            </div>
        );
    }
}


class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages: <div className = "messageCover">The history of messages will be displayed here.</div>,
            destination:"",
            socket: props.socket,
            readable : [1, 2 , 3]
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.keyboardInput = this.keyboardInput.bind(this);
        this.mouseOverSendButton = this.mouseOverSendButton.bind(this);
        this.mouseOutSendButton = this.mouseOutSendButton.bind(this);
    }

    componentDidMount(){
        const messageTextArea = document.getElementById("messageInput");
        messageTextArea.addEventListener("keydown", this.keyboardInput);


        this.state.socket.onopen = () =>{
            this.state.socket.send(JSON.stringify({login: loginSplit[1], operation: "User connect"}));
            this.state.socket.onmessage = message => {
               let data = JSON.parse(message.data);
               if(data.operation == "Send message" && this.props.otherUser == data.sender){ //Если пользователь на странице диалога с отправителем сообщения
                    let newMessage = <div className = "message" key = {data.id} id = {data.id}>
                        <div className= "messageUsername">{data.sender}</div>
                        <div className="messageText">{data.message}</div>
               </div>;
                    tmpMessageList.push(newMessage);
                    
                    this.state.socket.send(JSON.stringify({
                        sender: loginSplit[1], reader: data.sender, id: data.id , operation: "Was read", wasRead: false
                    }));

                    this.setState({
                        messages: tmpMessageList
                    });
                    
               }

               else if(data.operation == "Send message" && this.props.otherUser != data.sender){
                   document.getElementById(data.sender).className = "user unread";
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
                    else if(data.wasRead == true){
                    }
                   }
               }
            };
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.otherUser !== prevProps.otherUser){
            this.getMessages();
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
                    this.setState({messages: <div className = "messageCover">The history of messages will be displayed here.</div>});
                }
                else{
                    for(let key in data){
                        if(data[key].wasRead == false){
                            wasRead = 'message unread';
                            if(data[key].sender != loginSplit[1]){
                                postData('/wasRead', {id: data[key]._id});
                                this.state.socket.send(JSON.stringify({
                                    sender: data[key].sender, reader: loginSplit[1],id: data[key]._id, operation: "Was read", wasRead: false
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
            users:[loginSplit[1], destination], 
            destination: destination, 
            sender: loginSplit[1], 
            messageText: messageText.value
        }
        postData('/sendMessage',sendObj).then(data =>{
            id = data.id;
            tmpMessageList.push(<div key = {id} id = {id} className = "message unread">
            <div className= "messageUsername">{loginSplit[1]}</div>
            <div className="messageText">{messageText.value}</div>
        </div>);

            sendObj.operation = "Send message";
            sendObj.id = id;
            this.state.socket.send(JSON.stringify(sendObj));

        this.setState({messages: tmpMessageList});
        messageText.value = '';
        })
        }

        keyboardInput(event){
            if(event.key == 'Enter' && this.props.otherUser != "" && document.getElementById("messageInput").value != '')
                this.sendMessage();
            else if(this.props.otherUser == "" && event.key == 'Enter'){
                document.getElementById('messageInput').value = '';
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
                <textarea name="" id="messageInput" cols="60" rows="2" className="messageInput" id ="messageInput" placeholder = "Write a message..."></textarea>
                <button className="sendButton" onClick = {this.sendMessage} onMouseOver = {this.mouseOverSendButton} onMouseOut = {this.mouseOutSendButton}>></button>
                 </div>
             </div>
        );
    }
}


ReactDOM.render(
    <div className = "wrapper">
        <Headder/>
        <UsersLsit/>
    </div>,
    document.getElementById("root")
);



