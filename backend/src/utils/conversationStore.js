import crypto from "crypto";
const conversations = new Map();

export const createConversation = (schema) => {
  const id = crypto.randomUUID();

  conversations.set(id, {
    schema,
    version: 1,
  });

  return { id, version: 1 };
};

export const getConversation = (id) => {
  return conversations.get(id);
};

export const updateConversation = (id, newSchema) => {
  const convo = conversations.get(id);

  if (!convo) return null;

  convo.schema = newSchema;
  convo.version += 1;

  return convo;
};