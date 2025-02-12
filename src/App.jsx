import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useDebounce from './hooks/useDebounce';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import ImageModal from './components/UI/ImageModal';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ImageGrid from './components/ImageGrid'

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin: 20px auto;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  text-align: center;
  @media(max-width: 768px){
    width: 90%
  }
`;

const PlaceholderText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;
;


const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const debouncedQuery = useDebounce(query, 500);
  const { fetchImages, hasMore, isLoading, resultMessage } = useInfiniteScroll(debouncedQuery, page, images, setImages)

  useEffect(() => {
    if (!debouncedQuery) {
      setImages([])
      return;
    };

    const loadInitialImages = async () => {
      await fetchImages(debouncedQuery, 1, images, setImages);
      setPage(1);
    };

    loadInitialImages();
  }, [debouncedQuery]);

  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

    return () => removeEventListener('scroll', handleScroll)
  }, [isLoading, hasMore])

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 200 && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (page === 1 || !query) return;
    fetchImages(debouncedQuery, page, images, setImages);
  }, [page])


  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!query && images.length === 0 && <PlaceholderText>Start typing to search...</PlaceholderText>}
      </SearchContainer>
      {debouncedQuery && resultMessage ? <p> {resultMessage}</p> :
        <ImageGrid images={images} setSelectedImage={setSelectedImage} />

      }
      {isLoading && <LoadingSpinner />}

      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </Container>
  );
};

export default App;
