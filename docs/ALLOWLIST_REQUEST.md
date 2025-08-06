# External Resource Allowlist Request for ICS Advisory Dashboard

## Project Overview
**Project:** ICS Advisory Dashboard  
**Repository:** https://github.com/chatala1/ICS-Advisory-Dashboard  
**Hosting:** GitHub Pages (https://chatala1.github.io/ICS-Advisory-Dashboard)  
**Purpose:** Open-source initiative to visualize DHS CISA ICS Advisories as interactive dashboards

## Request Summary
This request is for allowlisting external resources required for the ICS Advisory Dashboard to function correctly. The site provides critical cybersecurity intelligence for Industrial Control Systems (ICS) and serves the cybersecurity community.

## Critical Dependencies (Required for Core Functionality)

### CDN Resources - Frontend Libraries

**cdn.plot.ly**
- URL: `https://cdn.plot.ly/plotly-latest.min.js`
- Purpose: Plotly.js for advanced interactive visualizations
- Justification: Provides sophisticated data visualization capabilities for trend analysis
- Security: Enterprise-grade visualization library with strong security record

**cdn.jsdelivr.net**
- URL: `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js``
- Purpose: Bootstrap CSS/JS framework for responsive design and UI components
- Justification: Core frontend framework required for site layout and functionality
- Security: Well-established CDN with SRI hash verification available

**cdn.jsdelivr.net**
- URL: `https://cdn.jsdelivr.net/npm/chart.js`
- Purpose: Chart.js library for data visualization
- Justification: Essential for rendering interactive charts and graphs of advisory data
- Security: Open-source charting library with active security maintenance

**cdn.jsdelivr.net**
- URL: `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css``
- Purpose: Bootstrap CSS/JS framework for responsive design and UI components
- Justification: Core frontend framework required for site layout and functionality
- Security: Well-established CDN with SRI hash verification available

**cdn.jsdelivr.net**
- URL: `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css`
- Purpose: Bootstrap CSS/JS framework for responsive design and UI components
- Justification: Core frontend framework required for site layout and functionality
- Security: Well-established CDN with SRI hash verification available

**cdnjs.cloudflare.com**
- URL: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`
- Purpose: Font Awesome icon library for UI icons
- Justification: Provides standardized icons throughout the dashboard interface
- Security: Trusted CDN with wide adoption in enterprise environments

**cdn.jsdelivr.net**
- URL: `https://cdn.jsdelivr.net/npm/chart.js``
- Purpose: Chart.js library for data visualization
- Justification: Essential for rendering interactive charts and graphs of advisory data
- Security: Open-source charting library with active security maintenance

**cdn.plot.ly**
- URL: `https://cdn.plot.ly/plotly-latest.min.js``
- Purpose: Plotly.js for advanced interactive visualizations
- Justification: Provides sophisticated data visualization capabilities for trend analysis
- Security: Enterprise-grade visualization library with strong security record

**cdn.jsdelivr.net**
- URL: `https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js`
- Purpose: Bootstrap CSS/JS framework for responsive design and UI components
- Justification: Core frontend framework required for site layout and functionality
- Security: Well-established CDN with SRI hash verification available

**cdnjs.cloudflare.com**
- URL: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css``
- Purpose: Font Awesome icon library for UI icons
- Justification: Provides standardized icons throughout the dashboard interface
- Security: Trusted CDN with wide adoption in enterprise environments

### Hosting Platform
**GitHub (github.com)**
- Purpose: Source code repository and GitHub Pages hosting
- Justification: Industry-standard platform for open-source projects and static site hosting
- Security: Enterprise-grade security with 2FA and access controls

## External Data Sources (For Content and Intelligence)

### Government and Standards Organizations

**cisa.gov**
- URLs: `https://www.cisa.gov/uscert/ics/advisories`, `https://www.cisa.gov/known-exploited-vulnerabilities-catalog``, `https://www.cisa.gov/known-exploited-vulnerabilities-catalog`
- Purpose: DHS Cybersecurity & Infrastructure Security Agency
- Justification: Official government cybersecurity data sources for ICS advisories and vulnerability intelligence
- Security: Trusted government sources with authoritative cybersecurity data

**nist.gov**
- URLs: `https://nvd.nist.gov/`,`, `https://www.nist.gov/cyberframework``, `https://www.nist.gov/cyberframework`
- Purpose: National Institute of Standards and Technology
- Justification: Official government cybersecurity data sources for ICS advisories and vulnerability intelligence
- Security: Trusted government sources with authoritative cybersecurity data

**mitre.org**
- URLs: `https://attack.mitre.org/matrices/ics/`,`, `https://attack.mitre.org/matrices/ics/`, `https://cve.mitre.org/`,`
- Purpose: MITRE Corporation - CVE Database and ATT&CK Framework
- Justification: Official government cybersecurity data sources for ICS advisories and vulnerability intelligence
- Security: Trusted government sources with authoritative cybersecurity data

## Optional Resources (Enhanced Functionality)

### ICS Vendor Security Resources
These resources provide additional context and vendor-specific security information:

- **cert-portal.siemens.com**: Siemens AG - Industrial automation security resources and advisories

- **process.honeywell.com**: Honeywell - Process control and safety system security

- **www.emerson.com**: Emerson - Process automation and control security

- **www.ge.com**: General Electric - Digital industrial security resources

- **www.honeywell.com**: Honeywell - Process control and safety system security

- **www.rockwellautomation.com**: Rockwell Automation - Industrial automation security

- **www.siemens.com**: Siemens AG - Industrial automation security resources and advisories

### Security Research and Documentation

- **claroty.com**: Claroty - ICS security research (Team82)

- **ics-cert.kaspersky.com**: Kaspersky ICS-CERT - Industrial cybersecurity research

- **www.dragos.com**: Dragos Inc. - ICS threat intelligence and research

- **www.isa.org**: International Society of Automation - IEC 62443 standards

- **www.sans.org**: SANS Institute - ICS security training and research

## Security Considerations

- All CDN resources should be integrity-checked with SRI hashes
- Government data sources are generally trusted but should be rate-limited
- Vendor resources may have varying security standards
- Social media integrations should be sandboxed

## Recommendations

- Implement Content Security Policy (CSP) headers
- Use Subresource Integrity (SRI) for all CDN resources
- Cache external resources locally where possible
- Implement graceful fallbacks for external dependencies

## Implementation Notes

1. **Content Security Policy**: Implement CSP headers to restrict resource loading to allowlisted domains
2. **Subresource Integrity**: Add SRI hashes for all CDN resources to ensure integrity
3. **Monitoring**: Monitor external resource availability and implement fallbacks where appropriate
4. **Rate Limiting**: Implement appropriate rate limiting for API calls to external data sources

## Contact Information

- **Project Maintainer**: Available through GitHub repository issues
- **Repository**: https://github.com/chatala1/ICS-Advisory-Dashboard
- **Purpose**: Supporting critical infrastructure cybersecurity through open-source intelligence tools

---

**Total External Domains Requested**: 30

This allowlist supports critical infrastructure cybersecurity by enabling access to authoritative government advisories and providing tools for vulnerability analysis in industrial control systems.
