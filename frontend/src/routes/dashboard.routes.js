import Student from "../screens/dashboard/student/";
import Teacher from "../screens/dashboard/teacher/";
import Index from "../screens/";
import notFound from '../screens/404'

const index = {
  path: "/",
  hidden: false,
  private: false,
  name: "Home",
  component: Index,
};
const notfound = {
  path: "*",
  hidden: true,
  private: false,
  name: "Page not found",
  component: notFound,
};
const student = {
  path: "/student",
  hidden: true,
  private: false,
  name: "Dashboard student",
  component: Student,
};
const teacher = {
  path: "/teacher",
  hidden: true,
  private: false,
  name: "Dashboard teacher",
  component: Teacher,
};

export default [student, index, teacher,notfound];
