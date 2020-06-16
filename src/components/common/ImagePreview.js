import React, { memo, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '@/components/common/BaseModal';
import { requestBaseUrl, imagesAddress, imagesAddress2 } from '@/config/env';

function ImagePreview(props) {
  const { text, isFeishou } = props;
  const [modalFlag, setModalFlag] = useState();

  return (
    <Fragment>
      {text && text !== 'test' ? (
        <img
          alt="缩略图"
          onClick={() => setModalFlag(true)}
          src={`${requestBaseUrl.substring(0, 14)}${
            isFeishou === '1' ? imagesAddress2 : imagesAddress
          }${text}`}
          style={{ height: '64px', width: '64px', cursor: 'pointer' }}
        />
      ) : (
        '暂无'
      )}
      <BaseModal
        modalTitle="图片预览"
        modalVisible={modalFlag}
        hideModal={() => setModalFlag(false)}
        closable={true}
        noFooter={true}
      >
        <img
          alt="原图"
          src={`${requestBaseUrl.substring(0, 14)}${
            isFeishou === '1' ? imagesAddress2 : imagesAddress
          }${text}`}
          style={{ width: '100%' }}
        />
      </BaseModal>
    </Fragment>
  );
}
ImagePreview.propTypes = {
  text: PropTypes.string,
  isFeishou: PropTypes.string,
};
export default memo(ImagePreview);
