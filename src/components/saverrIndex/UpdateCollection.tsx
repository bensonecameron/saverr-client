import React, { FormEvent } from "react";
import { CollectionType, UserType } from "../types/Types";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

type AcceptedProps = {
  sessionToken: string;
  user: UserType;
  fetchUser: () => void;
};

type CollectionState = {
  collection: CollectionType;
  collectionDropdownOpen: boolean;
};

export default class UpdateCollection extends React.Component<
  AcceptedProps,
  CollectionState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      collectionDropdownOpen: false,
      collection: {
        id: 0,
        nameOfCollection: "",
        decriptionOfCollection: "",
      },
    };
  }

  handleCollectionEdit(e: FormEvent) {
    let collectionPutURL = `http://localhost:3001/collection/${this.state.collection.id}`;
    e.preventDefault();
    fetch("http://localhost:3001/collection/5", {
      method: "PUT",
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
            id: this.state.collection.id,
            nameOfCollection: this.state.collection.nameOfCollection,
            decriptionOfCollection: this.state.collection
              .decriptionOfCollection,
          },
        });
        console.log(
          "collection put state",
          this.state.collection.nameOfCollection,
          "description",
          this.state.collection.decriptionOfCollection
        );
        console.log("collection put URL", collectionPutURL);
        console.log("PUT res:", res);
      });
  }
  render() {
    return (
      <div>
        <div>
          <Form
            onSubmit={(e: FormEvent) => {
              this.handleCollectionEdit(e);
            }}
          >
            <FormGroup>
              <Label htmlFor="ID">ID:</Label>
              <Input
                name="id"
                value={this.state.collection.id}
                onChange={(e) => {
                  let collection = this.state.collection;
                  this.state.collection.id = e.target.value;
                  this.setState({ collection: collection });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Name:</Label>
              <Input
                name="name"
                value={this.state.collection.nameOfCollection}
                onChange={(e) => {
                  let collection = this.state.collection;
                  collection.nameOfCollection = e.target.value;
                  this.setState({ collection: collection });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">description:</Label>
              <Input
                name="description"
                value={this.state.collection.decriptionOfCollection}
                onChange={(e) => {
                  let collection = this.state.collection;
                  collection.decriptionOfCollection = e.target.value;
                  this.setState({ collection: collection });
                }}
                type="textarea"
                draggable="false"
                maxLength={250}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button id="updateButton" type="submit">
                UPDATE
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
