import axios from "axios";

const instance = axios.create({
  baseURL: `${envhosturl}api/`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const fetchMarketplaceListings = (data = {}, method = "POST") => instance({
  data,
  method,
  url: "marketplace/listings",
});
