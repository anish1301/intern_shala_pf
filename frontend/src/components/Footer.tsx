import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <a href="#home" className="text-xl font-extrabold gradient-text">
              {'<AK />'}
            </a>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Anish Kumar. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: <FaGithub size={16} />, href: '#' },
              { icon: <FaLinkedin size={16} />, href: '#' },
              { icon: <FaTwitter size={16} />, href: '#' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Built with */}
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            Built with <FaHeart className="text-red-400 text-[10px]" /> using React, TypeScript & Python
          </p>
        </div>
      </div>
    </footer>
  );
}
