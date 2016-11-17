import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import echarts from 'echarts'
import { loadDefaultChartData, loadTestData, loadItems, loadNavs } from '../actions/items'
import { Map } from 'immutable'
import Navs from '../components/nav'
import Pie from '../components/Pie'

const styles = {
  h1: {
    color: 'red',
    fontSize: '50px',
    marginTop: '100px'
  },
  a: {
    color: '#fff'
  },
  table: {
    background: 'aquamarine',
    width: '500px'
  }
}

function mapStateToProps(state) {
  debugger
  return {
    chartData: state.charts,
  }
}

@connect(mapStateToProps, { loadDefaultChartData, loadTestData, loadNavs })
export default class Default extends Component {
  static fetchData({params, query}) {
    console.log('参数为：' + params, query)
    // return store.dispatch(loadTestData())
    return [loadNavs()] //loadItems(params), loadTestData(), 
  }

  constructor(props) {
    super(props)
    this.state = {
      showTable: false
    }
    this.toggleNav = this.toggleNav.bind(this)
  }

  toggleNav(type) {
    this.props.loadTestData()
    this.setState({
      showTable: true
    })
  }

  componentDidMount() {
    this.props.loadDefaultChartData()
    //this.props.loadTestData()
    this.props.loadNavs()
    
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    debugger
    if(this.props.chartData !== nextProps.chartData) {
      const data = nextProps.chartData
      let charts = echarts.init(this.refs.charts)
      charts.setOption({
        title: {
          text: 'Echarts示例'
        },
        xAxis: {
          data: data.get('xData').toArray()
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: data.get('yData').toArray()
          }
        ]
      })
    }
  }

  render() {
    let testData = this.props.chartData.get('test')
    console.log(testData)
    let state = testData.get('status')
    let data = testData.get('result')
    let message = testData.get('msg')
    
    let navs = this.props.chartData.get('navs')
    
    var pieData = {
      width: 600,
      height: 600,
      showTips: true,
      showInnerText: true,
      decimalPlaces: 1,
      showOuterText: true,
      dragRedraw: true,
      innerTextStyle: {
        color: 'white',
        fontSize: '15px'
      },
      outerStyle: {
        line: {
          color: 'red',
          width: 2
        },
        text: {
          color: 'white',
          fontSize: '15px'
        }
      },
      //tipsClassName: '',
      innerRadius: 0,
      outerRadius: 150,
      colors: ['red', 'green'],
      data: [
            {
                value: 123,
                name: 'AAA'
            },
            {
                value: 12,
                name: 'BBB'
            },
            {
                value: 80,
                name: 'CCC'
            }
        ]
    }
    return (
      <div className='intro'>
        <h1 style={styles.h1}>示例项目</h1>
        <Pie dataset={pieData}/>
        <Navs clickLi={this.toggleNav} navs={navs} />
        <div ref='charts' style={{width: 600, height: 400}}></div>
        <div>
            <h2>{message}</h2>
            {
              this.state.showTable ?
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>用户名</th>
                      <th>角色</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map( col => {
                        return <tr key={col.get('id')}>
                          <td>{col.get('id')}</td>
                          <td>{col.get('userName')}</td>
                          <td>{col.get('role')}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                :
                ''
            }
        </div>
        <Link style={styles.a} to='/list'>Next Page(路由)</Link>
      </div>
    );
  }
}