interface Props {
  listNum: number;
  group: string;
  gender: string;
  onDeleteButton: () => void;
  onEditButton: () => void;
}

export default function Student({ listNum, group, gender, onDeleteButton, onEditButton }: Props) {
  return (
    <div className="grid grid-cols-4 items-center gap-4 p-4 rounded-lg shadow bg-white text-sm">
      <div>{listNum}</div>
      <div>{group}</div>
      <div>{gender}</div>
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
