import { useForm } from "react-hook-form"
import { Box, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Button, Input, Text, useToast } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogIn } from "../api";

interface LoginModalProps {
    isOpen:boolean;
    onClose: () => void;
}

interface IForm {
    username:string;
    password:string;
}

export default function LoginModal({isOpen, onClose }: LoginModalProps){
    const { register, handleSubmit, formState: {errors}, reset } = useForm<IForm>();
    const toast = useToast()
    const queryClient =useQueryClient();
    const mutation = useMutation(usernameLogIn, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: () => {
            toast({
                title: "welcome back",
                status: "success",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        },
    });
    const onSubmit = ({username, password}:IForm) => {
        mutation.mutate({username, password})
    };
    console.log(errors);
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.400">
                                <FaUserNinja /> 
                            </Box>
                        } />
                            
                        <Input 
                            isInvalid={Boolean(errors.username?.message)}
                            {...register("username", {required: "Please wirte a username"} )}
                            variant={"filled"} 
                            placeholder="username"
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.400">
                                <FaLock />
                            </Box>
                         }/>
                        <Input
                            isInvalid={Boolean(errors.password?.message)}
                            {...register("password", {required: "Please wirte a password"} )}
                            type="password"
                            variant={"filled"} 
                            placeholder="password"
                        />
                    </InputGroup>
                </VStack>
                {mutation.isError ? <Text color="red.500" textAlign={"center"}  fontSize="sm">Username or Password are wrong</Text> : null}
                <Button isLoading={mutation.isLoading} type="submit" mt={4} colorScheme="red" w="100%">Log in</Button>
                <SocialLogin /> 
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}