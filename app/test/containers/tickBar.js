import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadTickBarData } from '../../src/actions/items'
import TickBar from '../../src/components/tickBar'

function mapStateToProps(state) {
  return {
    tickbarData: state.items,
  }
}

@connect(mapStateToProps, { loadTickBarData })
export default class Default extends Component {
  static fetchData() {
    console.log('执行静态方法')
    return [loadTickBarData()]
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadTickBarData()
  }

  render() {
    debugger
    console.log('props', this.props)
    var { tickbarData } = this.props
    if(!tickbarData || !tickbarData.length) {
      return (<div></div>)
    }

    let styles = {
        width: 400,
        height: 400,
        style: {
            fontFamily: '微软雅黑',
            border: {
                show: true,
                width: 1,
                stroke: '#fff',
                fill: '#0f1d4c'
            },
            text: {
                color: ['#00fefc', '#ebf72b'],
                fontSize: '16px',
                textAlign: 'middle'
            },
            rect: {
                width: 8,
                height: 8,
                color: ['#1afbff', '#2b4953']
            },
            offsetX: 10,
            offsetY: -80,
            inner:40,
            min: 0,
            max: 16,
            scale: 1,
            padding: {
                left: 25,
                right: 30,
                top: 20,
                bottom: 100
            }
        }
    }

    return (
      <TickBar dataset={tickbarData} styles={styles} />
    );
  }
}