const fs = require('fs');
let code = fs.readFileSync('src/components/MobileLayout.tsx', 'utf8');

code = code.replace(
  /<div className="flex items-center gap-4 text-slate-800 text-\[26px\] cursor-pointer">/,
  `<div className="flex items-center gap-3 text-slate-800 text-[26px] cursor-pointer">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 outline-none hover:text-primary transition"><i className="ph ph-magnifying-glass"></i></button>`
);

code = code.replace(
  /<div className="flex gap-2">\s*<div className="flex-1 rounded-full overflow-hidden border border-slate-200 bg-slate-50\/80 focus-within:border-primary\/50 focus-within:bg-white transition-all shadow-sm flex items-center px-4">\s*<i className="ph ph-magnifying-glass text-xl text-slate-400"><\/i>\s*<input type="text" placeholder="Search for products\.\.\." className="w-full bg-transparent px-3 py-3 text-\[14px\] outline-none text-slate-700 font-medium" \/>\s*<\/div>\s*<button className="bg-primary hover:bg-brand-dark text-white w-12 rounded-full transition-colors flex items-center justify-center shadow-md">\s*<i className="ph ph-faders text-xl"><\/i>\s*<\/button>\s*<\/div>/,
  `<div className={\`overflow-hidden transition-all duration-300 ease-in-out \${isSearchOpen ? 'max-h-[60px] opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0 mt-0 mb-0'}\`}>
              <div className="flex gap-2">
                <div className="flex-1 rounded-full overflow-hidden border border-slate-200 bg-slate-50/80 focus-within:border-primary/50 focus-within:bg-white transition-all shadow-sm flex items-center px-4">
                  <i className="ph ph-magnifying-glass text-xl text-slate-400"></i>
                  <input type="text" placeholder="Search for products..." className="w-full bg-transparent px-3 py-3 text-[14px] outline-none text-slate-700 font-medium" />
                </div>
                <button className="bg-primary hover:bg-brand-dark text-white w-12 rounded-full transition-colors flex items-center justify-center shadow-md">
                  <i className="ph ph-faders text-xl"></i>
                </button>
              </div>
            </div>`
);

fs.writeFileSync('src/components/MobileLayout.tsx', code);
