import RetroButton from "./retrobutton.tsx";
const Dropdown = () => {
  return (
    <div className="relative group">
      <RetroButton>
        Catalog
      </RetroButton>

      <ul className="absolute text-steam-textLight bg-steam-oliveLight left-0 mt-2 w-48 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200 ease-in-out">
        <li className="px-4 py-2  cursor-pointer ">
          <a href="/category1">1</a>
        </li>
        <li className="px-4 py-2  cursor-pointer">
          <a href="/category2">2</a>
        </li>
        <li className="px-4 py-2 cursor-pointer">
          <a href="/category3">3</a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
