import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface NavbarProps {
  pageName?: string;
  streak?: number;
}

/**
 * Barra de navegación superior fija.
 * Muestra el logo, el nombre de la página activa y los indicadores del usuario.
 */
export const Navbar = ({ pageName = 'Inicio', streak = 0 }: NavbarProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Lado izquierdo: logo + sección actual */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg select-none">
          S
        </div>
        <span className="font-bold text-gray-900 text-base">Saber Pro</span>
        <span className="text-gray-300 font-light">|</span>
        <span className="text-gray-500 text-sm">{pageName}</span>
      </div>

      {/* Lado derecho: iconos de acción */}
      <div className="flex items-center gap-4">
        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <NotificationsOutlinedIcon fontSize="small" />
        </button>

        {/* Mensajes */}
        <button
          aria-label="Mensajes"
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <ChatBubbleOutlinedIcon fontSize="small" />
        </button>

        {/* Racha */}
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
          <LocalFireDepartmentIcon fontSize="small" className="text-orange-500" />
          <span className="text-sm font-bold text-orange-600">{streak}</span>
        </div>
      </div>
    </nav>
  );
};
