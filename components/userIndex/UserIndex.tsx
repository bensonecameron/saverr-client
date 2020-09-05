import React, {FormEvent} from 'react';
import sessionToken from '../Topbar'
import { UserType } from '../types/Types';
import {Link} from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Button, Modal, Row, Col } from 'reactstrap';

type AcceptedProps = {
  post: UserType
  sessionToken: string
}

type UserProp = {
  sessionToken: string,

  user: {
    firstName?: string,
    lastName?: string,
    email?: string,
    userName?: string,
  }
}



export default class UserIndex extends React.Component <AcceptedProps, UserProp> {
  constructor(props: AcceptedProps){
    super(props)
    this.state = {
        sessionToken: this.props.sessionToken,
        user: {
            firstName: "",
            lastName: '',
            email: '',
            userName: '',
        }
    }
  }

  fetchUser () {
    let user = this.state.user
    this.setState({user: user})


    fetch('http://localhost:3001/user/', {
      method: 'GET',
      headers: {
        'content-type' : 'application/json',
        'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5MTc3MDc2LCJleHAiOjE1OTkyNjM0NzZ9.F0_W2zyHyws1qBXBMN2_5yt8mQcPz_YUB1Pwzf4DvaY"
      }
    })
    .then(res=>res.json())
    .then(res => {
      console.log("res:", res);
      if (res.id) {
        this.setState({
            user: {
              firstName: res.user.firstName,
              lastName: res.user.lastName,
              email: res.user.email,
              userName: res.user.userName
            }
        })
      }
    })
}

componentWillMount() {
        
  this.fetchUser();
}

render(){
  return (
    <div className="auth-page">
      <div className="container page">
        
      </div>
    </div>
    )
  
}  
}