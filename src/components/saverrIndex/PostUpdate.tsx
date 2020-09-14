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
  id: any;
  titleOfPost: string;
  descriptionOfPost: string;
  url?: string;
  imgOfPost: string;
};

export default class PostCreate extends React.Component<
  AcceptedProps,
  NewCollectionInfo
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      id: 0,
      titleOfPost: "",
      descriptionOfPost: "",
      url: "",
      imgOfPost: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3001/post/${this.state.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAwMDA5NDk1LCJleHAiOjE2MDAwOTU4OTV9.TtfpDNn1VzXdKBHWYHayOZ0K74pUt_5pJDq_yEhPJhY",
      },
      body: JSON.stringify({
        id: this.state.id,
        titleOfPost: this.state.titleOfPost,
        descriptionOfPost: this.state.descriptionOfPost,
        url: this.state.url,
        imgOfPost: this.state.imgOfPost,
      }),
    }).then((res) => res.json());
  }

  render() {
    return (
      <div>
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
                placeholder="Post ID To Edit"
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
                placeholder="Title Of Post"
                value={this.state.titleOfPost}
                onChange={(e) => {
                  this.setState({ titleOfPost: e.target.value });
                }}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Post Description"
                value={this.state.descriptionOfPost}
                onChange={(e) => {
                  this.setState({
                    descriptionOfPost: e.target.value,
                  });
                }}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Post URL"
                value={this.state.url}
                onChange={(e) => {
                  this.setState({
                    url: e.target.value,
                  });
                }}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Post Image"
                value={this.state.imgOfPost}
                onChange={(e) => {
                  this.setState({
                    imgOfPost: e.target.value,
                  });
                }}
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
            >
              Update Post
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
