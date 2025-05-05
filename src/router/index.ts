import { createRouter, createWebHistory } from 'vue-router';
import InboxPage from '../views/InboxPage.vue';
import TodayPage from '../views/TodayPage.vue';
import UpcomingPage from '../views/UpcomingPage.vue';
import ProjectPage from '../views/ProjectPage.vue';

const routes = [
    { path: '/', redirect: '/inbox' },
    { path: '/inbox', name: 'Inbox', component: InboxPage },
    { path: '/today', name: 'Today', component: TodayPage },
    { path: '/upcoming', name: 'Upcoming', component: UpcomingPage },
    { path: '/project/:id', name: 'Project', component: ProjectPage, props: true },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
