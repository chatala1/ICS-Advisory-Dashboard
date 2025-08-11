#!/usr/bin/env python3
"""
External Resource Analysis Tool for ICS Advisory Dashboard

This tool automatically analyzes the repository to identify all external resources
required for the site to function correctly and generates a tailored allowlist
permissions request.
"""

import os
import re
import json
import yaml
from pathlib import Path
from urllib.parse import urlparse
from typing import Dict, List, Set, Tuple
from collections import defaultdict

class ExternalResourceAnalyzer:
    def __init__(self, repo_root: str):
        self.repo_root = Path(repo_root)
        self.external_urls = set()
        self.url_patterns = defaultdict(list)
        self.resource_categories = {
            'cdn': set(),
            'apis': set(), 
            'data_sources': set(),
            'vendor_resources': set(),
            'hosting': set(),
            'social': set(),
            'documentation': set()
        }
        
    def analyze_repository(self) -> Dict:
        """Main analysis function that scans the entire repository"""
        print("🔍 Analyzing ICS Advisory Dashboard repository for external resources...")
        
        # Scan different file types
        self._scan_html_files()
        self._scan_css_files()
        self._scan_js_files()
        self._scan_config_files()
        self._scan_markdown_files()
        
        # Categorize URLs
        self._categorize_urls()
        
        # Generate analysis report
        return self._generate_report()
    
    def _scan_html_files(self):
        """Scan HTML files for external resources"""
        html_files = list(self.repo_root.glob('**/*.html'))
        print(f"📄 Scanning {len(html_files)} HTML files...")
        
        for file_path in html_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                urls = self._extract_urls_from_content(content)
                for url in urls:
                    self.url_patterns[url].append(f"HTML: {file_path.relative_to(self.repo_root)}")
                    self.external_urls.add(url)
            except Exception as e:
                print(f"⚠️  Error reading {file_path}: {e}")
    
    def _scan_css_files(self):
        """Scan CSS files for external resources"""
        css_files = list(self.repo_root.glob('**/*.css'))
        print(f"🎨 Scanning {len(css_files)} CSS files...")
        
        for file_path in css_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                urls = self._extract_urls_from_content(content)
                for url in urls:
                    self.url_patterns[url].append(f"CSS: {file_path.relative_to(self.repo_root)}")
                    self.external_urls.add(url)
            except Exception as e:
                print(f"⚠️  Error reading {file_path}: {e}")
    
    def _scan_js_files(self):
        """Scan JavaScript files for external resources"""
        js_files = list(self.repo_root.glob('**/*.js'))
        print(f"⚡ Scanning {len(js_files)} JavaScript files...")
        
        for file_path in js_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                urls = self._extract_urls_from_content(content)
                for url in urls:
                    self.url_patterns[url].append(f"JS: {file_path.relative_to(self.repo_root)}")
                    self.external_urls.add(url)
            except Exception as e:
                print(f"⚠️  Error reading {file_path}: {e}")
    
    def _scan_config_files(self):
        """Scan configuration files for external resources"""
        config_files = list(self.repo_root.glob('**/*.yml')) + list(self.repo_root.glob('**/*.yaml'))
        print(f"⚙️  Scanning {len(config_files)} configuration files...")
        
        for file_path in config_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                urls = self._extract_urls_from_content(content)
                for url in urls:
                    self.url_patterns[url].append(f"Config: {file_path.relative_to(self.repo_root)}")
                    self.external_urls.add(url)
            except Exception as e:
                print(f"⚠️  Error reading {file_path}: {e}")
    
    def _scan_markdown_files(self):
        """Scan Markdown files for external resources"""
        md_files = list(self.repo_root.glob('**/*.md'))
        print(f"📝 Scanning {len(md_files)} Markdown files...")
        
        for file_path in md_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                urls = self._extract_urls_from_content(content)
                for url in urls:
                    self.url_patterns[url].append(f"MD: {file_path.relative_to(self.repo_root)}")
                    self.external_urls.add(url)
            except Exception as e:
                print(f"⚠️  Error reading {file_path}: {e}")
    
    def _extract_urls_from_content(self, content: str) -> Set[str]:
        """Extract HTTPS URLs from content"""
        # Pattern to match various URL formats in different contexts
        patterns = [
            r'https://[^\s\'"<>]+',  # Basic HTTPS URLs
            r'href=["\']https://[^"\']+["\']',  # HTML href attributes
            r'src=["\']https://[^"\']+["\']',   # HTML src attributes
            r'url\(["\']?https://[^"\')\s]+["\']?\)',  # CSS url() functions
        ]
        
        urls = set()
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                # Clean up the match to extract just the URL
                clean_url = re.sub(r'^(href=|src=|url\()?["\']?', '', match)
                clean_url = re.sub(r'["\'\)]*$', '', clean_url)
                
                # Filter out the site's own URLs
                if not any(own_domain in clean_url for own_domain in ['chatala1.github.io', 'localhost']):
                    urls.add(clean_url)
        
        return urls
    
    def _categorize_urls(self):
        """Categorize URLs by their purpose"""
        for url in self.external_urls:
            domain = urlparse(url).netloc.lower()
            
            # CDN Resources
            if any(cdn in domain for cdn in ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com', 'cdn.plot.ly']):
                self.resource_categories['cdn'].add(url)
            
            # Government/Official APIs and Data Sources
            elif any(gov in domain for gov in ['cisa.gov', 'nvd.nist.gov', 'nist.gov']):
                self.resource_categories['data_sources'].add(url)
            
            # MITRE Resources
            elif 'mitre.org' in domain:
                self.resource_categories['data_sources'].add(url)
            
            # GitHub Resources
            elif 'github.com' in domain:
                self.resource_categories['hosting'].add(url)
            
            # Social Media
            elif any(social in domain for social in ['twitter.com', 'linkedin.com', 'reddit.com']):
                self.resource_categories['social'].add(url)
            
            # ICS Vendor Resources
            elif any(vendor in domain for vendor in [
                'siemens.com', 'schneider', 'rockwellautomation.com', 
                'ge.com', 'honeywell.com', 'emerson.com', 'abb.com'
            ]):
                self.resource_categories['vendor_resources'].add(url)
            
            # Security Research Organizations
            elif any(org in domain for org in [
                'sans.org', 'isa.org', 'claroty.com', 'dragos.com', 
                'kaspersky.com', 'tenable.com', 'volatilityfoundation.org'
            ]):
                self.resource_categories['documentation'].add(url)
            
            # APIs (based on URL patterns)
            elif 'api.' in domain or '/api/' in url:
                self.resource_categories['apis'].add(url)
            
            else:
                # Default to documentation if not categorized
                self.resource_categories['documentation'].add(url)
    
    def _generate_report(self) -> Dict:
        """Generate comprehensive analysis report"""
        report = {
            'analysis_summary': {
                'total_external_urls': len(self.external_urls),
                'categories_found': len([cat for cat, urls in self.resource_categories.items() if urls]),
                'repository_type': 'Jekyll Static Site',
                'hosting_platform': 'GitHub Pages'
            },
            'critical_dependencies': {},
            'external_data_sources': {},
            'optional_resources': {},
            'security_considerations': [],
            'recommendations': []
        }
        
        # Categorize by criticality
        report['critical_dependencies']['cdn_resources'] = list(self.resource_categories['cdn'])
        report['critical_dependencies']['hosting'] = list(self.resource_categories['hosting'])
        
        report['external_data_sources']['government_apis'] = [
            url for url in self.resource_categories['data_sources'] 
            if any(gov in url for gov in ['cisa.gov', 'nist.gov', 'mitre.org'])
        ]
        
        report['optional_resources']['vendor_resources'] = list(self.resource_categories['vendor_resources'])
        report['optional_resources']['social_media'] = list(self.resource_categories['social'])
        report['optional_resources']['documentation'] = list(self.resource_categories['documentation'])
        
        # Add security considerations
        report['security_considerations'] = [
            "All CDN resources should be integrity-checked with SRI hashes",
            "Government data sources are generally trusted but should be rate-limited",
            "Vendor resources may have varying security standards",
            "Social media integrations should be sandboxed"
        ]
        
        # Add recommendations
        report['recommendations'] = [
            "Implement Content Security Policy (CSP) headers",
            "Use Subresource Integrity (SRI) for all CDN resources",
            "Cache external resources locally where possible",
            "Implement graceful fallbacks for external dependencies"
        ]
        
        return report

def generate_allowlist_request(report: Dict) -> str:
    """Generate formatted allowlist permissions request"""
    
    # Calculate total unique domains
    all_urls = []
    all_urls.extend(report['critical_dependencies']['cdn_resources'])
    all_urls.extend(report['critical_dependencies']['hosting'])
    all_urls.extend(report['external_data_sources']['government_apis'])
    all_urls.extend(report['optional_resources']['vendor_resources'])
    all_urls.extend(report['optional_resources']['social_media'])
    all_urls.extend(report['optional_resources']['documentation'])
    
    unique_domains = set(urlparse(url).netloc for url in all_urls if url)
    
    template = """# External Resource Allowlist Request for ICS Advisory Dashboard

## Project Overview
**Project:** ICS Advisory Dashboard  
**Repository:** https://github.com/chatala1/ICS-Advisory-Dashboard  
**Hosting:** GitHub Pages (https://chatala1.github.io/ICS-Advisory-Dashboard)  
**Purpose:** Open-source initiative to visualize DHS CISA ICS Advisories as interactive dashboards

## Request Summary
This request is for allowlisting external resources required for the ICS Advisory Dashboard to function correctly. The site provides critical cybersecurity intelligence for Industrial Control Systems (ICS) and serves the cybersecurity community.

## Critical Dependencies (Required for Core Functionality)

### CDN Resources - Frontend Libraries
"""
    
    # Add critical CDN resources
    if report['critical_dependencies']['cdn_resources']:
        for url in report['critical_dependencies']['cdn_resources']:
            domain = urlparse(url).netloc
            if 'bootstrap' in url:
                template += f"""
**{domain}**
- URL: `{url}`
- Purpose: Bootstrap CSS/JS framework for responsive design and UI components
- Justification: Core frontend framework required for site layout and functionality
- Security: Well-established CDN with SRI hash verification available
"""
            elif 'font-awesome' in url:
                template += f"""
**{domain}**
- URL: `{url}`
- Purpose: Font Awesome icon library for UI icons
- Justification: Provides standardized icons throughout the dashboard interface
- Security: Trusted CDN with wide adoption in enterprise environments
"""
            elif 'chart.js' in url:
                template += f"""
**{domain}**
- URL: `{url}`
- Purpose: Chart.js library for data visualization
- Justification: Essential for rendering interactive charts and graphs of advisory data
- Security: Open-source charting library with active security maintenance
"""
            elif 'plotly' in url:
                template += f"""
**{domain}**
- URL: `{url}`
- Purpose: Plotly.js for advanced interactive visualizations
- Justification: Provides sophisticated data visualization capabilities for trend analysis
- Security: Enterprise-grade visualization library with strong security record
"""
            elif 'lucide' in url:
                template += f"""
**{domain}**
- URL: `{url}`
- Purpose: Lucide Icons - Swift UI-style icon library
- Justification: Modern, clean icons for enhanced user interface design
- Security: Open-source icon library with consistent maintenance and updates
"""
    
    template += """
### Hosting Platform
**GitHub (github.com)**
- Purpose: Source code repository and GitHub Pages hosting
- Justification: Industry-standard platform for open-source projects and static site hosting
- Security: Enterprise-grade security with 2FA and access controls

## External Data Sources (For Content and Intelligence)

### Government and Standards Organizations
"""
    
    # Add government data sources
    gov_sources = report['external_data_sources']['government_apis']
    gov_domains = {
        'cisa.gov': 'DHS Cybersecurity & Infrastructure Security Agency',
        'nist.gov': 'National Institute of Standards and Technology', 
        'mitre.org': 'MITRE Corporation - CVE Database and ATT&CK Framework'
    }
    
    for domain, description in gov_domains.items():
        matching_urls = [url for url in gov_sources if domain in url]
        if matching_urls:
            template += f"""
**{domain}**
- URLs: {', '.join([f'`{url}`' for url in matching_urls[:3]])}
- Purpose: {description}
- Justification: Official government cybersecurity data sources for ICS advisories and vulnerability intelligence
- Security: Trusted government sources with authoritative cybersecurity data
"""
    
    template += """
## Optional Resources (Enhanced Functionality)

### ICS Vendor Security Resources
These resources provide additional context and vendor-specific security information:
"""
    
    # Add vendor resources
    vendor_domains = set()
    for url in report['optional_resources']['vendor_resources']:
        vendor_domains.add(urlparse(url).netloc)
    
    vendor_info = {
        'siemens.com': 'Siemens AG - Industrial automation security resources and advisories',
        'se.com': 'Schneider Electric - Power management and automation security',
        'rockwellautomation.com': 'Rockwell Automation - Industrial automation security',
        'ge.com': 'General Electric - Digital industrial security resources',
        'honeywell.com': 'Honeywell - Process control and safety system security',
        'emerson.com': 'Emerson - Process automation and control security'
    }
    
    for domain in sorted(vendor_domains):
        if any(vendor in domain for vendor in vendor_info.keys()):
            for vendor_key, description in vendor_info.items():
                if vendor_key in domain:
                    template += f"""
- **{domain}**: {description}
"""
                    break
    
    template += """
### Security Research and Documentation
"""
    
    # Add documentation resources
    doc_domains = set()
    for url in report['optional_resources']['documentation']:
        doc_domains.add(urlparse(url).netloc)
    
    doc_info = {
        'sans.org': 'SANS Institute - ICS security training and research',
        'isa.org': 'International Society of Automation - IEC 62443 standards',
        'dragos.com': 'Dragos Inc. - ICS threat intelligence and research',
        'claroty.com': 'Claroty - ICS security research (Team82)',
        'kaspersky.com': 'Kaspersky ICS-CERT - Industrial cybersecurity research'
    }
    
    for domain in sorted(doc_domains):
        if any(doc_key in domain for doc_key in doc_info.keys()):
            for doc_key, description in doc_info.items():
                if doc_key in domain:
                    template += f"""
- **{domain}**: {description}
"""
                    break
    
    template += f"""
## Security Considerations

{chr(10).join([f"- {consideration}" for consideration in report['security_considerations']])}

## Recommendations

{chr(10).join([f"- {recommendation}" for recommendation in report['recommendations']])}

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

**Total External Domains Requested**: {len(unique_domains)}

This allowlist supports critical infrastructure cybersecurity by enabling access to authoritative government advisories and providing tools for vulnerability analysis in industrial control systems.
"""
    
    return template

def main():
    """Main execution function"""
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    analyzer = ExternalResourceAnalyzer(repo_root)
    report = analyzer.analyze_repository()
    
    # Save detailed analysis report
    analysis_output = os.path.join(repo_root, 'docs', 'external_resources_analysis.json')
    os.makedirs(os.path.dirname(analysis_output), exist_ok=True)
    
    with open(analysis_output, 'w') as f:
        json.dump(report, f, indent=2)
    
    # Generate allowlist request
    allowlist_request = generate_allowlist_request(report)
    
    # Save allowlist request
    request_output = os.path.join(repo_root, 'docs', 'ALLOWLIST_REQUEST.md')
    with open(request_output, 'w') as f:
        f.write(allowlist_request)
    
    print(f"""
✅ Analysis Complete!

📊 External Resources Analysis:
   - Total URLs found: {report['analysis_summary']['total_external_urls']}
   - CDN Resources: {len(report['critical_dependencies']['cdn_resources'])}
   - Data Sources: {len(report['external_data_sources']['government_apis'])}
   - Vendor Resources: {len(report['optional_resources']['vendor_resources'])}

📋 Generated Files:
   - Detailed Analysis: {analysis_output}
   - Allowlist Request: {request_output}

🚀 Next Steps:
   1. Review the generated allowlist request
   2. Submit to your security/governance team
   3. Implement recommended security measures
""")

if __name__ == "__main__":
    main()