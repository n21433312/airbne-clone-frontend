import { Box, Grid, Heading, Image, VStack, Text, HStack, Button } from "@chakra-ui/react";
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
            {[1, 2, 3, 4, 5, 6, 12, 45, 5, 2, 1, 2, 7, 45, 8, 9, 12, 14, 7, 98, 45, 12, 13, 14, 15, 16, 17, 18,
            12, 14, 2, 2, 2, 2, 2, 2, 2, 3,
            ].map((index) => (
                <Room key={index} />
            ))}
        </Grid>
    );
}