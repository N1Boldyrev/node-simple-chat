import { Chat } from './chat.jsx';

export class UsersList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:"", 
            activeUser: "",
            socket: new WebSocket('ws://localhost:3001')
        };

        this.userChange = this.userChange.bind(this);
    }

    componentDidMount(){
        let userList = [];
        let usersLogin =[];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                if(this.props.loginSplit != data[key].login){
                userList.push(<div key = {data[key]._id} id = {data[key].login} onClick = {this.userChange.bind(this, data[key].login)} className = "user">
                    {data[key].login}
                    </div>);
                usersLogin.push(data[key].login);
                }
            }
            this.setState({list: userList});

            if(this.props.lastActiveUser != ''){ //При входе на страницу открывает последний диалог
               this.userChange(this.props.lastActiveUser);
            }

            //Проверка на присутствие непрочитанных сообщений у пользователя
            let unread = postData('/findMessages', {login: this.props.loginSplit})
            .then(data => {
                let sender = '';
                if(data.response != "Empty"){
                for(let key in data){
                    if(data[key].sender != this.props.loginSplit){
                        if(data[key].users[0] == this.props.loginSplit){
                            sender = data[key].users[1];
                        }
                        else sender = data[key].users[0];
                    }
                    document.getElementById(sender).className = "user unread";
                }
            }
            })
        });
    }

    getUsersList(){ //Получение зарегестрированных пользователей
        let userList = [];
        let usersLogin =[];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                if(this.props.loginSplit != data[key].login){
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
        if(this.state.activeUser != "" && id != ""){
            document.getElementById(this.state.activeUser).className = "User";
        }
            document.getElementById(id).className = "UserClicked";
            this.setState({activeUser: id});
            document.cookie=`lastActiveUser=${id}`;
    }

    render() {
        return (
            <div className = "content">
                 <div className="usersList">   
                   {this.state.list}
                </div>
                 <Chat loginSplit = {this.props.loginSplit} otherUser = {this.state.activeUser}  socket = {this.state.socket} userChange = {this.userChange}/>
            </div>
        );
    }
}
