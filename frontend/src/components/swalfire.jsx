import Swal from "sweetalert2";

const swalactive = (icon, title) => {
  Swal.fire({
    position: "center",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default swalactive;