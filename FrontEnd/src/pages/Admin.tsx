import React, { useEffect, useState } from "react";
import Student from "../components/Student";
import Question from "../components/Question";
import axios from "axios";

interface Alumno {
  IDAlumno: number;
  NumLista: number;
  Genero: string;
  Grupo: string;
}

interface Preguntas {
  IDPregunta: number;
  Texto: string;
  Respuesta: string;
}

const Admin: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [preguntas, setPreguntas] = useState<Preguntas[]>([]);

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

  const deleteAlumno = async (IDAlumno: number) => {
    try {
      await axios.delete(`http://localhost:8000/delete_alumno/${IDAlumno}`);
      setAlumnos((prevAlumnos) =>
        prevAlumnos.filter((alumno) => alumno.IDAlumno !== IDAlumno)
      );
      console.log(`Alumno con ID ${IDAlumno} eliminado.`);
    } catch (err) {
      console.error("Error al eliminar el alumno:", err);
    }
  };

  const fetchPreguntas = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/preguntas_completas/nivel1"
      );
      const data = await response.json();
      setPreguntas(data.questions);
    } catch (err) {
      console.error("Error al obtener la información de las preguntas:", err);
    }
  };

  useEffect(() => {
    fetchAlumnos();
    fetchPreguntas();
  }, []);

  return (
    <div className="bg-white font-serif min-h-screen flex flex-col">
      <div className="row-span-full flex justify-center items-center bg-azulInstitucional p-6 text-5xl text-white">
        Admin
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
        <div id="alumnos" className="p-4 bg-gray-100">
          <div className="grid-rows-2 gap-4 bg-azulInstitucional text-white text-2x justify-center items-center">
            <div className="row-auto p-4 text-white text-2xl font-bold text-center">
              Alumnos
            </div>

            <div className="row-auto p-4 text-white text-xl text-center">
              Número de Lista | Grupo | Género
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
            {alumnos.map((alumno) => (
              <Student
                key={alumno.IDAlumno}
                listNum={alumno.NumLista}
                group={alumno.Grupo}
                gender={alumno.Genero}
                onDeleteButton={() => deleteAlumno(alumno.IDAlumno)}
              />
            ))}
          </div>
          <div className="row-auto p-4 text-white text-xl text-center">
            <button className="bg-blue-300 text-white px-5 py-2 rounded hover:bg-azulInstitucional w-full">
              Agregar
            </button>
          </div>
        </div>

        <div id="segunda columna" className="p-4 bg-gray-100">
          <div className="row-auto p-4 bg-azulInstitucional text-white text-2xl font-bold justify-center items-center text-center">
            Preguntas Nivel 1
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
            {preguntas.map((pregunta) => (
              <Question
                key={pregunta.IDPregunta}
                texto_pregunta={pregunta.Texto}
                respuesta={pregunta.Respuesta}
                onDeleteButton={() =>
                  console.log(`Eliminar pregunta con ID ${pregunta.IDPregunta}`)
                }
              />
            ))}
          </div>

          <div className="row-auto p-4 text-white text-xl text-center">
            <button className="bg-blue-300 text-white px-5 py-2 rounded hover:bg-azulInstitucional w-full">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
