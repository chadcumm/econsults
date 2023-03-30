import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {mPageService, PersonService,EncounterService,CustomService } from "@clinicaloffice/clinical-office-mpage";
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
  public newEncntrID: number = 125195514;
  public newPersonID: number = 15850433;
  public prompts = {
    org_name: '',
    provider: 0
  }

  public encounterCreated: boolean = false;

  //title: string = "eConsults"

  createEncounter(event?: Event)  {
    this.mPage.putLog("createEncounter Clicked")
    this.mPage.putLog(JSON.stringify(this.prompts))
    this.callCreateEncounter();

    this.encounterCreated = false;
    setTimeout(() => {
      this.mPage.putLog(this.PM.get("new_encounter").newEncntrId)
      this.encounterCreated = true;
    }, 1000)
  }

  openEncounter(event?: Event) {
    const el = document.getElementById('applink');
        // @ts-ignore
        el.href = 'javascript:APPLINK(0,"Powerchart.exe","/PERSONID=' + this.newPersonID + ' /ENCNTRID=' + this.newEncntrID +'")';
      
      // @ts-ignore
      el.click();
  }
    //APPLINK(0,'Powerchart.exe','/PERSONID='+ this.newPersonID + '/ENCNTRID=' + this.newEncntrID);
  
    public callCreateEncounter(): void {

  
      this.PM.load({
        customScript: {
          script: [
            {
              name: 'cov_co_add_encntr:dba',
              run: 'pre',
              id: 'new_encounter'
            }
          ]
        }
      }, undefined, (() => { this.encounterCreated = true; }));
    }
  constructor(
    public activatedRoute: ActivatedRoute,
    public mPage: mPageService,
    public personService: PersonService,
    public appointmentDS: AppointmentDataService,
    public maButton: MatButtonModule,
    public encntrService: EncounterService,
    public PM: CustomService
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
      this.mPage.setMaxInstances(2, true, 'CHART');
      this.ready = true;


      // Add your initialization code here - do not place outside setTimeout function
      this.encntrService.load();
    }, 0);


  }

}
