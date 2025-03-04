import { useEffect, useState } from "react";

export default function NotionWidget() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/1hkR2C7pWXFK7RWO-lULuW2z84yiswqxnAQXhnfT_cRY/gviz/tq?tqx=out:json")
      .then(response => response.text())
      .then(data => {
        try {
          const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Clean Google Sheets JSON
          const rows = jsonData.table.rows;
          const value = rows[3]?.c[9]?.v || "0"; // Row 4 (index 3), Column J (index 9)
          setProgress(value);
        } catch (error) {
          setProgress("❌ Error loading data");
          console.error(error);
        }
      })
      .catch(error => {
        setProgress("❌ Error fetching data");
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
      backgroundColor: "#121212",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      color: "#ffffff",
      padding: "20px"
    }}>
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>📊 Progress Report</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4caf50" }}>
        {progress ? `✅ ${progress}% Completed!` : "⏳ Loading..."}
      </p>
      <div style={{ width: "80%", backgroundColor: "#333", borderRadius: "10px", overflow: "hidden", marginTop: "10px", height: "25px" }}>
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
          fontWeight: "bold"
        }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
