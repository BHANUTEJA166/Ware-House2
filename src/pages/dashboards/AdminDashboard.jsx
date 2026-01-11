import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardMetrics } from "../../app/reducers/dashboardReducer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { metrics, loading } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  if (loading) {
    return <div style={{padding: '4rem 2rem', textAlign: 'center', color: '#666'}}>Loading dashboard...</div>;
  }

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', background: '#f8f9fa'}}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        borderLeft: '4px solid #2563eb',
        textAlign: 'center'
      }}>
        <h2 style={{margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.8rem'}}>Admin Dashboard</h2>
        <p style={{margin: 0, color: '#64748b', fontSize: '1.1rem'}}>Warehouse Management System</p>
      </div>

      {/* Metrics */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '4px solid #2563eb'
        }}>
          <div style={{fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem'}}>
            {metrics.reservations || 0}
          </div>
          <div style={{color: '#64748b', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase'}}>
            Total Reservations
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '4px solid #f59e0b'
        }}>
          <div style={{fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem'}}>
            {metrics.pendingReservations || 0}
          </div>
          <div style={{color: '#64748b', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase'}}>
            Pending Reservations
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '4px solid #10b981'
        }}>
          <div style={{fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem'}}>
            {metrics.allocations || 0}
          </div>
          <div style={{color: '#64748b', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase'}}>
            Stack Allocations
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '4px solid #06b6d4'
        }}>
          <div style={{fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem'}}>
            {metrics.inward || 0}
          </div>
          <div style={{color: '#64748b', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase'}}>
            Stock Inward
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          borderTop: '4px solid #ef4444'
        }}>
          <div style={{fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem'}}>
            {metrics.outward || 0}
          </div>
          <div style={{color: '#64748b', fontWeight: '500', fontSize: '0.95rem', textTransform: 'uppercase'}}>
            Stock Outward
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{margin: '0 0 1.5rem 0', color: '#1e293b', fontSize: '1.3rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem'}}>
          Quick Actions
        </h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <a href="/admin/warehouses" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            background: '#f1f5f9',
            color: '#1e293b',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            border: '2px solid #e2e8f0'
          }}>
            <i className="bi bi-building"></i>
            Manage Warehouses
          </a>
          <a href="/reservations" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            background: '#f1f5f9',
            color: '#1e293b',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            border: '2px solid #e2e8f0'
          }}>
            <i className="bi bi-calendar3"></i>
            View Reservations
          </a>
          <a href="/stack-allocations" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            background: '#f1f5f9',
            color: '#1e293b',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            border: '2px solid #e2e8f0'
          }}>
            <i className="bi bi-layers"></i>
            Stack Allocations
          </a>
          <a href="/stock-receipt" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            background: '#f1f5f9',
            color: '#1e293b',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            border: '2px solid #e2e8f0'
          }}>
            <i className="bi bi-truck"></i>
            Stock Movements
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;














// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardMetrics } from "../../app/reducers/dashboardReducer";

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const { metrics, loading } = useSelector(state => state.dashboard);

//   useEffect(() => {
//     dispatch(fetchDashboardMetrics());
//   }, [dispatch]);

//   if (loading) return <p className="p-4">Loading dashboard...</p>;

//   return (
//     <div className="container p-4">
//       <h4 className="mb-4">Admin Dashboard</h4>

//       <div className="row">
//         <Metric title="Total Reservations" value={metrics.reservations} />
//         <Metric title="Pending Reservations" value={metrics.pendingReservations} />
//         <Metric title="Stack Allocations" value={metrics.allocations} />
//         <Metric title="Stock Inward" value={metrics.inward} />
//         <Metric title="Stock Outward" value={metrics.outward} />
//       </div>
//     </div>
//   );
// };

// const Metric = ({ title, value }) => (
//   <div className="col-md-4 mb-3">
//     <div className="card shadow-sm">
//       <div className="card-body text-center">
//         <h6 className="text-muted">{title}</h6>
//         <h3 className="fw-bold">{value}</h3>
//       </div>
//     </div>
//   </div>
// );

// export default AdminDashboard;
