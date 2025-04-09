import React, { useEffect, useState } from 'react';
import Student from '../components/Student';

interface Alumno {
  IDAlumno: number;
  Nombre: string;
  Genero: string;
  Grupo: string;
}

const Admin: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const fetchAlumnos = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/info_alumno');
      const data = await response.json();
      setAlumnos(data);
    } catch (err) {
      console.error('Error al obtener la información de los alumnos:', err);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <div className='bg-white font-serif min-h-screen flex flex-col'>
      <div className="row-span-full flex justify-center items-center bg-azulInstitucional p-6 text-5xl text-white">
        Admin
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
        {alumnos.map((alumno, index) => (
          <Student
            key={alumno.IDAlumno}
            listNum={index + 1}
            group={alumno.Grupo}
            gender={alumno.Genero}
            onDeleteButton={() => console.log(`Eliminar alumno ${alumno.IDAlumno}`)}
            onEditButton={() => console.log(`Editar alumno ${alumno.IDAlumno}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;