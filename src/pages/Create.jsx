import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const navigate = useNavigate();

  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [value, setValue] = useState();
  const [genre, setGenre] = useState();
  const [data, setData] = useState({
    title: "",
    director: "",
    summary: "",
    genre: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let allGenre = [];
      let nextPageUrl = "https://technical.test.talenavi.com/api/genre";
      while (nextPageUrl) {
        try {
          const response = await axios.get(nextPageUrl);
          const fetchedGenre = response.data.data.data;
          allGenre = allGenre.concat(fetchedGenre);
          nextPageUrl = response.data.data.next_page_url;
        } catch (error) {
          console.error("Error fetching data:", error);
          break;
        }
      }
      setGenre(allGenre);
    };

    fetchData();
  }, []);

  const handleClick = (clickedValue, itemId) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
    setValue(clickedValue);
    setData((prevData) => {
      if (prevData.genre.includes(clickedValue)) {
        return {
          ...prevData,
          genre: prevData.genre.filter((genre) => genre !== clickedValue),
        };
      } else {
        return {
          ...prevData,
          genre: [...prevData.genre, clickedValue],
        };
      }
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: e.target.name === "genre" ? value.split(",") : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedItemIds.length === 0) {
      window.alert("Please select at least one genre");
      return;
    }

    const userData = {
      title: data.title,
      director: data.director,
      summary: data.summary,
      genre: data.genre,
    };
    axios
      .post("https://technical.test.talenavi.com/api/movie", userData)
      .then((response) => {
        console.log(response);
        window.alert("Movie has been successfully added!");
        navigate("/");
      });
  };

  return (
    <div className="w-full flex justify-center py-6">
      <form className="w-96 flex flex-col gap-4" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-0 px-4 pt-1 pb-3 rounded-lg bg-card-background">
          <legend className="text-base px-1 font-medium" htmlFor="title">
            Title
          </legend>
          <input
            className="w-full h-full outline-none border-none bg-card-background text-headline text-sm placeholder-paragraph"
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Movie Title"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-0 px-4 pt-1 pb-3 rounded-lg bg-card-background">
          <legend className="text-base px-1 font-medium" htmlFor="title">
            Director
          </legend>
          <input
            className="w-full h-full outline-none border-none bg-card-background text-headline text-sm placeholder-paragraph"
            type="text"
            name="director"
            value={data.director}
            onChange={handleChange}
            placeholder="Director Name"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-0 px-4 pt-1 pb-3 rounded-lg bg-card-background">
          <legend className="text-base px-1 font-medium" htmlFor="title">
            Summary
          </legend>
          <input
            className="w-full h-full outline-none border-none bg-card-background text-headline text-sm placeholder-paragraph"
            type="text"
            name="summary"
            value={data.summary}
            onChange={handleChange}
            placeholder="Summary"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-0 px-4 pt-1 pb-3 rounded-lg bg-card-background">
          <legend className="text-base px-1 font-medium" htmlFor="title">
            Genre
          </legend>
          <div className="flex flex-wrap justify-between gap-3">
            {genre &&
              genre.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(item.name, item.id)}
                  className="border-solid border-2 border-tertiary rounded-tr-full rounded-br-full rounded-bl-full px-4 py-1 cursor-pointer"
                  style={{
                    transition: "background-color 0.3s",
                    backgroundColor: selectedItemIds.includes(item.id)
                      ? "#2cb67d"
                      : "",
                  }}
                  onMouseEnter={(e) =>
                    e.currentTarget.classList.add("bg-tertiary")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.remove("bg-tertiary")
                  }
                >
                  {item.name}
                </div>
              ))}
          </div>
        </fieldset>
        <div className="flex gap-3">
          <Link
            to="/"
            className="w-auto px-3 py-2 flex items-center rounded-lg outline-none border-none bg-primary text-headline text-base font-sm cursor-pointer no-underline"
            style={{
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              e.currentTarget.classList.add("bg-primary-dark")
            }
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove("bg-primary-dark")
            }
          >
            Back
          </Link>
          <button
            className="w-full py-2 rounded-lg outline-none border-none bg-primary text-headline text-xl font-medium cursor-pointer"
            type="submit"
            style={{
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              e.currentTarget.classList.add("bg-primary-dark")
            }
            onMouseLeave={(e) =>
              e.currentTarget.classList.remove("bg-primary-dark")
            }
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
