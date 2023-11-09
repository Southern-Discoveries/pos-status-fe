/* eslint-disable no-unused-vars */
import {
  Box,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import CategorySection from './components/CategorySection';

import api from '@/axios/config';
import SelectRadioItem from '@/components/Form/SelectRadioItem';
import { useChat } from '@/hooks/useChat';
import ArrowIcon from '@/public/assets/icons/line/arrow.svg';
import FileIcon from '@/public/assets/icons/line/file.svg';
import GlobalIcon from '@/public/assets/icons/line/global.svg';
import TargetIcon from '@/public/assets/icons/line/target.svg';
import UserIcon from '@/public/assets/icons/line/user.svg';
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
  const [model, setModel] = useState<string>(); // Initial model
  const [temperature, setTemperature] = useState(0.7);
  const { currentChatID } = useChat();

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
      const response = await api.get(endpoint); // Use Axios to make a GET request
      if (response.status === 200) {
        const data = response.data;
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
      task: '/public/tasks',
      platform: '/public/platforms',
      target: '/public/targets',
      audience: '/public/audiences',
      engine: '/public/engines',
    };

    // Fetch data for each category
    for (const category in endpoints) {
      fetchData(endpoints[category], category);
    }
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setEngineConfig(new_config);
  }, [selectedEngine]);

  useEffect(() => {
    let new_config = {
      engine: selectedEngine ? selectedEngine[0].name : null,
      model: model,
      temperature: temperature,
    };

    setEngineConfig(new_config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, temperature]);
  // Hndle the click of a Task button
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

  const handleModelChange = (selectedModel: string) => {
    setModel(selectedModel);
  };

  const handleTemperatureChange = (newTemperature: any) => {
    // Ensure the temperature is within the range 0.1 to 1.0
    const parsedTemperature = parseFloat(newTemperature);
    if (parsedTemperature >= 0.1 && parsedTemperature <= 1.0) {
      setTemperature(parsedTemperature);
      // You can also perform other actions based on the new temperature.
    }
  };
  const handleReset = () => {
    setSelectedTask(null);
    setSelectedPlatform(null);
    setSelectedTargets([]);
    setSelectedAudiences([]);
    setSelectedEngine(null);
  };
  useEffect(() => {
    if (currentChatID == null) {
      console.log('Why not run');
      handleReset();
    }
  }, [currentChatID]);
  return (
    <>
      <Box
        border="0.063rem solid"
        borderColor="shader.a.200"
        borderRadius="xl"
        height="auto"
      >
        <CategorySection
          type="radio"
          icon={FileIcon}
          label={'Task'}
          isOpen={sectionState.taskSectionOpen}
          onToggle={() => toggleSection('task')}
          items={options.taskOptions}
          selectedItems={selectedTask}
          onItemClick={handleTaskClick}
        />
        <CategorySection
          type="select"
          icon={TargetIcon}
          label={'Target'}
          isOpen={sectionState.targetSectionOpen}
          onToggle={() => toggleSection('target')}
          items={options.targetOptions}
          selectedItems={selectedTargets}
          onItemClick={handleTargetClick}
        />
        <CategorySection
          type="radio"
          icon={GlobalIcon}
          label={'Media Platform'}
          isOpen={sectionState.platformSectionOpen}
          onToggle={() => toggleSection('platform')}
          items={options.platformOptions}
          selectedItems={selectedPlatform}
          onItemClick={handlePlatformClick}
        />

        <CategorySection
          type="select"
          icon={UserIcon}
          label={'Audience'}
          isOpen={sectionState.audienceSectionOpen}
          onToggle={() => toggleSection('audience')}
          items={options.audienceOptions}
          selectedItems={selectedAudiences}
          onItemClick={handleAudienceClick}
        />

        <Flex
          flexDirection="column"
          borderBottom="0.063rem solid"
          borderBottomColor="shader.a.200"
        >
          <HStack justifyContent="space-between" padding={4}>
            <Flex gap={2} alignItems="center">
              <Icon as={GlobalIcon} height={5} w={5} color="primary.a.500" />
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
          <Collapse
            in={sectionState.engineSectionOpen}
            animateOpacity
            style={{
              padding: 4,
              paddingTop: 2,
            }}
          >
            <SelectRadioItem
              items={options.engineOptions}
              selectedItems={selectedEngine}
              onItemClick={handleEngineClick}
            />
          </Collapse>
        </Flex>

        <FormControl padding={4}>
          <FormLabel>Model</FormLabel>{' '}
          <Select
            onChange={e => {
              handleModelChange(e.target.value);
            }}
            value={model}
          >
            {modelOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl padding={4}>
          <FormLabel>Temperature</FormLabel>
          <Input
            type="number"
            step="0.1"
            min="0.1"
            max="1.0"
            value={temperature}
            onChange={e => handleTemperatureChange(e.target.value)}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default Sidebar;
