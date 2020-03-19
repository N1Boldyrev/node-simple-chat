class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            button_id : "signIn",
            logo_id: "logo",
            form_id: "loginForm",
            socket: new WebSocket('ws://localhost:3001'),
            socketOpen: false
        };

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }


    componentDidMount(){
        this.state.socket.onopen = () =>{
            this.setState({socketOpen: true});
        }
    }

    mouseOver(){
        this.setState({
            button_id : 'button_hover',
            logo_id: 'logo_hover',
            form_id: "loginForm_hover"
        });
    };

    mouseOut(){
        this.setState({
            button_id: 'signIn',
            logo_id: 'logo',
            form_id: "loginForm"
        });
    };


    fieldsFill(login, password, message){
            if(login.value == '' || password.value == ''){
                let errorMsg = '';

                if(login.value == '' && password.value == ''){
                    errorMsg = 'Login and password fields are empty';
                    login.className = 'wrongInput';
                    password.className = 'wrongInput';
                }
                else if(login.value == ''){
                    errorMsg = 'Login field is epmpty or incorrect';
                    login.className = 'wrongInput';
            }
                else{ 
                    errorMsg = 'Password field is empty or incorrect';
                    password.className = 'wrongInput';
            }

                message.innerText = errorMsg;
                message.className = "errorMessage";
                message.style.opacity = 1;
                return false;
            }
                else return true;
    }

    signUp(){
        let login = document.getElementById('login');
        let password = document.getElementById('password');
        let message = document.getElementById('message');
        if(this.fieldsFill(login, password, message) == true)
        {
            postData('/signUp', {login: login.value, password: password.value})
            .then(data => {
                if(data.status == "already exists"){
                    message.className = "errorMessage";
                    message.style.opacity = 1;
                    message.innerText = 'User already exist';
                    login.className = 'wrongInput';
                    password.className = 'wrongInput';
                }
                else if(data.status == 'ok'){
                    message.className = "successMessage";
                    message.style.opacity = 1;
                    message.innerText = 'You was rigistrated, try to sign in';
                }
                else throw new Error("Server error");
                login.value = '';
                password.value = '';

                if(this.state.socketOpen == true){
                    this.state.socket.send(JSON.stringify({operation: "New user"}));
                }
            })
            .catch(error => console.log(error));
        }
    }

    signIn(){
        let login = document.getElementById('login');
        let password = document.getElementById('password');
        let message = document.getElementById('message');
        if(this.fieldsFill(login, password, message) == true){
            postData('/signIn', {login: login.value, password: password.value})
            .then(data => {
                if(data.validation == false){
                    message.style.opacity = 1;
                    message.className = "errorMessage";
                    message.innerText = 'Invalid Login or Password';
                    login.value = '';
                    password.value = '';
                }else{
                    document.location.href = '/';
                }
            })
        }


        
    }

    inputValChanged(id, classname){
        document.getElementById(id).className = classname;
    }


    render() {
        return (
             <div id={this.state.form_id}>
                 <div className={this.state.logo_id}>MeChat</div>
                 <div id="login_text">Login</div>
                 <input type="text" name="" id="login" autoComplete = 'off' className = 'login' onChange = {this.inputValChanged.bind(this,'login','login')}/>
                 <div id='password_text'>Password</div>
                 <input type="password" name="" id="password" autoComplete = 'off' className = 'password' onChange = {this.inputValChanged.bind(this,'password','password')}/>
                 <br/>
                 <button className={this.state.button_id} onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut} onClick = {this.signIn}>Sign in</button>
                 <div className="signUp"><a onClick = {this.signUp}>Sign up</a></div>
                 <div id="message" className = "errorMessage">ERROR MSG HERE</div>
             </div>
        );
    };
};

ReactDOM.render(
    <LoginScreen/>,document.getElementById('root'));