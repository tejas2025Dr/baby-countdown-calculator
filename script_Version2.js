
function calculate() {
  const lmpDate = new Date(document.getElementById('lmpDate').value);
  const today = new Date();

  // Calculate EDD (LMP + 280 days)
  const edd = new Date(lmpDate);
  edd.setDate(edd.getDate() + 280);

  // Calculate weeks and days (POG)
  const timeDiff = today - lmpDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(daysDiff / 7);
  const days = daysDiff % 7;

  // Determine trimester
  let trimester = "";
  if (weeks < 13) trimester = "First Trimester";
  else if (weeks < 28) trimester = "Second Trimester";
  else if (weeks <= 40) trimester = "Third Trimester";
  else trimester = "Post-term";

  // Get advice based on trimester
  const advice = getAdvice(trimester);

  // Display results
  document.getElementById('edd').textContent = edd.toLocaleDateString();
  document.getElementById('pog').textContent = `${weeks} weeks and ${days} days`;
  document.getElementById('trimester').textContent = trimester;
  document.getElementById('advice').innerHTML = advice;

  // Show result box with animation
  const resultBox = document.getElementById('resultBox');
  resultBox.style.display = 'block';
  resultBox.style.animation = 'fadeIn 0.5s';
}

function getAdvice(trimester) {
  switch(trimester) {
    case "First Trimester":
      return `
        <ul>
          <li>Folic acid 400–600 mcg daily</li>
          <li>Dating scan at 7–9 weeks</li>
          <li>Blood group, CBC, RBS, HBsAg, HIV, VDRL, TSH</li>
          <li>Urine routine & culture</li>
          <li>Advise rest, avoid teratogens</li>
          <li>1st dose of TT or Td</li>
        </ul>`;
    case "Second Trimester":
      return `
        <ul>
          <li>Iron + Folic acid tablets</li>
          <li>Anomaly scan at 18–22 weeks</li>
          <li>Blood pressure, weight monitoring</li>
          <li>Double/Triple marker test</li>
          <li>2nd dose of TT/Td</li>
        </ul>`;
    case "Third Trimester":
      return `
        <ul>
          <li>Iron and calcium supplementation</li>
          <li>Growth scan at 32–36 weeks</li>
          <li>Blood pressure monitoring</li>
          <li>Review fetal movements</li>
          <li>Prepare for labor signs</li>
        </ul>`;
    default:
      return "<p>Please consult your healthcare provider.</p>";
  }
}

// Hide result box initially
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('resultBox').style.display = 'none';
});
