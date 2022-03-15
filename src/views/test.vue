<template>
<div data-app>

    <div class="rounded-xl white text-center">
        <br>
        <h3>
            ตารางข้อมูลนักศึกษา
        </h3><br>
        <div class="txt01">
            <v-simple-table dense>
                {{posts}}
                <thead>
                    <tr>
                        <th class="text-center">
                            Id
                        </th>
                        <th class="text-center">
                            Name
                        </th>
                        <th class="text-center">
                            serName
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="st in posts" :key="st.id" />
                    <tr v-for="st in posts" :key="st.name">
                        <td>{{ st.r_id }}</td>
                        <td>{{ st.fullname }}</td>
                        <td>{{ st.email }}</td>
                        <v-vtn @click="edit(st.r_id)">EDIT</v-vtn>
                        <v-vtn @click="del">DEL</v-vtn>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
    name: 'home',
    data: () => ({

                posts: [],

                async created() {

                    try {
                        let res = await axios({
                            url: 'http://localhost:7000/list_coin',
                            method: "GET",
                        });
                        let posts = res.data;
                        console.log('posts: ', this.posts)
                        console.log('posts: ', res.data)
                        this.posts = posts.rows[0];

                    } catch (error) {
                        console.log('Error: ', error)
                    }

                },

            })}
</script>
