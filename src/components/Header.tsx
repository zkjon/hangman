const Header = () => (
  <header>
    <h1 className="text-4xl font-medium underline w-fit">
      El juego del ahorcado
    </h1>
    <p className="mt-4 text-2xl font-ligth max-w-2xl text-justify">
      Bienvenido al juego del ahorcado, donde puedes poner a prueba tus
      habilidades de adivinanza y vocabulario. El objetivo del juego es adivinar
      la palabra oculta antes de que se complete el dibujo del ahorcado, tardará{" "}
      <strong className={`underline`}>6 intentos</strong> en completarse.
    </p>
  </header>
);

export default Header;
