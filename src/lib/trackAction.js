/**
 * Track user actions (button clicks, downloads, etc.)
 * 
 * @param {Object} params - Action tracking parameters
 * @param {string} params.actionType - Type of action (e.g., "live_demo", "github", "download_cv", "contact")
 * @param {string} [params.projectName] - Project name if applicable (e.g., "Amanat")
 * @param {string} [params.projectUrl] - Project URL if applicable
 * @param {string} [params.buttonLabel] - Button text/label for reference
 * 
 * @example
 * // Track Live Demo button click
 * trackAction({
 *   actionType: "live_demo",
 *   projectName: "Amanat (Tader-Amnat) - SaaS PWA",
 *   projectUrl: "https://amanat-app.com",
 *   buttonLabel: "Live Demo"
 * });
 * 
 * @example
 * // Track GitHub button click
 * trackAction({
 *   actionType: "github",
 *   projectName: "E-commerce Store",
 *   projectUrl: "https://github.com/username/repo",
 *   buttonLabel: "View Code"
 * });
 * 
 * @example
 * // Track Download CV
 * trackAction({
 *   actionType: "download_cv",
 *   buttonLabel: "Download CV"
 * });
 */
export async function trackAction({ 
    actionType, 
    projectName = null, 
    projectUrl = null, 
    buttonLabel = null 
}) {
    try {
        // Collect client-side data
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const referrer = document.referrer || "direct";
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const language = navigator.language;

        const payload = {
            actionType,
            projectName,
            projectUrl,
            buttonLabel,
            screenResolution: `${screenWidth}x${screenHeight}`,
            referrer,
            timezone,
            language
        };

        // Send to API (don't await - fire and forget)
        fetch('/api/trackAction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).catch(err => {
            // Silently fail - don't interrupt user experience
            console.warn('Failed to track action:', err);
        });
    } catch (error) {
        // Silently fail - don't interrupt user experience
        console.warn('Failed to track action:', error);
    }
}
