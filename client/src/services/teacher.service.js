import axios from "axios";
import authHeader from "./auth-header.js";

class TeacherService {
  registerTeacher(Teacher) {
    return axios.post("/Teachers", Teacher).then((response) => {
      return response.data;
    });
  }

  getAllTeachers() {
    return axios.get("/teachers", { headers: authHeader() });
  }

  deleteTeacher(id) {
    return axios.delete(`/teachers/${id}`, { headers: authHeader() });
  }
  getTeacher(id) {
    return axios.get(`/teachers/${id}`);
  }
  updateTeacher(id, Teacher) {
    return axios.put(`/teachers/${id}`, Teacher).then((response) => {
      return response.data;
    });
  }
}
export default new TeacherService();
