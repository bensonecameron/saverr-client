import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { CollectionType, UserType } from "../../components/types/Types";
import Topbar from "../../components/Topbar";
import Profile from "../profile/Profile";
import User from "./User";
import PostIndex from "../../components/saverrIndex/PostIndex";
import { timeStamp } from "console";
import { userInfo } from "os";

type AcceptedProps = {
  sessionToken: string;
  clearToken: () => void;
};

interface ProfileState {
  user: UserType;
}

export default class Home extends React.Component<AcceptedProps, ProfileState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      user: {
        id: 0,
        userName: "",
        collections: [],
        posts: [],
      },
    };
  }

  fetchUser() {
    let user = this.state.user;
    user.id = 0;
    this.setState({ user: user });

    fetch(`http://localhost:3001/user/getuser`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res:", res);
        if (res.id) {
          this.setState({
            user: {
              id: res.id,
              userName: res.userName,
              collections: res.collections,
              posts: res.post,
            },
          });
        }
      })
      .catch((err) => {
        this.props.clearToken();
      });
  }

  componentWillMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <BrowserRouter>
            <Topbar clearToken={() => this.props.clearToken()} />
            {this.state.user.id !== 0 ? (
              <Switch>
                <Route exact path="/">
                  <Profile
                    clearToken={() => {
                      this.props.clearToken();
                    }}
                    sessionToken={this.props.sessionToken}
                  />
                </Route>
                <Route exact path="/myposts">
                  <PostIndex
                    user={this.state.user}
                    fetchUser={() => this.fetchUser()}
                    sessionToken={this.props.sessionToken}
                    collections={this.state.user.collections}
                  />
                </Route>
              </Switch>
            ) : null}
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
