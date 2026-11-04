# Heat model lab

Source of the interactive lab served at `/heat-lab/` and embedded on `/heat-model/`
(`app/[locale]/heat-model/page.tsx`, `components/HeatLabFrame.tsx`).

It is the same page as the HeatCloud heat model Artifact, ported from the engineers'
study [Fenixcrowlite/datacenter-heat-reuse](https://github.com/Fenixcrowlite/datacenter-heat-reuse):

| File | Port of | Checked to |
|---|---|---|
| `model.mjs` | `heat_reuse/annual.py`, annual district-heat model (8,760 h) | 1e-6 relative on all 5 scenarios |
| `pool.mjs` | `heat_reuse/pool.py`, closed-loop Simulink/Stateflow pool model v04 | 1e-12 on 15 switch configurations |
| `cool.mjs` | `it_independent_cooling_step_SK.m`, IT cooling fault model | exact on 6 cases |

`data.json` holds the study's synthetic inputs, PVGIS typical-year weather for Partizánske
and Spišská Nová Ves, pool forcing, FMEA and capacity-fault tables. `ref.json` and
`poolref.json` are reference results produced by the original Python.

```sh
npm run heat-lab   # rebuilds public/heat-lab/ and runs verify.mjs
```

`page.tpl.html` is the page itself. The build strips web fonts and the CDN script (the site
promises no third-party requests), applies the site palette, and adds `?embed=1` mode, which
hides the lab's own header and posts its height to the parent page.
