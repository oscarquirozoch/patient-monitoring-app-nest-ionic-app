import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public mobilePages = [
    { title: 'Inicio', url: 'home', icon: 'home-outline' },
    { title: 'Usuarios', url: 'users', icon: 'people-outline' },
    { title: 'Pacientes', url: 'patients', icon: 'heart-outline' },
    { title: 'Reportes', url: 'reports', icon: 'book-outline' },
    { title: 'Configuración', url: 'configuration', icon: 'settings-outline' },
  ];

  constructor() { }

  ngOnInit() {
    console.log();
  }

}
