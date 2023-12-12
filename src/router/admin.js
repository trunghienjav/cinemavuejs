const admin = [ //tạo 1 biến const chứa object và thuộc tính của nó
    {
        path: "/admin", //nhớ phải thêm dấu /
        component: () => import("../layouts/admin.vue"),
        children: [
            {
                path: "users", //path con thì không cần dấu /
                name: "admin-users", //name này là name route
                component: () => import("../pages/admin/users/index.vue")
            },
            {
                path: "cinemas",
                name: "admin-cinemas", 
                component: () => import("../pages/admin/cinemas/index.vue")
            },
            {
                path: "films",
                name: "admin-films", 
                component: () => import("../pages/admin/films/index.vue")
            },
            {
                path: "films/create",
                name: "admin-films-create", 
                component: () => import("../pages/admin/films/create.vue")
            },
            {
                path: "films/edit/:id",
                name: "admin-films-edit", 
                component: () => import("../pages/admin/films/edit.vue")
            },
        ]
    }
];

export default admin;