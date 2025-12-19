# Wilmer Machuca - CV as Code

Professional resume managed as code using the [JSON Resume](https://jsonresume.org/) standard.

## Philosophy

This repository implements the "CV as Code" approach:

- **Single Source of Truth**: All professional information is maintained in structured JSON files
- **Multi-role Support**: Generate tailored resumes for different professional roles (Architect, Senior Engineer, Tech Lead)
- **Multi-language**: Full support for English and Spanish with proper i18n separation
- **Version Control**: Track changes over time with Git
- **Automated Generation**: Build and generate PDFs programmatically
- **Skills Management**: Organized skills by categories with proficiency levels (1-10)

## Project Structure

```
wilmer-machuca-cv/
├── config.json              # Personal data (PRIVATE - ignored by git)
├── config.example.json      # Template for personal configuration
│
├── resume/
│   ├── base.json           # Professional data (dates, companies, IDs)
│   ├── i18n/               # Translations
│   │   ├── en.json         # English translations
│   │   └── es.json         # Spanish translations
│   ├── roles/              # Role configurations (text-free)
│   │   ├── architect.json
│   │   ├── senior-engineer.json
│   │   └── tech-lead.json
│   └── final/              # Generated merged files (ignored by git)
│       └── resume.final.json
│
├── build/                   # Build scripts
│   ├── merge.js            # Merges config + base + i18n + role
│   └── export.js           # Exports to PDF
│
├── outputs/                 # Generated PDFs (ignored by git)
│   ├── en/                 # English PDFs
│   └── es/                 # Spanish PDFs
│
├── .gitignore
├── package.json
└── README.md
```

### Privacy & Security

**Personal Information Protection:**
- ✅ `config.json` - Contains your personal data (name, email, phone, etc.) - **NEVER committed to git**
- ✅ `config.example.json` - Public template without real data - **Safe to commit**
- ✅ `resume/base.json` - Only professional history (no personal identifiers) - **Safe to commit**

This allows you to:
- Fork and share this repository publicly
- Keep your personal information private
- Easily update your contact details without editing multiple files

### Architecture Principles

This structure follows professional i18n patterns:

1. **Separation of Concerns**:
   - `base.json` - Only language-agnostic data (IDs, dates, companies, technical names, skill levels)
   - `i18n/` - All translatable text (positions, summaries, highlights)
   - `roles/` - Configuration only (workOrder, skillsFilter)

2. **Text-Free Roles**: Role files never contain text, only configuration:
   - `workOrder` - Which jobs to show and in what order
   - `skillsFilter` - Which skill categories to highlight

3. **Skills Organization**: Skills grouped by categories with keywords
   - Backend Development
   - Software Architecture
   - AI & Machine Learning
   - Cloud & DevOps
   - Data & Messaging

4. **Clean Merging**: Build process combines base + translations + role config

## Supported Roles

### 1. **Software Architect** (4 experiences)
Focus on architecture, system design, and technical leadership. Highlights experience with:
- Microservices Architecture
- Domain-Driven Design
- Event-Driven Architecture
- AI & Machine Learning integration

### 2. **Senior Software Engineer** (10 experiences)
Comprehensive development history showcasing full technical career. Emphasizes:
- Backend Development expertise
- Full development lifecycle experience
- Multiple technology stacks

### 3. **Tech Lead** (4 experiences)
Balance between technical expertise and leadership. Features:
- Software Architecture skills
- Team leadership
- Technical decision-making

## Supported Languages

- **English** (`en`) - Third person in highlights
- **Spanish** (`es`) - First person in highlights (more natural for Latin American market)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Initial Setup

1. **Clone the repository**
```bash
git clone https://github.com/wmachuca/wilmer-machuca-cv.git
cd wilmer-machuca-cv
```

2. **Install dependencies**
```bash
npm install
```

This will install:
- `resume-cli` - For PDF generation
- `jsonresume-theme-stackoverflow` - Default theme

3. **Configure personal information** ⚠️ **IMPORTANT**
```bash
# Copy the example configuration file
cp config.example.json config.json

# Edit config.json with your personal information
# Update: name, email, phone, location, and social profiles
```

**Required fields in `config.json`:**
```json
{
  "personal": {
    "name": "Your Full Name",
    "email": "your.email@example.com",
    "phone": "+XX XXX XXX XXXX",
    "location": {
      "address": "Your Address",
      "city": "Your City",
      "countryCode": "CO"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "yourusername",
        "url": "https://linkedin.com/in/yourusername"
      },
      {
        "network": "GitHub",
        "username": "yourusername",
        "url": "https://github.com/yourusername"
      }
    ]
  }
}
```

**Note**: `config.json` is ignored by git to keep your personal information private.

4. **Verify installation**
```bash
# Test merge
node build/merge.js en architect

# Test PDF generation
node build/export.js en architect
```

You should see:
- `resume/final/resume.final.json` generated with your personal data
- `outputs/en/wilmer_architect.pdf` created

## Usage

### Generating Resumes

#### Quick Commands

```bash
# Generate PDF for specific role and language
node build/export.js <language> <role>

# Examples:
node build/export.js en architect        # English Architect
node build/export.js es senior-engineer  # Spanish Senior Engineer
node build/export.js en tech-lead        # English Tech Lead
```

#### Available Combinations

**Roles:** `architect`, `senior-engineer`, `tech-lead`
**Languages:** `en`, `es`

This gives you 6 possible resume variants:
- `wilmer_architect.pdf` (en/es)
- `wilmer_senior-engineer.pdf` (en/es)
- `wilmer_tech-lead.pdf` (en/es)

### Customizing Your Resume

#### 1. Edit Base Data (`resume/base.json`)

Update language-agnostic information:

```json
{
  "basics": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "phone": "+57 XXX XXX XXXX"
  },
  "work": [
    {
      "id": "company-role",
      "company": "Company Name",
      "location": "City",
      "startDate": "2024-01",
      "endDate": null
    }
  ]
}
```

**Important**: Only add data that doesn't change between languages (dates, companies, technical skill names).

#### 2. Update Translations

**English** (`resume/i18n/en.json`):
```json
{
  "work": {
    "company-role": {
      "position": "Software Engineer",
      "summary": "Brief role description",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  }
}
```

**Spanish** (`resume/i18n/es.json`):
```json
{
  "work": {
    "company-role": {
      "position": "Ingeniero de Software",
      "summary": "Breve descripción del rol",
      "highlights": [
        "Logré el resultado 1",
        "Implementé la solución 2"
      ]
    }
  }
}
```

**Note**: Spanish uses first person ("Desarrollé", "Implementé") in highlights.

#### 3. Configure Roles

Edit role configurations to show relevant experiences:

```json
{
  "workOrder": [
    "most-recent-job",
    "previous-job",
    "older-job"
  ],
  "skillsFilter": [
    "Backend Development",
    "Software Architecture",
    "AI & Machine Learning"
  ]
}
```

#### 4. Generate and Test

```bash
# Merge only (no PDF)
node build/merge.js en architect

# Check output
cat resume/final/resume.final.json

# Generate PDF
node build/export.js en architect
```

### Skills Management

Skills are organized by categories with proficiency levels (1-10):

```json
{
  "name": "Backend Development",
  "level": 9,
  "keywords": [
    "Java / Spring Boot",
    "Python / FastAPI",
    "RESTful APIs"
  ]
}
```

**Levels Guide:**
- 9-10: Expert / Master
- 7-8: Advanced / Proficient
- 5-6: Intermediate
- 3-4: Basic knowledge

## Development Workflow

### Making Updates

1. **Update base data**
```bash
# Edit resume/base.json
# Add new job, education, or skill
```

2. **Add translations**
```bash
# Edit resume/i18n/en.json
# Edit resume/i18n/es.json
```

3. **Update role configurations**
```bash
# Edit resume/roles/*.json
# Add new job IDs to workOrder
```

4. **Test changes**
```bash
node build/merge.js en architect
node build/export.js en architect
```

5. **Commit changes**
```bash
git add resume/
git commit -m "Update experience: Add new role at Company X"
git push
```

**Note**: The `outputs/` folder is ignored by git. PDFs are generated on-demand.

## Project Scripts

```bash
# Merge base + i18n + role (no PDF)
node build/merge.js <lang> <role>

# Generate PDF (includes merge)
node build/export.js <lang> <role>
```

## Advanced Configuration

### Adding a New Role

1. Create `resume/roles/new-role.json`:
```json
{
  "workOrder": ["job1", "job2", "job3"],
  "skillsFilter": ["Skill Category 1", "Skill Category 2"]
}
```

2. Generate resume:
```bash
node build/export.js en new-role
```

### Adding a New Language

1. Create `resume/i18n/fr.json` (example: French)
2. Translate all work experiences and education
3. Generate:
```bash
node build/export.js fr architect
```

### Changing PDF Theme

Edit `build/export.js` and change the theme:

```javascript
execSync(
  `npx resume export ${outputFile} --theme elegant`,
  { stdio: "inherit" }
);
```

Available themes: `elegant`, `stackoverflow`, `kendall`, `flat`, `short`, etc.

## Troubleshooting

### Config.json not found

Error: `❌ Error: config.json not found!`

This happens when you haven't created your personal configuration file yet.

**Solution:**
```bash
# Copy the example configuration
cp config.example.json config.json

# Edit with your personal information
nano config.json  # or use your preferred editor
```

Make sure to update all fields in `config.json`:
- `name` - Your full name
- `email` - Your email address
- `phone` - Your phone number
- `location` - Your address, city, and country code
- `profiles` - Your LinkedIn and GitHub URLs

### PDFs not generating

```bash
# Reinstall resume-cli
npm install -g resume-cli

# Test manually
npx resume export resume/final/resume.final.json --theme stackoverflow
```

### Merge errors

```bash
# Check JSON syntax
node -e "require('./resume/base.json')"
node -e "require('./resume/i18n/en.json')"
node -e "require('./config.json')"
```

### Missing work entries

Error: `Missing work entry for id: xxx`

- Check that the job ID exists in `base.json`
- Check that translations exist in `i18n/en.json` and `i18n/es.json`
- Check that the role's `workOrder` uses the correct ID

## JSON Resume Schema

This project follows the [JSON Resume schema v1.0.0](https://jsonresume.org/schema/).

Key sections:
- `basics` - Personal information, contact details, profiles
- `work` - Work experience with highlights
- `education` - Educational background with summaries
- `skills` - Technical skills organized by categories
- `certificates` - Professional certifications
- `languages` - Spoken languages with proficiency levels

## Features Implemented

- ✅ Multi-language support (English/Spanish)
- ✅ Multi-role configurations
- ✅ i18n architecture with proper separation
- ✅ Skills categorization with keywords
- ✅ Proficiency levels (1-10) for skills and languages
- ✅ Automatic PDF generation
- ✅ Multiple education entries support
- ✅ First-person highlights in Spanish
- ✅ Auto-creation of output directories
- ✅ GitHub profile integration

## License

MIT

## Contact

**Wilmer Machuca**
Senior Software Engineer & Software Architect

- **Email**: wmachucap@gmail.com
- **LinkedIn**: [linkedin.com/in/wmachuca](https://linkedin.com/in/wmachuca)
- **GitHub**: [github.com/wmachuca](https://github.com/wmachuca)

---

*Generated with ❤️ using JSON Resume and Node.js*
