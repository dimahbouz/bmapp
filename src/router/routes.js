
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/shop',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/showInvoice.vue') },
      { path: ':id/edit', component: () => import('pages/editInvoice.vue') }
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
