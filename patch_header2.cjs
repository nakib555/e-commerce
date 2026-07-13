const fs = require('fs');
let code = fs.readFileSync('src/components/MobileLayout.tsx', 'utf8');

// The grocery header search icon:
// <button className="hover:text-emerald-600 transition">\n                  <i className="ph ph-magnifying-glass"></i>\n                </button>
code = code.replace(
  /<button className="hover:text-emerald-600 transition">\s*<i className="ph ph-magnifying-glass"><\/i>\s*<\/button>/g,
  '<button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-emerald-600 transition outline-none"><i className="ph ph-magnifying-glass"></i></button>'
);

// The grocery header search bar:
// <div className="flex mt-3 rounded-[1.25rem] overflow-hidden border-2 border-emerald-100 bg-white focus-within:border-emerald-500 transition-all shadow-sm">
code = code.replace(
  /<div className="flex mt-3 rounded-\[1.25rem\] overflow-hidden border-2 border-emerald-100 bg-white focus-within:border-emerald-500 transition-all shadow-sm">[\s\S]*?<\/div>/,
  `<div className={\`overflow-hidden transition-all duration-300 ease-in-out \${isSearchOpen ? 'max-h-[60px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}\`}>
              <div className="flex rounded-[1.25rem] overflow-hidden border-2 border-emerald-100 bg-white focus-within:border-emerald-500 transition-all shadow-sm">
                <input type="text" placeholder="কী খুঁজছেন?" className="w-full bg-transparent px-4 py-3 text-[15px] outline-none font-medium" />
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 transition-colors flex items-center justify-center">
                  <i className="ph ph-magnifying-glass text-xl"></i>
                </button>
              </div>
            </div>`
);

fs.writeFileSync('src/components/MobileLayout.tsx', code);
