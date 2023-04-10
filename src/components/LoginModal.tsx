import { useForm } from "react-hook-form"
import { Box, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Button, Input, Text } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";

interface LoginModalProps {
    isOpen:boolean;
    onClose: () => void;
}

interface IForm {
    username:string;
    password:string;
}

export default function LoginModal({isOpen, onClose }: LoginModalProps){
    const { register, handleSubmit, formState: {errors} } = useForm<IForm>();
    const onSubmit = (data:IForm) => {
        console.log(data);
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
                <Button type="submit" mt={4} colorScheme="red" w="100%">Log in</Button>
                <SocialLogin /> 
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}