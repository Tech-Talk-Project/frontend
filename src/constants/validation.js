import {
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
};
