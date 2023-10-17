// Sidebar.js
import React, { useState, useEffect } from "react";
import ButtonList from "./ButtonList";

const Sidebar = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTargets, setSelectedTargets] = useState([]);
    const [selectedAudiences, setSelectedAudiences] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [taskSectionOpen, setTaskSectionOpen] = useState(true);
    const [targetSectionOpen, setTargetSectionOpen] = useState(true);
    const [audienceSectionOpen, setAudienceSectionOpen] = useState(true);
    const [platformSectionOpen, setPlatformSectionOpen] = useState(true);

    const [taskOptions, setTaskOptions] = useState([]);
    const [targetOptions, setTargetOptions] = useState([]);
    const [audienceOptions, setAudienceOptions] = useState([]);
    const [platformOptions, setPlatformOptions] = useState([]);


    // Fetch data from the API and update the state when the component mounts
    useEffect(() => {
        // Define the API endpoints
        const taskEndpoint = "http://localhost:5000/api/task";
        const targetEndpoint = "http://localhost:5000/api/target";
        const audienceEndpoint = "http://localhost:5000/api/audience";
        const platformEndpoint = "http://localhost:5000/api/platform";

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

    // Handle the click of a Task button
    const handleTaskClick = (task) => {
        setSelectedTask(task);
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

    // Handle the click of a Platform button
    const handlePlatformClick = (platform) => {
        if (selectedPlatforms.includes(platform)) {
            setSelectedPlatforms(selectedPlatforms.filter((item) => item !== platform));
        } else {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    };

    return (
        <div className="w-1/6 bg-gray-200 p-4 h-screen">
            <h2 className="mb-4 text-xl font-bold">Menu</h2>

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
                        selectedItems={selectedPlatforms}
                        onItemClick={handlePlatformClick}
                    />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
