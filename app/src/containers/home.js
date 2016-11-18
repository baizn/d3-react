import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const styles = {
  color: 'white',
  textAlign: 'center',
  fontSize: 45
}

@connect(mapStateToProps)
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <h2 style={styles}>React图表组件</h2>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
