<template>
    <div>
        <form @submit.prevent="filmsUpdate()">
            <a-card title="Cập nhập phim" style="width: 100%;">
                <div class="row mb-2">
                    <div class="col-12 col-sm-4">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                                <h3>Poster phim</h3>
                            </div>
                            <div class="col-12 d-flex justify-content-center mb-4">
                                <a-avatar shape="square" :size="200">
                                    <template #icon>
                                        <img src="../../../assets/QR_hien.png" alt="avatar">
                                    </template>
                                </a-avatar>
                            </div>
                            <div class="col-12 d-flex justify-content-center">
                                <a-button type="primary">
                                    <i class="fa-solid fa-plus me-2"></i>
                                    <span>Chọn ảnh</span>
                                </a-button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-8">
                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger':errors.name
                                    }">
                                        Tên
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <!-- <a-input status="error" placeholder="Error" /> -->
                                <a-input 
                                placeholder="Tên"
                                v-model:value="name" 
                                
                                allow-clear />
                                <div class="w-100">
                                    <!-- thẻ w-100 giúp nó tự xuống dòng -->
                                    <small v-if="errors.name" class="text-danger" >
                                        {{ errors.name[0] }}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.status_id
                                    }">
                                        Trạng thái
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-select 
                                show-search 
                                placeholder="Trạng thái" 
                                style="width: 100%" 
                                v-model:value="status_id" 
                                :options="films_status"
                                :filter-option="filterOption">
                                </a-select>
                                <div class="w-100">
                                    <small v-if="errors.status_id" class="text-danger">
                                        {{ errors.status_id[0] }}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.subtitle_id
                                    }">
                                        Dạng phim
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-select 
                                show-search 
                                placeholder="Dạng phim" 
                                style="width: 100%" 
                                v-model:value="subtitle_id" 
                                :options="films_subtitle"
                                :filter-option="filterOption">
                                </a-select>
                                <div class="w-100">
                                        <small v-if="errors.subtitle_id" class="text-danger">
                                            {{ errors.subtitle_id[0] }}
                                        </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.start_date
                                    }">
                                        Ngày khởi chiếu
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-date-picker 
                                value-format="YYYY-MM-DD"
                                placeholder="Ngày khởi chiếu" 
                                style="width: 100%"
                                v-model:value="start_date"
                                />
                                <div class="w-100">
                                        <small v-if="errors.start_date" class="text-danger">
                                            {{ errors.start_date[0] }}
                                        </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.end_date
                                    }">
                                        Hết công chiếu
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-date-picker 
                                placeholder="Hết công chiếu" 
                                style="width: 100%"
                                value-format="YYYY-MM-DD"
                                v-model:value="end_date"
                                />
                                <div class="w-100">
                                        <small v-if="errors.end_date" class="text-danger">
                                            {{ errors.end_date[0] }}
                                        </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.duration
                                    }">
                                        Thời lượng
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-time-picker 
                                value-format="HH:mm:ss"
                                style="width: 100%"
                                v-model:value="duration">
                                </a-time-picker>
                                <div class="w-100">
                                        <small v-if="errors.duration" class="text-danger">
                                            {{ errors.duration[0] }}
                                        </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.national
                                    }">
                                        Quốc gia
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-input 
                                placeholder="Quốc gia" 
                                allow-clear
                                v-model:value="national" />
                                <div class="w-100">
                                        <small v-if="errors.national" class="text-danger">
                                            {{ errors.national[0] }}
                                        </small>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-12 col-sm-3 text-start text-sm-end mt-1">
                                <label>
                                    <span class="text-danger me-1">*</span>
                                    <span :class="{
                                        'text-danger': errors.description
                                    }">
                                        Mô tả
                                    </span>
                                </label>
                            </div>
                            <div class="col-12 col-sm-5">
                                <a-textarea 
                                placeholder="Mô tả" 
                                :rows="3"
                                v-model:value="description" />
                                <div class="w-100">
                                        <small v-if="errors.description" class="text-danger">
                                            {{ errors.description[0] }}
                                        </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
                        <a-button class="me-sm-2 mb-3">
                            <router-link :to="{ name: 'admin-films' }">
                                <span>Huỷ</span>
                            </router-link>
                        </a-button>
                        <a-button type="primary" html-type="submit">
                            <span>Sửa</span>
                        </a-button>
                    </div>
                </div>
            </a-card>
        </form>

    </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useMenu } from '../../../stores/use-menu.js';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'; //khai báo route để lấy tham số từ url
import { message } from 'ant-design-vue';
import axios from 'axios';

export default defineComponent({
    setup() {

        const router = useRouter();
        const route = useRoute();
         
        const store = useMenu();
        store.onSelectedKeys(["admin-films"]);

        const films_status = ref([]);
        const films_subtitle = ref([]);

        const errors = ref({});

        const films = reactive({
            name: "",
            start_date: "",
            end_date: "",
            national: "",
            duration: "",
            description: "",
            status_id: [],
            subtitle_id: []

        });

        const getFilmsEdit = () => {
            axios.get(`http://127.0.0.1:8000/api/films/edit/${route.params.id}`) //update thì phải dùng put
                .then(function (response) {
                    // handle success
                    films.name = response.data.films.name
                    films.status_id = response.data.films.status_id
                    films.subtitle_id = response.data.films.subtitle_id
                    films_status.value = response.data.films_status
                    films_subtitle.value = response.data.films_subtitle

                    films.start_date = response.data.films.start_date
                    films.end_date = response.data.films.end_date
                    films.duration = response.data.films.duration
                    films.national = response.data.films.national
                    films.description = response.data.films.description
                    console.log(response);
                    //vì sử dụng phương thức ref nên phải tham chiếu đến value, qui chuẩn của vuejs
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        };
        getFilmsEdit();

        const filmsUpdate = () => {
            axios.put(`http://127.0.0.1:8000/api/films/edit/${route.params.id}`, films)
            .then(function (response){
                if(response.status == 200){
                    message.success('Update thành công!');
                    router.push({ name: 'admin-films'})
                }
            })
            .catch(function (error){
                console.log(error);
                errors.value = error.response.data.errors;
            });
        };
        
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }

        
        return {
            films_status,
            films_subtitle,
            ...toRefs(films),
            errors,
            filterOption,
            filmsUpdate,
        }
    },
});
</script>