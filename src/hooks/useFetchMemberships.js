import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  useEffect(() => {
    apiClient.get("/memberships").then((res) => setMemberships(res.data));
  }, []);

  return memberships;
};

export default useFetchMemberships;
