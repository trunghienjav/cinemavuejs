
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'

import axios from 'axios'
window.axios = axios; //gàn axios vào biến window.axios, vì dùng trên web nên phải khai báo window thôi, buôi 16, 1:25

//khai báo component
import {
    Pagination,
    TimePicker,
    DatePicker,
    Select,
    Input,
    Avatar,
    Table,
    Card,
    Menu,
    List,
    Drawer,
    Button,
    message
} from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';
import './static/fontawesome-free-6.4.0-web/css/all.min.css';
//ủa mà sao mình biết import cái reset cái css ta => là copy từ doc 4.0 qua
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Drawer)
app.use(Button)
app.use(List)
app.use(Card)
app.use(Menu)
app.use(Table)
app.use(Avatar)
app.use(Input)
app.use(Select)
app.use(DatePicker)
app.use(TimePicker)
app.use(Pagination)

app.use(message)


app.mount('#app')

app.config.globalProperties.$message = message;
