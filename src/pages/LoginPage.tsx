import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { login } from '../services/authService';

const FEATURES = [
  {
    icon: <CalculateRoundedIcon fontSize="small" />,
    title: 'Razonamiento Cuantitativo',
  },
  {
    icon: <MenuBookRoundedIcon fontSize="small" />,
    title: 'Lectura Crítica',
  },
  {
    icon: <TranslateRoundedIcon fontSize="small" />,
    title: 'Inglés',
  },
  {
    icon: <AccountBalanceRoundedIcon fontSize="small" />,
    title: 'Competencias Ciudadanas',
  },
  {
    icon: <EditNoteRoundedIcon fontSize="small" />,
    title: 'Comunicación Escrita',
  },
];

const HIGHLIGHTS = [
  {
    icon: <AutoGraphRoundedIcon fontSize="small" />,
    text: 'Modelos de IA entrenados específicamente para cada área del examen',
  },
  {
    icon: <ReplayRoundedIcon fontSize="small" />,
    text: 'Repaso inteligente de preguntas que contestaste mal',
  },
  {
    icon: <ChatRoundedIcon fontSize="small" />,
    text: 'Chatbot tutor que explica conceptos y resuelve dudas en tiempo real',
  },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — Informational panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-10 pt-8 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl font-extrabold text-white backdrop-blur-sm ring-1 ring-white/10">
            E
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">EduSaber</span>
            <p className="text-[13px] text-indigo-200">
              Preparación inteligente para el SABER PRO
            </p>
          </div>
        </div>

        {/* Hero + content */}
        <div className="flex-1 flex flex-col justify-center px-10 py-8">
          <h2 className="text-[2.25rem] font-extrabold leading-[1.2] tracking-tight">
            Practica con{' '}
            <span className="text-amber-300">IA</span>
            <br />
            y llegá preparado
            <br />
            al <span className="underline decoration-amber-300 decoration-4 underline-offset-4">examen</span>.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-indigo-100/90">
            EduSaber usa modelos de lenguaje fine‑tuned para generar preguntas,
            explicar respuestas y repasar los temas donde más lo necesitás.
            Nada de bancos estáticos — cada sesión es única.
          </p>

          <div className="mt-10 space-y-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/10">
                  {h.icon}
                </div>
                <p className="pt-1 text-sm leading-relaxed text-indigo-100">
                  {h.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
              5 áreas del examen
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={[
                    'flex items-center gap-2.5 rounded-xl bg-white/10 px-3.5 py-3 ring-1 ring-white/[0.06] backdrop-blur-sm',
                    i === FEATURES.length - 1 && FEATURES.length % 2 !== 0
                      ? 'col-span-2 max-w-[calc(50%-0.3125rem)]'
                      : '',
                  ].join(' ')}
                >
                  <span className="text-indigo-200">{f.icon}</span>
                  <span className="text-sm font-medium">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 pb-6 pt-4">
          <p className="text-[11px] text-indigo-300/70">
            © {new Date().getFullYear()} EduSaber · Preparación para pruebas estandarizadas
          </p>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex w-full min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-slate-950 lg:w-1/2 xl:w-[45%]">
        <div className="w-full max-w-[360px]">
          {/* Mobile-only branding */}
          <div className="mb-10 flex flex-col items-center lg:hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-extrabold text-white shadow-lg shadow-indigo-600/25 ring-1 ring-indigo-500/30">
              E
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-100">
              EduSaber
            </h1>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-slate-400">
              Preparación inteligente para el SABER PRO
            </p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block">
            <h1 className="text-[1.75rem] font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Iniciar sesión
            </h1>
            <p className="mt-1.5 text-[15px] text-gray-500 dark:text-slate-400">
              Accedé a tu espacio de práctica
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 lg:mt-10">
            <div className="space-y-1.5">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-slate-300"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm shadow-gray-900/5 transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-none"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-slate-300"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 shadow-sm shadow-gray-900/5 transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-none"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <VisibilityOffRoundedIcon fontSize="small" />
                  ) : (
                    <VisibilityRoundedIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/30">
                <p className="text-sm font-medium text-red-600 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-indigo-600 py-3 text-[15px] font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:shadow-none dark:focus:ring-offset-slate-950"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Ingresando...
                </span>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          {/* Mobile-only feature summary */}
          <div className="mt-10 space-y-4 lg:hidden">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
              ¿Qué ofrecés?
            </p>
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {h.icon}
                </div>
                <p className="pt-0.5 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};