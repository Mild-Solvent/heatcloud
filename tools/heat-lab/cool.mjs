function coolSim({units,derate,dur,bufferM3=10,it=10,pumpFault=false,faultAt=600,Tnom=35,Tmax=40,dt=5,horizon=3600,modMW=2}){
  const C=997*bufferM3*4182,eff=modMW*(1-derate);let T=Tnom;const out=[];
  for(let t=0;t<=horizon;t+=dt){
    let cap=(units-1)*eff;if(t>=faultAt&&t<faultAt+dur)cap=(units-2)*eff;
    const pump=!(pumpFault&&t>=faultAt&&t<faultAt+10);
    let q,res;const qIT=it;
    if(pump){const buf=Math.max(0,T-Tnom)*C/(dt*1e6);q=Math.min(Math.max(0,cap),qIT+buf);res=qIT-q}else{q=0;res=qIT}
    const Tn=T+res*1e6*dt/C;const trip=Tn>Tmax||!pump;out.push({t,T:Tn,q,cap,trip});T=Tn}
  return out}
export {coolSim};
