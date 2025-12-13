"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Globe,
    Smartphone,
    Clock,
    Monitor,
    MapPin,
    RefreshCw,
    Search,
    LayoutGrid
} from "lucide-react";

export default function VisitorsDashboard() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchVisits = () => {
        setIsRefreshing(true);
        fetch("/api/visits")
            .then((res) => res.json())
            .then((data) => {
                setVisits(data);
                setLoading(false);
                setIsRefreshing(false);
            })
            .catch(() => {
                setLoading(false);
                setIsRefreshing(false);
            });
    };

    useEffect(() => {
        fetchVisits();
    }, []);

    // Calculate Stats
    const uniqueVisitors = new Set(visits.map(v => v.ip)).size;
    const uniqueCountries = new Set(visits.map(v => v.geo?.country).filter(Boolean)).size;
    const mobileUsers = visits.filter(v => v.device?.type === "mobile").length;
    const desktopUsers = visits.filter(v => !v.device?.type || v.device?.type === "desktop").length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggeredChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <refreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                    <p className="text-gray-400 animate-pulse">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] text-gray-200 p-6 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Analytics Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1">Real-time visitor insights & performance</p>
                    </div>
                    <button
                        onClick={fetchVisits}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-white/10 rounded-xl transition-all duration-300 group"
                    >
                        <RefreshCw size={16} className={`text-blue-400 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
                        <span className="text-sm font-medium">Refresh Data</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <StatsCard
                        icon={<Users className="text-blue-400" />}
                        label="Total Visits"
                        value={visits.length}
                        subValue={`${uniqueVisitors} Unique IPs`}
                    />
                    <StatsCard
                        icon={<Globe className="text-emerald-400" />}
                        label="Countries"
                        value={uniqueCountries}
                        subValue="Global Reach"
                    />
                    <StatsCard
                        icon={<Smartphone className="text-purple-400" />}
                        label="Mobile Users"
                        value={mobileUsers}
                        subValue={`${Math.round((mobileUsers / (visits.length || 1)) * 100)}% of traffic`}
                    />
                    <StatsCard
                        icon={<Monitor className="text-orange-400" />}
                        label="Desktop Users"
                        value={desktopUsers}
                        subValue={`${Math.round((desktopUsers / (visits.length || 1)) * 100)}% of traffic`}
                    />
                </motion.div>

                {/* Data Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <LayoutGrid size={20} className="text-blue-400" />
                            Recent Activity
                        </h3>
                        <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                            Showing last {visits.length} records
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-medium">Time</th>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium">System</th>
                                    <th className="p-4 font-medium">Device</th>
                                    <th className="p-4 font-medium">Referrer</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {visits.map((visit, index) => (
                                    <tr key={index} className="hover:bg-white/[0.02] transition-colors duration-150">
                                        <td className="p-4 text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-gray-500" />
                                                {new Date(visit.timestamp).toLocaleString(undefined, {
                                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-5 text-center text-lg leading-none">
                                                    {getFlagEmoji(visit.geo?.country)}
                                                </span>
                                                <div>
                                                    <p className="text-gray-200 font-medium">{visit.geo?.country || "Unknown"}</p>
                                                    <p className="text-xs text-gray-500">{visit.geo?.city || visit.ip}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            <div className="flex flex-col">
                                                <span className="text-gray-300">{visit.browser?.name || "Unknown"}</span>
                                                <span className="text-xs">{visit.os?.name} {visit.os?.version}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${visit.device?.type === 'mobile'
                                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {visit.device?.type === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                                                {visit.device?.type || "Desktop"}
                                            </span>
                                            {visit.screenResolution && (
                                                <p className="text-xs text-gray-500 mt-1 pl-1">{visit.screenResolution}</p>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-400 max-w-[200px] truncate" title={visit.referrer}>
                                            {visit.referrer === "direct" || !visit.referrer ? (
                                                <span className="text-gray-600 italic">Direct</span>
                                            ) : (
                                                <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                                                    <Search size={12} />
                                                    {new URL(visit.referrer).hostname.replace('www.', '')}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function StatsCard({ icon, label, value, subValue }) {
    return (
        <div className="bg-[#1e1e1e]/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                    Active
                </span>
            </div>
            <div>
                <p className="text-gray-400 text-sm font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
                <p className="text-xs text-gray-500 mt-1">{subValue}</p>
            </div>
        </div>
    );
}

// Helper to convert country code to flag emoji
function getFlagEmoji(countryCode) {
    if (!countryCode) return "🌍";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
