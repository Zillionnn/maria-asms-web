<template>
  <v-app id="inspire" :dark="isDark">
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <div v-for="(item,index) in sideMenuList" :key="index">
          <v-list-tile v-if="!item.items" @click="toPage(item.route)">
            <v-list-tile-action>
              <v-icon>{{item.action}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>

          <v-list-group v-else v-model="item.active" :prepend-icon="item.action" no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="toPage(subItem.route)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn @click="setThemeColor()">L/D</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>
        &copy; Powered By zillionnn
        <i
          class="icon github"
          @click="toGithub"
          title="github.com/Zillionnn"
        ></i>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import HeadBar from '@/components/common/headBar.vue'
import SideBar from '@/components/common/sideBar.vue'
export default {
  name: 'App',
  components: {
    HeadBar,
    SideBar
  },
  props: {
    source: String
  },
  data () {
    return {
      sideMenuList: [
        {
          action: 'local_activity',
          title: '概览',
          route: '/'
        },
        // {
        //   action: 'local_activity',
        //   title: '广告位',
        //   route: '/allSpace'
        // },
        {
          action: 'done_all',
          title: '租赁',
          route: '/areaAdvtMng'
          // active: true,
          // items: [
          //   { title: 'Breakfast & brunch' },
          //   { title: 'New American' },
          //   { title: 'Sushi' }
          // ]
        },
        {
          action: 'build',
          title: '管理',
          items: [
            {
              title: '企业管理',
              route: '/co'
            },
            {
              title: '广告管理',
              route: '/advt'
            },
            {
              title: '居民区',
              route: '/resdentialArea'
            }
          ]
        },
        {
          action: 'settings',
          title: 'setting',
          route: '/setting'
          // active: true,
          // items: [
          //   { title: 'Breakfast & brunch' },
          //   { title: 'New American' },
          //   { title: 'Sushi' }
          // ]
        }
      ],

      isDark: true,
      drawer: null,
      Menus: [
        {
          name: 'test'
        },
        {
          name: 'test1 '
        }
      ]
    }
  },
  created () {
    if (localStorage.getItem('isDark') === 'true') {
      this.isDark = true
    } else {
      this.isDark = false
    }
  },
  methods: {
    toPage (p) {
      this.$router.push({ path: `${p}` })
    },
    toGithub () {
      window.open('https://github.com/Zillionnn/advertiseMng')
    },
    setThemeColor () {
      this.isDark = !this.isDark
      localStorage.setItem('isDark', this.isDark)
    }
  }
}
</script>

<style>
@import "./conf/icon.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  height: 100vh;
}

.flex_space_around {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.link_span {
  cursor: pointer;
  color: #03a9f4;
}

.flex_row_space_between{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.pointer{
  cursor:pointer;
}
</style>
