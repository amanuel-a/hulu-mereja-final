<template>
  <div>
    <v-container>
        <v-row no-gutters>
        <v-col cols="12" sm="12" class="pa-4 mx-auto">
          <v-sheet min-height="70vh" rounded="lg" class=" py-13">
            <template>
              <v-data-table v-model="selected" :single-select="singleSelect"
                item-key="name"  :headers="headers" :items="merged" sort-by="calories" class="mr-2">
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Accepted Freelancers and Bidders</v-toolbar-title>
                    <div class="pl-3">Search<v-icon>mdi-search</v-icon>
                      <v-text-field  class="ml-3 mr-12"></v-text-field>
                    </div>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.profilePicture`]="{ item }">
                  <v-avatar size="30px"><img :src="`https://backend.hulumereja.com/upload/images/${item.profilePicture}`" ></v-avatar>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)" color="green">edit</v-icon>
                  <v-icon small @click="deleteItem(item)" color="red">delete</v-icon>
                </template>
              </v-data-table>
            </template>
        </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <br><br>
  </div>
</template>
<script>
import cust from "../service/authonticationService";
  export default {
    data: () => ({
      dialog: false,
      users:[],    
      orders:[],
      merged:[],
      tenderRemainingDay:0,
      freeRemainingDay:0,
      loading:false,
      headers: [
        { text: 'Photo',sortable: false,value: 'profilePicture',},
        { text: 'Full Name', value: 'fullName', align: 'left',},
        { text: 'Email', value: 'email'},
        { text: 'Phone Number', value: 'phoneNumber'},
        { text:'Remaining day for freelancer',value:'freeRemainingDay'},
        { text:'Remaining day to get tender',value:'tenderRemainingDay'},
        { text: 'Edit/Delete', value: 'action', sortable: false },
      ],
    }),
    async mounted(){
      this.loading=true;
        try {
          const userResponse=await cust.getFreelancer();
          var allUsers=userResponse.data;
          var currentTime=new Date();
          
          var j=0;
          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          for(j=0;j<allUsers.length;j++){
            var tendExpDate= new Date(allUsers[j].tendExpDate);
            var freeExpDate= new Date(allUsers[j].freeExpDate);
            this.freeRemainingDay=0;
            this.tenderRemainingDay=0;
            if(tendExpDate>currentTime || freeExpDate>currentTime)
            {
              if(tendExpDate>currentTime){
               this.tenderRemainingDay= Math.floor((tendExpDate - currentTime) / _MS_PER_DAY)
              }
              if(freeExpDate>currentTime){
               this.freeRemainingDay= Math.floor((freeExpDate - currentTime) / _MS_PER_DAY)
              }
              this.merged.push({
                  profilePicture:allUsers[j].imageUrl,
                  fullName:allUsers[j].fullName,
                  email:allUsers[j].email,
                  phoneNumber:allUsers[j].phoneNumber,
                  tenderRemainingDay:this.tenderRemainingDay,
                  freeRemainingDay:this.freeRemainingDay
                });
            }
          }
          this.loading=false;
        } catch (err) {
           this.loading=true;
        }
      } ,
  }
</script>