import Dashboard from "../views/admin/Dashboard";
import AcademicYear from "../views/admin/AcademicYear"; 
import ProfessorList from "../views/admin/ProfessorList.js";
import GraduationProjects from "../views/admin/GraduationProjects.js";
import StudentList from "../views/admin/StudentList.js";  

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "business_chart-bar-32",
    component: Dashboard,
    layout: "/admin",
  }, 
  {
    path: "/AcademicYear",
    name: "Academic Year",
    icon: "ui-1_calendar-60",
    component: AcademicYear,
    layout: "/admin",
  },
  ,
  {
    path: "/StudentList",
    name: "Student List",
    icon: "business_badge",
    component: StudentList,
    layout: "/admin",
  },
  {
    path: "/GraduationProjects",
    name: "Graduation Projects",
    icon: "education_hat",
    component: GraduationProjects,
    layout: "/admin",
  },
  {
    path: "/ProfessorList",
    name: "Professor List",
    icon: "business_briefcase-24",
    component: ProfessorList,
    layout: "/admin",
  } 
];
export default dashRoutes;
