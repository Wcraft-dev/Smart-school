import {toast} from 'react-toastify'
export const handlerErrorsAuth = (e) => {
  if (e.response) {
    if (e.response.data.message) {
      return toast.error(e.response.data.message);
    } else {
      const { error } = e.response.data;
      return error.map((er) => {
        return toast.error(er);
      });
    }
  } else if (e.request) {
    return toast.error("There was a mistake, try again");
  } else {
    return toast.error("There was a mistake, try again in a few minutes");
  }
};
