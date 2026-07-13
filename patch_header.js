const fs = require('fs');
let code = fs.readFileSync('src/components/MobileLayout.tsx', 'utf8');

// The fashion header search icon:
// <i className="ph ph-magnifying-glass hover:text-blue-500 transition p-1"></i>
code = code.replace(
  /<i className="ph ph-magnifying-glass hover:text-blue-500 transition p-1"><\/i>/g,
  '<button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 outline-none"><i className="ph ph-magnifying-glass hover:text-emerald-500 transition"></i></button>'
);

// The fashion header search bar:
// <div className="flex mt-2 rounded-[1.25rem] overflow-hidden border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
code = code.replace(
  /<div className="flex mt-2 rounded-\[1.25rem\] overflow-hidden border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500\/10 transition-all shadow-sm">[\s\S]*?<\/div>/,
  `<div className={\`overflow-hidden transition-all duration-300 ease-in-out \${isSearchOpen ? 'max-h-[60px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}\`}>
              <div className="flex rounded-full overflow-hidden border border-slate-200 bg-slate-50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all shadow-sm">
                <input type="text" placeholder="আপনি কী খুঁজছেন?" className="w-full bg-transparent px-4 py-2.5 text-[14px] outline-none font-medium" />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 transition-colors flex items-center justify-center"><i className="ph ph-magnifying-glass text-lg"></i></button>
              </div>
            </div>`
);

fs.writeFileSync('src/components/MobileLayout.tsx', code);
