import React from 'react';
import CollectionIndex from '../../components/collectionIndex/CollectionIndex'

export default class Collections extends React.Component {


  render(){
    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h2>Collection Title</h2>
          </div>
        </div>
        <div className='container'>
          <div className='row article-content'>
            <div>
              <p>Collection body</p>
            </div>
          </div>
        </div>
      </div>
    )
  }  
}