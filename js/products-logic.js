// products-logic.js - Complete product catalog with dynamic rendering
const allProductsData = [
    {
        id: "vehicle",
        name: "Vehicle Financing",
        icon: "🚗",
        fullDescription: "Financing for personal cars, SUVs, vans, and light commercial vehicles. Get up to 95% of vehicle value with flexible repayment up to 24 months.",
        features: ["Up to KES 5M financing", "Vehicle logbook as collateral", "3-month interest-free grace", "40-hour disbursement"],
        minAmount: 200000,
        maxAmount: 5000000,
        interestNote: "10% one-time service fee, no hidden interest",
        popular: true
    },
    {
        id: "tractor",
        name: "Tractor & Commercial Truck",
        icon: "🚜",
        fullDescription: "Empower your agricultural or logistics business with heavy-duty equipment financing. Competitive terms for farm tractors, harvesters, and fleet trucks.",
        features: ["Up to KES 12M financing", "Equipment-backed security", "Seasonal payment plans", "Quick approval process"],
        minAmount: 500000,
        maxAmount: 12000000,
        interestNote: "Customized repayment schedules",
        popular: true
    },
    {
        id: "business",
        name: "Business Loan",
        icon: "🏢",
        fullDescription: "Working capital, inventory purchase, or business expansion. No CRB barriers — we evaluate your business cash flow and assets.",
        features: ["KES 100K - 8M range", "Revenue-based assessment", "No personal collateral needed", "Top-up available"],
        minAmount: 100000,
        maxAmount: 8000000,
        interestNote: "10% service fee + flexible terms",
        popular: false
    },
    {
        id: "gadget",
        name: "Electronic Gadget Financing",
        icon: "💻",
        fullDescription: "Finance laptops, cameras, gaming consoles, home theater systems. Perfect for professionals, creatives, and students.",
        features: ["KES 30K - 500K limit", "Interest-free 3 months", "Instant approval", "Device delivered directly"],
        minAmount: 30000,
        maxAmount: 500000,
        interestNote: "10% upfront fee only",
        popular: true
    },
    {
        id: "mobile",
        name: "Mobile Phone Financing",
        icon: "📱",
        fullDescription: "Premium smartphones from Apple, Samsung, Google, and more. Get the latest flagship without the full upfront cost.",
        features: ["KES 20K - 300K", "Same-day approval", "Flexible 3-12 month plans", "Warranty included"],
        minAmount: 20000,
        maxAmount: 300000,
        interestNote: "0% interest option available",
        popular: true
    },
    {
        id: "schoolfees",
        name: "School Fees Financing",
        icon: "🎓",
        fullDescription: "Ensure uninterrupted education with our school fees solution. Cover term fees, boarding costs, and educational materials.",
        features: ["KES 50K - 1.5M", "Pay per term schedule", "Parent-friendly terms", "Quick disbursement to institution"],
        minAmount: 50000,
        maxAmount: 1500000,
        interestNote: "Lowest service fee (8%)",
        popular: false
    },
    {
        id: "machinery",
        name: "Machinery Financing",
        icon: "⚙️",
        fullDescription: "Industrial machines, construction equipment, manufacturing tools. Boost your production capacity with asset-backed financing.",
        features: ["KES 500K - 20M", "Long-term 36 months", "Equipment evaluation included", "Lease-to-own options"],
        minAmount: 500000,
        maxAmount: 20000000,
        interestNote: "Customized industrial rates",
        popular: false
    },
    {
        id: "salary",
        name: "Company Salary Financing",
        icon: "👥",
        fullDescription: "Employee welfare programs: offer salary advances and personal loans to your staff. Boost retention and morale.",
        features: ["Corporate partnership plans", "Group rates from 5%", "Automated payroll deductions", "No individual CRB checks"],
        minAmount: 10000,
        maxAmount: 500000,
        interestNote: "Corporate discount available",
        popular: false
    },
    {
        id: "medical",
        name: "Medical Financing",
        icon: "🏥",
        fullDescription: "Emergency medical procedures, surgeries, dental work, and health-related expenses. Get care now, pay later.",
        features: ["KES 50K - 3M", "Direct hospital payments", "Urgent 24-hour approval", "Flexible repayment up to 18 months"],
        minAmount: 50000,
        maxAmount: 3000000,
        interestNote: "Medical hardship rates apply",
        popular: true
    }
];

// Render all products on products page
function renderAllProducts() {
    const container = document.getElementById('allProductsGrid');
    if (!container) return;
    
    container.innerHTML = allProductsData.map(product => `
        <div class="glass rounded-xl p-6 border border-gold/20 hover:border-gold/60 transition-all cursor-pointer card-hover" onclick="showProductDetail('${product.id}')" data-aos="fade-up">
            <div class="flex items-center gap-3 mb-4">
                <span class="text-4xl">${product.icon}</span>
                <h3 class="text-xl font-bold text-gold">${product.name}</h3>
                ${product.popular ? '<span class="feature-badge text-gold text-xs">🔥 Popular</span>' : ''}
            </div>
            <p class="text-slate/70 text-sm mb-4 line-clamp-2">${product.fullDescription.substring(0, 100)}...</p>
            <div class="flex justify-between items-center text-sm">
                <span class="text-gold">KES ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}</span>
                <span class="text-slate/50">→ Details</span>
            </div>
        </div>
    `).join('');
}

// Show detailed modal
window.showProductDetail = function(productId) {
    const product = allProductsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center gap-3 border-b border-gold/30 pb-3">
                <span class="text-5xl">${product.icon}</span>
                <div>
                    <h2 class="text-2xl font-bold text-gold">${product.name}</h2>
                    <p class="text-slate/60 text-sm">Asset-backed financing | Zero CRB</p>
                </div>
            </div>
            
            <div class="bg-navy/50 p-4 rounded-lg">
                <p class="text-slate/80 leading-relaxed">${product.fullDescription}</p>
            </div>
            
            <div class="grid gap-2">
                <h4 class="font-semibold text-gold">✨ Key Features</h4>
                <ul class="space-y-2">
                    ${product.features.map(f => `<li class="flex items-center gap-2 text-sm"><span class="text-gold">✓</span> ${f}</li>`).join('')}
                </ul>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 pt-2">
                <div class="bg-gold/10 p-3 rounded-lg text-center">
                    <div class="text-xs text-slate/50">Financing Range</div>
                    <div class="font-bold text-gold">KES ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}</div>
                </div>
                <div class="bg-gold/10 p-3 rounded-lg text-center">
                    <div class="text-xs text-slate/50">Fee Structure</div>
                    <div class="font-bold text-gold text-sm">${product.interestNote}</div>
                </div>
            </div>
            
            <div class="flex gap-3 pt-4">
                <a href="instant-loan.html?product=${product.id}" class="flex-1 apply-cta text-navy font-bold py-3 rounded-lg text-center transition">Apply Now →</a>
                <button onclick="closeModal()" class="px-6 py-3 rounded-lg border border-gold/30 hover:bg-gold/10 transition">Close</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeModal = function() {
    const modal = document.getElementById('productModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

// Handle URL parameter for highlighted product on load
function handleHighlightParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get('highlight');
    if (highlight) {
        setTimeout(() => {
            showProductDetail(highlight);
        }, 500);
    }
}

// Initialize
if (document.getElementById('allProductsGrid')) {
    renderAllProducts();
    handleHighlightParam();
}

// Close modal on outside click
document.getElementById('productModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeModal();
});
