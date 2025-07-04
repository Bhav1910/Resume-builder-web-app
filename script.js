
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value.split(",");
  const experience = document.getElementById("experience").value;
  const projects = document.getElementById("projects").value;

  const resumeHTML = `
    <h2>${name}</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Education:</strong> ${education}</p>
    <p><strong>Skills:</strong></p>
    <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join("")}</ul>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Projects:</strong> ${projects}</p>
  `;

  document.getElementById("resumeOutput").innerHTML = resumeHTML;
});
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
document.getElementById("downloadPdf").addEventListener("click", () => {
  const element = document.getElementById("resumeOutput");

  if (element.innerHTML.trim() === "") {
    alert("Please generate a resume first.");
    return;
  }

  if (typeof html2pdf === "undefined") {
    alert("PDF library not loaded. Please include html2pdf.js in your HTML.");
    return;
  }

  html2pdf()
    .from(element)
    .set({
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .save();
});