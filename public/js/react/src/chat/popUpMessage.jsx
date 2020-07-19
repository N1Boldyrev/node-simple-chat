import React, { Component } from 'react';

export class PopUpMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: props.message,
            sender: props.sender,
            show: false
        }
        this.sender ='';
        this.message = '';
    }

    showPopUp(){
        let popUp = document.getElementById('popUp');
        this.sender = this.state.sender;
        this.message = this.state.message;
        popUp.style.opacity = 1;
        this.setState({show: true}, () => {
            let timer = setTimeout(() => {
                popUp.style.opacity = 0;
                this.setState({show: false}, () => clearTimeout(timer));
            }, 4000);
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.message !== prevProps.message || this.props.sender !== prevProps.sender){
            this.setState({
                message: this.props.message,
                sender: this.props.sender
            },() => {
                if(this.state.sender != '' && this.state.message != '' && prevProps.message !== this.props.message || prevProps.sender != this.props.sender){
                    if(this.state.show == false){
                     this.showPopUp();
                 }
                 else if(this.state.show == true){
                     setTimeout(() => {
                         this.showPopUp();
                     }, 3000);
                 }
                }       
            });
        }
    }

    render() {
        return (
             <div className="popUp" id = 'popUp' onClick = {() => this.props.userChange(this.sender)}>
                 <div className="popUp_newMessage">Новое сообщение от...</div>
                 <div className="popUpSender">
                    {this.sender}
                 </div>
                 <div className="popUpMessage">
                     {this.message}
                 </div>
             </div>
        );
    }
}
