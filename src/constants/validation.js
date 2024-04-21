import {
  BOARD_CREATE_MAX_LENGTH_ERROR_MSG,
  BOARD_CREATE_REQUIRE_ERROR_MSG,
  BOARD_TAG_MAX_LENGTH_ERROR_MSG,
  CHATROOM_LENGTH_ERROR_MSG,
  INTRODUCTION_LENGTH_ERROR_MSG,
  REQUIRE_ERROR_MSG,
  SPACE_ERROR_MSG,
} from "./errorMessage";
import { ONLY_SAPCE_PATTERN } from "./pattern";

export const INPUT_VALIDATION = {
  name: {
    required: REQUIRE_ERROR_MSG,
    pattern: {
      value: ONLY_SAPCE_PATTERN,
      message: SPACE_ERROR_MSG,
    },
  },
  job: {
    pattern: {
      value: ONLY_SAPCE_PATTERN,
      message: SPACE_ERROR_MSG,
    },
  },
  introduction: {
    maxLength: {
      value: 100,
      message: INTRODUCTION_LENGTH_ERROR_MSG,
    },
  },
  chatRoom: {
    maxLength: {
      value: 100,
      message: CHATROOM_LENGTH_ERROR_MSG,
    },
  },
  boardTitle: {
    required: BOARD_CREATE_REQUIRE_ERROR_MSG,
    maxLength: {
      value: 150,
      message: BOARD_CREATE_MAX_LENGTH_ERROR_MSG,
    },
  },
  tag: {
    maxLength: {
      value: 20,
      message: BOARD_TAG_MAX_LENGTH_ERROR_MSG,
    },
  },
};
