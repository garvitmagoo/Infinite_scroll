import styled from 'styled-components'

const ImageGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top:20px;
`;

const ImageCard = styled.div`
  width: 25%;
  display:flex;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    margin: 10px;
  }
    @media (max-width: 1024px) {
  width:33.33%
}
  @media(max-width:768px){
    width:50%;
  }
  
  @media(max-width:480px){
    width:100%
  }
`

const ImageGrid = ({images,setSelectedImage}) => {
    return(
        <ImageGridContainer>
            {images.map((image) => (
            <ImageCard key={image.id} onClick={() => setSelectedImage(image.largeImageURL)}>
                <img src={image.webformatURL} alt={image.tags} loading="lazy" />
            </ImageCard>
            ))}
      </ImageGridContainer>
    )
}

export default ImageGrid