<template>
<div data-app class="container">
    <h3>dd</h3>
    <h3>{{ ID_student }}</h3>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'addCoin',
    data: () => ({

        ID_student: '',

    }),
    async created() {
        let ID_student = window.sessionStorage.getItem('ID_student')
        let res = await fetch('http://localhost:7000/logUser?ID_student=' + ID_student)
        let data = await res.json()
        this.ID_student = data.rows[0][0].ID_student
        this.Password = data.rows[0][0].Password
        this.ID = data.rows[0][0].ID
        this.Firstname = data.rows[0][0].Firstname
        this.Status = data.rows[0][0].Status
    }
}
</script>
