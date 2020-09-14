import React from "react";
import { CollectionType } from "../types/Types";

interface AcceptedProps {
  fetchUser: () => void;
  collection: CollectionType;
  deleteCollection: (text: CollectionType) => void;
}

const CollectionItem: React.FC<AcceptedProps> = ({
  fetchUser,
  collection,
  deleteCollection,
}) => {
  const handleButtonClick = () => {
    deleteCollection(collection);
  };

  return (
    <li
      key={collection.nameOfCollection}
      className={`bg-white shadow-md flex border-r-4 justify-between p-2 my-2 ${
        collection.decriptionOfCollection
          ? "border-blue-600"
          : "border-blue-300"
      }`}
    >
      {collection.nameOfCollection}{" "}
      <span>{collection.decriptionOfCollection}</span>
      <i onClick={handleButtonClick} className="fas fa-trash"></i>
    </li>
  );
};

export default CollectionItem;
