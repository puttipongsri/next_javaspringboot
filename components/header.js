/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <header className="flex border-b py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center gap-5 w-full">
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-36"
          />
        </a>
        <div id="collapseMenu" className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <ul className="lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <a href="/homepage" className="lg:hover:text-[#007bff] text-gray-800 block font-semibold text-[15px]">
                Home
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <a href="/addproduct" className="lg:hover:text-[#007bff] text-gray-800 block font-semibold text-[15px]">
                Addproduct
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <a href="/contact" className="lg:hover:text-[#007bff] text-gray-800 block font-semibold text-[15px]">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="ml-auto">
          {user ? (
            <button
            onClick={handleLogout}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
          >
            Log out
          </button>
          ) : (
            <a href="/login" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
              Log in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
