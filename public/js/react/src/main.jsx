let loginSplit = document.cookie.split(';');
loginSplit = loginSplit[0].split('=');
let tmpMessageList = [];

class Headder extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.signOut = this.signOut.bind(this);
    };

    signOut(){
        document.cookie = "login=";
        document.location.href = "/";
    }
        
        render() {
            return (
                 <div className="headder">
                     <div className="logo">MeChat</div>
                     <div className="username">{loginSplit[1]}</div>
                     <div className="signOut" onClick = {this.signOut}><button>Sign out</button></div>
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
    }

    componentDidMount(){
        let userList = [];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                if(loginSplit[1] != data[key].login){
                userList.push(<div key = {data[key]._id} id = {data[key].login} onClick = {this.userChange.bind(this, data[key].login)} className = "user">
                    {data[key].login}
                    </div>);
                }
            }
            this.setState({list: userList});
        });
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
                 <Chat otherUser = {this.state.activeUser}  socket = {this.state.socket}/>
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
            test: 0
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount(){
        this.state.socket.onopen = () =>{
            this.state.socket.send(JSON.stringify({login: loginSplit[1], operation: "User connect"}));
            this.state.socket.onmessage = message => {
               let data = JSON.parse(message.data);
               if(data.operation == "Send message" && this.props.otherUser == data.sender){ //Если пользователь на странице диалога с отправителем сообщения
                    let newMessage = <div className = "message" key = {Math.random()}>
                        <div className= "messageUsername">{data.sender}</div>
                        <div className="messageText">{data.message}</div>
                    </div>;
                    tmpMessageList.push(newMessage);
                    this.setState({
                        messages: tmpMessageList
                    });
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
            let messages = getData('/messages')
            .then(data =>{
                if(data.response == "Empty"){
                    this.setState({messages: <div className = "messageCover">The history of messages will be displayed here.</div>});
                }
                else{
                    for(let key in data){
                        tmpMessageList.push(<div key = {data[key]._id} className = "message">
                        <div className= "messageUsername">{data[key].sender}</div>
                        <div className="messageText">{data[key].message}</div>
                    </div>);
                    this.setState({
                        messages: tmpMessageList,
                    });
                    }
                }   
            });
    }


    sendMessage(){
        let messageText = document.getElementById('messageText');
        let destination = this.props.otherUser;
        if(destination != ''){
            this.state.socket.send(JSON.stringify({sender: loginSplit[1], destination: destination, operation: "Send message", message: messageText.value}));
            postData('/sendMessage', {messageText: messageText.value, destination: destination})
            .then(data => {
                    if(data.response == 'ok'){
                        messageText.value = '';
                        this.getMessages();
                    }
            });
        }
    }

    render() {
        return (
             <div className="chat">
                 <div className="messages">{this.state.messages}</div>
                 <div className="messageSender">
                <textarea name="" id="messageText" cols="60" rows="2" className="messageText"></textarea>
                <button className="sendButton" onClick = {this.sendMessage}>></button>
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

