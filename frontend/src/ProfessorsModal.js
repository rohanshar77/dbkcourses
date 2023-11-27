import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, VStack, Text, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";

const ProfessorsModal = ({ isOpen, onClose, course }) => {
    let professors = course?.professors;

    // Remove duplicates and sort in alphabetical order
    professors = [...new Set(professors)].sort();

    const bgColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('black', 'white');

    const modalWidth = useBreakpointValue({ base: '90%', sm: '70%', md: '50%', lg: '30%' });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <ModalOverlay style={{ backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.2)" }} />
            <ModalContent maxW={modalWidth} maxH="90vh" color={textColor}>
                <ModalHeader>
                    <Text as="strong">{course.id}</Text>
                    <br />
                    Instructor Names & Ratings
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto" maxH="80vh">
                    {professors && professors.length > 0 ? (
                        <VStack align="start" spacing={4} pr={2} width="100%" pb={4}> {/* Adding padding-bottom */}
                            {professors.map((professor, index) => (
                                <Box key={index} p={2} bg={bgColor} borderRadius="md" width="100%">
                                    {professor + " / 5.0"} {/* Modify the professor string */}
                                </Box>
                            ))}
                        </VStack>
                    ) : (
                        <Text>No professor data</Text>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ProfessorsModal;
