import { IconBell } from "@tabler/icons-react";
import Dropdown from './dropdown'; 
import useCurrentUser from "../hooks/useCurrentUser";
export default function Navbar() {
  const {user} = useCurrentUser();
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
            <IconBell className="stroke-1" size={20} />
          </div>
          <Dropdown username={user?.username} imageUrl="https://dummyjson.com/icon/emilys/128" />
        </div>
      </div>
    </div>
  );
}
