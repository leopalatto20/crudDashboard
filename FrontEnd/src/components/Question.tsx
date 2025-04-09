import { useState } from "react";

import deleteIcon from "./../assets/delete.png";
import editIcon from "./../assets/pencil.png";
import saveIcon from "./../assets/diskette.png";

interface Props {
  texto_pregunta: string;
  respuesta: string;
  onDeleteButton: () => void;
  onEditButton: (nuevoTexto: string, nuevaRespuesta: string) => void;
}

export default function Question({ texto_pregunta, respuesta, onDeleteButton, onEditButton }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newTexto, setNewTexto] = useState(texto_pregunta);
  const [newRespuesta, setNewRespuesta] = useState(respuesta);

  const handleSave = () => {
    onEditButton(newTexto, newRespuesta);
    setEditMode(false);
  };

  return (
    <div className="grid grid-cols-4 rounded-lg items-center p-4 shadow bg-white text-sm">
      <div>
        {editMode ? (
          <input
            value={newTexto}
            onChange={(e) => setNewTexto(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Texto"
          />
        ) : (
          texto_pregunta
        )}
      </div>
      <div>
        {editMode ? (
          <input
            value={newRespuesta}
            onChange={(e) => setNewRespuesta(e.target.value)}
            className="border p-1 rounded w-full"
            placeholder="Respuesta"
          />
        ) : (
          respuesta
        )}
      </div>
      <div className="text-center">
        <img
          src={deleteIcon}
          onClick={onDeleteButton}
          className="hover:scale-125 h-1/4 w-1/4 mx-auto cursor-pointer duration-200"
        />
      </div>
      <div className="text-center">
        {editMode ? (
          <img
            src={saveIcon}
            onClick={handleSave}
            className="hover:scale-125 h-1/4 w-1/4 mx-auto cursor-pointer duration-200"
          />
        ) : (
          <img
            src={editIcon}
            onClick={() => setEditMode(true)}
            className="hover:scale-125 h-1/4 w-1/4 mx-auto cursor-pointer duration-200"
          />
        )}
      </div>
    </div>
  );
}

