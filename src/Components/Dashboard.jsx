import React, { useState, useEffect } from "react";
import { 
  HomeIcon, 
  CameraIcon, 
  DocumentDuplicateIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PhotoIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  SparklesIcon,
  ClockIcon,
  UsersIcon,
  FolderOpenIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("converter");
  const [recentConversions, setRecentConversions] = useState([]);
  const [stats, setStats] = useState({
    totalConversions: 0,
    imagesProcessed: 0,
    storageSaved: 0,
    activeUsers: 0
  });

  // Simulate stats loading
  useEffect(() => {
    // Mock data
    setStats({
      totalConversions: 1247,
      imagesProcessed: 892,
      storageSaved: 156,
      activeUsers: 34
    });

    setRecentConversions([
      { id: 1, name: "product_photo.webp", format: "PNG", size: "2.4 MB", date: "2 min ago", status: "completed" },
      { id: 2, name: "banner_image.webp", format: "JPEG", size: "1.8 MB", date: "15 min ago", status: "completed" },
      { id: 3, name: "profile_pic.webp", format: "WebP", size: "0.9 MB", date: "1 hour ago", status: "completed" },
      { id: 4, name: "screenshot.png", format: "PNG", size: "3.2 MB", date: "3 hours ago", status: "completed" },
      { id: 5, name: "background.jpg", format: "JPEG", size: "5.1 MB", date: "5 hours ago", status: "completed" },
    ]);
  }, []);

  const modules = [
    { id: "converter", name: "Image Converter", icon: CameraIcon, description: "Convert between formats", color: "from-purple-500 to-pink-500" },
    { id: "resize", name: "Image Resizer", icon: PhotoIcon, description: "Resize with presets", color: "from-blue-500 to-cyan-500" },
    { id: "crop", name: "Image Cropper", icon: DocumentDuplicateIcon, description: "Crop with precision", color: "from-green-500 to-emerald-500" },
    { id: "compress", name: "Image Compressor", icon: ArrowPathIcon, description: "Reduce file size", color: "from-orange-500 to-red-500" },
  ];

  const formatStats = [
    { name: "PNG", count: 342, percentage: 27, color: "bg-green-500" },
    { name: "JPEG", count: 456, percentage: 37, color: "bg-blue-500" },
    { name: "WebP", count: 289, percentage: 23, color: "bg-purple-500" },
    { name: "Others", count: 160, percentage: 13, color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-20 -left-48"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse bottom-20 -right-48"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2"></div>
        <div className="absolute w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-3/4 left-1/4"></div>
      </div>

      {/* Main Dashboard Container */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <SparklesIcon className="w-8 h-8 text-purple-400" />
                Dashboard
              </h1>
              <p className="text-gray-300">Welcome back! Here's your image conversion overview</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <CloudArrowUpIcon className="w-4 h-4" />
                Upload
              </button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all">
                New Conversion
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <CameraIcon className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.totalConversions}</span>
            </div>
            <h3 className="text-gray-300 text-sm">Total Conversions</h3>
            <p className="text-xs text-gray-400 mt-1">+12.5% from last month</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <PhotoIcon className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.imagesProcessed}</span>
            </div>
            <h3 className="text-gray-300 text-sm">Images Processed</h3>
            <p className="text-xs text-gray-400 mt-1">+8.2% from last week</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DocumentArrowDownIcon className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.storageSaved} MB</span>
            </div>
            <h3 className="text-gray-300 text-sm">Storage Saved</h3>
            <p className="text-xs text-gray-400 mt-1">Through compression</p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.activeUsers}</span>
            </div>
            <h3 className="text-gray-300 text-sm">Active Users</h3>
            <p className="text-xs text-gray-400 mt-1">Currently online</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Modules */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - Modules */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-purple-400" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`group relative overflow-hidden rounded-xl p-4 text-left transition-all ${
                      activeModule === module.id
                        ? "bg-gradient-to-r " + module.color + " shadow-lg"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <module.icon className="w-8 h-8" />
                      <div>
                        <h3 className="font-semibold text-white">{module.name}</h3>
                        <p className="text-xs text-gray-300">{module.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Conversions */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-purple-400" />
                  Recent Conversions
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300">
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {recentConversions.map((conversion) => (
                  <div
                    key={conversion.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <PhotoIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{conversion.name}</p>
                        <p className="text-xs text-gray-400">
                          {conversion.format} • {conversion.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-400">{conversion.status}</span>
                      <p className="text-xs text-gray-400 mt-1">{conversion.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Insights */}
          <div className="space-y-6">
            {/* Format Distribution */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-purple-400" />
                Format Distribution
              </h2>
              <div className="space-y-3">
                {formatStats.map((format) => (
                  <div key={format.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{format.name}</span>
                      <span className="text-white">{format.count} images</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${format.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${format.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Savings */}
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <DocumentArrowDownIcon className="w-5 h-5 text-green-400" />
                Storage Savings
              </h2>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-green-400 mb-2">{stats.storageSaved} MB</div>
                <p className="text-gray-400 text-sm">Total space saved through optimization</p>
                <div className="mt-4 w-full bg-white/10 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: "68%" }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">68% average compression rate</p>
              </div>
            </div>

            {/* Tips Section */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-yellow-400" />
                Pro Tips
              </h2>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Use WebP format for 25-35% smaller file sizes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Maintain aspect ratio when resizing for best quality
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  PNG for transparency, JPEG for photos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Batch process up to 10 images at once
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}