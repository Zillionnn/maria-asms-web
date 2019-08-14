<template>
  <v-dialog v-model="_visible" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark @click="openDialog">新增企业</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          {{this.dialog.mode === 'add'? '新增' : '修改'}}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="form.name" :counter="20" :rules="nameRules" label="公司名称" required></v-text-field>
            <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
           <v-text-field v-model="form.contact" :counter="20" label="联系人"></v-text-field>
           <v-text-field v-model="form.phone" :counter="20" label="电话" required></v-text-field>

            <v-text-field v-model="form.address" :counter="20"  label="地址" required></v-text-field>

          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="cancelDialog">取消</v-btn>
        <v-btn color="blue darken-1"  :disabled="!valid" flat @click="validateBeforeSUB">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogForm',
  components: {},
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  computed: {
    _visible () {
      return this.dialog.visible
    }
  },
  data () {
    return {
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      form: {
        name: null
      }
    }
  },
  methods: {
    resetForm () {
      this.form = {
        name: null
      }
    },
    cancelDialog () {
      this.resetForm()
      this.$emit('cancel')
    },
    openDialog () {
      this.$emit('open')
    },
    validateBeforeSUB () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.subCo()
      }
    },
    subCo () {
      if (this.dialog.mode === 'add') {
        this.$emit('submit', this.form)
      } else {
        this.$emit('update', this.form)
      }
    }

  },
  watch: {
    _visible (val, oldVal) {
      if (val) {
        if (this.dialog.mode === 'edit') {
          this.form = { ...this.dialog.info }
        }
      } else {
        this.resetForm()
      }
    }
  }
}
</script>

<style scoped>
</style>
