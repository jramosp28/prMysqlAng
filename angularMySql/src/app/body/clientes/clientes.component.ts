import { Component } from '@angular/core';
import { formMoto } from 'src/interfaces/interface';
import { FormularioService } from '../../services/service/service.component';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  form: formMoto[] = [];

  constructor(private ServiceComponent: FormularioService) {

  }

  ngOnInit(): void {
    this.ServiceComponent.GetLocalData().subscribe(formulario => {
      this.form = formulario;
    });
  }
  deleteUser(id: number | undefined): void {
    if (id === undefined) {
      console.error('El valor de id es undefined');
      return;
    }
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.ServiceComponent.DeleteUser(id).subscribe(
        () => {
          // Eliminar el usuario de la lista de usuarios
          this.form = this.form.filter((usuario) => usuario.id !== id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // editUser(id: number | undefined){

  // }

  editUser(id: number, form: formMoto) {
    console.log(id);
    this.ServiceComponent.UpdateUser(id, form).subscribe(
      (form: formMoto) => {
        this.ngOnInit()
      },
      (error: any) => {
        console.error('Error updating form: ', error);
      }
    );
  }

}