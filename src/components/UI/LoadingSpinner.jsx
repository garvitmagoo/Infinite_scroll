import styled from 'styled-components';

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #007bff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;