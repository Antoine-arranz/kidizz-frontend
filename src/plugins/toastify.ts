import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const notifyError = (error: unknown) => {
const message = error instanceof Error ? error.message : (error as string)
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'colored',
  });
};
