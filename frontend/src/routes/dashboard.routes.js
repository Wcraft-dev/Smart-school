import Student from "../screens/dashboard/student/";
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

export default [student, index, notfound];
