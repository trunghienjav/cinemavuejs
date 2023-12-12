<template>
    <a-menu 
    v-model:openKeys="openKeys" 
    v-model:selectedKeys="selectedKeys" 
    mode="inline">

        <a-menu-item key="admin-cinemas">
            <router-link :to="{ name: 'admin-cinemas' }">
                <span>
                    <VideoCameraOutlined class="me-1" /> Rạp phim
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-films">
            <router-link :to="{ name: 'admin-films' }">
                <span>
                    <i class="fa-solid fa-film me-1"></i> Phim
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="admin-users">
            <router-link :to="{ name: 'admin-users' }">
                <span>
                    <UserOutlined class="me-1" /> Người dùng
                    
                </span>
            </router-link>
        </a-menu-item>
    </a-menu>
</template>

<script>
import { UserOutlined, TagsOutlined, SettingOutlined, VideoCameraOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenu } from "../stores/use-menu.js";
export default defineComponent({
    components: {
        UserOutlined,
        TagsOutlined,
        SettingOutlined,
        VideoCameraOutlined,
        AppstoreOutlined
    },
    setup() { //buổi 9, 10:45 có giải thích về đoạn này
        const store = useMenu();
        return {
            ...storeToRefs(store) //thay vì return lại dài dòng thì dùng cái storeToRefs của Pinia để gọn, buổi 10, 12:00
        };
    },
});
</script>