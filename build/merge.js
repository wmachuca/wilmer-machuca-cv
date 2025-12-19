const fs = require("fs");
const path = require("path");

const lang = process.argv[2];
const role = process.argv[3];

if (!lang || !role) {
  console.error("Usage: node merge.js <en|es> <role>");
  process.exit(1);
}

// Load configuration file
const configPath = path.join(__dirname, "../config.json");
if (!fs.existsSync(configPath)) {
  console.error("❌ Error: config.json not found!");
  console.error("Please copy config.example.json to config.json and add your personal information.");
  process.exit(1);
}
const config = require("../config.json");

// Load files
const base = require("../resume/base.json");
const i18n = require(`../resume/i18n/${lang}.json`);
const roleConfig = require(`../resume/roles/${role}.json`);

// Merge basics with personal data from config
const mergedBasics = {
  ...base.basics,
  ...config.personal,
  ...i18n.basics
};

// Merge work experience based on role order
const mergedWork = roleConfig.workOrder.map(id => {
  const baseJob = base.work.find(w => w.id === id);
  const localizedJob = i18n.work[id];

  if (!baseJob || !localizedJob) {
    throw new Error(`Missing work entry for id: ${id}`);
  }

  return {
    company: baseJob.company,
    position: localizedJob.position,
    startDate: baseJob.startDate,
    endDate: baseJob.endDate,
    summary: localizedJob.summary,
    highlights: localizedJob.highlights
  };
});

// Filter skills based on role and convert level to string for theme compatibility
const filteredSkills = (roleConfig.skillsFilter
  ? base.skills.filter(skill => roleConfig.skillsFilter.includes(skill.name))
  : base.skills
).map(skill => ({
  ...skill,
  level: skill.level ? String(skill.level) : undefined
}));

// Merge education with translations
const mergedEducation = base.education.map(edu => {
  const eduTranslation = i18n.education?.[edu.id];
  return {
    ...edu,
    ...(eduTranslation && { summary: eduTranslation.summary })
  };
});

// Merge certificates with translations
const mergedCertificates = base.certificates?.map(cert => {
  const certKey = cert.name.toLowerCase().includes('scrum') ? 'scrum-sfpc' : null;
  const certTranslation = certKey ? i18n.certificates?.[certKey] : null;
  return {
    ...cert,
    ...(certTranslation && { description: certTranslation.description })
  };
}) || [];

// Convert language levels to strings for theme compatibility
const mergedLanguages = base.languages.map(lang => ({
  ...lang,
  level: lang.level ? String(lang.level) : undefined
}));

// Build final resume
const finalResume = {
  basics: mergedBasics,
  work: mergedWork,
  education: mergedEducation,
  certificates: mergedCertificates.length > 0 ? mergedCertificates : undefined,
  skills: filteredSkills,
  languages: mergedLanguages
};

// Write output
const outputPath = path.join(__dirname, "../resume/final/resume.final.json");
fs.writeFileSync(outputPath, JSON.stringify(finalResume, null, 2));

console.log(`✅ Resume merged successfully (${lang} / ${role})`);
console.log(`   Output: resume/final/resume.final.json`);
