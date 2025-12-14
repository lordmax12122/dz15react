import React, { Component } from "react";
import styled from "styled-components";
const SearchBar = styled.form`
`;
export default class GiftsSearch extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <SearchBar onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search GIFs"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </SearchBar>
    );
  }
}