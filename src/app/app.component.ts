import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {mPageService, PersonService } from "@clinicaloffice/clinical-office-mpage";
import { AppointmentDataService } from './appointment-data.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public ready = false; 
  referringProvider: number[] = [];
  clinicEncounter: any[] = [];

  //title: string = "eConsults"

  createEncounter(event?: Event)  {
    this.mPage.putLog("createEncounter Clicked")
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public mPage: mPageService,
    public personService: PersonService,
    public appointmentDS: AppointmentDataService,
    public maButton: MatButtonModule
  ) { }

  ngOnInit(): void {

    // Grab any parameters in the URL (Used in Cerner Components)
    this.activatedRoute.queryParams.subscribe(params => {
      this.mPage.personId = params.personId ? parseInt(params.personId) : this.mPage.personId;
      this.mPage.encntrId = params.encounterId ? parseInt(params.encounterId) : this.mPage.encntrId;
      this.mPage.prsnlId = params.userId ? parseInt(params.userId) : this.mPage.prsnlId;
    });

    // Perform MPage Initialization
    setTimeout((e: any) => {
      this.mPage.setMaxInstances(10, true, 'CHART');
      this.ready = true;


      // Add your initialization code here - do not place outside setTimeout function
      this.appointmentDS.loadAppointments();
    
    }, 0);


  }

}
