const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
.then(createWindowsInstaller)
.catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'do-not-forget-me-win32-ia32/'),
    authors: 'Alexandre Plennevaux',
    noMsi: true,
    outputDirectory: path.join(outPath, ''),
    exe: 'do-not-forget-me.exe',
    setupExe: 'doNotForgetMeInstaller.exe',
    setupIcon: path.join(rootPath, 'src/assets', 'icons', 'win', 'icon.ico')
  })
}
