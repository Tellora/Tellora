import { getSupabaseData, saveSupabaseData } from "./supabase";

export interface Employee {
    id: string; // e.g. "EMP-2026-001"
    name: string;
    email: string;
    role: string;
    department: string;
    shiftStart: string; // e.g. "09:00"
    shiftEnd: string; // e.g. "18:00"
    shiftHours: number; // e.g. 9
    status: "Active" | "Suspended";
    password?: string; // stored credentials
    created_at: string;
    enrolledFace?: string | null; // reference face signature
    leaveBalance?: { cl: number; sl: number; el: number }; // Casual, Sick, Earned
}

export interface AttendanceLog {
    id: string;
    employeeId: string;
    employeeName: string;
    employeeRole: string;
    employeeDept: string;
    date: string; // YYYY-MM-DD
    clockIn: string; // ISO string
    clockInPhoto: string; // base64 webcam snapshot
    clockInVerified: boolean;
    clockInConfidence: number; // e.g. 98.4
    clockOut: string | null; // ISO string or null
    clockOutPhoto: string | null; // base64 webcam snapshot
    clockOutVerified: boolean;
    clockOutConfidence: number; // e.g. 99.1
    totalHours: number | null; // calculation of difference
    status: "active" | "ontime" | "late" | "undertime" | "completed";
    notes?: string;
    ipAddress?: string;
    location?: string;
    progressUpdates?: { time: string; text: string }[];
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    reason: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
    leaveType?: "Casual" | "Sick" | "Earned";
}

// Collections in admin_data
const EMP_COLL = "workforce_employees";
const ATT_COLL = "workforce_attendance";
const LEAVE_COLL = "workforce_leaves";

// Helper for generating UUIDs client-side
function generateId(): string {
    return Math.random().toString(36).substring(2, 9).toUpperCase();
}

// ── Employee Actions ─────────────────────────────────────────────────────────

export async function getEmployees(): Promise<Employee[]> {
    const data = await getSupabaseData<Employee[]>(EMP_COLL, []);
    return Array.isArray(data) ? data : [];
}

export async function saveEmployee(employee: Employee): Promise<boolean> {
    const employees = await getEmployees();
    const index = employees.findIndex(e => e.id === employee.id);
    
    if (index >= 0) {
        // Keep existing password if not updated
        if (!employee.password && employees[index].password) {
            employee.password = employees[index].password;
        }
        // Keep existing enrolled face if not explicitly updated or cleared
        if (employee.enrolledFace === undefined && employees[index].enrolledFace) {
            employee.enrolledFace = employees[index].enrolledFace;
        }
        // Keep existing leave balance if not updated
        if (!employee.leaveBalance && employees[index].leaveBalance) {
            employee.leaveBalance = employees[index].leaveBalance;
        }
        employees[index] = { ...employees[index], ...employee };
    } else {
        if (!employee.id) {
            employee.id = `EMP-${new Date().getFullYear()}-${generateId().substring(0, 3)}`;
        }
        if (!employee.password) {
            employee.password = "password123"; // default password
        }
        if (!employee.enrolledFace) {
            employee.enrolledFace = null;
        }
        if (!employee.leaveBalance) {
            employee.leaveBalance = { cl: 12, sl: 10, el: 15 };
        }
        employees.push(employee);
    }
    
    return saveSupabaseData(EMP_COLL, employees);
}

export async function deleteEmployee(id: string): Promise<boolean> {
    const employees = await getEmployees();
    const filtered = employees.filter(e => e.id !== id);
    return saveSupabaseData(EMP_COLL, filtered);
}

// ── Attendance Actions ────────────────────────────────────────────────────────

export async function getAttendanceLogs(): Promise<AttendanceLog[]> {
    const data = await getSupabaseData<AttendanceLog[]>(ATT_COLL, []);
    return Array.isArray(data) ? data : [];
}

export async function saveAttendanceLog(log: AttendanceLog): Promise<boolean> {
    const logs = await getAttendanceLogs();
    const index = logs.findIndex(l => l.id === log.id);
    
    if (index >= 0) {
        logs[index] = { ...logs[index], ...log };
    } else {
        if (!log.id) {
            log.id = `ATT-${generateId()}`;
        }
        logs.push(log);
    }
    
    return saveSupabaseData(ATT_COLL, logs);
}

export async function deleteAttendanceLog(id: string): Promise<boolean> {
    const logs = await getAttendanceLogs();
    const filtered = logs.filter(l => l.id !== id);
    return saveSupabaseData(ATT_COLL, filtered);
}

// ── Leave Actions ─────────────────────────────────────────────────────────────

export async function getLeaveRequests(): Promise<LeaveRequest[]> {
    const data = await getSupabaseData<LeaveRequest[]>(LEAVE_COLL, []);
    return Array.isArray(data) ? data : [];
}

export async function saveLeaveRequest(req: LeaveRequest): Promise<boolean> {
    const leaves = await getLeaveRequests();
    const index = leaves.findIndex(l => l.id === req.id);
    
    if (index >= 0) {
        leaves[index] = { ...leaves[index], ...req };
    } else {
        if (!req.id) {
            req.id = `LEV-${generateId()}`;
        }
        leaves.push(req);
    }
    
    return saveSupabaseData(LEAVE_COLL, leaves);
}

export async function deleteLeaveRequest(id: string): Promise<boolean> {
    const leaves = await getLeaveRequests();
    const filtered = leaves.filter(l => l.id !== id);
    return saveSupabaseData(LEAVE_COLL, filtered);
}
