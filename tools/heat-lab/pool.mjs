// JS port of heat_reuse/pool.py (Stateflow v04 closed loop), same equations and update order.
const POOL_DEF={volume_m3:500,initial_temperature_C:16,initial_TES_MWh:.45,pool_limit_kw:150,hp_thermal_limit_kw:200,hp_electric_limit_kw:55,source_temperature_offset_C:0,pool_enabled:true,dh_enabled:true,hp_pool_enabled:true,it_enabled:true,tes_enabled:true,hx_enabled:true};
function poolInputs(scn,steps,F){const out=[];for(let k=0;k<steps;k++){const h=k/4;let u;
  if(k<F.length)u=F[k].slice();else{const day=h/24,act=(h%24>=8&&h%24<20)?1:0;
    u=[Math.max(0,170000+30000*Math.cos(2*Math.PI*day/7)+20000*Math.sin(2*Math.PI*h/24)),30+7*Math.cos(2*Math.PI*(day-2)/7),75000+35000*act+25000*(.5+.5*Math.cos(2*Math.PI*day/7)),29+.6*Math.sin(2*Math.PI*day/7),.6+.07*Math.sin(2*Math.PI*day/7),.5+.5*act,1-act,1,1,1,1]}
  if(scn==='vypnuty_bazen'&&h>=60&&h<108)u[8]=0;if(scn==='vypadok_IT_24h'&&h>=72&&h<96)u[7]=0;if(scn==='nulovy_zdroj_24h'&&h>=72&&h<96)u[0]=0;
  if(scn==='teplejsi_zdroj')u[1]+=12;if(scn==='bez_plachty')u[6]=0;if(scn==='TES_vypnute')u[9]=0;if(scn==='vysoky_dopyt_DH')u[2]+=95000;out.push(u)}return out}
function poolDemand(T,th,u,c){const air=u[3],rh=Math.min(1,Math.max(0,u[4])),act=Math.max(0,u[5]),cov=Math.min(1,Math.max(0,u[6]));
  const pv=.61094*Math.exp(17.625*T/(T+243.04)),pa=rh*.61094*Math.exp(17.625*air/(air+243.04));const mv=Math.max(0,4e-5*312.5*(pv-pa)*act*(1-.9*cov));
  const losses=mv*2440000+3*312.5*(T-air)*(1-.75*cov)+.95*5.670374419e-8*312.5*((T+273.15)**4-(air-2+273.15)**4)*(1-.75*cov)+800*(T-20)+mv*4182*(T-15)+2000;
  let nw=th;if(T<=27.35)nw=1;else if(T>=27.65)nw=0;if(u[8]<.5)nw=0;let req=0;
  if(nw>.5&&T<27.75&&u[8]>.5){const cap=997*c.volume_m3*4182;req=Math.min(c.pool_limit_kw*1000,Math.max(0,(27.75-T)*cap/900+losses),Math.max(0,(27.58-T)*cap/900+losses))}
  return [req,losses,nw]}
function poolMode(req,u,T,E){if(u[7]<.5)return 4;if(u[0]<=1e-6)return E>100000&&u[9]>.5&&u[2]>0?3:0;if(u[10]>.5&&u[8]>.5&&req>0&&u[1]>T+5)return 1;return 2}
function poolAlloc(T,E,req,losses,mode,u,c){const dt=900,emax=900*3.6e6,ec=.93,ed=.91;const dc=Math.max(0,u[0]),tdc=u[1],need=Math.max(0,u[2]),tes=u[9]>.5;
  const standing=.002*Math.max(0,E)/86400;let direct=0,hpp=0,hpd=0,ch=0,dis=0,src=0,el=0,aux=0,cop=0,hpo=0;
  if(mode===1&&u[10]>.5&&u[8]>.5)direct=Math.min(req,dc,c.pool_limit_kw*1000,Math.max(0,8500*(tdc-T-5)));
  const left=Math.max(0,dc-direct);
  if(mode===1||mode===2){cop=Math.min(6,Math.max(2.5,.43*(52+273.15)/Math.max(5,52-(tdc-5))));
    const cap=Math.min(c.hp_thermal_limit_kw*1000,c.hp_electric_limit_kw*1000*cop,left/Math.max(1e-9,1-1/cop));const mdh=Math.min(need,Math.min(50000,cap));
    hpp=c.hp_pool_enabled?Math.min(Math.max(0,req-direct),Math.max(0,cap-mdh)):0;hpd=Math.min(need,cap-hpp);let sp=Math.max(0,cap-hpp-hpd);
    if(c.hp_pool_enabled)hpp+=Math.min(Math.max(0,req-direct-hpp),sp);sp=Math.max(0,cap-hpp-hpd);
    if(tes&&E<emax&&sp>0)ch=Math.min(sp,70000,Math.max(0,(emax-E+standing*dt)/(ec*dt)));
    hpo=hpp+hpd+ch;el=hpo/cop;src=hpo-el;if(hpo>0)aux=1500}
  if(direct>0)aux+=500;const pool=direct+hpp,short=Math.max(0,need-hpd);
  if(tes&&short>0&&E>0){dis=Math.min(short,80000,Math.max(0,(E-standing*dt)*ed/dt));if(dis>0)aux+=250}
  if(dis>0&&ch>0){ch=0;hpo=hpp+hpd;el=hpo/cop;src=hpo-el}
  const dh=hpd+dis,rej=Math.max(0,dc-direct-src);const nE=Math.max(0,Math.min(emax,E+dt*(ec*ch-dis/ed-standing)));const nT=T+dt*(pool-losses)/(997*c.volume_m3*4182);
  return {nT,nE,req,pool,losses,direct,hpp,hpd,ch,dis,dh,unmet:Math.max(0,need-dh),poolUnmet:Math.max(0,req-pool),src,el,aux,rej,dc,cop,mode,standing}}
function runPool(scn,cfg,F,steps=672){const c={...POOL_DEF,...cfg};const ins=poolInputs(scn,steps,F);let T=c.initial_temperature_C,E=c.initial_TES_MWh*3.6e9,th=1;const rows=[];
  for(const u0 of ins){const u=u0.slice();u[1]+=c.source_temperature_offset_C;if(!c.it_enabled)u[7]=0;if(!c.pool_enabled)u[8]=0;if(!c.tes_enabled)u[9]=0;if(!c.hx_enabled)u[10]=0;if(!c.dh_enabled)u[2]=0;
    const [req,loss,nth]=poolDemand(T,th,u,c);const mode=poolMode(req,u,T,E);const r=poolAlloc(T,E,req,loss,mode,u,c);r.T=T;r.E=E;r.u=u;rows.push(r);T=r.nT;E=r.nE;th=nth}
  const tot=k=>rows.reduce((a,r)=>a+r[k],0)*900/3.6e9;
  return {rows,m:{pool_heat_MWh:tot('pool'),dh_heat_MWh:tot('dh'),hp_electric_MWh:tot('el'),dh_unmet_MWh:tot('unmet'),final_temperature_C:T,final_TES_MWh:E/3.6e9}}}
export {runPool,POOL_DEF};
