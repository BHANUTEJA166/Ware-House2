// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthContext } from "../app/App";

// import Login from "../pages/auth/Login";
// import AdminDashboard from "../pages/dashboards/AdminDashboard";
// import WarehouseDashboard from "../pages/dashboards/WarehouseDashboard";
// import InspectorDashboard from "../pages/dashboards/InspectorDashboard";
// import Unauthorized from "../pages/error/Unauthorized";
// import NotFound from "../pages/error/NotFound";

// import WarehouseList from "../pages/warehouses/WarehouseList";
// import WarehouseDetails from "../pages/warehouses/WarehouseDetails";
// import GodownList from "../pages/structure/GodownList";
// import CompartmentList from "../pages/structure/CompartmentList";
// import StackList from "../pages/structure/StackList";

// import ReservationList from "../pages/reservations/ReservationList";
// import ReservationDetails from "../pages/reservations/ReservationDetails";

// import AllocationList from "../pages/stackAllocation/AllocationList";
// import AllocationCreate from "../pages/stackAllocation/AllocationCreate";

// import ReceiptTokenList from "../pages/stockReceipt/ReceiptTokenList";
// import ReceiptCreate from "../pages/stockReceipt/ReceiptCreate";
// import ReceiptDetails from "../pages/stockReceipt/ReceiptDetails";

// import IssueTokenList from "../pages/stockIssue/IssueTokenList"
// import IssueCreate from "../pages/stockIssue/IssueCreate"
// import IssueDetails from "../pages/stockIssue/IssueDetails"

// import MainLayout from "../components/layout/MainLayout";

// const AppRoutes = () => {
//   const { isLoggedIn, role } = useContext(AuthContext);

//   if (!isLoggedIn) {
//     return (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     );
//   }

//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         {/* DASHBOARDS */}
//         {role === "ADMIN" && (
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         )}
//         {role === "MANAGER" && (
//           <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
//         )}
//         {role === "INSPECTOR" && (
//           <Route path="/inspector/dashboard" element={<InspectorDashboard />} />
//         )}

//         {/* MASTER DATA */}
//         <Route path="/admin/warehouses" element={<WarehouseList />} />
//         <Route
//           path="/admin/warehouses/:warehouseId"
//           element={<WarehouseDetails />}
//         />
//         <Route
//           path="/warehouses/:warehouseId/godowns"
//           element={<GodownList />}
//         />
//         <Route
//           path="/godowns/:godownId/compartments"
//           element={<CompartmentList />}
//         />
//         <Route
//           path="/compartments/:compartmentId/stacks"
//           element={<StackList />}
//         />

//         {/* WORKFLOWS */}
//         <Route path="/reservations" element={<ReservationList />} />
//         <Route
//           path="/reservations/:reservationId"
//           element={<ReservationDetails />}
//         />
//         <Route path="/stack-allocations" element={<AllocationList />} />
//         <Route
//           path="/stack-allocations/:reservationId"
//           element={<AllocationCreate />}
//         />
       
       
// {/* STOCK RECEIPT WORKFLOW */}
// <Route path="/stock-receipt" element={<Navigate to="/stock-receipt/tokens" />} />
// <Route path="/stock-receipt/tokens" element={<ReceiptTokenList />} />
// <Route path="/stock-receipt/create" element={<ReceiptCreate />} />
// <Route path="/stock-receipt/tokens/:tokenId" element={<ReceiptDetails />} />

// <Route path="/stock-issue/tokens" element={<IssueTokenList />} />
// <Route path="/stock-issue/create" element={<IssueCreate />} />
// <Route path="/stock-issue/details/:tokenId" element={<IssueDetails />} />

        
//       </Route>

//       <Route path="/unauthorized" element={<Unauthorized />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../app/App";

import Login from "../pages/auth/Login";
import Unauthorized from "../pages/error/Unauthorized";
import NotFound from "../pages/error/NotFound";

import AdminDashboard from "../pages/dashboards/AdminDashboard";
import WarehouseDashboard from "../pages/dashboards/WarehouseDashboard";
import InspectorDashboard from "../pages/dashboards/InspectorDashboard";

import WarehouseList from "../pages/warehouses/WarehouseList";
import WarehouseDetails from "../pages/warehouses/WarehouseDetails";
import GodownList from "../pages/structure/GodownList";
import CompartmentList from "../pages/structure/CompartmentList";
import StackList from "../pages/structure/StackList";

import ReservationList from "../pages/reservations/ReservationList";
import ReservationDetails from "../pages/reservations/ReservationDetails";

import AllocationList from "../pages/stackAllocation/AllocationList";
import AllocationCreate from "../pages/stackAllocation/AllocationCreate";

import ReceiptTokenList from "../pages/stockReceipt/ReceiptTokenList";
import ReceiptCreate from "../pages/stockReceipt/ReceiptCreate";
import ReceiptDetails from "../pages/stockReceipt/ReceiptDetails";

import IssueTokenList from "../pages/stockIssue/IssueTokenList";
import IssueCreate from "../pages/stockIssue/IssueCreate";
import IssueDetails from "../pages/stockIssue/IssueDetails";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  // 🔐 Public routes
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* 🔹 All authenticated routes use MainLayout */}
      <Route element={<MainLayout />}>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/warehouses" element={<WarehouseList />} />
          <Route path="/admin/warehouses/:warehouseId" element={<WarehouseDetails />} />
        </Route>

        {/* ================= MANAGER ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["MANAGER"]} />}>
          <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />

          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/reservations/:reservationId" element={<ReservationDetails />} />

          <Route path="/stack-allocations" element={<AllocationList />} />
          <Route path="/stack-allocations/:reservationId" element={<AllocationCreate />} />

          {/* Stock Receipt */}
          <Route path="/stock-receipt" element={<Navigate to="/stock-receipt/tokens" replace />} />
          <Route path="/stock-receipt/tokens" element={<ReceiptTokenList />} />
          <Route path="/stock-receipt/create" element={<ReceiptCreate />} />
          <Route path="/stock-receipt/tokens/:tokenId" element={<ReceiptDetails />} />

          {/* Stock Issue */}
          <Route path="/stock-issue" element={<Navigate to="/stock-issue/tokens" replace />} />
          <Route path="/stock-issue/tokens" element={<IssueTokenList />} />
          <Route path="/stock-issue/create" element={<IssueCreate />} />
          <Route path="/stock-issue/details/:tokenId" element={<IssueDetails />} />
        </Route>

        {/* ================= INSPECTOR ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["INSPECTOR"]} />}>
          <Route path="/inspector/dashboard" element={<InspectorDashboard />} />
        </Route>

        {/* ================= COMMON STRUCTURE ================= */}
        <Route path="/warehouses/:warehouseId/godowns" element={<GodownList />} />
        <Route path="/godowns/:godownId/compartments" element={<CompartmentList />} />
        <Route path="/compartments/:compartmentId/stacks" element={<StackList />} />

      </Route>

      {/* 🔸 Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

