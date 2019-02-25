import axios from "axios";

const instance = axios.create({
  baseURL: `${envhosturl}api/`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

const api = {
  fetchMarketplaceListings: (data = {}, method = "POST") => instance({
    data,
    method,
    url: "marketplace/listings",
  }),
  postShareListing: data => instance({
    data,
    method: "POST",
    url: "share/listing",
  }),
};

export default api;
