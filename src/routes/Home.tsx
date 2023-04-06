import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import {useQuery} from "@tanstack/react-query"
import RoomSkeleton from "../components/RoomSkeleton";
import { getRooms } from "./api";

interface IPhoto{
    pk: string;
    file: string;
    description: string;
}

interface IRoom{
    "pk": number,
    "name": string;
    "country": string;
    "city": string;
    "price": number
    "rating": number
    "is_owner": boolean,
    "photos": IPhoto[]
}

export default function Home() {
    const {isLoading, data} = useQuery<IRoom[]>(["rooms"], getRooms); 
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
        
        {isLoading ? (
            <>
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
            </>
            ) : null}
            {data?.map((room) => ( 
                <Room 
                    imageUrl={room.photos[0]?.file??"https:/source.unsplash.com/random/450*450"}
                    name={room.name}
                    rating={room.rating}
                    city={room.city}
                    country={room.country}
                    price={room.price}
                />
            ))}
        </Grid>
    );
}