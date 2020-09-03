import React, {FormEvent} from 'react';
import sessionToken from '../Topbar'
import { CollectionType } from '../types/Types';
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
            nameOfCollection: this.props.collection.nameOfCollection,
            descriptionOfCollection: this.props.collection.descriptionOfCollection,
            impCollection: false

        }
    }
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch('http://localhost:3001/collection/', {
      method: 'GET',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({collection: {
        nameOfCollection: this.state.collection.nameOfCollection,
        descriptionOfCollection: this.state.collection.descriptionOfCollection,
        impCollection: this.state.collection
      }
    })
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
        console.log("collection mounted:", this.state.collection)
      }
    })
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