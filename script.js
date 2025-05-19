import elements from './elements.js';

// Initialize the periodic table
function initPeriodicTable() {
    const table = document.querySelector('.periodic-table');
    
    // Place elements in their correct positions
    elements.forEach(element => {
        const cell = document.createElement('div');
        cell.className = `element ${element.category}`;
        cell.setAttribute('data-nature', element.nature);
        cell.setAttribute('data-state', element.state);
        cell.innerHTML = `
            <span class="number">${element.number}</span>
            <span class="symbol">${element.symbol}</span>
        `;
        
        // Position the element based on its properties
        cell.style.gridRow = element.position.row;
        cell.style.gridColumn = element.position.col;
        
        // Add click event for details
        cell.addEventListener('click', () => showElementDetails(element));
        
        table.appendChild(cell);
    });
}

// Show element details
function showElementDetails(element) {
    const details = document.getElementById('elementDetails');
    
    // Update content
    document.getElementById('elementName').textContent = element.name;
    document.getElementById('elementSymbol').textContent = element.symbol;
    document.getElementById('atomicNumber').textContent = element.number;
    document.getElementById('atomicMass').textContent = element.mass;
    document.getElementById('electronicConfig').textContent = element.electronicConfig;
    document.getElementById('nature').textContent = element.nature;
    document.getElementById('state').textContent = element.state;
    document.getElementById('metallicCharacter').textContent = element.metallicCharacter;
    
    // Show details with animation
    details.style.display = 'flex';
    details.style.opacity = '0';
    setTimeout(() => {
        details.style.opacity = '1';
    }, 10);
}

// Close element details
document.querySelector('.close-btn').addEventListener('click', () => {
    const details = document.getElementById('elementDetails');
    details.style.opacity = '0';
    setTimeout(() => {
        details.style.display = 'none';
    }, 300);
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilters = new Set();

function applyFilters() {
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        if (activeFilters.size === 0) {
            // If no filters are active, show all elements
            element.classList.remove('blurred');
        } else {
            // Check if element matches any active filter
            const matchesFilter = Array.from(activeFilters).some(filter => {
                if (filter === 'acidic' || filter === 'basic' || filter === 'neutral') {
                    return element.getAttribute('data-nature') === filter;
                } else if (filter === 'solid' || filter === 'liquid' || filter === 'gas') {
                    return element.getAttribute('data-state') === filter;
                } else {
                    return element.classList.contains(filter);
                }
            });
            
            if (matchesFilter) {
                element.classList.remove('blurred');
            } else {
                element.classList.add('blurred');
            }
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Toggle active state
        button.classList.toggle('active');
        
        // Update active filters
        if (button.classList.contains('active')) {
            activeFilters.add(filter);
        } else {
            activeFilters.delete(filter);
        }
        
        // Apply filters
        applyFilters();
    });
});

// Initialize the periodic table when the page loads
document.addEventListener('DOMContentLoaded', initPeriodicTable); 