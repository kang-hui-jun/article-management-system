import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  SecurityScanOutlined,
  UnlockOutlined,
  UsergroupAddOutlined,
  ReadOutlined,
  SolutionOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
const menus = [
  {
    title: "首页",
    path: "/home",
    icon: HomeOutlined,
    permission: 1,
  },
  {
    title: "用户管理",
    path: "/user-manage",
    icon: UserOutlined,
    permission: 3,
    children: [
      {
        title: "用户列表",
        path: "/user-manage/users",
        icon: TeamOutlined,
        permission: 3,
      },
    ],
  },
  {
    title: "权限管理",
    path: "/right-manage",
    icon: UnlockOutlined,
    permission: 3,
    children: [
      {
        title: "角色列表",
        path: "/right-manage/roles",
        icon: UsergroupAddOutlined,
        permission: 3,
      },
      {
        title: "权限列表",
        path: "/right-manage/rights",
        icon: SecurityScanOutlined,
        permission: 3,
      },
    ],
  },

  {
    title: "文章管理",
    path: "/article-manage",
    icon: ProfileOutlined,
    permission: 1,
    children: [
      {
        title: "文章列表",
        path: "/article-manage/list",
        icon: ReadOutlined,
        permission: 1,
      },
      {
        title: "文章分类",
        path: "/article-manage/category",
        icon: SolutionOutlined,
        permission: 2,
      },
    ],
  },
];

export default menus;
