import { dynamic } from 'umi';
import LineChart from './LineChart';

export default (dynamic({
  async loader() {
    const { default: Component } = await import(/* webpackChunkName: "LineChart" */ './LineChart');
    return Component;
  },
}) as unknown) as typeof LineChart;
