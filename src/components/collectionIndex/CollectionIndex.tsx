import React, { FormEvent, useState } from "react";
import { CollectionType, UserType } from "../types/Types";
import CollectionCreate from "../saverrIndex/CollectionCreate";
import UpdateCollection from "../saverrIndex/UpdateCollection";
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
  collection: CollectionType;
  UpdateCollectionModalOpen: boolean;
};

class CollectionIndex extends React.Component<AcceptedProps, CollectionState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      UpdateCollectionModalOpen: false,
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDA5NDk1LCJleHAiOjE2MDAwOTU4OTV9.TtfpDNn1VzXdKBHWYHayOZ0K74pUt_5pJDq_yEhPJhY",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          collection: {
            nameOfCollection: res.nameOfCollection,
            decriptionOfCollection: res.descriptionOfCollection,
          },
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
      <div>
        <div>
          <div className="container page">
            <div className="">
              <h2></h2>
              <div>
                <h2> Add New Collection</h2>
                <Row>
                  <Button
                    id="togglebutton"
                    onClick={() => {
                      this.setState({
                        UpdateCollectionModalOpen: !this.state
                          .UpdateCollectionModalOpen,
                      });
                    }}
                  >
                    New Collection
                  </Button>
                </Row>
                <Row>
                  <Button color="primary" onClick={this.toggleModal.bind(this)}>
                    Open Modal
                  </Button>
                  <Modal isOpen={this.state.UpdateCollectionModalOpen}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>
                      Modal Title
                    </ModalHeader>
                    <ModalBody> blah blah blah</ModalBody>
                    <Button
                      color="secondary"
                      onClick={this.toggleModal.bind(this)}
                    >
                      Close Modal UpdateCollection
                    </Button>
                  </Modal>
                </Row>
                <UpdateCollection
                  user={this.props.user}
                  fetchUser={() => this.props.fetchUser()}
                  sessionToken={this.props.sessionToken}
                ></UpdateCollection>
                <Row>
                  {this.state.UpdateCollectionModalOpen === true ? (
                    //   ideally the collection create would appear in a modal

                    //   <Modal>
                    //                         <CollectionCreate
                    //     fetchUser={() => this.props.fetchUser()}
                    //     sessionToken={this.props.sessionToken}
                    //   />
                    // </Modal>
                    <CollectionCreate
                      fetchUser={() => this.props.fetchUser()}
                      sessionToken={this.props.sessionToken}
                    />
                  ) : null}
                </Row>
                {/* <CollectionCreate
                  fetchUser={() => this.props.fetchUser()}
                  sessionToken={this.props.sessionToken}
                /> */}
                <h2> ---------</h2>
                <div>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <CardTitle>Collection Title</CardTitle>
                          <CardText>Collection Description goes here</CardText>
                          <Button>Go</Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionIndex;
