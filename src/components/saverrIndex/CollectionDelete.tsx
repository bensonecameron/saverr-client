import React, { FormEvent } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CollectionType, PostType } from "../types/Types";
import Collections from "../../pages/collections/Collections";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  fetchUser: () => void;
};

type CollectionDelState = {
  id: any;
};

export default class CollectionDelete extends React.Component<
  AcceptedProps,
  CollectionDelState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      id: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/collection/${this.state.id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDA5NDk1LCJleHAiOjE2MDAwOTU4OTV9.TtfpDNn1VzXdKBHWYHayOZ0K74pUt_5pJDq_yEhPJhY",
      },
      body: JSON.stringify({
        id: this.state.id,
      }),
    }).then((res) => res.json());
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-4">
              <form
                onSubmit={(e) => {
                  this.handleSubmit(e);
                }}
              >
                <fieldset className="form-group">
                  <fieldset>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Post ID To Edit"
                      onChange={(e) => {
                        this.setState({ id: e.target.value });
                      }}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Delete Collection
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
