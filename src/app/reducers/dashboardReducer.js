const initialState = {
  loading: false,
  metrics: {
    reservations: 0,
    pendingReservations: 0,
    allocations: 0,
    inward: 0,
    outward: 0
  },
  error: null
};

const DASHBOARD_REQUEST = "DASHBOARD_REQUEST";
const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
const DASHBOARD_FAILURE = "DASHBOARD_FAILURE";

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return { ...state, loading: true };

    case DASHBOARD_SUCCESS:
      return {
        loading: false,
        metrics: action.payload,
        error: null
      };

    case DASHBOARD_FAILURE:
      return {
        loading: false,
        metrics: state.metrics,
        error: action.payload
      };

    default:
      return state;
  }
};

/* STATIC API ACTIONS */
export const fetchDashboardMetrics = () => {
  return async (dispatch) => {
    dispatch({ type: DASHBOARD_REQUEST });

    try {
      const res = await fetch("/data/warehouses.json");
      const data = await res.json();

      // Calculate metrics from single JSON file
      const reservations = data.reservations || [];
      const allocations = data.stackAllocations || [];
      const receipts = data.stockReceipts || [];
      const issues = data.stockIssues || [];

      dispatch({
        type: DASHBOARD_SUCCESS,
        payload: {
          reservations: reservations.length,
          pendingReservations: reservations.filter(r => r.status === "PENDING").length,
          allocations: allocations.length,
          inward: receipts.length,
          outward: issues.length
        }
      });
    } catch (err) {
      console.error("Dashboard metrics error:", err);
      dispatch({
        type: DASHBOARD_FAILURE,
        payload: "Failed to load dashboard data"
      });
    }
  };
};










// const initialState = {
//   loading: false,
//   metrics: {
//     reservations: 0,
//     pendingReservations: 0,
//     allocations: 0,
//     inward: 0,
//     outward: 0
//   },
//   error: null
// };

// const DASHBOARD_REQUEST = "DASHBOARD_REQUEST";
// const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
// const DASHBOARD_FAILURE = "DASHBOARD_FAILURE";

// export const dashboardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case DASHBOARD_REQUEST:
//       return { ...state, loading: true };

//     case DASHBOARD_SUCCESS:
//       return {
//         loading: false,
//         metrics: action.payload,
//         error: null
//       };

//     case DASHBOARD_FAILURE:
//       return {
//         loading: false,
//         metrics: state.metrics,
//         error: action.payload
//       };

//     default:
//       return state;
//   }
// };

// /* ACTIONS */

// export const fetchDashboardMetrics = () => {
//   return async (dispatch) => {
//     dispatch({ type: DASHBOARD_REQUEST });

//     try {
//       const [
//         reservations,
//         allocations,
//         receipts,
//         issues
//       ] = await Promise.all([
//         fetch("http://localhost:5000/reservations").then(r => r.json()),
//         fetch("http://localhost:5000/stackAllocations").then(r => r.json()),
//         fetch("http://localhost:5000/stockReceipts").then(r => r.json()),
//         fetch("http://localhost:5000/stockIssues").then(r => r.json())
//       ]);

//       dispatch({
//         type: DASHBOARD_SUCCESS,
//         payload: {
//           reservations: reservations.length,
//           pendingReservations: reservations.filter(r => r.status === "PENDING").length,
//           allocations: allocations.length,
//           inward: receipts.length,
//           outward: issues.length
//         }
//       });
//     } catch (err) {
//       dispatch({
//         type: DASHBOARD_FAILURE,
//         payload: err.message
//       });
//     }
//   };
// };
