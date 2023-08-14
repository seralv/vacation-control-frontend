import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { VacationService } from '../vacation.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm = new FormControl('');

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private vacationService: VacationService,
    ) { }

  ngOnInit(): void {
    this.fetchEmployees();

    this.searchTerm.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(() => {
      this.applyFilter();
    });
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      console.log('employees-->', this.employees);


      // this.vacationService.getVacations().subscribe(vacations => {
      //   this.employees.forEach(employee => {
      //     const employeeVacations = vacations.filter(vacation => vacation.employee === employee.id);
      //     employee.vacation = employeeVacations;
      //   });

        // this.applyFilter();
      // });
    });
  }

  applyFilter(): void {
    const searchTerm = this.searchTerm.value?.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      employee =>
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        (employee.workInformation.state.toLowerCase().includes(searchTerm) ||
        (employee.workInformation.state === 'vacation' ? 'vacación' : 'trabajando').toLowerCase().includes(searchTerm ?? ''))
    );
  }

  editEmployee(employee: any): void {
    this.router.navigate(['/edit-employee', employee.id]);
  }

  deleteEmployee(employee: any): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `No podrás revertir esto: ${employee.name} se eliminará.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employee.id).subscribe(() => {
          this.fetchEmployees();
          swalWithBootstrapButtons.fire(
            'Eliminado',
            `${employee.name} ha sido eliminado.`,
            'success'
          );
        });
      }
    });
  }


  assignVacation(employee: any): void {
    this.employeeService.assignEmploye(employee);
    this.router.navigate(['/assign-vacation', employee]);
  }
}
