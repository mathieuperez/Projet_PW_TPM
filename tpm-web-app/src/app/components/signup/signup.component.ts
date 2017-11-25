import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    @Input()
    private email = '';

    @Input()
    private password = '';

    @Input()
    private role = '';

    public constructor(private http: HttpClient) {}

    ngOnInit() {
    }

    public newUser(): void {
        this.http.post('http://localhost:3000/api/users', {email: this.email,
        password: this.password,
        role: this.role })
        .subscribe( (response) => {
            if (response['message'] && response['message'] === 'Success') {
                alert("Inscription réalisée avec succès.");
            }
            else {
                alert("Une erreur est survenue lors de votre inscription.");
            }
        });
    }
}
