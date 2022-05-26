import axios from "axios";
import authHeader from "./auth-header.js";

class ClassService {
  getAllClasses() {
    return axios.get("/classes", { headers: authHeader() });
  }
}
export default new ClassService();
