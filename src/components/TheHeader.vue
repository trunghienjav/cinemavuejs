<template>
    <div class="container-fluid">
        <div class="row text-white" style="background-color: green; padding: 1rem;">
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showDrawer()">
                    <i class="fa-solid fa-bars"></i>
                </span>
            </div>
            <div class="col-10 col-sm-9 d-flex d-sm-flex align-items-center justify-content-center justify-content-sm-start">
                <a href="#">
                    <img src="../assets/logo.svg" alt="avatar" height="32" width="34" class="me-3">
                </a>
                <span class="d-none d-sm-flex">Quản trị</span>
            </div>
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showUserDrawer()">
                    <i class="fa-solid fa-user"></i>
                </span>
            </div>
            <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-end">
                <span class="d-none d-sm-flex">
                    ADMIN
                </span>
            </div>
        </div>
    </div>

    <a-drawer v-model:open="open" title="Menu" placement="left">
        <TheMenu />
    </a-drawer>

    <a-drawer v-model:open="open_user" title="Admin" placement="right">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>
</template>

<script>
import { ref, defineComponent } from 'vue';
import TheMenu from './TheMenu.vue';
export default defineComponent({
    components:{
        TheMenu
    },
    setup() {
        const open = ref(false);
        const open_user = ref(false);

        const showDrawer = () => {
            open.value = true;
        };

        const showUserDrawer = () => {
            open_user.value = true;
        };
        return {
            open,
            open_user,
            showDrawer,
            showUserDrawer
            

        };
    },
});

</script>