function ConditionalField({ children, formData, condition }) {
  if (!condition) return children;

  const { field, equals } = condition;

  if (formData?.[field] === equals) {
    return children;
  }

  return null;
}

export default ConditionalField;