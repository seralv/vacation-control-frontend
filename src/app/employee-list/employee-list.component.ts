import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

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
      console.log(data[2])
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
    const confirmed = confirm(`¿Estás seguro de eliminar a ${employee.name}?`);
    if (confirmed) {
      this.employeeService.deleteEmployee(employee.id).subscribe(() => {
        this.fetchEmployees();
      });
    }
  }

  assignVacation(employee: any): void {
    // Lógica para asignar vacación
  }
}
