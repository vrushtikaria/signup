import axios from "axios";

const Service_Url='https://api.shilpimultiplex.com/api'
///Auth/CreateUser


class DataService {
  createUser(user) {
    return axios.post(Service_Url + "/Auth/CreateUser", user);
  }
  sendOTP(user){
    return axios.post(Service_Url + "/Auth/SendOtp?uid="+ "a81c54b9-b10d-428f-b721-9398a97af022");
  }
}

export default new DataService();