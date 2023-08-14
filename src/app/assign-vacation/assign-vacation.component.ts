import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { VacationService } from '../vacation.service';

@Component({
  selector: 'app-assign-vacation',
  templateUrl: './assign-vacation.component.html',
  styleUrls: ['./assign-vacation.component.css']
})
export class AssignVacationComponent implements OnInit {
  vacationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private vacationService: VacationService,
    private router: Router) {}

  ngOnInit(): void {
    
    this.vacationForm = this.formBuilder.group({
      name: ['', Validators.required],
      initDate: ['', Validators.required],
      endDate: ['', Validators.required],
      daysTaken: ['']
    })
    this.vacationForm.get('initDate')?.valueChanges.subscribe(() => this.calculardaysTaken());
    this.vacationForm.get('endDate')?.valueChanges.subscribe(() => this.calculardaysTaken());
    this.vacationForm.get('name')?.setValue(this.employeeService.getEmployeeCurrent().name);
  }

  calcular() {
    const fechaFin = this.vacationForm.get('name')?.value;
    console.log(fechaFin)
  }

  calculardaysTaken() {
    console.log("hola")
    const fechaInicio = new Date(this.vacationForm.get('initDate').value);
    const fechaFin = new Date(this.vacationForm.get('endDate').value);

    if (fechaInicio && fechaFin) {
      const diferencia = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
      const daysTaken = Math.ceil(diferencia / (1000 * 60 * 60 * 24));  // Convertir diferencia a días
      if (isNaN(daysTaken)) {
        this.vacationForm.get('daysTaken')?.setValue(0);
      } else {
        this.vacationForm.get('daysTaken')?.setValue(daysTaken);
      }
    } else {
      this.vacationForm.get('daysTaken')?.setValue('');
    }
  }

  onSubmit(): void {
    if(this.vacationForm.valid) {
      const data = {
       "employee": this.employeeService.getEmployeeCurrent(),
        ...this.vacationForm.value
      }

      this.vacationService.createVacation(data).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
