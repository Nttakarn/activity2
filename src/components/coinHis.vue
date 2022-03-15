<template>
<div data-app>
    <v-card max-width="400" class="mx-auto" flat>
        <v-app-bar color="pink" dark>
            <router-link :to="{ name: 'home' }">
                <v-btn icon class="pr-2">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
            </router-link>
            <v-toolbar-title>{{this.$route.params.name_coin}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn> -->
            <!-- <v-btn x-small color="#ff0000" class="mt-0" outlined rounded small>

                <v-icon btn style="color: red; font-size: 15px;" @click="dialog = true">
                    mdi-delete
                </v-icon>
            </v-btn> -->
            <v-btn color="#FF0033" dark class="" @click="dialog10 = true">
                +ข้อมูลเหรียญ
            </v-btn>
        </v-app-bar>
        <v-spacer></v-spacer>
        <!-- เพิ่มสมาชิก -->
        <v-dialog v-model="dialog10" max-width="300px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <h4 class="mt-4 font-weight-bold" align="center" justify="center">เพิ่มข้อมูลเหรียญ</h4>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-alert v-model="danger" dismissible class=" mb-0 pb-2 pt-2 error" color="#ffcc00">
                                    {{ alt_txt }}
                                </v-alert>
                                <v-alert v-model="danger1" dismissible class="pr-4 pl-4 ml-4 mr-1 mb-0 pb-2 pt-2 success" color="#33cc66">
                                    {{ alt_txt }}
                                </v-alert>
                            </v-col>
                            <v-card-text>
                                <v-form>
                                    <v-select v-model="buysell" :items="['Buy', 'Sell']" label="Buy/Sell*" required></v-select>
                                    <v-text-field v-model="entry" label="ราคาเข้าซื้อ / เหรียญ*" hint="( 900,000/BTC )" required></v-text-field>
                                    <v-text-field v-model="total" label="จำนวนเงิน" hint="" required></v-text-field>
                                    <v-text-field v-model="num" label="จำนวนเหรียญ*" hint="" persistent-hint></v-text-field>
                                    <input v-model="da" type="datetime-local" label="วันที่,เวลา*" name="datetime">
                                </v-form>
                            </v-card-text>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close2">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- fdgdfg -->

        <!-- fdgdfg -->
        <v-container>
            <v-row dense>
                <v-col v-for="(product) in activity_me" :key="product.numm" cols="12">
                    <v-card class="mx-auto" max-width="400" color="#" dark>
                        <v-card-title class="text-h6 pb-1 pt-2 pl-1 pr-0">
                            <h6 class="caption text-end font-weight-light">

                                <v-btn v-if="product.buysell === 'Buy'" x-small color="#008000">
                                    {{product.buysell}}
                                </v-btn>
                                <v-btn v-else x-small color="#ff0000">
                                    {{product.buysell}}
                                </v-btn>&nbsp;
                                <small>{{product.da}}</small>
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
                                        แก้ไขข้อมูล {{ product.name_coin }}
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
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="warning" text @click="ok(product.numm,product.buysell,product.entry,product.total,product.num,product.da)">
                                            แก้ไข
                                        </v-btn>
                                    </v-card-actions>

                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog3" max-width="250">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" small class="mr-3">
                                        mdi-trash-can
                                    </v-icon>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h6 grey lighten-2">
                                        {{ product.name_coin}}
                                    </v-card-title>
                                    <v-card-text style="text-align: center; color: #000;" class="pb-0">
                                        <h6>คุณต้องการลบข้อมูลเหรียญ ใช่หรือไม่ ?</h6>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn color="#ff0000" text @click="dialog3 = false">
                                            ไม่
                                        </v-btn>

                                        <v-btn color="#008000" text @click="del(product.numm)">
                                            ใช่
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog2" hide-overlay persistent width="500">
                                <v-card color="#eceff1" dark>
                                    <v-card-text style="padding: 30px; color: #000;">
                                        แก้ไขข้อมูลเหรียญสำเร็จ
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog4" hide-overlay persistent width="500">
                                <v-card color="#eceff1" dark>
                                    <v-card-text style="padding: 30px; color: #000;">
                                        ลบข้อมูลเหรียญสำเร็จ
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                            <!-- dsfdsf  -->
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
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>

</div>
</template>

<script>
/* eslint-disable */
export default {
    data: () => ({
        name: '',
        ID: '',
        email: '',
        Password: '',
        tel: '',
        Con_Password: '',
        showPassword: '',
        Status: '',

        bs: '',
        name_c: '',
        buyCoins: '',

        name_coin: '',
        entry: '',
        total: '',
        num: '',
        da: '',

        buysell: '',
        entry1: '',
        total1: '',
        num1: '',
        da1: '',

        money: '',
        tax: '0.25',
        num_coins: '',
        Dtime: '',
        search: '',

        page: 1,
        dialog: false,
        dialog1: false,
        dialog4: false,
        dialog2: false,
        dialog3: false,
        dialog20: false,
        dialog10: false,
        dialogDelete: false,

        item: ['user', 'Admin'],
        desserts: [],

        activity_me: [],
        type_api: '',
        danger: false,
        danger1: false,
        alt_txt: '',
        rules: {
            required: 'กรุณากรอกข้อมูล'
        },
    }),
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    methods: {
        initialize() {
            this.desserts = [{

            }]
        },

        close() {
            this.dialog = false
        },
        close2() {
            this.dialog10 = false
        },
        logout() {
            return this.$router.push('/')
        },
        async del_coin() {

            let del_coin = {
                ID: this.ID,
                name_coin: this.name_coin
            }
            console.log(del_coin)
            let res = await fetch('http://localhost:7000/del_allCoin', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(del_coin),
            })
            let data = await res.json()
            console.log('data', data.status)
            if (data.status == 'ok') {
                setTimeout(() => (this.dialog = false, this.$router.push('/home')), 1000)
            }

        },
        async ok(numm, buysell, entry, total, num, da) {

            console.log('edit ok : ', numm, buysell, entry, total, num, da)
            let formData = {
                numm: numm,
                buysell: buysell,
                entry: entry,
                total: total,
                num: num,
                da: da
            }
            // formData.append('Con_Password', Con_Password)
            console.log('web', formData)
            let res = await fetch('http://localhost:7000/edit_ok', {
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
        async del(numm) {
            let del = {
                numm: numm,
            }
            console.log('del', del)
            let res = await fetch('http://localhost:7000/del_coin2', {
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
        async save(buysell, entry, total, num, da) {
            console.log('เพิ่มข้อมูล : ', buysell, entry, total, num, da)
            if (
                buysell == '' ||
                entry == '' ||
                total == '' ||
                num == '' ||
                da == ''
                // da == ''
            ) {
                this.danger = true;
                this.alt_txt = 'กรุณากรอกข้อมูล'
            } else {
                let insert_coinValue = {
                    ID: this.ID,
                    name_coin: this.name_coin,
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
    async created() {
        this.initialize()
        let res1 = await fetch('http://localhost:7000/table_user')
        let data1 = await res1.json()
        // console.log('desserts', data1.rows[0])
        this.desserts = data1.rows[0]

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
            // this.name_coin = data1.rows[0][0].name_coin
            this.activity_me = data1.rows[0]
        }
    },
}
</script>
