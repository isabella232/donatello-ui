const {app, dialog} = require('electron');
const fs = require('fs');

module.exports = [
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Import settings',
        accelerator: 'Shift+CmdOrCtrl+I',
        click() {
          console.log('Import');
        }
      },
      {
        label: 'Export settings',
        accelerator: 'Shift+CmdOrCtrl+E',
        click() {
          const path = dialog.showSaveDialog({
            defaultPath: `${app.getPath('desktop')}/state.json`
          });
          if (path) {
            fs.readFile(`${app.getPath('userData')}/state.json`, 'utf8', (err, data) => {
              if (err) throw err;
              fs.writeFile(path, data, (err) => {
                if (err) throw err;
              })
            });
          }
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  }
];
