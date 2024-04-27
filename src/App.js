import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm),
  );

  return (
    <div className="container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="countries-container">
        {filteredCountries.map((country, index) => (
          <div className="countryCard" key={index}>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
