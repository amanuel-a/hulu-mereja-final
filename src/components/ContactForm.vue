<!-- <template>
  <div class="background">
    <div class="container">
      <div class="screen">
        <div class="screen-header">
          <div class="screen-header-left">
            <div class="screen-header-button close"></div>
            <div class="screen-header-button maximize"></div>
            <div class="screen-header-button minimize"></div>
          </div>
          <div class="screen-header-right">
            <div class="screen-header-ellipsis"></div>
            <div class="screen-header-ellipsis"></div>
            <div class="screen-header-ellipsis"></div>
          </div>
        </div>
        <div class="screen-body">
          <div class="screen-body-item left">
            <div class="app-title">
              <span>CONTACT</span>
              <span>US</span>
            </div>
            <div>
              <div class="app-contact">Email : onestepgetin@gmail.com</div>
              <div class="app-contact">CONTACT INFO : +251910902860</div>
            </div>
          </div>
          <div class="screen-body-item">
            <div class="app-form">
              <div class="app-form-group">
                <input class="app-form-control" placeholder="NAME" />
              </div>
              <div class="app-form-group">
                <input class="app-form-control" placeholder="EMAIL" />
              </div>
              <div class="app-form-group">
                <input class="app-form-control" placeholder="CONTACT NO" />
              </div>
              <div class="app-form-group message">
                <input class="app-form-control" placeholder="MESSAGE" />
              </div>
              <div class="app-form-group buttons">
                <button class="app-form-button" style="margin-right: 1rem">
                  CANCEL
                </button>
                <button class="app-form-button">SEND</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
<template>
  <section class="contact" id="contact">
    <div class="container">
        <div class="heading text-center">
            <h2>Contact
                <span> Us </span></h2>
          
                <br>
        </div>
        <div class="row">
            <div class="col-md-5">
                <div class="title">
                    <h3>Contact detail</h3>
                    <p> </p>
                </div>
                <div class="content">
                    <!-- Info-1 -->
                    <div class="ifo">
                        <i class="fas fa-mobile-alt"></i>
                        <h4 class="d-inline-block">PHONE :
                            <br>
                            <span>+251910902860</span></h4>
                    </div>
                    <!-- Info-2 -->
                    <div class="ifo">
                        <i class="far fa-envelope"></i>
                        <h4 class="d-inline-block">EMAIL :
                            <br>
                            <span>onestepgetin@gmail.com</span></h4>
                    </div>
                    <!-- Info-3 -->
                    <div class="ifo">
                        <i class="fas fa-map-marker-alt"></i>
                        <h4 class="d-inline-block">ADDRESS :<br>
                            <span>addis ababa , 4kilo, ኢክላስ building</span></h4>
                    </div>
                </div>
            </div>

            <div class="col-md-7">

                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <input type="text" class="form-control1" placeholder="Name">
                        </div>
                        <div class="col-sm-6">
                            <input type="email" class="form-control1" placeholder="Email">
                        </div>
                        <div class="col-sm-12">
                            <input type="phone" class="form-control1" id="contactno" placeholder="Contact No">
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control1" rows="5" id="comment" placeholder="Message"></textarea>
                    </div>
                    <button class="btn btn-block" type="submit">Send Now!</button>
                </form>
            </div>
        </div>
    </div>
</section>
</template>
<style scoped>
.contact {
  padding: 70px 0;
}

.contact .heading h2 {
  font-size: 30px;
  font-weight: 700;
  margin: 0;
  padding: 0;

}

.contact .heading h2 span {
  color: #6C63FF;
}

.contact .heading p {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  color: #999999;
  margin: 20px 0 60px;
  padding: 0;
}

.contact .form-control1 {
  padding: 25px;
  font-size: 13px;
  margin-bottom: 10px;
  background: #f9f9f9;
  border: 0;
  border-radius: 10px;
}

.contact button.btn {
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  background: #6C63FF;
  color: #ffffff;
}

.contact .title h3 {
  font-size: 18px;
  font-weight: 600;
}

.contact .title p {
  font-size: 14px;
  font-weight: 400;
  color: #999;
  line-height: 1.6;
  margin: 0 0 40px;
}

.contact .content .ifo {
  margin-top: 30px;
}
.contact .content .ifo i {
  font-size: 30px;
  padding: 0;
  margin: 0;
  color: #00e1ff;
  margin-right: 20px;
  text-align: center;
  width: 20px;
}
.contact .content .ifo h4 {
  font-size: 13px;
  line-height: 1.4;
}

.contact .content .ifo h4 span {
  font-size: 13px;
  font-weight: 300;
  color: #999999;
}
#comment {
  width: 100%;

}
#contactno{
  width: 100%;
}

</style>
<!-- <style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button,
input {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.background {
  display: flex;
  margin-top: 8rem;
  margin-bottom: 8rem;
}

@media screen and (max-width: 720px) {
  .background {
    margin-top: 0;
  }
}

.container {
  flex: 0 1 700px;
  margin: auto;
  padding: 10px;
}

.screen {
  position: relative;
  background: #252b3c;
  border-radius: 15px;
}

.screen:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  bottom: 0;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  z-index: -1;
}

.screen-header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #4d4d4f;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.screen-header-left {
  margin-right: auto;
}

.screen-header-button {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 3px;
  border-radius: 8px;
  background: white;
}

.screen-header-button.close {
  background: #ed1c6f;
}

.screen-header-button.maximize {
  background: #e8e925;
}

.screen-header-button.minimize {
  background: #74c54f;
}

.screen-header-right {
  display: flex;
}

.screen-header-ellipsis {
  width: 3px;
  height: 3px;
  margin-left: 2px;
  border-radius: 8px;
  background: #999;
}

.screen-body {
  display: flex;
}

.screen-body-item {
  flex: 1;
  padding: 50px;
}

.screen-body-item.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-title {
  display: flex;
  flex-direction: column;
  position: relative;
  color: #1ea1d1;
  font-size: 26px;
}

.app-title:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 25px;
  height: 4px;
  background: #1ea1d1;
}

.app-contact {
  margin-top: auto;
  font-size: 12px;
  color: #888;
}

.app-form-group {
  margin-bottom: 15px;
}

.app-form-group.message {
  margin-top: 40px;
}

.app-form-group.buttons {
  margin-bottom: 0;
  text-align: right;
}

.app-form-control {
  width: 100%;
  padding: 10px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #666;
  color: #ddd;
  font-size: 14px;
  text-transform: uppercase;
  outline: none;
  transition: border-color 0.2s;
}

.app-form-control::placeholder {
  color: #666;
}

.app-form-control:focus {
  border-bottom-color: #ddd;
}

.app-form-button {
  background: none;
  border: none;
  color: #1ea1d1;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.app-form-button:hover {
  color: #005275;
}

.credits {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #ffa4bd;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 16px;
  font-weight: normal;
}

.credits-link {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

.dribbble {
  width: 20px;
  height: 20px;
  margin: 0 5px;
}

@media screen and (max-width: 520px) {
  .screen-body {
    flex-direction: column;
  }

  .screen-body-item.left {
    margin-bottom: 30px;
  }

  .app-title {
    flex-direction: row;
  }

  .app-title span {
    margin-right: 12px;
  }

  .app-title:after {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .screen-body {
    padding: 40px;
  }

  .screen-body-item {
    padding: 0;
  }
}
</> -->

<script>
export default {
  name: "ContactForm",
};
</script>