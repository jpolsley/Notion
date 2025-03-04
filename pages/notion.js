import { useEffect, useState } from "react";

export default function NotionWidget() {
  const [progress, setProgress] = useState(null);
  const [report, setReport] = useState("");

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/1hkR2C7pWXFK7RWO-lULuW2z84yiswqxnAQXhnfT_cRY/gviz/tq?tqx=out:json")
      .then(response => response.text())
      .then(data => {
        try {
          const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Clean Google Sheets JSON
          const rows = jsonData.table.rows;
          const value = rows[3]?.c[9]?.v?.trim() || "0"; // Row 4 (index 3), Column J (index 9)

          // Prevent duplicates by only setting the data once
          if (progress !== value) {
            setProgress(value);
            setReport(`YC Progress Report\n\nTotal Tasks: 1\nTo Do: 0\nIn Progress: 1\nDone: 0\nLast Updated: Friday, November 22nd 2024\nWaiting On: ${value}%`);
          }
        } catch (error) {
          setProgress(0);
          setReport("Error loading data");
          console.error(error);
        }
      })
      .catch(error => {
        setProgress(0);
        setReport("Error fetching data");
        console.error(error);
      });
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#000",
      fontFamily: "Arial, sans-serif",
      textAlign: "left",
      color: "#fff",
      padding: "20px",
      whiteSpace: "pre-line"
    }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
        YC Progress: {progress}%
      </h2>
      <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5", maxWidth: "80%" }}>
        {report}
      </p>
      <div style={{
        width: "80%",
        backgroundColor: "#333",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "20px",
        height: "20px",
        boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{
          width: progress ? `${progress}%` : "0%",
          height: "100%",
          backgroundColor: "#4caf50",
          borderRadius: "10px",
          transition: "width 0.5s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "14px"
        }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
