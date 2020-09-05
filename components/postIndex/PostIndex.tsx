import React, {FormEvent} from 'react';
import sessionToken from '../Topbar'
import { PostType } from '../types/Types';
import {Link} from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Button, Modal, Row, Col } from 'reactstrap';

type AcceptedProps = {
  sessionToken: string
  post: PostType
}

type PostProp = {
  post: {
    titleOfPost: string,
    descriptionOfPost: string,
    url: string,
    imgOfPost: string,
    tagsOfPost: string,
    impPost: boolean,
    collectionID: number
  }
}



export default class PostIndex extends React.Component <AcceptedProps, PostProp> {
  constructor(props: AcceptedProps){
    super(props)
    this.state = {
        post: {
            titleOfPost: "",
            descriptionOfPost: '',
            url: '',
            imgOfPost: '',
            tagsOfPost: '',
            impPost: false,
            collectionID: 0
        }
    }
  }

  fetchPost () {
    let post = this.state.post
    this.setState({post: post})


    fetch('http://localhost:3001/post/', {
      method: 'GET',
      headers: {
        'content-type' : 'application/json',
        'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5MTc3MDc2LCJleHAiOjE1OTkyNjM0NzZ9.F0_W2zyHyws1qBXBMN2_5yt8mQcPz_YUB1Pwzf4DvaY"
      }
    })
    .then(res=>res.json())
    .then(res => {
      console.log("res:", res);
      if (res.id) {
        this.setState({
            post: {
              titleOfPost: res.titleOfPost,
              descriptionOfPost: res.descriptionOfPost,
              url: res.url,
              imgOfPost: res.imgOfPost,
              tagsOfPost: res.tagsOfPost,
              impPost: res.impPost,
              collectionID: res.collectionID
            }
        })
      }
    })
}

componentWillMount() {
        
  this.fetchPost();
}

render(){
  return (
    <div className="auth-page">
      <div className="container page">
        
      </div>
    </div>
    )
  
}  
}