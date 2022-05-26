import axios from "axios";
import authHeader from "./auth-header.js";

class StudentService {
  registerStudent(student) {
    return axios.post("/students", student, { headers: authHeader() });
  }

  getAllStudents() {
    return axios.get("/students", { headers: authHeader() });
  }
  getAllActiveStudents() {
    return axios.get("/students/active", { headers: authHeader() });
  }

  deleteStudent(id) {
    return axios.delete(`/students/${id}`, { headers: authHeader() });
  }
  getStudent(id) {
    return axios.get(`/students/${id}`);
  }
  updateStudent(id, student) {
    return axios.put(`/students/${id}`, student).then((response) => {
      return response.data;
    });
  }
  getStudentsInClass(id) {
    return axios.get(`/students/class/${id}`);
  }
}
export default new StudentService();
