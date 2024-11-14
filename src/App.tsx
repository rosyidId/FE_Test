import { useState } from "react";
import Layout from "./layout";
import TambahLokasi from "./components/modal/tambah-lokasi";
import BarangKosong from "./components/barang-kosong";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import React from "react";
import ModalTambahBarang from "./components/modal/modal-barang";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataBarang, setDataBarang] = useState<any[]>([]);
  const [isModalOpenAddLocation, setIsModalOpenAddLocation] =
    useState<boolean>(false);
  const [barangId, setBarangId] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalAddLocation = (id: number) => {
    setBarangId(id);
    setIsModalOpenAddLocation(true);
  };
  const closeModalAddLocation = () => setIsModalOpenAddLocation(false);

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

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

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleDeleteLocation = (barangId: number, lokasiIndex: number) => {
    const updatedDataBarang = dataBarang.map((barang) => {
      if (barang.id === barangId) {
        const updatedLokasi = barang.lokasi.filter(
          (_:any, index: any) => index !== lokasiIndex
        );
        return { ...barang, lokasi: updatedLokasi }; 
      }
      return barang;
    });
  
    setDataBarang(updatedDataBarang); 
  };
  

  return (
    <Layout>
      <div>
        <ModalTambahBarang
          isOpen={isModalOpen}
          onClose={closeModal}
          setDataBarang={setDataBarang}
        />
        <TambahLokasi
          isOpen={isModalOpenAddLocation}
          onClose={closeModalAddLocation}
          dataBarang={dataBarang}
          setDataBarang={setDataBarang}
          barangId={barangId ?? -1}
        />
        <div className="px-4 mt-4">
          <div className="bg-white ">
            <div className="border-b px-3 py-2 text-sm">Buat Task Baru</div>
            <div className="px-3 py-4">
              <div className="md:flex gap-6 items-center">
                <div className="mb-2 md:mb-0">
                  <h2 className="font-normal text-xs">Task No</h2>
                  <input
                    type="text"
                    className="bg-[#F5F5F5] md:w-56 w-full border mt-1 text-sm px-2 py-1"
                    disabled
                    value={"SM-PB-001/24/2024"}
                  />
                </div>
                <div>
                  <h2 className="font-normal text-xs">Ditugaskan ke</h2>
                  <select
                    name=""
                    id=""
                    className="md:w-56 w-full border mt-1 text-sm px-2 py-1"
                  >
                    <option value="">Pilih Karyawan</option>
                    <option value="">Budi Hermawan</option>
                    <option value="">Jumdil Budiawan</option>
                  </select>
                </div>
              </div>
              {dataBarang.length === 0 ? (
                <BarangKosong openModal={openModal} />
              ) : (
                <>
                  <div className="flex justify-end ">
                    <button
                      onClick={openModal}
                      className="bg-[#E5A000] mt-2 text-sm p-2 text-white "
                    >
                      Tambah Barang
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs border-b text-gray-700 uppercase bg-[#FAFAFA] dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th className="px-3 py-3 border-r">
                              <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={
                                  selectedItems.size === dataBarang.length
                                }
                                className="h-4 w-4 cursor-pointer"
                              />
                            </th>
                            <th
                              scope="col"
                              className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap border-r"
                            >
                              Kode Barang
                            </th>
                            <th scope="col" className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap border-r">
                              Nama Barang
                            </th>
                            <th scope="col" className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap border-r">
                              Merk
                            </th>
                            <th scope="col" className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap border-r">
                              Jenis Barang
                            </th>
                            <th scope="col" className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap border-r">
                              Gudang
                            </th>
                            <th scope="col" className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap">
                              Total Stock (pcs)
                            </th>
                            <th scope="col" className="md:px-6 px-3 py-0.5 md:py-3 whitespace-nowrap"></th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          {dataBarang.map((barang, index) => (
                            <React.Fragment key={index}>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-3 py-2.5">
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.has(index)}
                                    onChange={() => handleSelectItem(index)}
                                    className="h-4 w-4 cursor-pointer"
                                  />
                                </td>
                                <td
                                  className="md:px-6 md:py-2.5 py-0.5 px-3 font-medium text-gray-900 flex items-center gap-2 whitespace-nowrap dark:text-white"
                                >
                                  <button
                                    onClick={() => toggleRowExpansion(index)}
                                    className="flex items-center gap-2"
                                  >
                                    {expandedRows.has(index) ? (
                                      <IconChevronUp
                                        className="bg-blue-300 w-4 h-4 rounded-md text-white"
                                        size={20}
                                      />
                                    ) : (
                                      <IconChevronDown
                                        className="border w-4 h-4 rounded-md text-black"
                                        size={20}
                                      />
                                    )}
                                    {barang.kode_barang}
                                  </button>
                                </td>
                                <td className="md:px-6 px-3 py-0.5 whitespace-nowrap md:py-2.5">
                                  {barang.nama_barang}
                                </td>
                                <td className="md:px-6 px-3 py-0.5 whitespace-nowrap md:py-2.5">{barang.merk}</td>
                                <td className="md:px-6 px-3 py-0.5 whitespace-nowrap md:py-2.5">
                                  {barang.jenis_barang}
                                </td>
                                <td className="md:px-6 px-3 py-0.5 whitespace-nowrap md:py-2.5">{barang.gudang}</td>
                                <td className="md:px-6 px-3 py-0.5 whitespace-nowrap md:py-2.5">
                                  {barang.total_stok}
                                </td>
                                <td className="md:px-6 px-3 py-0.5 whitespace-nowrap md:py-2.5">
                                  <button
                                    onClick={() =>
                                      openModalAddLocation(barang.id)
                                    }
                                    className="border whitespace-nowrap flex border-red-500 px-3 py-0.5 text-orange-500"
                                  >
                                  + Lokasi
                                  </button>
                                </td>
                              </tr>
                              {expandedRows.has(index) && (
                                <tr>
                                  <td
                                    colSpan={8}
                                    className="px-6 text-gray-600 bg-gray-100"
                                  >
                                    <div className="px-12">
                                      {barang.lokasi &&
                                      barang.lokasi.length > 0 ? (
                                        <ul>
                                          <div className="overflow-x-auto">
                                            <table className=" text-xs text-left text-gray-700 border">
                                              <thead className="bg-[#FAFAFA] border-b text-gray-600">
                                                <tr>
                                                  <th className="px-2 py-2">
                                                    Lokasi Awal
                                                  </th>
                                                  <th className="px-2 py-2">
                                                    QTY (PCS)
                                                  </th>
                                                  <th className="px-2 py-2">
                                                    Satuan
                                                  </th>
                                                  <th className="px-2 py-2">
                                                    Jumlah
                                                  </th>
                                                  <th className="px-2 py-2">
                                                    Tindakan
                                                  </th>
                                                </tr>
                                              </thead>
                                              {barang.lokasi.map(
                                                (lokasi: any, idx: any) => (
                                                  <tbody
                                                    key={idx}
                                                    className="text-gray-800"
                                                  >
                                                    <tr
                                                      key={index}
                                                      className="border-b hover:bg-gray-50"
                                                    >
                                                      <td className="px-2 py-1">
                                                        {lokasi.namaLokasi}
                                                      </td>
                                                      <td className="px-2 py-1">
                                                      <input type="number" name="" id="" className="border w-20 h-6 px-1"/>
                                                      </td>
                                                      <td className="px-2 py-1">
                                                        <select name="" id="" className="h-6">
                                                          <option value="">
                                                            Pilih Satuan
                                                          </option>
                                                          <option value="">
                                                            Kg
                                                          </option>
                                                          <option value="">
                                                            Mm
                                                          </option>
                                                        </select>
                                                      </td>
                                                      <td className="px-2 py-1">
                                                        {lokasi.volume}
                                                      </td>
                                                      <td className="px-2 py-1 flex justify-center items-center">
                                                        <button onClick={() => handleDeleteLocation(barang.id, index)} className="">
                                                        <IconTrash className="text-red-500 " size={20}/>
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                )
                                              )}
                                            </table>
                                          </div>
                                        </ul>
                                      ) : (
                                        <td
                                          colSpan={8}
                                          className="px- py-1 text-gray-600 bg-gray-100"
                                        >
                                          <div className=" py-2">
                                            <h2 className="font-semibold text-sm">
                                              Belum ada lokasi
                                            </h2>
                                            <p>
                                              Silahkan pilih dan tambahkan
                                              lokasi dengan menekan “+ Lokasi”
                                              terlebih dahulu untuk memindahkan
                                              barang
                                            </p>
                                          </div>
                                        </td>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-2">
                <div className="flex items-center mt-2 gap-2">
                  <button className="border px-6 py-1 text-sm">Batal</button>
                  <button
                    disabled
                    className="w-32 border py-1 text-sm border-[#D9D9D9] bg-[#F5F5F5]"
                  >
                    Generate Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
