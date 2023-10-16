// Sidebar.js
import React, { useState } from "react";

const Sidebar = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTargets, setSelectedTargets] = useState([]);
    const [selectedAudiences, setSelectedAudiences] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [taskSectionOpen, setTaskSectionOpen] = useState(true);
    const [targetSectionOpen, setTargetSectionOpen] = useState(false);
    const [audienceSectionOpen, setAudienceSectionOpen] = useState(false);
    const [platformSectionOpen, setPlatformSectionOpen] = useState(false);

    // Simulated data for buttons (Replace with actual data from your database)
    const taskOptions = ["Task 1", "Task 2", "Task 3"];
    const targetOptions = ["Target 1", "Target 2", "Target 3"];
    const audienceOptions = ["Audience 1", "Audience 2", "Audience 3"];
    const platformOptions = ["Platform 1", "Platform 2", "Platform 3"];

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
                    <div>
                        {taskOptions.map((task) => (
                            <button
                                key={task}
                                onClick={() => handleTaskClick(task)}
                                className={`w-full py-2 text-left rounded ${selectedTask === task ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                                    }`}
                            >
                                {task}
                            </button>
                        ))}
                    </div>
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
                    <div>
                        {targetOptions.map((target) => (
                            <button
                                key={target}
                                onClick={() => handleTargetClick(target)}
                                className={`w-full py-2 text-left rounded ${selectedTargets.includes(target) ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                                    }`}
                            >
                                {target}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <h3
                    className="mb-2 text-lg font-semibold cursor-pointer"
                    onClick={toggleAudienceSection}
                >
                    Target {audienceSectionOpen ? "▼" : "►"}
                </h3>
                {audienceSectionOpen && (
                    <div>
                        {audienceOptions.map((audience) => (
                            <button
                                key={audience}
                                onClick={() => handleAudienceClick(audience)}
                                className={`w-full py-2 text-left rounded ${selectedAudiences.includes(audience) ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                                    }`}
                            >
                                {audience}
                            </button>
                        ))}
                    </div>
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
                    <div>
                        {platformOptions.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => handlePlatformClick(platform)}
                                className={`w-full py-2 text-left rounded ${selectedPlatforms.includes(platform) ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                                    }`}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
