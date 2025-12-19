const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const lang = process.argv[2];
const role = process.argv[3];

if (!lang || !role) {
    console.error("Usage: node export.js <en|es> <role>");
    process.exit(1);
}

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, `../outputs/${lang}`);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = `outputs/${lang}/wilmer_${role}.pdf`;

console.log(`▶ Generating resume for ${lang} / ${role}`);

execSync(`node build/merge.js ${lang} ${role}`, { stdio: "inherit" });

fs.copyFileSync("resume/final/resume.final.json", "resume.json");

execSync(
    `npx resume export ${outputFile} --theme stackoverflow`,
    { stdio: "inherit" }
);

fs.unlinkSync("resume.json");

console.log(`✅ PDF generated: ${outputFile}`);
