export type UserType = {
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  userName?: string,
}

export type CollectionType = {
  id?: number
  nameOfCollection: string,
  descriptionOfCollection: string,
  tagsOfCollection: string,
  impCollection: boolean,
  userId: number
}
export type PostType = {
  id?: number,
  titleOfPost: string,
  descriptionOfPost: string,
  url: string,
  imgOfPost: string,
  tagsOfPost: string,
  impPost: boolean,
  userId?: number,
  collectionID: number
  
}
export type ContentType = { //may not use this one, stretch goal 
  collection?: {},
  post?: {}
}

