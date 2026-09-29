import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
for(const item of fs.readdirSync(root)){
  if(['dist','scripts','.git','node_modules'].includes(item))continue;
  if(['package.json','package-lock.json','TERMINAL_COMMANDS.txt','README.md','RESEARCH_NOTES.md'].includes(item))continue;
  fs.cpSync(path.join(root,item),path.join(out,item),{recursive:true});
}
console.log('Built static site to dist/');
