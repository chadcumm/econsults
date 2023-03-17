import { Injectable } from '@angular/core';
import { CustomService, IColumnConfig } from '@clinicaloffice/clinical-office-mpage';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  public loading = false;
  public columnConfig: IColumnConfig = {columns: [], columnSort: [], freezeLeft: 0};

  constructor(public customService: CustomService) { }

  public loadAppointments(): void {

    this.loading = true;

    this.customService.load({
      customScript: {
        script: [
          {
            name: '1trn_appt_mp:group1',
            run: 'pre',
            id: 'appointments'
          }
        ]
      }
    }, undefined, (() => { this.loading = false }));
  }

// Returns the appointments data
public get appointments(): any[] {
  return this.customService.get('appointments').appointments;
}

// Determine if appointments have been loaded
public get appointmentsLoaded(): boolean {
  return this.customService.isLoaded('appointments');
}
}
