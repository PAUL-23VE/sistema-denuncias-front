import { MapContainer, TileLayer, CircleMarker, Popup, Marker, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Centra el mapa en la ubicación del usuario
const CentrarMapa = ({ coordenadas }) => {
  const map = useMap();
  useEffect(() => {
    if (coordenadas) map.setView([coordenadas.lat, coordenadas.lng], 15);
  }, [coordenadas, map]);
  return null;
};
const COLORES_TIPO = {
  robo: '#ef4444',
  vandalismo: '#f97316',
  pelea: '#92400e',
  accidente: '#f59e0b',
  persona_sospechosa: '#6366f1',
  trafico_drogas: '#ec4899',
  iluminacion_deficiente: '#eab308',
  zona_peligrosa: '#a855f7',
  otro: '#6b7280',
};
// Ícono personalizado para la ubicación del usuario
const iconoUsuario = L.divIcon({
  className: '',
  html: `<div style="
    width:18px;height:18px;background:#2563eb;border:3px solid #fff;
    border-radius:50%;box-shadow:0 0 0 3px rgba(37,99,235,0.35);">
  </div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const Mapa = ({ denuncias, ubicacionUsuario }) => {
  const centro = ubicacionUsuario || { lat: -1.2543, lng: -78.6234 };

  return (
    <MapContainer
      center={[centro.lat, centro.lng]}
      zoom={ubicacionUsuario ? 15 : 13}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CentrarMapa coordenadas={ubicacionUsuario} />

      {/* Posición del usuario */}
      {ubicacionUsuario && (
        <Marker position={[ubicacionUsuario.lat, ubicacionUsuario.lng]} icon={iconoUsuario}>
          <Popup>📍 Tu ubicación actual</Popup>
        </Marker>
      )}

      {/* Denuncias existentes */}
      {denuncias.map((d) => (
        <CircleMarker
          key={d.id}
          center={[parseFloat(d.latitud), parseFloat(d.longitud)]}
          radius={8}
          pathOptions={{
            color: COLORES_TIPO[d.tipo] || '#6b7280',
            fillColor: COLORES_TIPO[d.tipo] || '#6b7280',
            fillOpacity: 0.75,
          }}
        >
          <Popup>
            <div style={{ minWidth: '180px' }}>
              <strong style={{ fontSize: '13px', color: COLORES_TIPO[d.tipo] }}>
                {d.tipo.replace(/_/g, ' ').toUpperCase()}
              </strong>
              {d.descripcion && (
                <p style={{ margin: '6px 0 0', fontSize: '13px' }}>{d.descripcion}</p>
              )}
              <p style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>
                {new Date(d.createdAt).toLocaleDateString('es-EC', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Mapa;