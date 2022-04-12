import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message } from 'antd';
import { Trans } from '@lingui/macro';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginStateAtom } from '@/atoms/login';
import { accessAtom } from '@/atoms/access';
import { logout } from '@/service';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const newConfig = [
  {
    name: '微前端',
    path: '/micro',
    icon: 'PaperClipOutlined',
    children: [
      {
        name: 'vue2测试',
        path: 'vue2/*',
        component: 'http://192.9.209.45:8004', // 微前端配置
      },
    ],
  },
];

const AvatarDropdown = function (props) {
  const { menu } = props;
  const [login, setLogin] = useRecoilState(loginStateAtom);
  const [access, setAccess] = useRecoilState(accessAtom);
  const navigate = useNavigate();
  const handleChangeRole = () => {
    setAccess({
      microOpen: true,
      test1Open: true,
      test4Open: true,
      logionPermit: true,
      // 'example': role === 'admin',
      // 'example2': some => some.prop === 'test'
    });
    setLogin({
      ...login,
      route:newConfig
    })
    navigate(newConfig[0].path, { replace: true });
  };

  const userLogout = async () => {

    const res = await logout();
    if(res.data){
      setLogin({
        ...login,
        isLogin:false
      });
      message.info("登出账号成功");
    }else{
      message.error("登出账号失败，资源冲突");
    }
    localStorage.removeItem('xplat-token');
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item key="changeRole" onClick={() => handleChangeRole()}>
        <UserOutlined />
        <Trans>切换角色--for测试</Trans>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={() => userLogout()}>
        <LogoutOutlined />
        <Trans>退出登录</Trans>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          style={{ backgroundColor: '#ffbf00', verticalAlign: 'middle' }}
          alt="avatar"
        >
          {login.account}
        </Avatar>
        {/* <span className={`${styles.name} anticon`}>{login.account}</span> */}
      </span>
    </HeaderDropdown>
  );

  // return currentUser && currentUser.name ? (
  //   <HeaderDropdown overlay={<MenuHeaderDropdown />}>
  //     <span className={`${styles.action} ${styles.account}`}>
  //       <Avatar size="small" className={styles.avatar} style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} alt="avatar" >
  //         {login.account}
  //       </Avatar>
  //       {/* <span className={`${styles.name} anticon`}>{useName}</span> */}
  //     </span>
  //   </HeaderDropdown>
  // ) : (
  //   <span className={`${styles.action} ${styles.account}`}>
  //     <Spin
  //       size="small"
  //       style={{
  //         marginLeft: 8,
  //         marginRight: 8,
  //       }}
  //     />
  //   </span>
  // );
};

export default AvatarDropdown;
