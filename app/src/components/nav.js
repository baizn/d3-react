import React, { Component } from 'react'

const styles = {
    ul: {
        listStyle: 'none'
    },
    lis: {
        width: 100,
        background: '#67b59b',
        borderRadius: 10,
        padding: 8,
        fontSize: 20,
        fontFamily: '微软雅黑',
        color: '#fff',
        float: 'left',
        marginLeft: 8
    }
}
export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(evt) {
        console.log(evt.type, evt.target)
        this.props.clickLi()
    }

    render() {
        let navs = this.props.navs
        
        return (
            <ul style={styles.ul}>
                {
                    navs.map( nav => {
                        return <li onClick={this.handleClick} data-key={styles.lis} style={styles.lis} key={nav.get('key')}>{nav.get('value')}</li>
                    })
                }
            </ul>
        )
    }
}