import DecryptedText from './DecryptedText';

export default function TitlePlayground() {
  return (
    <>
      <h1 className='playground-title'>
        <DecryptedText text="🎮 Playground 🎮!" animateOn="view"/>
      </h1>
      <h4>
        <DecryptedText
        text="Explorá herramientas, juegos y patrones técnicos."
        speed={100}
        maxIterations={20}
        characters="ABCD1234!?"
        className="revealed"
        parentClassName="all-letters"
        encryptedClassName="encrypted"
        />

      </h4>
      <div className='playground-subtitle'>
      <DecryptedText
        text="Te regalo el código!"
        animateOn="view"
        revealDirection="center"
      />
      </div>

    </>
  );
}
