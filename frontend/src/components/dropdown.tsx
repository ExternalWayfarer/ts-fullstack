import React from 'react';

const Dropdown = () => {
  return (
    <div className="relative group">
      {/* Основной элемент */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Каталог
      </button>

      {/* Выпадающий список */}
      <ul className="absolute left-0 mt-2 w-48 bg-blue-500 border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200 ease-in-out">
        <li className="px-4 py-2 hover:bg-blue-600 rounded-md cursor-pointer">
          <a href="/category1">Категория 1</a>
        </li>
        <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">
          <a href="/category2">Категория 2</a>
        </li>
        <li className="px-4 py-2 hover:bg-blue-600 rounded-md cursor-pointer">
          <a href="/category3">Категория 3</a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
