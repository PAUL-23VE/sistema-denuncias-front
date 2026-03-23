import { useState } from 'react';

const TIPOS = [
  { value: 'robo',                 emoji: '🔴', label: 'Robo' },
  { value: 'vandalismo',           emoji: '🟠', label: 'Vandalismo' },
  { value: 'pelea',                emoji: '🟤', label: 'Pelea o riña' },
  { value: 'accidente',            emoji: '🚨', label: 'Accidente' },
  { value: 'persona_sospechosa',   emoji: '👤', label: 'Persona sospechosa' },
  { value: 'trafico_drogas',       emoji: '💊', label: 'Tráfico de drogas' },
  { value: 'iluminacion_deficiente', emoji: '🌑', label: 'Iluminación deficiente' },
  { value: 'zona_peligrosa',       emoji: '⚠️', label: 'Zona peligrosa' },
  { value: 'otro',                 emoji: '📝', label: 'Otro' },
];

const FormularioDenuncia = ({ onSubmit, ubicacionLista, errorUbicacion }) => {
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enviando, setEnviando] = useState(false);

  const esOtro = tipo === 'otro';
  const descripcionObligatoria = esOtro;
  const formularioListo = ubicacionLista && !errorUbicacion;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formularioListo || !tipo) return;
    if (esOtro && descripcion.trim().length < 10) return;

    setEnviando(true);
    const ok = await onSubmit({
      tipo,
      descripcion: descripcion.trim() || null,
    });
    if (ok) {
      setTipo('');
      setDescripcion('');
    }
    setEnviando(false);
  };

  return (
    <div style={estilos.card}>
      <h3 style={estilos.titulo}>🚨 Registrar denuncia</h3>

      {/* Estado ubicación */}
      <div style={{
        ...estilos.estadoBadge,
        background: errorUbicacion ? '#fee2e2' : ubicacionLista ? '#dcfce7' : '#fef9c3',
        color: errorUbicacion ? '#991b1b' : ubicacionLista ? '#166534' : '#854d0e',
      }}>
        {errorUbicacion
          ? `❌ ${errorUbicacion}`
          : ubicacionLista
          ? '✅ Ubicación detectada automáticamente'
          : '⏳ Detectando tu ubicación...'}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Selector de tipo */}
        <label style={estilos.label}>¿Qué está ocurriendo? <span style={estilos.req}>*</span></label>
        <div style={estilos.grid}>
          {TIPOS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => { setTipo(t.value); if (t.value !== 'otro') setDescripcion(''); }}
              disabled={!formularioListo}
              style={{
                ...estilos.chip,
                background: tipo === t.value ? '#1e3a5f' : '#f8fafc',
                color: tipo === t.value ? '#fff' : '#374151',
                border: tipo === t.value ? '2px solid #1e3a5f' : '2px solid #e5e7eb',
                opacity: formularioListo ? 1 : 0.5,
                cursor: formularioListo ? 'pointer' : 'not-allowed',
              }}
            >
              <span style={{ fontSize: '16px' }}>{t.emoji}</span>
              <span style={{ fontSize: '11px', marginTop: '2px', lineHeight: 1.2 }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Descripción — obligatoria solo si tipo = otro, opcional para el resto */}
        {tipo && (
          <div style={{ marginTop: '14px' }}>
            <label style={estilos.label}>
              Descripción{descripcionObligatoria
                ? <span style={estilos.req}> * obligatoria</span>
                : <span style={estilos.opcional}> (opcional)</span>}
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder={
                esOtro
                  ? 'Describe qué ocurrió (mín. 10 caracteres)...'
                  : 'Agrega detalles si lo deseas...'
              }
              rows={3}
              required={descripcionObligatoria}
              minLength={descripcionObligatoria ? 10 : undefined}
              maxLength={500}
              style={estilos.textarea}
            />
            <div style={estilos.contador}>{descripcion.length}/500</div>
          </div>
        )}

        <button
          type="submit"
          disabled={
            enviando ||
            !formularioListo ||
            !tipo ||
            (esOtro && descripcion.trim().length < 10)
          }
          style={{
            ...estilos.btnEnviar,
            opacity: (!formularioListo || !tipo || (esOtro && descripcion.trim().length < 10)) ? 0.5 : 1,
            cursor: (!formularioListo || !tipo) ? 'not-allowed' : 'pointer',
            marginTop: tipo ? '4px' : '16px',
          }}
        >
          {enviando ? '⏳ Enviando...' : '🚨 Enviar denuncia anónima'}
        </button>
      </form>

      <p style={estilos.aviso}>
        🔒 Totalmente anónimo. Tu IP se convierte en un código irreversible y no se almacena.
      </p>
    </div>
  );
};

const estilos = {
  card: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb',
  },
  titulo: { margin: '0 0 12px', fontSize: '17px', fontWeight: '700', color: '#111' },
  estadoBadge: {
    fontSize: '12px', padding: '8px 12px', borderRadius: '8px',
    marginBottom: '14px', fontWeight: '500',
  },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' },
  req: { color: '#dc2626', fontWeight: '700' },
  opcional: { color: '#9ca3af', fontWeight: '400', fontSize: '12px' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
  },
  chip: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '10px 4px', borderRadius: '10px', transition: 'all 0.15s',
    fontFamily: 'inherit', gap: '4px', minHeight: '60px',
  },
  textarea: {
    width: '100%', padding: '10px', borderRadius: '8px',
    border: '1px solid #d1d5db', fontSize: '14px',
    boxSizing: 'border-box', resize: 'vertical',
    fontFamily: 'inherit', outline: 'none', lineHeight: '1.5',
  },
  contador: { textAlign: 'right', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' },
  btnEnviar: {
    width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
    background: '#dc2626', color: '#fff', fontSize: '15px',
    fontWeight: '600', transition: 'background 0.2s',
  },
  aviso: {
    fontSize: '11px', color: '#6b7280', marginTop: '12px',
    textAlign: 'center', lineHeight: '1.5',
  },
};

export default FormularioDenuncia;