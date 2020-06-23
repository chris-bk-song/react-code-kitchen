import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
    }
  }

  componentDidMount() {
    fetch('/api/v1/recipes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          recipes: data
        })
      })
  }

  render() {
    const container = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
    const outside = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      border: 'solid 5px #323232',
      borderRadius: '5px',
      width: '30%',
      margin: '5px',
      backgroundColor: 'silver'
    }
    const inside = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      border: 'solid 2px beige',
      borderRadius: '3px',
      width: '90%',
      margin: '10px',
      backgroundColor: 'beige'
    }
    
    return (
      <div>
        { this.state.recipes.map(recipe => {
          return (
            <div style={container}>
              <div key={recipe.id} style={outside}>
                <h1>{ recipe.name }</h1>
                <div key={recipe.id} style={inside}>
                  <p>{ recipe.description }</p>
                  <Link to ={`/recipes/${recipe.id}`}>Show Details</Link>
                </div>
              </div>
            </div>
          )
        })}
        <Link to="/recipes/new">Submit a Review</Link>
      </div>
    )
  }
}