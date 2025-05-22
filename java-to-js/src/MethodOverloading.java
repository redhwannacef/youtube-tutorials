void main () {
  logMessage("Default message");
  logMessage("Error message", 2);
  logMessage("Warning message", LogLevel.warning);
  System.out.println(logMessage);
}

final String logMessage = "Default Message";

void logMessage(String message) {
  logMessage(message, LogLevel.info); 
}

void logMessage(String message, int code) {
  var level = LogLevel.values()[code];
  logMessage(message, level);
}

void logMessage(String message, LogLevel level) {
  System.out.println(STR."\{level.colour}\{level.label}: \{message}\{RESET}");
}

final static String RESET = "\u001B[0m";

enum LogLevel {
  info("Info", 0, "\u001B[37m"),
  warning("Warning", 1, "\u001B[33m"),
  error("Error", 2, "\u001B[31m");

  final String label;
  final int code;
  final String colour;

  LogLevel(String label, int code, String colour) {
    this.label = label;
    this.code = code;
    this.colour = colour;
  }
}