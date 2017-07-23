import {Menu, remote} from 'electron';
import * as fs from 'fs';
import {Injectable} from '@angular/core';

@Injectable()
export class MenuService {

  private readonly menuItems = [
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
            const path = remote.dialog.showSaveDialog({
              defaultPath: `${remote.app.getPath('desktop')}/state.json`
            });
            if (path) {
              fs.readFile(`${remote.app.getPath('userData')}/state.json`, 'utf8', (err, data) => {
                if (err) throw err;
                fs.writeFile(path, data, (err) => {
                  if (err) throw err;
                });
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

  constructor() {

    const menu = new remote.Menu();
    menu.append(new remote.MenuItem({
      label: 'MenuItem1',
      visible: true
    }));
    remote.Menu.setApplicationMenu(menu);
  }

}
