import React from "react";
 
export default function Footer() {
    return (
        <footer className="bg-black bg-opacity-50 border-t border-purple-500 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4">Play Verse</h4>
                        <p className="text-sm text-gray-400">Your ultimate gaming destination</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Browse Games</a></li>
                            <li><a href="#" className="hover:text-white">New Releases</a></li>
                            <li><a href="#" className="hover:text-white">Top Rated</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white">Discord</a></li>
                            <li><a href="#" className="hover:text-white">Twitter</a></li>
                            <li><a href="#" className="hover:text-white">YouTube</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    © 2025 Play Verse. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
