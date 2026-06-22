"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Clock, 
    Lock, 
    Mail, 
    Camera, 
    Calendar, 
    User, 
    CheckCircle2, 
    AlertTriangle, 
    Activity, 
    LogOut, 
    FileText, 
    Sparkles, 
    Check, 
    Zap, 
    ArrowRight,
    Loader2,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { 
    getEmployees, 
    saveEmployee,
    getAttendanceLogs, 
    saveAttendanceLog, 
    getLeaveRequests, 
    saveLeaveRequest,
    Employee,
    AttendanceLog,
    LeaveRequest
} from "@/lib/workforceStore";
import { verifyFaceMatch, isMockBiometricPhoto } from "@/lib/biometrics";

const MOCK_FACE_PHOTO_IN = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMjAnIGhlaWdodD0nMjQwJyB2aWV3Qm94PScwIDAgMzIwIDI0MCc+PHJlY3Qgd2lkdGg9JzMyMCcgaGVpZ2h0PScyNDAnIGZpbGw9JyMwRDEyMUYnLz48Y2lyY2xlIGN4PScxNjAnIGN5PScxMTAnIHI9JzUwJyBmaWxsPSdub25lJyBzdHJva2U9JyM0YWNlZTQnIHN0cm9rZS13aWR0aD0nMycvPjxwYXRoIGQ9J00xMjAgMTgwIFFxMTYwIDE1MCAyMDAgMTgwJyBzdHJva2U9JyM0YWNlZTQnIHN0cm9rZS13aWR0aD0nMycgZmlsbD0nbm9uZScvPjx0ZXh0IHg9JzE2MCcgeT0nMjE1JyBmaWxsPScjNGFjZWU0JyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEwJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5CSU9NRVRSSUMgQ0xPQ0sgSU4gU0NBTjwvdGV4dD48L3N2Zz4=";
const MOCK_FACE_PHOTO_OUT = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMjAnIGhlaWdodD0nMjQwJyB2aWV3Qm94PScwIDAgMzIwIDI0MCc+PHJlY3Qgd2lkdGg9JzMyMCcgaGVpZ2h0PScyNDAnIGZpbGw9JyMwRDEyMUYnLz48Y2lyY2xlIGN4PScxNjAnIGN5PScxMTAnIHI9JzUwJyBmaWxsPSdub25lJyBzdHJva2U9JyMyMmM1NWUnIHN0cm9rZS13aWR0aD0nMycvPjxwYXRoIGQ9J00xMjAgMTgwIFFxMTYwIDE2MCAyMDAgMTgwJyBzdHJva2U9JyMyMmM1NWUnIHN0cm9rZS13aWR0aD0nMycgZmlsbD0nbm9uZScvPjx0ZXh0IHg9JzE2MCcgeT0nMjE1JyBmaWxsPScjMjJjNTVlJyBmb250LWZhbWlseT0nbW9ub3NwYWNlJyBmb250LXNpemU9JzEwJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5CSU9NRVRSSUMgQ0xPQ0sgT1VUIFNDQU48L3RleHQ+PC9zdmc+";

// Synth Audio Helper using Web Audio API
const playSynthSound = (type: "scan" | "success" | "click" | "fail") => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        if (type === "click") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = 600;
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } else if (type === "scan") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === "success") {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
            
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            
            osc1.start();
            osc1.stop(ctx.currentTime + 0.2);
            osc2.start(ctx.currentTime + 0.1);
            osc2.stop(ctx.currentTime + 0.4);
        } else if (type === "fail") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        }
    } catch (e) {
        console.warn("Audio error", e);
    }
};

export default function EmployeePortal() {
    // Auth & Navigation States
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [activeTab, setActiveTab] = useState<"dashboard" | "leaves" | "activity">("dashboard");

    // Dynamic clock / timer state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeLog, setActiveLog] = useState<AttendanceLog | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Camera and Scan Verification States
    const [isScanOpen, setIsScanOpen] = useState(false);
    const [scanAction, setScanAction] = useState<"in" | "out" | "enroll">("in");
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(false);
    const [scanStep, setScanStep] = useState<"init" | "scanning" | "analyzing" | "completed" | "failed">("init");
    const [scanProgress, setScanProgress] = useState(0);
    const [scanConfidence, setScanConfidence] = useState(0);
    const [capturedFrame, setCapturedFrame] = useState<string | null>(null);

    // Advanced sliders and logs settings
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [leaveType, setLeaveType] = useState<"Casual" | "Sick" | "Earned">("Casual");
    const [shiftNote, setShiftNote] = useState("");

    const brightnessRef = useRef(100);
    const contrastRef = useRef(100);

    useEffect(() => {
        brightnessRef.current = brightness;
    }, [brightness]);

    useEffect(() => {
        contrastRef.current = contrast;
    }, [contrast]);

    // Leave Form State
    const [leaveStart, setLeaveStart] = useState("");
    const [leaveEnd, setLeaveEnd] = useState("");
    const [leaveReason, setLeaveReason] = useState("");
    const [leaveLoading, setLeaveLoading] = useState(false);
    const [leaveSuccess, setLeaveSuccess] = useState(false);

    // List states for local views
    const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

    // Webcam HTML element references
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const mediaStream = useRef<MediaStream | null>(null);

    // Load initial portal settings
    const loadPortalData = async () => {
        const emps = await getEmployees();
        setEmployees(emps);

        // Rehydrate session from localStorage if present
        if (typeof window !== "undefined") {
            const cachedEmpId = localStorage.getItem("tellora_employee_session");
            if (cachedEmpId) {
                const match = emps.find(e => e.id === cachedEmpId);
                if (match && match.status === "Active") {
                    setCurrentEmployee(match);
                    await refreshLogsAndLeaves(match.id);
                } else {
                    localStorage.removeItem("tellora_employee_session");
                }
            }
        }
    };

    useEffect(() => {
        loadPortalData();

        // Standard digital clock ticking
        const clockTimer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(clockTimer);
            stopCamera();
        };
    }, []);

    // Ticking timer for active shift duration
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (activeLog && !activeLog.clockOut) {
            const calculateElapsed = () => {
                const startTime = new Date(activeLog.clockIn).getTime();
                const now = new Date().getTime();
                const diff = Math.max(0, Math.floor((now - startTime) / 1000));
                setElapsedSeconds(diff);
            };
            calculateElapsed();
            interval = setInterval(calculateElapsed, 1000);
        } else {
            setElapsedSeconds(0);
        }
        return () => clearInterval(interval);
    }, [activeLog]);

    // Fetch lists relevant to the active employee
    const refreshLogsAndLeaves = async (empId: string) => {
        const logs = await getAttendanceLogs();
        const empLogs = logs.filter(l => l.employeeId === empId).sort((a, b) => new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime());
        setAttendanceLogs(empLogs);

        const leaves = await getLeaveRequests();
        const empLeaves = leaves.filter(l => l.employeeId === empId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLeaveRequests(empLeaves);

        // Find active log for today (where clockOut is null)
        const active = empLogs.find(l => l.clockOut === null);
        setActiveLog(active || null);
    };

    // Employee Authentication
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setIsLoggingIn(true);

        setTimeout(async () => {
            // Hot-reload employees list from database to ensure fresh data
            const freshEmps = await getEmployees();
            setEmployees(freshEmps);

            const match = freshEmps.find(
                e => e.email.toLowerCase() === email.trim().toLowerCase() && e.password === password
            );

            if (!match) {
                setLoginError("Invalid credentials. Access denied.");
                setIsLoggingIn(false);
                return;
            }

            if (match.status === "Suspended") {
                setLoginError("Your account has been suspended. Please contact Admin.");
                setIsLoggingIn(false);
                return;
            }

            // Success login
            setCurrentEmployee(match);
            if (typeof window !== "undefined") {
                localStorage.setItem("tellora_employee_session", match.id);
            }
            await refreshLogsAndLeaves(match.id);
            setIsLoggingIn(false);
            playSynthSound("success");
        }, 800);
    };

    // Employee Sign Out
    const handleLogout = () => {
        playSynthSound("click");
        if (typeof window !== "undefined") {
            localStorage.removeItem("tellora_employee_session");
        }
        setCurrentEmployee(null);
        setActiveLog(null);
        setEmail("");
        setPassword("");
    };

    // Camera management
    const startCamera = async () => {
        setCameraError(false);
        setIsCameraActive(true);
        setScanStep("init");
        setScanProgress(0);
        setCapturedFrame(null);

        try {
            const constraints = {
                video: { width: 640, height: 480, facingMode: "user" }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            mediaStream.current = stream;
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current) {
                        videoRef.current.play();
                        startFaceLandmarkSimulation();
                    }
                };
            }
        } catch (err) {
            console.error("Camera access error:", err);
            setCameraError(true);
            setIsCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        if (mediaStream.current) {
            mediaStream.current.getTracks().forEach(track => track.stop());
            mediaStream.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    // Drawing simulated facial scanning grids and landmarks
    const startFaceLandmarkSimulation = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scanWidth = 240;
        const scanHeight = 240;

        const pointsCount = 18;
        const basePoints = Array.from({ length: pointsCount }, (_, i) => {
            const angle = (i / pointsCount) * Math.PI * 2;
            const radiusX = 60 + Math.random() * 20;
            const radiusY = 70 + Math.random() * 20;
            return {
                x: 160 + Math.cos(angle) * radiusX,
                y: 120 + Math.sin(angle) * radiusY,
                ox: Math.cos(angle) * radiusX,
                oy: Math.sin(angle) * radiusY,
                phase: Math.random() * Math.PI
            };
        });

        const drawLoop = () => {
            if (video.paused || video.ended) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);
            ctx.filter = `brightness(${brightnessRef.current}%) contrast(${contrastRef.current}%)`;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            // Render grayscale 32x32 preview dynamically
            const previewCanvas = document.getElementById("biometric-preview-canvas") as HTMLCanvasElement;
            if (previewCanvas) {
                const pCtx = previewCanvas.getContext("2d");
                if (pCtx) {
                    pCtx.clearRect(0, 0, 32, 32);
                    pCtx.drawImage(canvas, 0, 0, 32, 32);
                    const imgData = pCtx.getImageData(0, 0, 32, 32);
                    const d = imgData.data;
                    for (let i = 0; i < d.length; i += 4) {
                        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
                        d[i] = gray;
                        d[i + 1] = gray;
                        d[i + 2] = gray;
                    }
                    pCtx.putImageData(imgData, 0, 0);
                }
            }

            const time = Date.now() * 0.003;
            const startX = (canvas.width - scanWidth) / 2;
            const startY = (canvas.height - scanHeight) / 2;
            
            ctx.strokeStyle = "rgba(74, 192, 228, 0.4)";
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, scanWidth, scanHeight);

            const sweepY = startY + (Math.sin(time) * 0.5 + 0.5) * scanHeight;
            ctx.strokeStyle = "rgba(74, 192, 228, 0.8)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(startX, sweepY);
            ctx.lineTo(startX + scanWidth, sweepY);
            ctx.stroke();

            const grad = ctx.createLinearGradient(0, sweepY - 15, 0, sweepY + 1);
            grad.addColorStop(0, "rgba(74, 192, 228, 0)");
            grad.addColorStop(1, "rgba(74, 192, 228, 0.15)");
            ctx.fillStyle = grad;
            ctx.fillRect(startX, sweepY - 15, scanWidth, 15);

            ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
            ctx.strokeStyle = "rgba(34, 197, 94, 0.25)";
            ctx.lineWidth = 1;

            const currentPoints = basePoints.map((p) => {
                const shiftX = Math.sin(time + p.phase) * 3;
                const shiftY = Math.cos(time + p.phase) * 3;
                return {
                    x: 160 + p.ox + shiftX,
                    y: 110 + p.oy + shiftY
                };
            });

            ctx.beginPath();
            for (let i = 0; i < currentPoints.length; i++) {
                const p = currentPoints[i];
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                
                if (i % 3 === 0) {
                    ctx.moveTo(160 + Math.sin(time) * 1.5, 115);
                    ctx.lineTo(p.x, p.y);
                }
                
                const nextPt = currentPoints[(i + 1) % currentPoints.length];
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(nextPt.x, nextPt.y);
            }
            ctx.stroke();
            ctx.fill();

            ctx.strokeStyle = "rgba(74, 192, 228, 0.8)";
            ctx.beginPath();
            ctx.arc(130, 95, 6, 0, Math.PI * 2);
            ctx.moveTo(124, 95); ctx.lineTo(136, 95);
            ctx.moveTo(130, 89); ctx.lineTo(130, 101);
            ctx.arc(190, 95, 6, 0, Math.PI * 2);
            ctx.moveTo(184, 95); ctx.lineTo(196, 95);
            ctx.moveTo(190, 89); ctx.lineTo(190, 101);
            ctx.stroke();

            ctx.fillStyle = "rgba(74, 192, 228, 0.7)";
            ctx.font = "8px monospace";
            ctx.fillText(`P_EYE_L: [130, 95]`, startX + 10, startY + 20);
            ctx.fillText(`P_EYE_R: [190, 95]`, startX + 10, startY + 32);
            ctx.fillText(`NOSE_C: [160, 115]`, startX + 10, startY + 44);
            ctx.fillText(`MATCH_RT: 99.4%`, startX + 10, startY + 56);

            animationFrameId.current = requestAnimationFrame(drawLoop);
        };

        animationFrameId.current = requestAnimationFrame(drawLoop);
    };

    // Execute the biometric scans step logic
    const handleTriggerScan = (action: "in" | "out" | "enroll") => {
        playSynthSound("click");
        setScanAction(action);
        setIsScanOpen(true);
        startCamera();
    };

    // Triggered scanning animation
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isScanOpen && isCameraActive && scanStep === "init") {
            setScanStep("scanning");
            setScanProgress(0);
            playSynthSound("scan");

            const interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setScanStep("analyzing");
                        
                        setTimeout(async () => {
                            // Take raw snapshot frame from canvas
                            let currentFrameUrl = "";
                            if (canvasRef.current) {
                                currentFrameUrl = canvasRef.current.toDataURL("image/jpeg");
                                setCapturedFrame(currentFrameUrl);
                            }

                            if (scanAction === "enroll") {
                                // Enrollment always succeeds if a face is visible
                                setScanConfidence(100);
                                setScanStep("completed");
                                playSynthSound("success");
                            } else {
                                // Real Grayscale comparison comparison!
                                if (currentEmployee && currentEmployee.enrolledFace) {
                                    // If enrolled face is a mock SVG (from bypass enrollment), auto-succeed
                                    if (isMockBiometricPhoto(currentEmployee.enrolledFace)) {
                                        setScanConfidence(100);
                                        setScanStep("completed");
                                        playSynthSound("success");
                                    } else {
                                        const matchScore = await verifyFaceMatch(currentEmployee.enrolledFace, currentFrameUrl);
                                        setScanConfidence(matchScore);
                                        
                                        if (matchScore >= 75) {
                                            setScanStep("completed");
                                            playSynthSound("success");
                                        } else {
                                            setScanStep("failed");
                                            playSynthSound("fail");
                                        }
                                    }
                                } else {
                                    setScanStep("failed");
                                    playSynthSound("fail");
                                }
                            }
                        }, 1200);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isScanOpen, isCameraActive, scanStep]);

    // Handle clock-in or clock-out submission
    const handleConfirmScan = async () => {
        if (!currentEmployee) return;

        const photoToSave = capturedFrame || (scanAction === "in" ? MOCK_FACE_PHOTO_IN : MOCK_FACE_PHOTO_OUT);
        const now = new Date();

        if (scanAction === "enroll") {
            // Save enrollment base64 photo to employee record
            const updatedEmployee: Employee = {
                ...currentEmployee,
                enrolledFace: photoToSave
            };
            
            await saveEmployee(updatedEmployee);
            setCurrentEmployee(updatedEmployee);
            stopCamera();
            setIsScanOpen(false);
            await loadPortalData();
            playSynthSound("success");
            return;
        }

        if (scanAction === "in") {
            const checkInHour = now.getHours();
            const checkInMinute = now.getMinutes();
            
            const [shiftH, shiftM] = currentEmployee.shiftStart.split(":").map(Number);
            const isLate = checkInHour > shiftH || (checkInHour === shiftH && checkInMinute > 15);

            // Network simulator details
            const cities = ["Delhi, Shahdara, India", "Mumbai, Maharashtra, India", "Bangalore, Karnataka, India", "Gurugram, Haryana, India", "Noida, Uttar Pradesh, India"];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

            const newLog: AttendanceLog = {
                id: `ATT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                employeeId: currentEmployee.id,
                employeeName: currentEmployee.name,
                employeeRole: currentEmployee.role,
                employeeDept: currentEmployee.department,
                date: now.toISOString().split("T")[0],
                clockIn: now.toISOString(),
                clockInPhoto: photoToSave,
                clockInVerified: true,
                clockInConfidence: scanConfidence,
                clockOut: null,
                clockOutPhoto: null,
                clockOutVerified: false,
                clockOutConfidence: 0,
                totalHours: null,
                status: isLate ? "late" : "active",
                notes: isLate ? `Late clock-in by ${checkInHour * 60 + checkInMinute - (shiftH * 60 + shiftM)} mins.` : "Shift started on time.",
                ipAddress: randomIp,
                location: randomCity,
                progressUpdates: []
            };

            await saveAttendanceLog(newLog);
        } else {
            if (!activeLog) return;

            const clockInTime = new Date(activeLog.clockIn).getTime();
            const clockOutTime = now.getTime();
            const workedHours = Number(((clockOutTime - clockInTime) / 3600000).toFixed(2));

            const isUndertime = workedHours < currentEmployee.shiftHours;

            const updatedLog: AttendanceLog = {
                ...activeLog,
                clockOut: now.toISOString(),
                clockOutPhoto: photoToSave,
                clockOutVerified: true,
                clockOutConfidence: scanConfidence,
                totalHours: workedHours,
                status: isUndertime ? "undertime" : "completed",
                notes: isUndertime 
                    ? `Left early. Worked ${workedHours} hrs instead of ${currentEmployee.shiftHours} hrs.` 
                    : `Shift completed successfully. Total: ${workedHours} hrs.`
            };

            await saveAttendanceLog(updatedLog);
        }

        stopCamera();
        setIsScanOpen(false);
        await refreshLogsAndLeaves(currentEmployee.id);
        playSynthSound("success");
    };

    // Camera scan cancel / bypass
    const handleCloseScan = () => {
        stopCamera();
        setIsScanOpen(false);
    };

    // Mock bypass bypass (only triggers mock signature photo in development when webcam is absent)
    const handleBypassScan = () => {
        setCameraError(false);
        setIsCameraActive(true);
        setScanStep("scanning");
        setScanProgress(0);
        
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setScanStep("analyzing");
                    
                    setTimeout(async () => {
                        const mockPhoto = scanAction === "in" ? MOCK_FACE_PHOTO_IN : MOCK_FACE_PHOTO_OUT;
                        setCapturedFrame(mockPhoto);

                        if (scanAction === "enroll") {
                            setScanConfidence(100);
                            setScanStep("completed");
                            playSynthSound("success");
                        } else {
                            if (currentEmployee && currentEmployee.enrolledFace) {
                                // If enrolled face is also a mock SVG (from a previous bypass enrollment),
                                // auto-succeed with 100% confidence to avoid SVG vs JPEG mismatch
                                const isEnrolledMock = currentEmployee.enrolledFace.startsWith("data:image/svg+xml");
                                if (isEnrolledMock) {
                                    setScanConfidence(100);
                                    setScanStep("completed");
                                    playSynthSound("success");
                                } else {
                                    // Real enrolled face - do grayscale comparison against mock
                                    const matchScore = await verifyFaceMatch(currentEmployee.enrolledFace, mockPhoto);
                                    setScanConfidence(matchScore);
                                    
                                    if (matchScore >= 75) {
                                        setScanStep("completed");
                                        playSynthSound("success");
                                    } else {
                                        setScanStep("failed");
                                        playSynthSound("fail");
                                    }
                                }
                            } else {
                                setScanStep("failed");
                                playSynthSound("fail");
                            }
                        }
                    }, 1200);
                    return 100;
                }
                return prev + 20;
            });
        }, 150);
    };

    // Submit Leave Request
    const handleRequestLeave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentEmployee || !leaveStart || !leaveEnd || !leaveReason) return;
        setLeaveLoading(true);
        setLeaveSuccess(false);

        const key = leaveType === "Casual" ? "cl" : leaveType === "Sick" ? "sl" : "el";
        const balance = currentEmployee.leaveBalance?.[key] ?? 0;
        if (balance <= 0) {
            alert(`Insufficient balance for ${leaveType} Leave request.`);
            setLeaveLoading(false);
            return;
        }

        const newRequest: LeaveRequest = {
            id: `LEV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            employeeId: currentEmployee.id,
            employeeName: currentEmployee.name,
            startDate: leaveStart,
            endDate: leaveEnd,
            reason: leaveReason,
            status: "Pending",
            createdAt: new Date().toISOString(),
            leaveType: leaveType
        };

        setTimeout(async () => {
            await saveLeaveRequest(newRequest);
            await refreshLogsAndLeaves(currentEmployee.id);
            setLeaveLoading(false);
            setLeaveSuccess(true);
            setLeaveStart("");
            setLeaveEnd("");
            setLeaveReason("");
            playSynthSound("success");
        }, 800);
    };

    // Post Shift note/update
    const handlePostShiftNote = async () => {
        if (!activeLog || !shiftNote.trim() || !currentEmployee) return;
        const note = {
            time: new Date().toISOString(),
            text: shiftNote.trim()
        };
        const updatedLog: AttendanceLog = {
            ...activeLog,
            progressUpdates: [...(activeLog.progressUpdates || []), note]
        };
        await saveAttendanceLog(updatedLog);
        setShiftNote("");
        await refreshLogsAndLeaves(currentEmployee.id);
        playSynthSound("success");
    };


    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    };

    const renderTimerDetails = () => {
        if (!currentEmployee) return null;
        const targetSeconds = currentEmployee.shiftHours * 3600;
        const remainingSeconds = Math.max(0, targetSeconds - elapsedSeconds);
        const percent = Math.min(100, (elapsedSeconds / targetSeconds) * 100);

        const h = Math.floor(elapsedSeconds / 3600);
        const m = Math.floor((elapsedSeconds % 3600) / 60);
        const s = elapsedSeconds % 60;

        const rh = Math.floor(remainingSeconds / 3600);
        const rm = Math.floor((remainingSeconds % 3600) / 60);
        const rs = remainingSeconds % 60;

        return (
            <div className="flex flex-col items-center gap-6 py-4">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="rgba(255, 255, 255, 0.03)"
                            strokeWidth="10"
                            fill="transparent"
                        />
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="#4ac0e4"
                            strokeWidth="10"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 80}
                            animate={{ strokeDashoffset: (2 * Math.PI * 80) * (1 - percent / 100) }}
                            transition={{ duration: 0.5, ease: "linear" }}
                            strokeLinecap="round"
                        />
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Elapsed Time</span>
                        <span className="text-3xl font-black font-mono tracking-tight text-white mt-1">
                            {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] font-bold text-primary mt-2 uppercase tracking-widest">
                            {percent.toFixed(1)}% Complete
                        </span>
                    </div>
                </div>

                <div className="text-center bg-white/[0.02] border border-white/5 p-4 px-6 rounded-2xl w-full max-w-sm">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Time Remaining (Target 9H)</span>
                    <p className="text-lg font-bold font-mono text-white mt-1">
                        {rh > 0 ? `${rh}h ` : ""}{rm}m {rs}s
                    </p>
                </div>
            </div>
        );
    };

    if (!currentEmployee) {
        return (
            <div className="min-h-screen bg-[#080B12] text-white flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/5 rounded-full blur-[150px]" />
                    <div className="absolute inset-0 grid-overlay opacity-10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="text-center mb-8">
                        <Link href="/admin/login" className="inline-flex items-center gap-2 mb-6 p-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-semibold text-white/60 hover:text-white">
                            <ArrowRight size={14} className="rotate-180" />
                            Back to Admin Portal
                        </Link>
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl mx-auto flex items-center justify-center mb-5 shadow-xl shadow-primary/20"
                        >
                            <Clock size={32} className="text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-black tracking-tight text-white mb-2">WORKFORCE HUB</h1>
                        <p className="text-white/40 font-bold text-xs uppercase tracking-widest">Employee Biometric Clock-in</p>
                    </div>

                    <div className="bg-[#0D121F]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                    Work Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="yourname@telloramedia.online"
                                        disabled={isLoggingIn}
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                    Access Code / Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter portal key"
                                        disabled={isLoggingIn}
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {loginError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                                >
                                    <AlertTriangle size={14} className="text-red-400 shrink-0" />
                                    <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">
                                        {loginError}
                                    </p>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoggingIn || !email || !password}
                                className="w-full h-13 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 group hover:shadow-[0_6px_20px_rgba(74,192,228,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                            >
                                {isLoggingIn ? (
                                    <Loader2 size={16} className="animate-spin text-white" />
                                ) : (
                                    <>
                                        ACCESS HUB{" "}
                                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Clock-in requires webcam face verification
                    </div>
                </motion.div>
            </div>
        );
    }

    // Checking biometric status
    const hasEnrolledFace = currentEmployee.enrolledFace !== null && currentEmployee.enrolledFace !== undefined;

    return (
        <div className="min-h-screen bg-[#080B12] text-white flex flex-col relative overflow-x-hidden">
            <header className="border-b border-white/5 bg-[#0D121F]/50 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Clock size={18} className="text-primary" />
                        </div>
                        <div>
                            <span className="text-sm font-black tracking-tight uppercase">Workforce Portal</span>
                            <span className="hidden sm:inline-block text-[8px] bg-primary/20 text-primary font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest ml-2">Employee</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-white">{currentEmployee.name.toUpperCase()}</p>
                                <p className="text-[9px] font-bold text-primary/60 uppercase tracking-wider">{currentEmployee.role}</p>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark p-[1px]">
                                <div className="w-full h-full rounded-xl bg-[#080B12] flex items-center justify-center font-black text-xs text-primary">
                                    {currentEmployee.name.split(" ").map(w=>w[0]).join("")}
                                </div>
                            </div>
                        </div>

                        <div className="h-6 w-px bg-white/5" />

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                            <LogOut size={14} />
                            <span className="hidden md:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0D121F]/40 border border-white/5 p-6 rounded-3xl gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            Hello, {currentEmployee.name.split(" ")[0]}! <Sparkles size={16} className="text-primary animate-pulse" />
                        </h2>
                        <p className="text-xs text-white/50 mt-1 uppercase tracking-wider font-semibold">
                            {currentEmployee.department} Department • ID: {currentEmployee.id}
                        </p>
                    </div>

                    <div className="text-left md:text-right font-mono">
                        <p className="text-2xl font-bold text-white tracking-tight">{formatTime(currentDate)}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{formatDate(currentDate)}</p>
                    </div>
                </div>

                {/* Sub tabs navigation */}
                <div className="flex border-b border-white/5 pb-2">
                    {[
                        { id: "dashboard", label: "My Shift Status", icon: Activity },
                        { id: "leaves", label: "Request Leave", icon: Calendar },
                        { id: "activity", label: "Attendance Logs", icon: FileText }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { playSynthSound("click"); setActiveTab(tab.id as any); }}
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

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {/* Tab 1: Shift Dashboard */}
                        {activeTab === "dashboard" && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="grid md:grid-cols-3 gap-8"
                            >
                                {/* Dashboard Details */}
                                <div className="md:col-span-2 bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                                    {!hasEnrolledFace ? (
                                        // Enrollment Mode Interface
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                                                    <ShieldCheck size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black tracking-tight text-white uppercase">Biometric Registration Required</h3>
                                                    <p className="text-xs text-white/40">You must register your face reference scan before tracking shift hours.</p>
                                                </div>
                                            </div>

                                            <div className="h-px bg-white/5 my-4" />

                                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                                                <p className="text-xs text-white/70 leading-relaxed font-medium">
                                                    To prevent buddy-punching and secure timesheet logs, our workforce hub uses normalized client-side grayscale facial matching. Please sit in a well-lit area and align your camera frame to enroll.
                                                </p>
                                                <div className="flex items-center gap-3 text-orange-400 bg-orange-400/5 p-4 rounded-xl border border-orange-400/10">
                                                    <AlertTriangle size={16} className="shrink-0" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest leading-normal">
                                                        No biometric signature enrolled yet.
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <button
                                                    onClick={() => handleTriggerScan("enroll")}
                                                    className="w-full sm:w-auto px-8 h-13 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_6px_25px_rgba(74,192,228,0.3)] transition-all cursor-pointer"
                                                >
                                                    <Camera size={16} />
                                                    ENROLL BIOMETRIC PROFILE
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Standard Shift Tracking Interface
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                    <Zap size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black tracking-tight text-white uppercase">Workforce Attendance tracking</h3>
                                                    <p className="text-xs text-white/40">Clock-in daily with facial verification to start your work.</p>
                                                </div>
                                            </div>

                                            <div className="h-px bg-white/5 my-6" />

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="bg-[#080B12] p-5 rounded-2xl border border-white/5">
                                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block">Daily Shift Requirement</span>
                                                    <span className="text-xl font-bold text-white mt-1 block">9.0 Hours Shift</span>
                                                    <span className="text-[9px] font-bold text-white/20 mt-1 block uppercase">Standard Schedule: {currentEmployee.shiftStart} - {currentEmployee.shiftEnd}</span>
                                                </div>

                                                <div className="bg-[#080B12] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block">Current Shift Status</span>
                                                        <span className="flex items-center gap-2 mt-2">
                                                            <span className={`w-2 h-2 rounded-full ${
                                                                activeLog ? "bg-green-500 animate-pulse" : "bg-white/20"
                                                            }`} />
                                                            <span className={`text-base font-black uppercase ${
                                                                activeLog ? "text-green-400" : "text-white/40"
                                                            }`}>
                                                                {activeLog ? "On Shift" : "Not Logged In"}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {activeLog && (
                                                        <span className="text-[9px] text-white/30 font-mono mt-2 block">
                                                            Clocked In at: {new Date(activeLog.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                                                <div className="text-xs text-white/40 font-semibold text-center sm:text-left">
                                                    Biometric comparisons are matched against your enrolled face reference.
                                                </div>
                                                
                                                {!activeLog ? (
                                                    <button
                                                        onClick={() => handleTriggerScan("in")}
                                                        className="w-full sm:w-auto px-10 h-13 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_6px_25px_rgba(74,192,228,0.3)] transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
                                                    >
                                                        <Camera size={16} />
                                                        CLOCK IN SHIFT
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleTriggerScan("out")}
                                                        className="w-full sm:w-auto px-10 h-13 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_6px_25px_rgba(239,68,68,0.3)] transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
                                                    >
                                                        <Camera size={16} />
                                                        CLOCK OUT SHIFT
                                                    </button>
                                                )}
                                            </div>

                                            {activeLog && (
                                                <div className="mt-6 p-5 bg-[#080B12] rounded-2xl border border-white/5 space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-[10px] font-black uppercase text-primary tracking-widest">Active Shift Progress Updates</h4>
                                                        <span className="text-[9px] text-white/30">Visible to administrators</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Post a status update note (e.g. Completed header refactoring)"
                                                            value={shiftNote}
                                                            onChange={(e) => setShiftNote(e.target.value)}
                                                            className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-primary/40 transition-all placeholder:text-white/20"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handlePostShiftNote}
                                                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                                                        >
                                                            Post
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                                                        {(!activeLog.progressUpdates || activeLog.progressUpdates.length === 0) ? (
                                                            <p className="text-[10px] text-white/20 italic">No updates posted for this shift yet.</p>
                                                        ) : (
                                                            activeLog.progressUpdates.map((upd, idx) => (
                                                                <div key={idx} className="flex justify-between items-start gap-3 p-2.5 bg-white/[0.01] border border-white/5 rounded-lg text-xs">
                                                                    <p className="text-white/60">{upd.text}</p>
                                                                    <span className="text-[9px] text-white/30 shrink-0 font-mono">
                                                                        {new Date(upd.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Right Side Timer / Status Ring */}
                                <div className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center">
                                    {activeLog ? (
                                        renderTimerDetails()
                                    ) : (
                                        <div className="text-center space-y-4 py-8">
                                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/20">
                                                <Clock size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-black text-white/80 uppercase">No Active Shift</h4>
                                                <p className="text-xs text-white/30 max-w-[200px] mx-auto mt-2 leading-relaxed">
                                                    {hasEnrolledFace 
                                                        ? "Clock in above to begin tracking your standard 9-hour work day."
                                                        : "Enroll your biometrics to activate your daily tracking ring."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Tab 2: Leaves */}
                        {activeTab === "leaves" && (
                            <motion.div
                                key="leaves"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="grid md:grid-cols-3 gap-8"
                            >
                                <div className="md:col-span-2 bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black tracking-tight text-white uppercase">Request Leave Absence</h3>
                                            <p className="text-xs text-white/40">Submit a leave request for administrative approval.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleRequestLeave} className="space-y-6">
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={leaveStart}
                                                    onChange={(e) => setLeaveStart(e.target.value)}
                                                    required
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm [color-scheme:dark]"
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={leaveEnd}
                                                    onChange={(e) => setLeaveEnd(e.target.value)}
                                                    required
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm [color-scheme:dark]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                                    Leave Category Type
                                                </label>
                                                <select
                                                    value={leaveType}
                                                    onChange={(e) => setLeaveType(e.target.value as any)}
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-[#0D121F] transition-all text-sm [color-scheme:dark]"
                                                >
                                                    <option value="Casual">Casual (CL)</option>
                                                    <option value="Sick">Sick (SL)</option>
                                                    <option value="Earned">Earned (EL)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                                                Reason for Leave
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={leaveReason}
                                                onChange={(e) => setLeaveReason(e.target.value)}
                                                placeholder="Please specify medical, personal trip details, etc."
                                                required
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-4 text-white font-medium outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm resize-none"
                                            />
                                        </div>

                                        {leaveSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl"
                                            >
                                                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                                                <p className="text-green-400 text-[10px] font-black uppercase tracking-widest">
                                                    Leave request submitted successfully!
                                                </p>
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={leaveLoading || !leaveStart || !leaveEnd || !leaveReason}
                                            className="px-8 h-13 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_6px_20px_rgba(74,192,228,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                                        >
                                            {leaveLoading ? (
                                                <Loader2 size={16} className="animate-spin text-white" />
                                            ) : (
                                                <>SUBMIT REQUEST</>
                                            )}
                                        </button>
                                    </form>
                                </div>

                                <div className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl flex flex-col">
                                    {/* Circular gauges showing remaining leave balances */}
                                    <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-white/5">
                                        {[
                                            { label: "Casual", key: "cl", max: 12, color: "#4ac0e4" },
                                            { label: "Sick", key: "sl", max: 10, color: "#f97316" },
                                            { label: "Earned", key: "el", max: 15, color: "#a855f7" }
                                        ].map(item => {
                                            const bal = currentEmployee.leaveBalance?.[item.key as "cl" | "sl" | "el"] ?? item.max;
                                            const pct = Math.max(0, Math.min(100, (bal / item.max) * 100));
                                            const radius = 22;
                                            const circumference = 2 * Math.PI * radius;
                                            const offset = circumference * (1 - pct / 100);

                                            return (
                                                <div key={item.label} className="flex flex-col items-center gap-1.5 p-2 bg-[#080B12] rounded-xl border border-white/5">
                                                    <div className="relative w-12 h-12 flex items-center justify-center">
                                                        <svg className="w-full h-full transform -rotate-90">
                                                            <circle
                                                                cx="24"
                                                                cy="24"
                                                                r={radius}
                                                                stroke="rgba(255, 255, 255, 0.03)"
                                                                strokeWidth="3"
                                                                fill="transparent"
                                                            />
                                                            <circle
                                                                cx="24"
                                                                cy="24"
                                                                r={radius}
                                                                stroke={item.color}
                                                                strokeWidth="3"
                                                                fill="transparent"
                                                                strokeDasharray={circumference}
                                                                strokeDashoffset={offset}
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        <span className="absolute text-[10px] font-black text-white">{bal}</span>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <h4 className="text-sm font-black uppercase text-white tracking-widest mb-6 pb-2 border-b border-white/5">Leave History</h4>
                                    
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 scrollbar-hide">
                                        {leaveRequests.length === 0 ? (
                                            <p className="text-xs text-white/20 text-center py-8 font-semibold uppercase">No requests logged</p>
                                        ) : (
                                            leaveRequests.map(req => (
                                                <div key={req.id} className="p-4 bg-[#080B12] border border-white/5 rounded-2xl space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] text-white/50 font-bold">{req.startDate} to {req.endDate}</span>
                                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                                            req.status === "Approved" ? "bg-green-500/10 text-green-400" :
                                                            req.status === "Rejected" ? "bg-red-500/10 text-red-400" :
                                                            "bg-orange-500/10 text-orange-400"
                                                        }`}>
                                                            {req.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-white/40 font-medium leading-relaxed truncate">{req.reason}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab 3: Attendance History */}
                        {activeTab === "activity" && (
                            <motion.div
                                key="activity"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="bg-[#0D121F]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black tracking-tight text-white uppercase">My Attendance Logs</h3>
                                        <p className="text-xs text-white/40">Review your historical logs, shift durations, and biometrics.</p>
                                    </div>
                                </div>

                                {/* Dynamic Portal Attendance Calendar */}
                                {(() => {
                                    const now = new Date();
                                    const year = now.getFullYear();
                                    const month = now.getMonth();
                                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                                    const monthName = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
                                    // Calendar starts Monday, so offset: Mon=0, Tue=1, ..., Sun=6
                                    const firstDayOfWeek = new Date(year, month, 1).getDay();
                                    const calOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
                                    
                                    const daySlots = Array.from({ length: daysInMonth }, (_, idx) => {
                                        const dayNum = idx + 1;
                                        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                                        const log = attendanceLogs.find(l => l.date === dateStr);
                                        const leave = leaveRequests.find(l => (dateStr >= l.startDate && dateStr <= l.endDate) && l.status === "Approved");
                                        
                                        return {
                                            day: dayNum,
                                            log,
                                            leave,
                                            dateStr
                                        };
                                    });

                                    return (
                                        <div className="p-6 bg-[#080B12] rounded-3xl border border-white/5 space-y-4 mb-8">
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                <h4 className="text-xs font-black uppercase text-white tracking-widest">{monthName} Attendance Calendar</h4>
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
                                        </div>
                                    );
                                })()}

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5 text-[9px] text-white/40 font-bold uppercase tracking-widest">
                                                <th className="pb-4">Date</th>
                                                <th className="pb-4">Clock In</th>
                                                <th className="pb-4">Clock Out</th>
                                                <th className="pb-4 text-center">Hours Worked</th>
                                                <th className="pb-4 text-center">Status</th>
                                                <th className="pb-4">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {attendanceLogs.map((log) => (
                                                <tr key={log.id} className="text-xs group hover:bg-white/[0.01] transition-colors">
                                                    <td className="py-4 font-bold text-white/80">{log.date}</td>
                                                    <td className="py-4 font-mono text-white/50">
                                                        {new Date(log.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                    </td>
                                                    <td className="py-4 font-mono text-white/50">
                                                        {log.clockOut ? (
                                                            new Date(log.clockOut).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
                                                    <td className="py-4 text-white/40 text-[11px] leading-normal">{log.notes || "-"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {attendanceLogs.length === 0 && (
                                        <p className="text-xs text-white/20 text-center py-10 font-semibold uppercase">No logs recorded yet</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Webcam Face Scanning Overlay Modal */}
            <AnimatePresence>
                {isScanOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0D121F] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative"
                        >
                            {scanStep !== "scanning" && scanStep !== "analyzing" && (
                                <button
                                    onClick={handleCloseScan}
                                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}

                            <h3 className="text-lg font-black uppercase text-white tracking-widest text-center mb-6">
                                {scanAction === "enroll" ? "Biometric Face Registration" : "Biometric Verification Scan"}
                            </h3>

                            <div className="relative aspect-video w-full bg-[#080B12] rounded-2xl overflow-hidden border border-white/5">
                                <video
                                    ref={videoRef}
                                    className={`w-full h-full object-cover hidden`}
                                    playsInline
                                    muted
                                />
                                <canvas
                                    ref={canvasRef}
                                    width={640}
                                    height={480}
                                    className="w-full h-full object-cover rounded-2xl"
                                />

                                {isCameraActive && (scanStep === "init" || scanStep === "scanning") && (
                                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0D121F]/90 backdrop-blur border border-white/10 rounded-2xl space-y-3 z-10">
                                        <div className="flex justify-between items-center text-[9px] font-black uppercase text-primary tracking-wider">
                                            <span>Biometric Calibration Controls</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[8px] font-semibold text-white/50">
                                                    <span>Brightness</span>
                                                    <span className="font-mono">{brightness}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="50"
                                                    max="180"
                                                    value={brightness}
                                                    onChange={(e) => setBrightness(Number(e.target.value))}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[8px] font-semibold text-white/50">
                                                    <span>Contrast</span>
                                                    <span className="font-mono">{contrast}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="50"
                                                    max="180"
                                                    value={contrast}
                                                    onChange={(e) => setContrast(Number(e.target.value))}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 pt-1.5 border-t border-white/5">
                                            <div className="w-8 h-8 rounded border border-white/5 overflow-hidden shrink-0 bg-black flex items-center justify-center">
                                                <canvas id="biometric-preview-canvas" width="32" height="32" className="w-full h-full object-contain filter grayscale image-render-pixelated" />
                                            </div>
                                            <p className="text-[8px] text-white/30 lowercase leading-normal">
                                                Grayscale 32x32 signature mapping. Calibrate sliders to eliminate dark shadow spots before capturing.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {cameraError && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4 bg-black/60">
                                        <AlertTriangle size={36} className="text-orange-400" />
                                        <div>
                                            <h5 className="text-sm font-bold text-white uppercase">Camera Access Required</h5>
                                            <p className="text-[10px] text-white/40 mt-1 max-w-[280px]">
                                                Please enable browser webcam permission, or utilize the developer override below for testing.
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleBypassScan}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-wider text-primary cursor-pointer transition-all"
                                        >
                                            Bypass with Test Biometrics
                                        </button>
                                    </div>
                                )}

                                {scanStep === "scanning" && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-black/20 pointer-events-none">
                                        <div className="w-full flex justify-between items-center">
                                            <span className="text-[8px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">SCANNING FRAME...</span>
                                            <span className="text-[8px] text-white/50 font-mono font-bold">{scanProgress}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden border border-white/5">
                                            <div className="bg-primary h-full transition-all duration-100" style={{ width: `${scanProgress}%` }} />
                                        </div>
                                    </div>
                                )}

                                {scanStep === "analyzing" && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 pointer-events-none gap-3">
                                        <Loader2 size={24} className="animate-spin text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                                            {scanAction === "enroll" ? "Saving biometric signature..." : "Comparing face landmarks..."}
                                        </span>
                                    </div>
                                )}

                                {scanStep === "completed" && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080B12]/90 gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                                            <Check size={24} />
                                        </div>
                                        <div className="text-center">
                                            <h5 className="text-sm font-black text-green-400 uppercase tracking-widest">
                                                {scanAction === "enroll" ? "Biometrics Enrolled" : "Face Matches Enrolled Signature"}
                                            </h5>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Confidence score: {scanConfidence}% Match
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {scanStep === "failed" && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080B12]/95 gap-4">
                                        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                                            <AlertTriangle size={24} className="text-red-400" />
                                        </div>
                                        <div className="text-center px-6">
                                            <h5 className="text-sm font-black text-red-400 uppercase tracking-widest">Biometric Verification Failed</h5>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Match confidence: {scanConfidence}% (Required: 75%)
                                            </p>
                                            <p className="text-[9px] text-white/30 mt-2 lowercase max-w-[280px] mx-auto leading-normal">
                                                Face signature does not match your enrolled profile. Please align your face in normal lighting and try again.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex gap-4">
                                {scanStep === "failed" && (
                                    <button
                                        onClick={startCamera}
                                        className="flex-1 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest transition-all text-primary cursor-pointer"
                                    >
                                        Retry Scan
                                    </button>
                                )}

                                {scanStep !== "completed" && scanStep !== "failed" && (
                                    <button
                                        onClick={handleCloseScan}
                                        disabled={scanStep === "scanning" || scanStep === "analyzing"}
                                        className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest transition-all text-white/40 hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                )}

                                {scanStep === "completed" && (
                                    <button
                                        onClick={handleConfirmScan}
                                        className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_6px_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                                    >
                                        {scanAction === "enroll" ? "Authorize Enrollment" : `Authorize Clock ${scanAction === "in" ? "In" : "Out"}`}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
