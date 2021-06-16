import React from "react";
import { Form, FormControl } from "react-bootstrap";
//import cities from "../../../data/worldcities.json";
import cities from "../../../data/capitalcities.json";
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
    const matches = [];
    if (this.state.value.length > -1) {
      cities
        .filter(
          (entry) =>
            entry.city.toLowerCase().includes(this.state.value.toLowerCase()) ||
            entry.country.toLowerCase().includes(this.state.value.toLowerCase())
        )
        .map(country => {
          country["image"] = "https://picsum.photos/200/100?" + Math.random();
          return matches.push(country);
        });
    }
    this.props.onSearch(matches);
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
