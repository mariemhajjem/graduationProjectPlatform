import ListGraduationProject from "../views/Professor/ListGraduationProject"; 
import Upgrade from "../views/admin/Upgrade.js";
import ChangePassword from "../views/Professor/ChangePassword";

var dashRoutes = [ 
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: ChangePassword,
    layout: "/professor",
  }, 
  {
    path: "/ListGraduationProject",
    name: "Graduation Projects",
    icon: "education_hat",
    component: ListGraduationProject,
    layout: "/professor",
  }, 
  { 
    path: "/login",
    name: "Sign out",
    icon: "objects_spaceship",
    component: Upgrade,
    layout: "localhost:3000",
  },
];
export default dashRoutes;
