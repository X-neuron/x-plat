import { useRef } from "react";
import { Button, message, TreeSelect, Popconfirm,Form} from "antd";

// import ProCard from '@ant-design/pro-card';
import { Suspense } from "react";
import ProForm, {
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
  ProFormList,
} from "@ant-design/pro-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { useCreation, useSafeState, useUpdate, useUpdateEffect } from "ahooks";
import _ from "lodash";
import PageLoading from "@/components/PageLoading";
import BraftEditor from "braft-editor"
import "braft-editor/dist/index.css"
import { createPost } from "../service";


const Post = function (props) {

  // const [state,setState] = useSafeState({
  //   editorState: null
  // });

  // const submitContent = async () => {
  //   // Pressing ctrl + s when the editor has focus will execute this method
  //   // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
  //   // const htmlContent = state.editorState.toHTML()
  //   // const result = await saveEditorContent(htmlContent)
  // }

  // const handleEditorChange = (editorState) => {
  //   setState({ editorState })
  // }

  return (
    <ProForm
      layout="horizontal"
      // wrapperCol={{ span: 4}}
      labelCol={{ span: 4}}
      onFinish={async (values) => {

        const res = await createPost({
          ...values,
          cardDetailedText: values.cardDetailedText.map((item) => item.text)
          // cardDetailedText:
          // cardDetailedText:state.editorState.toHTML(),
        });
        if(res.data){
          message.success("提交成功");
        }else{
          message.error("提交失败")
        }
      }}
      initialValues={{}}
    >
      <ProFormText
        name="title"
        required={true}
        label="时间轴标题"
        placeholder="如果您有功能需求，或的建议，欢迎反馈/提交"
      />
      {/* <ProFormDatePicker
        name="titile"
        required={true}
        label="时间"
        // placeholder="某专项对该项目的编号"
      /> */}
      <ProFormText
        name="cardTitle"
        label="卡片标题"
        placeholder="某专项对该项目的编号"
      />
      <ProFormText
        name="cardSubtitle"
        label="卡片子标题"
        placeholder="某专项对该项目的编号"
      />
      <ProFormList
        name="cardDetailedText"
        label="内容"
        rules={[
          {
            validator: async ( _, value) => {
              if (value && value.length > 0) {
                return;
              }
              throw new Error("至少要有一项！");
            },
          },
        ]}
        creatorButtonProps={{
          position: "bottom",
        }}

      >
        {/* <ProFormGroup> */}
        <ProFormTextArea
          width="lg"
          name="text"
          // row={10}
          label="段落"
          placeholder="提出您的改进建议"
        />
        {/* </ProFormGroup> */}
      </ProFormList>

      {/* <ProFormTextArea
        name="cardDetailedText"
        row={10}
        label="内容"
        placeholder="提出您的改进建议"
      /> */}
      {/* <Form.Item name="context" >
        <Editor />
      </Form.Item> */}
      {/* <BraftEditor
        value={state.editorState}
        onChange={handleEditorChange}
        // onSave={() => submitContent}
      /> */}
    </ProForm>
  );
};

export default Post;
