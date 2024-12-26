import React, { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from "../store/appContext";


const Private = () => {
  const { store, actions } = useContext(Context);
  const isAuthenticated = localStorage.getItem('token');
  
  useEffect(() => {
    actions.getPrivate();
  }, [actions]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (isAuthenticated == null && store.email == null) {
    return <Navigate to="/login" />;
  }

  const userInfo = [
    { label: 'Email', value: store.email },
    { label: 'Teléfono', value: user.phone },
    { label: 'Dirección', value: user.address },
    { label: 'Ciudad', value: user.city },
    { label: 'Estado', value: user.state },
    { label: 'Código Postal', value: user.zipcode },
    { label: 'Fecha de Nacimiento', value: user.birthday },
  ];

  return (
    <div className="private-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle border border-3 border-white me-3"
                    src={user.avatar || `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                    width="60"
                    height="60"
                  />
                  <div>
                    <h2 className="mb-0">Bienvenido, {user.name || "Usuario"}</h2>
                    <p className="mb-0">Detalles de su cuenta</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {userInfo.map(({ label, value }) => (
                    <div key={label} className="col-md-6">
                      <div className="p-3 border rounded">
                        <h6 className="text-muted mb-1">{label}</h6>
                        <p className="mb-0 fw-bold">{value || "No disponible"}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <span className={`badge ${
                    user.is_active ? 'bg-success' : 'bg-danger'
                  } p-2`}>
                    Cuenta {user.is_active ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Private;

