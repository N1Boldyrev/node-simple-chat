let loginSplit = document.cookie.split('=');

class Headder extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };
        
        render() {
            return (
                 <div className="headder">
                     <div className="logo">MeChat</div>
                     <div className="username">{loginSplit[1]}</div>
                     <div className="signOut"><button>Sign out</button></div>
                 </div>
            );
        }
};

class UsersLsit extends React.Component{
    constructor(props){
        super(props);
        this.state = {list: "kal",suka: "fefeae"};
    }

    componentDidMount(){
        let userList = [];
        let users = getData('/UsersList')
        .then(data => {
            for(let key in data){
                userList.push(<div key = {data[key]._id}>{data[key].login}</div>);
                this.setState({list: userList});
            }
        });
    }

    render() {
        return (
            <div className="usersList">   
                   {this.state.list}
             </div>
        );
    }
}


ReactDOM.render(
    <div>
        <Headder/>
        <UsersLsit/>
    </div>,
    document.getElementById("root")
);

