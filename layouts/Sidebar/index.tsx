/* eslint-disable no-unused-vars */
import { Box, Collapse, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import SelectListItem from '@/components/Select/SelectListItem';
import SelectRadioItem from '@/components/Select/SelectRadioItem';
import ArrowIcon from '@/public/assets/icons/line/arrow.svg';
import GlobalIcon from '@/public/assets/icons/line/global.svg';
import { Options, SectionState, Selected } from '@/types/option';

interface IProps {
  setPostConfig: any;
  setEngineConfig: any;
}
const Sidebar = ({ setPostConfig, setEngineConfig }: IProps) => {
  // This is selectedOptions => Use send to api
  const [selectedTask, setSelectedTask] = useState<Selected[] | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<Selected[] | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Selected[] | null>(
    null
  );

  const [selectedTargets, setSelectedTargets] = useState<Selected[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<Selected[]>([]);

  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState(); // Initial model
  const [temperature, setTemperature] = useState(0.7);

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
        setOptions((prevOptions: any) => ({
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
  console.log('Current Options', options.engineOptions);
  useEffect(() => {
    let new_config = {
      task: selectedTask ? selectedTask[0].name : null,
      platform: selectedPlatform ? selectedPlatform[0].name : null,
      targets: selectedTargets.map(ele => ele.name),
      audiences: selectedAudiences.map(ele => ele.name),
    };
    setPostConfig(new_config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTask, selectedPlatform, selectedAudiences, selectedTargets]);
  useEffect(() => {
    if (selectedEngine) {
      setModelOptions(selectedEngine[0].models);
      setModel(selectedEngine[0].models[0]);
    }

    let new_config = {
      engine: selectedEngine ? selectedEngine[0].name : null,
      model: model,
      temperature: temperature,
    };

    setEngineConfig(new_config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEngine, model, temperature]);
  // Handle the click of a Task button
  const handleTaskClick = (task: any) => {
    setSelectedTask([task]);
  };

  // Handle the click of a Platform button
  const handlePlatformClick = (platform: any) => {
    setSelectedPlatform([platform]);
  };

  const handleEngineClick = (engine: any) => {
    setSelectedEngine([engine]);
  };

  // Handle the click of a Target button
  const handleTargetClick = (target: any) => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(item => item !== target));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  // Handle the click of an Audience button
  const handleAudienceClick = (audience: any) => {
    if (selectedAudiences.includes(audience)) {
      setSelectedAudiences(selectedAudiences.filter(item => item !== audience));
    } else {
      setSelectedAudiences([...selectedAudiences, audience]);
    }
  };

  const handleModelChange = (selectedModel: any) => {
    // Update the selected model in the component's state
    setModel(selectedModel);
    // You can also perform other actions, like making API requests, based on the selected model.
  };

  const handleTemperatureChange = (newTemperature: any) => {
    // Ensure the temperature is within the range 0.1 to 1.0
    const parsedTemperature = parseFloat(newTemperature);
    if (parsedTemperature >= 0.1 && parsedTemperature <= 1.0) {
      setTemperature(parsedTemperature);
      // You can also perform other actions based on the new temperature.
    }
  };
  return (
    <>
      <Box
        border="0.063rem solid"
        borderColor="shader.a.200"
        borderRadius="xl"
        height="auto"
      >
        <Flex flexDirection="column" padding={4}>
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
              selectedItems={selectedTask}
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
              selectedItems={selectedPlatform}
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
              selectedItems={selectedTargets}
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
              selectedItems={selectedAudiences}
              onItemClick={handleAudienceClick}
            />
          </Collapse>
        </Flex>

        <Flex flexDirection="column" padding={4}>
          <HStack justifyContent="space-between">
            <Flex gap={2} alignItems="center">
              <Icon as={GlobalIcon} height={5} w={5} />
              <Text fontWeight="600">Engine</Text>
            </Flex>
            <Icon
              cursor="pointer"
              as={ArrowIcon}
              transform={
                sectionState.engineSectionOpen
                  ? 'rotate(-90deg)'
                  : 'rotate(90deg)'
              }
              height={5}
              width={5}
              onClick={() => toggleSection('engine')}
            />
          </HStack>
          <Collapse in={sectionState.engineSectionOpen} animateOpacity>
            <SelectRadioItem
              items={options.engineOptions}
              selectedItems={selectedEngine}
              onItemClick={handleEngineClick}
            />
          </Collapse>
        </Flex>

        <div className="bg-gray-100 p-4">
          <div className="flex justify-center items-center">
            <label htmlFor="modelSelect" className="mr-2">
              Model:
            </label>
            <select
              id="modelSelect"
              className="px-2 py-1 border rounded"
              onChange={e => handleModelChange(e.target.value)}
              value={model}
            >
              {modelOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center mt-2">
            <label htmlFor="temperatureInput" className="mr-2">
              Temperature:
            </label>
            <input
              id="temperatureInput"
              type="number"
              step="0.1"
              min="0.1"
              max="1.0"
              value={temperature}
              onChange={e => handleTemperatureChange(e.target.value)}
              className="px-2 py-1 border rounded"
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Sidebar;
