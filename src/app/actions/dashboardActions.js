import axios from "axios";

export const fetchDashboardMetrics = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_DASHBOARD_REQUEST" });

    try {
      const res = await axios.get("/data/warehouses.json");

      dispatch({
        type: "FETCH_DASHBOARD_SUCCESS",
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: "FETCH_DASHBOARD_FAILURE",
        payload: error.message
      });
    }
  };
};
