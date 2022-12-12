const authGuard = (to, from, next) => {
    
    if(localStorage.getItem('authToken')) {
        next('/');
    } else {
        next('/login');
    }
}

const postNewGuard = (to, from, next) => {
    
    if(localStorage.getItem('authToken')) {
        next('/posts/create');
    } else {
        next('/');
    }
}

const categoryNewGuard = (to, from, next) => {
    
    if(localStorage.getItem('authToken')) {
        next('/categories/create');
    } else {
        next('/categories');
    }
}

const postEditGuard = (to, from, next) => {
    
    if(localStorage.getItem('authToken')) {
        next('/posts/edit/:id');
    } else {
        next('/');
    }
}

const categoryEditGuard = (to, from, next) => {
    
    if(localStorage.getItem('authToken')) {
        next('/categories/edit/:id');
    } else {
        next('/categories');
    }
}

export default 
    authGuard;
    postNewGuard; 
    categoryNewGuard; 
    postEditGuard;
    categoryEditGuard;  