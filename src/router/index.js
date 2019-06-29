import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/home.vue'
// import Setting from '@/components/page/setting.vue'
// import Co from '@/components/page/co/co.vue'
// import ResidentialArea from '@/components/page/res_area/area.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/setting',
      name: 'setting',
      // component: Setting
      component: () => import('@/components/page/setting.vue')
    },
    {
      path: '/co',
      name: 'co',
      // component: Co
      component: () => import('@/components/page/co/co.vue')
    },
    {
      path: '/resdentialArea',
      name: 'areaIndex',
      component: () => import('@/components/page/res_area/index.vue'),
      children: [
        {
          path: '/resdentialArea/areas',
          name: 'resarea',
          component: () => import('@/components/page/res_area/area/area.vue')
        },
        {
          path: '/resdentialArea/:id',
          name: 'advtSpace',
          component: () => import('@/components/page/res_area/areaAdvtSpaceMng/advtSpace.vue')
        },
        {
          path: '/',
          redirect: '/resdentialArea/areas'
        }
      ]
    },
    {
      path: '/advt',
      name: 'advt',
      component: () => import('@/components/page/advt/advt.vue')
    },
    // areaAdvtMng
    {
      path: '/areaAdvtMng',
      name: 'areaAdvtMng',
      component: () => import('@/components/page/areaAdvtMng/index.vue'),
      children: [
        {
          path: '/areaAdvtMng/spaces',
          name: 'resarea',
          component: () => import('@/components/page/areaAdvtMng/Spaces/index.vue')
        },
        {
          path: '/areaAdvtMng/Lease',
          name: 'Lease',
          component: () => import('@/components/page/areaAdvtMng/LeasePage/Lease.vue')
        },
        {
          path: `/areaAdvtMng/coplan/new/:co_id`,
          name: 'NewCoPlan',
          component: () => import('@/components/page/areaAdvtMng/NewCoPlan/NewCoPlan.vue')
        },
        {
          // 查看企业的所有方案
          path: '/areaAdvtMng/coplan/:co_id',
          name: 'CoPlan',
          component: () => import('@/components/page/areaAdvtMng/CoPlan/CoPlan.vue')
        },
        {
          path: '/',
          redirect: '/areaAdvtMng/Lease'
        }
      ]
    }

  ]
})
