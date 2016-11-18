import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import echarts from 'echarts'
import { loadPieData } from '../actions/items'
import Pie from '../components/Pie'

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
    console.log('props', this.props.pieData)
    var { pieData } = this.props
    if(!pieData || !pieData.width) {
      return (<div></div>)
    }
    // {
    //   width: 600,
    //   height: 600,
    //   showTips: true,
    //   showInnerText: true,
    //   decimalPlaces: 1,
    //   showOuterText: true,
    //   dragRedraw: true,
    //   innerTextStyle: {
    //     color: 'white',
    //     fontSize: '15px'
    //   },
    //   outerStyle: {
    //     line: {
    //       color: 'red',
    //       width: 2
    //     },
    //     text: {
    //       color: 'white',
    //       fontSize: '15px'
    //     }
    //   },
    //   //tipsClassName: '',
    //   innerRadius: 0,
    //   outerRadius: 150,
    //   colors: ['red', 'green'],
    //   data: [
    //         {
    //             value: 123,
    //             name: 'AAA'
    //         },
    //         {
    //             value: 12,
    //             name: 'BBB'
    //         },
    //         {
    //             value: 80,
    //             name: 'CCC'
    //         }
    //     ]
    // }
    return (
      <div className='intro'>
        <Pie dataset={pieData}/>
      </div>
    );
  }
}