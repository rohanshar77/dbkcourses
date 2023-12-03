import React, { useState, useRef } from "react";
import { useEffect } from "react";
import {
    Box,
    Center,
    Container, Flex,
    Heading,
    Input,
    Text, useColorMode,
    VStack, IconButton, Button, useToast, Image, Switch, HStack, useBreakpointValue, Portal, Collapse, Spacer, AbsoluteCenter
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import ColorModeSwitcher from "./ColorModeSwitcher";
import InfoModal from "./InfoModal";
import ProfessorsModal from "./ProfessorsModal";
import axios from 'axios';
import ResultCard from "./ResultCard";
import FastResultCard from "./FastResultCard";
import LoadingCard from "./LoadingCard";
import { FaMagic } from "react-icons/fa";
import { Link } from "@chakra-ui/react";


const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { toggleColorMode } = useColorMode();
    const { colorMode } = useColorMode();
    const [searchResults, setSearchResults] = useState("");
    const [lastSearchTerm, setLastSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [fastSearchResults, setFastSearchResults] = useState([]);
    const [currContext, setCurrContext] = useState("");
    const [smartTrigger, setSmartTrigger] = useState(false);
    const toast = useToast();
    const searchElementRef = useRef(null);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const [isOpen, setIsOpen] = useState(true);
    const [includeGradCourses, setIncludeGradCourses] = useState(false);

    const handleSwitchChange = () => {
        setIncludeGradCourses(!includeGradCourses);
    };


    useEffect(() => {
        const handleScroll = () => {
            // Make sure the ref is set
            if (searchElementRef.current) {
                const targetTop = searchElementRef.current.offsetTop + 100;
                const currentScrollY = window.scrollY;

                if (currentScrollY > targetTop) {
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                }
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const getTermId = () => {
        const now = new Date();
        const year = now.getFullYear();
        const monthDay = (now.getMonth() + 1) * 100 + now.getDate();

        if (monthDay >= 101 && monthDay <= 518) {
            // If the current date is between January 01 and May 18, the term is Spring.
            return `${year}01`;
        } else {
            // If the current date is between May 19 and December 31, the term is Fall.
            return `${year}08`;
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchTerm.length === 0) {
            return;
        }

        // Implement your search logic here
        console.log("Searching for: " + searchTerm)
        setFastSearchResults([]);
        setSearchResults("");
        setCurrContext("");
        fetchData(searchTerm);
        setLastSearchTerm(searchTerm);
        setSearchTerm("");
    };

    const fetchData = async (searchTerm) => {
        setIsLoading(true);
        console.log("Fetching courses....")
        try {
            // console.log(`${process.env.REACT_APP_API_URL}/searchfast`);
            const fastResponse = await axios.get(`${process.env.REACT_APP_API_URL}/searchfast`, {
                params: {
                    q: searchTerm,
                },
            });

            const termId = getTermId();

            const fastCourses = fastResponse.data.courses.map(course => ({
                ...course,
                link: `https://app.testudo.umd.edu/soc/search?courseId=${course.id}&sectionId=&termId=${termId}&_openSectionsOnly=on&creditCompare=%3E%3D&credits=0.0&courseLevelFilter=ALL&instructor=&_facetoface=on&_blended=on&_online=on&courseStartCompare=&courseStartHour=&courseStartMin=&courseStartAM=&courseEndHour=&courseEndMin=&courseEndAM=&teachingCenter=ALL&_classDay1=on&_classDay2=on&_classDay3=on&_classDay4=on&_classDay5=on`
            }));

            const context = fastResponse.data.context;
            setFastSearchResults(fastCourses);
            setCurrContext(context);

            // console.log(`${process.env.REACT_APP_API_URL}/search`)
            // const response = await axios.post(`${process.env.REACT_APP_API_URL}/search`, {
            //     q: searchTerm,
            //     context: context
            // });

            // console.log(response.data);

            // setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSmartData = async (searchTerm) => {
        if (!canSearch()) {
            toast({
                title: "Limit Reached",
                description: "You have reached the maximum number of smart searches for today. Please try again tomorrow.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                colorScheme: "orange",
            });
            return;
        }

        setIsLoading(true);
        setSmartTrigger(true);
        console.log("Fetching smart result....")
        try {
            // console.log(`${process.env.REACT_APP_API_URL}/search`)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/search`, {
                q: searchTerm,
                context: currContext
            });

            // console.log(response.data);

            setSearchResults(response.data);
            setSmartTrigger(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "m" && e.target.tagName !== "INPUT") {
                toggleColorMode();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [toggleColorMode]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "i" && e.target.tagName !== "INPUT") {
                if (isInfoModalOpen) {
                    closeInfoModal();
                } else {
                    openInfoModal();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isInfoModalOpen]);

    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };


    const canSearch = () => {
        const searches = JSON.parse(localStorage.getItem('searches')) || { count: 0, date: new Date().toDateString() };

        if (searches.date !== new Date().toDateString()) {
            // Reset the count and date if the current date is different from the saved date
            searches.count = 0;
            searches.date = new Date().toDateString();
        }

        if (searches.count >= 5) {
            return false;
        }

        // Increment the count and save it to the local storage
        searches.count++;
        localStorage.setItem('searches', JSON.stringify(searches));

        return true;
    };

    return (
        <Container
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={{ base: 4, md: 0 }}
            maxW={{ base: "90%", md: "container.md" }}
        >

            {/* Header */}
            <Center >
                <Flex position="fixed" top='0' pt='4' width='100%' zIndex='4' >

                    <Box zIndex='2' ms='4'>

                        <a href="https://www.dbknews.com">
                            <Image h='3rem' src="/dbk/image3.png"></Image>
                        </a>

                    </Box>
                    <Spacer />

                    <Flex flexDirection='column' alignItems='end' me='4'>

                        <Flex>
                            <IconButton
                                icon={<InfoIcon />}
                                backgroundColor="dbk.red"
                                _hover={{ backgroundColor: 'dbk.red_hover' }}
                                textColor='white'
                                onClick={openInfoModal}
                                me='2'
                                zIndex="2"
                                aria-label="Info"
                            />
                            <ColorModeSwitcher />
                        </Flex>

                        <Flex alignItems='center' justifyContent='end' p='2' zIndex='250'>
                            <Box
                                width={isOpen ? "100%" : "0"}
                                overflow="hidden"
                                whiteSpace="nowrap"
                                transition="width 0.5s ease"
                                ps='0'
                                h='30px'
                                borderLeftRadius='md'
                                alignItems='center'
                                justifyContent='center'
                                display='flex'

                            >
                                <Text me='2' fontWeight='semibold' textAlign='center'>Include Grad Courses</Text>

                            </Box>

                            <Switch size='md' h='30px' alignItems='center'
                                justifyContent='center' display='flex' mb='1' variant="dbk"
                                isChecked={includeGradCourses}
                                onChange={handleSwitchChange}
                            />

                        </Flex>
                    </Flex >



                </Flex>
            </Center>



            <InfoModal isOpen={isInfoModalOpen} onClose={closeInfoModal} />



            <VStack mb={isMobile ? '4' : '12'} mt='4'>
                <Box h={fastSearchResults.length > 0 ? (isMobile ? '7vh' : '0rem') : 0}></Box>

                <Image mb='4'
                    height={fastSearchResults.length > 0 ? '8rem' : '10rem'} src="/dbk/image4.png"></Image>
                <Heading
                    pt='4'
                    pb="3"
                    bgGradient="linear(to-r, dbk.red, dbk.red)"
                    bgClip="text"
                    textAlign="center"
                    fontFamily="SolanoGothicMVB"
                    size='2xl'
                >
                    Course Search by DBK
                </Heading>
                <Flex flexDirection="column" alignItems="center">
                    <Center>
                        <form onSubmit={handleSearch}>
                            <Input
                                ref={searchElementRef}
                                size="lg"
                                placeholder="I want to learn about..."
                                variant="filled"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                focusBorderColor="orange"
                                _focus={{
                                    boxShadow: colorMode === "dark" ? '0 0 0 1px orange' : 'none',
                                }}
                                width={isMobile ? '80vw' : '40rem'}
                            />
                        </form>
                    </Center>
                </Flex>
                <Box pt="8" w="100%" pb={isMobile ? '0' : '0'}>
                    <VStack spacing={4} alignItems="center">
                        {isLoading ? (
                            <LoadingCard />
                        ) : searchResults ? (
                            <ResultCard title={lastSearchTerm} description={searchResults} />
                        ) : null}
                        {fastSearchResults.length > 0 && (
                            <Box
                                w="100%" // Add this to set the width
                                style={{
                                    // overflow: "scroll",
                                    scrollSnapType: "y mandatory",
                                }}
                            >
                                {!searchResults && !smartTrigger && (
                                    <>
                                        <Center>
                                            <Button
                                                backgroundColor="dbk.red"
                                                textColor="white"
                                                _hover={{ backgroundColor: 'dbk.red_hover' }}
                                                leftIcon={<FaMagic />}
                                                onClick={async () => {
                                                    fetchSmartData(lastSearchTerm);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
                                                }}
                                            >Summarize
                                            </Button>
                                        </Center>
                                        <Box height="1rem" />
                                    </>
                                )}
                                <FastResultCard courses={fastSearchResults} />
                            </Box>
                        )}
                    </VStack>
                </Box>
            </VStack>




            <Box pb={4} pt={10}>
                <Text textAlign="center" fontWeight='semibold' fontSize="md" mb='1'>
                    Presented by The Diamonback
                </Text>
                <Text textAlign="center" fontSize="sm" >
                    {'Developed by '}
                    <Link href="https://www.linkedin.com/in/kitopang/" isExternal>
                        Kito Pang
                    </Link>
                    {' and '}
                    <Link href="https://www.linkedin.com/in/rohan77/" isExternal>
                        Rohan Sharma
                    </Link>
                </Text>
            </Box>
        </Container >
    );
}

export default Homepage;
