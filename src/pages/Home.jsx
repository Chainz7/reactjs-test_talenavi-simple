import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";

const Home = () => {
  return (
    <div className="w-screen flex justify-center">
      <Search />
    </div>
  );
};

export default Home;
