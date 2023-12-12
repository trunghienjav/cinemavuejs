import { defineStore } from "pinia";

export const useMenu = defineStore('menuId', {
    state: () => ({ //trạng thái ban đầu, 2 thèn admin.vue và TheMenu.vue đều tham chiếu tới thèn này
        selectedKeys: [],
        openKeys: [],
    }),

    actions: { //nếu ấn gì đó
        onSelectedKeys(data) {
            this.selectedKeys = data;
        },
        onOpenKeys(data){
            this.openKeys = data;
        }
    }
})