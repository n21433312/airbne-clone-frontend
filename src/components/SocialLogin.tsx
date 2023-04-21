import { Box, Button, Divider, HStack, VStack, Text } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin(){
    const kakaoParams = {
        client_id: "7a12da799e8d897b8f936259a2fe6c03",
        redirect_uri: "https://chovychovy.xyz/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();
    return(
        <Box mb={4}>
        <HStack my={8}>
            <Divider />
            <Text 
                textTransform={"uppercase"} 
                color={"gray.500"} 
                fontSize="xs" 
                as="b"
            >
            또는
            </Text>
            <Divider />
        </HStack>
        <VStack>
            <Button 
                as = "a"
                href = "https://github.com/login/oauth/authorize?client_id=bb92679c65bc26a33c95&scope=read:user, user:email"
                w="100%" 
                leftIcon={<FaGithub />} 
            >
                깃허브로 로그인
            </Button>
            <Button 
                as = "a" 
                href = {`https://kauth.kakao.com/oauth/authorize?${params}`}
                w="100%" 
                leftIcon={<FaComment />} 
                colorScheme="yellow"
            >
                카카오로 로그인
            </Button>
        </VStack>
    </Box>
    )
}

