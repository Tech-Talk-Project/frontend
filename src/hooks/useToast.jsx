import { useSetRecoilState } from "recoil";
import { toastState } from "../recoil/atoms/toast";

export default function useToast() {
  const setToast = useSetRecoilState(toastState);

  const showToast = (message) => {
    setToast({
      isOpen: true,
      message,
    });
    setTimeout(() => {
      setToast({ isOpen: false, message: "" });
    }, 3000);
  };

  return { showToast };
}
