import React,{ useState } from "react";
import { Search, User, Gamepad2 } from 'lucide-react';
export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Gamepad2 className="w-8 h-8 text-purple-400" />
                        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Play Verse
                        </h1>
                    </div>

                    <div className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-gray-400 bg-opacity-10 border border-purple-500 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-400 hover:bg-opacity-10 rounded-full transition">
                            <User className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}