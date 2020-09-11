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
  Container,
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

class PostIndex extends React.Component<AcceptedProps, PostState> {
  constructor(props: AcceptedProps) {
    super(props);
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
                  New Post
                </Button>
                {/* <Row>
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
                </Row> */}
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
                          <CardTitle>Post Title</CardTitle>
                          <CardText>Post Description goes here</CardText>
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

export default PostIndex;
