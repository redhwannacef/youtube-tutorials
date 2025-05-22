class IOException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IOException";
  }
}

function main(): void {
  try {
    someIoOperation();
    parentIoOperation();
  } catch (e) {
    if (e instanceof IOException) {
      console.log(`Caught IOException: ${e.message}`);
    } else {
      throw e;
    }
  }

  someRuntimeErrorOperation();
}

main();

function parentIoOperation(): void {
  someIoOperation();
}

function someIoOperation(): void {
  console.log("Performing IO operation");
  throw new IOException("IO error occurred");
}

function someRuntimeErrorOperation(): void {
  console.log("Performing operation");
  throw new Error("Runtime error occurred");
}
