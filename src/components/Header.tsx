import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuList, MenuItem, Stack, useColorMode, useColorModeValue, useDisclosure, useToast, ToastId } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const{ isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
    const { isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun)
    const toast = useToast();
    const queryClient = useQueryClient()
    const toastId = useRef<ToastId>();
    const mutation = useMutation(logOut, {
        onMutate:() => {
            toastId.current = toast({
                title: "Login out...",
                description: "Sad to See you go...",
                status: "loading",
                position: "bottom-right",
            });
        },
        onSuccess: () => {
            if(toastId.current) {
                queryClient.refetchQueries(["me"]);
                toast.update(toastId.current, {
                status: "success",
                title: "Done",
                description: "See you later!",
            })
            };
        },
    });
    const onLogOut = async() => {
        mutation.mutate()
    };
    return (
        <Stack 
              justifyContent={"space-between"} 
              alignItems="center"
              py={5} 
              px={40} 
              direction={{
                sm: "column",
                md: "row",
              }}
              spacing={{
                sm: 4,
                md: 0,
              }}
              borderBottomWidth={1}
        >
            <Box color={logoColor} >
                <Link to={"/"}>
                    <FaAirbnb size={"48"} />
                </Link>
            </Box>
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon />} />
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen} >로그인</Button>
                            <LightMode>
                            <Button onClick={onSignUpOpen} colorScheme={"red"}>회원 가입</Button>
                            </LightMode>
                        </>) : ( 
                            <Menu>
                                <MenuButton>
                                    <Avatar name ={user.name} src={user.avatar} size={"md"} />
                                </MenuButton>
                                <MenuList>
                                    {user?.is_host ? (
                                    <Link to="/rooms/upload">
                                        <MenuItem>숙소 업데이트</MenuItem>
                                    </Link>
                                    ) : null}
                                    <MenuItem onClick={ onLogOut }>로그아웃</MenuItem>
                                </MenuList>
                            </Menu>
                             ) 
                ) : null }
            </HStack>
                <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
                <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
            </Stack>
    )
 }
