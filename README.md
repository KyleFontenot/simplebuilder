# To use:

1. Make sure you have Node installed. ([fnm is great](https://github.com/Schniz/fnm) and easy. with fnm is installed, just run `fnm install 20` or 22, which Node version you want. )
2. in the folder you want to clone this as a new folder: `git clone https://github.com/KyleFontenot/simplebuilder.git --depth=1`
3. `cd simplebuilder` 
4. `npm install` 
5. `npm run build`

Then your build application of static html files are in the `build` folder. You can simply upload that `build` folder to your hosting platform, or you can automate this process in platforms like Cloudflare by linking your fork of this so that it rebuilds on every commit. 

