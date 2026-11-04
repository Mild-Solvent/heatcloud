// JS port of heat_reuse/annual.py (step + metrics), same equations.
const DEF={source_temp_C:45,recovery_fraction:.9,storage_capacity_MWh:100,initial_soc:0,charge_limit_MW:5,discharge_limit_MW:5,eta_charge:.95,eta_discharge:.95,storage_loss_fraction_h:1e-4,hp_capacity_MW:12,carnot_efficiency:.45,cop_min:2.2,cop_max:7,part_load_penalty:.08,hx_effectiveness:.97,hx_max_MW:20,hx_approach_K:3,supply_min_C:55,supply_max_C:80,return_min_C:35,return_max_C:50,fixed_temperature:false,supply_fixed_C:70,dt_h:1,pue:1.2,boiler_efficiency:.9,electricity_EUR_MWh:100,gas_EUR_MWh:50,grid_CO2_t_MWh:.2,gas_CO2_t_MWh:.202,hp_capex_EUR_kW:650,storage_capex_EUR_kWh:35,hx_capex_EUR_kW:80,project_years:20,discount_rate:.06};
const SCEN={Air25_Fixed70:{source_temp_C:25,recovery_fraction:.7,storage_capacity_MWh:0,fixed_temperature:true},Liquid35_Weather:{source_temp_C:35,recovery_fraction:.85,storage_capacity_MWh:0},Warm45_Weather:{storage_capacity_MWh:0},Warm45_Storage100:{},Liquid35_LowTempDH:{source_temp_C:35,recovery_fraction:.85,supply_min_C:45,supply_max_C:65,return_min_C:30,return_max_C:40}};
function simulate(T,IT,c,demandScale=1,keepRows=true){
  const cl=(x,lo,hi)=>Math.min(hi,Math.max(lo,x));let E=c.initial_soc*c.storage_capacity_MWh;const n=T.length;
  const R={demand:new Float64Array(n),direct:new Float64Array(n),dis:new Float64Array(n),gas:new Float64Array(n),pot:new Float64Array(n),cop:new Float64Array(n),elec:new Float64Array(n),charge:new Float64Array(n),E:new Float64Array(n),supply:new Float64Array(n),source:new Float64Array(n),curt:new Float64Array(n)};
  let sd=0,sg=0,se=0,sx=0,scur=0,scu=0,su=0,sdc=0,sit=0,ssrc=0,shx=0;
  for(let i=0;i<n;i++){const tout=T[i],it=IT[i];
    const demand=(2+18*cl((16-tout)/28,0,1.15))/.94*demandScale;const f=cl((16-tout)/28,0,1);
    const supply=c.fixed_temperature?c.supply_fixed_C:c.supply_min_C+f*(c.supply_max_C-c.supply_min_C);
    const source=Math.max(0,it)*c.recovery_fraction;const hx=Math.max(0,Math.min(source*c.hx_effectiveness,c.hx_max_MW));
    const lift=Math.max(1,supply-(c.source_temp_C-c.hx_approach_K));
    const nc=cl(c.carnot_efficiency*(supply+273.15)/lift,c.cop_min,c.cop_max);
    const pot=Math.min(c.hp_capacity_MW,Math.max(0,hx*nc/Math.max(1e-6,nc-1)));
    const direct=Math.min(pot,demand);const sur=Math.max(0,pot-demand),def=Math.max(0,demand-pot);
    const al=Math.max(0,E*(1-c.storage_loss_fraction_h*c.dt_h));let ch=0,dis=0;
    if(sur>0)ch=Math.min(sur,c.charge_limit_MW,Math.max(0,c.storage_capacity_MWh-al)/(c.eta_charge*c.dt_h));
    else if(def>0)dis=Math.min(def,c.discharge_limit_MW,al*c.eta_discharge/c.dt_h);
    const nE=Math.max(0,al+c.dt_h*(c.eta_charge*ch-dis/c.eta_discharge));
    const used=direct+ch,gas=Math.max(0,demand-direct-dis);
    const plr=cl(used/Math.max(2.220446049250313e-16,c.hp_capacity_MW),0,1);
    const cop=cl(nc*(1-c.part_load_penalty*Math.max(0,1-plr)),c.cop_min,c.cop_max);const el=used/cop;
    const ex=(direct+dis)*Math.max(0,1-283.15/(supply+273.15));
    sd+=demand;sg+=gas;se+=el;sx+=ex;scur+=Math.max(0,pot-used);scu+=cop*used;su+=used;sdc+=c.pue*it;sit+=it;ssrc+=source;shx+=hx;
    if(keepRows){R.demand[i]=demand;R.direct[i]=direct;R.dis[i]=dis;R.gas[i]=gas;R.pot[i]=pot;R.cop[i]=cop;R.elec[i]=el;R.charge[i]=ch;R.E[i]=E;R.supply[i]=supply;R.source[i]=source;R.curt[i]=Math.max(0,pot-used);}
    E=nE;}
  const dt=c.dt_h,demand=sd*dt,gas=sg*dt,electric=se*dt,reused=Math.max(0,demand-gas);
  const saving=(demand-gas)/c.boiler_efficiency*c.gas_EUR_MWh-electric*c.electricity_EUR_MWh;
  const capex=c.hp_capacity_MW*1000*c.hp_capex_EUR_kW+c.storage_capacity_MWh*1000*c.storage_capex_EUR_kWh+c.hx_max_MW*1000*c.hx_capex_EUR_kW;
  const r=c.discount_rate,y=c.project_years,crf=r===0?1/y:r*(1+r)**y/((1+r)**y-1);
  const m={heat_demand_MWh:demand,gas_heat_MWh:gas,hp_electric_MWh:electric,reused_to_network_MWh:reused,exergy_delivered_MWh:sx*dt,curtailed_hp_heat_MWh:scur*dt,coverage_fraction:reused/Math.max(1e-300,demand),mean_cop:scu/Math.max(1e-300,su*dt/dt),erf:reused/Math.max(1e-300,sdc*dt),ere_system:(sdc*dt+electric-reused)/Math.max(1e-300,sit*dt),opex_saving_EUR:saving,CO2_saving_t:(demand-gas)/c.boiler_efficiency*c.gas_CO2_t_MWh-electric*c.grid_CO2_t_MWh,capex_EUR:capex,screening_LCOH_EUR_per_MWh:(capex*crf+electric*c.electricity_EUR_MWh)/Math.max(1e-300,reused),simple_payback_y:saving>0?capex/saving:null,source_MWh:ssrc*dt,hx_MWh:shx*dt,crf};
  return {m,R};}
export {DEF,SCEN,simulate};
