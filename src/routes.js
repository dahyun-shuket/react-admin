import Dashboard from "./pages/views/Dashboard";
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// import TableList from "views/TableList.js";
// import Maps from "views/Maps.js";
// import Upgrade from "views/Upgrade.js";
import UserPage from "./pages/views/UserPage.js";
import TestPage from "./pages/views/Test.js";
import Recruit from "./pages/views/Recruit.js";
import Resume from "./pages/views/Resume.js"


// import LoginPage from "views/Login";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "login",
  //   name: "login",
  //   icon: "design_app",
  //   component: LoginPage,
  //   exact:true,
  //   layout: "/",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/test-page",
    name: "Test Page",
    icon: "users_single-02",
    component: TestPage,
    layout: "/admin",
  },
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
