import React, { FormEvent } from "react";
import sessionToken from "../Topbar";
import { CollectionType, PostType, UserType } from "../types/Types";
import { Link } from "react-router-dom";
import PostCreate from "./PostCreate";
import StockPostImg from "../../assets/21948643.png";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  Button,
  Modal,
  Row,
  Col,
  CardSubtitle,
  CardText,
} from "reactstrap";
import APIURL from "../../helpers/environment";

interface AcceptedProps {
  sessionToken: string;
  user: UserType;
  collections: CollectionType[];

  fetchUser: () => void;
}

interface PostState {
  posts: PostType;
  modalOpen: boolean;
}

export default class PostIndex extends React.Component<
  AcceptedProps,
  PostState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      modalOpen: false,
      posts: {
        titleOfPost: "",
        descriptionOfPost: "",
        url: "",
        imgOfPost: "",
        collections: "",
      },
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3001/post`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5ODI5MTIwLCJleHAiOjE1OTk5MTU1MjB9.s1Eqm9FmBJKXoce5NwHFNLHx-ZcDTC0UEBEpLZbwlY8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          posts: {
            titleOfPost: res.titleOfPost,
            descriptionOfPost: res.descriptionOfPost,
            url: res.url,
            imgOfPost: res.imgOfPost,
            collections: res.collections,
          },
        });
        console.log("user id =", this.props.user.id);
      });
  }

  addCollectionModal() {}

  handleSubmit() {}

  render() {
    return (
      <div>
        <div className="container page">
          <div className="">
            <div>
              <h3>post me pleassssse</h3>
              <Button
                id="togglebutton"
                onClick={() => {
                  this.setState({ modalOpen: !this.state.modalOpen });
                }}
              >
                New Post
              </Button>
              <Row>
                {this.state.modalOpen === true ? (
                  //   ideally the collection create would appear in a modal

                  //   <Modal>
                  //                         <CollectionCreate
                  //     fetchUser={() => this.props.fetchUser()}
                  //     sessionToken={this.props.sessionToken}
                  //   />
                  // </Modal>
                  <PostCreate
                    fetchUser={() => this.props.fetchUser()}
                    sessionToken={this.props.sessionToken}
                  />
                ) : null}
              </Row>
              <Row>
                <Col>
                  <Card>
                    <CardImg
                      top
                      width="286"
                      height="180"
                      src={StockPostImg}
                      alt="Your Post Needs An Image"
                    />
                    <CardBody>
                      <CardTitle>
                        {this.props.user.posts[0].titleOfPost}
                      </CardTitle>
                      <CardSubtitle>
                        {this.props.user.posts[0].url}
                      </CardSubtitle>
                      <CardText>
                        {this.props.user.posts[0].descriptionOfPost}
                      </CardText>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
