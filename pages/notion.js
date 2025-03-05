import { useEffect, useState } from "react";

export default function NotionWidget() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // ✅ Youth Councils data is at Row 3 (index 2), Column J (index 9)
        let ycData = rows[2]?.c[9]?.v?.trim() || "No Data Available";

        // ❌ Remove emojis using regex
        ycData = ycData.replace(/[\p{Extended_Pictographic}]/gu, ""); // Removes all emoji characters

        setReport(ycData);
        setError(null);
      } catch (error) {
        setError("Error loading data. Please try again later.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "90%", // Responsive width
        maxWidth: "500px", // Max width for larger screens
        height: "auto", // Auto height for responsiveness
        minHeight: "200px", // Minimum height
        backgroundColor: "#000",
        fontFamily: "Arial, sans-serif",
        textAlign: "left",
        color: "#fff",
        padding: "20px",
        whiteSpace: "pre-line",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
        margin: "20px auto", // Center the widget
      }}
      aria-live="polite" // For screen readers
      aria-busy={loading} // Indicate loading state
    >
      {loading ? (
        <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5" }}>
          Loading...
        </p>
      ) : error ? (
        <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5", color: "#ff6b6b" }}>
          {error}
        </p>
      ) : (
        <p style={{ fontSize: "18px", fontWeight: "normal", lineHeight: "1.5", maxWidth: "90%" }}>
          {report}
        </p>
      )}
    </div>
  );
}
