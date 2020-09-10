import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { UserType } from "../../components/types/Types";
import Topbar from "../../components/Topbar";
import PostIndex from "../../components/saverrIndex/PostIndex";
import APIURL from "../../helpers/environment";
import UserIndex from "../../components/userIndex/UserIndex";
import { Modal, Row, Col, Card } from "reactstrap";
import CollectionIndex from "../../components/collectionIndex/CollectionIndex";

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
        collections: [{}],
        posts: [{}],
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
          // console.log("res.post", res.posts[3].descriptionOfPost);
          // console.log("collections:", res.collections);
          // console.log("drill to post", res.posts[3].id);
        }
      })
      .catch((err) => {
        this.props.clearToken();
      });
  }

  componentWillMount() {
    this.fetchUser();
  }

  PostMapp() {
    return this.state.user.posts[0].reverse().map((posts, index) => {
      return (
        <Card>
          <div>
            <h2>Heyy </h2>
          </div>
        </Card>
      );
    });
  }

  render() {
    return (
      <div className="container page">
        <div className="">
          <h2>{this.state.user.userName}</h2>
          <h3>{this.PostMapp}</h3>
          <BrowserRouter>
            <Switch>
              <Row>
                <Col>
                  <PostIndex
                    user={this.state.user}
                    fetchUser={() => this.fetchUser()}
                    sessionToken={this.props.sessionToken}
                    collections={this.state.user.collections || []}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CollectionIndex
                    user={this.state.user}
                    fetchUser={() => this.fetchUser()}
                    sessionToken={this.props.sessionToken}
                    collections={this.state.user.collections || []}
                  />
                </Col>
              </Row>
              {/* <Route exact path="/myposts">
                <PostIndex
                  user={this.state.user}
                  fetchUser={() => this.fetchUser()}
                  sessionToken={this.props.sessionToken}
                  collections={this.state.user.collections || []}
                />
              </Route> */}
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
