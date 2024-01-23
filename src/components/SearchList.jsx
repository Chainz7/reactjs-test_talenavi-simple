import React, { useState } from "react";
import Card from "./Card";

function SearchList({ filteredMovies }) {
  const [currentPage, setCurrentPage] = useState(1);
  if (!filteredMovies) {
    return null;
  }
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredMovies.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredMovies.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="w-4/5 flex flex-wrap flex-col items-center gap-4">
      <div className="w-full flex flex-wrap justify-center gap-6">
        {records.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
      <nav className="flex gap-3">
        <a href="#" onClick={prePage}>
          Prev
        </a>
        {numbers.map((n, i) => (
          <div key={i}>
            <a href="#" onClick={() => changeCPage(n)}>
              {n}
            </a>
          </div>
        ))}
        <a href="#" onClick={nextPage}>
          Next
        </a>
      </nav>
    </div>
  );
  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default SearchList;
