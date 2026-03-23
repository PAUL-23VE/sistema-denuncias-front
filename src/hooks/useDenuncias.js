import { useState, useEffect, useCallback } from 'react';
import { denunciasService } from '../services/api';
import toast from 'react-hot-toast';

export const useDenuncias = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDenuncias = useCallback(async () => {
    setLoading(true);
    try {
      const res = await denunciasService.obtenerTodas();
      setDenuncias(res.data.denuncias);
    } catch {
      toast.error('Error al cargar denuncias');
    } finally {
      setLoading(false);
    }
  }, []);

  const crearDenuncia = async (data) => {
    try {
      await denunciasService.crear(data);
      toast.success('✅ Denuncia registrada anónimamente');
      await cargarDenuncias();
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || 'Error al enviar denuncia';
      toast.error(msg);
      return false;
    }
  };

  useEffect(() => {
    cargarDenuncias();
  }, [cargarDenuncias]);

  return { denuncias, loading, crearDenuncia, cargarDenuncias };
};