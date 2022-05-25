import axios from "axios";
import authHeader from "./auth-header.js";

class SponsorshipService {
  registerSponsorship(sponsorship) {
    return axios.post("/stships", sponsorship, { headers: authHeader() });
  }

  getAllSponsorships() {
    return axios.get("/stships", { headers: authHeader() });
  }
  getSponsorship(id) {
    return axios.get(`/stships/${id}`);
  }
  updateSponsorship(id, sponsorship) {
    return axios
      .put(`/stships/${id}`, sponsorship, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  deleteSponsorship(id) {
    return axios.delete(`/stships/${id}`);
  }

  getAllSponsorshipsBySponsor(id) {
    return axios.get(`/stships/all/${id}`, { headers: authHeader() });
  }
}

export default new SponsorshipService();
