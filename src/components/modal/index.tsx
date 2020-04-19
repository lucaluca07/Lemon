import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import './style.less';

const info = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function render() {
    ReactDOM.render(<Modal>Modal</Modal>, div);
  }

  function destory() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    // const triggerCancel = args.some(param => param && param.triggerCancel);
    // if (config.onCancel && triggerCancel) {
    //   config.onCancel(...args);
    // }
    // for (let i = 0; i < destroyFns.length; i++) {
    //   const fn = destroyFns[i];
    //   // eslint-disable-next-line no-use-before-define
    //   if (fn === close) {
    //     destroyFns.splice(i, 1);
    //     break;
    //   }
    // }
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
};
