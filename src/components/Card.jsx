import React from "react";
import { Link } from "react-router-dom";

function card({ movie }) {
  return (
    <Link
      to={`/detail/${movie.id}`}
      className="w-64 h-128 flex flex-col justify-end rounded-md bg-card-background"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="w-full h-full rounded-md">
        <img className="mask-bottom" src={movie.image} />
      </div>
      <span className="w-64 absolute mb-36 px-6 font-bold text-lg">
        {movie.title}
      </span>
      <span className="w-64 absolute mb-30 px-6 font-medium text-sm text-paragraph">
        {movie.director}
      </span>
      <div className="w-64 absolute flex flex-wrap justify-center pl-1 pb-4">
        {movie.genres.map((genre, item) => (
          <div
            key={genre.id}
            className="text-tertiary font-normal text-sm pr-3"
          >
            {genre.name}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default card;
