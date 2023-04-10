import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import {useQuery} from "@tanstack/react-query"
import RoomSkeleton from "../components/RoomSkeleton";
import { getRooms } from "../api";
import { Link } from "react-router-dom";
import { IRoomList } from "../types";
import { useEffect } from "react";

export default function Home() {
    const {isLoading, data} = useQuery<IRoomList[]>(["rooms"], getRooms); 
    useEffect(() => {
        console.log("hello");
    },);
    return ( 
        <Grid 
            mt={10}
            px={{
                base: 10,
                lg: 40,
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
                    key={room.pk}
                    pk={room.pk}
                    imageUrl={room.photos[0]?.file??"http://source.unsplash.com/random/450*450"}
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