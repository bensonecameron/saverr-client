import React, { FormEvent } from "react";
import { CollectionType, UserType } from "../types/Types";
import CollectionCreate from "../saverrIndex/CollectionCreate";
import UpdateCollection from "../saverrIndex/UpdateCollection";
import { Link } from "react-router-dom";
import Modal from "react-modal";
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
  modalOpen: boolean;
};

class CollectionIndex extends React.Component<AcceptedProps, CollectionState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      modalOpen: false,
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5ODI5MTIwLCJleHAiOjE1OTk5MTU1MjB9.s1Eqm9FmBJKXoce5NwHFNLHx-ZcDTC0UEBEpLZbwlY8",
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

  render() {
    return (
      <div>
        <div>
          <div className="container page">
            <div className="">
              <h2></h2>
              <div>
                <h2> Add New Collection</h2>
                <Button
                  id="togglebutton"
                  onClick={() => {
                    this.setState({ modalOpen: !this.state.modalOpen });
                  }}
                >
                  New Collection
                </Button>
                <UpdateCollection
                  user={this.props.user}
                  collection={this.props.user.collections}
                  fetchUser={() => this.props.fetchUser()}
                  sessionToken={this.props.sessionToken}
                ></UpdateCollection>
                <Row>
                  {this.state.modalOpen === true ? (
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
