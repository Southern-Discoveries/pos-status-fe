/* eslint-disable no-unused-vars */
import { Box, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import CategorySection from './components/CategorySection';

import api from '@/axios/config';
import FileIcon from '@/public/assets/icons/line/file.svg';
import GlobalIcon from '@/public/assets/icons/line/global.svg';
import TargetIcon from '@/public/assets/icons/line/target.svg';
import UserIcon from '@/public/assets/icons/line/user.svg';
import { Options, Selected } from '@/types/option';

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

  const [temperature, setTemperature] = useState(0.7);

  // This is Option get from api
  const [options, setOptions] = useState<Options>({
    taskOptions: [],
    targetOptions: [],
    audienceOptions: [],
    platformOptions: [],
  });
  const toast = useToast();

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
        toast({
          title: 'Error Fetch Data',
          description: `Error fetching data from ${endpoint}: ${response.status}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error Fetch Data',
        description: `Error fetching data from ${endpoint}: ${error}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
    let new_config = {
      temperature: temperature,
    };

    setEngineConfig(new_config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);

  const handleTaskClick = (task: any) => {
    setSelectedTask([task]);
  };

  // Handle the click of a Platform button
  const handlePlatformClick = (platform: any) => {
    setSelectedPlatform([platform]);
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

  const handleTemperatureChange = (newTemperature: any) => {
    // Ensure the temperature is within the range 0.1 to 1.0
    const parsedTemperature = parseFloat(newTemperature);
    if (parsedTemperature >= 0.1 && parsedTemperature <= 1.0) {
      setTemperature(parsedTemperature);
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
        <CategorySection
          type="radio"
          icon={FileIcon}
          label={'Task'}
          items={options.taskOptions}
          selectedItems={selectedTask}
          onItemClick={handleTaskClick}
        />
        <CategorySection
          type="select"
          icon={TargetIcon}
          label={'Target'}
          items={options.targetOptions}
          selectedItems={selectedTargets}
          onItemClick={handleTargetClick}
        />
        <CategorySection
          type="radio"
          icon={GlobalIcon}
          label={'Media Platform'}
          items={options.platformOptions}
          selectedItems={selectedPlatform}
          onItemClick={handlePlatformClick}
        />

        <CategorySection
          type="select"
          icon={UserIcon}
          label={'Audience'}
          items={options.audienceOptions}
          selectedItems={selectedAudiences}
          onItemClick={handleAudienceClick}
        />

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
