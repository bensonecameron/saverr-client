import React from "react";
import { PostType, UserType } from "../types/Types";
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

type AcceptedProps = {
  post: PostType[];
  user: UserType;
};

export default class PostCard extends React.Component<AcceptedProps> {
  displayPost() {
    return this.props.post.map((post, index) => {
      return (
        <Card>
          <CardImg
            top
            width="100%"
            src="data:image/png;base64,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"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
            <Button>Button</Button>
          </CardBody>
        </Card>
      );
    });
  }
  render() {
    return <div>{this.displayPost()}</div>;
  }
}