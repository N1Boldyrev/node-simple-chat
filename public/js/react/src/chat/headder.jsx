export class Headder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hideUserList: true
        };

        this.signOut = this.signOut.bind(this);
        this.mouseOverHeadder = this.mouseOverHeadder.bind(this);
        this.mouseOutHeadder = this.mouseOutHeadder.bind(this);
        this.showUsersList = this.showUsersList.bind(this);
    };

    signOut(){
        document.cookie = "login=";
        document.cookie ="destination=";
        document.cookie ="lastActiveUser=";
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

    showUsersList(){
        let usersList = document.getElementsByClassName("usersList")[0];
        let chat = document.getElementsByClassName("chat")[0];
        if(this.state.hideUserList == true){
            chat.style.display = "none";
            usersList.style.display = "flex";
            this.setState({hideUserList: false});
        }
        else if(this.state.hideUserList == false){
            usersList.style.display = "none";
            chat.style.display = "inline";
            this.setState({hideUserList: true});
        }
    }
        
        render() {
            return (
                 <div className="headder" id = "headder">
                     <div className="showUserList"><button onClick = {this.showUsersList}>&#9881;</button></div>
                     <div className="logo" id = "logo" onMouseOver = {this.mouseOverHeadder} onMouseOut = {this.mouseOutHeadder}>MeChat</div>
                     <div className="username">{this.props.loginSplit}</div>
                     <div className="signOut" onClick = {this.signOut} id="signOut" onMouseOver = {this.mouseOverHeadder} onMouseOut = {this.mouseOutHeadder}>
                         <button>Выйти</button>
                         </div>
                 </div>
            );
        }
    };