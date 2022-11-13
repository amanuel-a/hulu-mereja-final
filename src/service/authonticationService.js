import Api from "@/service/Api";
export default {
  userRegisteration(userRegistrationInfo) {
    return Api().post("userRegister", userRegistrationInfo);
  },
  adminRegistration(adm){
    return Api().post("adminRegistration", adm);
  },
  userLogin(userLoginInfo) {
    return Api().post("userLogin", userLoginInfo);
  },
  upload(userImage) {
    return Api().post("upload", userImage);
  },
  postJobs(addpost){
    return Api().post("postJobs",addpost);
  },
  getPostedJobs(pageNumber){
    return Api().post(`getPostedJobs/${pageNumber}`);
  },
  getPostById(id){
    return Api().post(`getPostById/${id}`);
  },
  postTenders(addTenderpost){
    return Api().post("postTenders",addTenderpost);
  },
  getPostedTenders(pageNumber){
    return Api().post(`getPostedTenders/${pageNumber}`);
  },
  getTenderPostById(id){
    return Api().post(`getTenderPostById/${id}`);
  },
  getProfileById(id,profile){
    return Api().put(`getProfileById/${id}`,profile);
  },
  getFreelancer(getFre){
    return Api().post("getFreelancer",getFre);
  },
  getDetailById(id,getDetail){
    return Api().post(`getDetailById/${id}`,getDetail);
  },
  addPayment(addpay){
    return Api().post("addPayment",addpay);
  },
  getOrder(pageNumber){
    return Api().post(`getOrder/${pageNumber}`);
  },
  getOrderById(id,getDet){
    return Api().post(`getOrderById/${id}`,getDet);
  },
  location(byLocation,pageNumber){
    return Api().post(`location/${byLocation}/${pageNumber}`);
  },
  catagory(byCatagory,pageNumber){
    return Api().post(`catagory/${byCatagory}/${pageNumber}`);
  },
  dates(byDate,pageNumber){
    return Api().post(`dates/${byDate}/${pageNumber}`);
  },
  paymentAccepted(id,pay){
    return Api().put(`paymentAccepted/${id}`,pay);
  },
  tenderCatagory(byCatagory,pageNumber){
    return Api().post(`tenderCatagory/${byCatagory}/${pageNumber}`);
  },
  tenderLocation(byLocation,pageNumber){
    return Api().post(`tenderLocation/${byLocation}/${pageNumber}`);
  },
  tenderDates(byDate,pageNumber){
    return Api().post(`tenderDates/${byDate}/${pageNumber}`);
  },
  getAcceptedOrder(getAO){
    return Api().post("getAcceptedOrder",getAO);
  },
  updatePostedJob(id,post){
    return Api().put(`updatePostedJob/${id}`,post);
  },
  updatePostedTender(id,post){
    return Api().put(`updatePostedTender/${id}`,post);
  },
  deleteJob(djob){
    return Api().delete(`deleteJob/${djob}`);
  },
  deleteTender(tjob){
    return Api().delete(`deleteTender/${tjob}`);
  },
  promotion(pro){
    return Api().post("promotion",pro);
  },
  getPromotion(pro){
    return Api().post("getPromotion",pro);
  },
};
