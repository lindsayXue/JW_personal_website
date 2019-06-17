import VueRouter from 'vue-router'

import Home from '../components/Home'
import Research from '../components/Research'
import Publications from '../components/Publications'
import Blog from '../components/blog/Blog'
import BlogHome from '../components/blog/BlogHome'
import ViewBlog from '../components/blog/ViewBlog'
import CreateBlog from '../components/blog/CreateBlog'
import EditBlog from '../components/blog/EditBlog'
import Contact from '../components/Contact'

import AdminLogin from '../components/admin/AdminLogin'

import NotFound from '../components/NotFound'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/research',
      name: 'research',
      component: Research
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications
    },
    {
      path: '/blog',
      component: Blog,
      children: [
        {
          path: '/blog',
          name: 'blog-home',
          component: BlogHome
        },
        {
          path: '/blog/add',
          name: 'create-blog',
          component: CreateBlog
        },
        {
          path: '/blog/edit/:id',
          name: 'edit-blog',
          component: EditBlog
        },
        {
          path: '/blog/:id',
          name: 'view-blog',
          component: ViewBlog
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ],
  mode: 'history'
})

export default router
