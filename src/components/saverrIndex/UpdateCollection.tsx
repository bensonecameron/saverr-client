import React, { FormEvent } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CollectionType, PostType } from "../types/Types";
import Collections from "../../pages/collections/Collections";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  fetchUser: () => void;
};

type NewCollectionInfo = {
  id: any; // i had to use any here so that the e.target value would accept the intial state of "0"
  nameOfCollection: string;
  descriptionOfCollection: string;
};

export default class UpdateCollection extends React.Component<
  AcceptedProps,
  NewCollectionInfo
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      id: 0,
      nameOfCollection: "",
      descriptionOfCollection: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/collection/${this.state.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDA5NDk1LCJleHAiOjE2MDAwOTU4OTV9.TtfpDNn1VzXdKBHWYHayOZ0K74pUt_5pJDq_yEhPJhY",
      },
      body: JSON.stringify({
        id: this.state.id,
        nameOfCollection: this.state.nameOfCollection,
        descriptionOfCollection: this.state.descriptionOfCollection,
      }),
    }).then((res) => res.json());
    console.log("update collection URL:", this.state.id);
  }

  render() {
    return (
      <div className="auth-page">
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <fieldset>
            <fieldset>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Collection ID To Edit"
                onChange={(e) => {
                  this.setState({ id: e.target.value });
                }}
              />
            </fieldset>
          </fieldset>
          <fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Collection Name"
                value={this.state.nameOfCollection}
                onChange={(e) => {
                  this.setState({ nameOfCollection: e.target.value });
                }}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Collection Description"
                value={this.state.descriptionOfCollection}
                onChange={(e) => {
                  this.setState({
                    descriptionOfCollection: e.target.value,
                  });
                }}
              />
            </fieldset>
            <button color="warning" className=" pull-xs-right" type="submit">
              Update Collection
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
