import { dynamic } from 'umi';
import MiniChart from './MiniChart';

export default (dynamic({
  async loader() {
    const { default: Component } = await import(/* webpackChunkName: "MiniChart" */ './MiniChart');
    return Component;
  },
}) as unknown) as typeof MiniChart;
