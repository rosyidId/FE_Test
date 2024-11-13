import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

interface LoginFormProps {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormProps>({
    username: '',
    password: ''
  });
  const { isLoading, error, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={handleChange}
              required
              className="placeholder:text-sm mt-2 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} 
              id="password"
              name="password"
              placeholder="**************"
              value={formData.password}
              onChange={handleChange}
              required
              className="placeholder:text-sm mt-2 w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10" // Tambahkan padding kanan untuk ruang ikon
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 bottom-0 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
               <IconEye className='text-gray-500' size={20}/>
              ) : (
                <IconEyeClosed className='text-gray-500' size={20}/>
              )}
            </span>
          </div>

          {error && (
            <div className="bg-red-500/10 px-4 py-2">
              <span className="text-red-500 text-xs leading">Periksa kembali username atau password yang anda masukkan</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#E5A000] text-white py-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
