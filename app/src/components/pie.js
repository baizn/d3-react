import React, { Component } from 'react'
import * as d3 from 'd3'

export default class Pie extends Component {
    constructor(props) {
        super(props)
        let { width, 
            height, 
            data,
            tipsClassName = 'hyfe-pie-tooltip',
            outerRadius = width/3 
        } = this.props.dataset

        this.piecircle = {
          cx: width/2,
          cy: height/2,
          r: outerRadius
        }

        this.svg = null
        this.pie = null
        this.arc = null
        this.tooltip = null
        this.data = data
        //饼图默认颜色
        this.defaultColor = d3.scaleOrdinal(d3.schemeCategory10)
    }

    /**
     * update和enter部分设置属性
     * 
     * @param {any} arcsInstance
     * 
     * @memberOf Pie
     */
    setAttributes(arcsInstance) {
      let { colors = [] } = this.props.dataset

      arcsInstance.each((d) => {
        d.circle = this.piecircle
        d.dx = 0
        d.dy = 0
      })

      //将饼图平移到指定位置
      arcsInstance.attr('transform', function(d) {
        return 'translate(' + d.circle.cx + ',' + d.circle.cy + ')'
      })

      //绘制弧
      arcsInstance.select('.arcPath')
        .attr('fill', (d, i) => {
          //设定弧的颜色
          return colors[i] || this.defaultColor(i)
        })
        .attr('d', function(d) {
          return arc(d)
        })
    }

    appendCircle(movedata, movecolor) {
      let self = this
      let circleGroups = this.svg.append('g')
      let gCircle = circleGroups.append('g')
        .datum(movedata)
        .attr('class', 'move-arc')
        .attr('transform', function(d) {
          // return 'translate(' + d3.event.sourceEvent.offsetX + ','
          // + d3.event.sourceEvent.offsetY + ')'
          return 'translate(' + d3.mouse(this)[0] + ','
          + d3.mouse(this)[1] + ')'
        })
        //.call(dragCircle)

      //添加圆
      gCircle.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 20)
        .style('fill', movecolor)

      //添加文字
      gCircle.append('text')
        .attr('dx', '22px')
        .attr('dy', '.4em')
        .text(function(d) {
          console.log('文字', d[0])
          return d[0].name
        })
      
      //已经被移动出去的元素的拖拽行为
      let dragCircle = d3.drag()
        .on('drag', function(d) {
          console.log('drag circle', d, d3.event)
          d.x = d3.event.x
          d.y = d3.event.y

          d3.select(this)
            .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
        })
        .on('end', function(d, i) {
          console.log('drag end', d, d[0])
          //计算到圆心距离的平方
          let dis2 = (d.x - self.piecircle.cx) * (d.x - self.piecircle.cx)
            + (d.y - self.piecircle.cy) * (d.y - self.piecircle.cy)
          if(dis2 < self.piecircle.r * self.piecircle.r) {
            debugger
            //拖拽结束时圆到饼图之内
            self.data.push(d[0])

            let piedata = self.pie(self.data)

            d3.select(this).remove()

            self.tooltip.style('opacity', 0.0)

            d3.selectAll('.pie-arc')
                  .remove()

            self.drawPie(piedata)
          }
        })

        gCircle.call(dragCircle)
    }

    /**
     * 
     * 拖拽以后重新绘制饼图
     * 
     * @param {any} piedata 拖拽后的数据
     * 
     * @memberOf Pie
     */
    drawPie(piedata) {
      debugger
      let self = this
      let { width, 
          height,
          colors = [],
          showTips = false, 
          showInnerText = false,
          innerTextStyle = {
            color: 'black',
            fontSize: '12px'
          },
          outerStyle = {
            line: {
              color: 'black',
              width: 1
            },
            text: {
              color: 'black',
              fontSize: '12px'
            }
          },
          showOuterText = false,
          decimalPlaces = 1,
          dragRedraw = false,
          tipsClassName = 'hyfe-pie-tooltip',
          innerRadius = 0, 
          outerRadius = width/3 
        } = this.props.dataset

        console.log(piedata)

        /**
         * 为每一段弧添加三个数据：
         * circle: 饼图所在的圆，其中包括cx，cy，r三个属性；
         * dx：x方向相对偏移量，拖拽事件触发时使用；
         * dy：y方向相对偏移量，拖拽事件触发时使用。
         */

        //update部分
        let update = this.svg.selectAll('pie-arc')
          .data(piedata)

        //enter部分
        let enter = update.enter()

        //exit部分
        let exit = update.exit()

        // 1 update部分的处理
        let updateGroup = update.attr('class', 'pie-arc')
          .each((d) => {
            d.circle = this.piecircle
            d.dx = 0
            d.dy = 0
          })
          .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')')
          
        updateGroup.append('path')
          .attr('class', 'arcPath')
          .attr('fill', (d, i) => {
            return colors[i] || this.defaultColor(i)
          })
          .attr('d', (d) => {
            return this.arc(d)
          })
        
        //updateGroup.call(tipsFun)

        // 2 enter部分的处理
        let enterGroup = enter.append('g')
          .attr('class', 'pie-arc')
          .each((d) => {
            d.circle = this.piecircle
            d.dx = 0
            d.dy = 0
          })
          .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')')

        enterGroup.append('path')
          .attr('class', 'arcPath')
          .attr('fill', (d, i) => {
            return colors[i] || this.defaultColor(i)
          })
          .attr('d', (d) => {
            return this.arc(d)
          })

        //3 exit部分的处理
        exit.remove()

        enterGroup.call(tipsFun)

        //拖拽重新计算饼图占比
        if(dragRedraw) {
          
          //定义拖拽行为
          let drag = d3.drag()
            .on('drag', self.dragmove)
            .on('end', (d, i) => {
              //计算被拖拽的元素到饼图圆心距离的平方
              let dis2 = d.dx * d.dx + d.dy * d.dy

              if(dis2 > d.circle.r * d.circle.r) {
                //被拖到了饼图以外
                /**
                 * 删除原数组中的第i个元素（被拖拽的元素）
                 * 被删除的元素保存在moveData中
                 */
                let moveData = self.data.splice(i, 1)
                let moveColor = colors.splice(i, 1)

                let pieData = self.pie(self.data)
                
                self.appendCircle(moveData, moveColor[0])

                self.tooltip.style('opacity', 0.0)

                d3.selectAll('.pie-arc')
                  .remove()

                self.drawPie(pieData)
              }
            })

           enterGroup.call(drag)
        }
        /**
       * 显示提示框和提示信息
       * 
       * @param {any} instance
       * 
       * @memberOf Pie
       */
      function tipsFun(instance) {
        //添加提示框
        if(showTips) {
            instance.on('mouseover', function(d) {
                self.tooltip.html('名称：' + d.data.name + '\n'
                    + '数量：' + d.data.value)
                    .style('left', d3.event.pageX + 'px')
                    .style('top', (d3.event.pageY + 20) + 'px')
                    .style('opacity', 1.0)
                    .style('box-shadow', '10px 0px 0px ' + d.data.color)
              })
              .on('mousemove', function(d) {
                  self.tooltip.style('left', d3.event.pageX + 'px')
                      .style('top', (d3.event.pageY + 20) + 'px' )
              })
              .on('mouseout', function(d) {
                  self.tooltip.style('opacity', 0.0)
              })
        }

        //显示饼图上的百分比
        if(showInnerText) {
            instance.append('text')
              .attr('font-size', innerTextStyle.fontSize)
              .style('fill', innerTextStyle.color)
              .attr('transform', (d) => {
                let center = self.arc.centroid(d)
                let x = center[0] * 1.4
                let y = center[1] * 1.4
                return 'translate(' + x + ',' + y + ')'
              })
              .attr('text-anchor', 'middle')
              .text(function(d) {
                let percent = parseInt(d.value) / d3.sum(self.data, function(d) {
                  return d.value
                }) * 100

                return percent.toFixed(decimalPlaces) + '%'
              })
        }

        //显示饼图外面的名称
        if(showOuterText) {
            instance.append('line')
              .attr('stroke', outerStyle.line.color)
              .attr('stroke-width', outerStyle.line.width)
              .attr('x1', (d) => {
                return self.arc.centroid(d)[0] * 2
              })
              .attr('y1', (d) => {
                return self.arc.centroid(d)[1] * 2
              })
              .attr('x2', (d) => {
                return self.arc.centroid(d)[0] * 2.2
              })
              .attr('y2', (d) => {
                return self.arc.centroid(d)[1] * 2.2
              })
            
            instance.append('text')
              .attr('font-size', outerStyle.text.fontSize)
              .style('fill', outerStyle.text.color)
              .attr('transform', (d) => {
                let center = self.arc.centroid(d)
                let x = center[0] * 2.5
                let y = center[1] * 2.5
                return 'translate(' + x + ',' + y + ')'
              })
              .attr('text-anchor', 'middle')
              .text(function(d) {
                return d.data.name
              })
        }
      }
    }

    /**
     * 拖拽过程中饼图位置跟随移动
     * 
     * @param {any} d 当前拖拽元素的数据
     * 
     * @memberOf Pie
     */
    dragmove(d) {
      //加鼠标x方向的偏移量
      d.dx += d3.event.dx

      //加鼠标y方向的偏移量
      d.dy += d3.event.dy

      //为被拖拽的弧的平移量设定新的值
      d3.select(this)
        .attr('transform', 'translate(' + (d.dx + d.circle.cx) + ',' + (d.dy + d.circle.cy) + ')')

    }

    componentDidMount() {
      let { width, 
          height,
          innerRadius = 0,
          tipsClassName = 'hyfe-pie-tooltip',
          outerRadius = width/3
        } = this.props.dataset

      this.svg = d3.select('.hyfe-pie')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
       
        //饼图布局
        this.pie = d3.pie()
          .value(function(d) {
              return d.value
          })

        let pieData = this.pie(this.data)

        //创建弧生成器
        this.arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        this.tooltip = d3.select('.hyfe-pie')
                .append('div')
                .attr('class', tipsClassName)
                .style('opacity', 0.0)

        this.drawPie(pieData)
    }

    render() {
        return (
            <div className='hyfe-pie'></div>
        )
    }
}