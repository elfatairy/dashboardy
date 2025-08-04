export type PayrollStatus = "processed" | "pending" | "failed" | "received";

export interface Payroll {
  id: string;
  totalAmount: number;
  employeeId: string;
  payPeriod: string;
  paymentMethod: string;
  processedDate: string;
  status: PayrollStatus;
}

export const payrolls: Payroll[] = [
  { id: "PR-284750", totalAmount: 5420.00, employeeId: "EMP-384920", payPeriod: "Jan 1 - Jan 31", paymentMethod: "Direct Deposit", processedDate: "2025-01-29", status: "processed" },
  { id: "PR-691238", totalAmount: 4850.00, employeeId: "EMP-105837", payPeriod: "Feb 1 - Feb 28", paymentMethod: "Bank Transfer", processedDate: "2025-02-26", status: "received" },
  { id: "PR-473920", totalAmount: 6200.00, employeeId: "EMP-492038", payPeriod: "Mar 1 - Mar 31", paymentMethod: "Wire Transfer", processedDate: "2025-03-28", status: "processed" },
  { id: "PR-158462", totalAmount: 5780.00, employeeId: "EMP-760154", payPeriod: "Apr 1 - Apr 30", paymentMethod: "Direct Deposit", processedDate: "2025-04-27", status: "processed" },
  { id: "PR-820394", totalAmount: 4920.00, employeeId: "EMP-218406", payPeriod: "May 1 - May 31", paymentMethod: "Bank Transfer", processedDate: "2025-05-30", status: "pending" },
  { id: "PR-307592", totalAmount: 6580.00, employeeId: "EMP-573920", payPeriod: "Jun 1 - Jun 30", paymentMethod: "Direct Deposit", processedDate: "2025-06-28", status: "received" },
  { id: "PR-649283", totalAmount: 5340.00, employeeId: "EMP-640281", payPeriod: "Jul 1 - Jul 31", paymentMethod: "Wire Transfer", processedDate: "2025-07-29", status: "processed" },
  { id: "PR-928461", totalAmount: 4760.00, employeeId: "EMP-982134", payPeriod: "Aug 1 - Aug 31", paymentMethod: "Bank Transfer", processedDate: "2025-07-28", status: "failed" },
  { id: "PR-153047", totalAmount: 5890.00, employeeId: "EMP-157203", payPeriod: "Sep 1 - Sep 30", paymentMethod: "Direct Deposit", processedDate: "2025-06-27", status: "processed" },
  { id: "PR-704918", totalAmount: 6120.00, employeeId: "EMP-304958", payPeriod: "Oct 1 - Oct 31", paymentMethod: "Wire Transfer", processedDate: "2025-07-29", status: "received" },
  { id: "PR-382057", totalAmount: 5200.00, employeeId: "EMP-820394", payPeriod: "Nov 1 - Nov 30", paymentMethod: "Bank Transfer", processedDate: "2025-05-28", status: "processed" },
  { id: "PR-869142", totalAmount: 4680.00, employeeId: "EMP-209384", payPeriod: "Dec 1 - Dec 31", paymentMethod: "Direct Deposit", processedDate: "2025-06-27", status: "pending" },
  { id: "PR-495738", totalAmount: 5950.00, employeeId: "EMP-671203", payPeriod: "Jan 1 - Jan 31", paymentMethod: "Wire Transfer", processedDate: "2025-01-30", status: "processed" },
  { id: "PR-720381", totalAmount: 6400.00, employeeId: "EMP-430982", payPeriod: "Feb 1 - Feb 28", paymentMethod: "Bank Transfer", processedDate: "2025-02-25", status: "received" },
  { id: "PR-156847", totalAmount: 5100.00, employeeId: "EMP-598210", payPeriod: "Mar 1 - Mar 31", paymentMethod: "Direct Deposit", processedDate: "2025-03-29", status: "processed" },
  { id: "PR-683920", totalAmount: 4890.00, employeeId: "EMP-120398", payPeriod: "Apr 1 - Apr 30", paymentMethod: "Wire Transfer", processedDate: "2025-04-26", status: "failed" },
  { id: "PR-294751", totalAmount: 5630.00, employeeId: "EMP-349820", payPeriod: "May 1 - May 31", paymentMethod: "Bank Transfer", processedDate: "2025-05-28", status: "processed" },
  { id: "PR-817462", totalAmount: 6890.00, employeeId: "EMP-780123", payPeriod: "Jun 1 - Jun 30", paymentMethod: "Direct Deposit", processedDate: "2025-06-29", status: "received" },
  { id: "PR-439582", totalAmount: 5250.00, employeeId: "EMP-215890", payPeriod: "Jul 1 - Jul 31", paymentMethod: "Wire Transfer", processedDate: "2025-07-30", status: "processed" },
  { id: "PR-762039", totalAmount: 4720.00, employeeId: "EMP-903284", payPeriod: "Aug 1 - Aug 31", paymentMethod: "Bank Transfer", processedDate: "2025-08-03", status: "pending" },
  { id: "PR-185930", totalAmount: 6050.00, employeeId: "EMP-482019", payPeriod: "Sep 1 - Sep 30", paymentMethod: "Direct Deposit", processedDate: "2025-07-03", status: "processed" },
  { id: "PR-603847", totalAmount: 5480.00, employeeId: "EMP-690123", payPeriod: "Oct 1 - Oct 31", paymentMethod: "Wire Transfer", processedDate: "2025-02-03", status: "received" },
  { id: "PR-927148", totalAmount: 4950.00, employeeId: "EMP-158209", payPeriod: "Nov 1 - Nov 30", paymentMethod: "Bank Transfer", processedDate: "2025-01-29", status: "processed" },
  { id: "PR-358204", totalAmount: 6780.00, employeeId: "EMP-320984", payPeriod: "Dec 1 - Dec 31", paymentMethod: "Direct Deposit", processedDate: "2025-02-30", status: "failed" },
  { id: "PR-741962", totalAmount: 5670.00, employeeId: "EMP-871203", payPeriod: "Jan 1 - Jan 31", paymentMethod: "Wire Transfer", processedDate: "2024-01-28", status: "processed" },
  { id: "PR-204851", totalAmount: 5320.00, employeeId: "EMP-540982", payPeriod: "Feb 1 - Feb 28", paymentMethod: "Bank Transfer", processedDate: "2024-02-27", status: "received" },
  { id: "PR-689375", totalAmount: 4580.00, employeeId: "EMP-109283", payPeriod: "Mar 1 - Mar 31", paymentMethod: "Direct Deposit", processedDate: "2024-03-30", status: "processed" },
  { id: "PR-452908", totalAmount: 6150.00, employeeId: "EMP-781204", payPeriod: "Apr 1 - Apr 30", paymentMethod: "Wire Transfer", processedDate: "2024-04-28", status: "pending" },
  { id: "PR-837401", totalAmount: 5750.00, employeeId: "EMP-230984", payPeriod: "May 1 - May 31", paymentMethod: "Bank Transfer", processedDate: "2024-05-29", status: "processed" },
  { id: "PR-106529", totalAmount: 4830.00, employeeId: "EMP-892013", payPeriod: "Jun 1 - Jun 30", paymentMethod: "Direct Deposit", processedDate: "2024-06-26", status: "received" },
  { id: "PR-673841", totalAmount: 6290.00, employeeId: "EMP-384920", payPeriod: "Jul 1 - Jul 31", paymentMethod: "Wire Transfer", processedDate: "2024-07-31", status: "processed" },
  { id: "PR-295074", totalAmount: 5890.00, employeeId: "EMP-105837", payPeriod: "Aug 1 - Aug 31", paymentMethod: "Bank Transfer", processedDate: "2024-08-28", status: "failed" },
  { id: "PR-748203", totalAmount: 5140.00, employeeId: "EMP-492038", payPeriod: "Sep 1 - Sep 30", paymentMethod: "Direct Deposit", processedDate: "2024-09-29", status: "processed" },
  { id: "PR-419637", totalAmount: 6480.00, employeeId: "EMP-760154", payPeriod: "Oct 1 - Oct 31", paymentMethod: "Wire Transfer", processedDate: "2024-10-27", status: "received" },
  { id: "PR-862950", totalAmount: 4920.00, employeeId: "EMP-218406", payPeriod: "Nov 1 - Nov 30", paymentMethod: "Bank Transfer", processedDate: "2024-11-30", status: "processed" },
  { id: "PR-130485", totalAmount: 5560.00, employeeId: "EMP-573920", payPeriod: "Dec 1 - Dec 31", paymentMethod: "Direct Deposit", processedDate: "2024-12-28", status: "pending" },
  { id: "PR-587329", totalAmount: 6780.00, employeeId: "EMP-640281", payPeriod: "Jan 1 - Jan 31", paymentMethod: "Wire Transfer", processedDate: "2024-01-30", status: "processed" },
  { id: "PR-924061", totalAmount: 4650.00, employeeId: "EMP-982134", payPeriod: "Feb 1 - Feb 28", paymentMethod: "Bank Transfer", processedDate: "2024-02-24", status: "received" },
  { id: "PR-358947", totalAmount: 5270.00, employeeId: "EMP-157203", payPeriod: "Mar 1 - Mar 31", paymentMethod: "Direct Deposit", processedDate: "2024-03-27", status: "processed" },
  { id: "PR-701285", totalAmount: 6090.00, employeeId: "EMP-304958", payPeriod: "Apr 1 - Apr 30", paymentMethod: "Wire Transfer", processedDate: "2024-04-29", status: "failed" },
  { id: "PR-463890", totalAmount: 5820.00, employeeId: "EMP-820394", payPeriod: "May 1 - May 31", paymentMethod: "Bank Transfer", processedDate: "2024-05-31", status: "processed" },
  { id: "PR-829473", totalAmount: 4710.00, employeeId: "EMP-209384", payPeriod: "Jun 1 - Jun 30", paymentMethod: "Direct Deposit", processedDate: "2024-06-27", status: "received" },
  { id: "PR-196804", totalAmount: 6350.00, employeeId: "EMP-671203", payPeriod: "Jul 1 - Jul 31", paymentMethod: "Wire Transfer", processedDate: "2024-07-28", status: "processed" },
  { id: "PR-742561", totalAmount: 5190.00, employeeId: "EMP-430982", payPeriod: "Aug 1 - Aug 31", paymentMethod: "Bank Transfer", processedDate: "2024-08-30", status: "pending" },
  { id: "PR-508239", totalAmount: 4890.00, employeeId: "EMP-598210", payPeriod: "Sep 1 - Sep 30", paymentMethod: "Direct Deposit", processedDate: "2024-09-26", status: "processed" },
  { id: "PR-865417", totalAmount: 6520.00, employeeId: "EMP-120398", payPeriod: "Oct 1 - Oct 31", paymentMethod: "Wire Transfer", processedDate: "2024-10-30", status: "received" },
  { id: "PR-231096", totalAmount: 5460.00, employeeId: "EMP-349820", payPeriod: "Nov 1 - Nov 30", paymentMethod: "Bank Transfer", processedDate: "2024-11-28", status: "processed" },
  { id: "PR-687452", totalAmount: 4970.00, employeeId: "EMP-780123", payPeriod: "Dec 1 - Dec 31", paymentMethod: "Direct Deposit", processedDate: "2024-12-29", status: "failed" },
  { id: "PR-394815", totalAmount: 6180.00, employeeId: "EMP-215890", payPeriod: "Jan 1 - Jan 31", paymentMethod: "Wire Transfer", processedDate: "2023-01-31", status: "processed" },
  { id: "PR-750263", totalAmount: 5340.00, employeeId: "EMP-903284", payPeriod: "Feb 1 - Feb 28", paymentMethod: "Bank Transfer", processedDate: "2023-02-25", status: "received" },
  { id: "PR-128697", totalAmount: 4620.00, employeeId: "EMP-482019", payPeriod: "Mar 1 - Mar 31", paymentMethod: "Direct Deposit", processedDate: "2023-03-28", status: "processed" }
]

