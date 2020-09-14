import React, { FormEvent } from "react";
import { CollectionType, PostType, UserType } from "../types/Types";
import { Link } from "react-router-dom";
import PostCreate from "./PostCreate";
import PostUpdate from "./PostUpdate";
import PostDelete from "./PostDelete";
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
  id: any;
  titleOfPost: string;
  descriptionOfPost: string;
  url?: string;
  imgOfPost: string;
  createPostModal: boolean;
  editModalOpen: boolean;
  deletePostOpen: boolean;
}

export default class PostIndex extends React.Component<
  AcceptedProps,
  PostState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      editModalOpen: false,
      deletePostOpen: false,
      createPostModal: false,
      id: 0,
      titleOfPost: "",
      descriptionOfPost: "",
      url: "",
      imgOfPost: "",
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3001/post/1`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDA5NDk1LCJleHAiOjE2MDAwOTU4OTV9.TtfpDNn1VzXdKBHWYHayOZ0K74pUt_5pJDq_yEhPJhY",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          id: res.id,
          titleOfPost: res.titleOFPost,
          descriptionOfPost: res.descriptionOfPost,
          url: res.url,
          imgOfPost: res.imgOfPost,
        });
        console.log("res.title", this.state.id);
        console.log("res.title", res.titleOfPost);
      });
  }

  addCollectionModal() {}

  handleSubmit() {}

  render() {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h2>Your Post</h2>
          </div>
        </div>
        <div className="container page">
          <Button
            color="info"
            id="togglebutton"
            onClick={() => {
              this.setState({
                createPostModal: !this.state.createPostModal,
              });
            }}
          >
            New Post
          </Button>
          <br></br>

          {this.state.createPostModal === true ? (
            <PostCreate
              fetchUser={() => this.props.fetchUser()}
              sessionToken={this.props.sessionToken}
            />
          ) : null}

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
                  <CardTitle>{this.props.user.posts[0].titleOfPost}</CardTitle>
                  <CardSubtitle>{this.props.user.posts[0].url}</CardSubtitle>
                  <CardText>
                    {this.props.user.posts[0].descriptionOfPost}
                  </CardText>
                  <Button
                    color="warning"
                    id="togglebutton"
                    onClick={() => {
                      this.setState({
                        editModalOpen: !this.state.editModalOpen,
                      });
                    }}
                  >
                    Edit Post
                  </Button>
                  <Button
                    className=" pull-xs-right"
                    color="danger"
                    id="togglebutton"
                    onClick={() => {
                      this.setState({
                        deletePostOpen: !this.state.deletePostOpen,
                      });
                    }}
                  >
                    Delete Post
                  </Button>
                </CardBody>
              </Card>
              <Row>
                {this.state.editModalOpen === true ? (
                  <PostUpdate
                    fetchUser={() => this.props.fetchUser()}
                    sessionToken={this.props.sessionToken}
                  />
                ) : null}
              </Row>
              <Row>
                {this.state.deletePostOpen === true ? (
                  <PostDelete
                    fetchUser={() => this.props.fetchUser()}
                    sessionToken={this.props.sessionToken}
                  />
                ) : null}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
