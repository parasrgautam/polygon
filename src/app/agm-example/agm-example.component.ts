import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

declare const google: any;

@Component({
  selector: 'app-agm-example',
  templateUrl: './agm-example.component.html',
  styleUrls: ['./agm-example.component.css']
})
export class AgmExampleComponent implements OnInit {
  @ViewChild('search') searchElementRef: ElementRef | undefined;
  lat = 33.481136;
  lng = -112.078232;
  drawingManager: any;
  gmapImgSrc: any = null;
  selectedAreaCoords: any;
  drawanArea: any;
  ngZone: any;
  address: string | undefined;
  web_site: string | undefined;
  name: string = '';
  zip_code: string = '';
  latitude: number | undefined;
  longitude: number | undefined;
  zoom: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

  clearDrawanArea () {
    if (this.drawanArea) {
      this.drawanArea.setMap(null);
      this.drawanArea = null;
      this.gmapImgSrc = null;
      this.selectedAreaCoords = null;
    }
  }

  onMapReady(map: any) {
    this.initDrawingManager(map);
    if (this.searchElementRef) {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        // this.ngZone.run(() => {
          // some details
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address;
          this.web_site = place.website;
          this.name = place.name;
          this.zip_code = place.address_components ? place.address_components[place.address_components.length - 1].long_name : '';
          //set latitude, longitude and zoom
          this.latitude = place.geometry ? place.geometry.location.lat() : undefined;
          this.longitude = place.geometry ? place.geometry.location.lng() : undefined;
          this.zoom = 12;
          if (this.latitude && this.longitude) {
            map.setCenter({
              lat: this.latitude,
              lng: this.longitude
            });
            map.setZoom(this.zoom);
          }
        //  });
      });
    }
  }
  initDrawingManager = (map: any) => {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon'],
      },
      polygonOptions: {
        draggable: false,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    }

    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    map.addListener('click', () => {
      if (this.drawanArea) {
        this.drawanArea.setMap(null);
        this.gmapImgSrc = null;
        this.selectedAreaCoords = null;
      }
    });
    this.drawingManager.addListener('overlaycomplete', (event: any) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        const coords = event.overlay.getPath().getArray();
        const mergeCoords = [...coords, coords[0]].join("|").replace(/\(/g, '').replace(/\)/g, '');

        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < coords.length; i++) {
          bounds.extend(coords[i]);
        }

        const center = bounds.getCenter().toString().replace(/\(/g, '').replace(/\)/g, '');
        console.log('mergeCoords === ', mergeCoords);
        console.log('center === ', center);
        this.selectedAreaCoords = (mergeCoords.split("|"));

        const splittedCoords = mergeCoords.split("|");
        splittedCoords.pop();
        this.selectedAreaCoords = splittedCoords; 

        this.gmapImgSrc = "https://maps.googleapis.com/maps/api/staticmap?zoom=" + map.getZoom() + "&center=" + center + "&path=color:0xff0000ff|weight:2|" + mergeCoords + "&size=600x600&scale=1&key=AIzaSyAtir-aHClvceOXagz-gdSTlFzwgtUomrY";
        this.drawanArea = event.overlay;
      }
    });
  }

  saveSelectedArea() {
    let doc = new jsPDF('p', 'px', 'a4');
    const width = doc.internal.pageSize;
    console.log(width);
    
    doc.addImage(
      document.getElementById('selectedAreaimg') as HTMLImageElement,
      'JPG',
      10,
      10,
      300,
      300
    );
    doc.save('digbox.pdf');
    const pdfData = btoa(doc.output());
    console.log(pdfData);
  }
}
