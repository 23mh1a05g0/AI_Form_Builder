import Ajv from "ajv";

const ajv = new Ajv();

export const validateSchema = (schema) => {
  const valid = ajv.validateSchema(schema);

  if (!valid) {
    console.error("Schema Validation Errors:", ajv.errors);
  }

  return valid;
};