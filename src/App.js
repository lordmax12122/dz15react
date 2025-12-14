import React, { Component } from "react";
import GiftList from "./components/GiftList";
import GiftsSearch from "./components/GiftsSearch";
import styled from "styled-components";

const API_KEY = "ox1g6b0KQsYVX9eCPSEx0NI37hiaYpFk";
const PER_PAGE = 15;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

export default class App extends Component {
  state = {
    query: "tada",
    gifs: [],
    page: 0,
    loading: false,
    totalHits: 0,
  };

  componentDidMount() {
    this.fetchGifs();
  }

  fetchGifs = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ loading: true });

    try {
      const offset = page * PER_PAGE;

      const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${PER_PAGE}&offset=${offset}`;

      const response = await fetch(url);
      const data = await response.json();

    
      this.setState((prev) => {
        const merged = [...prev.gifs, ...data.data];

        const unique = merged.filter(
          (gif, idx, arr) => arr.findIndex((g) => g.id === gif.id) === idx
        );

        return {
          gifs: unique,
          totalHits: data.pagination.total_count,
        };
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (query) => {
    this.setState(
      {
        query,
        page: 0,
        gifs: [],
      },
      this.fetchGifs
    );
  };

  handleLoadMore = () => {
    this.setState(
      (prev) => ({ page: prev.page + 1 }),
      this.fetchGifs
    );
  };

  render() {
    const { gifs, loading, totalHits } = this.state;

    const showLoadMore =
      gifs.length > 0 &&
      !loading &&
      gifs.length < totalHits &&
      gifs.length % PER_PAGE === 0;

    return (
      <Container>
        <h1>GIF Finder</h1>

       <GiftsSearch onSubmit={this.handleSearch} />

<GiftList gifs={gifs} />

{loading && <p>Loading...</p>}

{showLoadMore && (
  <button onClick={this.handleLoadMore}>
    Load More
  </button>
)}


      </Container>
    );
  }
}