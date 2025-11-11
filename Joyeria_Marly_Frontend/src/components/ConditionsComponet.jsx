import React from "react";

function ConditionsComponet(props) {
  const { titulo, subtitulos } = props;

  const HTMLSubtitulos = subtitulos.map((subtitulo, index) => {
    return (
      <ul className="list-disc ml-9" key={index}>
        <li>{subtitulo}</li>
      </ul>
    );
  });

  return (
    <>
      <p className="md:font-semibold my-2">{titulo}</p>
      {HTMLSubtitulos}
    </>
  );
}

export default ConditionsComponet;
