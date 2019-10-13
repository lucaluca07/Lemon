import React, { Component } from 'react';
import Layout from './components/layout';
import Header from './containers/header';
import Main from './containers/main';
import Slider from './containers/slider';

import './assets/style/index.less';
import './assets/style/normalize.less';

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
