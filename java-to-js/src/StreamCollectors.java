import java.util.List;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.partitioningBy;
import static java.util.stream.Collectors.summarizingInt;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

record Student(String name, String grade, int score) {}

List<Student> students = List.of(
  new Student("Alice", "A", 90),
  new Student("Bob", "B", 85),
  new Student("Charlie", "C", 70),
  new Student("David", "A", 95),
  new Student("Eve", "B", 80)
);

void main() {
  var studentsByGrade = students.stream()
    .collect(groupingBy(Student::grade));

  var namesByGrade = students.stream()
    .collect(groupingBy(
      Student::grade,
      mapping(Student::name, toList())
    ));

  var countByGrade = students.stream()
    .collect(groupingBy(Student::grade, counting()));

  var allNames = students.stream()
    .map(Student::name)
    .collect(joining(", "));

  var uniqueGrades = students.stream()
    .map(Student::grade)
    .collect(toSet());

  var stats = students.stream()
    .collect(summarizingInt(Student::score));

  var awardStudents = students.stream()
    .collect(partitioningBy(student -> student.score() > 94));

  printResult("Students by grade", studentsByGrade);
  printResult("Names by grade", namesByGrade);
  printResult("Count by grade", countByGrade);
  printResult("All names", allNames);
  printResult("Unique grades", uniqueGrades);
  printResult("Stats", stats);
  printResult("Award Students", awardStudents);
}

void printResult(String title, Object args) {
  System.out.println(STR."--------------- \{title}---------------");
  System.out.println(args);
  System.out.println();
}