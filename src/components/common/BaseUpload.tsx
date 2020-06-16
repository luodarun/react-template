import React, { memo, useState, forwardRef, Fragment } from 'react';
import { Upload, Icon, Modal, notification, Button } from 'antd';
import { getFileType } from '@/utils/common';
import { requestBaseUrl, exportTemplate } from '@/config/env';
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';
function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string) || '上传成功');
    reader.onerror = error => reject(error);
  });
}
/*function checkImageWH () {
  return new Promise(() => {})
}*/

interface BaseUploadProps {
  acceptType: string;
  onChange: (data: any) => void;
  type: string;
  templateURL: string;
  maxSize?: number;
  isDetail?: boolean;
  actionName?: string;
  multipleLimit?: boolean;
  actionUrl?: string;
  numLimit?: number;
  value?: any;
}

const BaseUpload = forwardRef(
  (
    {
      multipleLimit = false,
      acceptType = '.jpeg,.png,.jpg',
      actionUrl = '',
      numLimit = 1,
      value = {},
      onChange,
      type = 'oneFile',
      maxSize = 2,
      isDetail = false,
      actionName,
      templateURL,
    }: BaseUploadProps,
    refs: React.Ref<HTMLDivElement>,
  ) => {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [fileList, setFileList] = useState(value.fileList || []);
    const [formData, setFormData] = useState(value.formData || new FormData());

    function triggerChange(changedValue: {
      formData: FormData;
      fileList: Array<UploadFile<any>>;
    }) {
      if (onChange) {
        onChange(Object.assign({}, { fileList, formData }, changedValue));
      }
    }

    const beforeUpload = (file: File) => {
      const acceptTypeArray = acceptType.split(',');
      const isType = acceptTypeArray.indexOf(getFileType(file.name)) < 0;
      if (isType) {
        notification.error({
          message: '提示',
          description: `只能上传格式为${acceptTypeArray
            .map(item => item.substring(1))
            .join('或')}的文件!`,
          duration: 2,
        });
      }
      const isLt = file.size / 1024 / 1024 < maxSize;
      if (!isLt) {
        notification.error({
          message: '提示',
          description: `文件最大为${maxSize}MB!`,
          duration: 2,
        });
      }
      if (type !== 'oneFile' && !isType && isLt) {
        getBase64(file)
          .then((res: string) => {
            setPreviewImage(res);
          })
          .catch();
      }
      return false;
    };

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: UploadFile<any>) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as File);
      }
      setPreviewImage((file.url as string) || (file.preview as string));
      setPreviewVisible(true);
    };

    const handleChange = (data: UploadChangeParam<UploadFile<any>>) => {
      const file = data.file;
      const selfFileList: Array<UploadFile<any>> = data.fileList;
      if (selfFileList.length > fileList.length) {
        const acceptTypeArray = acceptType.split(',');
        const isType =
          acceptTypeArray.indexOf(
            getFileType(selfFileList[selfFileList.length - 1].name),
          ) < 0;
        const isLt =
          selfFileList[selfFileList.length - 1].size / 1024 / 1024 < maxSize;
        if (isType || !isLt) {
          // 新加的这个数据不对
          selfFileList.pop();
        }
      }
      setFileList(selfFileList);
      if (selfFileList.length > 0) {
        formData.append('file', file);
        setFormData(formData);
        triggerChange({ formData, fileList: selfFileList });
      } else {
        setFormData(new FormData());
        triggerChange({ formData: new formData(), fileList: [] });
      }
    };

    const uploadButton = () =>
      type === 'onePicture' ? (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">{actionName || 'Upload'}</div>
        </div>
      ) : (
        <Button type="primary">{actionName || '上传'}</Button>
      );

    return (
      <Fragment>
        <div
          className="clearfix"
          style={{ display: 'inline-block' }}
          ref={refs}
        >
          <Upload
            action={actionUrl}
            beforeUpload={beforeUpload}
            listType={type === 'onePicture' ? 'picture-card' : 'text'}
            name="file"
            accept={acceptType}
            multiple={multipleLimit}
            disabled={isDetail}
            fileList={'fileList' in value ? value.fileList : fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {('fileList' in value ? value.fileList : fileList).length >=
            numLimit
              ? null
              : uploadButton()}
          </Upload>
          {type !== 'oneFile' && (
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          )}
        </div>
        {templateURL ? (
          <a
            href={`${requestBaseUrl}${exportTemplate}${templateURL}`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="download-template"
          >
            下载表格示例
          </a>
        ) : (
          ''
        )}
      </Fragment>
    );
  },
);

export default memo(BaseUpload);
