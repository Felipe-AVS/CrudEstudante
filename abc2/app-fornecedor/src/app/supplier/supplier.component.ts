import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Client } from '../client';
import { Supplier } from '../supplier';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-client',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent {
  supplier: Supplier[] = [];
  isEditing: boolean = false;
  formSupplier: FormGroup;
  modalService: any;
  submitted : boolean = false;

  constructor(private supplierService: SupplierService,
    private formBuilder: FormBuilder) {
    this.formSupplier = formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      email: ['',[Validators.required , Validators.pattern(".+?\\@.+?\\..+")]],
      phone : ['',[Validators.required]],
      company: ['',[Validators.required]]
    });
  }


  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.supplierService.getClient().subscribe({
      next: data => this.supplier = data
    });
  }

  save() {
    this.submitted=true;
  if(this.formSupplier.valid){
    if (this.isEditing) {
      this.supplierService.update(this.formSupplier.value).subscribe({
        next: () => {
          this.loadClients()
          this.formSupplier.reset()
          this.isEditing = false
          this.submitted=false;
        }
      })
    } else {
      this.supplierService.save(this.formSupplier.value).subscribe({
        next: data => {
          this.supplier.push(data)
          this.formSupplier.reset();
          this.submitted=false;
        }
      });
    }
  }else{

  }

   

  }

  clean(){
    this.formSupplier.reset()
    this.isEditing = false;
    this.submitted = false;
  }

  edit(client: Supplier) {
    
    this.isEditing = true;
    this.formSupplier.setValue(client);
    this.supplierService.update(client).subscribe({
      next: () => this.loadClients()

    })
  }

  delete(client: Supplier) {
    this.supplierService.delete(client).subscribe({
      next: () => this.loadClients()

    })
  }

  
  get email() : any{
    return this.formSupplier.get("email");
  }

  get name() : any{
    return this.formSupplier.get("name");
  }

}