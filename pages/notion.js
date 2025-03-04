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
          
          // ✅ Youth Councils data is at Row 3 (index 2), Column J (index 9)
          let ycData = rows[2]?.c[9]?.v?.trim() || "No Data Available";

          // ❌ Remove emojis using regex
          ycData = ycData.replace(/[\p{Extended_Pictographic}]/gu, ""); // Removes all emoji characters

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
      width: "100vw", // ✅ Fix scroll bar issue
      backgroundColor: "#000",
      fontFamily: "Arial, sans-serif",
      textAlign: "left",
      color: "#fff",
      padding: "20px",
      whiteSpace: "pre-line",
      overflow: "hidden" // ✅ Prevent scrolling
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
