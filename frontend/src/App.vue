<template>
  <div>
    <button @click="GetGame">GET GAME</button>
  </div>
</template>

<script>
import { Game } from "./game/game";
import { connectRequest, Request, updateRequest } from "./proto/tictac_pb";
import { GameClient } from "./proto/tictac_grpc_web_pb";
export default {
  name: "App",
  data() {
    return {
      token: "",
      field: "",
      idLobby: 0,
      start: false,
    };
  },
  created() {
    this.client = new GameClient("http://192.168.1.185:30001", null, null);
    this.game = new Game();
    let connect = new connectRequest();
    connect.setName("test" + Math.floor(Math.random() * 10));
    this.client.connect(connect, null, (err, resp) => {
      console.log(resp.toObject());
      this.token = resp.toObject().token;
      this.field = resp.toObject().field;
      this.idLobby = resp.toObject().idlobby;
      this.game.setSide(this.field);
      this.stream();
    });
    window.addEventListener("resize", this.windowReSizeHandler);
  },
  mounted() {
    this.game.init();
    this.game.enabeleStats();
    this.game.enableControls();
    //this.game.setSide("x");
    this.game.animate();
    this.game.fontLoad(process.env.BASE_URL + "fonts/Helvetica_Bold.json");
    window.addEventListener(
      "click",
      (event) => this.clickHandler(event),
      false
    );
  },
  methods: {
    windowReSizeHandler() {
      this.game.onWindowResize();
    },
    clickHandler(event) {
      //console.log(event);
      if (this.start) {
        let id = this.game.onMouseClick(event);
        if (id) {
          let req = new updateRequest();
          req.setToken(this.token);
          req.setIdfield(parseInt(id));
          req.setIdlobby(this.idLobby);
          this.client.update(req, null, (err, resp) => {
            console.log(resp.toObject());
          });
        }
      }
    },
    stream() {
      const what = this;
      let reguest = new Request();
      reguest.setToken(this.token);
      reguest.setIdlobby(this.idLobby);
      var call = this.client.stream(reguest);
      call.on("data", function (resp) {
        console.log(resp.toObject());
        resp = resp.toObject();
        if (resp.idfield == "startGame") {
          what.game.setStart(true);
          what.start = true;
        } else {
          what.game.setEnemyField(resp.idfield);
        }
      });
      call.on("end", function () {
        //console.log("end");
      });
      call.on("error", function (e) {
        console.log(e);
        // An error has occurred and the stream has been closed.
      });
      // call.on("status", function (status) {
      //   console.log(status);
      // });
    },
    GetGame() {},
  },
};
</script>

<style scope>
body {
  margin: 0%;
}
button {
  position: absolute;
  top: 40px;
  right: 0%;
}
</style>
