const fs = require('fs');
let code = fs.readFileSync('src/components/MobileLayout.tsx', 'utf8');

// Replace Fashion footer part
code = code.replace(
  /<section className="px-5 pb-5 mt-2">[\s\S]*?<\/footer>/,
  '<TrustAndFaq />\n            <Newsletter />\n            <Footer />'
);

// Replace Grocery footer part
code = code.replace(
  /<section className="mt-8 px-5">\s*<div className="bg-brand-emerald[\s\S]*?<\/footer>/,
  '<TrustAndFaq />\n            <Newsletter />\n            <Footer />'
);

fs.writeFileSync('src/components/MobileLayout.tsx', code);
