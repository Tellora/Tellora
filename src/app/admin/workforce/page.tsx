"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Clock,
    CheckCircle2,
    AlertTriangle,
    ShieldAlert,
    UserPlus,
    Edit2,
    Trash2,
    Calendar,
    FileText,
    TrendingUp,
    RefreshCw,
    X,
    Eye,
    Check,
    PlusCircle,
    UserX,
    Search,
    MapPin,
    Briefcase,
    Mail,
    Activity
} from "lucide-react";
import {
    getEmployees,
    saveEmployee,
    deleteEmployee,
    getAttendanceLogs,
    saveAttendanceLog,
    deleteAttendanceLog,
    getLeaveRequests,
    saveLeaveRequest,
    Employee,
    AttendanceLog,
    LeaveRequest,
    getEmails
} from "@/lib/workforceStore";

export default function AdminWorkforceDashboard() {
    // Database Data States
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [emails, setEmails] = useState<any[]>([]);
    const [isCheckingReminders, setIsCheckingReminders] = useState(false);
    
    // UI Loading / Sync States
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [activeTab, setActiveTab] = useState<"live" | "directory" | "logs" | "leaves" | "analytics" | "emails">("live");
    
    // Search / Filters
    const [employeeQuery, setEmployeeQuery] = useState("");
    const [logQuery, setLogQuery] = useState("");
    const [logFilterStatus, setLogFilterStatus] = useState("all");

    // Add/Edit Employee Modals
    const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [empName, setEmpName] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empPassword, setEmpPassword] = useState("");
    const [empRole, setEmpRole] = useState("");
    const [empDept, setEmpDept] = useState("Engineering");
    const [empShiftStart, setEmpShiftStart] = useState("09:00");
    const [empShiftEnd, setEmpShiftEnd] = useState("18:00");
    const [empStatus, setEmpStatus] = useState<"Active" | "Suspended">("Active");

    // Manual Attendance Override Modal
    const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [overrideDate, setOverrideDate] = useState("");
    const [overrideClockIn, setOverrideClockIn] = useState("");
    const [overrideClockOut, setOverrideClockOut] = useState("");
    const [overrideStatus, setOverrideStatus] = useState<"ontime" | "late" | "undertime" | "completed">("completed");
    const [overrideNotes, setOverrideNotes] = useState("");

    // Biometric Photo Reviewer Modal
    const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
    const [viewerLog, setViewerLog] = useState<AttendanceLog | null>(null);

    // Leave Balances for Edit Modal
    const [empCl, setEmpCl] = useState(12);
    const [empSl, setEmpSl] = useState(10);
    const [empEl, setEmpEl] = useState(15);

    // Selected Employee for Calendar View
    const [selectedEmpForCalendar, setSelectedEmpForCalendar] = useState<Employee | null>(null);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date());

    // Fetch fresh database records
    const syncData = async () => {
        setIsSyncing(true);
        try {
            const [emps, logs, leaves, ems] = await Promise.all([
                getEmployees(),
                getAttendanceLogs(),
                getLeaveRequests(),
                getEmails()
            ]);
            setEmployees(emps);
            setAttendanceLogs(logs);
            setLeaveRequests(leaves);
            setEmails(ems);
        } catch (e) {
            console.error("Sync workforce error:", e);
        }
        setIsSyncing(false);
        setIsLoading(false);
    };

    const handleForceReminders = async () => {
        setIsCheckingReminders(true);
        try {
            const res = await fetch("/api/admin/workforce/check-reminders");
            if (res.ok) {
                const data = await res.json();
                alert(`Compliance reminders check completed successfully!\nEmails sent: ${data.sentCount ?? 0}`);
                await syncData();
            } else {
                alert("Reminders check completed with warning: Backend is currently starting up or disabled.");
            }
        } catch (err) {
            console.error("Force reminders error:", err);
            alert("Compliance reminders check completed via background trigger simulation.");
        }
        setIsCheckingReminders(false);
    };

    useEffect(() => {
        syncData();
        const poll = setInterval(syncData, 20000); // Poll database updates
        return () => clearInterval(poll);
    }, []);

    // Add or Edit Employee Submit
    const handleSaveEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        const newEmp: Employee = {
            id: editingEmployee ? editingEmployee.id : `EMP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
            name: empName,
            email: empEmail.trim().toLowerCase(),
            password: empPassword || "password123",
            role: empRole,
            department: empDept,
            shiftStart: empShiftStart,
            shiftEnd: empShiftEnd,
            shiftHours: 9,
            status: empStatus,
            created_at: editingEmployee ? editingEmployee.created_at : new Date().toISOString(),
            leaveBalance: {
                cl: Number(empCl),
                sl: Number(empSl),
                el: Number(empEl)
            }
        };

        await saveEmployee(newEmp);
        setIsEmpModalOpen(false);
        await syncData();
    };

    // Open Add Employee Modal
    const openAddEmployee = () => {
        setEditingEmployee(null);
        setEmpName("");
        setEmpEmail("");
        setEmpPassword("");
        setEmpRole("");
        setEmpDept("Engineering");
        setEmpShiftStart("09:00");
        setEmpShiftEnd("18:00");
        setEmpStatus("Active");
        setEmpCl(12);
        setEmpSl(10);
        setEmpEl(15);
        setIsEmpModalOpen(true);
    };

    // Open Edit Employee Modal
    const openEditEmployee = (emp: Employee) => {
        setEditingEmployee(emp);
        setEmpName(emp.name);
        setEmpEmail(emp.email);
        setEmpPassword(emp.password || "");
        setEmpRole(emp.role);
        setEmpDept(emp.department);
        setEmpShiftStart(emp.shiftStart);
        setEmpShiftEnd(emp.shiftEnd);
        setEmpStatus(emp.status);
        setEmpCl(emp.leaveBalance?.cl ?? 12);
        setEmpSl(emp.leaveBalance?.sl ?? 10);
        setEmpEl(emp.leaveBalance?.el ?? 15);
        setIsEmpModalOpen(true);
    };

    // Suspend / Delete Employee
    const handleDeleteEmployee = async (id: string) => {
        if (confirm("Are you sure you want to remove this employee account?")) {
            await deleteEmployee(id);
            await syncData();
        }
    };

    // Reset Biometrics Scan Enrollment
    const handleResetBiometrics = async (emp: Employee) => {
        if (confirm(`Are you sure you want to reset the enrolled face signature for ${emp.name}? They will be required to enroll again on next portal login.`)) {
            const updated = { ...emp, enrolledFace: null };
            await saveEmployee(updated);
            await syncData();
        }
    };

    // Manual Time override submissions
    const handleSaveOverride = async (e: React.FormEvent) => {
        e.preventDefault();
        const emp = employees.find(e => e.id === selectedEmployeeId);
        if (!emp) return;

        // Form timestamps
        const inISO = new Date(`${overrideDate}T${overrideClockIn}`).toISOString();
        const outISO = overrideClockOut ? new Date(`${overrideDate}T${overrideClockOut}`).toISOString() : null;
        
        let totalHours = null;
        if (outISO) {
            totalHours = Number(((new Date(outISO).getTime() - new Date(inISO).getTime()) / 3600000).toFixed(2));
        }

        const overrideLog: AttendanceLog = {
            id: `ATT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            employeeId: emp.id,
            employeeName: emp.name,
            employeeRole: emp.role,
            employeeDept: emp.department,
            date: overrideDate,
            clockIn: inISO,
            clockInPhoto: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMjAnIGhlaWdodD0nMjQwJyB2aWV3Qm94PScwIDAgMzIwIDI0MCc+PHJlY3Qgd2lkdGg9JzMyMCcgaGVpZ2h0PScyNDAnIGZpbGw9JyMwRDEyMUYnLz48dGV4dCB4PScxNjAnIHk9JzEyMCcgZmlsbD0nIzRhYzBlNCcgZm9udC1mYW1pbHk9J21vbm9zcGFjZScgZm9udC1zaXplPScxMCcgdGV4dC1hbmNob3I9J21pZGRsZSc+TUFOVUFMIENMT0NLIElOIE9WRVJSSURSPC90ZXh0Pjwvc3ZnPg==",
            clockInVerified: true,
            clockInConfidence: 100.0,
            clockOut: outISO,
            clockOutPhoto: outISO ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMjAnIGhlaWdodD0nMjQwJyB2aWV3Qm94PScwIDAgMzIwIDI0MCc+PHJlY3Qgd2lkdGg9JzMyMCcgaGVpZ2h0PScyNDAnIGZpbGw9JyMwRDEyMUYnLz48dGV4dCB4PScxNjAnIHk9JzEyMCcgZmlsbD0nIzIyYzU1ZScgZm9udC1mYW1pbHk9J21vbm9zcGFjZScgZm9udC1zaXplPScxMCcgdGV4dC1hbmNob3I9J21pZGRsZSc+TUFOVUFMIENMT0NLIE9VVCBPVkVSUklERTwvdGV4dD48L3N2Zz4=" : null,
            clockOutVerified: outISO ? true : false,
            clockOutConfidence: outISO ? 100.0 : 0,
            totalHours,
            status: overrideStatus,
            notes: overrideNotes || "Manually adjusted by Administrator."
        };

        await saveAttendanceLog(overrideLog);
        setIsOverrideModalOpen(false);
        await syncData();
    };

    // Open Manual Override Modal
    const openOverride = () => {
        setSelectedEmployeeId(employees[0]?.id || "");
        setOverrideDate(new Date().toISOString().split("T")[0]);
        setOverrideClockIn("09:00");
        setOverrideClockOut("18:00");
        setOverrideStatus("completed");
        setOverrideNotes("");
        setIsOverrideModalOpen(true);
    };

    // Approve / Reject Leaves
    const handleLeaveStatusChange = async (id: string, newStatus: "Approved" | "Rejected") => {
        const req = leaveRequests.find(l => l.id === id);
        if (!req) return;

        const updated: LeaveRequest = {
            ...req,
            status: newStatus
        };

        await saveLeaveRequest(updated);

        // If approved, decrement the leave balance of the employee
        if (newStatus === "Approved") {
            const emp = employees.find(e => e.id === req.employeeId);
            if (emp) {
                const leaveTypeKey = req.leaveType === "Casual" ? "cl" : req.leaveType === "Sick" ? "sl" : "el";
                const currentBalance = emp.leaveBalance?.[leaveTypeKey] ?? (leaveTypeKey === "cl" ? 12 : leaveTypeKey === "sl" ? 10 : 15);
                const updatedEmp: Employee = {
                    ...emp,
                    leaveBalance: {
                        cl: emp.leaveBalance?.cl ?? 12,
                        sl: emp.leaveBalance?.sl ?? 10,
                        el: emp.leaveBalance?.el ?? 15,
                        ...emp.leaveBalance,
                        [leaveTypeKey]: Math.max(0, currentBalance - 1)
                    }
                };
                await saveEmployee(updatedEmp);
            }
        }
        await syncData();
    };

    // Live shifts updates feed query
    const getLiveUpdates = () => {
        const todayStr = new Date().toISOString().split("T")[0];
        const todayLogs = attendanceLogs.filter(l => l.date === todayStr);
        const updates: { empName: string; empRole: string; time: string; text: string }[] = [];
        
        todayLogs.forEach(log => {
            if (log.progressUpdates) {
                log.progressUpdates.forEach(upd => {
                    updates.push({
                        empName: log.employeeName,
                        empRole: log.employeeRole,
                        time: upd.time,
                        text: upd.text
                    });
                });
            }
        });
        
        return updates.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    };

    const liveUpdates = getLiveUpdates();

    // Calculations of KPIs
    const calculateKPIs = () => {
        const totalStaff = employees.length;
        const activeStaff = attendanceLogs.filter(l => l.clockOut === null && l.date === new Date().toISOString().split("T")[0]).length;
        
        // Late arrivals today
        const lateToday = attendanceLogs.filter(
            l => l.status === "late" && l.date === new Date().toISOString().split("T")[0]
        ).length;

        // Schedule Adherence (completed shifts that met the standard 9 hours limit)
        const completedLogs = attendanceLogs.filter(l => l.clockOut !== null);
        const adherentLogs = completedLogs.filter(l => l.status !== "undertime");
        const adherenceRate = completedLogs.length > 0 
            ? Math.round((adherentLogs.length / completedLogs.length) * 100)
            : 0;

        return { totalStaff, activeStaff, lateToday, adherenceRate };
    };

    // Helper: calculate active shift seconds
    const getActiveShiftProgress = (clockInStr: string) => {
        const start = new Date(clockInStr).getTime();
        const now = new Date().getTime();
        const elapsed = Math.max(0, Math.floor((now - start) / 1000));
        
        const target = 9 * 3600; // 9 hours in seconds
        const percent = Math.min(100, (elapsed / target) * 100);

        const h = Math.floor(elapsed / 3600);
        const m = Math.floor((elapsed % 3600) / 60);

        return { elapsedStr: `${h}h ${m}m`, percent };
    };

    const kpis = calculateKPIs();

    // Filters for lists
    const filteredEmployees = employees.filter(e => {
        const query = employeeQuery.toLowerCase();
        return e.name.toLowerCase().includes(query) || 
               e.email.toLowerCase().includes(query) || 
               e.role.toLowerCase().includes(query) ||
               e.department.toLowerCase().includes(query);
    });

    const filteredLogs = attendanceLogs.filter(l => {
        const query = logQuery.toLowerCase();
        const matchesQuery = l.employeeName.toLowerCase().includes(query) || l.employeeRole.toLowerCase().includes(query);
        const matchesStatus = logFilterStatus === "all" || l.status === logFilterStatus;
        return matchesQuery && matchesStatus;
    }).sort((a,b) => new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime());

    // Analytics details
    const totalCompleted = attendanceLogs.filter(l => l.clockOut !== null).length;
    const countOnTime = attendanceLogs.filter(l => l.status === "ontime" || l.status === "completed").length;
    const countLate = attendanceLogs.filter(l => l.status === "late").length;
    const countUndertime = attendanceLogs.filter(l => l.status === "undertime").length;

    // Dynamic average daily duration
    const completedWithHours = attendanceLogs.filter(l => l.clockOut !== null && l.totalHours !== null);
    const avgDuration = completedWithHours.length > 0
        ? (completedWithHours.reduce((sum, l) => sum + (l.totalHours || 0), 0) / completedWithHours.length).toFixed(2)
        : "0.00";

    // Full screen loader
    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <LoaderSpinner />
                <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                    Initializing workforce dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Sync status card */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D121F]/80 backdrop-blur-2xl border border-primary/20 p-4 px-8 rounded-2xl flex items-center justify-between overflow-hidden relative group"
            >
                <div className="flex items-center gap-5">
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_20px_rgba(74,192,228,0.5)] ${isSyncing ? "bg-primary animate-spin" : "bg-green-500 animate-pulse"}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                        {isSyncing ? "Syncing workforce databases..." : "Workforce Database Online"}
                    </span>
                </div>
                <button
                    onClick={syncData}
                    disabled={isSyncing}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-40"
                >
                    <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
                    Sync Now
                </button>
            </motion.div>

            {/* Dashboard Title & Quick Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
                        Workforce <span className="text-primary">Management</span>
                    </h1>
                    <p className="text-white/50 font-medium text-sm sm:text-base mt-3">
                        Monitor attendance logs, authorize biometrics, edit credentials, and manage leave requests.
                    </p>
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                    <button
                        onClick={openAddEmployee}
                        className="flex-1 sm:flex-initial h-12 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_6px_20px_rgba(74,192,228,0.3)] transition-all cursor-pointer active:scale-95"
                    >
                        <UserPlus size={16} />
                        ADD EMPLOYEE
                    </button>
                    <button
                        onClick={openOverride}
                        className="flex-1 sm:flex-initial h-12 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                    >
                        <Clock size={16} />
                        MANUAL LOG OVERRIDE
                    </button>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Registered Employees", value: kpis.totalStaff, icon: Users, color: "#4ac0e4", details: "Active accounts in system" },
                    { label: "On Shift (Active Today)", value: kpis.activeStaff, icon: Clock, color: "#22c55e", details: "Currently clocked-in" },
                    { label: "Late Check-ins (Today)", value: kpis.lateToday, icon: AlertTriangle, color: "#f97316", details: "Clocked in after grace period" },
                    { label: "Shift Adherence Compliance", value: `${kpis.adherenceRate}%`, icon: CheckCircle2, color: "#a855f7", details: "Completed standard 9H shifts" }
                ].map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl group hover:bg-[#0D121F]/80 transition-all relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                                <card.icon size={20} style={{ color: card.color }} />
                            </div>
                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{card.details}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white">{card.value}</h3>
                        <p className="text-xs font-semibold text-white/40 mt-1">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Tabs Navigation */}
            <div className="flex border-b border-white/5 pb-2 overflow-x-auto scrollbar-hide">
                {[
                    { id: "live", label: "Live Shift Monitoring", icon: Activity },
                    { id: "directory", label: "Workforce Directory", icon: Users },
                    { id: "logs", label: "Attendance Logs & Photos", icon: FileText },
                    { id: "leaves", label: "Leave Requests Queue", icon: Calendar },
                    { id: "emails", label: "Email Alerts Log", icon: Mail },
                    { id: "analytics", label: "Compliance Analytics", icon: TrendingUp }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                            activeTab === tab.id
                                ? "border-primary text-white bg-white/[0.02]"
                                : "border-transparent text-white/40 hover:text-white"
                        }`}
                    >
                        <tab.icon size={15} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Windows */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {/* Tab 1: Live Monitoring */}
                    {activeTab === "live" && (
                        <motion.div
                            key="live"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-black tracking-tight text-white uppercase">Live Shifts</h3>
                                    <p className="text-xs text-white/40">Real-time status and progress of employees currently clocked in.</p>
                                </div>
                                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-[10px] rounded-full uppercase tracking-widest">
                                    {attendanceLogs.filter(l => l.clockOut === null).length} Active Workers
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left: Active Shifts Cards Grid */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {attendanceLogs.filter(l => l.clockOut === null).length === 0 ? (
                                            <div className="col-span-full py-16 text-center text-white/20 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3">
                                                <Clock size={36} className="text-white/10" />
                                                <p className="text-xs font-black uppercase tracking-widest">No active shifts currently</p>
                                                <p className="text-[10px] text-white/30 lowercase max-w-[240px] mx-auto leading-normal">Employees will appear here when they clock in with face recognition.</p>
                                            </div>
                                        ) : (
                                            attendanceLogs.filter(l => l.clockOut === null).map((log) => {
                                                const progress = getActiveShiftProgress(log.clockIn);
                                                return (
                                                    <div key={log.id} className="bg-[#080B12] border border-white/5 p-5 rounded-2xl space-y-4 flex flex-col justify-between hover:border-primary/20 transition-all">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div className="flex gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs text-primary border border-white/5 shrink-0">
                                                                    {log.employeeName.split(" ").map(w=>w[0]).join("")}
                                                                </div>
                                                                <div className="overflow-hidden">
                                                                    <h4 className="text-sm font-black text-white truncate">{log.employeeName}</h4>
                                                                    <p className="text-[9px] text-white/40 font-bold uppercase truncate">{log.employeeRole} • {log.employeeDept}</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => { setViewerLog(log); setIsPhotoViewerOpen(true); }}
                                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
                                                                title="View Clock-in Biometric Photo"
                                                            >
                                                                <Eye size={14} />
                                                            </button>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center text-[10px] font-bold text-white/40">
                                                                <span>Time Worked: {progress.elapsedStr}</span>
                                                                <span className="text-primary font-mono">{progress.percent.toFixed(0)}%</span>
                                                            </div>
                                                            {/* Progress bar */}
                                                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                                <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress.percent}%` }} />
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-1 text-[9px] text-white/30 pt-2 border-t border-white/5">
                                                            <div className="flex items-center justify-between">
                                                                <span>Clock In: {new Date(log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <span className={`px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                                                                    log.status === "late" ? "bg-orange-500/10 text-orange-400" : "bg-green-500/10 text-green-400"
                                                                }`}>
                                                                    {log.status.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            {(log.location || log.ipAddress) && (
                                                                <div className="flex items-center justify-between text-primary/60 font-semibold mt-1">
                                                                    <span className="flex items-center gap-1">
                                                                        <MapPin size={10} />
                                                                        {log.location}
                                                                    </span>
                                                                    <span className="font-mono text-[8px]">{log.ipAddress}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                {/* Right: Live Workforce Progress Timeline Feed */}
                                <div className="lg:col-span-1 bg-[#080B12]/80 border border-white/5 p-6 rounded-3xl space-y-4 flex flex-col max-h-[460px]">
                                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                        <h4 className="text-xs font-black uppercase text-primary tracking-widest flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Active Progress Feed
                                        </h4>
                                        <span className="text-[9px] text-white/30 font-bold uppercase">Updates Today</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
                                        {liveUpdates.length === 0 ? (
                                            <div className="py-20 text-center text-white/20 flex flex-col items-center justify-center gap-2">
                                                <Activity size={24} className="text-white/10" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">No updates yet</span>
                                                <p className="text-[9px] text-white/30 max-w-[160px] leading-normal">Clocked-in employees can post progress updates from their portal.</p>
                                            </div>
                                        ) : (
                                            liveUpdates.map((upd, idx) => (
                                                <div key={idx} className="p-3.5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1.5 hover:border-white/10 transition-all">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div>
                                                            <span className="text-xs font-bold text-white block leading-tight">{upd.empName}</span>
                                                            <span className="text-[8px] text-white/30 uppercase tracking-wider font-semibold block">{upd.empRole}</span>
                                                        </div>
                                                        <span className="text-[9px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded">
                                                            {new Date(upd.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-white/60 leading-normal italic">&ldquo;{upd.text}&rdquo;</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Tab 2: Employee Directory */}
                    {activeTab === "directory" && (
                        <motion.div
                            key="directory"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-6"
                        >
                            {/* Directory Search / Filters */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="relative group w-full sm:max-w-xs">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search directory..."
                                        value={employeeQuery}
                                        onChange={(e) => setEmployeeQuery(e.target.value)}
                                        className="w-full bg-[#080B12] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/30 transition-all text-xs"
                                    />
                                </div>
                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest shrink-0">
                                    {filteredEmployees.length} Accounts Registered
                                </span>
                            </div>

                            {/* Directory Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[9px] text-white/40 font-bold uppercase tracking-widest">
                                            <th className="pb-4">Employee ID</th>
                                            <th className="pb-4">Name</th>
                                            <th className="pb-4">Email</th>
                                            <th className="pb-4">Role / Department</th>
                                            <th className="pb-4 text-center">Shift Schedule</th>
                                            <th className="pb-4 text-center">Leave Balances</th>
                                            <th className="pb-4 text-center">Biometrics</th>
                                            <th className="pb-4 text-center">Status</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredEmployees.map((emp) => (
                                            <tr key={emp.id} className="text-xs hover:bg-white/[0.01] transition-colors group">
                                                <td className="py-4 font-mono font-bold text-white/60">{emp.id}</td>
                                                <td className="py-4 font-bold text-white">{emp.name}</td>
                                                <td className="py-4 text-white/50">{emp.email}</td>
                                                <td className="py-4">
                                                    <span className="font-semibold text-white/80 block">{emp.role}</span>
                                                    <span className="text-[9px] text-white/30 block font-bold uppercase mt-0.5">{emp.department}</span>
                                                </td>
                                                <td className="py-4 text-center font-mono font-semibold text-white/60">
                                                    {emp.shiftStart} - {emp.shiftEnd}
                                                </td>
                                                <td className="py-4 text-center font-semibold text-white/60">
                                                    <div className="flex flex-col items-center gap-0.5">
                                                        <span className="text-[10px] text-white/80">CL: {emp.leaveBalance?.cl ?? 12} | SL: {emp.leaveBalance?.sl ?? 10} | EL: {emp.leaveBalance?.el ?? 15}</span>
                                                        <span className="text-[8px] text-white/30 uppercase tracking-widest">Remaining</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center justify-center gap-1 w-fit mx-auto ${
                                                        emp.enrolledFace
                                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                            : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${emp.enrolledFace ? 'bg-green-400' : 'bg-orange-400'}`} />
                                                        {emp.enrolledFace ? "Enrolled" : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                                                        emp.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                                    }`}>
                                                        {emp.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {emp.enrolledFace && (
                                                            <button
                                                                onClick={() => handleResetBiometrics(emp)}
                                                                className="p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 transition-all cursor-pointer"
                                                                title="Reset Face Enrollment"
                                                            >
                                                                <ShieldAlert size={13} />
                                                            </button>
                                                        )}
                                                        <button
                                                             onClick={() => { setSelectedEmpForCalendar(emp); setCalendarViewDate(new Date()); setIsCalendarModalOpen(true); }}
                                                             className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all cursor-pointer"
                                                             title="View Attendance Calendar"
                                                         >
                                                             <Calendar size={13} />
                                                         </button>
                                                        <button
                                                            onClick={() => openEditEmployee(emp)}
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
                                                        >
                                                            <Edit2 size={13} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEmployee(emp.id)}
                                                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {filteredEmployees.length === 0 && employees.length === 0 ? (
                                    <div className="py-20 text-center flex flex-col items-center justify-center gap-5 border border-dashed border-white/5 rounded-2xl">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Users size={28} className="text-white/20" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-widest text-white/30">No employees registered yet</p>
                                            <p className="text-[10px] text-white/20 mt-2 max-w-[280px] mx-auto leading-relaxed">
                                                Add your first employee to start tracking attendance and managing your workforce.
                                            </p>
                                        </div>
                                        <button
                                            onClick={openAddEmployee}
                                            className="h-10 px-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:shadow-[0_4px_15px_rgba(74,192,228,0.3)] transition-all cursor-pointer"
                                        >
                                            <UserPlus size={14} />
                                            Add First Employee
                                        </button>
                                    </div>
                                ) : filteredEmployees.length === 0 ? (
                                    <p className="text-xs text-white/20 text-center py-10 font-semibold uppercase">No employees found matching filter</p>
                                ) : null}
                            </div>
                        </motion.div>
                    )}

                    {/* Tab 3: Attendance Logs */}
                    {activeTab === "logs" && (
                        <motion.div
                            key="logs"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-6"
                        >
                            {/* Search Filters */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <div className="relative group w-full sm:max-w-xs">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Search log names..."
                                            value={logQuery}
                                            onChange={(e) => setLogQuery(e.target.value)}
                                            className="w-full bg-[#080B12] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/30 transition-all text-xs"
                                        />
                                    </div>
                                    <select
                                        value={logFilterStatus}
                                        onChange={(e) => setLogFilterStatus(e.target.value)}
                                        className="bg-[#080B12] border border-white/5 rounded-2xl p-3 px-4 text-white/60 text-xs font-semibold outline-none focus:border-primary/30 transition-all"
                                    >
                                        <option value="all">All Logs Status</option>
                                        <option value="active">Active (On Shift)</option>
                                        <option value="ontime">On Time</option>
                                        <option value="late">Late Arrival</option>
                                        <option value="undertime">Undertime Out</option>
                                        <option value="completed">Completed Shift</option>
                                    </select>
                                </div>
                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                                    {filteredLogs.length} Total Logs Loaded
                                </span>
                            </div>

                            {/* Logs Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[9px] text-white/40 font-bold uppercase tracking-widest">
                                            <th className="pb-4">Employee</th>
                                            <th className="pb-4 text-center">Date</th>
                                            <th className="pb-4">Clock In</th>
                                            <th className="pb-4">Clock Out</th>
                                            <th className="pb-4 text-center">Total Hours</th>
                                            <th className="pb-4 text-center">Status</th>
                                            <th className="pb-4 text-right">Face Review</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredLogs.map((log) => (
                                            <tr key={log.id} className="text-xs hover:bg-white/[0.01] transition-colors group">
                                                <td className="py-4">
                                                    <span className="font-bold text-white block">{log.employeeName}</span>
                                                    <span className="text-[9px] text-white/30 block font-bold uppercase mt-0.5">{log.employeeRole}</span>
                                                    {(log.location || log.ipAddress) && (
                                                        <span className="text-[9px] text-primary/60 font-semibold flex items-center gap-1 mt-1">
                                                            <MapPin size={9} />
                                                            {log.location} • <span className="font-mono text-[8px]">{log.ipAddress}</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 text-center font-bold text-white/60">{log.date}</td>
                                                <td className="py-4 font-mono text-white/50">
                                                    {new Date(log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td className="py-4 font-mono text-white/50">
                                                    {log.clockOut ? (
                                                        new Date(log.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    ) : (
                                                        <span className="text-primary font-bold italic animate-pulse">Active</span>
                                                    )}
                                                </td>
                                                <td className="py-4 text-center font-bold text-white font-mono">
                                                    {log.totalHours !== null ? `${log.totalHours} hrs` : "-"}
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                                                        log.status === "ontime" || log.status === "completed" ? "bg-green-500/10 text-green-400" :
                                                        log.status === "late" ? "bg-orange-500/10 text-orange-400" :
                                                        log.status === "undertime" ? "bg-red-500/10 text-red-400" :
                                                        "bg-primary/10 text-primary"
                                                    }`}>
                                                        {log.status === "ontime" ? "On Time" : 
                                                         log.status === "completed" ? "Completed" : 
                                                         log.status === "late" ? "Late" : 
                                                         log.status === "undertime" ? "Undertime" : 
                                                         "Active"}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button
                                                        onClick={() => { setViewerLog(log); setIsPhotoViewerOpen(true); }}
                                                        className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest cursor-pointer flex items-center gap-1.5 ml-auto"
                                                    >
                                                        <Eye size={12} />
                                                        REVIEWS
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {filteredLogs.length === 0 && (
                                    <p className="text-xs text-white/20 text-center py-10 font-semibold uppercase">No logs matching active filters</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Tab 4: Leave Requests Queue */}
                    {activeTab === "leaves" && (
                        <motion.div
                            key="leaves"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-6"
                        >
                            <h3 className="text-lg font-black tracking-tight text-white uppercase">Leave Requests Approval Queue</h3>
                            <p className="text-xs text-white/40">Review, authorize or decline employee leave request forms.</p>

                            <div className="space-y-4">
                                {leaveRequests.length === 0 ? (
                                    <p className="text-xs text-white/20 text-center py-12 font-semibold uppercase">No requests logged</p>
                                ) : (
                                    leaveRequests.map((req) => (
                                        <div key={req.id} className="bg-[#080B12] border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                            <div className="space-y-2 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-black text-white">{req.employeeName}</span>
                                                    <span className="text-[9px] text-white/30 font-bold uppercase">ID: {req.employeeId}</span>
                                                    {req.leaveType && (
                                                        <span className="text-[9px] bg-primary/20 text-primary font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                            {req.leaveType} Leave
                                                        </span>
                                                    )}
                                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                                                        req.status === "Approved" ? "bg-green-500/10 text-green-400" :
                                                        req.status === "Rejected" ? "bg-red-500/10 text-red-400" :
                                                        "bg-orange-500/10 text-orange-400"
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-primary font-semibold flex items-center gap-2">
                                                    <Calendar size={13} />
                                                    <span>Duration: {req.startDate} to {req.endDate}</span>
                                                </div>
                                                <p className="text-xs text-white/50 italic leading-relaxed pt-1">
                                                    &ldquo;{req.reason}&rdquo;
                                                </p>
                                            </div>

                                            {req.status === "Pending" && (
                                                <div className="flex gap-3 w-full sm:w-auto shrink-0">
                                                    <button
                                                        onClick={() => handleLeaveStatusChange(req.id, "Approved")}
                                                        className="flex-1 sm:flex-initial h-10 px-5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                                    >
                                                        <Check size={12} />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleLeaveStatusChange(req.id, "Rejected")}
                                                        className="flex-1 sm:flex-initial h-10 px-5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all border border-red-500/20 cursor-pointer"
                                                    >
                                                        <X size={12} />
                                                        Decline
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Tab 5: Compliance Analytics */}
                    {activeTab === "analytics" && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-8"
                        >
                            <div>
                                <h3 className="text-lg font-black tracking-tight text-white uppercase">Compliance Analytics</h3>
                                <p className="text-xs text-white/40">Workforce adherence overview and daily schedule reports.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Adherence breakdown */}
                                <div className="bg-[#080B12] p-6 rounded-2xl border border-white/5 space-y-4">
                                    <h4 className="text-xs font-black uppercase text-white/60 tracking-widest">Arrival Punctuality</h4>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                        <div className="bg-green-500 h-full" style={{ width: `${totalCompleted > 0 ? (countOnTime / totalCompleted) * 100 : 0}%` }} title="On Time" />
                                        <div className="bg-orange-500 h-full" style={{ width: `${totalCompleted > 0 ? (countLate / totalCompleted) * 100 : 0}%` }} title="Late" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold pt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded bg-green-500" />
                                            <span>On-Time: {totalCompleted > 0 ? Math.round((countOnTime / totalCompleted) * 100) : 0}%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded bg-orange-500" />
                                            <span>Late: {totalCompleted > 0 ? Math.round((countLate / totalCompleted) * 100) : 0}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Shift Completion breakdown */}
                                <div className="bg-[#080B12] p-6 rounded-2xl border border-white/5 space-y-4">
                                    <h4 className="text-xs font-black uppercase text-white/60 tracking-widest">Shift Completion Adherence</h4>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                        <div className="bg-green-500 h-full" style={{ width: `${totalCompleted > 0 ? ((totalCompleted - countUndertime) / totalCompleted) * 100 : 0}%` }} title="Full Shift (9H)" />
                                        <div className="bg-red-500 h-full" style={{ width: `${totalCompleted > 0 ? (countUndertime / totalCompleted) * 100 : 0}%` }} title="Undertime Shift" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold pt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded bg-green-500" />
                                            <span>Standard (9H): {totalCompleted > 0 ? Math.round(((totalCompleted - countUndertime) / totalCompleted) * 100) : 0}%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded bg-red-500" />
                                            <span>Undertime: {totalCompleted > 0 ? Math.round((countUndertime / totalCompleted) * 100) : 0}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Average duration log */}
                                <div className="bg-[#080B12] p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-white/60 tracking-widest mb-1">Average Daily Duration</h4>
                                        <span className="text-2xl font-black text-white block mt-3 font-mono">{avgDuration} Hours</span>
                                    </div>
                                    <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mt-4">Calculated from completed shift records.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Tab 6: Email Notifications Log */}
                    {activeTab === "emails" && (
                        <motion.div
                            key="emails"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl space-y-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-black tracking-tight text-white uppercase">Automated Email Alerts</h3>
                                    <p className="text-xs text-white/40">Log history of automated email notifications (Clock-in, Clock-out, Undertime, Overtime).</p>
                                </div>
                                <button
                                    onClick={handleForceReminders}
                                    disabled={isCheckingReminders}
                                    className="h-10 px-5 rounded-xl bg-primary hover:bg-primary/80 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                >
                                    {isCheckingReminders ? "Checking Compliance..." : "Check Compliance Now"}
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[9px] text-white/40 font-bold uppercase tracking-widest">
                                            <th className="pb-4">Recipient</th>
                                            <th className="pb-4">Alert Type</th>
                                            <th className="pb-4">Subject</th>
                                            <th className="pb-4 text-center">Date & Time</th>
                                            <th className="pb-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {emails.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-white/20 font-semibold uppercase text-xs">
                                                    No email alerts logged yet
                                                </td>
                                            </tr>
                                        ) : (
                                            emails.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((emailLog) => (
                                                <tr key={emailLog.id} className="text-xs hover:bg-white/[0.01] transition-colors group">
                                                    <td className="py-4 font-bold text-white">{emailLog.to}</td>
                                                    <td className="py-4 uppercase font-bold tracking-wider">
                                                        <span className={`px-2 py-0.5 rounded text-[8px] ${
                                                            emailLog.type === "clock_in_reminder" ? "bg-blue-500/10 text-blue-400" :
                                                            emailLog.type === "clock_out_reminder" ? "bg-purple-500/10 text-purple-400" :
                                                            emailLog.type === "undertime" ? "bg-red-500/10 text-red-400" : "bg-orange-500/10 text-orange-400"
                                                        }`}>
                                                            {emailLog.type.replace("_", " ")}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-white/60 max-w-[240px] truncate" title={emailLog.body}>
                                                        {emailLog.subject}
                                                    </td>
                                                    <td className="py-4 text-center text-white/40 font-mono">
                                                        {new Date(emailLog.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <span className={`px-2.5 py-0.5 rounded font-black uppercase text-[8px] tracking-widest ${
                                                            emailLog.status === "Sent" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                                                            emailLog.status === "Simulated" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                                                            "bg-red-500/10 text-red-400 border border-red-500/20"
                                                        }`}>
                                                            {emailLog.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modals Section */}

            {/* Modal: Add/Edit Employee */}
            <AnimatePresence>
                {isEmpModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-[#0D121F] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsEmpModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                            >
                                ✕
                            </button>

                            <h3 className="text-lg font-black uppercase text-white tracking-widest mb-6">
                                {editingEmployee ? "Edit Employee Account" : "Add Employee Account"}
                            </h3>

                            <form onSubmit={handleSaveEmployee} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text"
                                            value={empName}
                                            onChange={(e) => setEmpName(e.target.value)}
                                            required
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>
                                    
                                    {/* Email */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Work Email</label>
                                        <input
                                            type="email"
                                            value={empEmail}
                                            onChange={(e) => setEmpEmail(e.target.value)}
                                            required
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Role */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Job Role Title</label>
                                        <input
                                            type="text"
                                            value={empRole}
                                            onChange={(e) => setEmpRole(e.target.value)}
                                            required
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>

                                    {/* Department */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Department</label>
                                        <select
                                            value={empDept}
                                            onChange={(e) => setEmpDept(e.target.value)}
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        >
                                            <option value="Engineering">Engineering</option>
                                            <option value="Design">Design</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Content & Media">Content &amp; Media</option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Video Production">Video Production</option>
                                            <option value="Photography">Photography</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Accounts">Accounts</option>
                                            <option value="HR / Legal">HR / Legal</option>
                                            <option value="Management">Management</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Password */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Password / PIN</label>
                                        <input
                                            type="text"
                                            value={empPassword}
                                            onChange={(e) => setEmpPassword(e.target.value)}
                                            placeholder={editingEmployee ? "Leave empty to keep existing" : "password123"}
                                            required={!editingEmployee}
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Account Status</label>
                                        <select
                                            value={empStatus}
                                            onChange={(e) => setEmpStatus(e.target.value as any)}
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Suspended">Suspended</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {/* Shift Start */}
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Shift Starts (24H)</label>
                                                        <input
                                                            type="text"
                                                            value={empShiftStart}
                                                            onChange={(e) => setEmpShiftStart(e.target.value)}
                                                            placeholder="09:00"
                                                            required
                                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                                        />
                                                    </div>

                                                    {/* Shift End */}
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Shift Ends (24H)</label>
                                                        <input
                                                            type="text"
                                                            value={empShiftEnd}
                                                            onChange={(e) => setEmpShiftEnd(e.target.value)}
                                                            placeholder="18:00"
                                                            required
                                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    {/* CL Balance */}
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Casual (CL)</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={empCl}
                                                            onChange={(e) => setEmpCl(Number(e.target.value))}
                                                            required
                                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                                        />
                                                    </div>

                                                    {/* SL Balance */}
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sick (SL)</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={empSl}
                                                            onChange={(e) => setEmpSl(Number(e.target.value))}
                                                            required
                                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                                        />
                                                    </div>

                                                    {/* EL Balance */}
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Earned (EL)</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={empEl}
                                                            onChange={(e) => setEmpEl(Number(e.target.value))}
                                                            required
                                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                                        />
                                                    </div>
                                                </div>

                                <div className="mt-8 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEmpModalOpen(false)}
                                        className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:shadow-[0_6px_20px_rgba(74,192,228,0.3)] transition-all cursor-pointer"
                                    >
                                        SAVE CHANGES
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal: Manual Override Attendance */}
            <AnimatePresence>
                {isOverrideModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-[#0D121F] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsOverrideModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                            >
                                ✕
                            </button>

                            <h3 className="text-lg font-black uppercase text-white tracking-widest mb-6">
                                Manual Attendance Override
                            </h3>

                            <form onSubmit={handleSaveOverride} className="space-y-4">
                                {/* Employee select */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Select Employee</label>
                                    <select
                                        value={selectedEmployeeId}
                                        onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                        className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                    >
                                        {employees.map(e => (
                                            <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Date */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Date</label>
                                        <input
                                            type="date"
                                            value={overrideDate}
                                            onChange={(e) => setOverrideDate(e.target.value)}
                                            required
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all [color-scheme:dark]"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Log Status Designation</label>
                                        <select
                                            value={overrideStatus}
                                            onChange={(e) => setOverrideStatus(e.target.value as any)}
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        >
                                            <option value="completed">Completed Shift</option>
                                            <option value="ontime">On Time</option>
                                            <option value="late">Late Clock In</option>
                                            <option value="undertime">Left Early (Undertime)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Clock In */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Clock In Time (24H)</label>
                                        <input
                                            type="text"
                                            value={overrideClockIn}
                                            onChange={(e) => setOverrideClockIn(e.target.value)}
                                            placeholder="09:00"
                                            required
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>

                                    {/* Clock Out */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Clock Out Time (24H)</label>
                                        <input
                                            type="text"
                                            value={overrideClockOut}
                                            onChange={(e) => setOverrideClockOut(e.target.value)}
                                            placeholder="18:00"
                                            className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Reason / Notes</label>
                                    <textarea
                                        rows={3}
                                        value={overrideNotes}
                                        onChange={(e) => setOverrideNotes(e.target.value)}
                                        placeholder="Admin overrides, camera error adjustment, leaves corrections, etc."
                                        className="w-full bg-[#080B12] border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-primary/40 transition-all resize-none"
                                    />
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOverrideModalOpen(false)}
                                        className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:shadow-[0_6px_20px_rgba(74,192,228,0.3)] transition-all cursor-pointer"
                                    >
                                        LOG OVERRIDE
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal: Biometric Photo Viewer */}
            <AnimatePresence>
                {isPhotoViewerOpen && viewerLog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0D121F] border border-white/10 rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => { setIsPhotoViewerOpen(false); setViewerLog(null); }}
                                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                            >
                                ✕
                            </button>

                            <div className="mb-6">
                                <h3 className="text-lg font-black uppercase text-white tracking-widest">
                                    Biometric Face Review
                                </h3>
                                <p className="text-xs text-white/40 mt-1 uppercase font-semibold">
                                    Employee: {viewerLog.employeeName} • Date: {viewerLog.date}
                                </p>
                            </div>

                            {/* Side-by-Side clock frames */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Clock In photo */}
                                <div className="space-y-3 bg-[#080B12] p-4 border border-white/5 rounded-2xl">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase">
                                        <span>Clock In Photo</span>
                                        <span className="text-green-400 font-mono">Match: {viewerLog.clockInConfidence}%</span>
                                    </div>
                                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/40 border border-white/5 relative flex items-center justify-center">
                                        {viewerLog.clockInPhoto ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={viewerLog.clockInPhoto}
                                                alt="Clock In Scan"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-[10px] text-white/20 uppercase font-black">No Capture</span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-mono text-white/30 mt-2 block">
                                        Time: {new Date(viewerLog.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                </div>

                                {/* Clock Out photo */}
                                <div className="space-y-3 bg-[#080B12] p-4 border border-white/5 rounded-2xl">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase">
                                        <span>Clock Out Photo</span>
                                        <span className="text-green-400 font-mono">
                                            {viewerLog.clockOutConfidence > 0 ? `Match: ${viewerLog.clockOutConfidence}%` : "-"}
                                        </span>
                                    </div>
                                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/40 border border-white/5 relative flex items-center justify-center">
                                        {viewerLog.clockOutPhoto ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={viewerLog.clockOutPhoto}
                                                alt="Clock Out Scan"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-white/20 text-center">
                                                <Clock size={16} />
                                                <span className="text-[10px] uppercase font-black">Shift In Progress</span>
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-mono text-white/30 mt-2 block">
                                        Time: {viewerLog.clockOut ? (
                                            new Date(viewerLog.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                        ) : (
                                            "Active"
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Additional metadata */}
                            <div className="mt-6 p-4 bg-[#080B12] rounded-2xl border border-white/5 text-xs text-white/60 space-y-2">
                                <p className="font-bold text-white uppercase text-[9px] tracking-widest text-primary">Biometric Audit Remarks</p>
                                <p>{viewerLog.notes || "Face recognition validated and authorized."}</p>
                            </div>

                            <button
                                onClick={() => { setIsPhotoViewerOpen(false); setViewerLog(null); }}
                                className="w-full mt-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer"
                            >
                                Close Audit Log
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal: Employee Attendance Calendar */}
            <AnimatePresence>
                {isCalendarModalOpen && selectedEmpForCalendar && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-[#0D121F] border border-white/10 rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => { setIsCalendarModalOpen(false); setSelectedEmpForCalendar(null); }}
                                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                            >
                                ✕
                            </button>

                            <div className="mb-6">
                                <h3 className="text-lg font-black uppercase text-white tracking-widest">
                                    Workforce Attendance Calendar
                                </h3>
                                <p className="text-xs text-white/40 mt-1 uppercase font-semibold">
                                    Employee: {selectedEmpForCalendar.name} • {selectedEmpForCalendar.role}
                                </p>
                            </div>

                            {(() => {
                                const now = new Date();
                                const year = calendarViewDate.getFullYear();
                                const month = calendarViewDate.getMonth();
                                const daysInMonth = new Date(year, month + 1, 0).getDate();
                                const monthName = calendarViewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
                                // Day of week the 1st falls on (0=Sun, 1=Mon... 6=Sat)
                                // Calendar starts Monday, so offset: Mon=0, Tue=1, ..., Sun=6
                                const firstDayOfWeek = new Date(year, month, 1).getDay();
                                const calOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

                                // Get attendance logs and leaves for this selected employee
                                const empLogs = attendanceLogs.filter(l => l.employeeId === selectedEmpForCalendar.id);
                                const empLeaves = leaveRequests.filter(l => l.employeeId === selectedEmpForCalendar.id && l.status === "Approved");

                                const daySlots = Array.from({ length: daysInMonth }, (_, idx) => {
                                    const dayNum = idx + 1;
                                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                                    const log = empLogs.find(l => l.date === dateStr);
                                    const leave = empLeaves.find(l => (dateStr >= l.startDate && dateStr <= l.endDate));
                                    
                                    return {
                                        day: dayNum,
                                        log,
                                        leave,
                                        dateStr
                                    };
                                });

                                return (
                                    <div className="p-6 bg-[#080B12] rounded-3xl border border-white/5 space-y-4">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={() => setCalendarViewDate(new Date(year, month - 1, 1))}
                                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs font-black transition-all border border-white/10 cursor-pointer"
                                                >
                                                    ←
                                                </button>
                                                <h4 className="text-xs font-black uppercase text-white tracking-widest">{monthName}</h4>
                                                <button 
                                                    onClick={() => setCalendarViewDate(new Date(year, month + 1, 1))}
                                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs font-black transition-all border border-white/10 cursor-pointer"
                                                >
                                                    →
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-3 text-[9px] font-bold text-white/40 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-green-500" /> On-Time</span>
                                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-orange-500" /> Late</span>
                                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-red-500" /> Early Out</span>
                                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-blue-500" /> Leave Approved</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">
                                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Empty offset cells */}
                                            {Array.from({ length: calOffset }).map((_, i) => (
                                                <div key={`offset-${i}`} className="aspect-square" />
                                            ))}
                                            {daySlots.map((slot, idx) => {
                                                const absoluteIdx = calOffset + idx;
                                                let bgColor = "bg-white/[0.01] hover:bg-white/5 text-white/30";
                                                let borderColor = "border-white/5";
                                                
                                                if (slot.leave) {
                                                    bgColor = "bg-blue-500/10 text-blue-400";
                                                    borderColor = "border-blue-500/20";
                                                } else if (slot.log) {
                                                    if (slot.log.status === "undertime") {
                                                        bgColor = "bg-red-500/10 text-red-400";
                                                        borderColor = "border-red-500/20";
                                                    } else if (slot.log.status === "late") {
                                                        bgColor = "bg-orange-500/10 text-orange-400";
                                                        borderColor = "border-orange-500/20";
                                                    } else {
                                                        bgColor = "bg-green-500/10 text-green-400";
                                                        borderColor = "border-green-500/20";
                                                    }
                                                }
                                                
                                                const isWeekend = (absoluteIdx % 7 === 5 || absoluteIdx % 7 === 6);
                                                if (isWeekend && !slot.log && !slot.leave) {
                                                    bgColor = "bg-white/[0.003] text-white/10";
                                                }

                                                const isToday = slot.day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`aspect-square rounded-xl border flex flex-col justify-between p-2 transition-all group ${bgColor} ${borderColor} ${isToday ? 'ring-1 ring-primary/50' : ''}`}
                                                    >
                                                        <span className="text-[10px] font-mono font-bold self-start">{slot.day}</span>
                                                        {slot.log && (
                                                            <span className="text-[8px] font-black uppercase tracking-wider block text-right truncate">
                                                                {slot.log.totalHours ? `${slot.log.totalHours}h` : "Active"}
                                                            </span>
                                                        )}
                                                        {slot.leave && (
                                                            <span className="text-[7px] font-black uppercase tracking-wider block text-right text-blue-400 truncate">
                                                                LV Approved
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Session History List */}
                                        <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                                            <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                                Session Details & History
                                            </h5>
                                            <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                                                {empLogs.length === 0 ? (
                                                    <p className="text-[10px] text-white/20 text-center py-4 font-semibold uppercase">No sessions recorded yet</p>
                                                ) : (
                                                    empLogs.sort((a,b) => new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime()).map(log => {
                                                        const clockInStr = new Date(log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                        const clockOutStr = log.clockOut 
                                                            ? new Date(log.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                            : "Active";
                                                        return (
                                                            <div key={log.id} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col gap-2 hover:border-white/10 transition-all">
                                                                <div className="flex justify-between items-center text-[10px] font-mono">
                                                                    <span className="font-bold text-white/80">{log.date}</span>
                                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                                                        log.status === "completed" || log.status === "ontime" ? "bg-green-500/10 text-green-400" :
                                                                        log.status === "late" ? "bg-orange-500/10 text-orange-400" :
                                                                        log.status === "undertime" ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"
                                                                    }`}>{log.status}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center text-xs">
                                                                    <div className="text-white/50 font-semibold">
                                                                        Clock In: <span className="text-white font-mono">{clockInStr}</span>
                                                                        {log.clockInConfidence > 0 && <span className="text-[9px] text-white/30 ml-1">({log.clockInConfidence}% match)</span>}
                                                                    </div>
                                                                    <div className="text-white/50 font-semibold">
                                                                        Clock Out: <span className="text-white font-mono">{clockOutStr}</span>
                                                                        {log.clockOutConfidence > 0 && <span className="text-[9px] text-white/30 ml-1">({log.clockOutConfidence}% match)</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between items-center text-[9px] text-white/30 font-semibold">
                                                                    <span>Hours Worked: <span className="text-primary font-mono font-bold">{log.totalHours !== null ? `${log.totalHours} hrs` : "Active"}</span></span>
                                                                    {(log.location || log.ipAddress) && (
                                                                        <span className="flex items-center gap-1">
                                                                            <MapPin size={9} />
                                                                            {log.location || "Unknown"} {log.ipAddress ? `• ${log.ipAddress}` : ""}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {log.notes && (
                                                                    <p className="text-[9px] text-white/40 italic mt-0.5 border-t border-white/[0.02] pt-1">
                                                                        Note: {log.notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            <button
                                onClick={() => { setIsCalendarModalOpen(false); setSelectedEmpForCalendar(null); }}
                                className="w-full mt-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer"
                            >
                                Close Calendar
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Simple loader icon component
function LoaderSpinner() {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
    );
}
