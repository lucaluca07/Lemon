import React, { Component } from 'react';
import Slider from './containers/slider';
import Layout from './components/layout';

import './assets/style/normalize.less';
import './assets/style/index.less';

export default class App extends Component{

  public render() {
    return (
      <Layout
        aside={<Slider />}
        header={"标题"}
        main={<div>内容</div>}
      />
    );
  }
}
