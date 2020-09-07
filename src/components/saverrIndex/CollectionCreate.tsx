import React, { FormEvent } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CollectionType } from "../types/Types";
import Collections from "../../pages/collections/Collections";

type AcceptedProps = {
  sessionToken: string;

  fetchUser: () => void;
};

type CollectionCreateState = {
  collections: CollectionType;
};

export default class CollectionCreate extends React.Component<
  AcceptedProps,
  CollectionCreateState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      collections: {
        nameOfCollection: "",
        decriptionOfCollection: "",
        impCollection: false,
        posts: [],
      },
    };
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/collection/new`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
      body: JSON.stringify({
        collections: this.state.collections,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          collections: {
            nameOfCollection: "",
            decriptionOfCollection: "",
            impCollection: false,
            posts: [],
          },
        });
        this.props.fetchUser();
      });
  }

  render() {
    return (
      <div className="newCollection">
        <Form
          onSubmit={(e: FormEvent) => {
            this.handleSubmit(e);
          }}
        >
          <h3 id="nd">New Collection</h3>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input
              name="title"
              value={this.state.collections.nameOfCollection}
              onChange={(e) => {
                let collections = this.state.collections;
                collections.nameOfCollection = e.target.value;
                this.setState({ collections: collections });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">
              Content: {this.state.collections.decriptionOfCollection}
            </Label>
            <Input
              name="content"
              value={this.state.collections.decriptionOfCollection}
              onChange={(e) => {
                let collections = this.state.collections;
                collections.decriptionOfCollection = e.target.value;
                this.setState({ collections: collections });
              }}
              type="textarea"
              draggable="false"
              maxLength={250}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Label htmlFor="impCollection">Important Collection?</Label>
              </Col>
              <Col>
                <Input
                  type="checkbox"
                  checked={this.state.collections.impCollection}
                  onChange={() => {
                    let collections = this.state.collections;
                    collections.impCollection = !collections.impCollection;
                    this.setState({ collections: collections });
                  }}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Button
              disabled={
                !this.state.collections.decriptionOfCollection &&
                !this.state.collections.nameOfCollection
              }
              type="submit"
              id="postButt"
            >
              POST Collection
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
