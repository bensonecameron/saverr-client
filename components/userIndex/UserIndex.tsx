import React, {FormEvent} from 'react'
import sessionToken from '../Topbar'
import {UserType} from '../types/Types'
import {Link} from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Modal,
  Row,
  Col,
} from 'reactstrap'

type AcceptedProps = {
  sessionToken: string
}

type UserState = {
  user: UserType
}

export default class UserIndex extends React.Component<
  AcceptedProps,
  UserState
> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
      },
    }
  }

  fetchUser() {
    let user = this.state.user
    this.setState({user: user})

    fetch('http://localhost:3001/user/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res:', res)
        if (res.id) {
          this.setState({
            user: {
              firstName: res.user.firstName,
              lastName: res.user.lastName,
              email: res.user.email,
              userName: res.user.userName,
            },
          })
        }
      })
  }

  componentWillMount() {
    this.fetchUser()
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page"></div>
      </div>
    )
  }
}
