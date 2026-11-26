import { useState } from "react";
import { SearchIcon } from "../Icons/Icons";
import "./Search.css";

function Search({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const cities = [
    "Florianópolis",
    "São Paulo",
    "Rio de Janeiro",
    "Brasília",
    "Salvador",
    "Porto Alegre"
  ];

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(city);
  }

  function handleCityClick(selectedCity) {
    setCity(selectedCity);
    onSearch(selectedCity);
  }

  return (
    <section className="search-section">

      <form onSubmit={handleSubmit} className="search-form">

        <input
          type="text"
          list="cities"
          placeholder="Digite o nome de uma cidade..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <datalist id="cities">
          {cities.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <button type="submit" disabled={loading}>
          <SearchIcon size={18} />
          {loading ? "Buscando..." : "Buscar"}
        </button>

      </form>

      <div className="city-chips">
        {cities.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleCityClick(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>

    </section>
  );
}

export default Search;
