import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Routes from './routes'
import Topbar from './components/Topbar'
import Profile from './pages/profile/Profile';

type AuthState = {
  sessionToken: string,
  isAdmin?: boolean
}

export default class App extends React.Component<{}, AuthState> {
  constructor(props: string) {
    super(props)
    this.state = {
      sessionToken: "",
      isAdmin: false
    }
  }
  
    componentWillMount() {
      if(localStorage.getItem('setSessionToken')) {
        let token: string | null = localStorage.getItem('setSessionToken')
        this.setState({sessionToken: token != null ? token : ""});
        console.log("sessionToken:", localStorage.getItem('setSessionToken'));
      }
  
    }
  
    updateToken(newToken: string) {
      localStorage.setItem('token: ', newToken);
      this.setState({sessionToken: newToken})
    }
  
    clearToken() {
      localStorage.clear();
      this.setState({sessionToken: ""});
    }

  render(){
    return (
      <div className="App">
        <Router>
          <Topbar clearToken={() => this.clearToken()} sessionToken={this.state.sessionToken} />
          {this.state.sessionToken !== "" ? <Profile sessionToken={this.state.sessionToken} clearToken={() => this.clearToken()}/> : <Routes updateToken={(newToken)=>{this.updateToken(newToken)}}/>}
        </Router>
      </div>
    )
  }  
}