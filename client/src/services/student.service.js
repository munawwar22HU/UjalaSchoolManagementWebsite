import axios from "axios";
import authHeader from "./auth-header.js";

class StudentService {
  registerStudent(student) {
    return axios.post("/students", student).then((response) => {
      return response.data;
    });
  }

  getAllStudents() {
    return axios.get("/students", { headers: authHeader() });
  }

  deleteStudent(id) {
    return axios.delete(`/students/${id}`, { headers: authHeader() });
  }
  getStudent(id) {
    return axios.get(`/students/${id}`);
  }
}
export default new StudentService();
