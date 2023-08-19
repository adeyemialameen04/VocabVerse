import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { BsFillVolumeUpFill } from "react-icons/bs";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [audio, setAudio] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef(null);

  const getDictionaryData = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`
      );
      const data = await response.data[0];
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["fetchDictionary"],
    getDictionaryData,
    { enabled: submitted }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      setSubmitted(true);
    }
    refetch();
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleAudio = (phonetic) => {
    setAudio(phonetic?.audio);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <main className="app__main">
      <div className="container app__container">
        <form className="box" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Search a word"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue !== "" && (
              <FaTimes
                className="clear-input"
                onClick={() => setSearchValue("")}
              />
            )}
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        <>
          {data && (
            <>
              <article className="box phonetic">
                <h1>{data?.word}</h1>
                <div>
                  {data?.phonetics.map((phonetic) => (
                    <p>
                      <span>{phonetic.text}</span>
                      {phonetic.audio !== "" && (
                        <BsFillVolumeUpFill
                          style={{ fontSize: "1.3rem" }}
                          onClick={() => handleAudio(phonetic)}
                        />
                      )}
                    </p>
                  ))}
                </div>
                {audio && (
                  <audio
                    controls
                    ref={audioRef}
                    style={{
                      display: "none",
                    }}
                    autoPlay={true}
                    src={audio}
                  />
                )}
              </article>
              <article className="box definition">
                {data?.meanings.map((meaning) => (
                  <div>
                    <h2>{meaning?.partOfSpeech}</h2>
                    <>
                      {meaning?.definitions.map((definition) => (
                        <p>{definition.definition}</p>
                      ))}
                    </>
                  </div>
                ))}
              </article>
            </>
          )}
        </>
      </div>
    </main>
  );
}

export default App;
