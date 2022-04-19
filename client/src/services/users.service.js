import axios from "axios";

class UserService {
  registerUser(user) {
    return axios.post("/admins/create", user).then((response) => {
      return response.data;
    });
  }
  getAllUsers(id) {
    return axios.get(`/admins/all/${id}`);
  }
  deleteUser(id) {
    return axios.delete(`/admins/${id}`);
  }
  getUser(id) {
    return axios.get(`/admins/${id}`);
  }
  updateUser(id, user) {
    return axios.put(`/admins/${id}`, user).then((response) => {
      return response.data;
    });
  }
}
export default new UserService();
