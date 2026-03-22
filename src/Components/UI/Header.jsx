function Header({ activeTab, setActiveTab }) {
  return (
    <header className="relative backdrop-blur-xl bg-black/30 border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2"  onClick={() => setActiveTab("")}>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg rotate-45"></div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PixelForge
          </span>
        </div>

        <nav className="hidden md:flex gap-6">
          {["Resize", "Crop", "Effects", "Convert"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`text-sm transition-all duration-300 ${
                activeTab === item.toLowerCase()
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex gap-3">
        {/* <button className="px-5 py-2 rounded-full border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-all">
          Login
        </button>
        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
          Signup
        </button> */}
      </div>
    </header>
  );
}

export default Header;
