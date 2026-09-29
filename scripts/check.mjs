import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['index.html','about.html','practice-areas.html','managing-partner.html','insights.html','contact.html','privacy.html','terms.html','404.html'];
const errors=[];
for(const f of required){if(!fs.existsSync(path.join(root,f)))errors.push(`Missing ${f}`)}
for(const file of required){
  if(!fs.existsSync(path.join(root,file)))continue;
  const txt=fs.readFileSync(path.join(root,file),'utf8');
  if(!txt.includes('<meta name="viewport"'))errors.push(`${file}: viewport missing`);
  if(!txt.includes('/assets/css/site.css'))errors.push(`${file}: stylesheet missing`);
  if(!txt.includes('Wanjiru Ngulukyo'))errors.push(`${file}: Wanjiru Ngulukyo brand missing`);
  if(/Cecilia Mwaura|A\.W Ndung|Muriithi S\. Kiragu/i.test(txt))errors.push(`${file}: template/client residue found`);
  for(const m of txt.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)){
    const target=path.join(root,m[1].slice(1));
    if(!fs.existsSync(target))errors.push(`${file}: broken local asset ${m[1]}`);
  }
}
const css=fs.readFileSync(path.join(root,'assets/css/site.css'),'utf8');
for(const token of ['.hero{','.practice-grid{','.partner-grid{','.contact-rail{','@media(max-width:720px)'])if(!css.includes(token))errors.push(`Cecilia template CSS token missing: ${token}`);
for(const f of ['assets/video/logo-animation-4k.mp4','assets/video/logo-animation-mobile.webp','assets/images/portrait-hero.webp','assets/images/monogram-white.png','assets/images/logo-white.png','assets/images/office-building-1.webp'])if(!fs.existsSync(path.join(root,f)))errors.push(`Missing ${f}`);
if(errors.length){console.error('\nCHECK FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log('CHECK PASSED: Cecilia template structure present, Wanjiru Ngulukyo branding verified, local assets and mobile logo animation verified.');
