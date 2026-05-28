import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useAppShell } from './AppShell';

interface NavbarProps {
  pageName?: string;
  streak?: number;
}

export const Navbar = ({ pageName = 'Inicio', streak = 0 }: NavbarProps) => {
  const { openSidebar } = useAppShell();

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Abrir menu lateral"
          className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
        >
          <MenuRoundedIcon fontSize="small" />
        </button>
<div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg select-none">
          E
        </div>
        <span className="text-base font-bold text-gray-900 dark:text-slate-100">EduSaber</span>
        <span className="font-light text-gray-300 dark:text-slate-700">|</span>
        <span className="text-sm text-gray-500 dark:text-slate-400">{pageName}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 dark:border-orange-950 dark:bg-orange-950/30">
          <LocalFireDepartmentIcon fontSize="small" className="text-orange-500" />
          <span className="text-sm font-bold text-orange-600 dark:text-orange-300">{streak}</span>
        </div>
      </div>
    </nav>
  );
};
