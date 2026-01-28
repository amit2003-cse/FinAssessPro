import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendUserMail = async (lead) => {
  const {
    fullName,
    email,
    mobile,
    age,
    applicantType,

    // Employment / Business
    totalExperience,
    currentOrgExperience,
    employerType,
    designation,

    businessExperience,
    gstRegistered,
    gstVintage,
    turnoverTrend,
    profitTrend,
    capitalTrend,

    // Credit & Banking
    cibilScore,
    runningLoans,
    closedLoans,
    bounces6Months,
    bounces3Months,
    avgBankBalance,

    // Financial Strength
    totalAssets,
    totalOutstandingLoans,
    netWorthBorrowingRatio,

    // BI Result
    biScore,
    riskBand,
    scoreBreakdown,
  } = lead;

  const breakdown = scoreBreakdown || {};

  const getRiskColor = (risk) => {
    if (risk === "Low Risk") return "#16a34a";
    if (risk === "Moderate Risk") return "#ca8a04";
    return "#dc2626";
  };

  const mailBody = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
    
    <h2>Dear ${fullName},</h2>

    <p>
      Thank you for submitting your details on the 
      <strong>BI Rating Calculator</strong>.
    </p>

    <p>
      Based on the information provided by you, your 
      <strong>Borrower Intelligence (BI) Rating</strong> 
      has been evaluated.
    </p>

    <hr />

    <h3 style="color:#1d4ed8;">Your BI Rating Summary</h3>

    <p><strong>BI Score:</strong> ${biScore} / 100</p>
    <p>
      <strong>Risk Category:</strong>
      <span style="color:${getRiskColor(riskBand)}; font-weight:bold;">
        ${riskBand}
      </span>
    </p>

    <hr />

    <h4>Score Breakdown (Internal Assessment)</h4>
    <ul>
      <li>Profile Stability: ${breakdown.profile ?? 0}</li>
      <li>Employment / Business Strength: ${breakdown.work ?? 0}</li>
      <li>Credit Behaviour: ${breakdown.credit ?? 0}</li>
      <li>Banking Behaviour: ${breakdown.banking ?? 0}</li>
      <li>Financial Strength: ${breakdown.strength ?? 0}</li>
    </ul>

    <hr />

    <h3>Your Submitted Details</h3>

    <h4>Profile Details</h4>
    <ul>
      <li>Name: ${fullName}</li>
      <li>Age: ${age}</li>
      <li>Mobile: ${mobile}</li>
      <li>Email: ${email}</li>
      <li>Applicant Type: ${applicantType}</li>
    </ul>

    ${
      applicantType === "Salaried"
        ? `
        <h4>Employment Details</h4>
        <ul>
          <li>Total Experience: ${totalExperience ?? "-"} years</li>
          <li>Current Organisation Experience: ${currentOrgExperience ?? "-"} years</li>
          <li>Employer Type: ${employerType ?? "-"}</li>
          <li>Designation: ${designation ?? "-"}</li>
        </ul>
      `
        : `
        <h4>Business Details</h4>
        <ul>
          <li>Business Experience: ${businessExperience ?? "-"} years</li>
          <li>GST Registered: ${gstRegistered ? "Yes" : "No"}</li>
          <li>GST Vintage: ${gstVintage ?? "-"}</li>
          <li>Turnover Trend: ${turnoverTrend ?? "-"}</li>
          <li>Profit Trend: ${profitTrend ?? "-"}</li>
          <li>Capital / Net Worth Trend: ${capitalTrend ?? "-"}</li>
        </ul>
      `
    }

    <h4>Credit & Banking Behaviour</h4>
    <ul>
      <li>CIBIL Score: ${cibilScore}</li>
      <li>Running Loans: ${runningLoans}</li>
      <li>Closed Loans: ${closedLoans}</li>
      <li>Cheque / EMI Bounces (Last 6 Months): ${bounces6Months}</li>
      <li>Cheque / EMI Bounces (Last 3 Months): ${bounces3Months}</li>
      <li>Average Bank Balance: ${avgBankBalance}</li>
    </ul>

    <h4>Financial Strength</h4>
    <ul>
      <li>Total Assets: ₹${totalAssets}</li>
      <li>Total Outstanding Loans: ₹${totalOutstandingLoans}</li>
      <li>Net Worth to Borrowing Ratio: ${netWorthBorrowingRatio}</li>
    </ul>

    <hr />

    <p style="font-size:13px; color:#555;">
      <em>
        This BI Rating is indicative in nature and based on the information
        provided by you. Final lending decisions are subject to bank policies,
        verification, and credit appraisal.
      </em>
    </p>

    <p>
      Regards,<br />
      <strong>BI Rating Team</strong>
    </p>

  </div>
  `;

  await resend.emails.send({
    from: "BI Rating <onboarding@resend.dev>",
    to: ["amit4321sg@gmail.com"],
    subject: `${fullName} | Your BI Rating Result | Score: ${biScore}`,
    html: mailBody,
  });
};