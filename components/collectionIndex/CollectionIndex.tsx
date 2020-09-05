import React, {FormEvent} from 'react'
import sessionToken from '../Topbar'
import {CollectionType} from '../types/Types'
import {Link} from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Modal,
  Row,
  Col,
} from 'reactstrap'

type AcceptedProps = {
  sessionToken: string
}

type CollectionState = {
  collection: CollectionType
}

export default class CollectionIndex extends React.Component<
  AcceptedProps,
  CollectionState
> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state = {
      collection: {
        nameOfCollection: '',
        descriptionOfCollection: '',
        impCollection: false,
      },
    }
  }

  fetchCollection() {
    let collection = this.state.collection
    this.setState({collection: collection})

    fetch('http://localhost:3001/collection/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res:', res)
        if (res.id) {
          this.setState({
            collection: {
              nameOfCollection: res.nameOfCollection,
              descriptionOfCollection: res.descriptionOfCollection,
              impCollection: false,
            },
          })
        }
      })
  }

  componentWillMount() {
    this.fetchCollection()
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page"></div>
      </div>
    )
  }
}
