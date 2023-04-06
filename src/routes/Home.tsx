import { Box, Grid, Heading, Image, VStack, Text, HStack, Button, Skeleton, SkeletonText } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Room from "../components/Room";

export default function Home() {
    return ( 
        <Grid 
            mt={10}
            px={{
                sm: "1fr",
                md:"1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "reaeat(5, 1fr)",
            }}
            columnGap={4} 
            rowGap={8} 
            templateColumns={{
                base: "1fr",
                lg: "repeat(5, 1fr)",
            }}
        >
            <Box>
                <Skeleton rounded="2xl" height={280} mb={7} />
                <SkeletonText w="50%" noOfLines={2} mb ={6} />
                <SkeletonText w="20%" noOfLines={1} />
            </Box>
            <Room />
            
        </Grid>
    );
}