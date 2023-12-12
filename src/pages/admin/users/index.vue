<template>
    <div>
        Xin chào users
    </div>  
</template>

<script>
import { useMenu } from '../../../stores/use-menu';

export default {
    setup() {
        const store = useMenu();
        store.onSelectedKeys(["admin-users"]);
    }
}
</script>