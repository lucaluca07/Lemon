import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import useModal from './useModal';
import './style.less';

interface FnProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  content: React.ReactNode;
  visible: boolean;
}

const info = (config: FnProps) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function render() {
    ReactDOM.render(
      <Modal {...config} onCancel={destory}>
        {config.content}
      </Modal>,
      div,
    );
  }

  function destory() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function update() {
    render();
  }

  render();
  return {
    destory,
    update,
  };
};

export default {
  info,
  useModal,
};
