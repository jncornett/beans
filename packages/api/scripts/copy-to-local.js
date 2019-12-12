const fs = require("fs");
const path = require("path");

const { sources, dest } = (() => {
  let i = process.argv.indexOf(__filename);
  if (i < 0) {
    i = process.argv.indexOf(
      __filename.slice(0, __filename.length - path.extname(__filename).length),
    );
  }
  if (i < 0) {
    throw new Error(
      `Could not find current script name ${__filename} in process.argv: ${JSON.stringify(
        process.argv,
      )}`,
    );
  }
  const args = process.argv.slice(i + 1);
  if (args.length < 2) {
    throw new Error("No destination directory provided");
  }
  return {
    sources: args.slice(0, args.length - 1).map(require.resolve),
    dest: path.resolve(process.cwd(), args[args.length - 1]),
  };
})();

fs.mkdirSync(dest, { recursive: true });

for (const source of sources) {
  const destPath = path.join(dest, path.basename(source));
  const sourceRel = path.relative(process.cwd(), source);
  console.log(`copy ${sourceRel} -> ${destPath}`);
  fs.copyFileSync(source, destPath);
}
