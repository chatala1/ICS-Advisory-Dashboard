# Icon Usage Guide

The ICS Advisory Dashboard includes two icon libraries for different use cases:

## Font Awesome Icons (Existing)
Font Awesome provides a comprehensive set of icons and is used throughout the site for standard UI elements.

```html
<!-- Examples of existing Font Awesome usage -->
<i class="fas fa-shield-alt"></i>        <!-- Security/Shield icon -->
<i class="fas fa-chart-bar"></i>         <!-- Chart/Dashboard icon -->
<i class="fas fa-download"></i>          <!-- Download icon -->
<i class="fas fa-database"></i>          <!-- Database icon -->
<i class="fas fa-code"></i>              <!-- Code/API icon -->
<i class="fas fa-industry"></i>          <!-- Industry/Manufacturing icon -->
<i class="fas fa-tools"></i>             <!-- Tools icon -->
<i class="fas fa-users"></i>             <!-- Users/Community icon -->
```

## Lucide Icons (Swift UI-style)
Lucide Icons provide modern, clean icons similar to iOS/Swift UI system icons. Perfect for contemporary interface elements.

### Basic Usage
```html
<!-- Add data-lucide attribute with icon name -->
<i data-lucide="shield"></i>             <!-- Security/Shield icon -->
<i data-lucide="bar-chart-3"></i>        <!-- Chart/Dashboard icon -->
<i data-lucide="download"></i>           <!-- Download icon -->
<i data-lucide="database"></i>           <!-- Database icon -->
<i data-lucide="code"></i>               <!-- Code/API icon -->
<i data-lucide="factory"></i>            <!-- Industry/Manufacturing icon -->
<i data-lucide="wrench"></i>             <!-- Tools icon -->
<i data-lucide="users"></i>              <!-- Users/Community icon -->
```

### Advanced Usage
```html
<!-- With custom sizing -->
<i data-lucide="shield" style="width: 24px; height: 24px;"></i>

<!-- With custom colors -->
<i data-lucide="alert-triangle" style="color: #e53e3e;"></i>

<!-- In buttons -->
<button class="btn btn-primary">
    <i data-lucide="download" style="width: 16px; height: 16px;"></i>
    Download Data
</button>
```

### Available Swift UI-style Icons
Common icons available in Lucide that match Swift UI aesthetics:

- **Navigation**: `menu`, `x`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- **Actions**: `plus`, `minus`, `edit`, `trash-2`, `save`, `refresh-cw`
- **Data**: `bar-chart-3`, `pie-chart`, `trending-up`, `activity`, `database`
- **Security**: `shield`, `shield-check`, `lock`, `unlock`, `alert-triangle`, `alert-circle`
- **Industry**: `factory`, `cpu`, `server`, `network`, `settings`, `tool`
- **Content**: `file`, `folder`, `image`, `download`, `upload`, `external-link`

### When to Use Which Library

**Use Font Awesome when:**
- You need a specific icon that's not available in Lucide
- Working with existing components that already use Font Awesome
- Need more decorative or style-specific icons

**Use Lucide (Swift UI-style) when:**
- Creating new interface elements
- Want a modern, clean appearance
- Prefer consistent, minimal icon design
- Building mobile-responsive interfaces

### Icon Initialization
Icons are automatically initialized when the page loads via JavaScript in `assets/js/main.js`:

```javascript
// Initialize Lucide icons (Swift UI-style icons)
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
```

### CSS Customization
You can style Lucide icons with CSS just like any other element:

```css
/* Custom icon styling */
.icon-primary {
    color: #3182ce;
}

.icon-large {
    width: 32px;
    height: 32px;
}

.icon-danger {
    color: #e53e3e;
}
```

### Example Implementation
Here's how you might use both libraries together:

```html
<div class="feature-card">
    <!-- Using Lucide for main icon -->
    <i data-lucide="shield-check" class="icon-primary icon-large"></i>
    <h4>Security Analysis</h4>
    <p>Advanced vulnerability assessment tools</p>
    
    <!-- Using Font Awesome for secondary actions -->
    <div class="actions">
        <button class="btn btn-sm">
            <i class="fas fa-info-circle"></i> Info
        </button>
    </div>
</div>
```

For more icons and detailed documentation, visit:
- [Lucide Icons](https://lucide.dev/) - Swift UI-style icons
- [Font Awesome](https://fontawesome.com/) - Comprehensive icon library