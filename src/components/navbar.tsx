import { IconBell } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <div className="px-4 py-2 flex bg-white justify-between items-center border-b">
      <div>
        <h1 className="font-semibold">Warehouse Management System</h1>
      </div>
      <div>
        <div className="flex gap-4 items-center">
          <div className="relative cursor-pointer">
            <div className="bg-red-500 absolute h-4 w-4 -right-1 -top-1 flex justify-center text-white rounded-md">
                <span className="text-[10px]">11</span>
            </div>
            <IconBell className="stroke-1 " size={20} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:rounded-md hover:bg-gray-200">
            <div className="bg-gray-500 h-6 w-6 rounded-md">

            </div>
            <span className="font-light">User</span>
          </div>
        </div>
      </div>
    </div>
  );
}
