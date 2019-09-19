import React, { Component } from 'react';
import Layout from './components/layout';
import Slider from './containers/slider';
import Header from './containers/header';
import Main from './containers/main';

import './assets/style/normalize.less';
import './assets/style/index.less';

export default class App extends Component {
  public render() {
    return (
      <Layout
        aside={<Slider />}
        header={<Header />}
        main={<Main />}
      />
    );
  }
}
