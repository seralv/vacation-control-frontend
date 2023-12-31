import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { WorkInformationService } from '../work-information.service';
import { VacationService } from '../vacation.service';

@Component({
  selector: 'app-assign-vacation',
  templateUrl: './assign-vacation.component.html',
  styleUrls: ['./assign-vacation.component.css'],
})
export class AssignVacationComponent implements OnInit {
  vacationForm!: FormGroup;
  employeeFullName: string = '';
  employeePosition: string = '';
  daysRemaining: string = '';
  dateActivate: boolean = false;
  dayInicio: string = '';
  monthInicio: string = '';
  dateInicio: number = 0;
  dayFin: string = '';
  monthFin: string = '';
  dateFin: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private workInformationService: WorkInformationService,
    private vacationService: VacationService,
    private router: Router) {}

  ngOnInit(): void {

    this.vacationForm = this.formBuilder.group({
      initDate: ['', Validators.required],
      endDate: ['', Validators.required],
      daysTaken: ['']
    });

    this.vacationForm.get('initDate')?.valueChanges.subscribe(() => this.calculardaysTaken());
    this.vacationForm.get('endDate')?.valueChanges.subscribe(() => this.calculardaysTaken());

    const employeeCurrent = this.employeeService.getEmployeeCurrent();
    this.employeeFullName = `${ employeeCurrent.name  } ${ employeeCurrent.lastName }`;
    this.employeePosition = this.employeeService.getEmployeeCurrent().position;
    this.daysRemaining = `${ employeeCurrent.workInformation.remainingDays }`;

  }

  calculardaysTaken() {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

    const fechaInicio = new Date(this.vacationForm.get('initDate')?.value);
    const fechaFin = new Date(this.vacationForm.get('endDate')?.value);

    this.dayInicio = days[fechaInicio.getDay() + 1];
    this.monthInicio = months[fechaInicio.getMonth()];
    this.dateInicio = fechaInicio.getDate() + 1;

    this.dayFin = days[fechaFin.getDay() + 1];
    this.monthFin = months[fechaFin.getMonth()];
    this.dateFin = fechaFin.getDate() + 1;

    if (fechaInicio && fechaFin) {
      const diferencia = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
      const daysTaken = Math.ceil(diferencia / (1000 * 60 * 60 * 24));  // Convertir diferencia a días
      if (isNaN(daysTaken)) {
        this.vacationForm.get('daysTaken')?.setValue(0);
      } else {
        this.vacationForm.get('daysTaken')?.setValue(daysTaken);
        this.dateActivate = true;
      }
    } else {
      this.vacationForm.get('daysTaken')?.setValue('');
    }
  }

  onSubmit(): void {
    if(this.vacationForm.valid) {
      const data = {
       employee: this.employeeService.getEmployeeCurrent(),
        ...this.vacationForm.value
      }

      this.vacationService.createVacation(data).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
