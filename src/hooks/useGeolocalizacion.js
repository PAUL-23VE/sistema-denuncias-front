import { useState, useEffect } from 'react';

export const useGeolocalizacion = () => {
  const [coordenadas, setCoordenadas] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización.');
      setCargando(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordenadas({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setCargando(false);
      },
      (err) => {
        setError('No se pudo obtener tu ubicación. Activa el GPS.');
        setCargando(false);
        console.error('Geolocalización error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { coordenadas, error, cargando };
};