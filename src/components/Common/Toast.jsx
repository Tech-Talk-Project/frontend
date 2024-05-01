import React from "react";
import { useRecoilState } from "recoil";
import { Alert } from "@material-tailwind/react";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { toastState } from "../../recoil/atoms/toast";

export default function Toast() {
  const [toast, setToast] = useRecoilState(toastState);

  const handleClose = () => {
    setToast({ isOpen: false, message: "" });
  };
  return (
    <Alert
      open={toast.isOpen}
      onClose={handleClose}
      animate={{
        mount: { y: 20 },
        unmount: { y: -100 },
      }}
      icon={<MdOutlinePriorityHigh size={20} className="text-red-700" />}
      className="fixed top-0 left-0 right-0 mx-auto max-w-[16rem] sm:max-w-lg bg-brand border border-purple-900 z-[9999]"
    >
      {toast.message}
    </Alert>
  );
}
