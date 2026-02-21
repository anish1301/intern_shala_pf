import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all duration-200';

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info side */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Let's talk about everything!
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your visions. Drop me a message — I'll
                  respond as soon as possible.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: <HiMail size={22} />, label: 'Email', value: 'anishkumar130119@gmail.com' },
                  { icon: <HiLocationMarker size={22} />, label: 'Location', value: 'Imphal, Manipur, India' },
                  { icon: <HiPhone size={22} />, label: 'Phone', value: '+91 9905468566' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-gray-300 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                {[
                  { icon: <FaGithub size={18} />, href: 'https://github.com/anish1301' },
                  { icon: <FaLinkedin size={18} />, href: 'https://linkedin.com/in/anish-kumar' },
                  { icon: <FaTwitter size={18} />, href: '#' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/15 hover:border-indigo-500/20 transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form side */}
          <ScrollReveal direction="right">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5"
            >
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'sent'
                  ? '✓ Message Sent!'
                  : status === 'error'
                  ? 'Failed — Try Again'
                  : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
