import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://virtserver.swaggerhub.com/vanessakovalsky/BoardgamesV3/1.1.3",
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosInstance;