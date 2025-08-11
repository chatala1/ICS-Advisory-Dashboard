# ICS Advisory Dashboard

An open-source initiative to visualize DHS CISA ICS Advisories as interactive dashboards and provide downloadable CSV datasets for vulnerability analysis.

🌐 **Live Site**: [https://chatala1.github.io/ICS-Advisory-Dashboard](https://chatala1.github.io/ICS-Advisory-Dashboard)

## Features

- 📊 **Interactive Dashboards** - Real-time visualization of CISA ICS advisory data through charts and analytics
- 📁 **Downloadable Datasets** - Access to live CSV data for offline analysis
- 🔄 **Automatic Data Updates** - Daily synchronization with latest CISA ICS advisories
- 🔗 **API Integration** - Programmatic access to advisory data
- 🏭 **Vendor Resources** - Comprehensive directory of ICS vendors
- 🛠️ **Security Tools** - Curated collection of ICS security tools
- 📚 **Training Resources** - Educational materials and community links
- 📈 **Live Statistics** - Real-time counts and trend analysis
- 🎯 **Advanced Filtering** - Filter by severity, vendor, date range, and more

## Quick Start

This site is built with Jekyll and deployed on GitHub Pages.

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/chatala1/ICS-Advisory-Dashboard.git
   cd ICS-Advisory-Dashboard
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```

4. **View in browser**
   Open [http://localhost:4000](http://localhost:4000)

### GitHub Pages Deployment

This site automatically deploys to GitHub Pages when changes are pushed to the main branch.

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select branch: `main` (or your preferred branch)
   - Set folder: `/ (root)`

2. **Configure custom domain** (optional)
   - Add a `CNAME` file with your domain
   - Update DNS settings

## Site Structure

```
├── _layouts/          # Page templates
├── _includes/         # Reusable components
├── _sass/            # Custom styles
├── assets/           # CSS, JS, images
│   └── js/           # JavaScript files
│       └── dashboard.js  # Interactive dashboard functionality
├── data/             # Sample CSV datasets
├── ICS-CERT_ADV/     # CISA ICS Advisory data files
│   └── CISA_ICS_ADV_Master.csv  # Master dataset (auto-updated)
├── scripts/          # Data update and analysis scripts
│   └── update_data.sh    # Data update script
├── .github/workflows/    # GitHub Actions
│   └── update-data.yml   # Automated data updates
├── index.html        # Homepage
├── dashboards.html   # Interactive dashboards
├── summaries.html    # Data downloads
├── github-api.html   # API documentation
├── vendor-resources.html  # Vendor directory
├── tools-resources.html   # Security tools
├── about.html        # Project information
└── contact.html      # Contact form
```

## Technology Stack

- **Jekyll** - Static site generator
- **Bootstrap 5** - CSS framework
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **GitHub Pages** - Hosting

## External Resource Analysis

This repository includes automated tools for analyzing external dependencies and generating allowlist permissions requests:

```bash
# Run external resource analysis
./scripts/run_analysis.sh
```

The analysis generates:
- **Detailed technical analysis** (`docs/external_resources_analysis.json`)
- **Formatted allowlist request** (`docs/ALLOWLIST_REQUEST.md`)

See [`scripts/README.md`](scripts/README.md) for detailed documentation.

## Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues** - Use GitHub Issues for bugs and feature requests
2. **Submit Pull Requests** - Fork the repo and submit PRs
3. **Improve Documentation** - Help make instructions clearer
4. **Share Feedback** - Let us know how to improve the site

### Development Guidelines

- Follow existing code style and structure
- Test changes locally before submitting PRs
- Update documentation for new features
- Use semantic commit messages

## Data Updates

The dashboard automatically updates its data daily through GitHub Actions. You can also manually update the data:

### Manual Data Update

```bash
# Run the update script
./scripts/update_data.sh
```

### Automated Updates

- **Daily Schedule**: 6:00 AM UTC
- **Manual Trigger**: Via GitHub Actions tab
- **Auto-commit**: Changes are automatically committed to the repository

The update process:
1. Downloads the latest `CISA_ICS_ADV_Master.csv` from the source repository
2. Validates the data integrity
3. Updates statistics and timestamps
4. Commits changes if new data is detected

## Data Sources

- [CISA ICS Advisories](https://www.cisa.gov/uscert/ics/advisories)
- [CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [NIST NVD](https://nvd.nist.gov/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **CISA** for providing ICS advisory data
- **MITRE** for the ATT&CK framework
- **Jekyll** and **GitHub Pages** teams
- The cybersecurity community for inspiration and feedback

---

**Questions?** Open an issue or contact us through the [contact page](https://chatala1.github.io/ICS-Advisory-Dashboard/contact/).
