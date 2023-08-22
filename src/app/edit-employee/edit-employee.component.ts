import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [''],
      lastName: [''],
      address: [''],
      phone: [''],
      position: [''],
      entry_date: ['']
    });

    const employeeId = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(employeeId).subscribe(
      (employee: any) => {
        this.employeeForm.patchValue(employee);      
      },
      (error: any) => {
        console.error('Error loading employee details:', error);
      }
    );
  }

  onSubmit() {
    const employeeId = this.route.snapshot.params['id'];
    const updatedEmployee = this.employeeForm.value;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de actualizar los datos del empleado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.updateEmployee(employeeId, updatedEmployee).subscribe(
          () => {
            this.employee = updatedEmployee; 
            swalWithBootstrapButtons.fire(
              'Actualizado',
              'Datos del empleado actualizados exitosamente.',
              'success'
            );
            this.router.navigate(['/']);
          },
          (error: any) => {
            console.error('Error updating employee:', error);
            swalWithBootstrapButtons.fire(
              'Error',
              'Ha ocurrido un error al actualizar los datos del empleado.',
              'error'
            );
          }
        );
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
