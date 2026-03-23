import { Toaster } from 'react-hot-toast';
import Mapa from './components/Mapa';
import FormularioDenuncia from './components/FormularioDenuncia';
import { useDenuncias } from './hooks/useDenuncias';
import { useGeolocalizacion } from './hooks/useGeolocalizacion';

function App() {
  const { denuncias, loading, crearDenuncia } = useDenuncias();
  const { coordenadas, error: errorGeo, cargando: cargandoGeo } = useGeolocalizacion();

const handleSubmit = async ({ tipo, descripcion }) => {
  if (!coordenadas) return false;
  return await crearDenuncia({
    tipo,
    descripcion,
    latitud: coordenadas.lat,
    longitud: coordenadas.lng,
  });
};

  return (
    <div style={estilos.app}>
      <Toaster position="top-right" />

      <header style={estilos.header}>
        <h1 style={estilos.titulo}>🛡️ Yura — Denuncias Ciudadanas</h1>
        <p style={estilos.subtitulo}>Reporta incidentes de forma anónima y segura</p>
      </header>

      <main style={estilos.main}>
        <aside style={estilos.sidebar}>
          <FormularioDenuncia
            onSubmit={handleSubmit}
            ubicacionLista={!cargandoGeo && !!coordenadas}
            errorUbicacion={errorGeo}
          />

          <div style={estilos.infoCard}>
            <p style={estilos.infoTitulo}>📌 ¿Cómo funciona?</p>
            <ul style={estilos.infoLista}>
              <li>Tu ubicación se detecta automáticamente</li>
              <li>Solo escribe qué ocurrió y envía</li>
              <li>Tu IP se convierte en un código irreversible</li>
              <li>Nadie puede identificarte</li>
            </ul>
          </div>

          {denuncias.length > 0 && (
            <div style={estilos.contadorCard}>
              <span style={estilos.contadorNum}>{denuncias.length}</span>
              <span style={estilos.contadorLabel}>denuncias activas en el mapa</span>
            </div>
          )}
        </aside>

        <div style={estilos.mapaWrapper}>
          {loading && (
            <div style={estilos.loadingOverlay}>Cargando denuncias...</div>
          )}
          <Mapa denuncias={denuncias} ubicacionUsuario={coordenadas} />
        </div>
      </main>
    </div>
  );
}

const estilos = {
  app: {
    display: 'flex', flexDirection: 'column', height: '100vh',
    background: '#f1f5f9', fontFamily: 'system-ui, sans-serif',
  },
  header: { background: '#1e3a5f', color: '#fff', padding: '14px 24px' },
  titulo: { margin: 0, fontSize: '20px', fontWeight: '700' },
  subtitulo: { margin: '4px 0 0', fontSize: '13px', opacity: 0.75 },
  main: { display: 'flex', flex: 1, gap: '16px', padding: '16px', overflow: 'hidden' },
  sidebar: {
    width: '300px', flexShrink: 0, overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: '12px',
  },
  mapaWrapper: {
    flex: 1, borderRadius: '12px', overflow: 'hidden',
    position: 'relative', minHeight: '400px',
  },
  infoCard: {
    background: '#fff', borderRadius: '12px', padding: '16px',
    border: '1px solid #e5e7eb', fontSize: '13px', color: '#374151',
  },
  infoTitulo: { fontWeight: '600', marginBottom: '8px', color: '#111' },
  infoLista: { paddingLeft: '16px', lineHeight: '1.8', color: '#6b7280' },
  contadorCard: {
    background: '#1e3a5f', borderRadius: '12px', padding: '16px',
    textAlign: 'center', color: '#fff',
  },
  contadorNum: { display: 'block', fontSize: '32px', fontWeight: '700' },
  contadorLabel: { fontSize: '13px', opacity: 0.8 },
  loadingOverlay: {
    position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 14px',
    borderRadius: '999px', fontSize: '13px', zIndex: 1000,
  },
};

export default App;