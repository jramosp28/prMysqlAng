import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/service/service.component';
import { formMoto } from 'src/interfaces/interface';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {
  MyNewForm!: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormularioService) { }

  ngOnInit() {
    this.MyNewForm = this.fb.group({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      last_name2: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      bike: new FormControl(false, Validators.required),
      bike_model: new FormControl('', Validators.required)
    });
    this.onSubmit();
  }

  onSubmit() {
    console.log(this.MyNewForm.value);
    if (this.MyNewForm.valid) {
      this.formService.CreateUser(this.MyNewForm.value).subscribe((response: any) => {
        // console.log(response);
        // Limpiar el formulario después de crear un nuevo formulario exitosamente
        this.MyNewForm.reset();
      });
    }
  }
}