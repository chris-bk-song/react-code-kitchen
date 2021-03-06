import React, { Component } from 'react';

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       detail: {},
       loading: true,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/v1/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          details: data,
          loading: false,
        })
      })
  }

  increaseLikes = () => {
    const { id } = this.state.details;

    fetch(`/api/v1/recipes/${id}/likes`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          details: {
            ...this.state.details,
            likes: data
          }
        })
      })
  }

  render() {
    const { loading, details } = this.state;
    
    if(loading) {
      return <div>Loading...</div>
    }
    return (
      <div className="RecipeDetails">
        <h1>{ details.name }</h1>
        <div>
          <p>{details.description}</p>
        </div>
        <button onClick={this.increaseLikes}>
          <span role="img" aria-label="Likes: ">👍🏼</span> {details.likes}
        </button>
      </div>
    )
  }
}