import { useParams } from "react-router-dom"
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@tanstack/react-query"
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { Box, Grid, Heading, Skeleton, Image, GridItem, VStack, HStack, Text, Avatar, Container, Button } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa"
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ImageModal from "./ImageModal";
import handleImageClick from "./handleImageClick";


export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
    const { data:reviewsData } = useQuery<IReview[]>(['rooms', roomPk, 'reviews'], getRoomReviews);
    const [dates, setDates] = useState<Date[] | undefined>(undefined);
    const {data:checkBookingData, isLoading: isCheckingBooking} = useQuery([
        "check",
        roomPk,
        dates,
    ], checkBooking, {
        cacheTime: 0, 
        enabled: dates !== undefined,
        }
    );
    console.log(checkBookingData, isCheckingBooking)
    const handleDateChange = (value: any) => {
        setDates(value);
    }
    return (
        <Box
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Helmet>
            <title>{data ? data.name : "Loading..."}</title>
          </Helmet>
          <Skeleton height={"50px"} width="25%" isLoaded={!isLoading}>
            <Heading size={"md"}>{data?.name}</Heading>
          </Skeleton>
          <Grid
            mt={8}
            rounded="xl"
            overflow={"hidden"}
            gap={2}
            height="60vh"
            templateRows={"1fr 1fr"}
            templateColumns={"repeat(4, 1fr)"}
        >
            {data?.photos && data.photos.length > 0 ? (
                <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                    {data.photos.map((photo, index) => (
                        <Box key={photo.pk} onClick={() => handleImageClick()}>
                        <Image src={photo.file} w="100%" h="100%" objectFit="cover" />
                        </Box>
                        ))
                    }
                </Grid>
            ) : null}
          </Grid>
          <Grid  gap={10} templateColumns={"1fr 1fr"} maxW="container.xl" >
            <Box>
                <HStack justifyContent={"space-between"} mt={10}>
                    <VStack alignItems={"flex-start"}>
                        <Skeleton isLoaded={!isLoading} height={"30px"}>
                            <Heading fontSize="2xl"> {data?.owner.name} 님이 호스팅하는 숙소 </Heading>
                        </Skeleton>
                        <Skeleton isLoaded={!isLoading} height={"30px"}>
                            <HStack justifyContent={"flex-start"} w="100%">
                                <Text>{data?.toilets} 욕실</Text>
                                <Text>•</Text>
                                <Text>{data?.rooms} 침실</Text>
                            </HStack>
                        </Skeleton>
                    </VStack>
                    <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar}  />
                </HStack>
                <Text fontSize="16px" fontWeight={"bold"}> 숙소설명</Text>
                <Text>{data?.description}</Text>
                <Text fontSize="16px" fontWeight={"bold"}> <br />상세설명 </Text>
                <Text>{data?.long_description}</Text>
                <Box mt={10}>
                    <Heading mb={5} fontSize={"2xl"}>
                        <HStack>
                        <FaStar /><Text>{data?.rating}</Text>
                        <Text>•</Text>
                        <Text>{reviewsData?.length}개의 후기 </Text>
                        </HStack>
                    </Heading>
                    <Container mt ={15} maxW="container.lg" marginX="none">
                        <Grid  gap={10} templateColumns={"1fr 1fr"}>
                            {reviewsData?.map((review, index) => (
                            <VStack alignItems={"flex-start"} key={index}>
                                <HStack>
                                    <Avatar name={review.user.name} src={review.user.avatar} size="md" />
                                    <VStack spacing={0} alignItems={"flex-star"}>
                                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                                        <HStack spacing={1}>
                                            <FaStar size="12px" />
                                            <Text>{review.rating}</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <Text>{review.payload}</Text>
                            </VStack>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Box pt={10}>
                <Calendar
                    onChange={handleDateChange}
                    showDoubleView
                    prev2Label={null}
                    next2Label={null}
                    minDetail="month" 
                    minDate={new Date()} 
                    maxDate={new Date(Date.now() + (60*60*24*7*4*6*1000))}
                    selectRange
                />
                <Button 
                    disabled={!checkBookingData?.ok}
                    isLoading={isCheckingBooking} 
                    my={5} 
                    w="100%" 
                    colorScheme={"red"}
                >
                    예약하기
                </Button>
                {!isCheckingBooking && !checkBookingData?.ok ? (
                    <Text color="red.500">이 날짜에는 예약할 수 없습니다</Text>
                ): null }
            </Box>
        </Grid>
    </Box>

    );
}