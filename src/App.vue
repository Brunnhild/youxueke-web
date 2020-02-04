<template>
  <v-app>
    <v-navigation-drawer v-mode="drawer" app clipped v-if="loginState">
      <v-list dense>
        <v-list-item-group v-model="activeIndex">
          <v-list-item  @click="$router.push({ name: 'users' })">
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>用户管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item  @click="$router.push({ name: 'teams' })">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>团队管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item  @click="$router.push({ name: 'match' })">
            <v-list-item-action>
              <v-icon>info</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>活动管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item  @click="$router.push({ name: 'verify' })">
            <v-list-item-action>
              <v-icon>mdi-checkbox-multiple-marked-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>课程管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
       <v-btn block @click="logoutPrompt = true" style="width: 100px; position:fixed; bottom: 0px">注销</v-btn>
      <template v-slot:append>
        <div class="pa-2">
          <v-dialog v-model="logoutPrompt" width="500">         
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>提示</v-card-title>

              <v-card-text>确定要退出吗？</v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" text @click="logoutPrompt = false">取消</v-btn>
                <v-btn color="primary" text @click="logoutHandler">确认</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" v-if="loginState">
      <v-app-bar-nav-icon @click.stop="changeDrawer" style="color:white"></v-app-bar-nav-icon>
      <v-toolbar-title style="color:white">优学课</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-btn
      title="发布课程"
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      @click="addCoursePrompt = !addCoursePrompt"
      v-if="loginState"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="addCoursePrompt" width="800px">
      <v-card>
        <v-card-title class="primary lighten-1">
          <p style="color:white">发布课程</p>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field prepend-icon="mdi-card-bulleted" placeholder="课程名称" v-model="title"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field prepend-icon="mdi-account" placeholder="主讲人姓名" v-model="trueName"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  prepend-icon=" mdi-cellphone-android"
                  placeholder="主讲人手机号码"
                  v-model="phone"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field prepend-icon="notes" placeholder="课程介绍" v-model="introduction"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="category" row>
                  <v-radio label="学生讲师课程" :value="0"></v-radio>
                  <v-radio label="研讨课" :value="1"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  ref="menu"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu1"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field prepend-icon=" mdi-map-marker" placeholder="上课地点" v-model="location"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-file-input
                  disabled
                  placeholder="请上传课程的简介图片（尚未支持）"
                  v-model="image"
                  @change="imageUpload"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="addCoursePrompt = false">取消</v-btn>
          <v-btn text @click="addCourseHandler">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import utils from "@/utils";

export default {
  name: "App",
  components: {},
  computed: {
    ...mapState(["loginState", "stuId", "identity"]),
    activeIndex() {
      if (this.$route.path === "/users") return 0;
      else if (this.$route.path === "/teams") return 1;
      else if (this.$route.path === "/match") return 2;
      else if (this.$route.path === "/verify") return 3;
      else return null;
    }
  },
  data: () => ({
    drawer: false,
    addCoursePrompt: false,
    logoutPrompt: false,
    title: "",
    trueName: "",
    phone: "",
    introduction: "",
    date: "",
    time: "",
    location: "",
    image: null,
    menu1: false,
    menu2: false,
    category: 1
  }),
  created() {
    this.$vuetify.theme.dark = false;
    this.PROBE();
    if (this.loginState&&this.$route.path !== "/search") this.$router.push({ name: "search" });
  },
  methods: {
    ...mapMutations(["LOGOUT", "PROBE"]),
    logoutHandler() {
      this.LOGOUT();
      this.$router.push({ name: "login" });
      this.logoutPrompt = false;
    },
    addCourseHandler() {
      if (this.category === 0 && this.identity !== 2) {
        alert("学生导师才可以发布此类课程");
        return;
      }
      utils
        .request({
          invoke: utils.api.addCourse,
          params: {
            title: this.title,
            des: this.introduction,
            stuId: this.stuId,
            location: this.location,
            date: this.date + " " + this.time,
            category: this.category,
            trueName: this.trueName,
            phone: this.phone
          }
        })
        .then(res => {
          if (res.status === "true") {
            this.addCoursePrompt = false;
          } else alert("发布失败");
        });
    },
    imageUpload(e) {
      // eslint-disable-next-line
      console.log(e);
    },
    changeDrawer(){
      this.drawer = !this.drawer;
    }
  }
};
</script>
