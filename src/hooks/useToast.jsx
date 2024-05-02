import { useSetRecoilState } from "recoil";
import { toastState } from "../recoil/atoms/toast";

export default function useToast() {
  const setToast = useSetRecoilState(toastState);

  const showToast = (message, time = 3000) => {
    setToast({
      isOpen: true,
      message,
    });
    setTimeout(() => {
      setToast({ isOpen: false, message: "" });
    }, time);
  };

  return { showToast };
}
