interface BarangKosongProps{
    openModal: () => void
}
const BarangKosong = ({openModal}: BarangKosongProps) => {
  return (
    <div className="mt-8 border-t">
      <div className="bg-[#D9D9D9] border h-40 mt-2">
        <div className="flex-col flex items-center h-full justify-center">
          <h2 className="text-sm">Belum ada barang</h2>
          <span className="text-xs text-center text-[#9CA3AF]">
            Silahkan tambah barang terlebih dahulu untuk mulai memindahkan
          </span>
          <button
            onClick={openModal}
            className="bg-[#E5A000] mt-2 text-sm p-2 text-white"
          >
            Tambah Barang
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarangKosong;
