import React, { Component } from 'react'
import * as d3 from 'd3'

export default class TickBar extends Component {
    constructor(props) {
        super(props)
        this.svg = null
    }

    componentDidMount() {
        let { width, height, style } = this.props.styles
        let dataset = this.props.dataset
        var data = []
		for(var i = 0, len = dataset.length; i<len; i++){
			data.push(dataset[i].value)
		}
        this.svg = d3.select('.hyfe-tickbar')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('font-family', style.fontFamily)
        let strokeWidth = 0
        if(style.border.show) {
            strokeWidth = style.border.width
        }
        this.svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('stroke', style.border.stroke)
            .attr('stroke-width', strokeWidth)
            .attr('fill', style.border.fill)

        let groups = this.svg.append('g')
            .attr('class', 'groups')
            .attr('transform', 'translate(' + (style.offsetX + 10)
                + ',' + (style.offsetY + 5) + ')')

        let lineHeight = height / data.length - 5

        let unit = Math.floor(d3.max(data) * style.scale / (style.max - style.min))

        //添加矩形
        let tick = groups.selectAll('.tick')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'tick')
            .attr('transform', function(d, i) {
                return 'translate(' + style.inner + ',' + (i * lineHeight) + ')'
            })

        let xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([0, width])
        
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0])

        //添加Y轴名称
        tick.append('text')
            .attr('fill', style.text.color[0])
            .attr('font-size', style.text.fontSize)
            .attr('text-anchor', style.text.textAlign)
            .attr('x', -25)
            .attr('y', style.rect.height / 2 + 105)
            .text(function(d, i) {
                return dataset[i].name
            })

        //添加矩形
        let xInterval = width / style.max - 10
        let index = 0
        tick.append('g')
            .attr('class', 'rect')
            .selectAll('rect')
            .data(d3.range(style.min, style.max))
            .enter()
            .append('rect')
            .attr('x', function(d, i) {
                if(i % 2 === 0) {
                    return xInterval * d + 3
                }
                return xInterval * d
            })
            .attr('y', 100)
            .attr('width', style.rect.width)
            .attr('height', style.rect.height)
            .attr('fill', function(d ,i) {
                let range = Math.floor(data[index] / unit)
                if(i === style.max - 1) {
                    index++
                }
                return i < range ? style.rect.color[0] : style.rect.color[1]
            })
            
            tick.append('text')
                .attr('class', 'count')
                .attr('fill', style.text.color[1])
                .attr('font-size', style.text.fontSize)
                .attr('text-anchor', style.text.textAlign)
                .attr('x', width - 120)
                .attr('y', style.rect.height / 2 + 105)
                .text(function(d, i) {
                    console.log(d, i)
                    return d + '人'
                })
    }
    render() {
        return (
            <div className='hyfe-tickbar'></div>
        )
    }
}