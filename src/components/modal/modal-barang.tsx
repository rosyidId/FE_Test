import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import Pagination from "../pagination";
import Table from "../table";

interface ModalTambahBarangProps {
  isOpen: boolean;
  onClose: () => void;
  setDataBarang: React.Dispatch<React.SetStateAction<any[]>>;
}

const ModalTambahBarang: React.FC<ModalTambahBarangProps> = ({ isOpen, onClose, setDataBarang }) => {
  if (!isOpen) return null;
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const handleSetDataBarang = () => {
    if (selectedItems.length > 0) {
      const itemsWithLokasi = selectedItems.map((item) => ({
        ...item,
        lokasi: [], 
      }));
      setDataBarang((prevData) => [...prevData, ...itemsWithLokasi]);
      onClose(); 
    }
  };
  const handleSelectedData = (selectedData: any[]) => {
    setSelectedItems(selectedData);
  };
  const isSelected = selectedItems.length > 0; 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-3 w-[160vh]">
        <div className="border-b p-2 text-sm flex justify-between">
          <h1>Tambah Barang</h1>
          <button onClick={onClose}>
            <IconX className="stroke-1" size={20} />
          </button>
        </div>
        <div className="p-2">
          <div className="flex">
            <input
              id="3"
              type="text"
              placeholder="Cari kode/ nama barang"
              className="peer h-8 bg-gray-50 px-2 placeholder:text-sm font-thin outline-none border transition-all duration-200 ease-in-out focus:bg-white"
            />
            <button className="bg-[#E5A000] py-1 px-2">
              <IconSearch className=" text-white" size={18} />
            </button>
          </div>
        </div>
        <Table setDataBarang={handleSelectedData} />
        <div className="justify-end flex">
          <Pagination />
        </div>
        <div className="mt-7 border-t flex justify-end">
          <div className="flex items-center mt-2 gap-2">
            <button className="border px-6 py-1 text-sm" onClick={onClose}>
              Batal
            </button>
            <button
              className={`w-64 border py-1 text-sm border-[#D9D9D9] ${isSelected ? 'bg-[#E5A000] text-white' : 'bg-[#F5F5F5]'}`}
              onClick={handleSetDataBarang}  
              disabled={!isSelected} 
            >
              Tambah ke Daftar Pemindahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTambahBarang;
