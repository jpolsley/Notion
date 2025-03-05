import { useEffect, useState } from "react";

export default function NotionWidget() {
  const [report, setReport] = useState("");
  const [selectedProject, setSelectedProject] = useState("Youth Councils"); // Default project

  // Map projects to their respective row and column indices
  const projects = {
    "Youth Councils": { row: 2, column: 9 }, // Row 3 (index 2), Column J (index 9)
    "Camp Planning": { row: 1, column: 9 }, // Row 2 (index 1), Column J (index 9)
    "Rendezvous": { row: 3, column: 9 }, // Row 4 (index 3), Column J (index 9)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1hkR2C7pWXFK7RWO-lULuW2z84yiswqxnAQXhnfT_cRY/gviz/tq?tqx=out:json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Clean Google Sheets JSON
        const rows = jsonData.table.rows;

        // Get the selected project's row and column
        const { row, column } = projects[selectedProject];
        let projectData = rows[row]?.c[column]?.v?.trim() || "No Data Available";

        // Remove emojis using regex
        projectData = projectData.replace(/[\p{Extended_Pictographic}]/gu, "");

        setReport(projectData);
      } catch (error) {
        console.error("Fetch error:", error);
        setReport("Error loading data");
      }
    };

    fetchData();
  }, [selectedProject]); // Re-fetch data when selectedProject changes

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        height: "300px",
        backgroundColor: "#000",
        fontFamily: "Arial, sans-serif",
        textAlign: "left",
        color: "#fff",
        padding: "20px",
        whiteSpace: "pre-line",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Project Selection Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {Object.keys(projects).map((project) => (
          <button
            key={project}
            onClick={() => setSelectedProject(project)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              backgroundColor: selectedProject === project ? "#555" : "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {project}
          </button>
        ))}
      </div>

      {/* Progress Report Display */}
      <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5", maxWidth: "90%" }}>
        {report}
      </p>
    </div>
  );
}
