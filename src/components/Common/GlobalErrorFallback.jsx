import React from "react";
import ErrorMessage from "../Error/ErrorMessage";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function GlobalErrorFallback({ error, reset }) {
  const status = error.response?.status;
  const { title, content, buttonMessage } = getErrorMessage(error);

  if (status === 403) {
    return (
      <div className="flex justify-center items-center mx-auto max-w-7xl min-h-screen">
        <main className="relative flex flex-col justify-center items-center gap-8 border px-20 py-12 border-line rounded-lg bg-opacity-50">
          <ErrorMessage
            title={title}
            content={content}
            buttonMessage={buttonMessage}
            path={-1}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mx-auto max-w-7xl min-h-screen">
      <main className="relative flex flex-col justify-center items-center gap-8 border px-20 py-12 border-line rounded-lg bg-opacity-50">
        <ErrorMessage
          title={title}
          content={content}
          buttonMessage={buttonMessage}
          onRetry={reset}
        />
      </main>
    </div>
  );
}
