import {readFileSync, readdirSync, lstatSync, copyFileSync, writeFileSync, mkdirSync, rmSync} from "node:fs"
import {join, resolve, dirname} from "node:path"
import * as marked from "marked"
import { nanoid } from 'nanoid/non-secure'

import writeFileRecursive from "./pathutils/writeFile"
import relative from "./pathutils/relative"

export default function walkStructure(template: string, buildFolder: string){
  rmSync(buildFolder, { recursive: true });

  const startpoint = "./src/routes/"
  
  async function beginWalk(start: string){
    const absLocation = resolve(start);
    const treeLocation = start.replace(/^(?:\.\.?\/|\/)*(?:.*\.\.\/)*/, '');

    const walk = async (pathname: string) => {
      const filesInDir = readdirSync(join(absLocation, pathname));
  
      const aggregate = await Promise.allSettled(filesInDir.map(async (file) => {
        const absoluteFile = join(absLocation, pathname, file);
        const child = join(pathname, file);
        if (lstatSync(absoluteFile).isDirectory()) {
          walk(child)
        }
        else {
          const extension = file.substring(file.lastIndexOf('.'));
          switch (extension) {
              case '.html':
                const contentHtml = readFileSync(absoluteFile, "utf-8");

                if(file.startsWith("+")){
                  // Slots??
                  // if(contentHtml.match(/%([^%]+)%/g).length > 0){
                    // const slots = [...contentHtml.matchAll(/%([^%]+)%/g)].map(match => match[1]);

                  // }

                  // Other processing:
                  // Could add in styling with css modules-like scoping here using the style tag.
                  // Could add in SSR determinations from script tags.
                
                  const injected = template.replace(/%body%/g, contentHtml)
                  try{
                    writeFileRecursive(join(buildFolder, pathname, 'index.html'), injected)
                    console.log(`Route made: ${pathname}`)
                  }
                  catch(e){
                    console.error(e)
                  }
                }
                else {
                    // write to WebComponent
                }
                  break;
              case '.md':
                
                const contentMd = readFileSync(absoluteFile, "utf-8");
                if(file.startsWith("+")){
                    const mdParsed = await marked.parse(contentMd);
                    const injected = template.replace(/%body%/g, mdParsed)
                    writeFileRecursive(join(buildFolder, pathname, 'index.html'), injected)
                  }
                  else {
                    // write to WebComponent
                  }
                break
              case '.jpg':
              case '.png':
              case '.webp':
              case '.avif':
              case '.json':
              case '.pdf':
                copyFileSync(join(absoluteFile), join(buildFolder, file))
                  break;
              default:
                  console.log("Unknown file type");
          }
  
        }
      })
    );
    }
    walk('').then(d => {
      console.log("Finished walking");
    });
  }

  // Can keep track of all routes made as it walks
  // let acc = {}

  const filesInDir = beginWalk(startpoint);
}