import React from "react";

// function Footer() {
//   return (
//     <footer className="px-4 py-6" id="next-steps">
//       <div id="social">
//         <svg className="icon" role="presentation" aria-hidden="true">
//           <use href="/icons.svg#social-icon"></use>
//         </svg>
//         <h2>Connect with us</h2>
//         <p>Join the Vite community</p>
//         <ul>
//           <li>
//             <a href="https://github.com/vitejs/vite" target="_blank">
//               <svg
//                 className="button-icon"
//                 role="presentation"
//                 aria-hidden="true"
//               >
//                 <use href="/icons.svg#github-icon"></use>
//               </svg>
//               GitHub
//             </a>
//           </li>
//           <li>
//             <a href="https://chat.vite.dev/" target="_blank">
//               <svg
//                 className="button-icon"
//                 role="presentation"
//                 aria-hidden="true"
//               >
//                 <use href="/icons.svg#discord-icon"></use>
//               </svg>
//               Discord
//             </a>
//           </li>
//           <li>
//             <a href="https://x.com/vite_js" target="_blank">
//               <svg
//                 className="button-icon"
//                 role="presentation"
//                 aria-hidden="true"
//               >
//                 <use href="/icons.svg#x-icon"></use>
//               </svg>
//               X.com
//             </a>
//           </li>
//           <li>
//             <a href="https://bsky.app/profile/vite.dev" target="_blank">
//               <svg
//                 className="button-icon"
//                 role="presentation"
//                 aria-hidden="true"
//               >
//                 <use href="/icons.svg#bluesky-icon"></use>
//               </svg>
//               Bluesky
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div className="text-center text-xs text-gray-400 align-baseline">
//         <p>© 2024 PixelForge - Advanced Image Processing Platform</p>
//         <p className="mt-1">
//           All processing happens locally in your browser • 100% Private & Secure
//         </p>
//       </div>
//     </footer>
//   );
// }

function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      url: "https://github.com/vitejs/vite",
      color: "hover:text-gray-300"
    },
    {
      name: "Discord",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128c.126-.094.251-.19.371-.285a.08.08 0 0 1 .084-.01c3.928 1.793 8.18 1.793 12.062 0a.08.08 0 0 1 .085.009c.12.094.245.19.371.285a.077.077 0 0 1-.008.128a12.414 12.414 0 0 1-1.873.892a.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      url: "https://chat.vite.dev/",
      color: "hover:text-indigo-400"
    },
    {
      name: "X.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "https://x.com/vite_js",
      color: "hover:text-white"
    },
    {
      name: "Bluesky",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.335c-2.067-2.133-5.463-3.668-8.968-3.668C1.348 2.667.5 3.292.5 4.834c0 .867.518 2.216.889 2.852.635 1.092 2.777 1.509 4.809 1.812 2.523.377 4.813.967 4.813 2.106 0 1.694-2.147 2.614-4.367 2.614-2.634 0-5.43-1.126-5.43-1.126l-.536 2.639s2.319 1.506 6.258 1.506c3.024 0 5.777-1.194 5.777-4.374 0-2.54-1.974-3.845-4.65-4.204-2.023-.27-4.253-.633-4.253-1.597 0-1.046 1.657-1.592 3.19-1.592 2.304 0 4.76 1.126 4.76 1.126l.538-2.639s-2.112-1.126-5.298-1.126c-2.634 0-5.43 1.126-5.43 3.69 0 1.892 1.45 3.221 4.213 3.648 2.023.31 4.648.84 4.648 2.106 0 1.558-1.88 2.106-3.855 2.106-2.91 0-6.258-1.126-6.258-1.126l-.536 2.639s2.319 1.506 6.258 1.506c4.502 0 7.97-2.078 7.97-5.865 0-2.985-2.016-4.284-5.12-4.789-2.023-.33-4.253-.812-4.253-1.592 0-.78 1.34-1.126 2.79-1.126 2.063 0 4.509 1.126 4.509 1.126l.537-2.639s-2.111-1.126-5.046-1.126c-2.634 0-5.43 1.126-5.43 3.69 0 1.892 1.45 3.221 4.213 3.648 2.023.31 4.648.84 4.648 2.106 0 1.558-1.88 2.106-3.855 2.106-2.91 0-6.258-1.126-6.258-1.126l-.536 2.639s2.319 1.506 6.258 1.506c4.502 0 7.97-2.078 7.97-5.865 0-2.985-2.016-4.284-5.12-4.789-2.023-.33-4.253-.812-4.253-1.592 0-.78 1.34-1.126 2.79-1.126 2.063 0 4.509 1.126 4.509 1.126l.537-2.639s-2.111-1.126-5.046-1.126z" />
        </svg>
      ),
      url: "https://bsky.app/profile/vite.dev",
      color: "hover:text-sky-400"
    },
  ];

  const quickLinks = [
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "API", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Support", href: "#" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="relative">
      {/* Glow Effect */}
      {/* <div className="absolute inset-x-0 -top-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div> */}
      
      {/* Main Footer Content */}
      <div className="relative backdrop-blur-xl bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg rotate-45"></div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PixelForge
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced image processing platform that transforms your images with cutting-edge technology.
                All processing happens locally in your browser.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <span className="w-1 h-4 bg-pink-500 rounded-full"></span>
                Features
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Multi-Format Conversion
                </li>
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Advanced Crop Tools
                </li>
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Smart Resize & Presets
                </li>
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Lossless Compression
                </li>
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Batch Processing
                </li>
                <li className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Real-time Preview
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates and tips about image optimization.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:shadow-lg transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-xs text-gray-400">
                  © 2024 PixelForge - Advanced Image Processing Platform
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  All processing happens locally in your browser • 100% Private & Secure
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4">
                {legalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Version */}
              <div className="text-xs text-gray-500">
                <span className="px-2 py-1 rounded-full bg-white/5">v2.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-10 pointer-events-none"></div>
    </footer>
  );
}

export default Footer;
