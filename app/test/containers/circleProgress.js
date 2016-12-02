import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CircleProgress from '../../src/components/CircleProgress'

export default class extends Component {

  render() {
    
    let progress = '10%'
    let pstyle = {
        width: 400,
        height: 400,
        style: {
            width: 3,
            r: 90,
            bgcolor: '#ccc',
            color: 'blue',
            text: {
                color: 'white',
                fontSize: '16px'
            }
        }
    }

    return (
        <CircleProgress dataset={progress} styles={pstyle} />
    )
  }
}