import React, { useState, useRef, useEffect } from "react";
import { dataBarang } from "../dummyData"; 

interface TableProps {
  setDataBarang: (selectedData: any[]) => void; 
}

const Table: React.FC<TableProps> = ({ setDataBarang }) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const previousSelectedItems = useRef<Set<number>>(new Set());

  const handleSelectItem = (id: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allItemIds = new Set(dataBarang.map((_, index) => index));
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems(new Set());
    }
  };
  useEffect(() => {
    if (selectedItems !== previousSelectedItems.current) {
      const selectedData = dataBarang.filter((_, index) => selectedItems.has(index));
      setDataBarang(selectedData);
    }
    previousSelectedItems.current = selectedItems;
  }, [selectedItems, dataBarang, setDataBarang]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs border-b text-gray-700 uppercase bg-[#FAFAFA] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-3 py-3 border-r">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedItems.size === dataBarang.length}
                className="h-4 w-4 cursor-pointer"
              />
            </th>
            <th scope="col" className="md:px-6 px-3 md:py-3 py-0.5 border-r whitespace-nowrap">
              Kode Barang
            </th>
            <th scope="col" className="md:px-6 px-3 md:py-3 py-0.5 border-r whitespace-nowrap">
              Nama Barang
            </th>
            <th scope="col" className="md:px-6 px-3 md:py-3 py-0.5 border-r whitespace-nowrap">
              Merk
            </th>
            <th scope="col" className="md:px-6 px-3 md:py-3 py-0.5 border-r whitespace-nowrap">
              Jenis Barang
            </th>
            <th scope="col" className="md:px-6 px-3 md:py-3 py-0.5 border-r whitespace-nowrap">
              Gudang
            </th>
            <th scope="col" className="md:px-6 px-3 md:py-3 py-0.5 white whitespace-nowrap">
              Total Stock (pcs)
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {dataBarang.map((barang, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-3 py-2.5 ">
                <input
                  type="checkbox"
                  checked={selectedItems.has(index)}
                  onChange={() => handleSelectItem(index)}
                  className="h-4 w-4 cursor-pointer"
                />
              </td>
              <th
                scope="row"
                className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {barang.kode_barang}
              </th>
              <td className="md:px-6 px-3 py-0.5 md:py-2.5 whitespace-nowrap">{barang.nama_barang}</td>
              <td className="md:px-6 px-3 py-0.5 md:py-2.5 whitespace-nowrap">{barang.merk}</td>
              <td className="md:px-6 px-3 py-0.5 md:py-2.5 whitespace-nowrap">{barang.jenis_barang}</td>
              <td className="md:px-6 px-3 py-0.5 md:py-2.5 whitespace-nowrap">{barang.gudang}</td>
              <td className="md:px-6 px-3 py-0.5 md:py-2.5 whitespace-nowrap">{barang.total_stok}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
