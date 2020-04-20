import React, { useReducer, useEffect, useCallback } from 'react';
import Modal from './Modal';
import ReactDOM from 'react-dom';

interface ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  content?: React.ReactNode;
  visible: boolean;
}

interface Config {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  content?: React.ReactNode;
  visible?: boolean;
}

interface IProps extends ModalProps {
  onOk: () => void;
}

interface FooterProps {
  onOk: () => void;
  onCancel: () => void;
}

let div: HTMLElement;

const DefaultFooter: React.FC<FooterProps> = ({ onOk, onCancel }) => {
  return (
    <>
      <button className="modal-cancel" onClick={onCancel}>
        取消
      </button>
      <button className="modal-ok" onClick={onOk}>
        确定
      </button>
    </>
  );
};

const useModal = ({
  visible = false,
  content = '',
  header = 'header',
  footer = DefaultFooter,
  onOk = () => {},
}: IProps) => {
  const reducer = (
    state: ModalProps,
    action: { type: string; payload: any },
  ) => {
    switch (action.type) {
      case 'SET_VISIBLE':
        return { ...state, visible: action.payload };
      case 'SET_CONTENT':
        return { ...state, content: action.payload };
      case 'SET_HEADER':
        return { ...state, header: action.payload };
      case 'SET_FOOTER':
        return { ...state, footer: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    visible,
    content,
    header,
    footer,
  });

  const updateHeader = useCallback(
    (header: React.ReactNode) => {
      dispatch({ type: 'SET_HEADER', payload: header });
    },
    [dispatch],
  );

  const updateFooter = useCallback(
    (footer: React.ReactNode) => {
      dispatch({ type: 'SET_FOOTER', payload: footer });
    },
    [dispatch],
  );

  const updateContent = useCallback(
    (content: React.ReactNode) => {
      dispatch({ type: 'SET_CONTENT', payload: content });
    },
    [dispatch],
  );

  const updateVisible = useCallback(
    (visible: boolean) => {
      dispatch({ type: 'SET_VISIBLE', payload: visible });
    },
    [dispatch],
  );

  const handleModal = useCallback(
    (config: Config) => {
      if (typeof config.visible === 'boolean') {
        updateVisible(config.visible);
      }
      if (config.content) {
        updateContent(config.content);
      }
      if (config.header) {
        updateHeader(config.header);
      }
      if (config.footer) {
        updateFooter(config.footer);
      }
    },
    [updateVisible, updateContent, updateFooter, updateHeader],
  );

  const destory = useCallback(() => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }, [div]);

  const open = useCallback(() => {
    updateVisible(true);
  }, [updateVisible]);

  const close = useCallback(() => {
    updateVisible(false);
  }, [updateVisible]);

  useEffect(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
    return destory;
  }, []);

  useEffect(() => {
    ReactDOM.render(
      <Modal
        {...state}
        footer={
          <DefaultFooter
            onOk={() => {
              onOk();
              close();
            }}
            onCancel={close}
          />
        }
        onCancel={() => updateVisible(false)}
      >
        {state.content}
      </Modal>,
      div,
    );
  }, [state]);

  return { destory, handleModal, open, close };
};

export default useModal;
