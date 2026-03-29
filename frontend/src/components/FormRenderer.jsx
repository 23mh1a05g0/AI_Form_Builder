import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import ConditionalField from "./ConditionalField";


function FormRenderer({ schema }) {
  const [formData, setFormData] = useState({});

  if (!schema) {
    return <p>No form generated yet</p>;
  }

  // 🔥 Filter schema based on conditions
  const filteredSchema = {
    ...schema,
    properties: Object.fromEntries(
      Object.entries(schema.properties).filter(([key, value]) => {
        if (!value["x-show-when"]) return true;

        const condition = value["x-show-when"];
        return formData?.[condition.field] === condition.equals;
      })
    ),
  };

  return (
    <div>
      <h2>Generated Form</h2>

      <Form
        schema={filteredSchema}
        validator={validator}
        formData={formData}
        onChange={(e) => setFormData(e.formData)}
        onSubmit={(data) => {
          console.log("Form Data:", data.formData);
          alert("Form submitted!");
        }}
      />
    </div>
  );
}

export default FormRenderer;
