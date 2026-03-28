// instant-loan.js - Complete loan calculator with Firebase integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCglaJvCNoN33VuslJh-gFiQ98jxTcgPmo",
    authDomain: "abstract-finance.firebaseapp.com",
    projectId: "abstract-finance",
    storageBucket: "abstract-finance.firebasestorage.app",
    messagingSenderId: "869055681176",
    appId: "1:869055681176:web:d801ee5f5039038a0836ed"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Step management
window.currentStep = 1;

window.nextStep = (step) => {
    // Validation for step 1 → step 2
    if (step === 2) {
        const priceInput = document.getElementById('productPrice');
        const category = document.getElementById('productCategory').value;
        const price = parseFloat(priceInput.value);
        
        if (!category) {
            alert("Please select a product category");
            return;
        }
        if (!price || price <= 0 || isNaN(price)) {
            alert("Please enter a valid product price (minimum KES 10,000)");
            return;
        }
        if (price < 10000) {
            alert("Minimum financing amount is KES 10,000");
            return;
        }
        
        // Calculate: 90% financing after 10% service fee
        const requestedAmount = price * 0.90;
        const serviceFee = price * 0.10;
        
        document.getElementById('displayAmount').innerHTML = `KES ${requestedAmount.toLocaleString()}`;
        document.getElementById('displayFee').innerHTML = `KES ${serviceFee.toLocaleString()}`;
        
        // Store in session for submission
        sessionStorage.setItem('loanCalc', JSON.stringify({
            totalPrice: price,
            requestedAmount: requestedAmount,
            serviceFee: serviceFee,
            category: category
        }));
    }
    
    // Hide all steps
    document.querySelectorAll('.step-section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block');
    });
    
    // Show target step
    const target = document.getElementById(`step${step}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('block');
        
        // Update progress bar
        const progressMap = { 1: '33%', 2: '66%', 3: '100%' };
        document.getElementById('formProgress').style.width = progressMap[step];
        window.currentStep = step;
    }
};

// Handle form submission with Firebase
const form = document.getElementById('loanForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('fullName')?.value;
        const email = document.getElementById('email')?.value;
        const phone = document.getElementById('phone')?.value;
        
        if (!name || !phone) {
            alert("Please fill in your full name and phone number");
            return;
        }
        
        // Retrieve calculation data
        const calcData = JSON.parse(sessionStorage.getItem('loanCalc') || '{}');
        const price = calcData.totalPrice || 0;
        const requestedAmount = calcData.requestedAmount || 0;
        const serviceFee = calcData.serviceFee || 0;
        const category = calcData.category || '';
        
        // Submit button state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Submitting...";
        submitBtn.disabled = true;
        
        try {
            // Save to Firestore
            const docRef = await addDoc(collection(db, "loan_applications"), {
                fullName: name,
                email: email || '',
                phone: phone,
                productCategory: category,
                totalPrice: price,
                requestedAmount: requestedAmount,
                serviceFee: serviceFee,
                status: "PENDING_FEE_CONFIRMATION",
                createdAt: serverTimestamp(),
                source: "instant_loan_engine",
                gracePeriodEligible: true,
                slaDeadline: new Date(Date.now() + 40 * 60 * 60 * 1000) // 40 hours
            });
            
            // Show success toast
            showToast("✅ Application submitted! Our team will contact you within 40 hours.", "success");
            
            // Clear form and reset
            form.reset();
            sessionStorage.removeItem('loanCalc');
            window.nextStep(1);
            
            // Optional: Send WhatsApp notification (simulated)
            console.log(`Lead saved with ID: ${docRef.id}`);
            
        } catch (error) {
            console.error("Firebase submission error:", error);
            showToast("❌ Submission failed. Please check your connection and try again.", "error");
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Toast notification system
function showToast(message, type = "info") {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `glass px-5 py-3 rounded-xl shadow-lg mb-3 animate-slide-in border-l-4 ${
        type === 'success' ? 'border-green-500' : 'border-red-500'
    }`;
    toast.innerHTML = `<span class="text-sm">${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Handle URL parameter to pre-select product
function handleProductParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    if (productParam && document.getElementById('productCategory')) {
        const select = document.getElementById('productCategory');
        const option = Array.from(select.options).find(opt => opt.value === productParam);
        if (option) {
            select.value = productParam;
            showToast(`🎯 ${option.text} pre-selected for you`, "info");
        }
    }
}

// Initialize
handleProductParam();
