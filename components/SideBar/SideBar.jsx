// Sidebar.js
import React, { useState, useEffect } from "react";
import ButtonList from "./ButtonList";
import { PostOption } from "@/types";

const Sidebar = ({ setPostConfig, setEngineConfig }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedEngine, setSelectedEngine] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const [selectedTargets, setSelectedTargets] = useState([]);
    const [selectedAudiences, setSelectedAudiences] = useState([]);

    const [taskSectionOpen, setTaskSectionOpen] = useState(true);
    const [targetSectionOpen, setTargetSectionOpen] = useState(true);
    const [audienceSectionOpen, setAudienceSectionOpen] = useState(true);
    const [platformSectionOpen, setPlatformSectionOpen] = useState(true);
    const [engineSectionOpen, setEngineSectionOpen] = useState(true);

    const [taskOptions, setTaskOptions] = useState([]);
    const [targetOptions, setTargetOptions] = useState([]);
    const [audienceOptions, setAudienceOptions] = useState([]);
    const [platformOptions, setPlatformOptions] = useState([]);
    const [engineOptions, setEngineOptions] = useState([]);

    const [model, setModel] = useState(); // Initial model
    const [temperature, setTemperature] = useState(0.7); // Initial temperature

    useEffect(() => {
        let new_config = {
            task: selectedTask ? selectedTask[0].name : null,
            platform: selectedPlatform ? selectedPlatform[0].name : null,
            targets: selectedTargets.map((ele) => ele.name),
            audiences: selectedAudiences.map((ele) => ele.name),
        }
        setPostConfig(new_config);
    }, [selectedTask, selectedPlatform, selectedAudiences, selectedAudiences])

    useEffect(() => {
        let new_config = {
            engine: selectedEngine ? selectedEngine[0].name : null,
            model: model,
            temperature: temperature,
        }
        setEngineConfig(new_config);
    }, [selectedEngine, model, temperature])


    // Fetch data from the API and update the state when the component mounts
    useEffect(() => {
        // Define the API endpoints
        const taskEndpoint = "http://localhost:5000/api/task";
        const targetEndpoint = "http://localhost:5000/api/target";
        const audienceEndpoint = "http://localhost:5000/api/audience";
        const platformEndpoint = "http://localhost:5000/api/platform";
        const engineEndpoint = "http://localhost:5000/api/engine";

        // Fetch task data
        fetch(taskEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setTaskOptions(data)
            })
            .catch((error) => console.error("Error fetching task data: " + error));

        // Fetch target data
        fetch(targetEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setTargetOptions(data)
            })
            .catch((error) => console.error("Error fetching target data: " + error));

        // Fetch audience data
        fetch(audienceEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setAudienceOptions(data)
            })
            .catch((error) => console.error("Error fetching audience data: " + error));

        // Fetch platform data
        fetch(platformEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setPlatformOptions(data)
            })
            .catch((error) => console.error("Error fetching platform data: " + error));

        // Fetch engine data
        fetch(engineEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setEngineOptions(data)
            })
            .catch((error) => console.error("Error fetching engine data: " + error));
    }, []);

    const toggleTaskSection = () => {
        setTaskSectionOpen(!taskSectionOpen);
    };

    const toggleTargetSection = () => {
        setTargetSectionOpen(!targetSectionOpen);
    };

    const toggleAudienceSection = () => {
        setAudienceSectionOpen(!audienceSectionOpen);
    };

    const togglePlatformSection = () => {
        setPlatformSectionOpen(!platformSectionOpen);
    };

    const toggleEngineSection = () => {
        setEngineSectionOpen(!engineSectionOpen);
    };

    // Handle the click of a Task button
    const handleTaskClick = (task) => {
        setSelectedTask([task]);
    };

    // Handle the click of a Platform button
    const handlePlatformClick = (platform) => {
        setSelectedPlatform([platform])
    };

    const handleEngineClick = (engine) => {
        setSelectedEngine([engine]);
    };


    // Handle the click of a Target button
    const handleTargetClick = (target) => {
        if (selectedTargets.includes(target)) {
            setSelectedTargets(selectedTargets.filter((item) => item !== target));
        } else {
            setSelectedTargets([...selectedTargets, target]);
        }
    };

    // Handle the click of an Audience button
    const handleAudienceClick = (audience) => {
        if (selectedAudiences.includes(audience)) {
            setSelectedAudiences(selectedAudiences.filter((item) => item !== audience));
        } else {
            setSelectedAudiences([...selectedAudiences, audience]);
        }
    };

    const getModelOptions = () => {
        if (selectedEngine) {
            let engine = engineOptions.find(obj => obj.name == selectedEngine[0].name)
            if (engine) {
                return engine.models;
            }
        }
        return [];
    };

    const handleModelChange = (selectedModel) => {
        // Update the selected model in the component's state
        setModel(selectedModel);
        // You can also perform other actions, like making API requests, based on the selected model.
    };

    const handleTemperatureChange = (newTemperature) => {
        // Ensure the temperature is within the range 0.1 to 1.0
        const parsedTemperature = parseFloat(newTemperature);
        if (parsedTemperature >= 0.1 && parsedTemperature <= 1.0) {
            setTemperature(parsedTemperature);
            // You can also perform other actions based on the new temperature.
        }
    };


    return (
        <div className="w-1/6 bg-gray-200 p-4 h-screen">
            <h2 className="mb-4 text-xl font-bold">Option</h2>

            <div className="mb-4">
                <h3
                    className="mb-2 text-lg font-semibold cursor-pointer"
                    onClick={toggleTaskSection}
                >
                    Task {taskSectionOpen ? "▼" : "►"}
                </h3>
                {taskSectionOpen && (
                    <ButtonList
                        items={taskOptions}
                        selectedItems={selectedTask}
                        onItemClick={handleTaskClick}
                    />
                )}
            </div>

            <div className="mb-4">
                <h3
                    className="mb-2 text-lg font-semibold cursor-pointer"
                    onClick={toggleTargetSection}
                >
                    Target {targetSectionOpen ? "▼" : "►"}
                </h3>
                {targetSectionOpen && (
                    <ButtonList
                        items={targetOptions}
                        selectedItems={selectedTargets}
                        onItemClick={handleTargetClick}
                    />
                )}
            </div>

            <div className="mb-4">
                <h3
                    className="mb-2 text-lg font-semibold cursor-pointer"
                    onClick={toggleAudienceSection}
                >
                    Audience {audienceSectionOpen ? "▼" : "►"}
                </h3>
                {audienceSectionOpen && (
                    <ButtonList
                        items={audienceOptions}
                        selectedItems={selectedAudiences}
                        onItemClick={handleAudienceClick}
                    />
                )}
            </div>

            <div className="mb-4">
                <h3
                    className="mb-2 text-lg font-semibold cursor-pointer"
                    onClick={togglePlatformSection}
                >
                    Platform {platformSectionOpen ? "▼" : "►"}
                </h3>
                {platformSectionOpen && (
                    <ButtonList
                        items={platformOptions}
                        selectedItems={selectedPlatform}
                        onItemClick={handlePlatformClick}
                    />
                )}
            </div>

            <div className="mb-4">
                <h3
                    className="mb-2 text-lg font-semibold cursor-pointer"
                    onClick={toggleEngineSection}
                >
                    Engine {engineSectionOpen ? "▼" : "►"}
                </h3>
                {engineSectionOpen && (
                    <ButtonList
                        items={engineOptions}
                        selectedItems={selectedEngine}
                        onItemClick={handleEngineClick}
                    />
                )}
            </div>

            <div className="bg-gray-100 p-4">
                <div className="flex justify-center items-center">
                    <label htmlFor="modelSelect" className="mr-2">Model:</label>
                    <select
                        id="modelSelect"
                        className="px-2 py-1 border rounded"
                        onChange={(e) => handleModelChange(e.target.value)}
                        value={model}
                    >
                        {getModelOptions().map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center items-center mt-2">
                    <label htmlFor="temperatureInput" className="mr-2">Temperature:</label>
                    <input
                        id="temperatureInput"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="1.0"
                        value={temperature}
                        onChange={(e) => handleTemperatureChange(e.target.value)}
                        className="px-2 py-1 border rounded"
                    />
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
