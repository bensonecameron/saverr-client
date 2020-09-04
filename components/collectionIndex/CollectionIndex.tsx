import React, {FormEvent} from 'react';
import sessionToken from '../Topbar'
import { CollectionType } from '../types/Types';
import {Link} from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Button, Modal, Row, Col } from 'reactstrap';

type AcceptedProps = {
  sessionToken: string
  collection: CollectionType
}

type CollectionProp = {
  collection: {
    nameOfCollection: string,
    descriptionOfCollection: string,
    impCollection: boolean
  }
}



export default class CollectionIndex extends React.Component <AcceptedProps, CollectionProp> {
  constructor(props: AcceptedProps){
    super(props)
    this.state = {
        collection: {
            nameOfCollection: "",
            descriptionOfCollection: "",
            impCollection: false

        }
    }
  }

  fetchCollection () {
    let collection = this.state.collection
    this.setState({collection: collection})


    fetch('http://localhost:3001/collection/', {
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
            collection: {
              nameOfCollection: res.nameOfCollection,
              descriptionOfCollection: res.descriptionOfCollection,
              impCollection: false
            }
        })
      }
    })
}

componentWillMount() {
        
  this.fetchCollection();
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