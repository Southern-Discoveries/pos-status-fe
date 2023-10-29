/* eslint-disable no-unused-vars */
import { Box, Collapse, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import SelectListItem from '@/components/Select/SelectListItem';
import ArrowIcon from '@/public/assets/icons/line/arrow.svg';
import GlobalIcon from '@/public/assets/icons/line/global.svg';
import {
  ModelSettings,
  Options,
  SectionState,
  SelectedOptions,
} from '@/types/option';

const Sidebar = () => {
  // This is selectedOptions => Use send to api
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    task: null,
    engine: null,
    platform: null,
    targets: [],
    audiences: [],
  });

  // Set State Open Toggle
  const [sectionState, setSectionState] = useState<SectionState>({
    taskSectionOpen: true,
    targetSectionOpen: true,
    audienceSectionOpen: true,
    platformSectionOpen: true,
    engineSectionOpen: true,
  });

  // This is Option get from api
  const [options, setOptions] = useState<Options>({
    taskOptions: [],
    targetOptions: [],
    audienceOptions: [],
    platformOptions: [],
    engineOptions: [],
    modelOptions: [],
  });

  // OnToggle Function for many Section
  const toggleSection = (sectionName: string) => {
    setSectionState({
      ...sectionState,
      [`${sectionName}SectionOpen`]:
        !sectionState[`${sectionName}SectionOpen` as keyof SectionState],
    });
  };
  // Fetch Data and log Error if exist
  async function fetchData(
    endpoint: string,
    stateUpdater: (data: any) => void
  ) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        stateUpdater(data);
      } else {
        console.error(
          `Error fetching data from ${endpoint}: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}: ${error}`);
    }
  }
  useEffect(() => {
    const taskEndpoint = '/api/ai/tasks';
    const targetEndpoint = '/api/ai/targets';
    const audienceEndpoint = '/api/ai/audiences';
    const platformEndpoint = '/api/ai/platforms';
    const engineEndpoint = '/api/ai/engines';

    // Fetch task data
    fetchData(taskEndpoint, data => {
      setOptions(prevOptions => ({
        ...prevOptions,
        taskOptions: data,
      }));
    });
    // Fetch Target Endpoint
    fetchData(targetEndpoint, data => {
      setOptions(prevOptions => ({
        ...prevOptions,
        targetOptions: data,
      }));
    });
    // Fetch AudienceEndpoint
    fetchData(audienceEndpoint, data => {
      setOptions(prevOptions => ({
        ...prevOptions,
        audienceOptions: data,
      }));
    });
    // Fetch Platform Endpoint
    fetchData(platformEndpoint, data => {
      setOptions(prevOptions => ({
        ...prevOptions,
        platformOptions: data,
      }));
    });

    // Fetch engineEndpoint
    fetchData(engineEndpoint, data => {
      setOptions(prevOptions => ({
        ...prevOptions,
        engineOptions: data,
      }));
    });
  }, []);
  return (
    <>
      <Box
        bg="white"
        borderRight="0.063rem solid"
        borderRightColor="shader.a.200"
        minW="300px"
        padding={4}
      >
        <Box
          border="0.063rem solid"
          borderColor="shader.a.200"
          borderRadius="xl"
        >
          <Flex
            flexDirection="column"
            padding={4}
            /*          borderBottom="0.063rem solid"
            borderBottomColor="shader.a.200" */
          >
            <HStack justifyContent="space-between">
              <Flex gap={2} alignItems="center">
                <Icon as={GlobalIcon} height={5} w={5} />
                <Text fontWeight="600">Task </Text>
              </Flex>
              <Icon
                cursor="pointer"
                as={ArrowIcon}
                transform={
                  sectionState.taskSectionOpen
                    ? 'rotate(-90deg)'
                    : 'rotate(90deg)'
                }
                height={5}
                width={5}
                onClick={() => toggleSection('task')}
              />
            </HStack>
            <Collapse in={sectionState.taskSectionOpen} animateOpacity>
              {/* <SelectListItem
                items={options.platformOptions}
                selectedItems={selectedOptions.task}
                onItemClick={setSelectedOptions}
              /> */}
            </Collapse>
          </Flex>
          <Flex flexDirection="column" padding={4}>
            <HStack justifyContent="space-between">
              <Flex gap={2} alignItems="center">
                <Icon as={GlobalIcon} height={5} w={5} />
                <Text fontWeight="600">Media Platform</Text>
              </Flex>
              <Icon
                cursor="pointer"
                as={ArrowIcon}
                transform={
                  sectionState.platformSectionOpen
                    ? 'rotate(-90deg)'
                    : 'rotate(90deg)'
                }
                height={5}
                width={5}
                onClick={() => toggleSection('platform')}
              />
            </HStack>
            <Collapse
              in={sectionState.platformSectionOpen}
              animateOpacity
            ></Collapse>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
