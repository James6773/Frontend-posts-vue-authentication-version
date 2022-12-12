<template>
    <div class ="container" id="container">
      <div class="card">
          <div class="card-header">
             <b>Nueva categoría</b> 
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group">
                    <label for="tittle">Nombre:</label>
                    <input type="text" name="name" id="name" v-model="category.name" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                    <label for="description">Descripción:</label>
                    <textarea name="description" id="description" v-model="category.description" class="form-control" rows="3"></textarea>
                  </div>
                  <br/>
                  <div>
                      <button @click="newCategory" name="save" id="btnSave" class="btn btn-success" role="button">Crear categoría</button>
                      <router-link :to="'/categories'" id="btnCancel" class="btn btn-secondary" role="button">Cancelar</router-link>
                  </div>
              </form>
          </div>
      </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';

export default {  
    data() {
        return {

          category: {
              name:"",
              description: "",
          }
        }
    },
    methods:{
      async newCategory(e) {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();

            e.preventDefault();

            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+localStorage.getItem('authToken')
                },
                body:  JSON.stringify(this.category)
            }

            const response = await fetch("http://localhost:8000/api/category/store", options);
            
            const data = await response.json();

            console.log(data);

            Swal.close();

            const MySwal = (Swal);

            await MySwal.fire({
                title: "Hecho",
                text: "¡Categoría creada con éxito!",
                icon: 'success'
            })
      
            this.$router.replace({path: '/categories'});  

        } catch (error) {
            console.log(error);
            Swal.close();

            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = '¡Ocurrió un error!, por favor intentelo de nuevo...';
            }
            Swal.fire('Error:', mensaje, 'error');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  #btnSave {
      margin-left: 5px;
      margin-right: 25px; 
  }
  #btnCancel {
      margin-right: 0px; 
  }
  #container {
    margin: 2em auto;
  }
  </style>