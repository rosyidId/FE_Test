import { IconX } from "@tabler/icons-react";
import { dataLokasi } from "../../dummyData";
import { useState } from "react";

interface TambahLokasiProps {
  isOpen: boolean;
  onClose: () => void;
  dataBarang: any[];
  setDataBarang: React.Dispatch<React.SetStateAction<any[]>>; 
  barangId: number; 
}

const TambahLokasi: React.FC<TambahLokasiProps> = ({
  isOpen,
  onClose,
  dataBarang,
  setDataBarang,
  barangId,
}) => {
  if (!isOpen) return null;

  const [selectedLocations, setSelectedLocations] = useState<Set<number>>(
    new Set()
  );

  const handleSelectLocation = (index: number) => {
    const newSelected = new Set(selectedLocations);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedLocations(newSelected);
  };

  const handleAddLocations = () => {
    // Ambil data lokasi yang dipilih
    const selectedData = dataLokasi.filter((_, index) =>
      selectedLocations.has(index)
    );

    const updatedDataBarang = dataBarang.map((barang) => {
      if (barang.id === barangId) {
        return {
          ...barang,
          lokasi: [...barang.lokasi, ...selectedData], 
        };
      }
      return barang; 
    });
    setDataBarang(updatedDataBarang);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-3 w-[90vh]">
        <div className="border-b p-2 text-sm flex justify-between">
          <h1>Pilih Lokasi</h1>
          <button onClick={onClose}>
            <IconX className="stroke-1" size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left text-gray-700 border">
            <thead className="bg-gray-100 border-b text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    onChange={(e) =>
                      setSelectedLocations(
                        e.target.checked
                          ? new Set(dataLokasi.map((_, idx) => idx))
                          : new Set()
                      )
                    }
                    checked={selectedLocations.size === dataLokasi.length}
                  />
                </th>
                <th className="px-4 py-2">Nama Lokasi</th>
                <th className="px-4 py-2">Gudang</th>
                <th className="px-4 py-2">Jenis</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {dataLokasi.map((lokasi, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer"
                      onChange={() => handleSelectLocation(index)}
                      checked={selectedLocations.has(index)}
                    />
                  </td>
                  <td className="px-4 py-3">{lokasi.namaLokasi}</td>
                  <td className="px-4 py-3">{lokasi.gudang}</td>
                  <td className="px-4 py-3">{lokasi.jenis}</td>
                  <td className="px-4 py-3">{lokasi.volume}</td>
                  <td className="px-4 py-3">{lokasi.deskripsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-1 text-sm text-gray-700"
          >
            Batal
          </button>
          <button
            onClick={handleAddLocations}
            className={`border px-4 py-1 text-sm ${
              selectedLocations.size === 0
                ? "bg-gray-200 text-gray-400 border-gray-300"
                : "bg-orange-500 text-white border-orange-500"
            }`}
            disabled={selectedLocations.size === 0}
          >
            Tambahkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahLokasi;
