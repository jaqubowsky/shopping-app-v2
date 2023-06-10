export function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token || ""}`, // Provide a default empty string if token is null
    },
  };
}
