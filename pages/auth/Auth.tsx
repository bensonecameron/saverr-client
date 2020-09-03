import React from 'react';
import Signup from './Signup';
import Login from './Login';


type AcceptedProps = {
  updateToken: (newToken: string) => void
}

type AuthState = {
    
  signupReqest: boolean
}

export default class Auth extends React.Component <AcceptedProps, AuthState> {
  constructor(props: AcceptedProps){
    super(props)
    this.state = {
        signupReqest: false
    }
    
}
  render(){
    return (
      <div className="">
        {this.state.signupReqest ? <Signup updateToken={this.props.updateToken}/> : <Login updateToken={this.props.updateToken}/>}
      </div>
    )
  }  
}