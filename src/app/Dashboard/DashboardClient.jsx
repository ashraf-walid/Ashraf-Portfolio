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
    LayoutGrid,
    MousePointerClick,
    TrendingUp,
    ExternalLink,
    Github,
    Mail,
    Award
} from "lucide-react";

export default function VisitorsDashboard() {
    const [visits, setVisits] = useState([]);
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState("visits"); // "visits" or "actions"
    const [viewMode, setViewMode] = useState("users"); // "users" or "timeline"

    const fetchData = () => {
        setIsRefreshing(true);
        
        Promise.all([
            fetch("/api/visits").then((res) => res.json()),
            fetch("/api/actions").then((res) => res.json())
        ])
            .then(([visitsData, actionsData]) => {
                setVisits(Array.isArray(visitsData) ? visitsData : []);
                setActions(Array.isArray(actionsData) ? actionsData : []);
                setLoading(false);
                setIsRefreshing(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
                setIsRefreshing(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calculate Visits Stats
    const visitsArray = Array.isArray(visits) ? visits : [];
    const uniqueVisitors = new Set(visitsArray.map(v => v.ip)).size;
    const uniqueCountries = new Set(visitsArray.map(v => v.geo?.country).filter(Boolean)).size;
    const mobileUsers = visitsArray.filter(v => v.device?.type === "mobile").length;
    const desktopUsers = visitsArray.filter(v => !v.device?.type || v.device?.type === "desktop").length;

    // Calculate Actions Stats
    const actionsArray = Array.isArray(actions) ? actions : [];
    const totalClicks = actionsArray.length;
    const uniqueClickers = new Set(actionsArray.map(a => a.ip)).size;
    const liveDemoClicks = actionsArray.filter(a => a.actionType === "live_demo").length;
    const githubClicks = actionsArray.filter(a => a.actionType === "github").length;
    const contactClicks = actionsArray.filter(a => a.actionType?.startsWith("contact_")).length;
    
    // Most clicked project
    const projectClicks = {};
    actionsArray.forEach(action => {
        if (action.projectName) {
            projectClicks[action.projectName] = (projectClicks[action.projectName] || 0) + 1;
        }
    });
    const mostClickedProject = Object.entries(projectClicks).sort((a, b) => b[1] - a[1])[0];

    // Group actions by user (IP address)
    const userActivities = {};
    actionsArray.forEach(action => {
        const userId = action.ip || "Unknown";
        if (!userActivities[userId]) {
            userActivities[userId] = {
                ip: action.ip,
                geo: action.geo,
                device: action.device,
                browser: action.browser,
                os: action.os,
                actions: [],
                firstSeen: action.timestamp,
                lastSeen: action.timestamp
            };
        }
        userActivities[userId].actions.push(action);
        
        // Update first and last seen
        if (new Date(action.timestamp) < new Date(userActivities[userId].firstSeen)) {
            userActivities[userId].firstSeen = action.timestamp;
        }
        if (new Date(action.timestamp) > new Date(userActivities[userId].lastSeen)) {
            userActivities[userId].lastSeen = action.timestamp;
        }
    });

    // Convert to array and sort by number of actions (most active first)
    const userActivityArray = Object.values(userActivities).sort((a, b) => 
        b.actions.length - a.actions.length
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggeredChildren: 0.1 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
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
                        <p className="text-gray-400 mt-1">Real-time visitor insights & button click analytics</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-white/10 rounded-xl transition-all duration-300 group"
                    >
                        <RefreshCw size={16} className={`text-blue-400 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
                        <span className="text-sm font-medium">Refresh Data</span>
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-2 bg-[#1e1e1e]/60 p-1.5 rounded-2xl border border-white/5 w-fit">
                    <button
                        onClick={() => setActiveTab("visits")}
                        className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                            activeTab === "visits"
                                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Users size={16} />
                            Visits
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("actions")}
                        className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                            activeTab === "actions"
                                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <MousePointerClick size={16} />
                            Button Clicks
                        </div>
                    </button>
                </div>

                {/* Stats Grid - Visits */}
                {activeTab === "visits" && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        <StatsCard
                            icon={<Users className="text-blue-400" />}
                            label="Total Visits"
                            value={visitsArray.length}
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
                            subValue={`${Math.round((mobileUsers / (visitsArray.length || 1)) * 100)}% of traffic`}
                        />
                        <StatsCard
                            icon={<Monitor className="text-orange-400" />}
                            label="Desktop Users"
                            value={desktopUsers}
                            subValue={`${Math.round((desktopUsers / (visitsArray.length || 1)) * 100)}% of traffic`}
                        />
                    </motion.div>
                )}

                {/* Stats Grid - Actions */}
                {activeTab === "actions" && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        <StatsCard
                            icon={<MousePointerClick className="text-blue-400" />}
                            label="Total Clicks"
                            value={totalClicks}
                            subValue={`${uniqueClickers} Unique Users`}
                        />
                        <StatsCard
                            icon={<ExternalLink className="text-emerald-400" />}
                            label="Live Demo Clicks"
                            value={liveDemoClicks}
                            subValue={`${Math.round((liveDemoClicks / (totalClicks || 1)) * 100)}% of clicks`}
                        />
                        <StatsCard
                            icon={<Github className="text-purple-400" />}
                            label="GitHub Clicks"
                            value={githubClicks}
                            subValue={`${Math.round((githubClicks / (totalClicks || 1)) * 100)}% of clicks`}
                        />
                        <StatsCard
                            icon={<Award className="text-orange-400" />}
                            label="Most Popular"
                            value={mostClickedProject ? mostClickedProject[1] : 0}
                            subValue={mostClickedProject ? mostClickedProject[0].slice(0, 20) : "N/A"}
                        />
                    </motion.div>
                )}

                {/* Visits Table */}
                {activeTab === "visits" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <LayoutGrid size={20} className="text-blue-400" />
                                Recent Visits
                            </h3>
                            <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                                Showing last {visitsArray.length} records
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
                                    {visitsArray.map((visit, index) => (
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
                )}

                {/* Actions Table */}
                {activeTab === "actions" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1e1e1e]/60 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 border-b border-white/5">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <TrendingUp size={20} className="text-purple-400" />
                                    Button Click Activity
                                </h3>
                                
                                {/* View Mode Toggle */}
                                <div className="flex gap-2 bg-[#0a0a0a] p-1 rounded-lg border border-white/5">
                                    <button
                                        onClick={() => setViewMode("users")}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                                            viewMode === "users"
                                                ? "bg-purple-500 text-white"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        By User
                                    </button>
                                    <button
                                        onClick={() => setViewMode("timeline")}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                                            viewMode === "timeline"
                                                ? "bg-purple-500 text-white"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        Timeline
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                {viewMode === "users" 
                                    ? `${userActivityArray.length} unique users • ${actionsArray.length} total clicks`
                                    : `Showing last ${actionsArray.length} clicks`
                                }
                            </div>
                        </div>

                        {/* User-Grouped View */}
                        {viewMode === "users" && (
                            <div className="divide-y divide-white/5">
                                {userActivityArray.map((user, userIndex) => (
                                    <UserActivityCard key={userIndex} user={user} />
                                ))}
                            </div>
                        )}

                        {/* Timeline View */}
                        {viewMode === "timeline" && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                            <th className="p-4 font-medium">Time</th>
                                            <th className="p-4 font-medium">Action</th>
                                            <th className="p-4 font-medium">Project</th>
                                            <th className="p-4 font-medium">Location</th>
                                            <th className="p-4 font-medium">Device</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {actionsArray.map((action, index) => (
                                            <tr key={index} className="hover:bg-white/[0.02] transition-colors duration-150">
                                                <td className="p-4 text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={14} className="text-gray-500" />
                                                        {new Date(action.timestamp).toLocaleString(undefined, {
                                                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <ActionBadge actionType={action.actionType} buttonLabel={action.buttonLabel} />
                                                </td>
                                                <td className="p-4">
                                                    {action.projectName ? (
                                                        <div className="max-w-[250px]">
                                                            <p className="text-gray-200 font-medium truncate" title={action.projectName}>
                                                                {action.projectName}
                                                            </p>
                                                            {action.projectUrl && (
                                                                <a 
                                                                    href={action.projectUrl} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-1"
                                                                >
                                                                    <ExternalLink size={10} />
                                                                    Visit
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-600 italic text-sm">N/A</span>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-5 text-center text-lg leading-none">
                                                            {getFlagEmoji(action.geo?.country)}
                                                        </span>
                                                        <div>
                                                            <p className="text-gray-200 font-medium">{action.geo?.country || "Unknown"}</p>
                                                            <p className="text-xs text-gray-500">{action.geo?.city || action.ip}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${action.device?.type === 'mobile'
                                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                        }`}>
                                                        {action.device?.type === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                                                        {action.device?.type || "Desktop"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function UserActivityCard({ user }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Sort actions by timestamp (most recent first)
    const sortedActions = [...user.actions].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Calculate user engagement stats
    const liveDemoClicks = user.actions.filter(a => a.actionType === "live_demo").length;
    const githubClicks = user.actions.filter(a => a.actionType === "github").length;
    const contactActions = user.actions.filter(a => a.actionType?.startsWith("contact_")).length;
    
    // Get unique projects clicked
    const uniqueProjects = new Set(
        user.actions.filter(a => a.projectName).map(a => a.projectName)
    );

    return (
        <div className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors">
            {/* User Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                {/* User Info */}
                <div className="flex items-start gap-3 flex-1">
                    {/* User Avatar/Flag */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-2xl border border-white/10">
                        {getFlagEmoji(user.geo?.country)}
                    </div>
                    
                    {/* User Details */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-gray-200 font-semibold">
                                {user.geo?.city || "Unknown City"}, {user.geo?.country || "Unknown"}
                            </h4>
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                                {user.actions.length} {user.actions.length === 1 ? 'action' : 'actions'}
                            </span>
                        </div>
                        
                        {/* Device & Browser */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                {user.device?.type === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                                {user.device?.type || "Desktop"}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span>{user.browser?.name || "Unknown Browser"}</span>
                            <span className="text-gray-600">•</span>
                            <span>{user.os?.name || "Unknown OS"}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-xs text-gray-500 font-mono">{user.ip}</span>
                        </div>
                        
                        {/* Activity Summary */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {liveDemoClicks > 0 && (
                                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full">
                                    {liveDemoClicks} Live Demo
                                </span>
                            )}
                            {githubClicks > 0 && (
                                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-full">
                                    {githubClicks} GitHub
                                </span>
                            )}
                            {contactActions > 0 && (
                                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">
                                    {contactActions} Contact
                                </span>
                            )}
                            {uniqueProjects.size > 0 && (
                                <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded-full">
                                    {uniqueProjects.size} {uniqueProjects.size === 1 ? 'Project' : 'Projects'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-300 transition-all"
                >
                    {isExpanded ? "Hide Details" : "View Details"}
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </motion.div>
                </button>
            </div>

            {/* Expanded Actions List */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/5"
                >
                    <h5 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <Clock size={14} className="text-purple-400" />
                        Activity Timeline
                    </h5>
                    
                    <div className="space-y-3">
                        {sortedActions.map((action, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                {/* Timeline Dot */}
                                <div className="mt-1">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                </div>
                                
                                {/* Action Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <ActionBadge actionType={action.actionType} buttonLabel={action.buttonLabel} />
                                        <span className="text-xs text-gray-500">
                                            {new Date(action.timestamp).toLocaleString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    
                                    {action.projectName && (
                                        <div className="mt-1">
                                            <p className="text-sm text-gray-300 truncate" title={action.projectName}>
                                                {action.projectName}
                                            </p>
                                            {action.projectUrl && (
                                                <a 
                                                    href={action.projectUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-1"
                                                >
                                                    <ExternalLink size={10} />
                                                    {action.projectUrl.length > 40 
                                                        ? action.projectUrl.substring(0, 40) + '...' 
                                                        : action.projectUrl
                                                    }
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* User Session Info */}
                    <div className="mt-4 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                            <div>
                                <span className="text-gray-500">First Seen:</span>{" "}
                                <span className="text-gray-300">
                                    {new Date(user.firstSeen).toLocaleString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">Last Seen:</span>{" "}
                                <span className="text-gray-300">
                                    {new Date(user.lastSeen).toLocaleString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            {user.actions[0]?.timezone && (
                                <div>
                                    <span className="text-gray-500">Timezone:</span>{" "}
                                    <span className="text-gray-300">{user.actions[0].timezone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function ActionBadge({ actionType, buttonLabel }) {
    const getActionStyle = (type) => {
        if (type === "live_demo") {
            return {
                bg: "bg-emerald-500/10",
                text: "text-emerald-400",
                border: "border-emerald-500/20",
                icon: <ExternalLink size={12} />
            };
        } else if (type === "github" || type === "github_profile") {
            return {
                bg: "bg-purple-500/10",
                text: "text-purple-400",
                border: "border-purple-500/20",
                icon: <Github size={12} />
            };
        } else if (type?.startsWith("contact_") || type === "contact_form") {
            return {
                bg: "bg-blue-500/10",
                text: "text-blue-400",
                border: "border-blue-500/20",
                icon: <Mail size={12} />
            };
        } else if (type === "admin_panel") {
            return {
                bg: "bg-orange-500/10",
                text: "text-orange-400",
                border: "border-orange-500/20",
                icon: <Monitor size={12} />
            };
        } else if (type?.startsWith("social_")) {
            return {
                bg: "bg-pink-500/10",
                text: "text-pink-400",
                border: "border-pink-500/20",
                icon: <TrendingUp size={12} />
            };
        } else {
            return {
                bg: "bg-gray-500/10",
                text: "text-gray-400",
                border: "border-gray-500/20",
                icon: <MousePointerClick size={12} />
            };
        }
    };

    const style = getActionStyle(actionType);
    const displayText = buttonLabel || actionType?.replace(/_/g, " ").toUpperCase() || "Unknown";

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
            {style.icon}
            <span className="capitalize">{displayText}</span>
        </span>
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
    if (!countryCode || typeof countryCode !== 'string') return "🌍";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
