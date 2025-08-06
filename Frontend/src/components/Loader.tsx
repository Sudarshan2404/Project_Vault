import React from "react";

type LoaderProps = {
  size?: number; // default: 40
  color?: string; // tailwind color class (e.g. "border-blue-500")
  message?: string;
  fullscreen?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = "border-blue-500",
  message,
  fullscreen = false,
}) => {
  const spinnerClasses = `animate-spin rounded-full border-4 border-t-transparent ${color}`;
  const wrapperClasses = fullscreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-black/5 z-50"
    : "flex flex-col items-center justify-center";

  return (
    <div className="flex w-[100vw] h-screen justify-center items-center">
      <div className={wrapperClasses}>
        <div
          className={spinnerClasses}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
        {message && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
