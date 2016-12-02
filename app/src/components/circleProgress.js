import React, { Component } from 'react'
import * as d3 from 'd3'

export default class CircleProgress extends Component {
    constructor(props) {
        super(props)
        this.svg = null
    }

    componentDidMount() {
        let { width, height } = this.props.styles
        this.svg = d3.select('.hyfe-circle-progress')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        this.drawCircleProgress()
    }

    drawCircleProgress() {
        let { width, height, style } = this.props.styles
        let progress = this.props.dataset
        console.log('progress',this.props)
        this.svg.append('circle')
            .attr('r', style.r)
            .attr('cy', width / 2)
            .attr('cx', height / 2)
            .attr('stroke-width', style.width)
            .attr('stroke', style.color)
            .attr('fill', 'none')

        let update = this.svg.selectAll('.circle-progress')
            .data(d3.range(1))
        
        let enter = update.enter()

        let exit = update.exit()

        //处理update部分
        update.attr('stroke-dasharray', '100%')
            .attr('stroke-dashoffset', progress)
            .attr('class', 'circle-progress')
            .attr('r', style.r)
            .attr('cy', width / 2)
            .attr('cx', height / 2)
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', style.width + 1)
            .attr('stroke', style.bgcolor)
            .attr('fill', 'none')

        //处理enter部分
        enter.append('circle')
            .attr('class', 'circle-progress')
            .attr('stroke-dasharray', '100%')
            .attr('stroke-dashoffset', progress)
            .attr('r', style.r)
            .attr('cy', width / 2)
            .attr('cx', height / 2)
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', style.width + 1)
            .attr('stroke', style.bgcolor)
            .attr('fill', 'none')
            
        //处理exit部分
        exit.remove()

        let textUpdate = this.svg.selectAll('.text-progress')
            .data(d3.range(1))   

        let textEnter = textUpdate.enter()

        let textExit = textUpdate.exit()

        //处理update文字部分
        textUpdate.attr('fill', style.text.color)
            .attr('font-size', style.text.fontSize)
            .text(progress)

        textEnter.append('text')
            .attr('fill', style.text.color)
            .attr('font-size', style.text.fontSize)
            .attr('x', width / 2)
            .attr('y', height / 2)
            .text(progress)

        textExit.remove()
    }
    render() {
        return (
            <div className='hyfe-circle-progress'></div>
        )
    }
}