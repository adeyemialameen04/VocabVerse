import { useEffect, useRef, useState } from "react";
import "./results.css";
import { BsFillVolumeUpFill } from "react-icons/bs";

const Results = ({ data }) => {
  const [audio, setAudio] = useState("");
  const audioRef = useRef();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (data.phonetics.length !== 0) {
      const filterAudios = data?.phonetics.filter(
        (audio) => audio.audio !== ""
      );
      setAudio(filterAudios[0]);
    }
  }, [data]);

  useEffect(() => {
    console.log(audio);
  }, [audio]);

  const handlePlayAudio = () => {
    if (audioRef.current && audio !== "") {
      audioRef.current.play();
    }
  };

  return (
    <>
      {data && (
        <main className="results-main">
          <div className="container results__container">
            <section className="word-info">
              <div>
                <h1>{data?.word}</h1>
                <small>{data?.phonetic}</small>
              </div>
              <button onClick={handlePlayAudio}>
                <BsFillVolumeUpFill />
              </button>
            </section>
            <section className="word-meanings-container">
              {data.length !== 0 &&
                data?.meanings.map((meaning, index) => (
                  <article key={index} className="word-meanings">
                    <div>
                      <h1>{meaning?.partOfSpeech}</h1>
                      <div className="line"></div>
                    </div>
                    <h2>Meaning</h2>
                    <ul>
                      {meaning?.definitions.map((definition, index) => (
                        <li key={index}>{definition.definition}</li>
                      ))}
                      <audio
                        ref={audioRef}
                        src={audio.audio}
                        id="audio"
                        style={{ display: "none" }}
                      ></audio>
                    </ul>
                  </article>
                ))}
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Results;
