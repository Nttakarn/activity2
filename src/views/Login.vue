<template>
<div data-app>
    <v-app>
        <v-main>
            <v-container class="fill-height pa" fluid>
                <v-row align="center" justify="center" dense>
                    <v-col cols="12" sm="8" md="4" lg="4">
                        <v-card elevation="0">
                            <v-img src="@/assets/qr.png" alt="" contain height="60"></v-img>
                            <h4 class="mt-4 font-weight-bold" align="center" justify="center">
                                กิจกรรมพิเศษ QrCode
                            </h4>
                            <v-card-text class="pr-8">
                                <v-form class="">
                                    <v-alert v-model="danger" dismissible class="pr-4 warning">
                                        {{ alt_txt }}
                                    </v-alert>
                                    <v-text-field v-model="ID_student" label="Enter your ID Student" name="ID_student" prepend-inner-icon="mdi-account-circle" type="ID_student"  outlined></v-text-field>
                                    <v-text-field v-model="Password" style="" label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password"  outlined></v-text-field>
                                    <v-btn @click.prevent="Signin" type="submit"  color="#000000" x-large block dark>Login</v-btn>
                                    <!-- <br /><br />
                                    <p align="center" justify="center" class="">
                                        <small>No account?</small>
                                        <router-link to="/signup" class="ml-2 black--text font-weight-black">Sign Up</router-link>
                                    </p> -->
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <!-- dialog -->

            <!-- dialog -->
            <!-- dialog -->
        </v-main>
    </v-app>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Login',
    data() {
        return {
            ID_student: '',
            Password: '',

            type_api: '',
            danger: false,
            alt_txt: '',
            rules: {
                required: 'กรุณากรอกข้อมูล'
            }
        }
    },
    methods: {
        async Signin() {
            let login = {
                ID_student: this.ID_student,
                Password: this.Password,
            }
            console.log('Login')
            console.log('ID_student', this.ID_student)
            console.log('Password', this.Password)
            let res = await fetch('http://localhost:7000/login', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(login),
            })
            let data = await res.json()
            console.log('data', data.status)
            if (data.status == 'ok') {
                if (data.rows[0].Status == 'user') {
                    console.log('ID_student=', JSON.stringify(data.rows[0].ID_student))
                    // window.localStorage.setItem('user', JSON.stringify(res.data.user))// แบบนี้ เก็บถาวร
                    window.sessionStorage.setItem(
                        'ID_student',
                        JSON.stringify(data.rows[0].ID_student),
                    ) // แบบนี้หาย เมื่อ restart หรือ ปิด  browser
                    this.$router.push('/home')
                    // setTimeout(
                    //     () => ((this.dialog = false), this.$router.push('/home')),
                    //     3000,
                    // )
                } else if (data.rows[0].Status == 'admin') {
                    console.log('ID_student=', JSON.stringify(data.rows[0].ID_student))
                    // window.localStorage.setItem('user', JSON.stringify(res.data.user))// แบบนี้ เก็บถาวร
                    window.sessionStorage.setItem(
                        'ID_student',
                        JSON.stringify(data.rows[0].ID_student),
                    ) // แบบนี้หาย เมื่อ restart หรือ ปิด  browser
                    this.dialog = true
                    this.$router.push('/admin');
                }
            }
            if (data.status == 'fail') { // ID_student || pass ค่าว่าง
                this.ID_student = ''
                this.Password = ''
                this.danger = true;
                this.alt_txt = 'กรุณากรอกข้อมูลให้ครบ'
            }
            if (data.status == 'no') { // ID_student || pass ไม่ถูก
                this.ID_student = ''
                this.Password = ''
                this.danger = true;
                this.alt_txt = 'ไม่พบบัญชีผู้ใช้งาน'
                // this.alt_txt = 'กรุณาตรวจสอบ ID_student หรือ รหัสผ่าน'
            }
        },
    }
}
</script>
