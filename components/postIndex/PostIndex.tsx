import React, {FormEvent} from 'react'
import sessionToken from '../Topbar'
import {PostType} from '../types/Types'
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

type PostState = {
  post: PostType
}

export default class PostIndex extends React.Component<
  AcceptedProps,
  PostState
> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state = {
      post: {
        titleOfPost: '',
        descriptionOfPost: '',
        url: '',
        imgOfPost: '',
        tagsOfPost: '',
        impPost: false,
        collectionID: 0,
      },
    }
  }

  fetchPost() {
    let post = this.state.post
    this.setState({post: post})

    fetch('http://localhost:3001/post/', {
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
            post: {
              titleOfPost: res.titleOfPost,
              descriptionOfPost: res.descriptionOfPost,
              url: res.url,
              imgOfPost: res.imgOfPost,
              tagsOfPost: res.tagsOfPost,
              impPost: res.impPost,
              collectionID: res.collectionID,
            },
          })
        }
      })
  }

  componentWillMount() {
    this.fetchPost()
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page"></div>
      </div>
    )
  }
}
