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
} from "reactstrap";

type AcceptedProps = {
  sessionToken: string;
  collection: CollectionType;
  user: UserType;
  fetchUser: () => void;
};

type CollectionState = {
  collectionToEdit: CollectionType;
};

export default class UpdateCollection extends React.Component<
  AcceptedProps,
  CollectionState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      collectionToEdit: {
        id: 0,
        nameOfCollection: "",
        decriptionOfCollection: "",
      },
    };
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/collection/${this.props.collection.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        collectionToEdit: {
          nameOfCollection: this.state.collectionToEdit.nameOfCollection,
          decriptionOfCollection: this.state.collectionToEdit
            .decriptionOfCollection,
        },
      }),
    }).then((res) => res.json());
  }

  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <Button
          // onClick={() => {
          //   this.state.collectionToEdit({
          //     nameOfCollection: "",
          //     decriptionOfCollection: "",
          //   });
          // }}
          >
            CANCEL
          </Button>
          <ModalBody>
            <Form
              onSubmit={(e: FormEvent) => {
                this.handleSubmit(e);
              }}
            >
              <h3 id="update">Update Collection</h3>
              <FormGroup>
                <Label htmlFor="name">Name:</Label>
                <Input
                  name="name"
                  value={this.state.collectionToEdit.nameOfCollection}
                  onChange={(e) => {
                    let collection = this.state.collectionToEdit;
                    collection.nameOfCollection = e.target.value;
                    this.setState({ collectionToEdit: collection });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">description:</Label>
                <Input
                  name="description"
                  value={this.state.collectionToEdit.nameOfCollection}
                  onChange={(e) => {
                    let collection = this.state.collectionToEdit;
                    collection.decriptionOfCollection = e.target.value;
                    this.setState({ collectionToEdit: collection });
                  }}
                  type="textarea"
                  draggable="false"
                  maxLength={250}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Button
                  id="updateButton"
                  disabled={
                    !this.state.collectionToEdit.decriptionOfCollection &&
                    !this.state.collectionToEdit.decriptionOfCollection
                  }
                  type="submit"
                >
                  UPDATE
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
