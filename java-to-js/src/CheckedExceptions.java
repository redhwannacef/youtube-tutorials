import java.io.IOException;

public void main() {
  try {
    someIoOperation();
    parentIoOperation();
  } catch (IOException e) {
    System.out.println(STR."Caught IOException: \{e.getMessage()}");
  }
 
  someRuntimeErrorOperation();
}

void parentIoOperation() throws IOException {
  someIoOperation();
}

void someIoOperation() throws IOException {
  System.out.println("Performing IO operation");
  throw new IOException("IO error occurred");
}

void someRuntimeErrorOperation() {
  System.out.println("Performing operation");
  throw new RuntimeException("Runtime error occurred");
}