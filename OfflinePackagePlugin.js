const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const JSZip = require('jszip');
const mime = require('mime-types');
const { RawSource } = require('webpack-sources');
const { Compilation } = require('webpack');
const pkg = require('./package.json');

const zip = new JSZip();

class OfflinePackagePlugin {
  constructor(options) {
    this.options = _.assign(
      {
        packageName: '',
        folderName: 'package',
        indexFileName: 'index.json',
        fileTypes: [],
        excludeFileName: [],
        transformExtensions: /^(gz|map)$/i,
        serialize: (manifest) => {
          return JSON.stringify(manifest, null, 2);
        },
      },
      options
    );
  }

  getFileType(str) {
    str = str.replace(/\?.*/, '');
    const split = str.split('.');
    let ext = split.pop();
    if (this.options.transformExtensions.test(ext)) {
      ext = split.pop() + '.' + ext;
    }
    return ext;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('OfflinePackagePlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'OfflinePackagePlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        (assets, callback) => {
          const isFileTypeLimit = this.options.fileTypes.length > 0;

          // create index.json
          const content = {
            packageId: this.options.packageName,
            version: pkg.version,
            items: [],
          };

          const publicPath = path.resolve(__dirname, 'public');

          // add files in public directory to assets
          fs.readdirSync(publicPath).forEach((filename) => {
            const data = fs.readFileSync(publicPath + '/' + filename);
            // skip index.html because %PUBLIC_URL% need to be replaced while building the project
            if (filename !== 'index.html') {
              assets[filename] = new RawSource(data);
            }
          });

          for (const filename in assets) {
            const fileType = this.getFileType(filename);

            if (this.options.excludeFileName.includes(filename)) {
              continue;
            }

            if (isFileTypeLimit && !this.options.fileTypes.includes(fileType)) {
              continue;
            }

            content.items.push({
              path: filename,
              mimeType: mime.lookup(fileType),
            });
          }

          const outputFile = this.options.serialize(content);
          assets[this.options.indexFileName] = {
            source: () => {
              return outputFile;
            },
            size: () => {
              return outputFile.length;
            },
          };

          // create zip file
          const folder = zip.folder(this.options.folderName);

          for (const filename in assets) {
            const fileType = this.getFileType(filename);

            if (this.options.excludeFileName.includes(filename)) {
              continue;
            }

            if (
              isFileTypeLimit &&
              !this.options.fileTypes.includes(fileType) &&
              filename !== this.options.indexFileName
            ) {
              continue;
            }

            const source = assets[filename].source();
            folder.file(filename, source);
          }

          zip
            .generateAsync({
              type: 'nodebuffer',
              streamFiles: true,
              compression: 'DEFLATE',
              compressionOptions: { level: 9 },
            })
            .then((content) => {
              const outputPath = this.options.folderName + '.zip';
              assets[outputPath] = new RawSource(content);

              callback();
            });
        }
      );
    });
  }
}

module.exports = OfflinePackagePlugin;
