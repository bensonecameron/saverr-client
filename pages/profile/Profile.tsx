import React from 'react';
import {UserType } from '../../components/types/Types';

type AcceptedProps = {
  clearToken: () => void
  sessionToken: string
}

type HomeState = {
  user: UserType
}

export default class Profile extends React.Component <AcceptedProps, HomeState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
        user: {
            firstName: '',
            lastName: '',
        }
    }
}

fetchUser() {
  let user = this.state.user;
  user.id = 0;
  this.setState({user: user})


  fetch('http://localhost:3001/user/', {
      method: 'get',
      headers: {
          'content-type': 'application/json',
          'authorization': this.props.sessionToken
      }
  })
      .then(res => res.json())
      .then(res => {
          console.log("res:", res);
          if (res.id) {
              this.setState({
                  user: {
                      firstName: res.firstName,
                      lastName: res.lastName,
                  }
              })
          }
      })
      .catch(err => {
          this.props.clearToken();
      })
}

componentWillMount() {
        
  this.fetchUser();
}

  render(){
    return (
      <div>
        <h2> {this.props.user.firstName} </h2>
        <fieldset>

        </fieldset>
      </div>
    )
  }  
}