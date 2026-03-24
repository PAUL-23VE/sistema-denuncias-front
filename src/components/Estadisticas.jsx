const COLORES = {
  robo: '#ef4444', vandalismo: '#f97316',
  iluminacion_deficiente: '#eab308', zona_peligrosa: '#a855f7',
  trafico_drogas: '#ec4899', otro: '#6b7280',
};

const Estadisticas = ({ estadisticas }) => {
  if (!estadisticas) return null;
  const { totalGeneral, porTipo, porEstado } = estadisticas;

  return (
    <div style={estilos.card}>
      <h3 style={estilos.titulo}>📊 Estadísticas</h3>
      <p style={estilos.total}>{totalGeneral} denuncias totales</p>

      <p style={estilos.subtitulo}>Por tipo</p>
      {porTipo.map((item) => (
        <div key={item.tipo} style={estilos.fila}>
          <span style={{ ...estilos.dot, background: COLORES[item.tipo] || '#6b7280' }} />
          <span style={estilos.etiqueta}>{item.tipo.replace(/_/g, ' ')}</span>
          <span style={estilos.numero}>{item.dataValues?.total || item.total}</span>
        </div>
      ))}

      <p style={{ ...estilos.subtitulo, marginTop: '14px' }}>Por estado</p>
      {porEstado.map((item) => (
        <div key={item.estado} style={estilos.fila}>
          <span style={{
            ...estilos.badge,
            background: item.estado === 'resuelto' ? '#dcfce7' : item.estado === 'en_revision' ? '#fef9c3' : '#fee2e2',
            color: item.estado === 'resuelto' ? '#166534' : item.estado === 'en_revision' ? '#854d0e' : '#991b1b',
          }}>
            {item.estado.replace('_', ' ')}
          </span>
          <span style={estilos.numero}>{item.dataValues?.total || item.total}</span>
        </div>
      ))}
    </div>
  );
};

const estilos = {
  card: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb',
  },
  titulo: { margin: '0 0 4px', fontSize: '16px', color: '#111' },
  total: { fontSize: '24px', fontWeight: '700', color: '#2563eb', margin: '8px 0 14px' },
  subtitulo: { fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' },
  fila: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  etiqueta: { flex: 1, fontSize: '13px', color: '#374151', textTransform: 'capitalize' },
  numero: { fontSize: '14px', fontWeight: '600', color: '#111' },
  badge: { fontSize: '11px', padding: '2px 8px', borderRadius: '999px', textTransform: 'capitalize' },
};

export default Estadisticas;