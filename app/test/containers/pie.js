import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPieData } from '../../src/actions/items'
import Pie from '../../src/components/Pie'

function mapStateToProps(state) {
  debugger
  return {
    pieData: state.items,
  }
}

@connect(mapStateToProps, { loadPieData })
export default class Default extends Component {
  static fetchData() {
    console.log('执行静态方法')
    return [loadPieData()]
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadPieData()
  }

  render() {
    debugger
    console.log('props', this.props)
    var { pieData } = this.props
    if(!pieData || !pieData.width) {
      return (<div></div>)
    }

    return (
        <Pie dataset={pieData}/>
    )
  }
}