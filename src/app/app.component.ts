import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {mPageService, PersonService,EncounterService,CustomService } from "@clinicaloffice/clinical-office-mpage";
import { AppointmentDataService } from './appointment-data.service';
import { MatButtonModule } from '@angular/material/button';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public ready = false; 

  referringProvider: number[] = [];
  clinicEncounter: any[] = [];
  
  public newEncntrID: number = 0;
  public newPersonID: number = 0;
  public newFIN: string = "Error Creating new Encounter. Contact Support.";

  public prompts = {
    org_name: '',
    provider: 0, 
    provider_name: '',
    user_id: 0
  }

  public encounterCreated: boolean = false;

  //title: string = "eConsults"

  createEncounter(event?: Event)  {
    this.mPage.putLog("createEncounter Clicked")
    //this.mPage.putLog(JSON.stringify(this.prompts))
    this.callCreateEncounter();

    this.encounterCreated = false;
    setTimeout(() => {
      //this.mPage.putLog(this.PM.get("new_encounter").newEncntrId)
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

      this.prompts.user_id = this.mPage.prsnlId
  
      this.PM.load({
        customScript: {
          script: [
            {
              name: 'cov_co_add_encntr:dba',
              run: 'pre',
              id: 'new_encounter',
              parameters: this.prompts
            }
          ]
        }
      }, undefined, (() => { 
          this.newEncntrID = this.PM.get("new_encounter").newEncntrId;
          this.newPersonID = this.PM.get("new_encounter").personId
          this.newFIN = this.PM.get("new_encounter").newFin;
        }));
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
      this.prompts.org_name = "Covenant Neurohospitalists - Trustee Tower"
      // Add your initialization code here - do not place outside setTimeout function
      this.encntrService.load({
        payload: {
          encounter: {
            includeCodeValues: true,
            aliases: true,
            encounterInfo: true,
            prsnlReltn: true,
            locHist: false
          }
        }
      });
      this.prompts.provider = this.encntrService.getPrsnlReltn('ATTENDDOC')['personId']
      this.prompts.provider_name = this.encntrService.getPrsnlReltn('ATTENDDOC')['nameFullFormatted']
      this.mPage.putLog(JSON.stringify(this.prompts));
      this.mPage.putLog(this.encntrService.getPrsnlReltn('ATTENDDOC')['personId']);
      this.mPage.putLog(this.encntrService.getPrsnlReltn('ATTENDDOC')['nameFullFormatted'])
    }, 0);


  }

}
