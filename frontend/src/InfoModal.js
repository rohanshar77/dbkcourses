import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Box,
  Link,
  Kbd,
  useBreakpointValue
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'


const InfoModal = ({ isOpen, onClose }) => {
  const modalWidth = useBreakpointValue({ base: '90%', sm: '70%', md: '50%', lg: '35%' });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay style={{ backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.2)" }} />
      <ModalContent maxW={modalWidth}>
        <ModalHeader>Welcome to Course Search by DBK &nbsp;&#x1F389;</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <Text>
              The first AI powered search engine for the University of Maryland course catalog.
            </Text>
            <Text>
              This tool enables UMD students to discover courses from across the university based on their interests, topics, career paths, etc.
            </Text>
            <Text>
              Our database has information about courses, professors, average GPA, and more!
            </Text>

            <Text fontWeight="bold">Example queries:</Text>
            <VStack align="start" spacing={1}>
              <Text> - "I want to learn about climate change"</Text>
              <Text> - "Compare and contrast ENGL393 and ENGL394"</Text>
              <Text> - "Find me a CMSC course about AI"</Text>
              <Text> - "Teach me about product management"</Text>
              <Text> - "I want to become a lawyer"</Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text>
                Press <Kbd>m</Kbd> to toggle light/dark mode.
              </Text>
              <Text>
                Press <Kbd>i</Kbd> to toggle info panel.
              </Text>
            </VStack>
            <Link href="https://forms.gle/2MTjh3guwXbHXmFw8" isExternal color="orange.500">
              <Text>
                Feedback Form <ExternalLinkIcon mx='2px' />
              </Text>
            </Link>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
