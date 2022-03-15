<template>
<div data-app>
    <p v-if="loading" class="post--empty">Loading....</p>
    <div v-else>
        <v-card dark max-width="400" class="mx-auto">

            <v-container>
                <v-row dense>

                    <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="280" dark>
                            <template v-slot:activator="{ on, attrs }">
                                <v-row class="pb-0  pt-0 pr-4 pl-3" color="#015b64" dark>
                                    <!-- <v-spacer></v-spacer> -->
                                    <v-col cols="8" class="ml-1">
                                        <!-- <v-text-field class="p-1 mb-2 mr-0 ml-1" v-model="search" append-icon="mdi-magnify" label="Search" border rounded-pill single-line hide-details></v-text-field> -->
                                        <v-autocomplete :items="list_coin2" item-text="name_coin" item-value="name_coin" label="coin" required></v-autocomplete>

                                    </v-col>
                                    <v-col cols="3">
                                        <v-btn dark v-bind="attrs" v-on="on" class="btn btn-success  mt-3 ml-0" @click="dialog = true" outlined rounded small>
                                            <v-icon>mdi-plus</v-icon>รายการ
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </template>

                            <v-card>
                                <v-card-text>
                                    <v-container>
                                        <h4 class="mt-4 font-weight-bold" align="center" justify="center">เพิ่มสมาชิก</h4>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4" class="pl-0">
                                                <v-alert v-model="danger" dismissible class=" mb-0 pb-2 pt-2 error" color="#ffcc00" width="240">
                                                    {{ alt_txt }}
                                                </v-alert>
                                                <v-alert v-model="danger1" dismissible class="pr-4 pl-4 ml-4 mr-1 mb-0 pb-2 pt-2 success" color="#33cc66">
                                                    {{ alt_txt }}
                                                </v-alert>
                                            </v-col>
                                            <v-autocomplete :items="tickets" v-model="num_coin" item-text="symbol" item-value="symbol" label="coin*" required></v-autocomplete>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click.prevent="add_coin_home">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>

                    <!-- Custom rounded search bars with input group -->
                    <!-- End -->

                    <!-- dddd -->
                </v-row>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog1" hide-overlay persistent width="500">
            <v-card color="#eceff1" dark>
                <v-card-text style="padding: 30px; color: #000;">
                    <center>
                        <!-- <v-img src="image/error.png" width="90px" height="90px" /> -->
                        <br>
                        <h1>ERROR</h1>
                        <br>
                        <span style="font-size: 28px;">กรุณาทำการ Log in ก่อนเข้าเสมอ</span>
                    </center>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</div>
</template>

<script>
/* eslint-disable */
// import addCoin from '../components/addCoin.vue'
import axios from 'axios'

export default {
    name: 'home',
    data: () => ({
        ID: '',
        email: '',
        name: '',
        Password: '',
        Status: '',
        numm: '',
        gg: 0,
        show: false,

        buysell: '',
        entry: '',
        total: '',
        num: '',
        da: '',

        posts: null,
        loading: false,

        name_coin: '',
        num_coin: '',
        // price: 0,
        tickets2: [],
        tickets: [],
        sumEntry: '',
        entry: '0',
        sum: 0,

        sum_getPrice: 0,
        sum_getPrice2: [],

        editedSid: 'editedSid',
        editedSid2: 'editedSid2',
        dialog20: false,
        dialog02: false,
        dialog: false,
        dialog1: false,
        dialogAdd: false,
        list_coin: [],
        list_coin2: [],

        alt_txt: '',
        danger: false,
        danger1: false,

        search: '',

    }),
    methods: {
        async add_coin_home() {
            if (
                this.num_coin == ''
            ) {
                this.danger = true;
                this.alt_txt = 'กรุณาเลือกเหรียญ'
            } else {
                let add_coin_home = {
                    ID: this.ID,
                    num_coin: this.num_coin,
                }
                console.log(add_coin_home)
                let res = await fetch('http://localhost:7000/add_coin_home', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(add_coin_home),
                })
                let data = await res.json()
                console.log('data', data.status)
                if (data.status == 'ok') {
                    this.type_api = 'success';
                    this.danger1 = true;
                    this.alt_txt = 'เพิ่มเหรียญสำเร็จ'
                    this.num_coin = ''

                    setTimeout(() => (location.reload()), 500)
                }
                if (data.status == 'no') {
                    this.type_api = 'error';
                    this.danger = true;
                    this.alt_txt = 'มีเหรียญนี้แล้ว'
                    this.num_coin = ''
                    // setTimeout(() => (location.reload()), 500)
                }
            }
        },
    },
    async created() {

        if (!window.sessionStorage.getItem('email')) {
            this.dialog1 = true
            setTimeout(() => (this.dialog1 = false, this.$router.push('/')), 2000)
        } else {
            try {
                this.loading = true;
                let email = window.sessionStorage.getItem('email')
                let res = await fetch('http://localhost:7000/logUser?email=' + email)
                let data = await res.json()
                this.email = data.rows[0][0].email
                this.Password = data.rows[0][0].Password
                this.ID = data.rows[0][0].ID
                this.name = data.rows[0][0].name
                this.Status = data.rows[0][0].Status

                try {
                    let res = await axios({
                        url: 'http://localhost:7000/list_coin?ID=' + this.ID,
                        method: "GET",
                    });
                    let posts = res.data;
                    this.posts = posts.rows[0];

                    for (var i = 0; i < this.posts.length; i++) {
                        await axios.get(`http://localhost:7000/list_coin2?ID=${this.ID}&name_coin=${this.posts[i].name_coin}`).then(res => {

                            this.entry = res.data.rows[0].entry
                            this.list_coin2[i] = res.data.rows[0]
                            // console.log(i, ' posts Result: ', res.data.rows[0])
                        }).catch(err => {
                            console.log('Error: ', err)
                        })
                    }

                } catch (error) {
                    console.log('Error: ', error)
                }

                this.loading = false;

            } catch (e) {
                console.log('list_coin  False !!', e)
            }

        }
    },
    mounted() {
        this.list_coin2
        axios.get('https://api.bitkub.com/api/market/symbols')
            .then((a) => {
                this.tickets = a.data.result
                // console.log(a.data.result)

            })
        axios.get('https://api.bitkub.com/api/market/ticker')
            .then((a) => {
                this.tickets2 = a.data
                // console.log('tickets2', a.data)
            })

        const interval = setInterval(() => this.list_coin2, 10000);
        return () => {
            clearInterval(interval);
        };
    },
    
}
</script>
