import React, { FormEvent } from "react";
import sessionToken from "../Topbar";
import { CollectionType, UserType } from "../types/Types";
import { Link } from "react-router-dom";
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

type AcceptedProps = {
  sessionToken: string;
  user: UserType;
  collections: CollectionType[];

  fetchUser: () => void;
};

type CollectionState = {
  collection: CollectionType;
};

class CollectionIndex extends React.Component<AcceptedProps, CollectionState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      collection: {
        nameOfCollection: "",
        decriptionOfCollection: "",
      },
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3001/collection`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5NzQ4ODY4LCJleHAiOjE1OTk4MzUyNjh9.tDKlYGu_xWpDRX7QOu18rysDrAoYMBJPvXDRgawwhl4",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          collection: {
            nameOfCollection: res[0].nameOfCollection,
            decriptionOfCollection: res[0].descriptionOfCollection,
          },
        });
      });
  }
  render() {
    return (
      <div>
        <div>
          <div className="container page">
            <div className="">
              <h2></h2>
              <Row>
                <Col>
                  <Card>
                    <CardImg
                      top
                      width="286"
                      height="180"
                      src="{this.state.shop.title}"
                      alt="Your Post Needs An Image"
                    />
                    <CardBody>
                      <CardTitle>
                        {this.state.collection.nameOfCollection}
                      </CardTitle>
                      <CardText>
                        {this.state.collection.decriptionOfCollection}
                      </CardText>
                      <Button>Go</Button>
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

export default CollectionIndex;
