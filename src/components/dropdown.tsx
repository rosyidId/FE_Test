import { useState, useRef, useEffect } from 'react';
import ModalLogout from './modal/modal-logout';
import useLogin from '../hooks/useLogin';
import useCurrentUser from '../hooks/useCurrentUser';

interface UserProfileDropdownProps {
  username: string | undefined;
  imageUrl: string;
}

const Dropdown: React.FC<UserProfileDropdownProps> = ({ username, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); 
  const {logout} = useLogin();
  const {user} = useCurrentUser();
  

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsModalOpen(false); 
  };

  return (
    <div className="relative" ref={dropdownRef}>
       <ModalLogout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogout={handleLogout}
      />
      <div
        className="flex items-center gap-2 cursor-pointer p-1 hover:rounded-md hover:bg-gray-200"
        onClick={toggleDropdown}
      >
        <div className="bg-gray-500 h-6 w-6 rounded-md">
          <img src={imageUrl} alt="User profile" className="h-full w-full rounded-full object-cover" />
        </div>
        <span className="font-light">{username}</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border">
          <div className="px-4 py-2 border-b">
            <p className="font-semibold text-gray-800">Profile</p>
          </div>
          <div className="px-4 py-2 text-gray-600">
            <p className='text-xs whitespace-normal break-words'>{user?.email}</p>
          </div>
          <div className="flex justify-between px-4 py-2 text-gray-600">
            <button onClick={() => alert('sorry halaman belum tersedia!!')} className="text-sm text-blue-500">Settings</button>
            <button onClick={() => setIsModalOpen(true)} className="text-sm text-red-500">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
