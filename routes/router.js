import {createRouter, createWebHashHistory} from 'vue-router';
import PostView from '../src/modules/posts/PostView.vue';
import PostNew from '../src/modules/posts/PostNew.vue';
import PostEdit from '../src/modules/posts/PostEdit.vue';
import CategoryView from '../src/modules/categories/CategoryView.vue';
import CategoryNew from '../src/modules/categories/CategoryNew.vue';
import CategoryEdit from '../src/modules/categories/CategoryEdit.vue';
import LoginView from '../src/modules/auth/LoginView.vue';

import {authGuard, postNewGuard, categoryNewGuard, postEditGuard, CategoryEditGuard} from './auth-guard';


const routes = [
    {
        path: '/login',
        component: LoginView,
        default: true
    },
    {
        path: '/',
        component: PostView,
        beforeEnter:[authGuard]
    },
    {
        path: '/posts/create',
        component: PostNew,
        beforeEnter:[postNewGuard]
    },
    {
        path: '/posts/edit/:id',
        component: PostEdit,
        props: true,
        beforeEnter:[postEditGuard]
    },
    {
        path: '/categories',
        component: CategoryView
    },
    {
        path: '/categories/create',
        component: CategoryNew,
        beforeEnter:[categoryNewGuard]
    },
    {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true,
        beforeEnter:[CategoryEditGuard]
    },
];

const router = createRouter( {
    history: createWebHashHistory(),
    routes
});

/*router.beforeEach((to, from, next) => {
    return false
}) */

export default router;