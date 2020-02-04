<template>
  <div>
    <v-card>
      <v-card-title>
        用户信息
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
         <v-dialog v-model="dialog" max-width="500px">
              
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="姓名"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.school" label="学校"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.major" label="专业"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.tel" label="联系方式"></v-text-field>
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
          text: "姓名",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "学校", value: "school" },
        { text: "专业", value: "major" },
        { text: "联系方式", value: "tel" },
        { text: "操作", value: "action", sortable: false }
      ],
      match: [
        {
          name: "张三",
          school: "华东师范大学",
          major: "软件工程",
          tel: "1111"
        },
        {
          name: "李四",
          school: "华东师范大学",
          major: "软件工程",
          tel: "1111"
        },
        {
          name: "王五",
          school: "华东师范大学",
          major: "软件工程",
          tel: "1111"
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        school: "",
        major: "",
        tel: ""
      },
      defaultItem: {
        name: "",
        school: "",
        major: "",
        tel: ""
      }
    };
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
