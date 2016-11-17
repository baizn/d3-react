import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

@connect(mapStateToProps)
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1
    }
  }
  componentDidMount() {
    console.log(this.state.value)
    var self = this
    self.setState({
      value: this.state.value+1
    }, function() {
      console.log('first setState', self.state.value)
    })

    self.setState({
      value: this.state.value+1
    }, function() {
      console.log('second setState', self.state.value)
    })

    
    setTimeout(function() {
      console.log('three setState', self.state.value)
      self.setState({
        value: self.state.value+1
      }, function() {
        console.log('four setState', self.state.value)
      })

      self.setState({
        value: self.state.value+1
      }, function() {
        console.log('five setState', self.state.value)
      })
    }, 0)
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
