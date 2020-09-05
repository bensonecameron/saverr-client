import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from './pages/globalFeed/GlobalFeed'
import Auth from './pages/auth/Auth'
import {UserType, CollectionType, PostType} from './components/types/Types'
import Profile from './pages/profile/Profile'
import CollectionIndex from './components/collectionIndex/CollectionIndex'
import PostIndex from './components/postIndex/PostIndex'
import UserIndex from './components/userIndex/UserIndex'

type AcceptedProps = {
  updateToken: (newToken: string) => void
  sessionToken: string
}

/// adding development brach

export default class Routes extends React.Component<AcceptedProps> {
  render() {
    return (
      <Switch>
        <Route path="/" component={GlobalFeed} exact />
        <Route path="/login">
          <Auth updateToken={this.props.updateToken} />{' '}
        </Route>
        <Route path="/register">
          <Auth updateToken={this.props.updateToken} />
        </Route>
        <Route path="/profile/:slug" component={Profile} />
        <Route path="/collection-index" component={CollectionIndex} />
        <Route path="/post-index" component={PostIndex} />
        <Route path="/user-index" component={UserIndex} />
      </Switch>
    )
  }
}
