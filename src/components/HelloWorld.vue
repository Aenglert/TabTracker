<template>
  <!-- Ths class is vor the Background. -->
  <div class="backGround">
    <div class="header">
      <h1>Todo list by EvoSys</h1>
    </div>

    <!--This button adds that written in the todo list.-->
    <div>
      <div class="divAddButton">
        <v-btn class="addButton" @click="add()"
          ><font-awesome-icon :icon="['fas', 'plus']" />
        </v-btn>
      </div>
      <input
        name="title"
        type="text"
        v-model="inputText"
        placeholder="-Write here-"
      />
    </div>

    <!--Here is the clear button to deleted it what at descr. and inptxt. stands.-->
    <div>
      <div class="divClearButton">
        <v-btn class="clearButton" @click="clear"
          ><v-icon> mdi-delete </v-icon>
        </v-btn>
      </div>

      <!--Here would the Description entered and by Description issued.-->
      <div class="divDescription">
        <input
          name="description"
          type="text"
          v-model="inputDescription"
          placeholder="-Description-"
        />
        <br />
      </div>
    </div>

    <!--This function adds the array element in the todo list and the descr..-->
    <ul id="myUL" v-for="item in todoArray" :key="item.id">
      <div>
        <br />
        <div
          class="divClearX"
          :class="item.checked ? 'toggle' : ''"
          @click="test(item), (item.checked = !item.checked)"
        >
          <span>
            <v-btn class="clearX" @click="clearX(item.id)"
              ><v-icon> mdi-delete </v-icon>
            </v-btn>
          </span>

          <li>Text: {{ item.title }}</li>
        </div>

        <div class="divDescItem">
          <li>Description: {{ item.description }}</li>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      toggle: false,
      inputText: "",
      inputDescription: "",
      myInput: "",
      item: "",
      clickEvent: "",
      todoArray: [], // Array created.
    };
  },

  // This function get the API.
  mounted() {
    axios.get("http://localhost:3000/api/courses").then((response) => {
      this.todoArray = response.data;
      console.warn(response.data);
    });
  },

  methods: {
    onChange(attrs, name) {
      console.log(name);
    },
    //  This method delete that written in the descr and inptxt.
    clear() {
      console.log("Deleted");
      this.inputText = "";
      this.inputDescription = "";
    },
    test(item) {
      console.log(item);
    },
    // This method delete the todo individually with the filter function.
    clearX(todoId) {
      console.log("Deleted");
      this.todoArray = this.todoArray.filter((item) => {
        return item.id != todoId;
      });
      console.log("Run ax. del");
      axios
        .delete(`http://localhost:3000/api/courses/${todoId}`, {})
        .then((response) => {
          console.log("response: ", response);
        });
    },

    // Here interacts the add button.
    add() {
      console.log("Ich wurde geklickt!");
      let booleanAddElement = true;
      this.todoArray.forEach((element) => {
        if (element.title == this.inputText) {
          booleanAddElement = false;
          // checked if inputText Unique.
        }
      });
      if (this.inputText == "") {
        booleanAddElement = false;
      }
      // When that written is Unique  than the function is execute.
      if (booleanAddElement === true) {
        let currentId = 1;
        if (this.todoArray.length > 0) {
          currentId += this.todoArray[this.todoArray.length - 1].id;
        }
        console.log("Array id", this.todoArray);

        // Here will that written in the array pushed.
        this.todoArray.push({
          id: currentId,
          title: this.inputText,
          description: this.inputDescription,
          checked: false,
        });
        axios.post("http://localhost:3000/api/courses", {
          title: this.inputText,
          description: this.inputDescription,
        });
        this.inputText = "";
        this.inputDescription = "";
      } else {
        alert("Activity already added");
      }
    },
  },
};
</script>

<style scoped>
::placeholder {
  color: black;
}
.v-btn--is-elevated {
  box-shadow: none;
}
.theme--light.v-btn.v-btn--has-bg {
  background-color: #ac50a6;
}

.backGround {
  background: rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  padding-bottom: 1000px;
}
ul {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
a {
  color: #42b983;
}
.divClearX span .clearX {
  width: 3%;
  float: right;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%),
    0px 0px 0px 0px rgb(0 0 0 / 0%);
}
div div .addButton {
  margin-right: 30%;
  margin-left: 2%;
  background: #ac50a6;
  float: right;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  -webkit-border-radius: 0;
  border-radius: 0;
  margin-top: 1%;
}
.clearButton {
  margin-right: 30%;
  margin-left: 8%;
  background: #9c52b2;
  float: right;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  -webkit-border-radius: 0;
  border-radius: 0;
  margin-top: 1%;
}
input {
  margin: 10px;
  margin-left: 39%;
  margin-right: 35%;
  margin-top: 0%;
  border-top: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  width: 28%;
  padding: 14px;
  float: right;
  font-size: 16px;
  color: rgb(0, 0, 0);
}
div div input:placeholder-shown {
  color: black;
}
li {
  cursor: pointer;
  content: "";
  margin: 5px;
  display: inline-flex;
  padding-left: 1%;
}
.toggle li {
  color: rgb(255, 0, 179);
  text-decoration: line-through;
  float: inline-end;
  text-align: center;
}
.header {
  overflow: hidden;
}
.header h1 {
  padding: 10px;
  color: black;
  text-align: center;
  margin-top: 2%;
}
.mimikri {
  margin-top: 1%;
  margin-left: 10%;
}
.descMimikir {
  margin-left: 10%;
}
.divClearX {
  margin-left: 32%;
  margin-right: 30%;
  padding-bottom: 9px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  border-left: 2px solid black;
}
.divDescItem {
  margin-left: 32%;
  margin-right: 30%;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  border-left: 2px solid black;
}
.divDescription {
  margin-bottom: 14%;
}
</style>
