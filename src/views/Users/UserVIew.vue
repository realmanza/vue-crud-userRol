<script>
import axios from "axios";

export default {
  name: "UserVIew",
  data() {
    return {
      users: []
    }
  },
  methods: {
    getUsers() {
      axios.get('http://localhost:8080/v1/users?detailed=true').then(res => {
        this.users = res.data;
      }).catch(function (error) {
        // handle error on UI site
      })
    },

    deleteUserById(userId) {
      if (confirm('Esta seguro de eliminar al usuario?')) {
        axios.delete(`http://localhost:8080/v1/users/${userId}`).then(res => {
          this.getUsers();
        }).catch(function (error) {
          // handle error on UI site
        })
      }
    }
  },
  mounted() {
    this.getUsers();
  }


}
</script>

<template>
  <div class="course">
    <div class="card">
      <div class="card-header">
        <h4>
          Usuarios
          <RouterLink to="/users/create" class="btn btn-primary float-end">
            Nuevo usuario
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">Nro.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Nombre de usuario</th>
            <th scope="col">correo</th>
            <th scope="col">Edad</th>
            <th scope="col">Fecha de nacimiento</th>
            <th scope="col">Acciones</th>
          </tr>
          </thead>
          <tbody v-if="users.length > 0">
          <tr v-for="(user, index) in this.users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.birthDay }}</td>
            <td>
              <RouterLink :to="{ path: '/users/' + user.id + '/edit' }" class="btn btn-success">
                Editar
              </RouterLink>
              <button type="button" @click="deleteUserById(user.id)" class="btn btn-danger">
                Borrar
              </button>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="7">No se encontraron resultados</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>