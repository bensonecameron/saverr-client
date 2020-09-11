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
      titleOfPost: "",
      descriptionOfPost: "",
      url: "",
      imgOfPost: "",
    };
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch("http://localhost:3001/post/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
      body: JSON.stringify({
        titleOfPost: this.state.titleOfPost,
        descriptionOfPost: this.state.descriptionOfPost,
        url: this.state.url,
        imgOfPost: this.state.imgOfPost,
      }),
    }).then((res) => res.json());
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <form
                onSubmit={(e) => {
                  this.handleSubmit(e);
                }}
              >
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
                    Create Post
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
