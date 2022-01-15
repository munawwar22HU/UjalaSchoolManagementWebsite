import axios from "axios";
const API_URL = "http://localhost:5000/auth/";
class AuthService {
    login(user) {
    return axios
      .post(API_URL + "signin", user
      )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
       
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
   getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();

