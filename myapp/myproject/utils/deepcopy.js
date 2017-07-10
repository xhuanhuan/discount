var s=0;
function deepcopy(obj){
	s++
	if(s>10) return
  var o=obj instanceof Array?[]:{};
  console.log(Object.keys(obj))
  // for(var propname in obj){
  // 	console.log(propname,typeof(obj[propname]))
  //   if(typeof(obj[propname])==="object"){
  //       o[propname]=deepcopy(obj[propname]);
  //   }else{
  //       o[propname]=obj[propname];
  //   }
  // }
  return o;
}
module.exports = deepcopy;
