import React, { useEffect, useState } from "react";
import Student from "../components/Student";

interface Alumno {
  IDAlumno: number;
  NumLista: number,
  Genero: string;
  Grupo: string
}

const Admin: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const fetchAlumnos = async () => {
    try {
      const IDMaestro = localStorage.getItem("IDMaestro");
      if (!IDMaestro) {
        console.error("No se encontró el ID del maestro en localStorage.");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/info_alumnos/${IDMaestro}`
      );
      const data = await response.json();
      setAlumnos(data);
    } catch (err) {
      console.error("Error al obtener la información de los alumnos:", err);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <div className="bg-white font-serif min-h-screen flex flex-col">
      <div className="row-span-full flex justify-center items-center bg-azulInstitucional p-6 text-5xl text-white">
        Admin
      </div>

<div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
        
        <div id="alumnos" className="p-4 bg-gray-100">
          <div className="p-4 bg-azulInstitucional text-white text-2xl font-bold">
            Alumnos
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
            {alumnos.map((alumno, index) => (
              <Student
                key={alumno.IDAlumno}
                listNum={alumno.NumLista}
                group={alumno.Grupo}
                gender={alumno.Genero}
                onDeleteButton={() =>
                  console.log(`Eliminar alumno ${alumno.IDAlumno}`)
                }
                onEditButton={() =>
                  console.log(`Editar alumno ${alumno.IDAlumno}`)
                }
              />
            ))}
          </div>
        </div>

        <div id="segunda columna" className="p-4 bg-gray-100">
            <div className="row-auto p-4 bg-azulInstitucional text-white text-2xl font-bold justify-center items-center">
              Preguntas
            </div>
          </div>
      </div>
    </div>
  );
};

export default Admin;
