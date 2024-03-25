import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, handleClick];
}
