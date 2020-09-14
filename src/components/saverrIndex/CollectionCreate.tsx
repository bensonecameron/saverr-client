import React, { FormEvent } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CollectionType } from "../types/Types";
import Collections from "../../pages/collections/Collections";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;

  fetchUser: () => void;
};

type NewCollectionInfo = {
  nameOfCollection: string;
  descriptionOfCollection: string;
};

export default class CollectionCreate extends React.Component<
  AcceptedProps,
  NewCollectionInfo
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      nameOfCollection: "",
      descriptionOfCollection: "",
    };
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch("http://localhost:3001/collection/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDA5NDk1LCJleHAiOjE2MDAwOTU4OTV9.TtfpDNn1VzXdKBHWYHayOZ0K74pUt_5pJDq_yEhPJhY",
      },
      body: JSON.stringify({
        nameOfCollection: this.state.nameOfCollection,
        descriptionOfCollection: this.state.descriptionOfCollection,
      }),
    }).then((res) => res.json());
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
                type="text"
                className="form-control form-control-lg"
                placeholder="Title Of Collection"
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
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
            >
              Create Collection
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
