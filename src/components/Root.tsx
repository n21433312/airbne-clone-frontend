import { Box, HStack, Button, IconButton, Modal, ModalOverlay, useDisclosure, ModalContent, ModalHeader, ModalCloseButton, 
         ModalBody, Input, VStack, InputGroup, InputLeftElement, ModalFooter } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaMoon, FaUserNinja, FaLock } from "react-icons/fa";

export default function Root() {
    const{ isOpen, onClose, onOpen} = useDisclosure();
    return (
        <Box>
            <HStack 
              justifyContent={"space-between"} 
              py={5} px={10} 
              borderBottomWidth={1}
            >
                <Box color="red.500" >
                    <FaAirbnb size={"48"} />
                </Box>
                <HStack spacing={2}>
                    <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon />} />
                    <Button onClick={onOpen} >Log in</Button>
                    <Button colorScheme={"red"}>Sign in</Button>
                </HStack>
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
                        </ModalBody>
                    </ModalContent>
                </Modal>

              
            </HStack>
            <Outlet />
        </Box>    
    );
}