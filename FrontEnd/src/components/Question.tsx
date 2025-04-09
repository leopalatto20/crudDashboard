import deleteIcon from "./../assets/delete.png";
import editIcon from "./../assets/pencil.png";

interface Props {
  texto_pregunta: string;
  respuesta: string;
  onDeleteButton: () => void;
}

export default function Question({ texto_pregunta, respuesta, onDeleteButton }: Props) {
  return (
    <div className="grid grid-cols-4 rounded-lg items-center gap-4 p-4 shadow bg-white text-sm">
      <div>{texto_pregunta}</div>
      <div>{respuesta}</div>
      <div className="text-center items-center">
        <img src={deleteIcon} onClick={onDeleteButton} className="hover:scale-125 h-1/4 w-1/4 cursor-pointer duration-200" />
      </div>
      <div className="text-center items-center">
        <img src={editIcon} onClick={onDeleteButton} className="hover:scale-125 h-1/4 w-1/4 cursor-pointer duration-200" />
      </div>
    </div>

  );
}
