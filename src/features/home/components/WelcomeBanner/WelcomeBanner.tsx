interface WelcomeBannerProps {
  username: string;
}

/**
 * Banner principal de bienvenida con gradiente y mensaje motivacional.
 */
export const WelcomeBanner = ({ username }: WelcomeBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
      <p className="text-indigo-200 text-sm font-medium uppercase tracking-widest mb-1">
        Panel de estudio
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        ¡Bienvenido/a, {username}! 
      </h1>
      <p className="text-indigo-100 text-base md:text-lg max-w-xl">
        Prepárate para el Saber Pro. Selecciona una de las cinco áreas y comienza
        a practicar con preguntas reales.
      </p>
    </div>
  );
};
