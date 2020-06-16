/*eslint-disable*/
import React, { memo, ReactNode } from 'react';
import { Modal, Button } from 'antd';
interface BaseModalProps {
  modalTitle: string;
  modalVisible: boolean;
  children: ReactNode;
  hideModal: Function;
  modalWidth?: number;
  modalOk?: string;
  noContinue?: boolean;
  closable?: boolean;
  noFooter?: boolean;
}
function BaseModal(props: BaseModalProps) {
  const {
    modalTitle,
    modalVisible = false,
    modalWidth = 900,
    children,
    modalOk = '确认',
    hideModal,
    noContinue = false,
    closable = false,
    noFooter = false,
  } = props;

  const hideModal2 = () => {
    hideModal('close');
  };
  const hideSuccessModal = () => {
    hideModal('confirm');
  };

  const moreSuccess = () => {
    hideModal('more');
  };

  return (
    <Modal
      title={modalTitle}
      width={modalWidth}
      visible={modalVisible}
      closable={closable}
      maskClosable={false}
      destroyOnClose={true}
      onCancel={hideModal2}
      footer={
        noFooter
          ? ''
          : noContinue
          ? [
              <Button key="back" onClick={hideModal2}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={hideSuccessModal}>
                {modalOk}
              </Button>,
            ]
          : [
              <Button key="back" onClick={hideModal2}>
                取消
              </Button>,
              <Button key="more" onClick={moreSuccess}>
                继续添加
              </Button>,
              <Button key="submit" type="primary" onClick={hideSuccessModal}>
                {modalOk}
              </Button>,
            ]
      }
    >
      {children}
    </Modal>
  );
}

export default memo(BaseModal);
