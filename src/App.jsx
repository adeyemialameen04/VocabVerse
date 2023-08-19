import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("bygone");

  const getMeaning = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMeaning();
  }, [searchValue]);

  return <>Hello</>;
}

export default App;
