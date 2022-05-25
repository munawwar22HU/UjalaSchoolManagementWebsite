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
    return axios.put(`/sponsors/${id}`, sponsor).then((response) => {
      return response.data;
    });
  }
  deleteSponsor(id) {
    return axios.delete(`/sponsors/${id}`);
  }

  registerSponsorships(sponsorship) {
    return axios.post("/sponsorships", sponsorship, { headers: authHeader() });
  }
  getAllSponsorships() {
    return axios.get("/sponsorships", { headers: authHeader() });
  }
  getSponsorship(id) {
    return axios.get(`/sponsorships/${id}`);
  }
  updateSponsorship(id, sponsorship) {
    console.log("function called");
    return axios.put(
      `/sponsorships/${id}`,
      sponsorship.then((response) => {
        return response.data;
      })
    );
  }
  deleteSponsorship(id) {
    return axios.delete(`/sponsorships/${id}`);
  }

  getAllSponsorshipsBySponsor(id) {
    return axios.get(`/sponsorships/all/${id}`, { headers: authHeader() });
  }
}
export default new SponsorService();
