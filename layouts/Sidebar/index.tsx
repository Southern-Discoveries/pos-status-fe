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
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    task: null,
    engine: null,
    platform: null,
    targets: [],
    audiences: [],
  });
  // Set State Open
  const [sectionState, setSectionState] = useState<SectionState>({
    taskSectionOpen: true,
    targetSectionOpen: true,
    audienceSectionOpen: true,
    platformSectionOpen: true,
    engineSectionOpen: true,
  });

  const [options, setOptions] = useState<Options>({
    taskOptions: [],
    targetOptions: [],
    audienceOptions: [],
    platformOptions: [],
    engineOptions: [],
    modelOptions: [],
  });

  const toggleSection = (sectionName: string) => {
    setSectionState({
      ...sectionState,
      [`${sectionName}SectionOpen`]:
        !sectionState[`${sectionName}SectionOpen` as keyof SectionState],
    });
  };

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
              {/*    <SelectListItem
                items={options.platformOptions}
                selectedItems={selectedOptions.task}
                onItemClick={()}
              /> */}
            </Collapse>
          </Flex>
          {/*     <Flex flexDirection="column" padding={4}>
            <HStack justifyContent="space-between">
              <Flex gap={2} alignItems="center">
                <Icon as={GlobalIcon} height={5} w={5} />
                <Text fontWeight="600">Media Platform</Text>
              </Flex>
              <Icon
                cursor="pointer"
                as={ArrowIcon}
                transform={isOpenPlatform ? 'rotate(-90deg)' : 'rotate(90deg)'}
                height={5}
                width={5}
                onClick={onTogglePlatform}
              />
            </HStack>
            <Collapse in={isOpenPlatform} animateOpacity>
              <SelectListItem
                items={platformOptions}
                selectedItems={selectedPlatform}
                onItemClick={handlePlatformClick}
              />
            </Collapse>
          </Flex> */}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
