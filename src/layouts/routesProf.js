import ListGraduationProject from "../views/Professor/ListGraduationProject";  
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
];
export default dashRoutes;
