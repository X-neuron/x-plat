import { useSafeState } from 'ahooks';
import { Switch } from 'antd';
import { updateTaskFileMess } from '../service';

const MySwitch = function (props) {
  const { record, valueKey } = props;
  const [check, setCheck] = useSafeState();

  const changeHandle = async (e) => {
    const res = await updateTaskFileMess(record.tasks[0]?.id, record.id, {
      [`${valueKey}`]: e.toString(),
    });
    if (res.data) {
      setCheck(e);
    } else {
      message.info('服务器响应失败！');
    }
  };

  return (
    <Switch
      {...props}
      defaultChecked={record[`${valueKey}`]}
      onChange={changeHandle}
      checked={check}
    />
  );
};

export default MySwitch;
