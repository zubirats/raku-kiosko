// Placeholder. Frontend-agent reemplaza con la pantalla de bienvenida iOS HIG.
// Especificación visual en /Users/mauriciozubirats/raku-kiosko-design/mockups/01-bienvenida-iOS.html

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] p-8 text-center">
      <div className="max-w-md space-y-4">
        <div className="text-6xl mb-2">🍵</div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A]">
          Raku Kiosko
        </h1>
        <p className="text-base text-neutral-600">
          App en construcción. La pantalla de bienvenida iOS HIG llega en el siguiente commit.
        </p>
      </div>
    </div>
  );
}
