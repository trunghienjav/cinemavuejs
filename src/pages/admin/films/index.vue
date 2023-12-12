<style>
.text-green {
    color: green;
}
</style>
<template>
    <div>
        <a-card title="Quản lí phim" style="width: 100%">
            <div class="row mb-3">
                <div class="col-12 d-flex d-sm-flex justify-content-end">
                    <a-button type="primary me-2">
                        <router-link :to="{ name: 'admin-films-create' }">
                            <i class="fa-solid fa-plus me-2"></i>
                            <span>Thêm</span>
                        </router-link>
                    </a-button>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 col-sm-4 mb-2 d-flex d-sm-flex justify-content-start">
                    <a-select 
                    class="me-3" 
                    show-search 
                    placeholder="Trạng thái" 
                    style="width: 35%" 
                    v-model:value="status_id"
                    :options="films_status" 
                    :filter-option="filterOption" 
                    @select="searchFilter">
                    </a-select>

                    <a-button 
                    danger block
                    style="width: 15%"
                    href="films"
                    >
                        <span>Xoá</span>
                    </a-button>
                </div>
                <div class="col-12 col-sm-4 d-flex d-sm-flex justify-content-sm-center">
                    <a-input-search 
                    v-model:value="search" 
                    placeholder="Tìm tên phim" 
                    style="width: 200px" 
                    allow-clear
                    @search="onSearch" />
                </div>
            </div>
            <!-- cái :pagination này là chỉ để hiện ra số trang cần phân trang -->
            <!-- -23/09/27: hiện tại phải dùng cái component phân trang riêng chứ ko làm cùng với trong div bảng, tại chưa rõ cho lắm -->
            <div class="row">
                <div class="col-12">
                    <a-table :columns="columns" :data-source="films" :pagination="false" :scroll="{ x: 576 }">
                        <template #bodyCell="{ column, index, record }">
                            <template v-if="column.key === 'index'">
                                <span>{{ index + 1 }}</span>
                            </template>

                            <template v-if="column.key === 'status'">
                                <span v-if="record.status_id == 1">{{ record.status }}</span>
                                <span v-else-if="record.status_id == 2" class="text-primary">{{ record.status }}</span>
                                <span v-else="record.status_id == 3" class="text-green">{{ record.status }}</span>
                            </template>

                            <template v-if="column.key === 'action'">
                                <router-link :to="{ name: 'admin-films-edit', params: { id: record.id } }">
                                    <a-button type="primary">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>

                            </template>

                            <template v-if="column.key === 'delete'">
                                <a-button type="primary" danger @click="destroy(record.id)">
                                    Xoá
                                </a-button>
                            </template>
                        </template>
                    </a-table>
                    <a-pagination class="mt-4" v-model:current="current" :total="total" v-model:pageSize="pageSize"
                        hideOnSinglePage @change="onChange" />
                </div>

            </div>
        </a-card>
    </div>
</template>

<script>
import { useMenu } from '../../../stores/use-menu.js';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router'; //khai báo route để lấy tham số từ url
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const store = useMenu();
        store.onSelectedKeys(["admin-films"]);


        const films = ref([]); //tạo cái biến để hứng dữ liệu
        const route = useRoute();

        const current = ref(1);
        const pageSize = ref();
        const total = ref();
        const search = ref("");

        const status_id = ref([]);

        const films_status = ref([]);
        const films_subtitle = ref([]);

        // const pagination = ref({
        //     current: current,
        //     pageSize: pageSize,
        //     total: total,
        // });


        // const onChange = (pageNumber) => {
        //     console.log('Page: ', pageNumber);
        // };

        const onChange = (page) => {
            console.log('onChange', page);
            axios.get(`http://127.0.0.1:8000/api/films?q=${search.value}&page=${current.value}&status=${status_id.value}`)
                .then(function (response) {
                    // handle success
                    console.log('Gia tri tim kiem', search.value, 'trang hien tai', current.value);
                    films.value = response.data.data; //vì sử dụng phương thức ref nên phải tham chiếu đến value, qui chuẩn của vuejs
                    total.value = response.data.total;
                    // current.value = response.data.current_page;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });

        };

        const columns = [
            {
                title: '#',
                key: 'index',
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Ngày khởi chiếu',
                dataIndex: 'start_date',
                key: 'start_date',
            },
            {
                title: 'Ngày chiếu cuối',
                dataIndex: 'end_date',
                key: 'end_date',
            },
            {
                title: 'Quốc gia',
                dataIndex: 'national',
                key: 'national',
            },
            {
                title: 'Thời lượng',
                dataIndex: 'duration',
                key: 'duration',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Công cụ',
                key: 'action'
            },
            {
                title: 'Xoá',
                key: 'delete'
            },
        ];

        const getFilms = () => {
            axios.get(`http://127.0.0.1:8000/api/films`)
                .then(function (response) {
                    // handle success
                    films.value = response.data.data; //vì sử dụng phương thức ref nên phải tham chiếu đến value, qui chuẩn của vuejs
                    current.value = response.data.current_page
                    pageSize.value = response.data.per_page
                    total.value = response.data.total
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        };
        getFilms();

        const onSearch = (searchValue) => {
            // axios.get(`http://127.0.0.1:8000/api/films?q=` + searchValue)
            current.value = 1; //khi mà search mới thì nó phải nhảy về trang 1
            console.log(current.value);
            axios.get(`http://127.0.0.1:8000/api/films?q=${searchValue}&page=${current.value}&status=${status_id.value}`)
                .then(function (response) {
                    // handle success
                    console.log('Gia tri tim kiem', search.value, 'trang hien tai', current.value);
                    console.log(response);
                    films.value = response.data.data; //vì sử dụng phương thức ref nên phải tham chiếu đến value, qui chuẩn của vuejs
                    total.value = response.data.total;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        };


        const destroy = (id) => { //phía trên truyền id ở hàm click nên chắc xuống dưới đây chỉ cần ghi vầy
            axios.delete(`http://127.0.0.1:8000/api/films/destroy/${id}`)
                .then((response) => {
                    // arlet(res)
                    console.log(response);
                    if (response.status == 200) {
                        message.success('Xoá thành công')
                        getFilms(); //gọi lại cái này thì nó sẽ xoá và reload lại trang 

                    }
                })
                .catch((error) => {
                    console.log(error);
                    message.error('Xoá thất bại, không tồn tại đối tượng xoá');

                });
        };

        const getFilmsCreate = () => {
            axios.get("http://127.0.0.1:8000/api/films/create")
                .then(function (response) {
                    // handle success
                    // console.log(response);
                    //vì sử dụng phương thức ref nên phải tham chiếu đến value, qui chuẩn của vuejs

                    films_subtitle.value = response.data.films_subtitle;
                    films_status.value = response.data.films_status;
                    console.log(status_id.value);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        };
        getFilmsCreate();

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }

        const searchFilter = () => {
            current.value = 1;
            axios.get(`http://127.0.0.1:8000/api/films?q=${search.value}&page=${current.value}&status=${status_id.value}`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.status == 200) {
                        films.value = response.data.data;
                        total.value = response.data.total;

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    // errors.value = error.response.data.errors;
                });
        }


        return {
            films,
            columns,
            // pagination,
            current,
            pageSize,
            total,
            search,
            films_subtitle,
            films_status,
            status_id,
            filterOption,
            searchFilter,
            onSearch,
            onChange,
            destroy



        }
    },
});
</script>