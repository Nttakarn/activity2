<template>
<div class="aaa" data-app>
    <v-card dark max-width="400" class="mx-auto" max-height="600">

        <v-app-bar dark color="pink">
            <router-link :to="{ name: 'home' }">
                <v-btn icon class="pr-2">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
            </router-link>
            <v-toolbar-title class="ml-0 text-capitalize"> {{this.$route.params.name_coin}} || {{this.$route.params.ID}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <h6 class="text-warning ml-3 caption text-end font-weight-light">
                <!-- <v-btn x-small color="#ff0000" class="mt-2" outlined rounded small>
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>&nbsp; -->
                <v-col cols="" class="ml-4">
                    <div class="text-center">
                        <v-dialog v-model="dialog3" max-width="250">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-small color="#ff0000" class="mt-2" outlined rounded small>
                                    <!-- <v-icon v-bind="attrs" v-on="on" btn style="color: red; font-size: 10px;"> -->
                                    <v-icon v-bind="attrs" v-on="on" btn style="color: red; font-size: 15px;">
                                        mdi-delete
                                    </v-icon>
                                </v-btn>&nbsp;

                            </template>
                            <v-card>
                                <v-card-title class="text-h5">
                                    ลบข้อมูลทั้งหมด
                                </v-card-title>
                                <v-card-text>
                                    คุณต้องการลบข้อมูลเหรียญ {{name_coin}} {{ID}} ทั้งหมดใช่หรือไม่ ?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" text @click="dialog3 = false">
                                        ไม่ใช่
                                    </v-btn>
                                    <v-btn color="green darken-1" text @click="del(name_coin,ID)">
                                        ใช่
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-col>
            </h6>
        </v-app-bar>
        <v-container>
            <v-row dense>
                <!-- <v-col cols="12">
                <v-card color="#015b64" dark>
                    <v-card-title class="text-h2 mb-3">
                        XRP <v-spacer></v-spacer><small>( +100 % )</small>
                    </v-card-title>
                    <v-card-subtitle align="center" class="pb-1">
                        <h2> 120,000,000 B. <h6 class="font-weight-light">(+10000)</h6>
                        </h2>
                    </v-card-subtitle>
                    <v-list-item class="grow">
                        <v-icon class="ml-1">mdi-bank</v-icon>
                        <v-list-item-content>
                            <small class="font-weight-bold ml-2"> 120,000</small>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col> -->

                <!-- dddd -->
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-row class="pb-2  pt-0 " color="#015b64" dark>
                <v-col cols="8" class="ml-1">
                <v-text-field  class="p-1 mb-2 mr-0 ml-1" v-model="search" append-icon="mdi-magnify" label="Search"  border rounded-pill  single-line hide-details></v-text-field>
                </v-col>
                <v-col cols="3">
                <v-btn class="btn btn-success  mt-3 ml-0" outlined rounded small>
                    <v-icon>mdi-plus</v-icon>รายการ
                </v-btn>
                </v-col>
            </v-row> -->

                <!-- Custom rounded search bars with input group -->
                <!-- End -->

                <!-- dddd -->

                <v-col v-for="(product) in activity_me" :key="product.numm" cols="12">

                    <v-card class="mx-auto" dark max-width="400">
                        <v-card-title class="text-h6 pb-1 pt-2 pl-1 pr-0">
                            <h6 class=" caption text-end font-weight-light">

                                <v-btn v-if="product.buysell === 'Buy'" x-small color="#008000">
                                    {{product.buysell}}
                                </v-btn>
                                <v-btn v-else x-small color="#ff0000">
                                    {{product.buysell}}
                                </v-btn>&nbsp;
                                <!-- <small v-if="product.buysell === 'Buy'" style="color: #008000">{{product.buysell}} </small>
                                <small v-else style="color: #ff0000">{{product.buysell}} </small> -->
                                <small>{{product.da}}</small>
                                <!-- <small style="color: red">{{product.buysell}}</small> -->

                            </h6>
                            <v-spacer></v-spacer>

                            <!-- dsfdsf  -->
                            <v-dialog :v-model="dialog" width="280">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon small v-bind="attrs" v-on="on" class="mr-2">
                                        mdi-file-document-edit
                                    </v-icon>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        แก้ไขข้อมูลเหรียญ
                                    </v-card-title>

                                    <v-card-text>
                                        <v-form>
                                            <!-- <v-select v-model="buysell" :items="['Buy', 'Sell']" label="Buy/Sell*" required></v-select> -->
                                            <v-select v-model="product.buysell" :items="['Buy', 'Sell']" label="Buy/Sell*" required></v-select>
                                            <v-text-field v-model="product.entry" label="ราคาเข้าซื้อ / เหรียญ*" hint="( 900,000/BTC )" required></v-text-field>
                                            <v-text-field v-model="product.total" label="จำนวนเงิน" hint="" required></v-text-field>
                                            <!-- <v-text-field v-model="tax" label="ภาษี*" required></v-text-field> -->
                                            <v-text-field v-model="product.num" label="จำนวนเหรียญ*" hint="" persistent-hint></v-text-field>
                                            <input v-model="product.da" type="datetime" label="วันที่,เวลา*" name="datetime">
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="warning" text @click="edit_coin(product.ID,product.name_coin,product.buysell,product.entry,product.total,product.num,product.da,product.numm)">
                                            แก้ไข
                                        </v-btn>
                                    </v-card-actions>

                                </v-card>
                            </v-dialog>
                            <v-btn x-small color="#ff0000" @click="del(ID, product.numm, product.name_coin)" class="ml-1" outlined rounded small>
                                <v-icon small>mdi-delete</v-icon>
                            </v-btn>&nbsp;
                            <!-- dsfdsf  -->
                            <v-row>
                                <v-col cols="2">
                                    <div class="text-center">
                                        <v-dialog :v-model="dialog" width="500">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon btn v-bind="attrs" v-on="on" style="color: yellow; font-size: 35px;">
                                                    mdi-file-document-edit
                                                </v-icon>
                                            </template>

                                            <v-card>
                                                <v-card-title>
                                                    แก้ไขเหรียญ
                                                </v-card-title>

                                                <v-card-text>
                                                    <v-form>
                                                        <v-select v-model="product.buysell" :items="['Buy', 'Sell']" label="Buy/Sell*" required></v-select>
                                                        <v-text-field v-model="product.entry" label="ราคาเข้าซื้อ / เหรียญ*" hint="( 900,000/BTC )" required></v-text-field>
                                                        <v-text-field v-model="product.total" label="จำนวนเงิน" hint="" required></v-text-field>
                                                        <v-text-field v-model="product.num" label="จำนวนเหรียญ*" hint="" persistent-hint></v-text-field>
                                                        <input v-model="product.da" type="datetime" label="วันที่,เวลา*" name="datetime">
                                                    </v-form>
                                                </v-card-text>

                                                <v-divider />

                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-dialog :v-model="dialog1" max-width="400">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn v-bind="attrs" v-on="on" color="warning" text>
                                                                แก้ไข
                                                            </v-btn>
                                                        </template>
                                                        <v-card style="background: #fafafa; color: #000;">
                                                            <v-card-title>
                                                                แจ้งเตือน
                                                            </v-card-title>
                                                            <v-card-text style="text-align: center; color: #000;">
                                                                <h3>คุณต้องการที่จะแก้ไขกิจกรรมหรือไม่</h3>
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                <v-spacer />
                                                                <v-btn color="green darken-1" text @click="edit_coin(product.ID,product.name_coin,product.buysell,product.entry,product.total,product.num,product.da,product.numm)">
                                                                    <h3>ต้องการ</h3>
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </v-col>

                                <v-col cols="2">
                                    <div class="text-center">
                                        <v-dialog :v-model="dialog3" max-width="400">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-bind="attrs" v-on="on" btn style="color: red; font-size: 35px;">
                                                    mdi-trash-can
                                                </v-icon>
                                            </template>
                                            <v-card style="background: #fafafa; color: #000;">
                                                <v-card-title>
                                                    แจ้งเตือน
                                                </v-card-title>
                                                <v-card-text style="text-align: center; color: #000;">
                                                    <h3>คุณต้องการที่จะลบกิจกรรมหรือไม่</h3>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer />
                                                    <v-btn color="green darken-1" text @click="del(ID, product.numm, product.name_coin)">
                                                        <h3>ต้องการ</h3>
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </v-col>
                            </v-row>

                            <v-dialog v-model="dialog2" hide-overlay persistent width="500">
                                <v-card color="#eceff1" dark>
                                    <v-card-text style="padding: 30px; color: #000;">
                                        <center>
                                            <v-img src="image/success.png" width="90px" height="90px" />
                                            <br>
                                            <h1>SUCCESS</h1>
                                            <br>
                                            <span style="font-size: 28px;">แก้ไขข้อมูลกิจกรรมสำเร็จ</span>
                                        </center>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog4" hide-overlay persistent width="500">
                                <v-card color="#eceff1" dark>
                                    <v-card-text style="padding: 30px; color: #000;">
                                        <center>
                                            <v-img src="image/success.png" width="90px" height="90px" />
                                            <br>
                                            <h1>SUCCESS</h1>
                                            <br>
                                            <span style="font-size: 28px;">ลบข้อมูลกิจกรรมสำเร็จ</span>
                                        </center>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                        </v-card-title>
                        <v-card-subtitle align="center" class=" pb-0 pt-1 pl-0 pr-0">
                            <h6 class="font-weight-light " align="center">
                                <v-row class="mt-1">
                                    <v-col><small>ราคาเข้า</small></v-col>
                                    <v-col><small>จำนวนเงิน</small></v-col>
                                    <v-col><small>จำนวนเหรียญ</small></v-col>
                                </v-row>
                                <v-row class="mt-0">
                                    <v-col><small>{{product.entry}} / {{product.name_coin}}</small></v-col>
                                    <v-col><small>{{product.total}}</small></v-col>
                                    <v-col><small>{{product.num}}</small></v-col>
                                </v-row>

                            </h6>
                        </v-card-subtitle>

                        <!-- <v-list-item class="grow">
                            <v-icon class="">mdi-credit-card </v-icon>
                            <v-list-item-content>
                                <small class="font-weight-bold ml-2"> 120,000</small>
                            </v-list-item-content>

                            <small class="">
                                <v-btn dark class="btn-warning sm" outlined rounded small>
                                    <v-icon small>mdi-note</v-icon>แก้ไข
                                </v-btn>
                                <v-btn dark class="btn-info sm" outlined rounded small>
                                    <v-icon small>mdi-note</v-icon>ลบ
                                </v-btn> -->
                        <!-- <v-btn class="btn btn-success ml-2" outlined rounded small>
                                    <v-icon>mdi-play</v-icon>เพิ่มรายการ
                                </v-btn> -->
                        <!-- </small>
                        </v-list-item> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    <v-dialog v-model="dialog22" hide-overlay persistent width="500">
        <v-card color="#eceff1" dark>
            <v-card-text style="padding: 30px; color: #000;">
                แก้ไขข้อมูลเหรียญสำเร็จ
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
    name: 'coinHis',
    data: () => ({
        ID: '',
        name: '',

        bs: '',
        name_c: '',
        buyCoins: '',

        name_coin: '',
        entry: '',
        total: '',
        num: '',
        da: '',
        buysell: '',

        money: '',
        tax: '0.25',
        num_coins: '',
        Dtime: '',
        search: '',

        dialog: false,
        dialog2: false,
        dialog22: false,
        dialog3: false,
        dialog4: false,
        dialog1: false,

        tickets: [],
        activity_me: [],
        items: [{
                color: '#ff3330',
                src: 'https://upload.wikimedia.org/wikipedia/th/d/d0/Dogecoin_Logo.png',
                title: 'DOGE',
                artist: [{
                        artist: 'Doge Coin'
                    },
                    {
                        artist: 'Ellie Goulding'
                    }
                ]
            },
            {
                color: '#67a272',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                title: 'Halcyon',
                artist: 'Ellie Goulding'
            }
        ],
    }),
    
    
    method: {
        async edit_coin(ID,name_coin,buysell,entry,total,num,da,numm) {
            console.log('name : ', ID,name_coin,buysell,entry,total,num,da,numm)
            let formData = {
                ID: ID,
                name_coin: name_coin,
                buysell: buysell,
                entry: entry,
                total: total,
                 num: num,
                da: da,
                numm: numm,
               
            }
            // formData.append('Con_Password', Con_Password)
            console.log('web', formData)
            let res = await fetch('http://localhost:7000/edit_coin', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            let data = await res.json()
            console.log('data', data.status)
            if (data.status == 'ok') {
                this.dialog = false
                this.dialog2 = true
                setTimeout(() => (this.dialog2 = false, location.reload()), 1000)
            }
            if (data.status == 0) {
                // this.dialog1 = false
                this.dialog20 = true
                setTimeout(() => (this.dialog2 = false, location.reload()), 1000)
            }
        },
        async del(ID) {
            let del = {
                ID: ID,
            }
            console.log('del', del)
            let res = await fetch('http://localhost:7000/del_admin', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(del),
            })
            let data = await res.json()
            if (data.status == 'ok') {
                this.dialog3 = false
                this.dialog4 = true
                setTimeout(() => (this.dialog4 = false, location.reload()), 1000)
            }
        },
    },
    async created() {
        this.name_coin = this.$route.params.name_coin
        this.ID = this.$route.params.ID
        if (!window.sessionStorage.getItem('email')) {
            // this.dialog1 = true
            // setTimeout(() => (this.dialog1 = false, this.$router.push('/')), 2000)
        } else {
            // let email = window.sessionStorage.getItem('email')
            // let res = await fetch('http://localhost:7000/logUser?email=' + email)
            // let data = await res.json()
            // this.email = data.rows[0][0].email
            // this.Password = data.rows[0][0].Password
            // this.ID = data.rows[0][0].ID
            // this.name = data.rows[0][0].name
            // this.Status = data.rows[0][0].Status

            // let res1 = await fetch('http://localhost:7000/name_coin?name_coin=' + this.$route.params.name_coin  +  '&ID=' + this.$route.params.ID)
            let res1 = await fetch('http://localhost:7000/name_coin?ID=' + this.$route.params.ID + '&name_coin=' + this.$route.params.name_coin)

            // let res1 = await fetch('http://localhost:7000/name_coin?ID=' + this.$route.params.ID )
            // let res1 = await fetch('http://localhost:7000/name_coin?name_coin=' + this.$route.params.name_coin ) ได้
            let data1 = await res1.json()
            this.name_coin = data1.rows[0][0].name_coin
            this.entry = data1.rows[0][0].entry
            this.total = data1.rows[0][0].total
            this.num = data1.rows[0][0].num
            this.da = data1.rows[0][0].da
            this.buysell = data1.rows[0][0].buysell
            // this.name_coin = data1.rows[0][0].name_coin
            this.activity_me = data1.rows[0]
        }
    },
    mounted() {
        axios.get('https://api.bitkub.com/api/market/symbols')
            .then((a) => {
                this.tickets = a.data.result
                // console.log(a.data.result)
            })

        console.log(this.$route.params)
        console.log('test')
    },
    components: {

    },

}
</script>

// data() {
//         return {
//             user: [],
//             ID: '',
//             email: '',
//             name: '',
//         }
//     },
//     async created() {
//         if (!window.sessionStorage.getItem('email')) {
//             this.dialog4 = true
//             setTimeout(() => (this.dialog4 = false, this.$router.push('/')), 2000)
//         } else {
//             let res1 = await fetch('http://localhost:7000/Activity')
//             let data1 = await res1.json()
//             this.user = data1.rows[0]
//         }
//     },
