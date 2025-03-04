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
          
          // ✅ Youth Councils data is at Row 7 (index 6), Column J (index 9)
          const ycData = rows[6]?.c[9]?.v?.trim() || "No Data Available";

          // Ensure correct formatting
          setProgress("Youth Councils Progress Report");
          setReport(ycData);
        } catch (error) {
          setProgress("Error");
          setReport("Error loading data");
          console.error(error);
        }
      })
      .catch(error => {
        setProgress("Error");
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
        {progress}
      </h2>
      <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5", maxWidth: "80%" }}>
        {report}
      </p>
    </div>
  );
}
