let loginSplit = document.cookie.split(';');
loginSplit = loginSplit[0].split('=');

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
            activeUser: ""
        };
    }

    componentDidMount(){
        let userList = [];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                if(loginSplit[1] != data[key].login){
                userList.push(<div key = {data[key]._id} id = {data[key].login} onClick = {this.userChange.bind(this, data[key].login)} className = "user">{data[key].login}</div>);
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
                 <Chat otherUser = {this.state.activeUser} />
            </div>
        );
    }
}


class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages: <div className = "messageCover">The history of messages will be displayed here.</div>,
            destination:""
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

   /* componentDidMount(){
        this.updateInterval = setInterval(() => {
            this.getMessages();
        }, 2500);
    }


    componentWillUnmount(){
        clearInterval(this.updateInterval);
    }
    */

    componentDidUpdate(prevProps){
        if(this.props.otherUser !== prevProps.otherUser){
            this.getMessages();
        }
    }

    getMessages(){
        let destination = this.props.otherUser;
            document.cookie = `destination=${destination}`;
            let messagesList = [];
            let messages = getData('/messages')
            .then(data =>{
                for(let key in data){
                    let classNameMessage = '';
                    if(data[key].wasRead == false && data[key].sender == loginSplit[1]){
                        classNameMessage = 'message unread';
                    }
                    else if(data[key].wasRead == false && data[key].sender != loginSplit[1]){
                        postData('/wasRead',{id: data[key]._id, sender: data[key].sender}).then(data => {
                            if(data.response == 'ok'){
                                this.getMessages();
                            }
                        });
                    }
                    else{
                        classNameMessage = 'message';
                    }
                messagesList.push(<div key = {data[key]._id} className = {classNameMessage}>
                    <div className= "messageUsername">{data[key].sender}</div>
                    <div className="messageText">{data[key].message}</div>
                </div>);
                }
                this.setState({messages: messagesList});
            });
    }


    sendMessage(){
        let messageText = document.getElementById('messageText');
        let destination = this.props.otherUser;
        if(destination != ''){
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

