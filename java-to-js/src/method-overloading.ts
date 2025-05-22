const logLevels: Record<LogLevel, LogLevelDetail> = {
  info: { label: "Info", code: 0, color: "#808080FF" },
  warn: { label: "Warning", code: 1, color: "#a68a0d" },
  error: { label: "Error", code: 2, color: "#f0524f" },
};

// const logMessage = "Default Message";

logMessage("Default message");
logMessage("Error message", 2);
logMessage("Warning message", "warn");

function logMessage(message: string): void;
function logMessage(message: string, level: LogLevel): void;
function logMessage(message: string, code: number): void;

function logMessage(
  message: string,
  secondArg: LogLevel | number = "info",
): void {
  const logLevel =
    typeof secondArg === "number"
      ? logLevelByCode(secondArg)
      : logLevels[secondArg];

  console.log(`%c[${logLevel.label}]: ${message}`, `color: ${logLevel.color}`);
}

function logLevelByCode(code: number) {
  return Object.values(logLevels)[code]!;
}

type LogLevel = "info" | "warn" | "error";
type LogLevelDetail = {
  label: string;
  code: number;
  color: string;
};
