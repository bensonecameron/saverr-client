import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from "./pages/globalFeed/GlobalFeed"
import Auth from "./pages/auth/Auth"
import {UserType, CollectionType, PostType} from './components/types/Types'
import Profile from "./pages/profile/Profile"

type AcceptedProps = {
  updateToken: (newToken: string) => void
  
}

// update cameron branch

export default class Routes extends React.Component <AcceptedProps> {

  render(){
    return (
      <Switch>
        <Route path="/" component={GlobalFeed} exact/>
        <Route path="/login"><Auth updateToken={this.props.updateToken}/> </Route> 
        <Route path="/register"><Auth updateToken={this.props.updateToken}/></Route>
        <Route path="/profile/:slug"><Profile user={this.state.user}/> </Route> 
      </Switch>
    )
  }
}