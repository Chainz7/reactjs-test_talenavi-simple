import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

function Search({}) {
  const [data, setData] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [currentPage, setCurrentPage] = useState("1");

  // Data
  useEffect(() => {
    axios
      .get(`https://technical.test.talenavi.com/api/movie?page=${currentPage}`)
      .then((response) => {
        const fetchedData = response.data.data.data;
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);

  // Search
  let filteredMovies = null;
  if (data != null) {
    filteredMovies = data.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(searchField.toLowerCase()) ||
        movie.title.toLowerCase().includes(searchField.toLowerCase())
      );
    });
  }

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  if (!filteredMovies) {
    return null;
  }

  // Page
  const prePage = () => {
    setCurrentPage((prevPage) => String(Number(prevPage) - 1));
  };
  const nextPage = () => {
    setCurrentPage((nextPage) => String(Number(nextPage) + 1));
  };

  return (
    <section className="w-full flex flex-col items-center gap-4 py-6">
      <div className="w-4/5 flex justify-center gap-4">
        <div className="flex items-center font-semibold text-4xl pr-10">
          {currentPage}
        </div>
        <input
          className="w-96 text-headline outline-none border-none rounded-md placeholder-headline px-4 py-2 text-base bg-card-background"
          type="search"
          placeholder="Search"
          onChange={handleChange}
        />
        <Link
          to="/create"
          className="w-auto h-auto flex justify-center p-3 rounded-full bg-primary"
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgUlEQVR4nO2UQQqDQAxFczx1Ib3/YgasXbR3+D6R2VgXRehMWiQP/jYPkvDNgn8GuIFeoCcwOor1gIUSzY7ihX1C3Axi1V5wmVUDAygfB38fZaD/INZUX3qi4fidmB6UGkgT0FX4hat89VlCbF4QN/aCtz5XchSzNdy9pEIjBdaQFfJStTdQitdoAAAAAElFTkSuQmCC" />
        </Link>
      </div>
      <div className="w-4/5 flex flex-wrap flex-col items-center gap-4">
        <div className="w-full flex flex-wrap justify-center gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        <nav className="flex gap-3">
          <button
            className="w-auto px-3 py-1 rounded-md outline-none border-none bg-primary text-headline text-sm font-medium cursor-pointer"
            onClick={prePage}
            disabled={currentPage === "1"}
          >
            Prev
          </button>
          <button
            className="w-auto px-3 py-1 rounded-md outline-none border-none bg-primary text-headline text-sm font-medium cursor-pointer"
            onClick={nextPage}
            disabled={filteredMovies && filteredMovies.length < 10}
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}

export default Search;
