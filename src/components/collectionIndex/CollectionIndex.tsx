import React, { FormEvent, useState } from "react";
import { CollectionType, UserType } from "../types/Types";
import StockPostImg from "../../assets/21948643.png";
import CollectionCreate from "../saverrIndex/CollectionCreate";
import UpdateCollection from "../saverrIndex/UpdateCollection";
import CollectionDelete from "../saverrIndex/CollectionDelete";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  Button,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
  CardSubtitle,
  CardText,
  ModalBody,
  Modal,
} from "reactstrap";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  user: UserType;
  collections: CollectionType[];

  fetchUser: () => void;
};

type CollectionState = {
  id: any;
  nameOfCollection: string;
  decriptionOfCollection: string;
  UpdateCollectionModalOpen: boolean;
  createCollectionModalOpen: boolean;
  editCollectionModalOpen: boolean;
  delteCollectionModalOpen: boolean;
};

class CollectionIndex extends React.Component<AcceptedProps, CollectionState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      UpdateCollectionModalOpen: false,
      createCollectionModalOpen: false,
      editCollectionModalOpen: false,
      delteCollectionModalOpen: false,
      id: 0,
      nameOfCollection: "",
      decriptionOfCollection: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/collection`, {
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
          nameOfCollection: res.nameOfCollection,
          decriptionOfCollection: res.descriptionOfCollection,
        });
        console.log("user id =", this.props.user.id);
      });
  }

  toggleModal() {
    this.setState({
      UpdateCollectionModalOpen: !this.state.UpdateCollectionModalOpen,
    });
  }

  render() {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h2>Your Collection</h2>
          </div>
        </div>
        <div className="container page">
          <Button
            color="info"
            onClick={() => {
              this.setState({
                createCollectionModalOpen: !this.state
                  .createCollectionModalOpen,
              });
            }}
          >
            Click Here To Create New Collection
          </Button>
          <br></br>
          {this.state.createCollectionModalOpen === true ? (
            <CollectionCreate
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
                  <CardTitle>
                    {this.props.user.collections[0].titleOfCollection}
                  </CardTitle>
                  <CardSubtitle>{this.props.user.posts[0].url}</CardSubtitle>
                  <CardText>
                    {this.props.user.collections[0].descriptionOfCollection}
                  </CardText>
                  <Button
                    color="warning"
                    id="togglebutton"
                    onClick={() => {
                      this.setState({
                        editCollectionModalOpen: !this.state
                          .editCollectionModalOpen,
                      });
                    }}
                  >
                    Edit Collection
                  </Button>
                  <Button
                    className=" pull-xs-right"
                    color="danger"
                    id="togglebutton"
                    onClick={() => {
                      this.setState({
                        delteCollectionModalOpen: !this.state
                          .delteCollectionModalOpen,
                      });
                    }}
                  >
                    Delete Collection
                  </Button>
                </CardBody>
              </Card>
              <Row>
                {this.state.editCollectionModalOpen === true ? (
                  <UpdateCollection
                    fetchUser={() => this.props.fetchUser()}
                    sessionToken={this.props.sessionToken}
                  />
                ) : null}
              </Row>
              <Row>
                {this.state.delteCollectionModalOpen === true ? (
                  <CollectionDelete
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

export default CollectionIndex;
