import deleteIcon from "./../assets/delete.png";

interface Props {
  listNum: number;
  group: string;
  gender: string;
  onDeleteButton: () => void;
}

export default function Student({ listNum, group, gender, onDeleteButton }: Props) {
  return (
    <div className="grid grid-cols-4 items-center p-4 rounded-lg shadow bg-white text-sm">
      <div>{listNum}</div>
      <div>{group}</div>
      <div>{gender}</div>
      <div className="text-center">
        <img src={deleteIcon} onClick={onDeleteButton} className="hover:scale-125 h-1/4 w-1/4 cursor-pointer duration-200" />
      </div>
    </div>
  );
}
