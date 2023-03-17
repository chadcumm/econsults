import { Component, OnInit } from '@angular/core';
import { AllergyService } from '@clinicaloffice/clinical-office-mpage';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent implements OnInit {

  constructor(public allergyService: AllergyService) { 
      
  }

  ngOnInit(): void {

   
        }

}
