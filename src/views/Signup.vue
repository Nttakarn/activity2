<template>
<div data-app>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" dense>
                    <v-col cols="12" sm="8" md="4" lg="4">
                        <v-card elevation="0">
                            <!-- <a href="https://edu-fedorae.netlify.app" name="Fedorae Education" title="Fedorae Education" target="_blank"> -->
                            <v-img src="@/assets/11.png" contain height="55"></v-img>
                            <h4 class="mt-4 font-weight-bold" align="center" justify="center">Crypto Portfolio</h4>
                            <!-- </a> -->
                            <v-card-text>
                                <v-form>
                                    <v-alert v-model="danger" dismissible class="pr-4 error">
                                        {{ alt_txt }}
                                    </v-alert>
                                    <v-alert v-model="danger1" dismissible class="pr-4 success">
                                        {{ alt_txt }}
                                    </v-alert>
                                    <v-text-field v-model="name" label="Enter your name" name="name" prepend-inner-icon="mdi-account" type="text" rounded outlined required></v-text-field>
                                    <v-text-field v-model="email" label="Enter your email" name="email" prepend-inner-icon="mdi-email" type="email" rounded outlined required></v-text-field>
                                    <v-text-field v-model="tel" label="Number Phone" name="Phone" prepend-inner-icon="mdi-phone" type="text" rounded outlined></v-text-field>
                                    <v-text-field v-model="password" label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password" rounded outlined required></v-text-field>
                                    <v-text-field v-model="con_password" label="Confirm your password" name="password" prepend-inner-icon="mdi-lock" type="password" rounded outlined></v-text-field>
                                    <!-- <v-text-field  label="Re-enter password" name="password" prepend-inner-icon="mdi-lock-outline" type="password" rounded outlined></v-text-field> -->
                                    <v-btn type="submit" @click.prevent="insert" name="save" rounded color="#000000" x-large block dark>Register</v-btn><br>
                                    <!-- <v-card-actions class="text--secondary ml-10 mt-2" > -->
                                    <!-- <v-spacer></v-spacer> -->
                                    <p align="center" justify="center" class=""><small>Already have an account?</small>
                                        <router-link :to="{ name: 'login' }" class="ml-2 black--text font-weight-black">Login</router-link>
                                    </p>
                                    <router-view />
                                    <!-- </v-card-actions> -->
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- dialog  -->

                <!-- dialog  -->
                <!-- dialog  -->
                <!-- dialog  -->
            </v-container>
        </v-main>
    </v-app>
</div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            con_password: '',
            tel: '',

            type_api: '',
            danger: false,
            danger1: false,
            alt_txt: '',
            rules: {
                required: 'กรุณากรอกข้อมูล'
            }
        }
    },
    methods: {
        async insert() {
            if (
                this.email == '' ||
                this.name == '' ||
                this.tel == '' ||
                this.password == '' ||
                this.con_password == ''
            ) {
                this.danger = true;
                this.alt_txt = 'กรุณากรอกข้อมูลให้ครบ'
            } else {
                let insert_user = {
                    email: this.email,
                    name: this.name,
                    tel: this.tel,
                    password: this.password,
                    con_password: this.con_password
                }
                console.log(insert_user)
                let res = await fetch('http://localhost:7000/insert_user', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(insert_user),
                })
                let data = await res.json()
                console.log('data', data.status)
                if (data.status == 'ok') {
                    this.type_api = 'success';
                    this.danger1 = true;
                    this.alt_txt = 'สมัครสมาชิกสำเร็จ'

                    // setInterval(() => {
                    //     this.$router.push({ name: "login"})
                    //     this.$router.push('/').catch(err => {})
                    // }, 3000)
                    setTimeout(() => (this.$router.push({
                        name: 'login'
                    })), 2000)
                }
                if (data.status == 'fail') {
                    this.type_api = 'error';
                    this.danger = true;
                    this.alt_txt = 'กรุณากรอก password ให้ตรงกัน'
                    this.password = ''
                    this.con_password = ''
                }
                if (data.status == 'no') {
                    this.type_api = 'error';
                    this.danger = true;
                    this.alt_txt = 'มีคนใช้ E-mail นี้แล้ว'
                    this.name = ''
                    this.email = ''
                    this.tel = ''
                    this.password = ''
                    this.con_password = ''
                }
            }
        },
    },
}
</script>

<style lang="css" scoped>

</style>
