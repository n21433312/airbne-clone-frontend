import { Box, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Button, Input } from "@chakra-ui/react";
import { FaLock, FaUserNinja, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
    isOpen:boolean;
    onClose: () => void;
}

export default function SignUpModal({isOpen, onClose }: SignUpModalProps){
    return(
        <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Sign up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.400">
                                <FaUserSecret /> 
                            </Box>
                        } />
                            
                        <Input variant={"filled"} placeholder="Name"/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.400">
                                <FaEnvelope /> 
                            </Box>
                        } />
                            
                        <Input variant={"filled"} placeholder="Email"/>
                    </InputGroup>
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