import React from 'react'
import Navbar from './components/navbar'

interface LayoutProps{
    children: React.ReactNode
}
const Layout = ({children}:LayoutProps) => {
  return (
    <main className='bg-[#F0F2F5] h-screen'>
        <Navbar />
        <div className="bg-white px-4 py-5">
          <div>
            <span className="text-sm font-light text-black/45">
              Stock Movement <span className="text-lg">/</span> Pemindahan
              Barang
            </span>
          </div>
          <div>Pemindahan barang</div>
        </div>
        {children}
    </main>
  )
}

export default Layout