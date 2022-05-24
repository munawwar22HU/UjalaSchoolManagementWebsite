import axios from "axios";
import authHeader from "./auth-header.js";

class DonorService {
  registerDonor(student) {
    return axios.post("/donors", student, { headers: authHeader() });
  }
  getAllDonors() {
    return axios.get("/donors", { headers: authHeader() });
  }

  getDonor(id) {
    return axios.get(`/donors/${id}`);
  }
  updateDonor(id, donor) {
    return axios.put(`/donors/${id}`, donor).then((response) => {
      return response.data;
    });
  }
  deleteDonor(id) {
    return axios.delete(`/donors/${id}`);
  }

  registerDonation(donation) {
    return axios.post("/donations", donation, { headers: authHeader() });
  }
  getAllDonations() {
    return axios.get("/donations", { headers: authHeader() });
  }
  getDonation(id) {
    return axios.get(`/donations/${id}`);
  }
  updateDonation(id, donation) {
    return axios.put(`/donations/${id}`, donation).then((response) => {
      return response.data;
    });
  }
  deleteDonation(id) {
    return axios.delete(`/donations/${id}`);
  }

  getAllDonationsByDonor(id) {
    return axios.get(`/donations/all/${id}`, { headers: authHeader() });
  }
}
export default new DonorService();
