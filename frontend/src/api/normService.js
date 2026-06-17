import api from "./client";

// Detect current Normal Form (Schema Only)
export async function detectNormalForm(payload) {
  // Safety: Ensure new fields are arrays
  const safePayload = {
    ...payload,
    multivaluedDependencies: payload.multivaluedDependencies || [],
    joinDependencies: payload.joinDependencies || []
  };
  
  const { data } = await api.post("/nf/detect", safePayload);
  return data;
}

// Normalize Schema (Logic Only)
export async function normalizeTo(payload, target = "3NF") {
  const safePayload = {
    ...payload,
    multivaluedDependencies: payload.multivaluedDependencies || [],
    joinDependencies: payload.joinDependencies || []
  };

  const { data } = await api.post(`/nf/normalize?target=${target}`, safePayload);
  return data;
}

// NEW: Normalize with Real Data (File Upload)
export async function normalizeWithData(file, schemaPayload, target = "3NF") {
  const formData = new FormData();
  
  // 1. Append the File
  formData.append("file", file);
  
  // 2. Append the Schema (as a JSON string)
  // We stringify it because we are sending it inside a FormData field, not as raw JSON body
  const safePayload = {
    ...schemaPayload,
    multivaluedDependencies: schemaPayload.multivaluedDependencies || [],
    joinDependencies: schemaPayload.joinDependencies || []
  };
  formData.append("schema", JSON.stringify(safePayload));

  // 3. Send Request with Header Override
  // CRITICAL FIX: We manually set 'multipart/form-data'. 
  // This overrides the 'application/json' default from your client.js
  const { data } = await api.post(`/data/normalize?target=${target}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}