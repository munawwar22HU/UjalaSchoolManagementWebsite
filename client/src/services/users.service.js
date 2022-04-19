import axios from "axios";

class UserService {
  registerUser(user) {
    return axios.post("/admin/create", user).then((response) => {
      return response.data;
    });
  }
  getAllUsers(id) {
    return axios.get(`/admin/all/${id}`);
  }
  deleteUser(id) {
    return axios.delete(`/admin/${id}`);
  }
  getUser(id) {
    return axios.get(`/admin/${id}`);
  }
  updateUser(id, user) {
    return axios.put(`/admin/${id}`, user).then((response) => {
      return response.data;
    });
  }
}
export default new UserService();
