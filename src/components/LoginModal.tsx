import { Box, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Button, Input } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen:boolean;
    onClose: () => void;
}

export default function LoginModal({isOpen, onClose }: LoginModalProps){
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.400">
                                <FaUserNinja /> 
                            </Box>
                        } />
                            
                        <Input variant={"filled"} placeholder="username"/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.400">
                                <FaLock />
                            </Box>
                         }/>
                        <Input variant={"filled"} placeholder="password"/>
                    </InputGroup>
                </VStack>
                <Button mt={4} colorScheme="red" w="100%">Log in</Button>
                <SocialLogin /> 
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}