interface Props {
  pregunta: string;
  respuesta: string;
  onDeleteButton: () => void;
}

export default function Question({ pregunta, respuesta, onDeleteButton }: Props) {
  return (
    <div className="grid grid-cols-3 items-center gap-4 p-3 shadow bg-white text-sm">
      <div>{pregunta}</div>
      <div>{respuesta}</div>
      <div className="flex justify-end gap-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          onClick={onDeleteButton}
        >
          Eliminar
        </button>
      </div>
    </div>

  );
}
