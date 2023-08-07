import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
      text: `No podrás revertir esto: ${employee.name} será eliminado.`,
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
    // Lógica para asignar vacación
  }
}
