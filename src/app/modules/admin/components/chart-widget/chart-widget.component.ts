import { Component, Input, OnInit } from '@angular/core';

export type ChartType = 'line' | 'bar' | 'doughnut' | 'area';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display: boolean;
      text: string;
    };
  };
}

@Component({
  selector: 'ca-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrl: './chart-widget.component.css'
})
export class ChartWidgetComponent implements OnInit {
  @Input() type: ChartType = 'line';
  @Input() data!: ChartData;
  @Input() options: ChartOptions = {};
  @Input() height: number = 300;
  @Input() title?: string;

  chartId: string;
  maxValue: number = 0;
  chartPoints: any[] = [];
  
  // Make Array available in template
  Array = Array;
  
  constructor() {
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);
  }

  ngOnInit() {
    this.processChartData();
  }

  private processChartData() {
    if (!this.data || !this.data.datasets?.length) return;

    // Calculate max value for scaling
    this.maxValue = Math.max(
      ...this.data.datasets.flatMap(dataset => dataset.data)
    );

    // Add some padding to max value
    this.maxValue = this.maxValue * 1.1;

    this.generateChartPoints();
  }

  private generateChartPoints() {
    const chartWidth = 100; // percentage
    const chartHeight = 100; // percentage
    const pointCount = this.data.labels.length;
    
    this.chartPoints = this.data.datasets.map((dataset, datasetIndex) => ({
      ...dataset,
      points: dataset.data.map((value, index) => ({
        x: (index / (pointCount - 1)) * chartWidth,
        y: chartHeight - (value / this.maxValue) * chartHeight,
        value: value,
        label: this.data.labels[index]
      })),
      path: this.generatePath(dataset.data, chartWidth, chartHeight)
    }));
  }

  private generatePath(data: number[], width: number, height: number): string {
    const pointCount = data.length;
    let path = '';

    data.forEach((value, index) => {
      const x = (index / (pointCount - 1)) * width;
      const y = height - (value / this.maxValue) * height;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });

    return path;
  }

  getBarHeight(value: number): number {
    return (value / this.maxValue) * 100;
  }

  getBarWidth(): number {
    return Math.max(80 / this.data.labels.length, 8);
  }

  getBackgroundColor(dataset: any, index: number): string {
    if (Array.isArray(dataset.backgroundColor)) {
      return dataset.backgroundColor[index] || '#3b82f6';
    }
    return dataset.backgroundColor || '#3b82f6';
  }

  getDoughnutSegments() {
    if (this.type !== 'doughnut' || !this.data.datasets?.[0]) return [];

    const dataset = this.data.datasets[0];
    const total = dataset.data.reduce((sum, val) => sum + val, 0);
    let currentAngle = 0;
    
    return dataset.data.map((value, index) => {
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      currentAngle += angle;
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
      const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
      const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
      const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
      
      const pathData = [
        `M 50 50`,
        `L ${startX} ${startY}`,
        `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ');

      return {
        path: pathData,
        color: this.getBackgroundColor(dataset, index),
        label: this.data.labels[index],
        value: value,
        percentage: percentage.toFixed(1)
      };
    });
  }

  formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  }
} 