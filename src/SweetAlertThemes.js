export const getSwalTheme = (theme) => {
  switch (theme) {
    case "dark":
      return {
        background: "#1f2937", // gray-800
        color: "#ffffff",
        confirmButtonColor: "#4b5563",
      };
    case "blue":
      return {
        background: "#eff6ff",
        color: "#1e3a8a",
        confirmButtonColor: "#2563eb",
      };
    case "green":
      return {
        background: "#ecfdf5",
        color: "#065f46",
        confirmButtonColor: "#16a34a",
      };
    default: // light
      return {
        background: "#ffffff",
        color: "#111827",
        confirmButtonColor: "#2563eb",
      };
  }
};
