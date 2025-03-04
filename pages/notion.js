import { useEffect, useState } from "react";

export default function NotionWidget() {
  const [progress, setProgress] = useState("Loading...");

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/1hkR2C7pWXFK7RWO-lULuW2z84yiswqxnAQXhnfT_cRY/gviz/tq?tqx=out:json")
      .then(response => response.text())
      .then(data => {
        try {
          const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Clean Google Sheets JSON
          const rows = jsonData.table.rows;
          const value = rows[3]?.c[9]?.v || "No Data Found"; // Row 4 (index 3), Column J (index 9)
          setProgress(value);
        } catch (error) {
          setProgress("Error loading data");
          console.error(error);
        }
      })
      .catch(error => {
        setProgress("Error fetching data");
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
      backgroundColor: "#f4f4f4",
      fontFamily: "Arial, sans-serif",
    }}>
      <h3>Notion Progress Report</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4caf50" }}>{progress}</p>
    </div>
  );
}
