import { Component, OnInit } from '@angular/core';

export interface Estimate {
  minPieces: number;
  maxPieces: number;
  workers: Worker[];
  overtimeTotal: number;
  regularTotal: number;
}

export interface Worker {
  position: string;
  quantity: number
  hours: number;
  regularCost: number;
  overtimeCost: number;
}

const ESTIMATES: Estimate[] = [
  {
    minPieces: 0, maxPieces: 15, workers: [
      { position: 'Supervisor', quantity: 1, hours: 5, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Driver', quantity: 1, hours: 5, regularCost: 450.00, overtimeCost: 500.00 },
      { position: 'Installer', quantity: 1, hours: 5, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Helper', quantity: 1, hours: 5, regularCost: 275.00, overtimeCost: 325.00 }
    ], overtimeTotal: 825, regularTotal: 725
  },
  {
    minPieces: 15, maxPieces: 30, workers: [
      { position: 'Supervisor', quantity: 1, hours: 5, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Driver', quantity: 1, hours: 5, regularCost: 450.00, overtimeCost: 500.00 },
      { position: 'Installer', quantity: 1, hours: 5, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Helper', quantity: 2, hours: 5, regularCost: 275.00, overtimeCost: 325.00 }
    ], overtimeTotal: 825, regularTotal: 725
  },
  {
    minPieces: 30, maxPieces: 60, workers: [
      { position: 'Supervisor', quantity: 1, hours: 6, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Driver', quantity: 1, hours: 6, regularCost: 540.00, overtimeCost: 660.00 },
      { position: 'Installer', quantity: 1, hours: 6, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Helper', quantity: 2, hours: 6, regularCost: 660.00, overtimeCost: 780.00 }
    ], overtimeTotal: 1440, regularTotal: 1200
  },
  {
    minPieces: 60, maxPieces: 90, workers: [
      { position: 'Supervisor', quantity: 1, hours: 7, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Driver', quantity: 1, hours: 7, regularCost: 630.00, overtimeCost: 770.00 },
      { position: 'Installer', quantity: 1, hours: 7, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Helper', quantity: 3, hours: 7, regularCost: 1155.00, overtimeCost: 1365.00 }
    ], overtimeTotal: 2135, regularTotal: 1785
  },
  {
    minPieces: 90, maxPieces: 120, workers: [
      { position: 'Supervisor', quantity: 1, hours: 8, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Driver', quantity: 2, hours: 8, regularCost: 1440.00, overtimeCost: 1600.00 },
      { position: 'Installer', quantity: 1, hours: 8, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Helper', quantity: 3, hours: 8, regularCost: 1320.00, overtimeCost: 1560.00 }
    ], overtimeTotal: 3160, regularTotal: 2760
  },
  {
    minPieces: 120, maxPieces: 999, workers: [
      { position: 'Supervisor', quantity: 1, hours: 9, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Driver', quantity: 2, hours: 9, regularCost: 1620.00, overtimeCost: 1980.00 },
      { position: 'Installer', quantity: 1, hours: 9, regularCost: 0.00, overtimeCost: 0.00 },
      { position: 'Helper', quantity: 4, hours: 9, regularCost: 1980.00, overtimeCost: 2340.00 }
    ], overtimeTotal: 4320, regularTotal: 3600
  },
]

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  value = 0;
  public estimate: Estimate
  public workers: Worker[]
  public estimated = false;

  displayedColumns: string[] = ['position', 'quantity', 'hours', 'regularCost', 'overtimeCost'];

  ngOnInit() {
    this.estimate = null;
    this.workers = null;
  }


  sliderChange(event) {
    this.value = event.value;
    const estimate = this.computeEstimate();
    this.estimate = estimate;
    this.workers = estimate.workers;
  }

  computeEstimate() {
    this.estimated = true;
    try {
      const belowMax = ESTIMATES.filter(
        (est: Estimate) => this.value <= est.maxPieces);
      return belowMax.filter((est: Estimate) => this.value > est.minPieces)[0];
    }
    catch {
      return ESTIMATES[0];
    }

  }

}
