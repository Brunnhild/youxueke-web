<template>
  <div>
    <v-card>
      <v-card-title>
        比赛信息
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
         <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">添加比赛</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="名称"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.host" label="举办方"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.beginTime" label="比赛开始时间"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.singEtime" label="报名截止时间"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.des" label="简介"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </v-card-title>
      <v-data-table :headers="headers" :items="match" class="elevation-1" :search="search">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "名称",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "举办方", value: "host" },
        { text: "比赛时间", value: "beginTime" },
        { text: "报名截止时间", value: "singEtime" },
        { text: "简介", value: "des" },
        { text: "操作", value: "action", sortable: false }
      ],
      match: [
        {
          name: "创青春",
          host: "华东师范大学",
          beginTime: "2019-12-15",
          singEtime: "2019-12-10",
          des:
            "这是一个非常盛大的比赛，SDK纪念币是丢和软工普斯都恢复是读后感拍读后感配如果恩爱如何修复后地方"
        },
        {
          name: "大夏杯",
          host: "华东师范大学",
          beginTime: "2019-12-12",
          singEtime: "2019-12-10",
          des:
            "这是一个非常盛大的比赛，SDK纪念币是丢和软工普斯都恢复是读后感拍读后感配如果恩爱如何修复后地方"
        },
        {
          name: "互联网",
          host: "华东师范大学",
          beginTime: "2019-12-12",
          singEtime: "2019-12-10",
          des:
            "这是一个非常盛大的比赛，SDK纪念币是丢和软工普斯都恢复是读后感拍读后感配如果恩爱如何修复后地方"
        },
        {
          name: "英雄联盟",
          host: "华东师范大学",
          beginTime: "2019-12-13",
          singEtime: "2019-12-10",
          des:
            "这是一个非常盛大的比赛，SDK纪念币是丢和软工普斯都恢复是读后感拍读后感配如果恩爱如何修复后地方"
        },
        {
          name: "现代科技",
          host: "华东师范大学",
          beginTime: "2019-12-14",
          singEtime: "2019-12-10",
          des:
            "这是一个非常盛大的比赛，SDK纪念币是丢和软工普斯都恢复是读后感拍读后感配如果恩爱如何修复后地方"
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        host: "",
        beginTime: "",
        singEtime: "",
        des: ""
      },
      defaultItem: {
        name: "",
        host: "",
        beginTime: "",
        singEtime: "",
        des: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "添加比赛" : "编辑比赛";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.match.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.match.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.match.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
</style>
