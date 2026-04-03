import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocations } from '../../context/LocationsContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

/**
 * Premium Tabbed Details View - 'Segundo Esquema' Implementation.
 * Groups 16 data categories into logical tabs for the best UX.
 */
const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locations, categoryStyles, loading, error } = useLocations();
  const [activeTab, setActiveTab] = useState('general');

  const location = useMemo(() =>
    locations.find(loc => loc.id === parseInt(id)),
    [id, locations]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-neutral-50">Cargando detalles...</div>;
  if (error || !location) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center bg-neutral-50 min-h-screen">
        <div className="text-6xl mb-6">🏜️</div>
        <h2 className="text-2xl font-bold mb-4">{error || 'Registro no encontrado'}</h2>
        <Button onClick={() => navigate('/explorer')}>Volver al Directorio</Button>
      </div>
    );
  }

  const categoryStyle = categoryStyles[location.categoria_id] || { color: "#64748b", icon: "📍", label: "Servicios" };

  const tabs = [
    { id: 'general', label: 'Inicio', icon: '🏠' },
    { id: 'logistica', label: 'Viaje/Logística', icon: '🛂' },
    { id: 'servicios', label: 'Servicios/Gastro', icon: '🍴' },
    { id: 'naturaleza', label: 'Ecosistema', icon: '🌿' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Dynamic Hero Section */}
      <div className="h-[500px] relative w-full overflow-hidden">
        <img
          src={location.imagen}
          alt={location.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 pb-16">
          <div className="container-custom relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-xl">
                <span className="text-4xl">{categoryStyle.icon}</span>
              </div>
              <div className="flex flex-col">
                <Badge variant="primary" className="bg-accent-600 border-none text-white px-4 py-1 text-xs uppercase font-black tracking-widest shadow-soft">
                  {categoryStyle.label}
                </Badge>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary-300 font-bold text-[10px] uppercase tracking-tighter">
                    {location.identificacion?.pais} • {location.identificacion?.tipo}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-heading tracking-tighter drop-shadow-2xl">
              {location.titulo}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/80 font-medium">
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-sm">
                📍 {location.geospacial?.coordenadas}
              </span>
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-sm">
                💰 {location.descripcion_det?.moneda}
              </span>
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-sm">
                🔊 {location.descripcion_det?.idiomas.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="container-custom flex items-center justify-center gap-2 md:gap-8 overflow-x-auto py-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap
                ${activeTab === tab.id ? 'text-primary-800 scale-105' : 'text-neutral-400 hover:text-neutral-600'}
              `}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary-800 rounded-t-full shadow-[0_-4px_15px_rgba(45,80,22,0.4)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tabbed Content */}
      <main className="container-custom mt-12 max-w-6xl">

        {/* TAB: GENERAL */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white p-10 rounded-[3rem] shadow-soft border border-neutral-100 ring-1 ring-neutral-200/50">
                <h2 className="text-3xl font-black mb-10 text-neutral-900 flex items-center gap-4">
                  <span className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-2xl">📜</span>
                  Historia e Identidad
                </h2>
                <div className="prose prose-lg text-neutral-600 max-w-none">
                  <p className="text-2xl leading-relaxed mb-8 italic text-neutral-400 font-light border-l-4 border-primary-500 pl-6 bg-primary-50/20 py-4 rounded-r-2xl">
                    "{location.descripcion_det?.caracteristicas}"
                  </p>
                  <p className="text-xl leading-relaxed text-neutral-700 font-body">
                    {location.descripcion_det?.historia}
                  </p>
                </div>
              </section>

              <section className="bg-green-500 to-primary-950 p-10 rounded-[3rem] shadow-2xl text-white">
                <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">Visible en el Mapa y Medios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10  text-center">
                    <span className="text-4xl font-black text-accent-500">{location.visibilidad_mediatica?.rating}</span>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-2">Rating Global</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm text-center">
                    <span className="text-lg font-bold text-white mb-1 block">{location.visibilidad_mediatica?.redes_sociales}</span>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Redes Sociales</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm text-center">
                    <span className="text-lg font-bold text-white mb-1 block">{location.visibilidad_mediatica?.reconocimientos}</span>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Premios</p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-medium border border-neutral-100 flex flex-col gap-6">
                <h3 className="text-sm font-black text-neutral uppercase tracking-widest border-b pb-4">Localización Administrativa</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">País / Frontera</p>
                    <p className="text-base font-black">{location.identificacion?.pais}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Provincia / Región</p>
                    <p className="text-base font-black">{location.identificacion?.provincia}, {location.identificacion?.region}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Tipo de Lugar</p>
                    <p className="text-base font-black">{location.identificacion?.tipo}</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Área Protegida/Total</p>
                    <p className="text-base font-black">{location.geospacial?.area}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* TAB: LOGISTICA */}
        {activeTab === 'logistica' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-right-4 duration-700">
            <section className="bg-white p-10 rounded-[3rem] shadow-soft border border-neutral-100">
              <h2 className="text-3xl font-black mb-10 text-neutral-900 flex items-center gap-4">
                <span className="w-12 h-12 bg-accent-50 rounded-2xl flex items-center justify-center text-2xl">🛂</span> Requisitos y Frontera
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-neutral-900 text-white rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-xl group-hover:scale-110 transition-transform">📄</div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-800 uppercase tracking-widest mb-2">Documentos Necesarios</h4>
                    <p className="text-lg font-bold text-neutral-900 leading-tight">{location.requisitos_entrada?.documentos}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-accent-600 text-white rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-xl group-hover:scale-110 transition-transform">🎫</div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-800 uppercase tracking-widest mb-2">Visas y Permisos</h4>
                    <p className="text-lg font-bold text-neutral-900 leading-tight">{location.requisitos_entrada?.visas}</p>
                  </div>
                </div>
                <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4">
                  <span className="text-3xl animate-pulse">💉</span>
                  <div>
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Vacunas Exigidas</p>
                    <p className="text-sm font-black text-red-900">{location.requisitos_entrada?.vacunas}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-soft border border-neutral-100">
                <h2 className="text-2xl font-black mb-8 text-neutral-900 flex items-center gap-3">
                  <span className="text-3xl">☀️</span> Clima y Ambiente
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                    <span className="text-3xl font-black text-blue-800">{location.clima_ambiente?.temp}</span>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-2">Temp / Clima</p>
                  </div>
                  <div className="p-8 bg-orange-50 rounded-[2.5rem] border border-orange-100">
                    <span className="text-xl font-black text-orange-800 leading-tight block">{location.clima_ambiente?.epocas}</span>
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-2">Época Ideal</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-neutral-900 rounded-2xl text-center">
                  <p className="text-xs font-medium text-white/50">⚠️ Riesgo Ambiental: <span className="text-accent-400 font-black">{location.clima_ambiente?.riesgos}</span></p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-soft border border-neutral-100">
                <h2 className="text-xl font-black mb-6">Acceso y Transporte</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-neutral-50 px-6 py-4 rounded-2xl">
                    <span className="text-sm font-bold text-neutral-400">Rutas</span>
                    <span className="font-black text-neutral-800">{location.acceso_transporte?.rutas.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-neutral-50 px-6 py-4 rounded-2xl">
                    <span className="text-sm font-bold text-neutral-400">Transporte</span>
                    <span className="font-black text-neutral-800">{location.acceso_transporte?.transporte_publico}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: SERVICIOS */}
        {activeTab === 'servicios' && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <section className="bg-white p-10 rounded-[3rem] text-center shadow-soft border border-neutral-100">
                <h2 className="text-2xl font-black mb-8 text-neutral-900">Servicios Básicos</h2>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(location.servicios_basicos_det || {}).map(([key, value]) => (
                    <div key={key} className={`p-4 rounded-1xl flex items-center justify-center text-start border transition-all ${value === true ? 'bg-primary-50 border-primary-200 shadow-soft' : 'bg-neutral-50 border-neutral-100'}`}>
                      <span className="text-1xl block mb-1 ">
                        {key === 'agua' ? '💧' : key === 'luz' ? '💡' : key === 'salud' ? '🚑' : key === 'internet' ? '🌐' : '🏦'}
                      </span>
                      <p className="pl-2 text-[10px] font-black uppercase tracking-tighter">{key}</p>
                      <p className="pl-2 w-50 text-sm font-black text-neutral-800"> {value === true ? 'Sí' : value === false ? 'No' : value} </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-soft border border-neutral-100">
                <h2 className="text-2xl font-black mb-8 text-neutral-900 flex items-center justify-between">
                  <span>Alojamiento y Gastronomía</span>
                  <span className="text-xs bg-neutral-900 text-white px-4 py-1 rounded-full uppercase font-black tracking-widest">{location.horarios_operacion?.horarios}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary-800 uppercase tracking-widest border-b pb-2">Hoteles / Camping</h4>
                    {location.alojamiento_det.map((al, idx) => (
                      <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <p className="font-extrabold text-neutral-900">{al.nombre}</p>
                        <div className="flex justify-between mt-2 text-xs font-bold">
                          <span className="text-primary-600">{al.contacto}</span>
                          <span className="text-accent-700">{al.precio}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-secondary-800 uppercase tracking-widest border-b pb-2">Restaurantes</h4>
                    {location.gastronomia_det.map((ga, idx) => (
                      <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <p className="font-extrabold text-neutral-900">{ga.nombre}</p>
                        <div className="flex justify-between mt-2 text-xs font-bold">
                          <span className="text-neutral-500 italic">{ga.horarios}</span>
                          <span className="text-secondary-600">★ {ga.plato_estrella}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <section className="bg-neutral-900 text-white p-10 rounded-[3rem] shadow-2xl flex flex-wrap items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl text-white font-black mb-2 flex items-center gap-2">
                  <span className="text-accent-500">💰</span> Tarifas y Costos
                </h3>
                <p className="text-white/40 text-sm font-medium">Estimados por perfil de viajero</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center px-8 border-l border-white/10">
                  <p className="text-3xl font-black text-white">{location.tarifas_costos?.entrada}</p>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Entrada Gratuita</p>
                </div>
                <div className="text-center px-8 border-l border-white/10">
                  <p className="text-3xl font-black text-accent-500">{location.tarifas_costos?.estimados.split(' ')[0]}</p>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Gasto Mínimo</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB: NATURALEZA */}
        {activeTab === 'naturaleza' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-left-4 duration-700">
            <section className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-soft border border-neutral-100 flex flex-col items-center">
              <h2 className="text-3xl font-black mb-10 text-neutral-900 flex flex-col items-center gap-4 text-center">
                <span className="w-16 h-16 bg-primary-100 text-primary-800 rounded-3xl flex items-center justify-center text-3xl shadow-soft">🌱</span>
                Biodiversidad y Entorno
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                  <div>
                    <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">Ecosistemas Predominantes</h4>
                    <p className="text-xl font-bold text-neutral-800 leading-tight">{location.biodiversidad?.ecosistemas}</p>
                  </div>
                  <div className="flex gap-4">
                    {location.biodiversidad?.ballenas && <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase">🐳 Avistamiento Ballenas</span>}
                    {location.biodiversidad?.tortugas && <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl text-xs font-black uppercase">🐢 Anidación de Tortugas</span>}
                  </div>
                </div>
                <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                  <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">Fauna Emblemática</p>
                  <p className="text-lg font-black text-primary-900">{location.biodiversidad?.fauna}</p>
                </div>
              </div>

              <div className="space-y-6 w-full text-center flex flex-col items-center">
                <h3 className="text-xl font-black text-neutral-900 border-b border-neutral-100 pb-4 w-full">Actividades de Aventura</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {location.actividades_turisticas.map((act, idx) => (
                    <span key={idx} className="bg-white border-2 border-neutral-100 hover:border-primary-500 hover:text-primary-800 transition-all cursor-default px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-soft">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-green-900 p-10 rounded-[3rem] shadow-2xl text-white flex flex-col items-center text-center">
              <h2 className="text-2xl font-black mb-10 flex flex-col items-center gap-4">
                <span className="text-4xl p-4 bg-white/10 rounded-3xl backdrop-blur-sm">👤</span>
                Personal y Guías
              </h2>
              <div className="space-y-10 w-full">
                <div className="group">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Contacto de Campo</p>
                  <p className="text-2xl font-black text-accent-500 group-hover:scale-110 transition-transform">{location.personal_guias?.contacto}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Idiomas Soportados</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {location.personal_guias?.idiomas.map((idi, idx) => (
                      <span key={idx} className="bg-white/10 px-4 py-1.5 rounded-xl text-xs font-bold border border-white/10">{idi}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 w-full">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Tarifas de Guianza</p>
                  <p className="text-2xl font-bold text-white">{location.personal_guias?.tarifas}</p>
                </div>
              </div>
              <div className="mt-12 w-full">
                <Button variant="secondary" className="w-full bg-cyan-700 text-primary-950 font-black shadow-large hover:scale-105 transition-transform">Contactar Guía Oficial</Button>
              </div>
            </section>
          </div>
        )}

      </main>
    </div>
  );
};

export default DetailsPage;
