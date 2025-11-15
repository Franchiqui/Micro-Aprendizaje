const { execSync } = require('child_process');
const path = require('path');

const pocketbaseDir = path.join(__dirname, '..', 'pocket-base');
const executable = process.platform === 'win32' ? 'pocketbase.exe' : 'pocketbase';
const command = '"' + path.join(pocketbaseDir, executable) + '" serve --dir="' + path.join(pocketbaseDir, 'pb_data') + '"';

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start PocketBase:', error);
  process.exit(1);
}
