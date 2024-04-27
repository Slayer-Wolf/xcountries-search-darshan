import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setSearchResults(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm),
    );
    setSearchResults(filteredCountries);
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const countryCard = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const inputStyle = {
    position: "sticky",
    width: "500px",
    height: "30px",
    border: "10px",
  };
  const containerStyle2 = {
    width: "100vh",
  };

  return (
    <div style={containerStyle2}>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        style={inputStyle}
      />
      <div style={containerStyle}>
        {searchResults.map((country) => {
          return (
            <div className="countryCard" key={country.cca3} style={countryCard}>
              <img
                src={country.flags.png}
                alt={`flat of ${country.name.common}`}
                style={imageStyle}
              />
              <h2>{country.name.common}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
