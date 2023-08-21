import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Input from "./Components/Input/Input";
import Main from "./Components/Main/Main";
import Results from "./Components/Results/Results";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [searchValue, setSearchValue] = useState("");
  const audioRef = useRef(null);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const getDictionaryData = async () => {
    try {
      if (searchValue !== "") {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`
        );
        const data = await response.data[0];
        return data;
      }

      return null;
    } catch (error) {
      const wordNotFound =
        error?.response?.data?.title === "No Definitions Found";
      if (wordNotFound) {
        console.log(wordNotFound);
      }
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["fetchDictionary"],
    getDictionaryData,
    {
      enabled: !!searchValue,
    }
  );

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [searchValue]);

  const rendermain = () => {
    if (isError) {
      return (
        <Main
          heading={"Not Found"}
          message={
            "Sorry ! We found no result for the word you searched for in our dictionary."
          }
        />
      );
    }
    if (data === null || searchValue === "") {
      return (
        <Main
          heading={"Free Online Dictionary"}
          message={
            "Hello there! You can start using this free online dictionary by typing anything in the above search box."
          }
        />
      );
    }

    if (data && searchValue !== "") {
      return <Results data={data} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme === "light" ? "light" : "dark"}>
        <main className="app__main">
          <Navbar />
          <Input
            searchValue={searchValue}
            refetch={refetch}
            setSearchValue={setSearchValue}
          />
          <>{rendermain()}</>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
