import { EChartsOption } from 'echarts';

export const chartOptions = (
  data: number[],
  months: string[]
): EChartsOption => {
  return {
    title: {
      text: 'Transaction Overview',
      textStyle: {
        fontWeight: 'normal',
        color: '#37383E',
        fontSize: '1.25rem',
      },
    },
    textStyle: {
      fontFamily: 'Albert Sans',
      fontSize: '12px',
      color: '#333',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: '{c}',
      position: function (point, params, dom, rect, size) {
        return [
          point[0] - size.contentSize[0] / 2,
          point[1] - size.contentSize[1] - 10,
        ];
      },
      backgroundColor: '#470B96',
      textStyle: {
        color: '#fff',
        fontSize: '10px',
        fontWeight: 'normal',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: months,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    legend: {
      align: 'auto',
      bottom: 0,
      itemStyle: {
        color: '#470B96',
      },
    },
    series: [
      {
        name: 'Contributions',
        color: '#171717',
        type: 'bar',
        barWidth: '13px',
        data,
        itemStyle: {
          color: '#D4D4D4',
        },
        emphasis: {
          itemStyle: {
            color: '#470B96',
          },
        },
      },
    ],
  };
};
