import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

const ImageModal = ({ imageUrl, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalImage src={imageUrl} alt="Enlarged view" />
    </ModalContent>
  </ModalOverlay>
);

export default ImageModal;