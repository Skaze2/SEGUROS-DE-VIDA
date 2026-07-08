import { useMemo } from 'react'
import ReactEChartsCore from 'echarts-for-react/esm/core'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { fplBand } from '@/lib/fpl'
import { useTheme } from '@/hooks/useTheme'

echarts.use([GaugeChart, CanvasRenderer])

const GAUGE_MAX = 500

// Arco por bandas FPL (mismos tonos que FPL_BANDS, con alpha)
const BAND_ARC: [number, string][] = [
  [100 / GAUGE_MAX, 'rgba(244,63,94,0.75)'],
  [138 / GAUGE_MAX, 'rgba(251,146,60,0.75)'],
  [150 / GAUGE_MAX, 'rgba(34,211,238,0.75)'],
  [250 / GAUGE_MAX, 'rgba(56,189,248,0.75)'],
  [400 / GAUGE_MAX, 'rgba(14,165,233,0.75)'],
  [1, 'rgba(45,212,191,0.75)'],
]

/** Único componente que importa echarts: si se quiere quitar la gráfica, basta con eliminar este archivo. */
export function FplGauge({ percent }: { percent: number }) {
  const { theme } = useTheme()

  const option = useMemo(() => {
    const clamped = Math.max(0, Math.min(percent, GAUGE_MAX))
    const band = fplBand(percent)
    const isDark = theme === 'dark'
    const anchorColor = isDark ? '#E8EEF7' : '#0F2138'
    const splitColor = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(15,33,56,0.18)'
    const labelColor = isDark ? '#8CA0BD' : '#5B6E86'

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
              color: BAND_ARC,
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
            itemStyle: { color: anchorColor },
          },
          axisTick: { show: false },
          splitLine: {
            length: 8,
            distance: 4,
            lineStyle: { color: splitColor, width: 1 },
          },
          axisLabel: {
            color: labelColor,
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
  }, [percent, theme])

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
