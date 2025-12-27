import Swal from "sweetalert2";
import { getSwalTheme } from "../SweetAlertThemes";

export const SweetAlert = ({
  title,
  body,
  footer = "",
  icon = "success",
  confirmText = "OK",
}) => {
  const swalTheme = getSwalTheme();

  return Swal.fire({
    title,                 // Header
    html: body,             // Body
    footer,                 // Footer (optional)
    icon,
    confirmButtonText: confirmText,
    ...swalTheme,
  });
};
