export interface UserType {
  firstName?: string;
  userName: string;
  collections?: any;
  posts?: any;
  id?: number;
}

export interface CollectionType {
  nameOfCollection?: string;
  decriptionOfCollection?: string;
  impCollection?: boolean;
  userId?: number;
  id?: any; // had to change this to any for "e.target.value" to work with put by id
  posts?: any;
}
export interface PostType {
  titleOfPost?: string;
  descriptionOfPost?: string;
  url?: string;
  imgOfPost?: string;
  impPost?: boolean;
  userId?: number;
  id?: any; // had to change this to any for "e.target.value" to work with put by id
  collections?: any;
}

interface ContentType {
  //may not use this one, stretch goal
  collection?: {};
  post?: {};
  userId: number;
}
