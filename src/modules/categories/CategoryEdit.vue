<template>
    <div class ="container" id="container">
      <div class="card" id="card">
          <div class="card-header">
             <b>Editar categoría</b> 
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group">
                    <label for="tittle">Nombre:</label>
                    <input type="text" required name="name" id="name" v-model="category.name" class="form-control">
                  </div>
                  <br/>
                  <div class="form-group">
                    <label for="description">Descripción:</label>
                    <textarea name="description" id="description" v-model="category.description" class="form-control" rows="3"></textarea>
                  </div>
                  <br/>
                  <div>
                      <button @click="updateCategory" name="save" id="btnSave" class="btn btn-success" role="button">Guardar cambios</button>
                      <router-link :to="'/'" id="btnCancel" class="btn btn-secondary" role="button">Cancelar</router-link>
                  </div>
              </form>
          </div>
      </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';

export default { 
props:['id'],
    async created(){
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();
            
            const options = {
                method: "GET"
            }
            const response = await fetch("http://localhost:8000/api/category/listById/"+this.id , options);
            const data = await response.json();

            console.log(data);

            let editCategoryData = {
                name: data.data.name,
                description: data.data.description,
            }
            this.category = editCategoryData;

            Swal.close();

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
    },
    data(){
        return{
            category: {
                name: "",
                description: ""
            }
        }
    },
    methods:{
        async updateCategory(e){
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: "Cargando..."
                });
                Swal.showLoading();

                e.preventDefault();

                const options = {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body:  JSON.stringify(this.category)
                }

                const response = await fetch("http://localhost:8000/api/category/update/"+this.id , options);
                const data = await response.json();
                
                console.log(data);

                Swal.close();

                const MySwal = (Swal);

                await MySwal.fire({
                    title: "Hecho",
                    text: "¡Categoría actualizada con éxito!",
                    icon: 'success',
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
  #card {
    margin: 2em auto;
  }
</style>