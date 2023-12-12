<template>
    <div>
        Đây là trang cinemas   
    </div>
</template>

<script>
import { useMenu } from '../../../stores/use-menu';
export default {
    setup(){
        const store = useMenu();
        store.onSelectedKeys(["admin-cinemas"]);
    }
}
</script>