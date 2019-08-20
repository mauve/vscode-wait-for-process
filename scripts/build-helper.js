const fs = require("fs");
const cp = require("child_process");

if (!fs.existsSync("./helper/build")) {
  fs.mkdirSync("./helper/build");
}

if (fs.existsSync("./helper/build/CMakeCache.txt")) {
  console.log("CMakeCache.txt exists, skipping generate.");
} else {
  console.log(`*
* Running cmake generate...
*`);

  cp.execFileSync("cmake", ["-G", "Visual Studio 2019", ".."], {
    cwd: "./helper/build",
    encoding: "utf8",
    stdio: "inherit"
  });
}

console.log(`*
* Running cmake build...
*`);

cp.execFileSync("cmake", ["--build", "."], {
  cwd: "./helper/build",
  encoding: "utf8",
  stdio: "inherit"
});

console.log(`*
* Copying targets...
*`);

fs.copyFileSync(
  "./helper/build/Debug/wait-for-process.exe",
  "./helper/wait-for-process.exe"
);
