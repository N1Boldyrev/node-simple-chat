import { Headder } from './headder.jsx';
import { UsersList } from './usersList.jsx';

function Audio(props){
    return(
        <audio src="messageSound.mp3" id = 'messageSound'></audio>
    )
}

class Wrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginSplit: '',
            lastActiveUser: '',
        }
    }

    componentDidMount(){ //Разбираем куки
    let tmp_loginSplit = document.cookie.split(';');
    let loginSplit = '';
    let lastActiveUser = '';

    for(let i = 0; i < tmp_loginSplit.length; i++){
        let tmp = tmp_loginSplit[i].split('=');
        if(tmp[0] == 'login' || tmp[0] == ' login'){
            loginSplit = tmp[1];
        }
        if(tmp[0] == 'lastActiveUser' || tmp[0] == ' lastActiveUser' && tmp[1] != '')
            lastActiveUser = tmp[1];
    }
    this.setState({lastActiveUser: lastActiveUser, loginSplit: loginSplit});
    }

    render() {
        return (
             <div className="wrapper">
                <Audio/>
                <Headder loginSplit = {this.state.loginSplit}/>
                <UsersList lastActiveUser = {this.state.lastActiveUser} loginSplit = {this.state.loginSplit}/>
             </div>
        );
    }
}

ReactDOM.render(
    <Wrapper/>, document.getElementById('root')
);