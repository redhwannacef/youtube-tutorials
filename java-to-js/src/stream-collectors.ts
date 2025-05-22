type Student = { name: string; grade: string; score: number };

const students: Student[] = [
  { name: "Alice", grade: "A", score: 90 },
  { name: "Bob", grade: "B", score: 85 },
  { name: "Charlie", grade: "C", score: 70 },
  { name: "David", grade: "A", score: 95 },
  { name: "Eve", grade: "B", score: 80 },
];

const studentsByGrade = students.reduce((acc, student) => {
  if (!acc.has(student.grade)) acc.set(student.grade, []);
  acc.get(student.grade)!.push(student);
  return acc;
}, new Map<string, Student[]>());
// Object.groupBy(students, (item) => item.grade);

const namesByGrade = students.reduce((acc, student) => {
  if (!acc.has(student.grade)) acc.set(student.grade, []);
  acc.get(student.grade)!.push(student.name);
  return acc;
}, new Map<string, string[]>());

const countByGrade = students.reduce((acc, student) => {
  const currentCount = acc.get(student.grade) || 0;
  acc.set(student.grade, currentCount + 1);
  return acc;
}, new Map<string, number>());

const allNames = students.map((student) => student.name).join(", ");

const uniqueGrades = students.reduce(
  (acc, student) => acc.add(student.grade),
  new Set<string>(),
);
// new Set(students.map((student) => student.grade));

const stats = students.reduce(
  (acc, student) => {
    acc.count++;
    acc.sum += student.score;
    acc.min = Math.min(acc.min, student.score);
    acc.average = acc.sum / acc.count;
    acc.max = Math.max(acc.max, student.score);
    return acc;
  },
  { count: 0, sum: 0, min: Infinity, average: 0, max: -Infinity },
);

const awardStudents = students.reduce((acc, student) => {
  const key = student.score > 94;
  if (!acc.has(key)) acc.set(key, []);
  acc.get(key)!.push(student);
  return acc;
}, new Map<boolean, Student[]>());

printResult("Students by grade", studentsByGrade);
printResult("Names by grade", namesByGrade);
printResult("Count by grade", countByGrade);
printResult("All names", allNames);
printResult("Unique grades", uniqueGrades);
printResult("Stats", stats);
printResult("Award Students", awardStudents);

function printResult(title: string, data: unknown) {
  console.log(`--------------- ${title} ---------------`);
  console.log(data);
  console.log();
}
