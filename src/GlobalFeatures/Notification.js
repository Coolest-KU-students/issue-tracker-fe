import { store } from "react-notifications-component";

export default function Notification(title, message, type, duration) {
  return store.addNotification({
    title: title ? title : "",
    message: message ? message : "",
    type: type ? type : "Warning",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration ? duration : 500000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function ClearNotification(id) {
  console.log(id);
  store.removeNotification(id);
}
