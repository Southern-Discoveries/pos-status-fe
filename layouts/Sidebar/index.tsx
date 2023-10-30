/* eslint-disable no-unused-vars */
import {
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Scrollbar from '@/components/Scrollbar';
import SelectListItem from '@/components/Select/SelectListItem';
import SelectRadioItem from '@/components/Select/SelectRadioItem';
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
  async function fetchData(endpoint: string, category: string) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setOptions(prevOptions => ({
          ...prevOptions,
          [`${category}Options`]: data,
        }));
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
    const endpoints: { [key: string]: string } = {
      task: '/api/ai/tasks',
      platform: '/api/ai/platforms',
      target: '/api/ai/targets',
      audience: '/api/ai/audiences',
      engine: '/api/ai/engines',
    };

    // Fetch data for each category
    for (const category in endpoints) {
      fetchData(endpoints[category], category);
    }
  }, []);
  const handleTaskClick = (task: any) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      task: task,
    }));
  };

  const handleEngineClick = (engine: any) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      engine: engine,
    }));
  };

  const handlePlatformClick = (platform: any) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      platform: platform,
    }));
  };

  const handleTargetClick = (target: any) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      targets: prevOptions.targets.includes(target)
        ? prevOptions.targets.filter(item => item !== target)
        : [...prevOptions.targets, target],
    }));
  };

  const handleAudienceClick = (audience: any) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      audiences: prevOptions.audiences.includes(audience)
        ? prevOptions.audiences.filter(item => item !== audience)
        : [...prevOptions.audiences, audience],
    }));
  };

  return (
    <>
      <Box
        border="0.063rem solid"
        borderColor="shader.a.200"
        borderRadius="xl"
        height="full"
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
            <SelectRadioItem
              items={options.taskOptions}
              selectedItems={selectedOptions.task}
              onItemClick={handleTaskClick}
            />
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
          <Collapse in={sectionState.platformSectionOpen} animateOpacity>
            <SelectRadioItem
              items={options.platformOptions}
              selectedItems={selectedOptions.platform}
              onItemClick={handlePlatformClick}
            />
          </Collapse>
        </Flex>

        <Flex flexDirection="column" padding={4}>
          <HStack justifyContent="space-between">
            <Flex gap={2} alignItems="center">
              <Icon as={GlobalIcon} height={5} w={5} />
              <Text fontWeight="600">Target</Text>
            </Flex>
            <Icon
              cursor="pointer"
              as={ArrowIcon}
              transform={
                sectionState.targetSectionOpen
                  ? 'rotate(-90deg)'
                  : 'rotate(90deg)'
              }
              height={5}
              width={5}
              onClick={() => toggleSection('target')}
            />
          </HStack>
          <Collapse in={sectionState.targetSectionOpen} animateOpacity>
            <SelectListItem
              items={options.targetOptions}
              selectedItems={selectedOptions.targets}
              onItemClick={handleTargetClick}
            />
          </Collapse>
        </Flex>

        <Flex flexDirection="column" padding={4}>
          <HStack justifyContent="space-between">
            <Flex gap={2} alignItems="center">
              <Icon as={GlobalIcon} height={5} w={5} />
              <Text fontWeight="600">Audience</Text>
            </Flex>
            <Icon
              cursor="pointer"
              as={ArrowIcon}
              transform={
                sectionState.audienceSectionOpen
                  ? 'rotate(-90deg)'
                  : 'rotate(90deg)'
              }
              height={5}
              width={5}
              onClick={() => toggleSection('audience')}
            />
          </HStack>
          <Collapse in={sectionState.audienceSectionOpen} animateOpacity>
            <SelectListItem
              items={options.audienceOptions}
              selectedItems={selectedOptions.audiences}
              onItemClick={handleAudienceClick}
            />
          </Collapse>
        </Flex>
      </Box>
    </>
  );
};

export default Sidebar;
