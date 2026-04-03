const fs = require('fs');
const path = require('path');

const collectionData = JSON.parse(fs.readFileSync('admin-all-apis.collection.json', 'utf8'));

// 1. Extract endpoints from postman collection
const extractApis = (items, prefix = '') => {
  let apis = [];
  for (const item of items) {
    if (item.request) {
      let method = item.request.method;
      let url = '';
      if (item.request.url && item.request.url.raw) {
        url = item.request.url.raw.replace(/{{.+}}\//, '');
      } else if (item.request.url && item.request.url.path) {
        url = item.request.url.path.join('/');
      }
      apis.push({
        name: prefix + item.name,
        method,
        url: url,
        path: '/' + url.split('?')[0].replace(/https?:\/\/[^\/]+\//, ''), // simplify path for matching
      });
    } else if (item.item) {
      apis = apis.concat(extractApis(item.item, prefix + item.name + ' > '));
    }
  }
  return apis;
};

const allApis = extractApis(collectionData.item);

// 2. Walk through frontend/src/modules/admin
const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
      filelist.push(filepath);
    }
  }
  return filelist;
};

const adminFiles = walkSync(path.join('frontend', 'src', 'modules', 'admin'));

// 3. Analyze each file
const pageStatus = [];
let totalImplementedApis = new Set();

const staticDataIndicators = [
  /mockData/i, /dummyData/i, /const\s+\w+\s*=\s*\[\s*{\s*id:/i,
  /const\s+\w+\s*=\s*\[\s*{\s*name:/i,
  /Dummy/i,
];

for (const file of adminFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const filename = path.basename(file);
  const isPage = file.includes('\\pages\\') || file.includes('/pages/');
  
  if (!isPage) continue;

  const hasFetch = content.includes('fetch(') || content.includes('axios');
  let hasStaticData = false;
  for (const regex of staticDataIndicators) {
    if (regex.test(content)) {
      hasStaticData = true;
      break;
    }
  }

  // Check which APIs are hit
  let apisHitInFile = [];
  for (const api of allApis) {
    // A simplified heuristic: check if the unique part of the api path exists in the file
    // e.g., '/admin/users'
    const matchPath = api.path.replace(/::[a-zA-Z0-9_]+/g, '').replace(/:[a-zA-Z0-9_]+/g, ''); 
    if (matchPath.length > 5 && content.includes(matchPath)) {
      apisHitInFile.push(api);
      totalImplementedApis.add(api.name);
    }
  }

  pageStatus.push({
    file: file.replace(/^.*modules[/\\]admin[/\\]/, ''),
    hasFetch,
    hasStaticData,
    apisHitCount: apisHitInFile.length,
    apisHitDetail: apisHitInFile.map(a => a.name)
  });
}

// 4. Generate Report
let report = `# Admin Panel API & Implementation Analysis Report\n\n`;

report += `## 1. API Collection Summary\n`;
report += `- Total APIs defined in Postman Collection: **${allApis.length}**\n`;
report += `- Estimated APIs integrated in Admin Frontend: **${totalImplementedApis.size}**\n`;
report += `- Pending APIs: **${allApis.length - totalImplementedApis.size}**\n\n`;

report += `## 2. Page Level Analysis\n`;
report += `Below is a breakdown of pages inside the \`admin/pages\` directory, highlighting data fetching methods, gaps, and static data usage.\n\n`;

report += `| Page File | Has API Request? | Has Static Data? | Extracted APIs Linked |\n`;
report += `|---|---|---|---|\n`;

let pagesWithStaticData = [];
let pagesWithoutApis = [];

pageStatus.forEach(p => {
  const fetchStatus = p.hasFetch ? '🟢 Yes' : '🔴 No';
  const staticStatus = p.hasStaticData ? '⚠️ Yes' : '✅ No';
  const apiLinks = p.apisHitCount > 0 ? p.apisHitCount + ' APIs' : 'None detected';
  
  report += `| \`${p.file}\` | ${fetchStatus} | ${staticStatus} | ${apiLinks} |\n`;

  if (p.hasStaticData) pagesWithStaticData.push(p.file);
  if (!p.hasFetch) pagesWithoutApis.push(p.file);
});

report += `\n## 3. Notable Gaps & Static Data Usage\n`;
report += `### Pages likely using Static/Dummy Data:\n`;
if (pagesWithStaticData.length === 0) report += `- None detected via static heuristics.\n`;
pagesWithStaticData.forEach(p => report += `- \`${p}\`\n`);

report += `\n### Pages with NO backend API calls mapped:\n`;
if (pagesWithoutApis.length === 0) report += `- All pages seem to have some API calls.\n`;
pagesWithoutApis.forEach(p => report += `- \`${p}\`\n`);

report += `\n## 4. API Coverage (Implemented vs Pending)\n`;
report += `*Note: The matching algorithm uses path heuristics and might miss dynamic path generation or generic utility fetchers.* \n`;

report += `\n### 🚀 Partially/Fully Covered Domains in Frontend\n`;
const coveredApisList = Array.from(totalImplementedApis);
coveredApisList.slice(0, 30).forEach(a => report += `- ${a}\n`);
if (coveredApisList.length > 30) report += `- *...and ${coveredApisList.length - 30} more.*\n`;

report += `\n### ❌ Missing/Pending API Implementations\n`;
const missingApisList = allApis.filter(a => !totalImplementedApis.has(a.name));
missingApisList.slice(0, 30).forEach(a => report += `- ${a.name}\n`);
if (missingApisList.length > 30) report += `- *...and ${missingApisList.length - 30} more.*\n`;

report += `\n## 5. Overview & Conclusion\n`;
report += `- **Are APIs working properly?**: Pages making \`fetch()\` calls to the backend structure indicate progressing integration. However, error handling and exact correctness depend on the backend state. Pages listed with NO fetch calls or YES for static data are clear gaps.\n`;
report += `- **Work Left**: Implement the remaining endpoints replacing mock arrays. Link remaining pages to backend.\n`;

fs.writeFileSync('admin_analysis_report.md', report, 'utf8');
console.log('Report generated at admin_analysis_report.md');
