import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import type { SubjectId, UserProfile } from '../types';
import { ChatBot } from './ChatBot';
import { logout } from '../services/authService';
import { getMyProfile } from '../services/userService';
import { useTheme } from './ThemeProvider';

interface AppShellContextValue {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

interface SidebarNavItemProps {
  to: string;
  label: string;
  icon: ReactNode;
  onNavigate: () => void;
  end?: boolean;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

const PRACTICE_SHORTCUTS: Array<{
  subjectId: SubjectId;
  label: string;
  icon: ReactNode;
}> = [
  {
    subjectId: 'razonamiento-cuantitativo',
    label: 'Cuantitativo',
    icon: <CalculateRoundedIcon fontSize="small" />,
  },
  {
    subjectId: 'competencias-ciudadanas',
    label: 'Ciudadanas',
    icon: <AccountBalanceRoundedIcon fontSize="small" />,
  },
  {
    subjectId: 'ingles',
    label: 'Ingles',
    icon: <TranslateRoundedIcon fontSize="small" />,
  },
];

const SidebarNavItem = ({
  to,
  label,
  icon,
  onNavigate,
  end = false,
}: SidebarNavItemProps) => (
  <NavLink
    to={to}
    end={end}
    onClick={onNavigate}
    className={({ isActive }) =>
      [
        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all',
        isActive
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
      ].join(' ')
    }
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-current">
      {icon}
    </span>
    <span>{label}</span>
  </NavLink>
);

const buildDisplayName = (profile: UserProfile | null): string => {
  if (!profile) {
    return 'Estudiante';
  }

  return `${profile.nombre} ${profile.apellido}`.trim();
};

const buildInitials = (profile: UserProfile | null): string => {
  if (!profile) {
    return 'SP';
  }

  const parts = [profile.nombre, profile.apellido]
    .map((value) => value.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return 'SP';
  }

  return parts
    .slice(0, 2)
    .map((value) => value[0]?.toUpperCase() ?? '')
    .join('');
};

const ProfileSkeleton = () => (
  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
    <div className="flex items-start gap-3">
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
    <div className="mt-4 flex gap-2">
      <div className="h-9 flex-1 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
  </div>
);

const ThemeModeButton = ({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all',
      isActive
        ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950'
        : 'text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
    ].join(' ')}
  >
    {icon}
    {label}
  </button>
);

const AppSidebar = ({
  isOpen,
  onClose,
  profile,
  isProfileLoading,
  profileError,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  isProfileLoading: boolean;
  profileError: string | null;
  onLogout: () => void;
}) => {
  const displayName = buildDisplayName(profile);
  const initials = buildInitials(profile);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar menu lateral"
        onClick={onClose}
        className={[
          'fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm transition-opacity',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-full max-w-[22rem] flex-col',
          'border-r border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">
                E
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">EduSaber</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Preparación inteligente para el SABER PRO</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar sidebar"
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {isProfileLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/95 p-4 dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-base font-bold text-white shadow-sm shadow-indigo-900/15">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                    {displayName}
                  </p>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {profile?.email ?? 'Sin correo disponible'}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {profile?.carrera ?? 'Carrera pendiente'}
                </span>
                <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
                  Semestre {profile?.semestre ?? '-'}
                </span>
              </div>
            </div>
          )}

          {profileError && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
              {profileError}
            </div>
          )}

          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2 px-1">
              <SchoolRoundedIcon fontSize="small" className="text-slate-400 dark:text-slate-500" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Navegacion
              </h2>
            </div>
            <div className="space-y-2">
              <SidebarNavItem
                to="/"
                end
                label="Inicio"
                icon={<HomeRoundedIcon fontSize="small" />}
                onNavigate={onClose}
              />
            </div>
          </section>

          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Practica rapida
              </h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                3 areas
              </span>
            </div>
            <div className="space-y-2">
              {PRACTICE_SHORTCUTS.map((shortcut) => (
                <SidebarNavItem
                  key={shortcut.subjectId}
                  to={`/quiz/${shortcut.subjectId}`}
                  label={shortcut.label}
                  icon={shortcut.icon}
                  onNavigate={onClose}
                />
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Apariencia
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              Cambia el tema de la interfaz
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              La preferencia se guarda en este navegador y se mantiene al volver a iniciar sesion.
            </p>
            <div className="mt-4 flex rounded-[20px] bg-slate-100 p-1 dark:bg-slate-900">
              <ThemeModeButton
                label="Claro"
                icon={<LightModeRoundedIcon fontSize="small" />}
                isActive={theme === 'light'}
                onClick={() => setTheme('light')}
              />
              <ThemeModeButton
                label="Oscuro"
                icon={<DarkModeRoundedIcon fontSize="small" />}
                isActive={theme === 'dark'}
                onClick={() => setTheme('dark')}
              />
            </div>
          </section>
        </div>

        <div className="border-t border-slate-200 px-5 py-5 dark:border-slate-800">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
          >
            <LogoutRoundedIcon fontSize="small" />
            Cerrar sesion
          </button>
        </div>
      </aside>
    </>
  );
};

export const useAppShell = (): AppShellContextValue => {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error('useAppShell debe usarse dentro de AppShell.');
  }

  return context;
};

export const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const nextProfile = await getMyProfile();

        if (!isMounted) return;

        setProfile(nextProfile);
        setProfileError(null);
      } catch (error) {
        if (!isMounted) return;

        const message =
          error instanceof Error ? error.message : 'No fue posible cargar tu perfil.';

        setProfileError(message);

        if (message === 'Tu sesion expiro. Inicia sesion de nuevo.') {
          logout();
          navigate('/login', { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsProfileLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const contextValue = useMemo<AppShellContextValue>(
    () => ({
      isSidebarOpen,
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
      toggleSidebar: () => setIsSidebarOpen((previous) => !previous),
    }),
    [isSidebarOpen],
  );

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppShellContext.Provider value={contextValue}>
      <Outlet />
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={contextValue.closeSidebar}
        profile={profile}
        isProfileLoading={isProfileLoading}
        profileError={profileError}
        onLogout={handleLogout}
      />
      <ChatBot />
    </AppShellContext.Provider>
  );
};
