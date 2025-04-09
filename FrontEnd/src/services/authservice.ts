import axios from 'axios';

// Conexión al endpoint de la base de datos para verificar los datos del login
export const maestroLogin = async (correo: string, grupo: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/maestro/login', {
      Correo: correo,
      Grupo: grupo,
    });
    console.log('Respuesta del login: ', response.data);
    return response.data; // Asegúrate de que el backend devuelva { Valido, IDMaestro, Correo, Grupo }
  } catch (error) {
    console.error('Error en el login: ', error);
    return { Valido: false };
  }
};
