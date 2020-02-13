class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            button_id : "signIn",
            logo_id: "logo"
        };

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }


    mouseOver(){
        this.setState({
            button_id : 'button_hover',
            logo_id: 'logo_hover'
        });
    };

    mouseOut(){
        this.setState({
            button_id: 'signIn',
            logo_id: 'logo'
        });
    };


    render() {
        return (
             <div id="loginForm">
                 <div className={this.state.logo_id}>MeChat</div>
                 <div id="login_text">Login</div>
                 <input type="text" name="" id="login" autoComplete = 'off'/>
                 <div id='password_text'>Password</div>
                 <input type="password" name="" id="password" autoComplete = 'off'/>
                 <br/>
                 <button className={this.state.button_id} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>Sign in</button>
             </div>
        );
    };
};

ReactDOM.render(
    <LoginScreen/>,document.getElementById('root'));