import React from "react";
import { Form, FormControl } from "react-bootstrap";
//import cities from "../../../data/worldcities.json";
import countryMap from "../../../data/countries.json";
import cities from "../../../data/capitalcities.json";
import countries from "../../../data/countries.geo.json";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  search() {
    let matchedCities = [];
    let matchedCountries = [];

    if (this.state.value.length > 2) {
      cities
        .filter(
          (city) =>
            city.city.toLowerCase().includes(this.state.value.toLowerCase())
        )
        .map((searchResult) => {
          let entry = {
            id: searchResult.id,
            type: "City",
            name: searchResult.city,
            city: searchResult.city,
            description: searchResult.country,
            country: searchResult.country,
            image: `https://source.unsplash.com/1600x900/?${searchResult.city}`,
            iso2: searchResult.iso2,
            iso3: searchResult.iso3,
            location: {
              latitude: searchResult.lat,
              longitude: searchResult.lng
            },
            landmarks: searchResult.landmarks
          }
          return matchedCities.push(entry);
        });
      countries.features
        .filter((country) =>
          country.properties.name
            .toLowerCase()
            .includes(this.state.value.toLowerCase())
            && cities.filter(x => x.iso3 === country.id).length > 0
            && matchedCities.filter(x => x.iso3 === country.id).length < 1
        )
        .map((searchResult) => {
          console.log(searchResult.id)
          console.log( cities.filter(x => x.iso3 === searchResult.id)[0].lat)

          let entry = {
            id: searchResult.id,
            type: "Country",
            name: searchResult.properties.name,
            city: searchResult.properties.name,
            description: "",
            country: "",
            image: `https://source.unsplash.com/1600x900/?${searchResult.properties.name}`,
            iso2: countryMap.filter(x => x.iso3 === searchResult.id)[0].iso2,
            iso3: searchResult.id,
            location: {
              latitude: cities.filter(x => x.iso3 === searchResult.id)[0].lat,
              longitude: cities.filter(x => x.iso3 === searchResult.id)[0].lng,
            }
          }
          return matchedCountries.push(entry);
        });
      //beaches search
    }
    this.props.onSearch([...matchedCities,...matchedCountries]);
  }

  render() {
    return (
      <Form inline onSubmit={null}>
        <FormControl
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={this.search}
          type="text"
          placeholder="Search..."
          className="mr-sm-2"
        />
        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
    );
  }
}

export default Search;
