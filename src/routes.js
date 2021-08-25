import Dashboard from "./pages/views/Dashboard";
// import UserPage from "./pages/views/UserPage.js";
// import TestPage from "./pages/views/Test.js";
import Recruit from "./pages/views/Recruit.js";
import Resume from "./pages/views/Resume.js"
import Notice from './pages/views/Notice';
import Users from './pages/views/Users.js';
import Mart from './pages/views/Mart.js';


// import LoginPage from "views/Login";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/notice",
    name: "공지사항",
    icon: "media-1_album",
    component: Notice,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "유저관리",
    icon: "users_circle-08",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/mart",
    name: "마트관리",
    icon: "design_app",
    component: Mart,
    layout: "/admin",
  },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/test-page",
  //   name: "Test Page",
  //   icon: "users_single-02",
  //   component: TestPage,
  //   layout: "/admin",
  // },
  {
    path: "/recruit",
    name: "공고 관리",
    icon: "files_single-copy-04", 
    component: Recruit,
    layout: "/admin",
  },
  {
    path: "/resume",
    name: "이력서 관리",
    icon: "files_paper",
    component: Resume,
    layout: "/admin",
  },
  // {
  //   path: "/recruit/detail",
  //   name: "Recruit Page",
  //   icon: "users_single-02",
  //   component: Recruit,
  //   layout: "/admin",
  // },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
