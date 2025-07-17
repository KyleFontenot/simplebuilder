import {readFileSync, readdirSync, lstatSync, copyFileSync, writeFileSync, mkdirSync, rmSync} from "node:fs"
import writeFileRecursive from "./pathutils/writeFile"
import relative from "./pathutils/relative"
import walkStructure from "./walk"

const root = import.meta.url

const buildFolder = relative("./build/")

function constructBaseHTML(){
  try {
    return readFileSync(relative("./src/template.html"), "utf-8")
  }
  catch(e){
    throw Error("Requires a template.html in ./src/");
  }
}

async function build(){
  const startbuild = performance.now();

  const template = constructBaseHTML();
  rmSync(buildFolder, { recursive: true });
  mkdirSync(buildFolder, { recursive: true });
  walkStructure(template, buildFolder);

  const endbuild = performance.now();

  console.log("Done")
  console.log(`Built in ${endbuild - startbuild}ms`);
}

await build()
