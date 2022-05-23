import axios from "axios";

class FeesService {
  createVoucher(voucher) {
    return axios.post("/fees", voucher);
  }
  generateAll(voucher) {
    return axios.post("/fees/generate-all", voucher);
  }
  getAllVouchers() {
    return axios.get("/fees");
  }
  getAllPaidVouchers(id) {
    return axios.get(`/fees/paid/${id}`);
  }
  getAllUnpaidVouchers(id) {
    return axios.get(`/fees/unpaid/${id}`);
  }

  deleteVoucher(id) {
    return axios.delete(`/fees/${id}`);
  }
  getVoucher(id) {
    return axios.get(`/fees/${id}`);
  }
  updateVoucher(id, voucher) {
    return axios.put(`/fees/${id}`, voucher).then((response) => {
      return response.data;
    });
  }
}
export default new FeesService();
