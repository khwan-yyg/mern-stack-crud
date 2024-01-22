import React, { Component } from 'react'
import axios from 'axios'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios.get("/posts").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.posts,
        });
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/posts/delete/${id}`).then((res) => {
      alert(res.data.title + " : has been deleted successfully");
      this.getPosts();
    });
  };

  filterContent(posts, searchTerm) {
    const result = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.postCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ posts: result });
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("/posts").then((res) => {
      if (res.data.success) {
        this.filterContent(res.data.posts, searchTerm);
      }
    });
  };

  render() {
    return (
      <div className='container'>
        <div className="row mt-5 mb-3">
          <div className="col-lg-6">
            <h2>All Posts</h2>
          </div>
          <div className="col-lg-5">
            <input
              className="form-control"
              type="search"
              placeholder="Search Data here...."
              name="searchTerm"
              onChange={this.handleTextSearch}
            ></input>
          </div>
          <div className="col-lg p-0 ">
            <button className="btn btn-success">
              <a href="/add" className='btn btn-success p-0'><i className='bx bx-plus'></i>Add</a>
            </button>
          </div>
        </div>

        <div className="table-responsive-lg">
          <table className="table table-hover">
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.posts.map((post, index) => (
                <tr key={index}>
                  <th scope="row ">{index + 1}</th>
                  <td><a href={`/posts/${post._id}`}>{post.title}</a></td>
                  <td dangerouslySetInnerHTML={{ __html: post.description }}></td>
                  <td>{post.postCategory}</td>
                  <td className=''>
                    <a href={`/edit/${post._id}`} className='btn btn-warning me-3'>
                      <i className='bx bx-pencil' ></i>Edit
                    </a>
                    <a href="/#" className='btn btn-danger' onClick={() => this.onDelete(post._id)}>
                      <i className='bx bx-trash' ></i>Delete
                    </a>
                  </td>
                </tr>))}
            </tbody>
          </table >
        </div >
      </div >
    )
  }
}

export default LandingPage