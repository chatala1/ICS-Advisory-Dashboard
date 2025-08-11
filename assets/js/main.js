// Main JavaScript for ICS Advisory Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons (Swift UI-style icons)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize tooltips (with error handling for missing Bootstrap)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Initialize sample charts if on dashboards page
    if (document.getElementById('severityChart')) {
        initializeSeverityChart();
    }
    
    if (document.getElementById('timelineChart')) {
        initializeTimelineChart();
    }
    
    if (document.getElementById('vendorChart')) {
        initializeVendorChart();
    }
    
    // Add fallback styling if Bootstrap CSS didn't load
    checkAndApplyFallbacks();
});

// Check if external resources loaded and apply fallbacks if needed
function checkAndApplyFallbacks() {
    // Check if Bootstrap CSS loaded by testing for a Bootstrap class
    var testElement = document.createElement('div');
    testElement.className = 'container';
    testElement.style.display = 'none';
    document.body.appendChild(testElement);
    
    var hasBootstrap = window.getComputedStyle(testElement).maxWidth !== 'none';
    document.body.removeChild(testElement);
    
    if (!hasBootstrap) {
        console.warn('Bootstrap CSS not loaded, using fallback styles');
        // Add a class to indicate fallback mode
        document.body.classList.add('fallback-mode');
    }
}

// Sample chart functions (with better error handling and placeholders)
function initializeSeverityChart() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, showing placeholder');
        showChartPlaceholder('severityChart', 'Vulnerabilities by Severity', 'Chart requires external resources to display');
        return;
    }
    
    const ctx = document.getElementById('severityChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                data: [25, 45, 30, 15],
                backgroundColor: [
                    '#e53e3e',
                    '#d69e2e',
                    '#3182ce',
                    '#38a169'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Vulnerabilities by Severity'
                }
            }
        }
    });
}

function initializeTimelineChart() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, showing placeholder');
        showChartPlaceholder('timelineChart', 'Advisory Timeline', 'Chart requires external resources to display');
        return;
    }
    
    const ctx = document.getElementById('timelineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Advisories',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: '#3182ce',
                backgroundColor: 'rgba(49, 130, 206, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Advisory Timeline (2024)'
                }
            }
        }
    });
}

function initializeVendorChart() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, showing placeholder');
        showChartPlaceholder('vendorChart', 'Top Affected Vendors', 'Chart requires external resources to display');
        return;
    }
    
    const ctx = document.getElementById('vendorChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Siemens', 'Schneider Electric', 'Rockwell', 'GE', 'Honeywell'],
            datasets: [{
                label: 'Number of Advisories',
                data: [35, 28, 22, 18, 15],
                backgroundColor: '#3182ce'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Top Affected Vendors'
                }
            }
        }
    });
}

// Show chart placeholder when Chart.js is not available
function showChartPlaceholder(canvasId, title, message) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    // Create placeholder div
    const placeholder = document.createElement('div');
    placeholder.className = 'chart-placeholder';
    placeholder.innerHTML = `
        <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">${title}</div>
            <div style="font-size: 0.9rem;">${message}</div>
            <div style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.7;">
                Data: Critical: 25, High: 45, Medium: 30, Low: 15
            </div>
        </div>
    `;
    
    // Replace canvas with placeholder
    canvas.parentNode.replaceChild(placeholder, canvas);
}

// CSV download functionality
function downloadCSV(data, filename) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function convertToCSV(data) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [header, ...rows].join('\n');
}