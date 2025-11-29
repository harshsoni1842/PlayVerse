export default function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-5xl font-bold mb-4">Epic Gaming Awaits</h2>
                        <p className="text-xl mb-6 text-purple-100">
                            Discover thousands of games across all genres. Your next adventure starts here.
                        </p>
                        <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-purple-100 transition transform hover:scale-105">
                            Explore Now
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop"
                            alt="Gaming"
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}