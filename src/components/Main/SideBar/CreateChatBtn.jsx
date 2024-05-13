import React, { memo } from "react";
import { BsFillChatDotsFill } from "@react-icons/all-files/bs/BsFillChatDotsFill";
import Button from "../../Common/Button";

const CreateChatBtn = ({ onNewChatClick }) => {
  return (
    <Button
      variant="text"
      className="fixed bottom-8 right-7 md:left-7 md:right-auto p-3 text-white bg-brand hover:bg-white hover:text-brand rounded-full"
      onClick={onNewChatClick}
    >
      <BsFillChatDotsFill size={24} />
    </Button>
  );
};
export default memo(CreateChatBtn);
