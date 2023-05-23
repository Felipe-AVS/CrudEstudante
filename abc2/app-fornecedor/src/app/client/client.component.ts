import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  client: Client[] = [];
  isEditing: boolean = false;
  formClient: FormGroup;
  submitted: boolean = false;
  public valor1: string = "Foda1";
  constructor(private clientService: ClientService,
    private formBuilder: FormBuilder) {
    this.formClient = formBuilder.group({
      id: [''],
      name: ['' ],
      email: [''],
      phone : [''],
      company: [''],
      interests1: [''],
      interests2: [''],
      interests3: [''],

    });
  }


  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.clientService.getClient().subscribe({
      next: data => this.client = data
    });
  }

  save() {
    this.submitted = true;
    if(this.formClient.valid){
      if (this.isEditing) {
        this.clientService.update(this.formClient.value).subscribe({
          next: () => {
            this.loadClients()
            this.formClient.reset()
            this.isEditing = false
            this.submitted=false;
          }
        })
      } else {
        this.clientService.save(this.formClient.value).subscribe({
          next: data => {
            this.client.push(data)
            this.formClient.reset();
            this.submitted=false;
          }
        });
      }
    }
   

  }

  clean(){
    this.formClient.reset()
    this.isEditing = false;
    this.submitted=false;
  }

  edit(client: Client) {
    this.isEditing = true;
    this.formClient.setValue(client);
    this.clientService.update(client).subscribe({
      next: () => this.loadClients()

    })
  }

  delete(client: Client) {
    this.clientService.delete(client).subscribe({
      next: () => this.loadClients()

    })
  }

}
