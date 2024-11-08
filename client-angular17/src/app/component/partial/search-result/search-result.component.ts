import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent {
  geoObjects = [
    {
      type: 'Zones',
      typeIcon: '/assets/icons/zones.png',
      subtypes: [
        {
          subtype: 'Zone 1',
          subtypeIcon: '/assets/icons/zone.png',
          objects: [
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 1',
              objName: 'Camera 1',
            },
            {
              objIcon: '/assets/icons/sensor-2.png',
              objType: 'Sensor 2',
              objName: 'Camera 2',
              connectionStatus: 'disconnected',
            },
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 1',
              objName: 'Camera 1',
              connectionStatus: 'unstable',
            },
            {
              objIcon: '/assets/icons/sensor-2.png',
              objType: 'Sensor 2',
              objName: 'Camera 2',
              connectionStatus: 'stable',
            },
          ],
        },
        {
          subtype: 'Zone 2',
          subtypeIcon: '/assets/icons/zone.png',
          objects: [
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 1',
              objName: 'Camera 1',
            },
            {
              objIcon: '/assets/icons/sensor-2.png',
              objType: 'Sensor 2',
              objName: 'Camera 2',
              connectionStatus: 'unstable',
            },
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 1',
              objName: 'Camera 1',
              connectionStatus: 'disconnected',
            },
            {
              objIcon: '/assets/icons/sensor-2.png',
              objType: 'Sensor 2',
              objName: 'Camera 2',
              connectionStatus: 'stable',
            },
          ],
        },
        {
          subtype: 'Zone 3',
          subtypeIcon: '/assets/icons/zone.png',
          objects: [
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 11',
              objName: 'Camera 11',
            },
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 11',
              objName: 'Camera 12',
            },
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Sensor 11',
              objName: 'Camera 13',
            },
            {
              objIcon: '/assets/icons/sensor-2.png',
              objType: 'Sensor 12',
              objName: 'Sensor 14',
            },
          ],
        },
      ],
    },
    {
      type: 'Sites',
      typeIcon: '/assets/icons/sites.png',
      subtypes: [
        {
          subtype: 'Site 1',
          subtypeIcon: '/assets/icons/site.png',
          objects: [],
        },
        {
          subtype: 'Site 2',
          subtypeIcon: '/assets/icons/site.png',
          objects: [
            {
              objIcon: '/assets/icons/sensor-2.png',
              objType: 'Bus Station 1',
              objName: 'Bus Station 1',
            },
          ],
        },
      ],
    },
    {
      type: 'Placemarks',
      typeIcon: '/assets/icons/placemarks.png',
      subtypes: [
        {
          subtype: 'Placemark 1',
          subtypeIcon: '/assets/icons/placemark.png',
          objects: [],
        },
        {
          subtype: 'Placemark 2',
          subtypeIcon: '/assets/icons/placemark.png',
          objects: [
            {
              objIcon: '/assets/icons/sensor-1.png',
              objType: 'Placemark 1',
              objName: 'Placemark 2',
            },
          ],
        },
      ],
    },
    {
      type: 'Layers',
      typeIcon: '/assets/icons/layers.png',
      subtypes: [],
    },
  ];
}
