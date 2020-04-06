import React from 'react';
import Layout, { Header, Content, Sider } from './components/layout';
import TopBar from './containers/top-bar';
import SideBar from './containers/side-bar';
import RouterMap from './router/index';
import './App.css';

function App() {
  return (
    <Layout>
      <Header>
        <TopBar />
      </Header>
      <Layout>
        <Sider>
          <SideBar />
        </Sider>
        <Content>
          <RouterMap />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
