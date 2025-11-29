import React, { useState } from 'react';
import { Search, User, Star, Clock, Users, TrendingUp, Gamepad2, Sword, Zap, Trophy } from 'lucide-react';
import './App.css';
import { f_games } from './components/FeatureGame/f_games';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HeroSection from './components/Herosection/Herosection';
import FeatureGames from './components/FeatureGame/FeatureGame';


const PlayVerse = () => {
  const [showHTML, setShowHTML] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');


  const categories = [
    { id: 'all', name: 'All Games', icon: Gamepad2 },
    { id: 'action', name: 'Action', icon: Zap },
    { id: 'rpg', name: 'RPG', icon: Sword },
    { id: 'racing', name: 'Racing', icon: TrendingUp },
    { id: 'strategy', name: 'Strategy', icon: Trophy },
    { id: 'adventure', name: 'Adventure', icon: Clock }
  ];

  const filteredGames = f_games.filter(game => {
    const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredGames = f_games.filter(g => g.featured);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <Header />
      <HeroSection />

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 ${activeCategory === cat.id
                  ? 'bg-purple-600 shadow-lg'
                  : 'bg-linear-to-l from-purple-800 bg-opacity-100 hover:bg-opacity-20'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Games -> if you want to add some game but you do not have code yet */}
      {activeCategory === 'all' && (
        <FeatureGames />
      )}

      {/* All Games Grid  */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-3xl font-bold mb-6">
          {activeCategory === 'all' ? 'All Games' : categories.find(c => c.id === activeCategory)?.name}
        </h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <div
              key={game.id}
              className="bg-linear-to-l from-purple-800 bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition shadow-lg"
            >
              <img src={game.image} alt={game.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="font-bold mb-2">{game.title}</h4>
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{game.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{game.players}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full text-sm font-semibold transition
                  hover:transform hover:scale-105 cursor-pointer"
                    onClick={() => window.location.href = `/${game.title}/index.html`}
                   >
                    Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PlayVerse;
