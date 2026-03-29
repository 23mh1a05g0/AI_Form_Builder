function ExportPanel({ schema }) {
  if (!schema) return null;

  // 📄 Copy JSON
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    alert("JSON copied!");
  };

  // ⚡ Copy cURL
  const handleCopyCurl = () => {
    const curl = `curl -X POST http://localhost:8080/api/form/generate \\
-H "Content-Type: application/json" \\
-d '${JSON.stringify({ prompt: "your prompt here" })}'`;

    navigator.clipboard.writeText(curl);
    alert("cURL copied!");
  };

  // 📥 Download JSON
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    a.click();
  };

  return (
    <div className="export-panel" data-testid="export-panel">
      <h3>⚡ Export Options</h3>

      <div className="export-buttons">
        <button onClick={handleCopyJSON}>📄 Copy JSON</button>
        <button onClick={handleCopyCurl}>⚡ Copy cURL</button>
        <button onClick={handleDownload}>⬇ Download JSON</button>
      </div>
    </div>
  );
}

export default ExportPanel;