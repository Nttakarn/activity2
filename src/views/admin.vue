<template>
<div data-app>
    <v-card max-width="400" class="mx-auto" flat>
        <v-app-bar color="pink" dark>
            <v-btn icon>
                <v-icon>mdi-account circle</v-icon>
            </v-btn>
            <v-toolbar-title>ข้อมูลสมาชิก</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            <v-btn color="#008000" dark class="" @click="dialog = true">
                เพิ่มสมาชิก
            </v-btn>
        </v-app-bar>
        <v-spacer></v-spacer>
        <!-- เพิ่มสมาชิก -->
        <v-dialog v-model="dialog" max-width="300px">
            <v-card>
                <v-card-text>
                    <v-container>
                        <h4 class="mt-4 font-weight-bold" align="center" justify="center">เพิ่มสมาชิก</h4>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-alert v-model="danger" dismissible class=" mb-0 pb-2 pt-2 error" color="#ffcc00">
                                    {{ alt_txt }}
                                </v-alert>
                                <v-alert v-model="danger1" dismissible class="pr-4 pl-4 ml-4 mr-1 mb-0 pb-2 pt-2 success" color="#33cc66">
                                    {{ alt_txt }}
                                </v-alert>
                            </v-col>
                            <v-text-field v-model="name" label="Name"></v-text-field>
                            <v-text-field v-model="email" label="E-mail"></v-text-field>
                            <v-text-field v-model="Password" label="Password"></v-text-field>
                            <v-text-field label="เบอร์โทรศัพท์" v-model="tel" />
                            <!-- <v-text-field v-model="Status" label="Status"></v-text-field> -->
                            <v-select v-model="Status" :items="['user', 'admin']" label="status" required></v-select>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
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
                <v-col v-for="(product) in desserts" :key="product.numm" cols="12">
                    <v-card class="mx-auto" max-width="400" color="#6633CC" dark>
                        <v-card-title class="text-h6 pb-1 pt-2 pl-1 pr-0">
                            <h6 class="caption text-end font-weight-light">

                                <v-btn v-if="product.Status === 'user'" x-small color="#008000">
                                    {{product.Status}}
                                </v-btn>
                                <v-btn v-else x-small color="#ff0000">
                                    {{product.Status}}
                                </v-btn>&nbsp;
                            </h6>
                            <v-spacer></v-spacer>

                            <!-- dsfdsf  -->

                            <v-dialog :v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon small v-bind="attrs" v-on="on" class="mr-2">
                                        mdi-file-document-edit
                                    </v-icon>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        แก้ไขข้อมูล {{ product.Status }} : {{ product.name }}
                                    </v-card-title>

                                    <v-card-text>
                                        <form>
                                            <v-text-field v-model="product.name" label="ชื่อผู้ใช้"></v-text-field>
                                            <v-text-field v-model="product.email" label="E-mail"></v-text-field>
                                            <v-text-field label="รหัสผ่าน" v-model="product.Password" :type="showPassword ? 'text' : 'Password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" />
                                            <v-text-field label="เบอร์โทรศัพท์" v-model="product.tel" />
                                            <v-select v-model="product.Status" :items="['user', 'admin']" label="Status" required></v-select>
                                        </form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="warning" text @click="ok(product.ID,product.name,product.email,product.Password,product.tel,product.Status)">
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
                                    <v-card-title class="text-h5 grey lighten-2">
                                        ลบบัญชีผู้ใช้
                                    </v-card-title>

                                    <h6>
                                        <center> คุณต้องการลบบัญชีผู้ใช้ <br>
                                            <h5>{{ product.Status}} : {{product.name}}</h5> ใช่หรือไม่ ?
                                        </center>
                                    </h6>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn color="#ff0000" text @click="dialog3 = false">
                                            ไม่
                                        </v-btn>

                                        <v-btn color="#008000" text @click="del(product.ID)">
                                            ใช่
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog2" hide-overlay persistent width="500">
                                <v-card color="#eceff1" dark>
                                    <v-card-text style="padding: 30px; color: #000;">
                                        แก้ไขข้อมูลผู้ใช้สำเร็จ
                                    </v-card-text>
                                </v-card>
                            </v-dialog>

                            <v-dialog v-model="dialog4" hide-overlay persistent width="500">
                                <v-card color="#eceff1" dark>
                                    <v-card-text style="padding: 30px; color: #000;">
                                        ลบข้อมูลผู้ใช้สำเร็จ
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                            <!-- dsfdsf  -->
                        </v-card-title>
                        <v-card-subtitle align="center" class="pb-0 pt-1 pl-0 pr-4">
                            <h6 class="font-weight-light " align="center">
                                <v-row class="pt-1 pb-0">
                                    <v-col><small>ชื่อผู้ใช้</small></v-col>
                                    <v-col><small>Email</small></v-col>
                                    <v-col><small>เบอร์โทรศัพท์</small></v-col>
                                </v-row>
                                <v-row class="mt-0">
                                    <v-col><small>{{product.name}}</small></v-col>
                                    <v-col><small>{{product.email}}</small></v-col>
                                    <v-col><small>{{product.tel}}</small></v-col>
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

        page: 1,
        dialog: false,
        dialog1: false,
        dialog4: false,
        dialog2: false,
        dialog3: false,
        dialog20: false,
        dialogDelete: false,

        item: ['user', 'Admin'],
        desserts: [],
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
        logout() {
            return this.$router.push('/')
        },
        async save() {
            if (
                this.email == '' ||
                this.name == '' ||
                this.Password == '' ||
                this.tel == ''
            ) {
                this.danger = true;
                this.alt_txt = 'กรุณากรอกข้อมูล'
            } else {
                let insert_user = {
                    email: this.email,
                    name: this.name,
                    Password: this.Password,
                    tel: this.tel
                }
                console.log(insert_user)
                let res = await fetch('http://localhost:7000/admin_insert', {
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
                    this.alt_txt = 'เพิ่มสมาชิกสำเร็จ'
                    setTimeout(() => (this.dialog = false, location.reload()), 1000)
                }
                if (data.status == 'fail') {
                    this.type_api = 'error';
                    this.danger = true;
                    this.alt_txt = 'กรุณากรอก password ให้ตรงกัน'
                    this.password = ''
                }
                if (data.status == 'no') {
                    this.type_api = 'error';
                    this.danger = true;
                    this.alt_txt = 'มีคนใช้ E-mail นี้แล้ว'
                    this.name = ''
                    this.email = ''
                    this.password = ''
                    this.tel = ''
                }
            }
        },
        async ok(ID, name, email, Password, tel, Status) {
            console.log('name : ', name, ID, email, Password, tel)
            let formData = {
                ID: ID,
                email: email,
                name: name,
                Password: Password,
                tel: tel,
                Status: Status
            }
            // formData.append('Con_Password', Con_Password)
            console.log('web', formData)
            let res = await fetch('http://localhost:7000/update', {
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
        this.initialize()
        let res1 = await fetch('http://localhost:7000/table_user')
        let data1 = await res1.json()
        console.log('desserts', data1.rows[0])
        this.desserts = data1.rows[0]
    },
}
</script>