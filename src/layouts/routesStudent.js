 
import GraduationProject from "../views/Student/GraduationProject";  
import ChangePassword from "../views/Student/ChangePassword";

var dashRoutes = [ 
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: ChangePassword,
    layout: "/student",
  }, 
  {
    path: "/GraduationProjects",
    name: "Graduation Projects",
    icon: "education_hat",
    component: GraduationProject,
    layout: "/student",
  },  
];
export default dashRoutes;
