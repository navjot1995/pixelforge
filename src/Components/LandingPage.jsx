import viteLogo from "../assets/vite.svg";
import heroImg from "../assets/hero.png";
import { 
  ArrowRightIcon, 
} from "@heroicons/react/24/outline";

function LandingPage({setActiveTab}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      <section className="py-20" id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <div className="framework w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg rotate-45"></div>
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
                   <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transform Your Images
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              With Pixel Precision
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The ultimate image processing platform that converts, resizes, crops, and compresses 
            images with cutting-edge technology. All processing happens locally in your browser.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                  onClick={() => setActiveTab("resize")}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

// import React, { useState, useEffect } from "react";
// import { 
//   ArrowRightIcon, 
//   PhotoIcon, 
//   ArrowsPointingOutIcon,
//   ScissorsIcon,
//   ArrowPathIcon,
//   CloudArrowUpIcon,
//   DocumentArrowDownIcon,
//   SparklesIcon,
//   ShieldCheckIcon,
//   BoltIcon,
//   DevicePhoneMobileIcon,
//   CpuChipIcon,
//   CheckBadgeIcon,
//   CommandLineIcon,
//   GlobeAltIcon
// } from "@heroicons/react/24/outline";
// // import { useNavigate } from "react-router-dom";

// function LandingPage() {
//   // const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState({});

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const sections = document.querySelectorAll("section");
//     sections.forEach((section) => observer.observe(section));

//     return () => observer.disconnect();
//   }, []);

//   const features = [
//     {
//       icon: PhotoIcon,
//       title: "Multi-Format Converter",
//       description: "Convert between PNG, JPEG, WebP, BMP, and TIFF formats with just one click.",
//       color: "from-purple-500 to-pink-500",
//       gradient: "from-purple-500/20 to-pink-500/20"
//     },
//     {
//       icon: ArrowsPointingOutIcon,
//       title: "Smart Resize",
//       description: "Resize images with presets or custom dimensions while maintaining aspect ratio.",
//       color: "from-blue-500 to-cyan-500",
//       gradient: "from-blue-500/20 to-cyan-500/20"
//     },
//     {
//       icon: ScissorsIcon,
//       title: "Precision Crop",
//       description: "Crop images with interactive tools, presets, and precise coordinate controls.",
//       color: "from-green-500 to-emerald-500",
//       gradient: "from-green-500/20 to-emerald-500/20"
//     },
//     {
//       icon: ArrowPathIcon,
//       title: "Smart Compression",
//       description: "Reduce file size while maintaining quality with advanced compression algorithms.",
//       color: "from-orange-500 to-red-500",
//       gradient: "from-orange-500/20 to-red-500/20"
//     },
//   ];

//   const stats = [
//     { value: "10M+", label: "Images Processed", icon: PhotoIcon },
//     { value: "500K+", label: "Active Users", icon: UsersIcon },
//     { value: "99.9%", label: "Uptime", icon: BoltIcon },
//     { value: "50+", label: "Countries", icon: GlobeAltIcon },
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Photographer",
//       content: "PixelForge has revolutionized my workflow. The quality is outstanding and it's incredibly fast!",
//       avatar: "SJ",
//       rating: 5
//     },
//     {
//       name: "Mike Chen",
//       role: "Web Developer",
//       content: "The batch processing feature saves me hours of work. Best image tool I've ever used!",
//       avatar: "MC",
//       rating: 5
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Social Media Manager",
//       content: "Perfect for optimizing images for social media. The presets are a game-changer!",
//       avatar: "ER",
//       rating: 5
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-20 -left-48"></div>
//         <div className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse bottom-20 -right-48"></div>
//         <div className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2"></div>
//         <div className="absolute w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-3/4 left-1/4"></div>
//       </div>

//       {/* Hero Section */}
//       <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
//         <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
//           {/* Animated Logo Container */}
//           <div className="relative mb-8 inline-block">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
//             <div className="relative flex items-center justify-center gap-4">
//               <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl rotate-45 animate-pulse"></div>
//               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl">
//                 <PhotoIcon className="w-10 h-10 text-purple-400" />
//               </div>
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//             Transform Your Images
//             <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               With Pixel Precision
//             </span>
//           </h1>
          
//           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//             The ultimate image processing platform that converts, resizes, crops, and compresses 
//             images with cutting-edge technology. All processing happens locally in your browser.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               // onClick={() => navigate("/dashboard")}
//               className="group px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
//             >
//               Get Started Free
//               <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
//               Watch Demo
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 transform transition-all duration-500 hover:scale-105 ${
//                   isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//                 }`}
//                 style={{ transitionDelay: `${index * 100}ms` }}
//               >
//                 <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-white">{stat.value}</div>
//                 <div className="text-sm text-gray-400">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
//             <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="relative py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Powerful Features for
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Every Need</span>
//             </h2>
//             <p className="text-gray-300 text-lg max-w-2xl mx-auto">
//               Everything you need to transform your images professionally
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
//                   isVisible.features ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//                 }`}
//                 style={{ transitionDelay: `${index * 100}ms` }}
//               >
//                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                   <feature.icon className={`w-6 h-6 text-white`} />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
//                 <p className="text-gray-400 text-sm">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="relative py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               How It Works
//               <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Simple & Fast</span>
//             </h2>
//             <p className="text-gray-300 text-lg">Three steps to perfect images</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { step: "01", icon: CloudArrowUpIcon, title: "Upload", description: "Drag & drop your image or click to upload" },
//               { step: "02", icon: SparklesIcon, title: "Transform", description: "Crop, resize, convert, or compress as needed" },
//               { step: "03", icon: DocumentArrowDownIcon, title: "Download", description: "Save your optimized image in any format" }
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className={`relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 text-center ${
//                   isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//                 }`}
//                 style={{ transitionDelay: `${index * 150}ms` }}
//               >
//                 <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
//                   {item.step}
//                 </div>
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
//                   <item.icon className="w-8 h-8 text-purple-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
//                 <p className="text-gray-400">{item.description}</p>
//                 {index < 2 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
//                     <ArrowRightIcon className="w-6 h-6 text-purple-400" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section id="why-choose" className="relative py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className={`${isVisible["why-choose"] ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"} transition-all duration-700`}>
//               <h2 className="text-4xl font-bold text-white mb-6">
//                 Why Choose
//                 <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> PixelForge?</span>
//               </h2>
//               <div className="space-y-4">
//                 {[
//                   { icon: ShieldCheckIcon, title: "100% Privacy", desc: "All processing happens locally - your images never leave your device" },
//                   { icon: BoltIcon, title: "Lightning Fast", desc: "Powered by WebAssembly for instant processing" },
//                   { icon: DevicePhoneMobileIcon, title: "Responsive Design", desc: "Works perfectly on desktop, tablet, and mobile" },
//                   { icon: CpuChipIcon, title: "Advanced Algorithms", desc: "State-of-the-art image processing technology" }
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
//                     <item.icon className="w-6 h-6 text-purple-400 flex-shrink-0" />
//                     <div>
//                       <h3 className="text-white font-semibold">{item.title}</h3>
//                       <p className="text-gray-400 text-sm">{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className={`${isVisible["why-choose"] ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"} transition-all duration-700 delay-200`}>
//               <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
//                 <h3 className="text-2xl font-bold text-white mb-4">Ready to transform your images?</h3>
//                 <p className="text-gray-300 mb-6">
//                   Join thousands of users who trust PixelForge for their image processing needs.
//                 </p>
//                 <button
//                   // onClick={() => navigate("/dashboard")}
//                   className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
//                 >
//                   Start Converting Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="relative py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Loved by
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Creators Worldwide</span>
//             </h2>
//             <p className="text-gray-300 text-lg">See what our users have to say</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className={`backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all ${
//                   isVisible.testimonials ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//                 }`}
//                 style={{ transitionDelay: `${index * 100}ms` }}
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
//                     {testimonial.avatar}
//                   </div>
//                   <div>
//                     <h4 className="text-white font-semibold">{testimonial.name}</h4>
//                     <p className="text-gray-400 text-xs">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 text-sm mb-3">"{testimonial.content}"</p>
//                 <div className="flex gap-1">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <span key={i} className="text-yellow-400">★</span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section id="cta" className="relative py-20">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl border border-white/20 p-12">
//             <h2 className="text-4xl font-bold text-white mb-4">
//               Ready to Transform Your Images?
//             </h2>
//             <p className="text-gray-300 text-lg mb-8">
//               Start using PixelForge today and experience the future of image processing.
//             </p>
//             <button
//               // onClick={() => navigate("/dashboard")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all inline-flex items-center gap-2"
//             >
//               Get Started Free
//               <ArrowRightIcon className="w-5 h-5" />
//             </button>
//             <p className="text-gray-400 text-sm mt-4">No credit card required • Free forever</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // Add missing UsersIcon component
// const UsersIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// export default LandingPage;
