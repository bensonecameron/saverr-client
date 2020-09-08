import React from "react";
import { PostType, UserType, CollectionType } from "../types/Types";
import Collection from "../../pages/collections/Collections";
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
} from "reactstrap";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  collection: CollectionType[];
  user: UserType;

  fetchUser: () => void;
};

type CollectionCardState = {
  collectionToEdit: CollectionType;
};

export default class CollectionCard extends React.Component<
  AcceptedProps,
  CollectionCardState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      collectionToEdit: {
        nameOfCollection: "",
        decriptionOfCollection: "",
        impCollection: false,
      },
    };
  }

  deleteCollection(collection: CollectionType) {
    fetch(`${APIURL}/collection/${collection.id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.props.fetchUser();
      });
  }

  updateCollection(collection: CollectionType) {
    fetch(`${APIURL}/collection/${collection.id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: this.props.sessionToken,
      },
      body: JSON.stringify({
        collection: this.state.collectionToEdit,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          collectionToEdit: {
            nameOfCollection: "",
            decriptionOfCollection: "",
            impCollection: false,
          },
        });
        this.props.fetchUser();
      });
  }

  setCollectionToEdit(collection: CollectionType) {
    this.setState({ collectionToEdit: collection });
  }

  render() {
    return <div id="CollectionDiv"></div>;
  }
}
