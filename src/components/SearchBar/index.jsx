import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBarInput = styled.input`
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  text-align: center;
  @media(max-width: 769px){
    width: 90%
  }
`;

const PlaceholderText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;

const SearchBar = ({ query, setQuery }) => (
  <SearchWrapper>
    <SearchBarInput
      type="text"
      placeholder="Search images..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    {!query && <PlaceholderText>Start typing to search...</PlaceholderText>}
  </SearchWrapper>
);

export default SearchBar;