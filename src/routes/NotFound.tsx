import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";



export default function NotFound(){
    return <VStack bg="gray.100" justifyContent={"center"} minH="100vh">
        <Heading>페이지를 찾을 수 없습니다.</Heading>
        <Text>요청하신 페이지를 찾을 수 없습니다.</Text>
        <Link to="/">
            <Button colorScheme={"red"} variant={"link"}>
                메인화면으로 이동해주세요 &rarr;
            </Button>
        </Link>
    </VStack>;
}