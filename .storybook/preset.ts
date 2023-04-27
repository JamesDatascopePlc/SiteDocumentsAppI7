// /my-addon/src/preset.js

function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve('./addons/ios-mode.addon')]; //👈 Addon implementation
}

export default { managerEntries }