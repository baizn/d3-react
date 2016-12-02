import React, { Component } from 'react'
import * as d3 from 'd3'

export default class Bar extends Component {
    constructor(props) {
        super(props)

        this.svg = null
        this.xScale = null
        this.yScale = null
    }

    /**
     * 画x轴和y轴
     * 
     * 
     * @memberOf Bar
     */
    drawAxis() {
        let { padding, style, height } = this.props.dataset

        //定义x轴和y轴
        let xAxis = d3.axisBottom()
            .scale(this.xScale)
        
        this.yScale.rangeRound([height - padding.top - padding.bottom, 0])

        let yAxis = d3.axisLeft()
            .scale(this.yScale)

        this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
            .call(xAxis)
        this.svg.append('g')
            .attr('transform', 'translate(' + padding.left + ',' + 2*(padding.bottom + padding.top) + ')')
            .call(yAxis)
    }

    drawBar() {
        let { data, style, height, padding } = this.props.dataset
        //获取hyfe-bar下的所有rect
        //获取矩形的update部分
        let updateRect = this.svg.selectAll('rect')
            .data(data)

        //获取矩形的enter部分
        let enterRect = updateRect.enter()

        //获取矩形的exit部分
        let exitRect = updateRect.exit()

        //矩形的update部分的处理方法
        updateRect.attr('fill', style.rect.color)
            .attr('x', (d, i) => {
                return padding.left + this.xScale(i)
            })
            .attr('y', (d, i) => {
                return height - padding.bottom - this.yScale(i)
            })
            .attr('width', this.xScale.bandwidth())
            .attr('height', (d) => this.yScale(d))

        //矩形的enter部分的处理方法
        enterRect.append('rect')
            .attr('fill', style.rect.color)
            .attr('x', (d, i) => {
                return padding.left + this.xScale(i)
            })
            .attr('y', (d) => {
                return height - padding.bottom - this.yScale(d)
            })
            .attr('width', this.xScale.bandwidth())
            .attr('height', (d) => this.yScale(d))

        //矩形的exit部分的处理方法
        exitRect.remove()

        if(style.text.show) {
            //获取文字的update部分
            let updateText = this.svg.selectAll('text')
                .data(data)

            //获取文字的enter部分
            let enterText = updateText.enter()

            //获取文字的exit部分
            let exitText = updateText.exit()

            //处理文字的update部分
            updateText.attr('fill', style.text.color)
                .attr('font-size', style.text.fontSize)
                .attr('x', (d, i) => {
                    return padding.left + this.xScale(i)
                })
                .attr('y', (d) => {
                    return height - this.yScale(d) - padding.bottom
                })
                .attr('dx', this.xScale.bandwidth()/2)
                .attr('dy', '1em')
                .attr('text-anchor', 'middle')
                .text((d) => this.yScale(d))

            //处理文字的enter部分
            enterText.append('text')
                .attr('fill', style.text.color)
                .attr('font-size', style.text.fontSize)
                .attr('x', (d, i) => {
                    return padding.left + this.xScale(i)
                })
                .attr('y', (d) => {
                    return height - this.yScale(d) - padding.bottom
                })
                .attr('dx', this.xScale.bandwidth()/2)
                .attr('dy', '1em')
                .attr('text-anchor', 'middle')
                .text((d) => this.yScale(d))

            //处理文字exit部分
            exitText.remove()
        }
    }

    componentDidMount() {
        let { width, height, data, padding, inner, outer } = this.props.dataset

        this.svg = d3.select('.hyfe-bar')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'translate(' + padding.top + ',' + padding.left + ')')

        //定义x轴比例尺（序数段比例尺）
        this.xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .rangeRound([0, width - padding.left - padding.right])
            .paddingInner(inner)
            .paddingOuter(outer)
        
        //定义y轴比例尺（线性比例尺）
        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .rangeRound([0, height - padding.top - padding.bottom])

        this.drawAxis()
        this.drawBar()
    }

    render() {
        return (
            <div className='hyfe-bar'></div>
        )
    }
}