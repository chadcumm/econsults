import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppointmentDataService } from '../appointment-data.service';
@Component({
  selector: 'app-appointment-summary',
  templateUrl: './appointment-summary.component.html',
  styleUrls: ['./appointment-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentSummaryComponent implements OnInit {

  constructor(public appointmentDS: AppointmentDataService) { }

  ngOnInit(): void {
  }

}
