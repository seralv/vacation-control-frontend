import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private employeeService: EmployeeService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      entry_date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
        // Lógica después de agregar el empleado (redirección, notificación, etc.)
        this.router.navigate(['/'])
      });
    }
  }
}
