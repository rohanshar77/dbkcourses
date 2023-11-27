import {
  Box,
  Divider,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link, useBreakpointValue,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaBolt } from "react-icons/fa";
import React from "react";
import { Button } from "@chakra-ui/react";
import ProfessorsModal from "./ProfessorsModal";
import { useState, useEffect } from "react";

const FastResultCard = ({ courses }) => {
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.400");
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  // add a new state variable for controlling the modal visibility
  const [isProfModalOpen, setProfModalOpen] = useState(false);

  // add a new state variable for storing the current course
  const [currentCourse, setCurrentCourse] = useState(null);

  // close modal function
  const closeProfModal = () => {
    setProfModalOpen(false);
  };

  // open modal function
  const openProfModal = (course) => {
    setCurrentCourse(course);
    setProfModalOpen(true);
  };

  const renderProfessorsTable = (course) => {

    return isMobile ? (
      <>
        <Box height="1rem" />
        <VStack align="start" spacing={1}>
          {/* <Text fontWeight="bold">{professor.name || '-'}</Text> */}
          <Text>Credits: {course.credits || '-'}</Text>
          <Text>Average GPA: {course.average_gpa || '-'}</Text>
          <Text>Top Instructor: {course.top_prof || '-'}</Text>
          <Text>Top Instructor Rating: {course.top_rating || '-'}</Text>
          <Text></Text>
          <Button onClick={() => openProfModal(course)}>View All Instructors</Button>
        </VStack>
      </>
    ) : (
      <>
        <Box height="1rem" />
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Credits</Th>
              <Th>Top Instructor</Th>
              <Th>Instructor Rating</Th>
              <Th>Avg. GPA</Th>
              <Th>All Instructors</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{course.credits || '-'}</Td>
              <Td>{course.top_prof || '-'}</Td>
              <Td>{Math.round(course.top_rating * 100) / 100 || '-'} / 5</Td>
              <Td>{course.average_gpa || '-'}</Td>
              <Td>
                <Button size="sm" onClick={() => openProfModal(course)}>View</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </>
    );
  }


  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      // overflowY="scroll"
      p="4"
      boxShadow="md"
      bgColor={bgColor}
      w="100%"
    >
      {currentCourse && <ProfessorsModal isOpen={isProfModalOpen} onClose={closeProfModal} course={currentCourse} />}
      <VStack align="start" spacing={4}>
        <Icon as={FaBolt} boxSize="1.5rem" color="orange.500" />
        {courses.map((course, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <Divider borderColor={borderColor} borderRadius="full" />
            )}
            <Box>
              <Heading size="sm" mb="1">
                <Link href={course.link} isExternal>
                  {course.id.replace("-", " ") + ': ' + course.title}
                </Link>
              </Heading>
              <Text style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {course.description}
              </Text>
              {renderProfessorsTable(course)}
            </Box>
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
};

export default FastResultCard;