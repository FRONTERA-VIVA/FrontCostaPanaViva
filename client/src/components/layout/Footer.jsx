import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
        {/* Branding Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6 pointer-events-none select-none">
            <div className="w-10 h-10 bg-primary-800 rounded-xl flex items-center justify-center text-white font-bold text-xl ring-2 ring-white/10">
              F
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white">
              FRONTERA<span className="text-primary-400">VIVA</span>
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6 font-body">
            Fomentando la integración, conectividad y el desarrollo sostenible en nuestra región fronteriza del Barú.
          </p>
          <div className="flex gap-4">
            {/* Simple social icon placeholders */}
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary-800 transition-colors cursor-pointer">
                <div className="w-3 h-3 bg-white/40 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Directory Column */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Directorio</h4>
          <ul className="space-y-4 text-white/50 text-sm font-medium">
            <li><a href="/explorer?category=tourism" className="text-referent hover:text-green-600 transition-colors">Turismo</a></li>
            <li><a href="/explorer?category=logistics" className="text-referent hover:text-green-600 transition-colors">Logística</a></li>
            <li><a href="/explorer?category=services" className="text-referent hover:text-green-600 transition-colors">Servicios</a></li>
            <li><a href="/explorer" className="text-referent hover:text-green-600 transition-colors">Ver todo</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Ayuda</h4>
          <ul className="space-y-4 text-white/50 text-sm font-medium">
            <li><a href="/border-info" className="text-referent hover:text-green-600 transition-colors">Puntos de control</a></li>
            <li><a href="/postulate" className="text-referent hover:text-green-600 transition-colors">Registrar servicio</a></li>
            <li><a href="#" className="text-referent hover:text-green-600 transition-colors">Preguntas frecuentes</a></li>
            <li><a href="#" className="text-referent hover:text-green-600 transition-colors">Soporte técnico</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Contacto</h4>
          <address className="not-italic space-y-4 text-white/50 text-sm font-medium">
            <p className="flex items-start gap-3">
              <span className="text-primary-400">📞</span>
              +507 888-0000
            </p>
            <p className="flex items-start gap-3">
              <span className="text-primary-400">✉️</span>
              info@fronteraviva.gob
            </p>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white/30 text-[10px] uppercase tracking-widest font-bold">
        <p>Copyright © 2026 Frontera Viva. Todos los derechos reservados.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="text-white hover:text-white/50">Términos</a>
          <a href="#" className="text-white hover:text-white/50">Privacidad</a>
          <a href="#" className="text-white hover:text-white/50">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;