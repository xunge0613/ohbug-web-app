import React from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import OSS from 'ali-oss';

import api from '@/api';

interface UploadImageProps {
  children: React.ReactNode;
  callback?: (url: string) => void;
}
const UploadImage: React.FC<UploadImageProps> = ({ children, callback }) => {
  const [OSSData, setOSSData] = React.useState<any>();
  const [fileList, setFileList] = React.useState([]);
  const handleChange = React.useCallback((file) => {
    // @ts-ignore
    setFileList([file.fileList[file.fileList.length - 1]]);
  }, []);

  const init = React.useCallback(async () => {
    try {
      const data = await api.auth.sts();
      setOSSData(data);
    } catch (e) {
      message.error(e);
    }
  }, []);
  const beforeUpload = React.useCallback(async () => {
    if (!OSSData) {
      await init();
    }
    return true;
  }, []);
  const customRequest = React.useCallback(
    async (file) => {
      try {
        const client = new OSS(OSSData);
        const uid = file.file.uid.split('rc-upload-')[1];
        const result = await client.put(`organization/${uid}`, file.file);
        if (result.url) {
          // eslint-disable-next-line no-unused-expressions
          callback?.(result.url);
          file.onSuccess();
        }
      } catch (e) {
        file.onError(e);
      }
    },
    [OSSData, callback],
  );

  return (
    <ImgCrop shape="round" rotate>
      <Upload
        accept=".jpg, .jpeg, .png, .gif"
        fileList={fileList}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={beforeUpload as any}
        showUploadList={false}
      >
        {children}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;
