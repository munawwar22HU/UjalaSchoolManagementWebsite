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
export default new SponsorService();
