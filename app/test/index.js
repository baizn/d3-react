import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const styles = {
  color: 'white',
  textAlign: 'center',
  fontSize: 45
}

@connect(mapStateToProps)
export default class TestMain extends Component {
  constructor(props) {
    super(props)
    this.items = [
        {
            url: '/pie',
            name: '饼图'
        },
        {
            url: '/circleProgress',
            name: '圆形进度条'
        },
        {
            url: '/tickBar',
            name: '刻度条形图'
        }
    ]
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <h2 style={styles}>React图表组件列表</h2>
        <ul className='items'>
            {
                this.items.map(item => {
                    return <li className='item'>
                        <Link to={item.url}>{item.name}</Link>
                    </li>
                })
            }
        </ul>
        <div className='context'>
            {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
