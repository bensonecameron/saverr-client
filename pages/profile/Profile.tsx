import React from 'react'
import {UserType} from '../../components/types/Types'
import Collections from '../collections/Collections'
import {NavLink, Link} from 'react-router-dom'
import Routes from '../../routes'

type AcceptedProps = {
  clearToken: () => void
  sessionToken: string
  updateToken: (newToken: string) => void
}

type HomeState = {
  user: UserType
}

type ViewState = {
  viewToggle: boolean
}

export default class Profile extends React.Component<
  AcceptedProps,
  HomeState,
  ViewState
> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state = {
      user: {
        firstName: '',
        lastName: '',
      },
    }
  }

  fetchUser() {
    let user = this.state.user
    user.id = 0
    this.setState({user: user})

    fetch('http://localhost:3001/user/', {
      method: 'get',
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
              firstName: res.firstName,
              lastName: res.lastName,
            },
          })
        }
      })
      .catch((err) => {
        this.props.clearToken()
      })
  }

  componentWillMount() {
    this.fetchUser()
  }

  render() {
    return (
      <div>
        <div className="container">
          <Routes
            sessionToken={this.props.sessionToken}
            updateToken={(newToken) => {
              this.props.updateToken(newToken)
            }}
          />
          <h2> User Name Here </h2>
          <Collections />
        </div>
      </div>
    )
  }
}
