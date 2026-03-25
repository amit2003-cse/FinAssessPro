export const calculateBIScore = (data) => {
    let score = 0;
  
    const breakdown = {
      profile: 0,
      work: 0,
      credit: 0,
      banking: 0,
      strength: 0,
    };
  
    /* ------------------ PROFILE ------------------ */
    if (data.age >= 25 && data.age <= 55) {
      breakdown.profile += 15;
      score += 15;
    } else {
      breakdown.profile += 8;
      score += 8;
    }
  
    /* ------------------ WORK / BUSINESS ------------------ */
    if (data.applicantType === "Salaried") {
      if (data.totalExperience >= 3) {
        breakdown.work += 15;
        score += 15;
      } else {
        breakdown.work += 8;
        score += 8;
      }
    } else {
      if (data.businessExperience >= 3) {
        breakdown.work += 15;
        score += 15;
      } else {
        breakdown.work += 8;
        score += 8;
      }
    }
  
    /* ------------------ CREDIT ------------------ */
    if (data.cibilScore >= 750) {
      breakdown.credit += 25;
      score += 25;
    } else if (data.cibilScore >= 650) {
      breakdown.credit += 18;
      score += 18;
    } else if (data.cibilScore >= 550) {
      breakdown.credit += 10;
      score += 10;
    } else {
      breakdown.credit += 5;
      score += 5;
    }
  
    /* ------------------ BANKING ------------------ */
    if (data.bounces3Months === 0) {
      breakdown.banking += 15;
      score += 15;
    } else if (data.bounces3Months <= 2) {
      breakdown.banking += 8;
      score += 8;
    } else {
      breakdown.banking += 3;
      score += 3;
    }
  
    /* ------------------ FINANCIAL STRENGTH ------------------ */
    if (data.netWorthBorrowingRatio >= 2) {
      breakdown.strength += 15;
      score += 15;
    } else if (data.netWorthBorrowingRatio >= 1.25) {
      breakdown.strength += 8;
      score += 8;
    } else {
      breakdown.strength += 4;
      score += 4;
    }
  
    /* ------------------ RISK BAND ------------------ */
    let riskBand = "High Risk";
    if (score >= 75) riskBand = "Low Risk";
    else if (score >= 55) riskBand = "Moderate Risk";
  
    return {
      biScore: score,
      riskBand,
      breakdown,
    };
  };
  