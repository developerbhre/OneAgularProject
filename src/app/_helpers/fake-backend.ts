import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '@app/_models';
import { Employee } from '@app/_models';
import { Department } from '@app/_models';

const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
const employees: Employee[] = [{ EmployeeId: 1, EmployeeName: 'Bob', Department: 'R&D', DateOfJoining: '10/20/2011', PhotoFileName: 'User' },
                               { EmployeeId: 2, EmployeeName: 'ROb', Department: 'Sales', DateOfJoining: '10/20/2016', PhotoFileName: 'User' }];
const departments: Department[] = [{ DepartmentId: 100, DepartmentName: 'R&D' },
                                   { DepartmentId: 200, DepartmentName: 'Sales' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/Employee') && method === 'GET':
                    return getEmployees();
                case url.endsWith('/Employee') && method === 'POST':
                    return addEmployee();
                case url.endsWith('/Employee/GetAllDepartmentNames') && method === 'GET':
                    return getAllEmployeeDepartmentNames();
                case url.includes('/Employee/') && method === 'DELETE':
                    return deleteEmployee();
                case url.endsWith('/Department') && method === 'GET':
                    return getDepartments();
                case url.endsWith('/Department') && method === 'POST':
                    return addDepartments();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getEmployees() {
            if (!isLoggedIn()) return unauthorized();
            return ok(employees);
        }

        function getAllEmployeeDepartmentNames() {
            if (!isLoggedIn()) return unauthorized();
           // let uniqueDepts = [...new Set(departments.map(item => item.DepartmentName))];
            return ok(departments);
        }

        function deleteEmployee() {
            if (!isLoggedIn()) return unauthorized();
           // let uniqueDepts = [...new Set(departments.map(item => item.DepartmentName))];
          const temp = url.split("/");
          const eId = temp[temp.length-1];
          const newEmployees = employees.filter(x => x.EmployeeId !== Number.parseInt(eId));
          //employees = employees.filter(x => x.EmployeeId !== Number.parseInt(eId));
           //employees.(employee);
           //const index: number = this.employees.indexOf(employee);
            //if (index !== -1) {
             //   this.employees.splice(index, 1);
            //} 
            return ok(employees);
        }

        function addEmployee() {
            if (!isLoggedIn()) return unauthorized();
            const employee: Employee = body;
            employees.push(employee);
            return ok(employees);
        }

        function getDepartments() {
            if (!isLoggedIn()) return unauthorized();
            return ok(departments);
        }

        function addDepartments() {
            if (!isLoggedIn()) return unauthorized();
            const department: Department = body;
            departments.push(department);
            return ok(departments);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};