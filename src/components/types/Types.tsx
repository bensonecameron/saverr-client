export type UserType = {
  firstName?: string;
  userName: string;
  collections?: [];
  posts?: PostType[];
  id?: number;
};

export type CollectionType = {
  nameOfCollection?: string;
  decriptionOfCollection?: string;
  impCollection?: boolean;
  userId?: number;
  id?: number;
  posts?: PostType[];
};
export type PostType = {
  titleOfPost?: string;
  descriptionOfPost?: string;
  url?: string;
  imgOfPost: string;
  impPost: boolean;
  userId?: number;
  id?: number;
  collections?: CollectionType;
};

interface ContentType {
  //may not use this one, stretch goal
  collection?: {};
  post?: {};
}
