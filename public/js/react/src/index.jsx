class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            button_id : "signIn",
            logo_id: "logo"
        };

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.singUp = this.singUp.bind(this);
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


    singUp(){
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        if(login == '' || password == ''){
            let errorMsg = '';
            
            if(login == '' && password == ''){
                errorMsg = 'Login and password fields are empty';
                document.getElementById('login').className = 'wrongInput';
                document.getElementById('password').className = 'wrongInput';
            }
            else if(login == ''){
                errorMsg = 'Login field is epmpty or incorrect';
                document.getElementById('login').className = 'wrongInput';
        }
            else{ 
                errorMsg = 'Password field is empty or incorrect';
                document.getElementById('password').className = 'wrongInput';
        }

            document.getElementById('error').innerText = errorMsg;
            document.getElementById('error').hidden = false;
        }else{
            postData('/signUp', {login: login, password: password})
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(error));
        }
    }


    inputValChanged(id, classname){
        document.getElementById(id).className = classname;
    }


    render() {
        return (
             <div id="loginForm">
                 <div className={this.state.logo_id}>MeChat</div>
                 <div id="login_text">Login</div>
                 <input type="text" name="" id="login" autoComplete = 'off' className = 'login' onChange = {this.inputValChanged.bind(this,'login','login')}/>
                 <div id='password_text'>Password</div>
                 <input type="password" name="" id="password" autoComplete = 'off' className = 'password' onChange = {this.inputValChanged.bind(this,'password','password')}/>
                 <br/>
                 <button className={this.state.button_id} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>Sign in</button>
                 <div className="signUp"><a onClick = {this.singUp}>Sign up</a></div>
                 <div id="error" hidden = {true}></div>
             </div>
        );
    };
};

ReactDOM.render(
    <LoginScreen/>,document.getElementById('root'));