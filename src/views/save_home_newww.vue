<template>
<div data-app>
    <p v-if="loading" class="post--empty">Loading....</p>
    <div v-else>
        <v-card dark max-width="400" class="mx-auto">
            <v-app-bar dark color="pink">
                <v-btn icon>
                    <v-icon>mdi-account circle</v-icon>
                </v-btn>
                <v-toolbar-title> name : {{name}} , ID : {{ID}} </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="logout">
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </v-app-bar>
            <!-- {{list_coin}} -->

            <v-container>
                <v-row dense>
                    <v-col cols="12">
                        <!-- <v-col v-for="(post,i) in list_coin2" :key="i" cols="12"> -->

                        <v-card color="#015b64" dark>
                            <v-card-title class="text-h2 mb-3">
                                มูลค่ารวมพอร์ท <v-spacer></v-spacer><small>( +100 % )</small>
                            </v-card-title>
                            <v-card-subtitle align="center" class="pb-1">
                                <!-- <h2> 120,000,000 B. <h6 class="font-weight-light">(+10000)</h6>
                                </h2> -->
                                <h2>{{totalRequest_value}} B. <h6 class="font-weight-light">(+10000)</h6>
                                </h2>{{getName(0)[0]}}
                                <v-col v-for="(post) in list_coin2" :key="post.name_coin" cols="12">

                                    <h2>
                                        <h5 class="text-warning  mb-0"> {{price(post.num,getCoin(post.name_coin))}} B.</h5>
                                        <h5 class="text-warning  mb-0"> {{getPrice20(post.num,post.name_coin)}} B.</h5>
                                    </h2>

                                </v-col>
                            </v-card-subtitle>
                            <v-list-item class="grow">
                                <v-icon class="ml-1">mdi-bank</v-icon>
                                <v-list-item-content>
                                    <small class="font-weight-bold ml-2"> {{totalRequest}} </small>
                                </v-list-item-content>

                                <small>{{list_coin2.length}}</small>
                                <v-icon class="ml-1">mdi-bank</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-col>

                    <!-- dddd -->
                    <!-- <v-spacer></v-spacer> -->
                    <v-row justify="center">
                        <v-dialog v-model="dialog" persistent max-width="280" dark>
                            <template v-slot:activator="{ on, attrs }">
                                <v-row class="pb-3  pt-2 pr-4 pl-3" color="#015b64" dark>
                                    <!-- <v-spacer></v-spacer> -->
                                    <v-col cols="8" class="ml-1">
                                        <v-text-field class="p-1 mb-2 mr-0 ml-1" v-model="search" append-icon="mdi-magnify" label="Search" border rounded-pill single-line hide-details></v-text-field>
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
                                            <v-select :items="tickets" v-model="num_coin" item-text="symbol" item-value="symbol" label="coin*" required></v-select>

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

                    <!-- <addCoin /> -->

                    <!-- Custom rounded search bars with input group -->
                    <!-- End -->

                    <!-- dddd -->

                    <v-col v-for="post in list_coin2" :key="post.ID" cols="12">

                        <v-card class="mx-auto " color="#272727" dark max-width="400">
                            <v-card-title class="pb-0 pt-2 pr-2 pl-2">
                                <v-avatar size="42" tile class="mt-0">
                                    <v-img src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png"></v-img>
                                </v-avatar>
                                <!-- <span class="text-h6 font-weight-light" >Twitter</span> -->
                                <v-col>
                                    <h6 class="ml-0 text-capitalize" v-text="post.name_coin"></h6>
                                </v-col>
                                <h6 v-if="post.entry === null" class="caption text-subtitle-2  text-center font-weight-light mr-2">
                                    0
                                </h6>
                                <h6 v-else class="caption text-subtitle-2  text-center font-weight-light mr-2">
                                    {{getEntry(post.entry)}}
                                </h6>
                                <h6 class="text-warning ml-0 caption text-end font-weight-light">
                                    <!-- Last --> {{getCoin(post.name_coin)}}
                                    <small class="font-weight-light text-danger mb-4" v-if="getProfit2(getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total),post.total) < 0 "> ({{getProfit2(getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total),post.total)}}<small> %</small>)</small>
                                    <small class="font-weight-light text-muted mb-4" v-else-if="getProfit2(getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total),post.total) == 'NaN' "> ( 0<small> %</small>)</small>
                                    <small v-else class="font-weight-light text-success mb-4"> (+{{getProfit2(getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total),post.total)}}<small> %</small>)</small>
                                </h6>
                            </v-card-title>

                            <h6 align="center" class="mb-0">
                                <!-- <h4> {{t_coin.total}} 0 B. <h6 class="font-weight-light">{{t_coin}}</h6> -->
                                <!-- บาท -->
                                <!-- <h5 class="text-danger  mb-0" v-if="getPrice(post.num,getCoin(post.name_coin)) < 0"> -{{getPrice(post.num,getCoin(post.name_coin))}} B.</h5>
                                <h5 class="text-warning  mb-0" v-else-if="getPrice(post.num,getCoin(post.name_coin)) == 'NaN'"> 0 B.</h5>
                                <h5 class="text-warning  mb-0" v-else>{{getPrice(post.num,getCoin(post.name_coin))}} B.</h5> -->

                                <h5 class="text-danger  mb-0" v-if="getPrice2(post.num,post.name_coin) < 0"> -{{getPrice2(post.num,post.name_coin)}} B.</h5>
                                <h5 class="text-warning  mb-0" v-else-if="getPrice2(post.num,post.name_coin) == 'NaN'"> 0 B.</h5>
                                <h5 class="text-warning  mb-0" v-else>{{getPrice2(post.num,post.name_coin)}}B.</h5>

                                <!-- <h5 class="text-warning  mb-0">{{getPrice2(post.num,post.name_coin)}} B.</h5> -->

                                <!-- total -->
                                <h6 class="font-weight-light  mb-0">{{post.total}}

                                    <small class="mb-0 text-danger" v-if="getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total) < 0">( {{getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total)}} )</small>
                                    <!-- % --><small class="mb-0 text-muted" v-else-if="getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total) == 'NaN' ">( 0 )</small>
                                    <small class="mb-0 text-success" v-else>( +{{getProfit((getPrice(post.num,getCoin(post.name_coin))),post.total)}} )</small>

                                </h6>

                            </h6>

                            <v-card-actions class="mb-0 pt-0 pb-0  pl-0 pr-0">
                                <v-list-item class="grow pr-2 pl-3">
                                    <v-icon class="">mdi-credit-card </v-icon>
                                    <v-list-item-content>
                                        <small class="font-weight-bold ml-1"> {{post.num}}</small>
                                        <!-- <small class="font-weight-bold ml-1"> {{gg = (gg+post.num)-gg}}</small> -->

                                    </v-list-item-content>
                                    <!-- <router-link :to="{ name: 'coinHis' }" > -->
                                    <small class="">
                                        <!-- <v-btn :to="{ name: 'coinHis' , params: { name_coin: t_coin.name_coin , ID: t_coin.ID}}" dark class="btn-warning sm" outlined rounded small> -->
                                        <v-btn :to="{ name: 'coinHis' , params: { name_coin: post.name_coin , ID: ID}}" dark class="btn-muted sm" outlined rounded small>
                                            <!-- <v-btn dark class="btn-warning sm" outlined rounded small> -->
                                            <!-- <v-btn  dark class="btn-warning sm" outlined rounded small> -->
                                            <v-icon small>mdi-note</v-icon>
                                        </v-btn>
                                        <!-- <v-btn dark class="btn-muted sm ml-1" @click="dialog20 = true" outlined rounded small>
                                            <v-icon small>mdi-plus</v-icon>
                                        </v-btn> -->

                                        <v-dialog :v-model="dialog" width="500">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon small v-bind="attrs" v-on="on" class="mr-2">
                                                    mdi-file-document-edit
                                                </v-icon>
                                                <v-btn dark class="btn-muted sm ml-1" v-bind="attrs" v-on="on" outlined rounded small>
                                                    <v-icon small>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-text>
                                                    <v-container>
                                                        <!-- <h4 class="mt-4 font-weight-bold" align="center" justify="center"></h4> -->
                                                        <h5 class="mt-4 font-weight-bold" align="center" justify="center">เพิ่มข้อมูลเหรียญ {{post.name_coin}}</h5>

                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-alert v-model="danger" dismissible class=" mb-0 pb-2 pt-2 error" color="#ffcc00">
                                                                {{ alt_txt }}
                                                            </v-alert>
                                                            <v-alert v-model="danger1" dismissible class="pr-4 pl-4 ml-4 mr-1 mb-0 pb-2 pt-2 success" color="#33cc66">
                                                                {{ alt_txt }}
                                                            </v-alert>
                                                        </v-col>
                                                        <v-form>
                                                            <!-- <v-select v-model="buysell" :items="['Buy', 'Sell']" label="Buy/Sell*" required></v-select> -->
                                                            <v-select v-model="buysell" :items="['Buy', 'Sell']" label="Buy/Sell*" required></v-select>
                                                            <v-text-field v-model="entry" label="ราคาเข้าซื้อ / เหรียญ*" hint="( 900,000/BTC )" required></v-text-field>
                                                            <v-text-field v-model="total" label="จำนวนเงิน" hint="" required></v-text-field>
                                                            <!-- <v-text-field v-model="tax" label="ภาษี*" required></v-text-field> -->
                                                            <v-text-field v-model="num" label="จำนวนเหรียญ*" hint="" persistent-hint></v-text-field>
                                                            <input v-model="da" type="datetime-local" label="วันที่,เวลา*" name="datetime">
                                                        </v-form>

                                                    </v-container>

                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>

                                                    <v-btn color="warning" text @click.prevent="save(post.ID,post.name_coin,buysell,entry,total,num,da)">
                                                        เพิ่มข้อมูล
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>

                                        <!-- <v-btn class="btn btn-success ml-2" outlined rounded small>
                                            <v-icon>mdi-play</v-icon>เพิ่มรายการ
                                        </v-btn> -->
                                    </small>
                                    <!-- </router-link> -->
                                </v-list-item>
                            </v-card-actions>
                        </v-card>

                    </v-col>

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
import addCoin from '../components/addCoin.vue'
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

        editedSid: 'editedSid',
        editedSid2: 'editedSid2',
        dialog20: false,
        dialog02: false,
        dialog: false,
        dialog1: false,
        list_coin: [],
        list_coin2: [],

        alt_txt: '',
        danger: false,
        danger1: false,

        search: '',

    }),
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
                console.log('tickets2', a.data)
            })

        const interval = setInterval(() => this.list_coin2, 10000);
        return () => {
            clearInterval(interval);
        };
    },
    components: {
        addCoin
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
                    this.loading = false;
                } catch (error) {
                    console.log('Error: ', error)
                }

                // let res1 = await fetch('http://localhost:7000/list_coin?ID=' + this.ID)
                // let data1 = await res1.json()
                // this.name_coin = data1.rows[0][0].name_coin
                // this.list_coin = data1.rows[0]

                // for (var i = 0; i < this.list_coin.length; i++) {
                //     console.log(this.list_coin[i].name_coin)
                // }

                // console.log('this.name_coin: ', this.list_coin)

                // await axios.get(`http://localhost:7000/list_coin?ID=${this.ID}`).then(res => {
                // this.name_coin = res.rows[0][0].name_coin
                // this.list_coin = res.rows[0]
                //     console.log('list_coin: ', res.data.rows)
                // }).catch(err => {
                //     console.log('Error list_coin: ', err)
                // })

                // let res2 = await fetch('http://localhost:7000/list_coin2?ID=' + this.ID + '&name_coin=' + 'THB_XRP')
                // let data2 = await res2.json()
                // this.list_coin2 = data2.rows[0]

                // await axios.get(`http://localhost:7000/list_coin2?ID=${this.ID}&name_coin=THB_XRP`).then(res => {
                //     console.log('Result: ', res)
                // }).catch(err => {
                //     console.log('Error: ', err)
                // })

                // for( var i=0; i<this.list_coin.length; i++ ) {
                //   console.log( this.list_coin[i].name_coin)
                // }

                // for (var i = 0; i < this.list_coin.length; i++) {
                //     await axios.get(`http://localhost:7000/list_coin2?ID=${this.ID}&name_coin=${this.list_coin[i].name_coin}`).then(res => {
                //         console.log(i, 'Result: ', res.data.rows[0])

                //         this.list_coin2[i] = res.data.rows[0]

                //     }).catch(err => {
                //         console.log('Error: ', err)
                //     })
                // }

                // await axios.get(`http://localhost:7000/list_coin2?ID=${this.ID}&name_coin=${this.name_coin}`).then(res => {
                //     console.log('Result: ', res)
                //      this.list_coin2 = res.data.rows[0]
                // }).catch(err => {
                //     console.log('Error: ', err)
                // })

            } catch (e) {
                console.log('list_coin  False !!', e)
            }

        }
    },
    methods: {
        aa() {
            let number = numeral(1000000).format('0,0')
            //  console.log(number)
            return number
        },
        getEntry(b) {
            let number = numeral(b).format('0.00')
            //  console.log(number)
            return number

        },
        getCoin(b) {
            // console.log('getCoin', b)
            // console.log('getCoin Test', this.tickets2[b].last)
            // let number = numeral(this.tickets2[b].last).format('0.00 a')
            let number = numeral(this.tickets2[b].last).format('0.00 a')
            return number

        },
        getName() {
            let firstName = 'John',
                lastName = 'Doe';

            // return as an array
            return [firstName, lastName];
        },

        getPrice(value, decimals) {

            let number = value * decimals
            return (number).toFixed(2)
        },

        getPrice10(value, b) {
            let number2 = numeral(this.tickets2[b].last)
            let entry_num = number2._input
            let number = value * entry_num

            return (number).toFixed(2)
            // return (number).toFixed(2)
        },

        getPrice2(value, b) {
            let number2 = numeral(this.tickets2[b].last)
            let entry_num = number2._input
            let number = value * entry_num

            return (number).toFixed(2)
            // return (number).toFixed(2)
        },
        getPrice20(value, b) {
            let number2 = numeral(this.tickets2[b].last)
            let entry_num = number2._input
            let number = value * entry_num

            return (number).toFixed(2)
            // return (number).toFixed(2)
        },
        price(value, decimals) {

            let number = value * decimals
            let sum = 0
            sum += number
            console.log('number', number)
            console.log('sum', sum)
            return (sum).toFixed(2)
        },
        price2(value, decimals) {
            let number2 = numeral(this.tickets2[decimals].last)
            let number = value * number2
            let sum = 0
            sum += number
            console.log('number', number)
            console.log('sum', sum)
            return (sum).toFixed(2)
        },

        getProfit(value, decimals) {
            // console.log('getprofit', value)
            // console.log('getprofit', decimals)
            return (value - decimals).toFixed(2)
        },
        getProfit2(value, decimals) {
            // console.log('getProfit2', value)
            // console.log('getProfit2', decimals)
            return ((value / decimals) * 100).toFixed(2)
        },
        logout() {
            window.sessionStorage.removeItem('email')
            return this.$router.push('/')
        },
        close() {
            return dialog = false;
        },
        close_home() {
            setTimeout(() => (location.reload()), 50)
        },
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
                    setInterval(() => {
                        // this.$router.push({ name: "login"})
                        this.$router.push('/home').catch(err => {})
                    }, )
                }
            }
        },
        async save(ID, name_coin, buysell, entry, total, num, da) {
            console.log('เพิ่มข้อมูล : ', ID, name_coin, buysell, entry, total, num, da)
            if (
                buysell == '' ||
                entry == '' ||
                total == '' ||
                num == ''
                // da == ''
            ) {
                this.danger = true;
                this.alt_txt = 'กรุณากรอกข้อมูล'
            } else {
                let insert_coinValue = {
                    ID: this.ID,
                    name_coin: name_coin,
                    buysell: this.buysell,
                    entry: this.entry,
                    total: this.total,
                    num: this.num,
                    da: this.da
                }
                console.log('insert_coinValue', insert_coinValue)
                let res = await fetch('http://localhost:7000/insert_coinValue', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(insert_coinValue),
                })
                let data = await res.json()
                console.log('data', data.status)
                if (data.status == 'ok') {
                    this.type_api = 'success';
                    this.danger1 = true;
                    this.alt_txt = 'เพิ่มข้อมูลสำเร็จ'
                    setTimeout(() => (this.dialog = false, location.reload()), 1000)
                }
            }
        },
    },
    computed: {
        totalRequest() {
            // console.log(this.list_coin2.reduce((acc, item) => acc + item.total, 0))
            return this.list_coin2.reduce((acc, item) => acc + item.total, 0);
        },
        totalRequest_value() {
            return this.list_coin2.reduce((acc, item) => acc + item.total, 0);
        },

    },
}
</script>
