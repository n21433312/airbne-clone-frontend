import { useState } from 'react';
import { GridItem, Image, Skeleton } from '@chakra-ui/react';
import ImageModal from './ImageModal';
import { useQuery } from "@tanstack/react-query"
import { IReview, IRoomDetail } from '../types';
import { useParams } from 'react-router-dom';
import { getRoom } from '../api';

function RoomPhotos() {
  const { roomPk } = useParams<{ roomPk: string }>();
  const { isLoading, data } = useQuery<IRoomDetail>(['rooms', roomPk], getRoom);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);

  function handleImageClick(index: number) {
    setModalImageIndex(index);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalImageIndex(null);
    setModalOpen(false);
  }

  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => (
        <GridItem
          colSpan={index === 0 ? 2 : 1}
          rowSpan={index === 0 ? 2 : 1}
          overflow="hidden"
          key={index}
        >
          <Skeleton isLoaded={!isLoading} h="100%" w="100%">
            {data?.photos && data.photos.length > 0 ? (
              <Image
                objectFit="cover"
                w="100%"
                h="100%"
                src={data?.photos[index].file}
                onClick={() => handleImageClick(index)}
              />
            ) : null}
          </Skeleton>
        </GridItem>
      ))}
      <ImageModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        imageUrl={modalImageIndex !== null ? data?.photos[modalImageIndex]?.file ?? '' : ''}
      />
    </>
  );
}

export default RoomPhotos;