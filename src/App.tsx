import React from 'react';
import Layout, { Header, Content, Sider } from './components/layout';
import RouterMap from './router/index';
import './App.css';

function App() {
  return (
    <Layout>
      <Header>
        <span className="layout-sider-switch">切换Sider</span>Header
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <RouterMap />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
