import React, { PropTypes } from 'react'
import NavLink from './NavLink'
import Auth from './Auth'

export default React.createClass({

  propTypes: {
    post: PropTypes.object
  },
  getInitialState() {
    return {
      user: Auth.user.id,
      title: null,
      content: null,
      abstract: null,
      tags: [],
      updated_at: null
    }
  },
  // componentDidMount() {},
  //   contextTypes: {
  //     router: React.PropTypes.object
  //   },

  createPost(e) {
    e.preventDefault()
    console.log(this.state)
    store.dispatch(this.state)

    // const userName = event.target.elements[0].value
    // const postTitle = event.target.elements[1].value
    // const path = `/meta/posts/${userName}/${postTitle}`
    // this.context.router.push(path)
  },
  componentWillUpdate(){

  },
  componentWillReceiveProps() {
    // probably auth stuff in here
  },
  handleChange(e) {
    let nextState = {},
        targetName = e.target.name

    nextState[targetName] = e.target.value;

    this.setState(nextState, () => {
      this.state.updated_at = Date.now()

      // todo - these both seems rudimentary - move to component will update?
      this.state.url = '/' + this.state.title.split(' ').join('-')
      if(targetName === 'tags') {
        this.state.tags = this.state.tags.split(' ')
      }
    });
  },
  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {/* Need to loop of all projects
          {posts.map(project => (
              <li key={project.id}>
                  <Project project={project} />
              </li>
          ))}*/}
          <li>
            <form onSubmit={this.createPost} >
              <input type="text"
                placeholder="title"
                className="mb-12"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                />
              <textarea placeholder="content"
                className="mb-12 h-200"
                name="content"
                value={this.state.content}
                onChange={this.handleChange}>
              </textarea>
              <textarea placeholder="abstract"
                className="mb-12"
                name="abstract"
                value={this.state.abstract}
                onChange={this.handleChange}>
              </textarea>
              <input type="text"
                placeholder="tags"
                className="mb-12"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
              <button type="submit"><h3>POST</h3></button>
            </form>
          </li>
          <li>updated_at: {this.state.updated_at}</li>
          <li>tags: {this.state.tags}</li>
          <li>url: {this.state.url}</li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})