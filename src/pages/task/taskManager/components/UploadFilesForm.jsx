import { Upload, Button, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useSafeState } from 'ahooks';
// import { Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';

import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '@/atoms/login';

import paramConfig from '@/config/params';

import {
  // taskMajorStepAtom,
  // taskSubStepAtom,
  // taskMajorFlowAtom,
  // taskSubFlowAtom,
  taskFileFeatureAtom,
  taskCodeIndexAtom,
} from '../atoms';

// const getStepFromCode = (code,step = 100) => {
//   return [Math.floor(code / step) - 1,(code % step) - 1]
// }

// const getCodeFromStep = (mainStep,subStep,step = 100) => {
//   return (mainStep + 1) * step + subStep + 1;
// }

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadFilesForm = function (props) {
  const { record } = props;
  const user = useRecoilValue(loginStateAtom);
  const [imagefileList, setImageFileList] = useSafeState([]);
  const [fileList, setFileList] = useSafeState([]);

  // const curSubStep = useRecoilValue(taskSubStepAtom);
  // const curMainStep = useRecoilValue(taskMajorStepAtom);
  // const majorFlows = useRecoilValue(taskMajorFlowAtom);
  // const subFlows = useRecoilValue(taskSubFlowAtom);
  const fileFeature = useRecoilValue(taskFileFeatureAtom);
  const codeIndex = useRecoilValue(taskCodeIndexAtom);

  const [previewState, setPreviewState] = useSafeState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  });

  const onImageFileChange = ({ fileList: newFileList }) => {
    setImageFileList(newFileList);
  };

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleCancel = () => setPreviewState({ previewVisible: false });

  return (
    <ProCard split="vertical">
      <ProCard title="??????????????????" colSpan="40%">
        <Upload
          action={`${paramConfig.requestBaseUrl}/file`}
          directory
          progress={{
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d069',
            },
            strokeWidth: 3,
            format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
          }}
          headers={{
            authorization: `Bearer ${localStorage.getItem('xplat-token')}`,
          }}
          data={{
            // ?????????????????????
            uploaderAccount: user.account,
            uploaderName: user.name,
            codeIndex,
            category: record?.domainClassification,
            feature: fileFeature,
            dbtype: 'task',
            refId: record.id,
          }}
        >
          <Button icon={<UploadOutlined />}>???????????????????????????</Button>
        </Upload>
      </ProCard>
      <ProCard title="??????????????????" colSpan="60%">
        <ImgCrop rotate>
          <Upload
            listType="picture-card"
            headers={{
              authorization: `Bearer ${localStorage.getItem('xplat-token')}`,
            }}
            data={{
              // ?????????????????????
              uploaderAccount: user.account,
              uploaderName: user.name,
              codeIndex,
              category: record?.domainClassification,
              feature: fileFeature,
              dbtype: 'task',
              refId: record.id,
            }}
            action={`${paramConfig.requestBaseUrl}/file`}
            fileList={imagefileList}
            onChange={onImageFileChange}
            onPreview={onPreview}
            progress={{
              strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
              },
              strokeWidth: 3,
              format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
            }}
          >
            {fileList.length < 5 && '+ ??????????????????'}
          </Upload>
        </ImgCrop>
        <Modal
          visible={previewState.previewVisible}
          title={previewState.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img style={{ width: '100%' }} src={previewState.previewImage} />
          {/* <Image width={200} src={previewState.previewImage} /> */}
          {/* <ProForm >
                <ProFormTextArea
                  name="remark"
                  row={4}
                  label="????????????"
                  placeholder="?????????????????????????????????????????????"
                />
              </ProForm> */}
        </Modal>
      </ProCard>
    </ProCard>
  );
};

export default UploadFilesForm;
