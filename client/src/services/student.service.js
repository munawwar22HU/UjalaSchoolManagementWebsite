import axios from "axios";
import authHeader from "./auth-header.js";

class StudentService {
  registerStudent(student) {
    return axios.post("/student", student).then((response) => {
      return response.data;
    });
  }

  getAllStudents() {
    return axios.get("/student", { headers: authHeader() });
  }

  deleteStudent(id) {
    return axios.delete(`/student/${id}`, { headers: authHeader() });
  }
  getStudent(id) {
    return axios.get(`/student/${id}`);
  }
}
export default new StudentService();
