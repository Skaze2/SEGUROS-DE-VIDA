import { useMemo } from 'react'
import ReactEChartsCore from 'echarts-for-react/esm/core'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { fplBand } from '@/lib/fpl'

echarts.use([GaugeChart, CanvasRenderer])

const GAUGE_MAX = 500

/** Único componente que importa echarts: si se quiere quitar la gráfica, basta con eliminar este archivo. */
export function FplGauge({ percent }: { percent: number }) {
  const option = useMemo(() => {
    const clamped = Math.max(0, Math.min(percent, GAUGE_MAX))
    const band = fplBand(percent)

    return {
      series: [
        {
          type: 'gauge',
          startAngle: 210,
          endAngle: -30,
          min: 0,
          max: GAUGE_MAX,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 12,
              color: [
                [100 / GAUGE_MAX, 'rgba(255,61,110,0.7)'],
                [138 / GAUGE_MAX, 'rgba(255,138,61,0.7)'],
                [150 / GAUGE_MAX, 'rgba(47,217,255,0.7)'],
                [250 / GAUGE_MAX, 'rgba(47,107,255,0.7)'],
                [400 / GAUGE_MAX, 'rgba(123,47,255,0.7)'],
                [1, 'rgba(201,62,255,0.7)'],
              ],
            },
          },
          pointer: {
            length: '58%',
            width: 4,
            itemStyle: { color: band.color },
          },
          anchor: {
            show: true,
            size: 10,
            itemStyle: { color: '#EDEBF5' },
          },
          axisTick: { show: false },
          splitLine: {
            length: 8,
            distance: 4,
            lineStyle: { color: 'rgba(255,255,255,0.25)', width: 1 },
          },
          axisLabel: {
            color: '#6B6880',
            fontSize: 10,
            distance: 16,
          },
          detail: { show: false },
          data: [{ value: clamped }],
          animationDuration: 1200,
          animationDurationUpdate: 800,
        },
      ],
    }
  }, [percent])

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge
      style={{ height: 190, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  )
}
