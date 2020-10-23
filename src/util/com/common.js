const GOODSIMGURL = "http://bwangame.cn:8080/resources/goodsimage/";
import { getUserInfo} from '@/api/index'
const getparametersetup=function(parameterstatus){
    let userInfo = getUserInfo();
    let CompanyConfig=userInfo.CompanyConfig;
    if(parameterstatus==2){
    return CompanyConfig.ISNEEDSALER;
    }
}

export default {
  getgoodsIMGURL() {
    return GOODSIMGURL
  },
}

const isPurViewFun = function(v){
  let userInfo = getUserInfo();
  if(userInfo.IsBoss == true){
    return true;
  }
  let data = userInfo.List.find(item=>item.MODULECODE == v);
  return data.ISPURVIEW==1?true:false;
}

export { getparametersetup,isPurViewFun }