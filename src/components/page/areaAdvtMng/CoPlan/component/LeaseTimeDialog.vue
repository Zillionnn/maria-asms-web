<template>
  <v-dialog v-model="_visible" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark @click="openDialog">发布为正式方案</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">发布</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div style="display:flex;justify-content:space-between;">
              <v-text-field
                v-model="form.expireDate"
                label="过期日期"
                required
                @click="datepicker=true"
              ></v-text-field>
              <v-text-field
                v-model="form.expireHour"
                label="过期时间"
                required
                @click="timepicker=true"
              ></v-text-field>

              <v-dialog v-model="datepicker" max-width="290px">
                <v-date-picker v-model="form.expireDate" @change="datepicker = false" locale="zh"></v-date-picker>
              </v-dialog>
              <v-dialog v-model="timepicker" max-width="290px">
                <v-time-picker v-model="form.expireHour" @change="datepicker = false" format="24hr"></v-time-picker>
              </v-dialog>
            </div>
            <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="cancelDialog">取消</v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" flat @click="validateBeforeSUB">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LeaseTimeDialog',
  components: {},
  props: {
    dialog: {
      type: Object,
      required: false
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
        expire_time: null
      },
      datepicker: false,
      timepicker: false
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
        this.submit()
      }
    },
    submit () {
      if (this.dialog.mode === 'add') {
        console.log(this.form)
        this.form.expire_time = `${this.form.expireDate} ${this.form.expireHour}`
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
