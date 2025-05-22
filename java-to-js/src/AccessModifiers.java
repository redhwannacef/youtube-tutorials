public void main() {
  availableEverywhere();
  availableInSameClass();
  availableInSamePackageAndSubClass();
  availableInSamePackage();
}

public void availableEverywhere() { // Same as `export` in js
  System.out.println("This method is available everywhere");
}

private void availableInSameClass() { // Same as no `export` in js
  System.out.println("This method is available in the same class");
}

void availableInSamePackage() {
  System.out.println("This method is available in the same package");
}

protected void availableInSamePackageAndSubClass() {
  System.out.println("This method is available in the same package and subclasses");
}
