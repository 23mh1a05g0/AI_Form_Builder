function getDiff(oldSchema, newSchema) {
  const changes = [];

  if (!oldSchema || !newSchema) return changes;

  const oldFields = oldSchema.properties || {};
  const newFields = newSchema.properties || {};

  // ✅ Added fields
  for (const key in newFields) {
    if (!oldFields[key]) {
      changes.push(`+ ${key}`);
    }
  }

  // ❌ Removed fields
  for (const key in oldFields) {
    if (!newFields[key]) {
      changes.push(`- ${key}`);
    }
  }

  // 🔄 Modified fields
  for (const key in newFields) {
    if (oldFields[key] && JSON.stringify(oldFields[key]) !== JSON.stringify(newFields[key])) {
      changes.push(`~ ${key}`);
    }
  }

  return changes;
}

function SchemaDiff({ oldSchema, newSchema }) {
  const changes = getDiff(oldSchema, newSchema);

  if (!oldSchema || changes.length === 0) return null;

  return (
    <div
      data-testid="schema-diff-panel"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "10px",
        background: "#f9f9f9",
      }}
    >
      <h3>Schema Changes</h3>

      {changes.map((change, index) => (
        <div key={index}>{change}</div>
      ))}
    </div>
  );
}

export default SchemaDiff;