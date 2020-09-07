import React from "react";
import {
  PostType,
  UserType,
  CollectionType,
} from "../../components/types/Types";
import CollectionIndex from "../../components/collectionIndex/CollectionIndex";

type AcceptedProps = {
  sessionToken: string;
  user: UserType;
  fetchUser: () => void;
  deleteCollection: () => void;
  setCollectionToEdit: () => void;
};

export default class Collections extends React.Component<AcceptedProps> {
  render() {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h2>Collection Title</h2>
          </div>
        </div>
        <div className="container">
          <div className="row article-content">
            <div>
              <p>Collection body</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
