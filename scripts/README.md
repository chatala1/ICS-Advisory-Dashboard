# External Resource Analysis Tools

This directory contains tools to automatically analyze the ICS Advisory Dashboard repository for external dependencies and generate allowlist permissions requests.

## Scripts

### `analyze_external_resources.py`

Automatically scans the repository to identify all external resources required for the site to function correctly and generates a tailored allowlist permissions request.

#### Features

- **Comprehensive Scanning**: Analyzes HTML, CSS, JavaScript, configuration, and Markdown files
- **Smart Categorization**: Groups resources by purpose (CDN, APIs, data sources, vendor resources, etc.)
- **Security Assessment**: Provides security considerations and recommendations for each resource type
- **Formatted Output**: Generates professional allowlist request ready for submission to security teams

#### Usage

```bash
# Run the analysis tool
python3 scripts/analyze_external_resources.py
```

#### Output Files

The script generates two key files in the `docs/` directory:

1. **`external_resources_analysis.json`** - Detailed technical analysis in JSON format
2. **`ALLOWLIST_REQUEST.md`** - Formatted allowlist request for security/governance teams

#### Example Output

```
✅ Analysis Complete!

📊 External Resources Analysis:
   - Total URLs found: 57
   - CDN Resources: 5
   - Data Sources: 8
   - Vendor Resources: 10

📋 Generated Files:
   - Detailed Analysis: docs/external_resources_analysis.json
   - Allowlist Request: docs/ALLOWLIST_REQUEST.md
```

## Resource Categories

The analysis tool categorizes external resources into the following groups:

### Critical Dependencies
- **CDN Resources**: Bootstrap, Font Awesome, Chart.js, Plotly.js
- **Hosting**: GitHub repository and GitHub Pages hosting

### External Data Sources
- **Government APIs**: CISA advisories, NIST NVD, MITRE databases
- **Standards Organizations**: Security frameworks and guidelines

### Optional Resources
- **Vendor Resources**: ICS vendor security portals and advisories
- **Documentation**: Security research organizations and training resources
- **Social Media**: Community links and discussions

## Security Considerations

The tool automatically identifies security considerations for each resource type:

- CDN resources should use Subresource Integrity (SRI) hashes
- Government data sources are trusted but should be rate-limited
- Vendor resources may have varying security standards
- Social media integrations should be sandboxed

## Integration

To integrate this tool into your development workflow:

1. **CI/CD Integration**: Run the analysis on repository changes
2. **Security Reviews**: Use output for periodic security assessments
3. **Documentation**: Keep allowlist requests up-to-date with site changes

## Requirements

- Python 3.6+
- Standard library modules only (no external dependencies)
- Read access to repository files

## Customization

The analysis tool can be customized by modifying:

- **URL Patterns**: Adjust regex patterns for different URL formats
- **Categorization Rules**: Modify domain-based categorization logic
- **Output Format**: Customize the allowlist request template
- **Security Guidelines**: Update security considerations and recommendations