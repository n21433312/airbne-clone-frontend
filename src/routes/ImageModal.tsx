import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image } from "@chakra-ui/react";


interface ImageModalProps {
    isOpen:boolean;
    onClose: () => void;
    imageUrl:string;
}


const ImageModal = ({ isOpen, onClose, imageUrl }:ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Image src={imageUrl} alt="" maxW="100%" maxH="80vh" mx="auto" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;