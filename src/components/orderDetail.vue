<template>
    <v-container>
        <br><br><br>
        <v-row no-gutters>
            <v-col cols="12" sm="7" class="pa-4 mx-auto">
                <v-card class="pa-2">
                  <v-img :src="`https://backend.hulumereja.com/upload/images/${detail.paymentImage}`"></v-img>
                </v-card>
            </v-col>
            <v-col cols="12" sm="5" class="pa-5 mx-auto">
              <v-card class="pa-2 text-center" min-height="415">
                <h2 class="secondary--text text-center display-1">{{detail.fullName}}</h2>    
                   <v-card-text >
                    <p>Email:{{detail.email}}</p>
                    <p>Phone number:{{detail.phoneNumber}}</p>
                  </v-card-text>
                  <v-divider></v-divider>
                    <div v-if="detail.paymentType==='freelancer'">
                        <p>He paid to be freelancer</p>
                    </div>
                    <div v-if="detail.paymentType==='tender'">
                        <p>He paid to participate in existing bidding competitions</p>
                    </div>
                  <v-card-subtitle >
                    <p class="secondary--text px-3 pt-3">Accept it according to the price he/she paid.</p>
                  </v-card-subtitle>
                  <v-card-text class="grey--text">
                    <div class="text-xs-center secondary mx-3">
                      <v-btn text @click="accept(3)" block>
                        <span class="text-capitalize white--text">Accept for 3 month</span>
                      </v-btn>
                    </div><br>     
                    <div class="text-xs-center secondary mx-3">
                      <v-btn text @click="accept(6)" block>
                        <span class="text-capitalize white--text">Accept for 6 month</span>
                      </v-btn>
                    </div><br>  
                     <div class="text-xs-center secondary mx-3">
                      <v-btn text @click="accept(12)" block>
                        <span class="text-capitalize white--text">Accept for 1 year</span>
                      </v-btn>
                    </div><br>             
                  </v-card-text>
              </v-card>
            </v-col>
        </v-row>
        <br><br>
    </v-container>
</template>
<script>
import getdetail from "../service/authonticationService";
export default {
  data() {
    return {
      detail:{},
    };
  },
  async created() {
    try {
      const response = await getdetail.getOrderById(this.$route.params.id);
      this.detail=response.data;
      } catch (err) {
          alert(err);
      }
     },
  methods: {
      accept: async function(amount){
        try {
          var someDate=new Date().toISOString().substr(0, 10);
          var dateObject = new Date(someDate),
          day = dateObject.getDate(); // returns day of the month number

          dateObject.setHours(20);

          dateObject.setMonth(dateObject.getMonth() + amount + 1, 0);

          dateObject.setDate(Math.min(day, dateObject.getDate()));

          if(this.detail.paymentType==='freelancer'){
            const response = await getdetail.getProfileById(this.detail.userId,{
              status: 'freelancer',
              isActive: 'active',
              freeExpDate: dateObject.toISOString().split('T')[0],
              });
              if(response.data){
                const newResponse = await getdetail.paymentAccepted(this.$route.params.id,{
                  isAccepted: 'accepted',
                });
                newResponse.data;
                this.$router.push({ name: "price" });
                window.scrollTo(0, 0);
              }
          }
          else if(this.detail.paymentType==='tender')
          {
            const response = await getdetail.getProfileById(this.detail.userId,{
              isPaid: 'paid',
              tendExpDate: dateObject.toISOString().split('T')[0],
            });
            if(response.data){
              const newResponse = await getdetail.paymentAccepted(this.$route.params.id,{
                  isAccepted: 'accepted',
                });
              newResponse.data;
              this.$router.push({ name: "price" });
              window.scrollTo(0, 0);
            }
          }         
        } catch (err) {
          alert(err);
        }
    }
  }
};
</script>