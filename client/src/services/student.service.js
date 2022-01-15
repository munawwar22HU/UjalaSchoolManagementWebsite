import axios from "axios";
import authHeader from "./auth-header.js";
const API_URL = "http://localhost:5000/student/";

class StudentService {
  registerStudent(student) {
    return axios.post(API_URL, student).then((response) => {
      return response.data;
    });
  }

  getAllStudents() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  deleteStudent(id) {
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
  getStudent(id) {
    return axios.get("http://localhost:5000/student/" + id);
  }
}
export default new StudentService();
