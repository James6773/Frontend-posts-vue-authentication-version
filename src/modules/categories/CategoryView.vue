<template>
    <div class="container" id="container">
        <div class="card">
            <div class="card-header">
                <center><router-link :to="'/categories/create'" name="create" id="create" class="btn btn-success" href="#" role="button">Crea una nueva categoría</router-link></center>
            </div>          
            <div class="card-body">
                <table class="table table-striped table-inverse table-responsive">
                    <thead class="thead-inverse">
                        <tr>
                            <th><center>Id</center></th>
                            <th><center>Nombre</center></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <td></td>
                            <th><center>Descripción</center></th>
                            <th><center>Acciones</center></th>
                        </tr>
                        </thead>
                        <tbody>    
                            <tr v-for="category in categories" :key="category.id">
                                <td><center>{{category.id}}</center></td>
                                <td><center>{{category.name}}</center></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{category.description}}</td>
                                <td>
                                 <button @click="deleteCategory(category.id)" name="delete" id="btnDelete" class="btn btn-danger" href="javascript:void(0)" role="button">Eliminar</button>
                                 <router-link :to="'/categories/edit/'+category.id" name="more" id="btnMore" class="btn btn-info" href="#" role="button">Ver más...</router-link>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    async created() {
        try{
            Swal.fire({
                    allowOutsideClick: false,
                    text: "Cargando..."
                });
            Swal.showLoading();

            const options = {
                method: "GET",
                headers: {
                    'Authorization': 'Token '+localStorage.getItem('authToken')
                }
            }

            const response = await fetch("http://localhost:8000/api/category/list", options);
            const data = await response.json();

            console.log(data);

            this.categories = data.data;

            Swal.close();

        } catch {
            console.log(error);
            console.log(error.response.data);
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
        return {
            categories:[]
        }
    },
    methods:{
        async deleteCategory(id) { 
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: "Cargando..."
                });
                Swal.showLoading();
                Swal.close();
                
                Swal.fire({
                    title: '¿De verdad quieres eliminar esta categoría?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Sí',
                    denyButtonText: 'Cancelar',
                    cancelButtonText: '',
                    customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-3',
                    confirmButton: 'order-1',
                    denyButton: 'order-2',
                    }
                }).then( async (result) => {
                    if (result.isConfirmed) {
                        const options = {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token '+localStorage.getItem('authToken')
                            }
                        }

                        const response = await fetch("http://localhost:8000/api/category/destroy/"+id, options);
                        const data = await response.json();

                        console.log(data);

                        const MySwal = (Swal);

                        await MySwal.fire('¡Categoría eliminada con éxito!', '', 'success'); 
                        
                        this.categories = data.data.newList;

                    } else if (result.isDenied) {
                        Swal.fire('¡La categoría no se eliminó!', '', 'info')
                    }
                })
    
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
#btnDelete {
    margin-left: 135px;
    margin-right: 25px; 
}
#btnMore {
    margin-right: 0px; 
}
#container {
    margin-top: 35px;
}
</style>