/* ============================================================================
   ROI CALCULATOR COMPONENT
   ============================================================================ */

function initROICalculator() {
  const form = document.getElementById('roi-calculator');
  if (!form) return;

  const missedCallsInput = document.getElementById('missed-calls');
  const avgValueInput = document.getElementById('avg-value');
  const closeRateInput = document.getElementById('close-rate');
  const monthlyResult = document.getElementById('monthly-loss');
  const annualResult = document.getElementById('annual-loss');

  function calculate() {
    const missedCalls = parseInt(missedCallsInput.value) || 0;
    const avgValue = parseFloat(avgValueInput.value) || 0;
    const closeRate = parseFloat(closeRateInput.value) || 0;

    const monthlyLoss = missedCalls * avgValue * (closeRate / 100);
    const annualLoss = monthlyLoss * 12;

    if (monthlyResult) {
      monthlyResult.textContent = formatCurrency(monthlyLoss);
    }
    if (annualResult) {
      annualResult.textContent = formatCurrency(annualLoss);
    }
  }

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  }

  // Attach event listeners
  [missedCallsInput, avgValueInput, closeRateInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  // Initial calculation
  calculate();
}

// Propane-specific ROI calculator
function initPropaneROICalculator() {
  const form = document.getElementById('propane-roi-calculator');
  if (!form) return;

  const trucksInput = document.getElementById('num-trucks');
  const deliveriesInput = document.getElementById('deliveries-per-day');
  const dispatchHoursInput = document.getElementById('dispatch-hours');
  const missedCallsInput = document.getElementById('missed-calls-week');

  const routeEfficiencyResult = document.getElementById('route-efficiency');
  const dispatchTimeResult = document.getElementById('dispatch-time');
  const missedRevenueResult = document.getElementById('missed-revenue');
  const totalImpactResult = document.getElementById('total-impact');

  function calculate() {
    const numTrucks = parseInt(trucksInput.value) || 0;
    const deliveriesPerDay = parseInt(deliveriesInput.value) || 0;
    const dispatchHours = parseInt(dispatchHoursInput.value) || 0;
    const missedCallsWeek = parseInt(missedCallsInput.value) || 0;

    // Route efficiency: 5% fuel savings on avg 100 gal/delivery at $2.50/gal
    const weeklyDeliveries = numTrucks * deliveriesPerDay * 5;
    const routeEfficiency = weeklyDeliveries * 100 * 0.05 * 2.50;

    // Dispatch time: hours saved at $28/hour
    const dispatchTime = dispatchHours * 5; // per week

    // Missed revenue: avg $500 per call, 30% close rate
    const missedRevenue = missedCallsWeek * 500 * 0.30 * 4; // per month

    // Total annual impact
    const totalAnnual = (routeEfficiency * 52) + (dispatchTime * 28 * 52) + (missedRevenue * 12);

    if (routeEfficiencyResult) {
      routeEfficiencyResult.textContent = Math.round(routeEfficiency);
    }
    if (dispatchTimeResult) {
      dispatchTimeResult.textContent = Math.round(dispatchHours * 5 * 0.7); // 70% reduction
    }
    if (missedRevenueResult) {
      missedRevenueResult.textContent = formatCurrency(missedRevenue);
    }
    if (totalImpactResult) {
      totalImpactResult.textContent = formatCurrency(totalAnnual);
    }
  }

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  }

  // Attach event listeners
  [trucksInput, deliveriesInput, dispatchHoursInput, missedCallsInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  // Initial calculation
  calculate();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initROICalculator();
  initPropaneROICalculator();
});
