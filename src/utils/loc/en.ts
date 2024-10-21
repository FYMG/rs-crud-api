const loc: Record<string, string> = {
  "server-started": `
  =======================================================
  Server successfully started!
  At http://localhost:{{port}};
  Listening on port {{port}};
  Multi-threading: {{multiThread}};
  =======================================================
  `,
  "server-user-exist-error": "User with id {{id}} already exist",
  "server-unknown-error": "Oops, something went wrong",
  "server-not-found-user-error": "User with id {{id}} not found",
  "server-parse-error": "Field {{field}} should be {{expectedType}}",
};

export default loc;
