import { IconX } from "@tabler/icons-react";
import React from "react";

interface ModalLogoutProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void; 
}

const ModalLogout: React.FC<ModalLogoutProps> = ({ isOpen, onClose, onLogout }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-3 w-[400px] rounded-lg">
        <div className="border-b p-2 text-sm flex justify-between">
          <h1 className="font-semibold text-center">Konfirmasi Logout</h1>
          <button onClick={onClose}>
            <IconX className="stroke-1" size={20} />
          </button>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600">Apakah Anda yakin ingin logout?</p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button className="px-6 py-1 text-sm text-gray-500 border rounded" onClick={onClose}>
            Batal
          </button>
          <button
            className="px-6 py-1 text-sm text-white bg-[#E5A000] rounded"
            onClick={onLogout} 
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
