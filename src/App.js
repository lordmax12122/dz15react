// import React, { Component } from "react";
// import GiftList from "./components/GiftList";
// import GiftsSearch from "./components/GiftsSearch";
// import styled from "styled-components";

// const API_KEY = "50853697-ccd9acb9abbdf256f1feb5e3f";
// const PER_PAGE = 12;

// const Container = styled.div`
//   width: 100%;
//   max-width: 900px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// export default class App extends Component {
//   state = {
//     query: "",
//     images: [],
//     page: 1,
//     loading: false,
//     totalHits: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = async () => {
//     const { query, page } = this.state;
//     if (!query) return;

//     this.setState({ loading: true });

//     try {
//       const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       this.setState((prev) => ({
//         images: [...prev.images, ...data.hits],
//         totalHits: data.totalHits,
//       }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   handleSearch = (query) => {
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//       totalHits: 0,
//     });
//   };

//   handleLoadMore = () => {
//     this.setState((prev) => ({
//       page: prev.page + 1,
//     }));
//   };

//   render() {
//     const { images, loading, totalHits } = this.state;

//     const showLoadMore =
//       images.length > 0 &&
//       !loading &&
//       images.length < totalHits;

//     return (
//       <Container>
//         <h1>Image Finder</h1>

//         <GiftsSearch onSubmit={this.handleSearch} />

//         <GiftList images={images} />

//         {loading && <p>Loading...</p>}

//         {showLoadMore && (
//           <button onClick={this.handleLoadMore}>
//             Load more
//           </button>
//         )}
//       </Container>
//     );
//   }
// }


import { useState, useEffect, useCallback, useMemo } from "react";
import GiftList from "./components/GiftList";
import GiftsSearch from "./components/GiftsSearch";
import styled from "styled-components";

const API_KEY = "50853697-ccd9acb9abbdf256f1feb5e3f";
const PER_PAGE = 12;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();

        setImages(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const showLoadMore = useMemo(() => {
    return images.length > 0 && !loading && images.length < totalHits;
  }, [images.length, loading, totalHits]);

  return (
    <Container>
      <h1>Image Finder</h1>

      <GiftsSearch onSubmit={handleSearch} />

      <GiftList images={images} />

      {loading && <p>Loading...</p>}

      {showLoadMore && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </Container>
  );
}
