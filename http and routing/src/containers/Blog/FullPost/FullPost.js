import React, { Component } from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    // console.log(this.props);
    // It has props coming from react Router and match.params is one of them. we can see the porps with console.log()
    if (this.props.match.params.id) {
      if (!this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {
        axios
          .get('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
          .then(response => this.setState({ loadedPost: response.data }));
      }
    }
  }

  deletePostHandler = () => {
    axios
      .delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
      .then(response => console.log(response));
  };

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading!...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
