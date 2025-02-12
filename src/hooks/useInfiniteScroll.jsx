import {  useState } from 'react';

const useInfiniteScroll = (searchQuery, pageNumber, images, setImages) => {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(null)

    const fetchImages = async (searchQuery, pageNumber) => {
        setIsLoading(true);
        try {
              const response = await fetch(
                `https://pixabay.com/api/?key=48777626-f79a5c1528b72fcdca838d77c&q=${searchQuery}&page=${pageNumber}&per_page=20&image_type=photo`
              );
            const data = await response.json();
            setHasMore(data.totalHits > pageNumber * 20);
            
            if(data.totalHits === 0) setResultMessage('No Results Found!')
            else setResultMessage(null)
    
            if(pageNumber === 1){
              setImages(data.hits)
            } else{
              setImages((prev)=>[...prev, ...data.hits])
            }
        } catch (error) {
          console.error('Error fetching images:', error);
        } finally {
          setIsLoading(false);
        }
      };

  return {fetchImages, hasMore, isLoading, resultMessage}

};

export default useInfiniteScroll;
