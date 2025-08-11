# ICS Advisory Dashboard - GitHub Copilot Instructions

The ICS Advisory Dashboard is a Jekyll-based static website that visualizes DHS CISA ICS Advisories as interactive dashboards and provides downloadable CSV datasets for vulnerability analysis. It deploys to GitHub Pages.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Environment Setup
- Install Ruby user gems with proper PATH: `gem install bundler --user-install`
- **CRITICAL**: Always update PATH before any bundle commands: `export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"`
- Verify bundler installation: `which bundle` (should show `/home/runner/.local/share/gem/ruby/3.2.0/bin/bundle`)

### Bootstrap and Build Process
1. **Install dependencies**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   bundle install --path vendor/bundle
   ```
   - **NEVER CANCEL**: Takes 30-60 seconds. Set timeout to 120+ seconds minimum.
   - Installs Jekyll, GitHub Pages gem, and all dependencies in vendor/bundle directory
   - Uses GitHub Pages compatible gem versions
   - **Note**: Use `--path vendor/bundle` to avoid permission issues with system gem directories

2. **Build the static site**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   bundle exec jekyll build
   ```
   - **Fast build**: Completes in 2-5 seconds. Set timeout to 60 seconds.
   - Generates static site in `_site/` directory
   - Uses pages-themes/minimal remote theme

3. **Start development server**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   bundle exec jekyll serve --host 0.0.0.0 --port 4000
   ```
   - Server starts immediately and runs on `http://localhost:4000/ICS-Advisory-Dashboard/`
   - Auto-regeneration enabled for file changes
   - **Note**: External CDN resources (Chart.js, Bootstrap, Font Awesome) may be blocked in sandboxed environments

### External Resource Analysis
- **Run analysis script**:
  ```bash
  python3 scripts/analyze_external_resources.py
  ```
  - **Fast execution**: Completes in 0.5-1 seconds. Set timeout to 30 seconds.
  - Scans repository for external dependencies and generates allowlist requests
  - Outputs: `docs/external_resources_analysis.json` and `docs/ALLOWLIST_REQUEST.md`
  - Alternative: Use `./scripts/run_analysis.sh` wrapper script

## Validation and Testing

### Manual Validation Requirements
**ALWAYS run through these validation scenarios after making changes:**

1. **Build Validation**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   bundle install --path vendor/bundle  # Takes 30-60 seconds
   bundle exec jekyll build  # Takes 2-5 seconds
   ls -la _site/  # Verify site generation
   ```

2. **Development Server Testing**:
   - Start server: `bundle exec jekyll serve --host 0.0.0.0 --port 4000`
   - **Test homepage**: Navigate to `http://localhost:4000/ICS-Advisory-Dashboard/`
   - **Verify navigation**: Test all menu links (Dashboards, Summaries, GitHub/API, Vendor Resources, Tools & Resources, About, Contact)
   - **Check responsive design**: Verify mobile and desktop layouts

3. **Key Page Functionality**:
   - **Homepage**: Stats display, feature cards, recent advisories section
   - **Dashboards**: Filter controls, data tables, chart placeholders (external CDNs blocked)
   - **Summaries**: Download links and data descriptions
   - **Contact**: Form validation and submission handling

4. **External Resource Analysis**:
   ```bash
   python3 scripts/analyze_external_resources.py
   cat docs/ALLOWLIST_REQUEST.md  # Review generated output
   ```

### Screenshot Validation
- **ALWAYS** take screenshots of key pages after changes to verify UI integrity
- Homepage should show: navigation, hero section, stats cards, feature grid
- Dashboard page should show: filters, data table, chart placeholders with fallback text

## Repository Structure and Key Files

### Critical Configuration Files
- **`_config.yml`**: Jekyll site configuration, navigation, plugins
- **`Gemfile`**: Ruby dependencies and GitHub Pages compatibility
- **`.gitignore`**: Excludes `_site/`, `.sass-cache/`, `vendor/`, `Gemfile.lock`

### Content and Layout Files
- **`/_layouts/`**: Jekyll page templates and layout structures
- **`/_includes/`**: Reusable components and partial templates
- **`/assets/`**: CSS, JavaScript, images, and static resources
- **HTML files**: Individual pages (`index.html`, `dashboards.html`, `summaries.html`, etc.)

### Data and Documentation
- **`/data/`**: Sample CSV datasets for download
- **`/docs/`**: Generated analysis files and documentation
- **`/scripts/`**: Python analysis tools and automation scripts

### Generated and Temporary Files
- **`/_site/`**: Generated static site (excluded from git)
- **`/vendor/`**: Bundle cache directory (excluded from git)
- **`.sass-cache/`**: CSS preprocessing cache (excluded from git)

## Technology Stack and Dependencies

### Core Technologies
- **Jekyll 3.10.0**: Static site generator with GitHub Pages compatibility
- **Ruby 3.2.3**: Runtime environment for Jekyll and bundler
- **GitHub Pages gem**: Ensures compatibility with GitHub Pages deployment

### Frontend Dependencies (External CDNs)
- **Bootstrap 5**: CSS framework for responsive design
- **Chart.js**: Interactive data visualization library
- **Font Awesome**: Icon library for UI elements
- **Plotly.js**: Advanced charting and plotting library

### Development Tools
- **Bundler**: Ruby dependency management
- **Python 3**: External resource analysis scripts
- **Liquid templating**: Jekyll's template engine

## Common Issues and Troubleshooting

### Build Issues
- **Permission errors**: Use `gem install bundler --user-install` instead of system install
- **PATH problems**: Always export PATH before bundle commands
- **Bundle install failures**: Use `bundle install --path vendor/bundle` to install gems locally
- **Dependency conflicts**: GitHub Pages gem locks specific versions - do not update individual gems

### Development Server Issues
- **Port conflicts**: Jekyll serves on port 4000 by default
- **External resources blocked**: Charts show placeholders in sandboxed environments - this is expected
- **Auto-regeneration**: Server automatically rebuilds on file changes

### External Dependencies
- **CDN blocking**: Chart.js and other external libraries may not load in restricted environments
- **Fallback behavior**: Site gracefully degrades with placeholder text when external resources fail
- **Security**: Use external resource analysis to generate allowlist requests

## Best Practices

### Development Workflow
- Always run `bundle install` after cloning or changing dependencies
- Test builds locally before pushing changes
- Verify all pages load correctly in development server
- Run external resource analysis after adding new external dependencies

### Content Management
- Follow Jekyll front matter conventions for new pages
- Use consistent navigation structure in `_config.yml`
- Maintain CSV data format standards in `/data/` directory
- Update documentation when adding new features

### Performance and Security
- Minimize external dependencies where possible
- Use Subresource Integrity (SRI) for CDN resources in production
- Regular security updates through GitHub Pages gem updates
- Monitor external resource usage with analysis scripts

## No Testing Framework
**Important**: This repository does not include automated testing, linting tools, or CI/CD pipelines. All validation must be done manually through:
- Visual inspection of generated site
- Manual testing of page functionality
- Development server validation
- External resource analysis output review

Always perform comprehensive manual testing after making changes since there are no automated tests to catch regressions.