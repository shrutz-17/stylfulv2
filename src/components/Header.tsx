import React from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 flex items-center justify-start">
            <h1 className="text-2xl font-italics text-black">Stylful | Petite Clothing</h1>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Search for petite clothing..."
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <User className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <ShoppingBag className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
