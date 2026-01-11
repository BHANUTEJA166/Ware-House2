import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getGodownsByWarehouse = async (warehouseId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/godowns`, {
      params: { warehouseId }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching godowns:", error);
    return [];
  }
};
