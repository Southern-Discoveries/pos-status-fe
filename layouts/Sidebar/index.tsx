import {
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import SelectListItem from '@/components/Select/SelectListItem';
import ArrowIcon from '@/public/assets/icons/line/arrow.svg';
import GlobalIcon from '@/public/assets/icons/line/global.svg';

const Sidebar = ({ setPostConfig, setEngineConfig }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);

  const [targetSectionOpen, setTargetSectionOpen] = useState(true);
  const [audienceSectionOpen, setAudienceSectionOpen] = useState(true);

  const { isOpen: isOpenPlatform, onToggle: onTogglePlatform } = useDisclosure({
    defaultIsOpen: true,
  });
  const { isOpen: isOpenTask, onToggle: onToggleTask } = useDisclosure({
    defaultIsOpen: true,
  });
  const [engineSectionOpen, setEngineSectionOpen] = useState(true);

  const [taskOptions, setTaskOptions] = useState([]);
  const [targetOptions, setTargetOptions] = useState([]);
  const [audienceOptions, setAudienceOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  const [engineOptions, setEngineOptions] = useState([]);

  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState(); // Initial model
  const [temperature, setTemperature] = useState(0.7); // Initial temperature

  useEffect(() => {
    let new_config = {
      task: selectedTask ? selectedTask[0].name : null,
      platform: selectedPlatform ? selectedPlatform[0].name : null,
      targets: selectedTargets.map(ele => ele.name),
      audiences: selectedAudiences.map(ele => ele.name),
    };
    setPostConfig(new_config);
  }, [selectedTask, selectedPlatform, selectedAudiences, selectedAudiences]);

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
  }, [selectedEngine, model, temperature]);

  // Fetch data from the API and update the state when the component mounts
  useEffect(() => {
    // Define the API endpoints
    const taskEndpoint = '/api/ai/tasks';
    const targetEndpoint = '/api/ai/targets';
    const audienceEndpoint = '/api/ai/audiences';
    const platformEndpoint = '/api/ai/platforms';
    const engineEndpoint = '/api/ai/engines';

    // Fetch task data
    fetch(taskEndpoint)
      .then(response => response.json())
      .then(data => {
        setTaskOptions(data);
      })
      .catch(error => console.error('Error fetching task data: ' + error));

    // Fetch target data
    fetch(targetEndpoint)
      .then(response => response.json())
      .then(data => {
        setTargetOptions(data);
      })
      .catch(error => console.error('Error fetching target data: ' + error));

    // Fetch audience data
    fetch(audienceEndpoint)
      .then(response => response.json())
      .then(data => {
        setAudienceOptions(data);
      })
      .catch(error => console.error('Error fetching audience data: ' + error));

    // Fetch platform data
    fetch(platformEndpoint)
      .then(response => response.json())
      .then(data => {
        setPlatformOptions(data);
      })
      .catch(error => console.error('Error fetching platform data: ' + error));

    // Fetch engine data
    fetch(engineEndpoint)
      .then(response => response.json())
      .then(data => {
        setEngineOptions(data);
      })
      .catch(error => console.error('Error fetching engine data: ' + error));
  }, []);

  const toggleTargetSection = () => {
    setTargetSectionOpen(!targetSectionOpen);
  };

  const toggleAudienceSection = () => {
    setAudienceSectionOpen(!audienceSectionOpen);
  };

  const toggleEngineSection = () => {
    setEngineSectionOpen(!engineSectionOpen);
  };

  // Handle the click of a Task button
  const handleTaskClick = task => {
    setSelectedTask([task]);
  };

  // Handle the click of a Platform button
  const handlePlatformClick = platform => {
    setSelectedPlatform([platform]);
  };

  const handleEngineClick = engine => {
    setSelectedEngine([engine]);
  };

  // Handle the click of a Target button
  const handleTargetClick = target => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(item => item !== target));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  // Handle the click of an Audience button
  const handleAudienceClick = audience => {
    if (selectedAudiences.includes(audience)) {
      setSelectedAudiences(selectedAudiences.filter(item => item !== audience));
    } else {
      setSelectedAudiences([...selectedAudiences, audience]);
    }
  };

  const handleModelChange = selectedModel => {
    // Update the selected model in the component's state
    setModel(selectedModel);
    // You can also perform other actions, like making API requests, based on the selected model.
  };

  const handleTemperatureChange = newTemperature => {
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
            borderBottom="0.063rem solid"
            borderBottomColor="shader.a.200"
          >
            <HStack justifyContent="space-between">
              <Flex gap={2} alignItems="center">
                <Icon as={GlobalIcon} height={5} w={5} />
                <Text fontWeight="600">Task </Text>
              </Flex>
              <Icon
                cursor="pointer"
                as={ArrowIcon}
                transform={isOpenTask ? 'rotate(-90deg)' : 'rotate(90deg)'}
                height={5}
                width={5}
                onClick={onToggleTask}
              />
            </HStack>
            <Collapse in={isOpenTask} animateOpacity>
              dasd
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
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
