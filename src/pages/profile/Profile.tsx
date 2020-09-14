import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { UserType } from "../../components/types/Types";
import Topbar from "../../components/Topbar";
import PostIndex from "../../components/saverrIndex/PostIndex";
import APIURL from "../../helpers/environment";
import UserIndex from "../../components/userIndex/UserIndex";
import { Modal, Row, Col, Card, Container, Button } from "reactstrap";
import CollectionIndex from "../../components/collectionIndex/CollectionIndex";

type AcceptedProps = {
  sessionToken: string;
  clearToken: () => void;
};

interface ProfileState {
  user: UserType;
  showCollections: boolean;
}

export default class Home extends React.Component<AcceptedProps, ProfileState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      showCollections: true,
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
            showCollections: true,
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

  render() {
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <h2>{this.state.user.userName}, here's your Saverrs'</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <BrowserRouter>
                  <Switch>
                    <Container>
                      <Button
                        outline
                        color="primary"
                        id="togglebutton"
                        onClick={() => {
                          this.setState({
                            showCollections: !this.state.showCollections,
                          });
                        }}
                      >
                        Toggle Post / Colelction
                      </Button>

                      {this.state.showCollections === false ? (
                        <PostIndex
                          user={this.state.user}
                          fetchUser={() => this.fetchUser()}
                          sessionToken={this.props.sessionToken}
                          collections={this.state.user.collections || []}
                        />
                      ) : (
                        <CollectionIndex
                          user={this.state.user}
                          fetchUser={() => this.fetchUser()}
                          sessionToken={this.props.sessionToken}
                          collections={this.state.user.collections || []}
                        />
                      )}
                    </Container>
                  </Switch>
                </BrowserRouter>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
