import axios from "axios";
import authHeader from "./auth-header.js";

class SponsorService {
  registerSponsor(sponsor) {
    return axios.post("/sponsors", sponsor, { headers: authHeader() });
  }
  getAllSponsors() {
    return axios.get("/sponsors", { headers: authHeader() });
  }

  getSponsor(id) {
    return axios.get(`/sponsors/${id}`);
  }
  updateSponsor(id, sponsor) {
    return axios
      .put(`/sponsors/${id}`, sponsor, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  deleteSponsor(id) {
    return axios.delete(`/sponsors/${id}`);
  }

  getAllSponsorshipsBySponsor(id) {
    return axios.get(`/stships/all/${id}`, { headers: authHeader() });
  }
}
export default new SponsorService();
