const loc: Record<string, string> = {
  "server-started": `
  =======================================================
  Server successfully started!
  Url http://localhost:{{port}};
  Listening on port {{port}};
  Multi-threading: {{multiThread}};
  =======================================================
  `,
  "server-invalid-json-format": "Invalid JSON format",
  "server-data-not-provided": "Data not provided",
  "endpoint-not-found": "Endpoint not found, please check your URL",
  "server-user-exist-error": "User with id {{id}} already exist",
  "server-unknown-error": "Iternal server error. Oops, something went wrong",
  "server-not-found-user-error": "User with id {{id}} not found",
  "server-parse-error": "Field {{field}} should be {{expectedType}}",
};

export default loc;
