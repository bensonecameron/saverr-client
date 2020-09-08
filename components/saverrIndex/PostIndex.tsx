import React, { FormEvent } from "react";
import sessionToken from "../Topbar";
import { CollectionType, PostType, UserType } from "../types/Types";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Modal,
  Row,
  Col,
} from "reactstrap";
import APIURL from "../../helpers/environment";

interface AcceptedProps {
  sessionToken: string;
  user: UserType;
  collections: CollectionType[];

  fetchUser: () => void;
}

interface PostState {
  post: PostType;
}

export default class PostIndex extends React.Component<
  AcceptedProps,
  PostState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      post: {
        titleOfPost: "",
        descriptionOfPost: "",
        url: "",
        imgOfPost: "",
        impPost: false,
      },
    };
  }

  fetchPost() {
    let post = this.state.post;
    this.setState({ post: post });

    fetch(`${APIURL}/post/`, {
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
            post: {
              titleOfPost: res.titleOfPost,
              descriptionOfPost: res.descriptionOfPost,
              url: res.url,
              imgOfPost: res.imgOfPost,
              impPost: res.impPost,
            },
          });
        }
      });
  }

  componentWillMount() {
    this.fetchPost();
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <Row></Row>

          <Row></Row>
        </div>
      </div>
    );
  }
}
