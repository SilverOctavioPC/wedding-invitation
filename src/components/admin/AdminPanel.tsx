import React, { useState, useEffect, useMemo } from 'react';
import { Invitado } from '@/types';
import { getAllInvitados, createInvitado, deleteInvitado } from '@/lib/firebase';
import { 
  Users, UserCheck, UserX, Clock, Plus, Trash2, Copy, 
  Loader2, LogIn, Download, Search, RefreshCw, Eye, Heart, X, CheckCircle
} from 'lucide-react';

const ADMIN_PASSWORD = 'boda2026';

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

// ─── Stat Card ─────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, accent }: { 
  icon: React.ElementType; label: string; value: number; accent: string;
}) => (
  <div className="bg-white border border-stone-200 rounded-lg p-5 hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-9 h-9 rounded-lg ${accent} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-stone-400">{label}</span>
    </div>
    <p className="text-3xl font-display text-stone-800 group-hover:text-stone-900 transition-colors">{value}</p>
  </div>
);

// ─── Toast Notification ────────────────────────────────
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => { const t = setTimeout(onClose, 2500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-6 right-6 z-50 bg-stone-800 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-sm">
      <CheckCircle className="w-4 h-4 text-amber-400" /> {message}
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newNombre, setNewNombre] = useState('');
  const [newMax, setNewMax] = useState(2);
  const [creating, setCreating] = useState(false);
  const [selectedInvitado, setSelectedInvitado] = useState<Invitado | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setPasswordError(true);
    }
  };

  const fetchInvitados = async () => {
    setLoading(true);
    const data = await getAllInvitados();
    setInvitados(data);
    setLoading(false);
  };

  useEffect(() => { if (authenticated) fetchInvitados(); }, [authenticated]);

  const handleCreate = async () => {
    if (!newNombre.trim()) return;
    setCreating(true);
    const code = generateCode();
    const success = await createInvitado(code, {
      nombre: newNombre.trim(),
      maxInvitados: newMax,
      confirmado: false,
      asistira: null,
      telefono: '',
      numInvitados: 0,
      nombresAcompanantes: [],
      tieneRestricciones: null,
      restricciones: '',
      mensaje: '',
    });
    if (success) {
      setNewNombre('');
      setNewMax(2);
      setShowForm(false);
      setToast('Invitado creado exitosamente');
      await fetchInvitados();
    }
    setCreating(false);
  };

  const handleDelete = async (code: string) => {
    if (!confirm('¿Estás seguro de eliminar este invitado?')) return;
    await deleteInvitado(code);
    setToast('Invitado eliminado');
    await fetchInvitados();
  };

  const copyLink = (code: string) => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/?invite=${code}`);
    setToast('Link copiado al portapapeles');
  };

  const exportCSV = () => {
    const headers = ['Código','Nombre','Confirmado','Asistirá','Nº Invitados','Acompañantes','Teléfono','Restricciones','Mensaje'];
    const rows = invitados.map(i => [
      i.id, i.nombre, i.confirmado ? 'Sí' : 'No',
      i.asistira === 'yes' ? 'Sí' : i.asistira === 'no' ? 'No' : 'Pendiente',
      i.numInvitados, (i.nombresAcompanantes || []).join('; '),
      i.telefono, i.restricciones || '', i.mensaje || '',
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invitados_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = useMemo(() => {
    const total = invitados.length;
    const confirmados = invitados.filter(i => i.asistira === 'yes');
    const noAsisten = invitados.filter(i => i.asistira === 'no');
    const pendientes = invitados.filter(i => !i.confirmado);
    const totalPersonas = confirmados.reduce((acc, i) => acc + (i.numInvitados || 0), 0);
    return { total, confirmados: confirmados.length, noAsisten: noAsisten.length, pendientes: pendientes.length, totalPersonas };
  }, [invitados]);

  const filteredInvitados = useMemo(() => {
    if (!searchQuery) return invitados;
    const q = searchQuery.toLowerCase();
    return invitados.filter(i => i.nombre.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
  }, [invitados, searchQuery]);

  // ─── Login Screen ──────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 border border-amber-200 mb-6">
              <Heart className="w-7 h-7 text-amber-600" />
            </div>
            <h1 className="text-3xl font-display text-stone-800 mb-2">Panel de Bodas</h1>
            <p className="text-stone-400 text-sm">Administración de invitados</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                className={`w-full border-b-2 ${passwordError ? 'border-red-300' : 'border-stone-200'} py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 transition-colors text-lg`}
                placeholder="••••••••"
                autoFocus
              />
              {passwordError && <p className="text-red-400 text-xs mt-2">Contraseña incorrecta</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-stone-800 text-white py-3 rounded-lg text-sm uppercase tracking-widest hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Heart className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h1 className="text-lg font-display text-stone-800">Panel de Invitados</h1>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest">Administración de boda</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchInvitados} className="p-2.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-all" title="Refrescar">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-lg text-xs text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-all">
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <a href="/" className="text-xs text-stone-400 hover:text-stone-600 transition-colors ml-2">← Invitación</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatCard icon={Users} label="Total" value={stats.total} accent="bg-stone-500" />
          <StatCard icon={UserCheck} label="Confirmados" value={stats.confirmados} accent="bg-emerald-500" />
          <StatCard icon={UserX} label="No Asisten" value={stats.noAsisten} accent="bg-red-400" />
          <StatCard icon={Clock} label="Pendientes" value={stats.pendientes} accent="bg-amber-500" />
          <StatCard icon={Users} label="Personas" value={stats.totalPersonas} accent="bg-blue-400" />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o código..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-stone-700 transition-all"
          >
            <Plus className="w-4 h-4" /> Nuevo Invitado
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white border border-stone-200 rounded-lg p-6 mb-6 flex flex-col sm:flex-row gap-4 items-end shadow-sm">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Nombre del invitado</label>
              <input
                type="text"
                value={newNombre}
                onChange={(e) => setNewNombre(e.target.value)}
                className="w-full border-b-2 border-stone-200 py-2.5 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Nombre completo"
                autoFocus
              />
            </div>
            <div className="w-32">
              <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Max Inv.</label>
              <select
                value={newMax}
                onChange={(e) => setNewMax(Number(e.target.value))}
                className="w-full border-b-2 border-stone-200 py-2.5 text-stone-800 focus:outline-none focus:border-amber-500 bg-transparent"
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <button
              onClick={handleCreate}
              disabled={creating || !newNombre.trim()}
              className="bg-amber-600 text-white px-8 py-2.5 rounded-lg text-sm hover:bg-amber-700 transition-colors disabled:opacity-40"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Crear'}
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedInvitado && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setSelectedInvitado(null)}>
            <div className="bg-white border border-stone-200 rounded-xl max-w-md w-full p-8 shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display text-stone-800">{selectedInvitado.nombre}</h3>
                <button onClick={() => setSelectedInvitado(null)} className="p-1 text-stone-400 hover:text-stone-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-400">Código</span><span className="font-mono text-stone-600">{selectedInvitado.id}</span></div>
                <div className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-400">Estado</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedInvitado.asistira === 'yes' ? 'bg-emerald-50 text-emerald-700' : selectedInvitado.asistira === 'no' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                    {selectedInvitado.asistira === 'yes' ? 'Confirmado' : selectedInvitado.asistira === 'no' ? 'No asiste' : 'Pendiente'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-400">Teléfono</span><span className="text-stone-700">{selectedInvitado.telefono || '—'}</span></div>
                <div className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-400">Nº Personas</span><span className="text-stone-700">{selectedInvitado.numInvitados || '—'}</span></div>
                {selectedInvitado.nombresAcompanantes?.length > 0 && (
                  <div className="border-b border-stone-100 pb-3"><span className="text-stone-400 block mb-2">Acompañantes</span>
                    <ul className="space-y-1">{selectedInvitado.nombresAcompanantes.map((n, i) => <li key={i} className="text-stone-700 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{n}</li>)}</ul>
                  </div>
                )}
                {selectedInvitado.restricciones && (
                  <div className="border-b border-stone-100 pb-3"><span className="text-stone-400 block mb-1">Restricciones</span><p className="text-stone-700">{selectedInvitado.restricciones}</p></div>
                )}
                {selectedInvitado.mensaje && (
                  <div className="border-b border-stone-100 pb-3"><span className="text-stone-400 block mb-1">Mensaje</span><p className="text-stone-600 italic">"{selectedInvitado.mensaje}"</p></div>
                )}
                {selectedInvitado.fechaConfirmacion && (
                  <div className="flex justify-between"><span className="text-stone-400">Confirmación</span><span className="text-stone-500 text-xs">{new Date(selectedInvitado.fechaConfirmacion).toLocaleString('es-MX')}</span></div>
                )}
              </div>
              <button
                onClick={() => copyLink(selectedInvitado.id)}
                className="w-full mt-6 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-all flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" /> Copiar Link de Invitación
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-stone-300 mx-auto" />
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d6d3d1 transparent' }}>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/50">
                  <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Nombre</th>
                  <th className="text-left px-5 py-4 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Código</th>
                  <th className="text-center px-5 py-4 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Max</th>
                  <th className="text-center px-5 py-4 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Estado</th>
                  <th className="text-center px-5 py-4 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Personas</th>
                  <th className="text-right px-5 py-4 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvitados.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-16 text-stone-400">
                    {invitados.length === 0 ? (
                      <div>
                        <Users className="w-10 h-10 mx-auto mb-3 text-stone-300" />
                        <p>No hay invitados aún</p>
                        <p className="text-xs mt-1 text-stone-300">Usa el botón "Nuevo Invitado" para agregar</p>
                      </div>
                    ) : 'Sin resultados para tu búsqueda'}
                  </td></tr>
                ) : (
                  filteredInvitados.map((inv) => (
                    <tr key={inv.id} className="border-b border-stone-50 last:border-b-0 hover:bg-amber-50/30 transition-colors">
                      <td className="px-5 py-4 text-stone-800 font-medium">{inv.nombre}</td>
                      <td className="px-5 py-4 font-mono text-xs text-stone-400">{inv.id}</td>
                      <td className="px-5 py-4 text-center text-stone-500">{inv.maxInvitados}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium ${
                          inv.asistira === 'yes'
                            ? 'bg-emerald-50 text-emerald-700'
                            : inv.asistira === 'no'
                            ? 'bg-red-50 text-red-500'
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {inv.asistira === 'yes' ? 'Confirmado' : inv.asistira === 'no' ? 'No asiste' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center text-stone-500">{inv.asistira === 'yes' ? inv.numInvitados : '—'}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-0.5">
                          <button onClick={() => setSelectedInvitado(inv)} className="p-2 text-stone-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-all" title="Ver detalle">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => copyLink(inv.id)} className="p-2 text-stone-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all" title="Copiar link">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(inv.id)} className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all" title="Eliminar">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
