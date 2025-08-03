export interface Employee {
  id: string;
  name: string;
  workingSince: string;
  currentSalary: number;
}

export const getEmployeeById = (id: string) => {
  return employees.find((employee) => employee.id === id);
};

export const employees: Employee[] = [
  { id: "EMP-384920", name: "Ava Thompson", workingSince: "2018-03-15", currentSalary: 6000 },
  { id: "EMP-105837", name: "Liam Patel", workingSince: "2019-07-22", currentSalary: 5700 },
  { id: "EMP-492038", name: "Sophia Kim", workingSince: "2020-01-10", currentSalary: 5400 },
  { id: "EMP-760154", name: "Noah Smith", workingSince: "2017-11-05", currentSalary: 6250 },
  { id: "EMP-218406", name: "Mia Johnson", workingSince: "2021-06-18", currentSalary: 5000 },
  { id: "EMP-573920", name: "Lucas Brown", workingSince: "2016-09-30", currentSalary: 6700 },
  { id: "EMP-640281", name: "Isabella Garcia", workingSince: "2018-12-12", currentSalary: 5800 },
  { id: "EMP-982134", name: "Ethan Lee", workingSince: "2019-04-27", currentSalary: 5600 },
  { id: "EMP-157203", name: "Charlotte Martinez", workingSince: "2020-08-03", currentSalary: 5300 },
  { id: "EMP-304958", name: "Mason Davis", workingSince: "2017-02-14", currentSalary: 6100 },
  { id: "EMP-820394", name: "Amelia Wilson", workingSince: "2018-10-21", currentSalary: 5900 },
  { id: "EMP-209384", name: "Benjamin Clark", workingSince: "2019-05-09", currentSalary: 5750 },
  { id: "EMP-671203", name: "Harper Lewis", workingSince: "2021-01-25", currentSalary: 5100 },
  { id: "EMP-430982", name: "Elijah Walker", workingSince: "2016-07-19", currentSalary: 6800 },
  { id: "EMP-598210", name: "Evelyn Hall", workingSince: "2017-12-01", currentSalary: 6300 },
  { id: "EMP-120398", name: "James Allen", workingSince: "2018-05-16", currentSalary: 6000 },
  { id: "EMP-349820", name: "Abigail Young", workingSince: "2019-09-11", currentSalary: 5600 },
  { id: "EMP-780123", name: "Henry Hernandez", workingSince: "2020-03-28", currentSalary: 5400 },
  { id: "EMP-215890", name: "Emily King", workingSince: "2017-08-07", currentSalary: 6150 },
  { id: "EMP-903284", name: "Alexander Wright", workingSince: "2018-11-23", currentSalary: 5900 },
  { id: "EMP-482019", name: "Ella Lopez", workingSince: "2019-06-14", currentSalary: 5700 },
  { id: "EMP-690123", name: "Jack Scott", workingSince: "2020-10-02", currentSalary: 5250 },
  { id: "EMP-158209", name: "Scarlett Green", workingSince: "2016-04-26", currentSalary: 6750 },
  { id: "EMP-320984", name: "William Adams", workingSince: "2017-03-13", currentSalary: 6250 },
  { id: "EMP-871203", name: "Grace Baker", workingSince: "2018-08-29", currentSalary: 5800 },
  { id: "EMP-540982", name: "Sebastian Nelson", workingSince: "2019-12-17", currentSalary: 5500 },
  { id: "EMP-109283", name: "Chloe Carter", workingSince: "2021-02-08", currentSalary: 5000 },
  { id: "EMP-781204", name: "Logan Perez", workingSince: "2016-10-20", currentSalary: 6700 },
  { id: "EMP-230984", name: "Penelope Rivera", workingSince: "2017-06-04", currentSalary: 6150 },
  { id: "EMP-892013", name: "Daniel Roberts", workingSince: "2018-01-27", currentSalary: 6000 },
]

