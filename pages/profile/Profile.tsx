import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { UserType } from "../../components/types/Types";
import Topbar from "../../components/Topbar";
import Profile from "../profile/Profile";
import PostIndex from "../../components/saverrIndex/PostIndex";
import APIURL from "../../helpers/environment";

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

    fetch(`${APIURL}/user/getuser`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log();
        if (res.id) {
          this.setState({
            user: {
              id: res.id,
              userName: res.userName,
              collections: res.collections,
              posts: res.posts,
            },
          });
          console.log("res:", res);
          console.log("collections:", res.collections);
        }
      })
      .catch((err) => {
        this.props.clearToken();
      });
  }

  componentWillMount() {
    this.fetchUser();
  }

  // trying to force push working to develop

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <BrowserRouter>
            <Switch>
              <Route exact path="/profile">
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
                  collections={this.state.user.collections || []}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
