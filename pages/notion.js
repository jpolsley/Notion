import { useEffect, useState } from "react";

export default function NotionWidget() {
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

          setReport(ycData);
        } catch (error) {
          setReport("Error loading data");
          console.error(error);
        }
      })
      .catch(error => {
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
      width: "500px",  // ✅ Fixed widget width
      height: "300px", // ✅ Fixed widget height
      backgroundColor: "#000",
      fontFamily: "Arial, sans-serif",
      textAlign: "left",
      color: "#fff",
      padding: "20px",
      whiteSpace: "pre-line",
      overflow: "hidden", // ✅ Prevent scrolling
      borderRadius: "10px", // Optional: Rounded corners for a sleek look
      boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)" // Optional: Soft glow effect
    }}>
      <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5", maxWidth: "90%" }}>
        {report}
      </p>
    </div>
  );
}
