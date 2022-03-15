<template>
<div data-app>

    <v-app id="Home" class="ma-2 fa">
        <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg" gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)">
                <v-card-text>
                    <v-container class="fill-height">
                        <v-row align="center">
                            <v-avatar size="45px">
                                <a href="#" style="text-decoration: none;"><img src="https://i.pravatar.cc/64"></a>
                            </v-avatar>
                            <v-row justify="end">
                                <v-badge color="#41AB55" overlap content="3" class="mr-2">
                                    <v-avatar color="#ECF7EE" size="40">
                                        <a href="#" style="text-decoration: none;">
                                            <v-icon color="#41AB55" size="17">
                                                mdi-bell
                                            </v-icon>
                                        </a>
                                    </v-avatar>
                                </v-badge>
                            </v-row>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-text>
                    <v-row justify="start">
                        <div class="text-h5 font-weight-light pl-3">
                            สวัสดีค่ะ !
                        </div>
                    </v-row><br>
                    <div class="text-uppercase font-weight-light">
                        คุณ {{ Firstname }} {{ ID_student }}
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-text-field append-icon="mdi-microphone" class="mx-4" flat hide-details label="Search" prepend-inner-icon="mdi-magnify" solo-inverted />
                </v-card-text>
            </v-img>
        </v-card>
        <v-card light flat>
            <v-card-text>
                <h2 class="text-h6 mb-2">
                    แท็กนิยม
                </h2>

                <v-chip-group column multiple active-class="primary--text">
                    <v-chip filter outlined>
                        #กิจกรรมลูกเสือ
                    </v-chip>
                    <v-chip filter outlined>
                        #กิจกรรมวันพ่อ
                    </v-chip>
                    <v-chip filter outlined>
                        #กิจกรรมวันสำคัญ
                    </v-chip>
                    <v-chip filter outlined>
                        #กิจกรรมวันแม่
                    </v-chip>
                    <v-chip filter outlined>
                        #สมาสบอยสมาสเกริด
                    </v-chip>
                </v-chip-group>
            </v-card-text>
        </v-card>
        <!-- กิจกรรม -->
        <tr v-for="st in student" :key="st.ID_activity ">
            <v-card light>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg" gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)" height="200">
                    <v-card-title>
                        <span class="text-h6 font-weight-light white--text"><b>{{ st.Activity }}</b></span>
                        <v-row justify="end">
                            <v-btn icon>
                                <v-icon color="grey lighten-1" normal>
                                    mdi-dots-vertical
                                </v-icon>
                            </v-btn>
                        </v-row>
                    </v-card-title>
                    <v-card-text class="white--text">
                        {{ st.Place }} <br> ระยะการเข้าร่วม {{ st.Date_start }} ถึง {{ st.Date_close }}
                    </v-card-text>
                    <v-card-actions class="mt-n3">
                        <v-list-item>
                            <div color="grey lighten-3">
                                <v-avatar class="ml-n3" size="30">
                                    <!-- <img src="@/assets/img/ดาวน์โหลด (2).jpg" alt=""> -->
                                </v-avatar>
                                <v-avatar class="ml-n3" size="30">
                                    <!-- <img src="@/assets/img/56 (1).jpg" alt=""> -->
                                </v-avatar>
                                <v-avatar class="ml-n3" size="30">
                                    <!-- <img src="@/assets/img/ดาวน์โหลด (2).jpg" alt=""> -->
                                </v-avatar>
                                <v-avatar class="ml-n3" size="30" color="black">
                                    <span class="caption white--text">+220</span>
                                </v-avatar>
                            </div>
                            <v-row align="end" justify="end">
                                <v-icon class="mr-1 white--text" small>
                                    mdi-account
                                </v-icon>

                                <span class="caption white--text">223</span>
                                <!-- <router-link :to="{ path: '/U_avtivities?ID_student='+ID_student+'/id_postad='+st.id_postad, params: { ID_student: ID_student , id_postad:st.id_postad}}"> -->
                                <!-- <router-link :to="{ path: '/U_avtivities?ID_student='+ID_student, params: { ID_student: ID_student , id_postad:st.id_postad}}"> -->
                                <!-- <router-link :to="{ path: '/U_avtivities/:ID_student/:id_postad', params: { ID_student: ID_student , id_postad:st.id_postad}}"> -->
                                <!-- <v-icon btn class="mx-2 white--text" small>
                                    mdi-chevron-double-right
                                </v-icon> -->
                                <v-dialog :v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon class="mr-1 white--text" v-bind="attrs" v-on="on" small>
                                            mdi-chevron-double-right
                                        </v-icon>
                                    </template>

                                    <v-card>
                                        <v-card-title style="color: black; background: #e3e5f1;">
                                            {{ st.Activity }} {{ st.ID_activity }}
                                        </v-card-title>
                                        <v-card-text style="color: black; background: #e3e5f1;">
                                            <center>
                                                <br>
                                                <v-avatar class="mb-3" width="250" height="150" tile>
                                                    <v-img :src="st.src"></v-img>
                                                </v-avatar>
                                                <br>

                                                <span class="pt-2"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga quae, ab maxime eos quos voluptas reprehenderit praesentium. Quis, doloremque animi nulla quod aperiam aliquid earum voluptatibus dolor aut commodi nobis.</span>
                                                <br>
                                                <p class="mt-2 mb-0">วันที่ : {{ st.artist }}</p>
                                                <p class="mt-1">ณ วิทยาลัยเทคนิคชัยภูมิ</p>
                                            </center>
                                            <v-btn @click="AddAc(st.ID_activity)"  color="#158" block dark>เข้าร่วม</v-btn>

                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <!-- </router-link> -->
                            </v-row>
                        </v-list-item>
                    </v-card-actions>
                </v-img>
            </v-card>
            <br>
        </tr>
        <br> <br> <br>

        <v-bottom-navigation fixed bottom light>
            <v-btn value="recent" to="./UHome">
                <span>Home</span>

                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn value="favorites">
                <span>Search</span>

                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <!-- <router-link :to="{ path: '/U_avtivities?ID_student='+ID_student, params: { ID_student: ID_student , id_postad:st.id_postad}}"> -->

            <!-- <v-btn value="nearby" icon color="#FF0000" :to="{ path: '/Uprofile?ID_student='+ID_student , params: { ID_student: ID_student}}">
        <v-icon>mdi-account circle</v-icon>
      </v-btn> -->
            <v-btn value="nearby" icon color="#FF0000" :to="{ name: 'profile' , params: { ID_student:ID_student}}">

                <!-- <v-btn value="nearby" icon color="#FF0000"> -->
                <span>profile</span>

                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
    <v-dialog v-model="dialogAdd" max-width="290">
        <v-card>
            <v-card-title class="text-h5">
                เข้าร่วมสำเร็จ
            </v-card-title>

            <v-card-text>
                เข้าร่วมสำเร็จ
            </v-card-text>

            <v-card-actions>
                <!-- <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">
                    Disagree
                </v-btn> -->

                <v-btn color="green darken-1" text @click="dialogAdd = false">
                    Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
    name: 'home',
    data: () => ({
        ID_student: '',
        Password: '',
        ID: '',
        Firstname: '',
        Status: '',
        dialog: '',
        dialogAdd: '',
        student: [],
    }),
    methods: {
        logout() {
            window.sessionStorage.removeItem('email')
            return this.$router.push('/')
        },
        async Show() {
            console.log('show data')
            const res = await fetch('http://localhost:7000/activity') // const ประกาศตัวแปร
            const data = await res.json()
            this.student = data.rows[0]
            console.log(data.rows[0])
        },
        async AddAc(ID_activity) {

            let aaaaaaaaa = {
                ID_activity: ID_activity,
                ID_student: this.ID_student
            }
            console.log(aaaaaaaaa)
            // let res = await fetch('http://localhost:7000/AddAc2?ID_activity=' + ID_activity + '&ID_student=' + this.ID_student)
            let res = await fetch('http://localhost:7000/aaaaaaaaa', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(aaaaaaaaa),
            })
            let data = await res.json()
            console.log('data', data.status)
            // if (data.status == 'ok') {
            //     setTimeout(() => (this.dialog = false, this.$router.push('/home')), 1000)
            // }

        },
    },
    async created() {
        if (!window.sessionStorage.getItem('ID_student')) {
            this.dialog1 = true
            setTimeout(() => (this.dialog1 = false, this.$router.push('/')), 2000)
        } else {

            this.Show()
            try {
                this.loading = true;
                let ID_student = window.sessionStorage.getItem('ID_student')
                let res = await fetch('http://localhost:7000/logUser?ID_student=' + ID_student)
                let data = await res.json()
                this.ID_student = data.rows[0][0].ID_student
                this.Password = data.rows[0][0].Password
                this.ID = data.rows[0][0].ID
                this.Firstname = data.rows[0][0].Firstname
                this.Status = data.rows[0][0].Status

            } catch (e) {
                console.log('window.sessionStorage.getItem false', e)
            }
        }
    }
}
</script>
