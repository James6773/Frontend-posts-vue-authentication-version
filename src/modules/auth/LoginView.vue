<template>
    <div class ="container" id="container">
    <div class="card">
        <div class="card-header">
            <center><b>Inicio de sesión</b></center>
        </div>
        <div class="card-body">
            <form @submit.prevent="submitUser">
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="user.email">
                    <div id="emailHelp" class="form-text">Ingrese el correo electrónico que le fue asigndo a su rol de usuario.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" v-model="user.password">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Recuérdame</label>
                </div>
                <div>
                    <center><button type="submit" class="btn btn-success">Ingresar</button></center>
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

            user: {
                email: null,
                password: null,
            }
        }
    },
    methods: {
        async submitUser() {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: "Cargando..."
                });
                Swal.showLoading();
                
                const options = {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.user)
                }

                const response = await fetch("http://localhost:8000/api/login/auth", options);
                const data = await response.json();

                localStorage.setItem('authToken', data.token)

                console.log(localStorage.getItem('authToken'));

                Swal.close();

                const MySwal = (Swal);

                await MySwal.fire({
                    title: "Hecho",
                    text: "¡Usuario validado con éxito!",
                    icon: 'success'
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
    #container {
    margin-top: 110px;
    margin-left: 380px;
    width: 600px;
}
</style>