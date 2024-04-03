import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {

  optionButtons: any[] = [];

  constructor() {
    this.optionButtons = [
      {
        thumbnail: 'PA',
        label: 'Paquetes',
        text: 'Mantenimiento',
        path: '/mobile/packets/list'
      },
      {
        thumbnail: 'ES',
        label: 'Especialidades',
        text: 'Mantenimiento',
        path: '/mobile/specialities/list'
      },
      {
        thumbnail: 'TD',
        label: 'Tipos de datos',
        text: 'Mantenimiento',
        path: '/mobile/management-types/list'
      },
      {
        thumbnail: 'CD',
        label: 'Carga de datos',
        text: 'Importación',
        path: '/mobile/import-data/list'
      }
    ];
  }

  ngOnInit() {
    console.log();
  }

}
