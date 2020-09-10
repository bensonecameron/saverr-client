import React, { FormEvent } from "react";
import sessionToken from "../Topbar";
import { CollectionType, PostType, UserType } from "../types/Types";
import { Link } from "react-router-dom";
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
}

export default class PostIndex extends React.Component<
  AcceptedProps,
  PostState
> {
  constructor(props: AcceptedProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container page">
          <div className="">
            <h3>---------</h3>
            <h3></h3>
            <h3>---------</h3>
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
                    <CardSubtitle>{this.props.user.posts[0].url}</CardSubtitle>
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
    );
  }
}
