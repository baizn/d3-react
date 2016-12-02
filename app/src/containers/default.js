import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import echarts from 'echarts'
import { loadPieData } from '../actions/items'
import Pie from '../components/Pie'
import Bar from '../components/Bar'
import TickBar from '../components/tickBar'
import CircleProgress from '../components/CircleProgress'

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
   
   let opts = {
        width: 400,
        height: 500,
        padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 30
        },
        xAxis: {
            show: true,
            xValue: ['值1', '值1', '值1', '值1', '值1'],
        },
        inner: 0.2,
        outer: 0.3,
        style: {
            axis: {
                className: 'hyfe-bar-axis'
            },
            rect: {
                color: 'steelblue'
            },
            text: {
                show: true,
                color: 'white',
                fontSize: '14px'
            }
        },
        data: [150, 32, 115, 35, 260, 25]
    }

    let opts1 = {
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

    var data = [
        {
            name: '团伙A',
            value: 300
        },{
            name: '团伙B',
            value: 200
        },{
            name: '团伙C',
            value: 100
        },{
            name: '团伙D',
            value: 50
        },{
            name: '团伙E',
            value: 40
        },{
            name: '团伙E',
            value: 60
        }
    ]

    let progress = '20%'
    let pstyle = {
        width: 400,
        height: 400,
        style: {
            width: 3,
            r: 90,
            bgcolor: '#ccc',
            color: 'blue'
        }
    }
    return (
      <div className='intro'>
        <Pie dataset={pieData}/>
        {/*<Bar dataset={opts} />*/}
        <TickBar dataset={data} styles={opts1} />
        <CircleProgress dataset={progress} styles={pstyle} />
      </div>
    );
  }
}