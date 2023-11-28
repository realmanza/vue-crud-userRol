<script>
import axios from "axios";

import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: "UserEditView",
  data() {
    return {
      userId: '',
      model: {
        user: {
          id:'',
          firstName: '',
          lastName: '',
          username:'',
          password:'',
          email: '',
          age: '',
          birthDay: ''
        }
      }
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'El correo es requerido';
      }

      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'No es un correo válido';
      }

      // All is good
      return true;
    },
    required(value) {
      return value && value.trim() ? true : 'Esta dato es requerido';
    },
    getUserById(userId) {
      axios.get(`http://localhost:8080/v1/users/${userId}`).then(res => {
        this.model.user = res.data;
        //this.model.user.birthDay=res.data.birthDay.format('YYYY-MM-DD');
      }).catch(function (error) {
        // handle error on UI site
      })
    },
    editUser() {
      axios.put(`http://localhost:8080/v1/users/${this.userId}`, this.model.user)
          .then(res => {
            alert('El usuario fue actualizado satisfactoriamente');
          }).catch(function (error) {
        // handle error on UI site
      })
      return false;
    }
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getUserById(this.userId);
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Editar datos del usuario</h4>
      </div>
      <Form @submit="editUser">
        <div class="card-body">
          <div class="mb-3">
            <label for="">Nombre<span style="color:red">*</span></label>
            <Field name="firtName" type="text" v-model="model.user.firstName" class="form-control" :rules="required"/>
            <ErrorMessage name="firtName" style="color:red"/>
          </div>
          <div class="mb-3">
            <label for="">Apellido<span style="color:red">*</span></label>
            <Field name="lastName" type="text" v-model="model.user.lastName" class="form-control" :rules="required"/>
            <ErrorMessage name="lastName" style="color:red"/>
          </div>
          <div class="mb-3">
            <label for="">Nombre de usuario<span style="color:red">*</span></label>
            <Field name="username" type="text" v-model="model.user.username" class="form-control" :rules="required"/>
            <ErrorMessage name="username" style="color:red"/>
          </div>
          <div class="mb-3">
            <label for="">Contraseña</label>
            <input type="password" v-model="model.user.password" class="form-control">
          </div>
          <div class="mb-3">
            <label for="">Correo<span style="color:red">*</span></label>
            <Field name="email" type="email" v-model="model.user.email" class="form-control" :rules="validateEmail"/>
            <ErrorMessage name="email" style="color:red"/>
          </div>
          <div class="mb-3">
            <label for="">Edad</label>
            <input type="number" v-model="model.user.age" class="form-control">
          </div>
          <div class="mb-3">
            <label for="">Fecha de nacimiento</label>
            <input type="date" v-model="model.user.birthDay" class="form-control">
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">
              Guardar
            </button>&nbsp;
            <RouterLink to="/users" class="btn btn-primary">
              Retornar
            </RouterLink>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>

</style>