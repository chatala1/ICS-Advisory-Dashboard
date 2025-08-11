// ICS Advisory Dashboard JavaScript
class ICSAdvisoryDashboard {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.itemsPerPage = 50;
        this.charts = {};
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.updateStatistics();
            this.populateDropdowns();
            this.createCharts();
            this.updateTable();
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Failed to load data. Please try refreshing the page.');
        }
    }

    async loadData() {
        try {
            console.log('Loading ICS Advisory data...');
            const response = await fetch(`${window.location.origin}${window.location.pathname.includes('github.io') ? '/ICS-Advisory-Dashboard' : ''}/ICS-CERT_ADV/CISA_ICS_ADV_Master.csv`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            
            // Parse CSV
            this.data = this.parseCSV(csvText);
            this.filteredData = [...this.data];
            console.log(`Loaded ${this.data.length} advisory records`);
        } catch (error) {
            console.error('Error loading CSV data:', error);
            // Fallback to sample data if real data fails
            await this.loadSampleData();
        }
    }

    async loadSampleData() {
        try {
            console.log('Loading sample data...');
            const response = await fetch(`${window.location.origin}${window.location.pathname.includes('github.io') ? '/ICS-Advisory-Dashboard' : ''}/data/sample_advisories.csv`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            this.data = this.parseCSV(csvText);
            this.filteredData = [...this.data];
            console.log(`Loaded ${this.data.length} sample records (fallback)`);
        } catch (error) {
            console.error('Error loading sample data:', error);
            this.data = [];
            this.filteredData = [];
        }
    }

    parseCSV(csv) {
        try {
            const lines = csv.trim().split('\n');
            if (lines.length === 0) return [];
            
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const data = [];
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = this.parseCSVLine(lines[i]);
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });
                    // Only add rows with valid advisory numbers
                    if (row['ICS-CERT_Number'] || row['Advisory ID']) {
                        data.push(row);
                    }
                }
            }
            
            return data;
        } catch (error) {
            console.error('CSV parsing error:', error);
            return [];
        }
    }

    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim().replace(/"/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim().replace(/"/g, ''));
        return values;
    }

    setupEventListeners() {
        // Severity filter
        const severityFilter = document.getElementById('severityFilter');
        if (severityFilter) {
            severityFilter.addEventListener('change', () => this.applyFilters());
        }

        // Vendor filter
        const vendorFilter = document.getElementById('vendorFilter');
        if (vendorFilter) {
            vendorFilter.addEventListener('change', () => this.applyFilters());
        }
    }

    updateStatistics() {
        const totalAdvisories = this.filteredData.length;
        
        // Count by severity
        const severityCounts = {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0
        };

        this.filteredData.forEach(row => {
            const severity = (row.Severity || row.CVSS_Severity || '').toLowerCase();
            if (severity.includes('critical')) severityCounts.critical++;
            else if (severity.includes('high')) severityCounts.high++;
            else if (severity.includes('medium')) severityCounts.medium++;
            else if (severity.includes('low')) severityCounts.low++;
        });

        // Update DOM elements
        const criticalEl = document.querySelector('.text-danger .h4');
        const highEl = document.querySelector('.text-warning .h4');
        const mediumEl = document.querySelector('.text-info .h4');

        if (criticalEl) criticalEl.textContent = severityCounts.critical;
        if (highEl) highEl.textContent = severityCounts.high;
        if (mediumEl) mediumEl.textContent = severityCounts.medium;
    }

    populateDropdowns() {
        // Populate vendor dropdown
        const vendors = new Set();
        this.data.forEach(row => {
            const vendor = row.Vendor || '';
            if (vendor && vendor.trim()) {
                vendor.split(',').forEach(v => {
                    vendors.add(v.trim());
                });
            }
        });

        const vendorSelect = document.getElementById('vendorFilter');
        if (vendorSelect && vendors.size > 0) {
            // Clear existing options except "All Vendors"
            const allOption = vendorSelect.options[0];
            vendorSelect.innerHTML = '';
            vendorSelect.appendChild(allOption);
            
            Array.from(vendors).sort().forEach(vendor => {
                const option = document.createElement('option');
                option.value = vendor;
                option.textContent = vendor;
                vendorSelect.appendChild(option);
            });
        }
    }

    applyFilters() {
        const severityFilter = document.getElementById('severityFilter')?.value || '';
        const vendorFilter = document.getElementById('vendorFilter')?.value || '';

        this.filteredData = this.data.filter(row => {
            // Severity filter
            if (severityFilter && severityFilter !== 'all') {
                const severity = (row.Severity || row.CVSS_Severity || '').toLowerCase();
                if (!severity.includes(severityFilter)) {
                    return false;
                }
            }

            // Vendor filter
            if (vendorFilter && vendorFilter !== 'all') {
                const vendor = row.Vendor || '';
                if (!vendor.toLowerCase().includes(vendorFilter.toLowerCase())) {
                    return false;
                }
            }

            return true;
        });

        this.currentPage = 1;
        this.updateStatistics();
        this.updateCharts();
        this.updateTable();
    }

    createCharts() {
        this.createSeverityChart();
        this.createTimelineChart();
        this.createVendorChart();
    }

    createSeverityChart() {
        const canvas = document.getElementById('severityChart');
        if (!canvas || typeof Chart === 'undefined') {
            console.log('Chart.js not available or canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        // Count by severity
        const severityCounts = {
            'Critical': 0,
            'High': 0,
            'Medium': 0,
            'Low': 0
        };

        this.filteredData.forEach(row => {
            const severity = (row.Severity || row.CVSS_Severity || '').toLowerCase();
            if (severity.includes('critical')) severityCounts['Critical']++;
            else if (severity.includes('high')) severityCounts['High']++;
            else if (severity.includes('medium')) severityCounts['Medium']++;
            else if (severity.includes('low')) severityCounts['Low']++;
        });

        this.charts.severity = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(severityCounts),
                datasets: [{
                    data: Object.values(severityCounts),
                    backgroundColor: [
                        '#dc3545', // Critical - Red
                        '#fd7e14', // High - Orange  
                        '#ffc107', // Medium - Yellow
                        '#28a745'  // Low - Green
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createTimelineChart() {
        const canvas = document.getElementById('timelineChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');
        
        // Group by month
        const monthCounts = {};
        this.filteredData.forEach(row => {
            const dateStr = row['Publication Date'] || row['Original_Release_Date'] || '';
            if (dateStr) {
                const date = new Date(dateStr);
                if (!isNaN(date.getTime())) {
                    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
                }
            }
        });

        const sortedMonths = Object.keys(monthCounts).sort().slice(-12); // Last 12 months
        const counts = sortedMonths.map(month => monthCounts[month] || 0);

        this.charts.timeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedMonths.map(month => {
                    const [year, monthNum] = month.split('-');
                    return new Date(year, monthNum - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                }),
                datasets: [{
                    label: 'Advisories Published',
                    data: counts,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createVendorChart() {
        const canvas = document.getElementById('vendorChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');
        
        // Count by vendor
        const vendorCounts = {};
        this.filteredData.forEach(row => {
            const vendor = row.Vendor || '';
            if (vendor && vendor.trim()) {
                vendor.split(',').forEach(v => {
                    const cleanVendor = v.trim();
                    vendorCounts[cleanVendor] = (vendorCounts[cleanVendor] || 0) + 1;
                });
            }
        });

        // Get top 10 vendors
        const sortedVendors = Object.entries(vendorCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        this.charts.vendor = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedVendors.map(([vendor]) => vendor),
                datasets: [{
                    label: 'Advisories',
                    data: sortedVendors.map(([,count]) => count),
                    backgroundColor: '#007bff',
                    borderColor: '#0056b3',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateCharts() {
        // Update all charts with filtered data
        if (this.charts.severity) {
            this.charts.severity.destroy();
            this.createSeverityChart();
        }
        if (this.charts.timeline) {
            this.charts.timeline.destroy();
            this.createTimelineChart();
        }
        if (this.charts.vendor) {
            this.charts.vendor.destroy();
            this.createVendorChart();
        }
    }

    updateTable() {
        const tableBody = document.querySelector('#advisoryTable tbody');
        if (!tableBody) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (pageData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No data matches the current filters.</td></tr>';
        } else {
            tableBody.innerHTML = pageData.map(row => `
                <tr>
                    <td><code>${this.escapeHtml(row['ICS-CERT_Number'] || row['Advisory ID'] || '')}</code></td>
                    <td>${this.escapeHtml(row['ICS-CERT_Advisory_Title'] || row['Title'] || '')}</td>
                    <td>${this.escapeHtml(row.Vendor || '')}</td>
                    <td>
                        <span class="badge ${this.getSeverityBadgeClass(row.Severity || row.CVSS_Severity || '')}">
                            ${this.escapeHtml(row.Severity || row.CVSS_Severity || 'Unknown')}
                        </span>
                    </td>
                    <td>${this.escapeHtml(row['CVSS Score'] || row.Cumulative_CVSS || '')}</td>
                    <td>${this.escapeHtml(row['Publication Date'] || row.Original_Release_Date || '')}</td>
                    <td>
                        <a href="#" class="btn btn-sm btn-outline-primary" data-bs-toggle="tooltip" title="View Details">
                            <i class="fas fa-eye"></i>
                        </a>
                    </td>
                </tr>
            `).join('');
        }
    }

    getSeverityBadgeClass(severity) {
        const sev = severity.toLowerCase();
        if (sev.includes('critical')) return 'bg-danger';
        if (sev.includes('high')) return 'bg-warning';
        if (sev.includes('medium')) return 'bg-info';
        if (sev.includes('low')) return 'bg-success';
        return 'bg-secondary';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        const tableBody = document.querySelector('#advisoryTable tbody');
        if (tableBody) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">${message}</td></tr>`;
        }
        console.error(message);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing ICS Advisory Dashboard...');
    new ICSAdvisoryDashboard();
});