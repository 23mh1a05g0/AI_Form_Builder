import { useState } from "react";
import ChatPane from "./ChatPane";
import FormRenderer from "./FormRenderer";
import SchemaDiff from "./SchemaDiff";
import ExportPanel from "./ExportPanel";

function Layout() {
  const [schema, setSchema] = useState(null);
  const [previousSchema, setPreviousSchema] = useState(null);

  const handleSchemaUpdate = (newSchema) => {
    setPreviousSchema(schema);
    setSchema(newSchema);
  };

  return (
    <div className="container">

      {/* LEFT PANEL */}
      <div className="panel chat-panel" data-testid="chat-pane">
        <ChatPane setSchema={handleSchemaUpdate} />
      </div>

      {/* RIGHT PANEL */}
      <div className="panel form-panel" data-testid="form-renderer-pane">
        
        <div className="form-header">
          <h2>📄 Generated Form</h2>
        </div>

        <div className="form-content">
          <FormRenderer schema={schema} />
        </div>

        <SchemaDiff oldSchema={previousSchema} newSchema={schema} />

        <ExportPanel schema={schema} />
      </div>

    </div>
  );
}

export default Layout;