import axios from "axios";

class CertificateService {
  registerCertificate(certificate) {
    return axios.post("/certificates", certificate);
  }
  getAllCertificates() {
    return axios.get("/certificates");
  }

  deleteCertificate(id) {
    return axios.delete(`/certificates/${id}`);
  }
  getCertificate(id) {
    return axios.get(`/certificates/${id}`);
  }
  updateCertificate(id, certficate) {
    return axios.put(`/certificates/${id}`, certficate).then((response) => {
      return response.data;
    });
  }
}
export default new CertificateService();
