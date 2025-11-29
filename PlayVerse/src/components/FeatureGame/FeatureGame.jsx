import React  from "react";
import { Star, Users } from "lucide-react";
import { f_games } from "./f_games";

export default function FeatureGames() {
    const featuredGames = f_games.filter(g => g.featured);
    return (
        <section className="container mx-auto px-4 py-8">
            <h3 className="text-3xl font-bold mb-6 flex items-center">
                <Star className="w-8 h-8 mr-3 text-yellow-400" />
                Featured Games
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                {featuredGames.map(game => (
                    <div
                        key={game.id}
                        className="bg-linear-to-l from-purple-800 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition shadow-xl border border-purple-500 border-opacity-30"
                    >
                        <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h4 className="text-xl font-bold mb-2">{game.title}</h4>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm">{game.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm">{game.players}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition">
                                    Let's Start
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}