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
  id?: number;
  posts?: any;
}
export interface PostType {
  titleOfPost?: string;
  descriptionOfPost?: string;
  url?: string;
  imgOfPost?: string;
  impPost?: boolean;
  userId?: number;
  id?: number;
  collections?: any;
}

interface ContentType {
  //may not use this one, stretch goal
  collection?: {};
  post?: {};
  userId: number;
}
