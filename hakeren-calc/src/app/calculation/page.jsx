"use client";
import { useState, useEffect, useRef } from "react";

const LOGO_B64 = "data:image/png;base64,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";
const DRAFT_KEY = "hakeren_draft_v2";

const YN = [{v:'yes',l:'Yes'},{v:'no',l:'No'}];


const INITIAL = {
  name:'',phone:'',email:'',passport:'',nationality:'',
  passportFile:null,passportFileName:'',
  empSource:[],pikadon:'',address:'',
  empFirstName:'',empFamilyName:'',empAddress:'',empCell:'',empHome:'',
  empContact:[],empContactName:'',empContactPhone:'',
  start:'',end:'',termReason:'',resignReason:[],noticeDate:'',
  noticeDaysGiven:'0',
  salary:'',salaryIncreases:[],
  shabat:'',pocketMoney:'',liveType:'',
  worksWeekends:'',weekendsPerMonth:'1',
  vacations:[{dep:'',ret:''}],
  recuperationDate:'',
  annualLeaveDate:'',
  holidaysDate:'',
  holidayType:'',holidayDaysWorked:'',
  existingPension:'',pensionPaid:'',severancePaid:'',
  lastSalaryNeeded:'',lastSalaryDate:'',
  agreement:'',
  agreementFile:null,agreementFileName:'',
  comments:'',
};

const WEBHOOK_URL = "https://hook.eu1.make.com/0oubj2kli3e49csk3rrxnobvsj52hxuj";

async function submitToMake(f) {
  const payload = {
    // Flat fields for GAS calculation engine
    name: f.name,
    phone: f.phone,
    email: f.email,
    passport: f.passport,
    nationality: f.nationality,
    empSource: f.empSource,
    pikadon: f.pikadon,
    address: f.address,
    empFirstName: f.empFirstName,
    empFamilyName: f.empFamilyName,
    empAddress: f.empAddress,
    empCell: f.empCell,
    empHome: f.empHome,
    empContact: f.empContact,
    empContactName: f.empContactName,
    empContactPhone: f.empContactPhone,
    start: f.start,
    end: f.end,
    termReason: f.termReason,
    resignReason: Array.isArray(f.resignReason) ? f.resignReason[0] || '' : f.resignReason,
    noticeDate: f.noticeDate,
    noticeDaysGiven: Number(f.noticeDaysGiven) || 0,
    shiva: 0,
    salary: Number(f.salary),
    salaryIncreases: f.salaryIncreases.filter(si => si.newSal && si.date).map(si => ({newSal: Number(si.newSal), date: si.date})),
    pocketMoney: Number(f.pocketMoney) || 0,
    liveType: f.liveType,
    worksWeekends: f.worksWeekends === 'yes',
    weekendsPerMonth: f.worksWeekends === 'yes' ? Number(f.weekendsPerMonth) : 0,
    vacations: f.vacations.filter(v => v.dep && v.ret).map(v => ({paid: 'no', dep: v.dep, ret: v.ret})),
    existingPension: f.existingPension === 'yes',
    pensionPaid: f.pensionPaid,
    severancePaid: f.severancePaid,
    holidayType: f.holidayType,
    holidayDaysWorked: Number(f.holidayDaysWorked) || 0,
    holidaysLastDate: f.holidaysDate || null,
    recuperationLastDate: f.recuperationDate || null,
    annualLeaveLastDate: f.annualLeaveDate || null,
    lastSalaryNeeded: f.lastSalaryNeeded === 'yes',
    lastSalaryDate: f.lastSalaryDate || null,
    firstEmployment: '',
    ownerRent: '',
    agreement: f.agreement,
    agreementFile: f.agreementFile || null,
    agreementFileName: f.agreementFileName || null,
    comments: f.comments || '',
    shabat: f.shabat ? Number(f.shabat) : null,
    passportFile: f.passportFile || null,
    passportFileName: f.passportFileName || null,
    // Nested structure for record keeping
    meta: {
      submitted_at: new Date().toISOString(),
      form_version: "1.1",
      source: "hakeren-calculation-form"
    },
    worker: {
      full_name: f.name,
      phone: f.phone,
      email: f.email,
      passport_number: f.passport,
      nationality: f.nationality,
      address: f.address,
      employer_type: f.empSource,
      pikadon_requested: f.pikadon
    },
    employer: {
      first_name: f.empFirstName,
      family_name: f.empFamilyName,
      full_name: `${f.empFirstName} ${f.empFamilyName}`.trim(),
      address: f.empAddress,
      cell_phone: f.empCell,
      home_phone: f.empHome,
      contact_person: {
        relationship: f.empContact,
        full_name: f.empContactName,
        phone: f.empContactPhone
      }
    },
    employment: {
      start_date: f.start,
      end_date: f.end,
      termination_reason: f.termReason,
      resignation_reason: f.resignReason,
      notice_date: f.noticeDate,
      notice_days_given: Number(f.noticeDaysGiven) || 0,
      shiva_days: 0,
      employment_type: f.liveType,
      works_weekends: f.worksWeekends,
      weekends_per_month: f.worksWeekends === 'yes' ? f.weekendsPerMonth : null
    },
    salary: {
      base_salary_ils: Number(f.salary),
      pocket_money_ils: Number(f.pocketMoney),
      shabat_payment_ils: f.shabat ? Number(f.shabat) : null,
      salary_changes: f.salaryIncreases
        .filter(si => si.newSal && si.date)
        .map(si => ({
          new_salary_ils: Number(si.newSal),
          effective_from: si.date
        }))
    },
    vacations: f.vacations.filter(v => v.dep && v.ret).map((v, i) => ({
      vacation_number: i + 1,
      was_paid: 'no',
      departure_date: v.dep || null,
      return_date: v.ret || null
    })),
    benefits: {
      recuperation_last_date: f.recuperationDate || null,
      annual_leave_last_date: f.annualLeaveDate || null,
      holidays_last_date: f.holidaysDate || null,
      holiday_type: f.holidayType,
      holiday_days_worked: Number(f.holidayDaysWorked) || 0,
      existing_pension: f.existingPension,
      pension_paid: f.pensionPaid,
      severance_paid: f.severancePaid,
      last_salary_needed: f.lastSalaryNeeded === 'yes',
      last_salary_date: f.lastSalaryDate || null
    },
    additional: {
      first_employment_in_israel: '',
      employer_owns_or_rents: '',
      signed_employment_agreement: f.agreement,
      agreement_file: f.agreementFile || null,
      agreement_file_name: f.agreementFileName || null,
      comments: f.comments || null
    }
  };

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`Webhook error: ${res.status}`);
  return payload;
}

// ΓöÇΓöÇ Validators ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = v => /^[\d\s\-\+\(\)]{7,15}$/.test(v.trim());
const isPosNum = v => v !== '' && !isNaN(v) && Number(v) >= 0;
const isDate  = v => v && !isNaN(Date.parse(v));

function validatePage(page, f) {
  const errs = {};

  if (page === 1) {
    if (!f.name.trim())             errs.name = 'Full name is required';
    if (!f.phone.trim())            errs.phone = 'Phone is required';
    else if (!isPhone(f.phone))     errs.phone = 'Enter a valid phone number';
    if (!f.email.trim())            errs.email = 'Email is required';
    else if (!isEmail(f.email))     errs.email = 'Enter a valid email address';
    if (!f.passport.trim())          errs.passport = 'Passport number is required';
    if (!f.nationality)             errs.nationality = 'Nationality is required';
    if (!f.address.trim())          errs.address = 'Address is required';
    if (f.empSource.length === 0)   errs.empSource = 'Please select employer type';
    if (!f.pikadon)                 errs.pikadon = 'Please answer the PIKADON question';
  }

  if (page === 2) {
    if (!f.empFirstName.trim())     errs.empFirstName = 'First name is required';
    if (!f.empFamilyName.trim())    errs.empFamilyName = 'Family name is required';
    if (!f.empAddress.trim())       errs.empAddress = 'Employer address is required';
    if (f.empContactName.trim() && !f.empContactPhone.trim()) errs.empContactPhone = 'Phone required when name is given';
  }

  if (page === 3) {
    if (!f.start)                   errs.start = 'Start date is required';
    if (!f.end)                     errs.end = 'End date is required';
    if (f.start && f.end && f.end < f.start) errs.end = 'End date must be after start date';
    if (!f.termReason)              errs.termReason = 'Select a reason';
    if (f.termReason === 'resign' && f.resignReason.length === 0)
                                    errs.resignReason = 'Please select reason for resignation';
    if (!f.noticeDate)              errs.noticeDate = 'Notice date is required';
    if (!f.salary)                  errs.salary = 'Salary is required';
    else if (!isPosNum(f.salary))   errs.salary = 'Enter a valid amount';
    if (f.shabat && !isPosNum(f.shabat)) errs.shabat = 'Enter a valid amount';
    if (f.worksWeekends === 'yes' && !f.shabat) errs.shabat = 'Shabat payment required if you work weekends';
    if (!f.liveType)                errs.liveType = 'Please select living arrangement';
    if (!f.worksWeekends)          errs.worksWeekends = 'Please answer weekend question';
    f.salaryIncreases.forEach((si, i) => {
      if (si.newSal && !isPosNum(si.newSal)) errs[`si_${i}_sal`] = 'Enter valid amount';
      if (si.newSal && !si.date)    errs[`si_${i}_date`] = 'Date required';
      if (si.date && !si.newSal)    errs[`si_${i}_sal`] = 'Salary required';
    });
    f.vacations.forEach((v, i) => {
      if (v.dep || v.ret) {
        if (!v.dep)                 errs[`vac_${i}_dep`] = 'Departure date required';
        if (!v.ret)                 errs[`vac_${i}_ret`] = 'Return date required';
        if (v.dep && v.ret && v.ret < v.dep) errs[`vac_${i}_ret`] = 'Return must be after departure';
      }
    });
    // recuperationDate is optional -leave empty if never received
  }

  if (page === 4) {
    // annualLeaveDate and holidaysDate are optional -leave empty if never received
    if (!f.holidayType)             errs.holidayType = 'Please select your holiday type';
    if (f.holidayDaysWorked === '' || f.holidayDaysWorked === undefined) errs.holidayDaysWorked = 'Please enter number of holiday days (0-9)';
    if (!f.existingPension)         errs.existingPension = 'Please answer this question';
    if (!f.pensionPaid)             errs.pensionPaid = 'Please answer this question';
    if (!f.severancePaid)           errs.severancePaid = 'Please answer this question';
    if (!f.lastSalaryNeeded)         errs.lastSalaryNeeded = 'Please answer this question';
    if (f.lastSalaryNeeded === 'yes' && !f.lastSalaryDate) errs.lastSalaryDate = 'Please enter the last salary date';
    if (!f.agreement)               errs.agreement = 'Please answer this question';
  }

  return errs;
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#fff;font-family:'Open Sans',sans-serif;color:#222}
  .pw{max-width:780px;margin:0 auto;padding:0 16px 40px}
  .hk-hdr{background:#fff;border-bottom:2px solid #1565c0;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
  .hk-hdr img{height:52px}
  .hk-hero{padding:24px 0 18px;border-bottom:1px solid #e0e8f5;margin-bottom:20px}
  .hk-hero h1{font-size:20px;font-weight:700;color:#1565c0;margin-bottom:12px;text-align:center}
  .hk-hero p{font-size:13px;color:#444;line-height:1.7;margin-bottom:8px}
  .hk-hero p.b{font-weight:700;color:#1565c0}
  .pay-notice{background:#fff8e1;border:1px solid #ffd54f;border-left:4px solid #f9a825;border-radius:6px;padding:12px 16px;margin-bottom:18px;font-size:13px;line-height:1.6;color:#5d4037}
  .pay-notice strong:first-child{display:block;margin-bottom:4px}
  .pay-notice strong{color:#e65100}
  .draft-bar{display:flex;align-items:center;gap:10px;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:6px;padding:10px 14px;margin-bottom:16px;font-size:12px;color:#2e7d32}
  .draft-bar button{padding:5px 12px;border:1px solid #2e7d32;border-radius:4px;background:#fff;color:#2e7d32;font-size:12px;cursor:pointer;font-family:inherit;font-weight:600}
  .fc{border:1px solid #cdd8e8;border-radius:4px;overflow:hidden;margin-bottom:20px}
  .fc-hdr{background:#1565c0;color:#fff;padding:10px 20px;font-size:13px;font-weight:600;display:flex;justify-content:space-between;align-items:center}
  .fc-body{padding:22px 20px}
  .st{font-size:16px;font-weight:700;color:#1565c0;margin-bottom:14px;padding-bottom:6px;border-bottom:1px solid #e0e8f5}
  .field{margin-bottom:14px}
  .field label{display:block;font-size:13px;font-weight:600;color:#1565c0;margin-bottom:4px}
  .field input,.field select,.field textarea{width:100%;padding:9px 11px;border:1.5px solid #ccc;border-radius:5px;font-size:13px;font-family:inherit;color:#222;background:#fafafa;outline:none;transition:border-color 0.15s}
  .field input:focus,.field select:focus,.field textarea:focus{border-color:#1565c0;background:#fff}
  .field input.err,.field select.err{border-color:#e53935 !important;background:#fff5f5}
  .field .errmsg{color:#e53935;font-size:11px;margin-top:3px;display:flex;align-items:center;gap:4px}
  .field .errmsg::before{content:'!';font-size:10px}
  .field select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%231565c0' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px}
  .hint{font-size:11px;color:#888;margin-top:3px}
  .req-star{color:#e53935}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:13px}
  .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px}
  .chk-grp{display:flex;flex-direction:column;gap:7px;margin-top:4px}
  .chk-item{display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer}
  .chk-item input{width:15px;height:15px;cursor:pointer;accent-color:#1565c0}
  .rg{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px}
  .rb{padding:6px 14px;border:1.5px solid #cdd8e8;border-radius:4px;font-size:12px;cursor:pointer;background:#fff;color:#444;font-family:inherit;font-weight:400;transition:all 0.12s}
  .rb.on{border-color:#1565c0;background:#e3f2fd;color:#0d47a1;font-weight:600}
  .rb.err-chip{border-color:#e53935}
  .nav{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:14px;border-top:1px solid #e0e8f5;gap:8px}
  .btn-b{background:#1565c0;color:#fff;border:none;padding:10px 22px;border-radius:4px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
  .btn-b:hover{background:#0d47a1}
  .btn-o{background:#fff;color:#1565c0;border:2px solid #1565c0;padding:9px 20px;border-radius:4px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
  .btn-g{background:#fff;color:#2e7d32;border:2px solid #2e7d32;padding:9px 20px;border-radius:4px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}
  .alert-info{background:#e3f2fd;border-left:3px solid #1976d2;border-radius:4px;padding:10px 13px;font-size:12px;color:#0d47a1;line-height:1.6;margin-top:8px}
  .err-banner{background:#ffebee;border:1px solid #ef9a9a;border-radius:6px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#c62828;line-height:1.6}
  .err-banner strong{display:block;margin-bottom:4px}
  .vac-blk{background:#f8fafc;border:1px solid #e0e8f5;border-radius:6px;padding:14px;margin-bottom:10px;position:relative}
  .vac-blk .rm{position:absolute;top:10px;right:10px;background:none;border:none;cursor:pointer;font-size:18px;color:#e53935;line-height:1}
  .sal-blk{background:#f0f6ff;border:1px solid #c5d9f0;border-radius:5px;padding:12px;margin-bottom:8px;position:relative}
  .sal-blk .rm{position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;font-size:16px;color:#e53935;line-height:1}
  .add-btn{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border:1.5px dashed #90caf9;border-radius:4px;background:transparent;color:#1565c0;font-size:12px;cursor:pointer;font-weight:600;font-family:inherit;margin-top:4px}
  .hk-ftr{background:#f0f4f8;border-top:2px solid #1565c0;padding:18px 24px;text-align:center;font-size:11px;color:#555;line-height:1.8;margin-top:16px}
  .hk-ftr p{margin-bottom:3px}
  .progress-bar{height:4px;background:#e0e8f5;margin-bottom:0}
  .progress-fill{height:100%;background:#1565c0;transition:width 0.3s}
  @media(max-width:600px){.g2,.g3{grid-template-columns:1fr}.hk-hero h1{font-size:16px}}
`;

function Chips({opts, val, on, hasErr}) {
  return <div className="rg">{opts.map(o=><button key={o.v} className={`rb${val===o.v?' on':''}${hasErr&&!val?' err-chip':''}`} onClick={()=>on(o.v)}>{o.l}</button>)}</div>;
}
function ChkGrp({opts, vals, on}) {
  return <div className="chk-grp">{opts.map(o=><label key={o.v} className="chk-item"><input type="checkbox" checked={vals.includes(o.v)} onChange={e=>{if(e.target.checked)on([...vals,o.v]);else on(vals.filter(v=>v!==o.v));}}/>{o.l}</label>)}</div>;
}
function F({label, req, hint, span, err, children}) {
  return <div className="field" style={span?{gridColumn:'1/-1'}:{}} id={err?`err-${label?.replace(/\s/g,'_')}`:''}><label>{label}{req&&<span className="req-star"> *</span>}</label>{children}{hint&&<p className="hint">{hint}</p>}{err&&<p className="errmsg">{err}</p>}</div>;
}
function Err({msg}) { return msg?<p className="errmsg">{msg}</p>:null; }

export default function App() {
  const [page, setPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [savedAt, setSavedAt] = useState(null);
  const [showErrs, setShowErrs] = useState(false);
  const [touched, setTouched] = useState({});
  const topRef = useRef(null);

  const [f, setF] = useState(() => {
    try { const d = localStorage.getItem(DRAFT_KEY); if(d){const p=JSON.parse(d);return p.data||INITIAL;} } catch(e) {}
    return INITIAL;
  });
  const set = (k, v) => setF(p => ({...p, [k]: v}));
  const touch = k => setTouched(p => ({...p, [k]: true}));

  useEffect(() => {
    const id = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({data:f, savedAt:new Date().toISOString()}));
      setSavedAt(new Date().toLocaleTimeString());
    }, 30000);
    return () => clearInterval(id);
  }, [f]);

  const langMap = [
    {code:'',label:'English (Original)'},
    {code:'tl',label:'Tagalog'},
    {code:'ro',label:'Romanian'},
    {code:'uk',label:'Ukrainian'},
    {code:'ru',label:'Russian'},
    {code:'zh-CN',label:'Chinese'},
    {code:'si',label:'Sinhala'},
    {code:'hi',label:'Hindi'},
    {code:'ar',label:'Arabic'},
    {code:'fil',label:'Filipino'},
    {code:'th',label:'Thai'},
    {code:'id',label:'Indonesian'},
    {code:'vi',label:'Vietnamese'},
    {code:'he',label:'Hebrew'},
  ];
  useEffect(() => {
    if (window.googleTranslateElementInit) return;
    document.cookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.documentElement.lang = 'en';
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'tl,ro,uk,ru,zh-CN,si,hi,ar,fil,th,id,vi,he',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };
    const s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&hl=en';
    s.async = true;
    document.head.appendChild(s);
  }, []);

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({data:f, savedAt:new Date().toISOString()}));
    setSavedAt(new Date().toLocaleTimeString());
  };

  const errs = validatePage(page, f);
  const hasErrs = Object.keys(errs).length > 0;

  const tryNext = () => {
    setShowErrs(true);
    if (hasErrs) {
      // scroll to first error
      const firstErrEl = document.querySelector('.err,.errmsg,.err-chip');
      if (firstErrEl) firstErrEl.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    setShowErrs(false);
    setTouched({});
    saveDraft();
    setPage(p => p+1);
    topRef.current?.scrollIntoView({behavior:'smooth'});
  };

  // helpers
  const E = k => showErrs && errs[k] ? errs[k] : null;
  const addSI = () => set('salaryIncreases', [...f.salaryIncreases, {newSal:'',date:''}]);
  const updSI = (i,k,v) => { const a=[...f.salaryIncreases]; a[i]={...a[i],[k]:v}; set('salaryIncreases',a); };
  const rmSI  = i => set('salaryIncreases', f.salaryIncreases.filter((_,x)=>x!==i));
  const addV  = () => set('vacations', [...f.vacations, {dep:'',ret:''}]);
  const updV  = (i,k,v) => { const a=[...f.vacations]; a[i]={...a[i],[k]:v}; set('vacations',a); };
  const rmV   = i => set('vacations', f.vacations.filter((_,x)=>x!==i));

  const nats = ['Filipino','Romanian','Moldovan','Ukrainian','Russian','Sri Lankan','Chinese','Indian','Thai','Other'];
  const termOpts = [{v:'died',l:'Employer Died'},{v:'fired',l:'Got Fired'},{v:'resign',l:'Resigned'}];
  const resignOpts = [{v:'nopay',l:"They didn't pay me"},{v:'sick',l:"I'm sick (medical)"},{v:'harassment',l:'Sexual harassment'},{v:'other',l:'Other reason'}];
  const contactOpts = [{v:'son',l:'Son'},{v:'daughter',l:'Daughter'},{v:'niece',l:'Niece/Nephew'},{v:'wife',l:'Wife'},{v:'husband',l:'Husband'},{v:'social',l:'Social Worker'}];
  const holidayTypeOpts = [{v:'jewish',l:'Jewish'},{v:'christian_catholic',l:'Christian Catholic'},{v:'christian_orthodox',l:'Christian Orthodox'},{v:'thailand',l:'Thailand'},{v:'india',l:'India'},{v:'srilanka',l:'Sri Lanka'},{v:'romania',l:'Romania'},{v:'ukraine',l:'Ukraine'}];
  const inp = (k, extra) => ({
    style: {width:'100%',padding:'9px 11px',border:`1.5px solid ${showErrs&&errs[k]?'#e53935':'#ccc'}`,borderRadius:5,fontSize:13,fontFamily:'inherit',color:'#222',background:showErrs&&errs[k]?'#fff5f5':'#fafafa',outline:'none'},
    ...extra
  });

  const pageTitle = ['Employee Information','Employer\'s Information','Employment Information','Final Details'][page-1];
  const pct = (page/4)*100;

  if (submitted) return (
    <>
      <style>{css}</style>
      <div className="hk-hdr"><img src={LOGO_B64} alt="Hakeren"/></div>
      <div className="pw" style={{textAlign:'center',paddingTop:60}}>
        <div style={{fontSize:56,marginBottom:20,color:'#4caf50'}}>V</div>
        <h2 style={{fontSize:22,color:'#1565c0',marginBottom:12}}>Form Submitted Successfully</h2>
        <p style={{fontSize:14,color:'#444',lineHeight:1.7}}>Your calculation is being processed.<br/>Results will be sent to: <strong>{f.email}</strong></p>
      </div>
      <div className="hk-ftr">
        <p>All calculation forms for foreign workers' rights in Israel created by the Foundation are exclusively owned and protected by copyright.</p>
        <p>All rights reserved by the Israeli Foundation for Foreign Worker Rights. (C)</p>
        <p>All forms for Social Benefits Calculation for foreign workers in Israel created by Hakeren are proprietary and copyrighted materials. Any unauthorized reproduction, copying, or duplication of content from this website or the forms provided is strictly prohibited. Hakeren reserves all rights. (C)</p>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="hk-hdr" ref={topRef}>
        <img src={LOGO_B64} alt="Hakeren"/>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div id="google_translate_element" className="notranslate" translate="no" style={{position:'absolute',left:'-9999px'}}/>
          <select className="notranslate" translate="no" style={{fontSize:12,padding:'4px 8px',borderRadius:6,border:'1px solid #90caf9',color:'#1565c0',fontWeight:600,cursor:'pointer'}} onChange={e=>{
            const code = e.target.value;
            if (!code) {
              document.cookie='googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
              document.cookie='googtrans=;path=/;domain='+window.location.hostname+';expires=Thu, 01 Jan 1970 00:00:00 GMT';
              window.location.reload();
              return;
            }
            document.cookie='googtrans=/en/'+code+';path=/';
            document.cookie='googtrans=/en/'+code+';path=/;domain='+window.location.hostname;
            const sel=document.querySelector('#google_translate_element select');
            if(sel){sel.value=code;sel.dispatchEvent(new Event('change'));}
            else window.location.reload();
          }}>
            {langMap.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          <span style={{fontSize:11,color:'#1565c0',fontWeight:600}}>Worker Rights Calculation</span>
        </div>
      </div>
      <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}}/></div>

      <div className="pw">
        <div className="hk-hero">
          <h1>Computation Form | Calculation Form | Calculation Form</h1>
          <p>Welcome to the Hakeren Social Benefits Calculation Page. HAKEREN is the prominent Israeli company servicing Foreign Workers in Israel, specializing in precise Social Benefits calculations. Alongside HAKEREN, our team of skilled professionals is dedicated to delivering accurate wage calculations in strict compliance by the law for employers and employing. To obtain a precise salary calculation, kindly complete the form below.</p>
          <p className="b">Hakeren the sole company that meticulously verifies your entitlements to ensure accurate salary assessments. Our commitment extends to confirming whether you have received the precise salary that aligns with your deserving job.</p>
        </div>

        <div className="pay-notice">
          <strong>Important - Payment Notice</strong>
          <span>Results will be sent by email <span style={{color:'#e65100',fontWeight:700}}>only to those who have paid by credit card (Upay)</span>. If you wish to pay by <span style={{color:'#e65100',fontWeight:700,textDecoration:'underline'}}>cash or bank transfer</span>, please contact the Hakeren office directly before submitting this form.</span>
          <span style={{display:'block',marginTop:8,fontWeight:600}}>Phone: 050-5750054 | Phone: 072-2243333</span>
        </div>

        {savedAt&&<div className="draft-bar">
          <span>Draft auto-saved at {savedAt}</span>
          <button onClick={()=>{if(confirm('Clear draft?')){localStorage.removeItem(DRAFT_KEY);setF(INITIAL);setSavedAt(null);}}}>Clear</button>
        </div>}

        {/* Error banner */}
        {showErrs && hasErrs && <div className="err-banner">
          <strong>Please complete all required fields before continuing</strong>
          {Object.values(errs).slice(0,3).map((e,i)=><div key={i}>-{e}</div>)}
          {Object.keys(errs).length>3&&<div>-...and {Object.keys(errs).length-3} more</div>}
        </div>}

        <div className="fc">
          <div className="fc-hdr">
            <span>Page {page} of 4 - {pageTitle}</span>
            <button onClick={saveDraft} style={{padding:'4px 12px',fontSize:11,border:'1px solid rgba(255,255,255,0.5)',borderRadius:3,background:'rgba(255,255,255,0.15)',color:'#fff',cursor:'pointer',fontFamily:'inherit'}}>Save draft</button>
          </div>
          <div className="fc-body">

            {/* ΓòÉΓòÉΓòÉ PAGE 1 ΓòÉΓòÉΓòÉ */}
            {page===1&&<>
              <p className="st">Employee Information:</p>
              <F label="Full Name" req err={E('name')}>
                <input {...inp('name')} value={f.name} onChange={e=>set('name',e.target.value)} onBlur={()=>touch('name')} placeholder="Full name"/>
              </F>
              <F label="Mobile Phone" req err={E('phone')}>
                <input {...inp('phone')} type="tel" value={f.phone} onChange={e=>set('phone',e.target.value)} onBlur={()=>touch('phone')} placeholder="+972 / 05X-XXXXXXX"/>
              </F>
              <F label="Email" req hint="Results will be sent to this email" err={E('email')}>
                <input {...inp('email')} type="email" value={f.email} onChange={e=>set('email',e.target.value)} onBlur={()=>touch('email')} placeholder="worker@example.com"/>
              </F>
              <F label="Passport Number" req err={E('passport')}>
                <input {...inp('passport')} value={f.passport} onChange={e=>set('passport',e.target.value)} placeholder="Passport number"/>
              </F>
              <F label="Upload Your Passport Photo">
                <input type="file" accept="image/*,.pdf" style={{fontSize:13}} onChange={e=>{
                  const file=e.target.files[0];
                  if(!file)return;
                  if(file.size>5*1024*1024){alert('File too large (max 5MB)');e.target.value='';return;}
                  const reader=new FileReader();
                  reader.onload=()=>{setF(p=>({...p,passportFile:reader.result,passportFileName:file.name}));};
                  reader.readAsDataURL(file);
                }}/>
                {f.passportFileName&&<span style={{fontSize:12,color:'#388e3c',marginTop:4,display:'block'}}>{f.passportFileName}</span>}
              </F>
              <F label="Choose Your Nationality" req err={E('nationality')}>
                <select {...inp('nationality')} value={f.nationality} onChange={e=>set('nationality',e.target.value)}>
                  <option value="">Choose Your Nationality</option>
                  {nats.map(n=><option key={n}>{n}</option>)}
                </select>
              </F>
              <div className="field">
                <label>Are you receiving salary through a nursing company or private employer? <span className="req-star">*</span></label>
                <ChkGrp opts={[{v:'private',l:'Private Employer'},{v:'nursing',l:'Nursing Company'}]} vals={f.empSource} on={v=>set('empSource',v)}/>
                <Err msg={E('empSource')}/>
              </div>
              <div className="field">
                <label>Would you like a calculation for PIKADON (deposit amount)? <span className="req-star">*</span></label>
                <Chips val={f.pikadon} on={v=>set('pikadon',v)} opts={YN} hasErr={showErrs&&errs.pikadon}/>
                <Err msg={E('pikadon')}/>
              </div>
              <F label="Full Address: Street, Number and City" req err={E('address')}>
                <input {...inp('address')} value={f.address} onChange={e=>set('address',e.target.value)} placeholder="Street, Number and City"/>
              </F>
            </>}

            {/* ΓòÉΓòÉΓòÉ PAGE 2 ΓòÉΓòÉΓòÉ */}
            {page===2&&<>
              <p className="st">Employer's Information:</p>
              <div className="g2">
                <F label="First Name" req err={E('empFirstName')}>
                  <input {...inp('empFirstName')} value={f.empFirstName} onChange={e=>set('empFirstName',e.target.value)}/>
                </F>
                <F label="Family Name" req err={E('empFamilyName')}>
                  <input {...inp('empFamilyName')} value={f.empFamilyName} onChange={e=>set('empFamilyName',e.target.value)}/>
                </F>
              </div>
              <F label="Address" req err={E('empAddress')}>
                <input {...inp('empAddress')} value={f.empAddress} onChange={e=>set('empAddress',e.target.value)}/>
              </F>
              <div className="g2">
                <F label="Cell phone number">
                  <input {...inp('empCell')} type="tel" value={f.empCell} onChange={e=>set('empCell',e.target.value)} placeholder="number"/>
                </F>
                <F label="Home phone number">
                  <input {...inp('empHome')} type="tel" value={f.empHome} onChange={e=>set('empHome',e.target.value)} placeholder="number"/>
                </F>
              </div>
              <div className="field">
                <label style={{fontSize:13,fontWeight:700,color:'#1565c0'}}>Employer's Contact Person</label>
                <ChkGrp opts={contactOpts} vals={f.empContact} on={v=>set('empContact',v)}/>
              </div>
              <div className="g2">
                <F label="Contact Full Name">
                  <input {...inp('empContactName')} value={f.empContactName} onChange={e=>set('empContactName',e.target.value)}/>
                </F>
                <F label="Contact Phone" err={E('empContactPhone')}>
                  <input {...inp('empContactPhone')} type="tel" value={f.empContactPhone} onChange={e=>set('empContactPhone',e.target.value)} placeholder="number"/>
                </F>
              </div>
            </>}

            {/* ΓòÉΓòÉΓòÉ PAGE 3 ΓòÉΓòÉΓòÉ */}
            {page===3&&<>
              <p className="st">Employment Information:</p>
              <div className="g2">
                <F label="Employment Start Date" req err={E('start')}>
                  <input {...inp('start')} type="date" value={f.start} onChange={e=>set('start',e.target.value)}/>
                </F>
                <F label="Employment End Date" req err={E('end')}>
                  <input {...inp('end')} type="date" value={f.end} onChange={e=>set('end',e.target.value)}/>
                </F>
              </div>
              <div className="field">
                <label style={{fontWeight:700,color:'#1565c0'}}>Reason of Termination <span className="req-star">*</span></label>
                <Chips opts={termOpts} val={f.termReason} on={v=>set('termReason',v)} hasErr={showErrs&&!f.termReason}/>
                <Err msg={E('termReason')}/>
              </div>
              {f.termReason==='resign'&&<div className="field">
                <label style={{fontWeight:700,color:'#1565c0'}}>Why did you resign? <span className="req-star">*</span></label>
                <ChkGrp opts={resignOpts} vals={f.resignReason} on={v=>set('resignReason',v)}/>
                <Err msg={E('resignReason')}/>
              </div>}
              <F label="When did you provide or receive advance notice?" req err={E('noticeDate')}>
                <input {...inp('noticeDate')} type="date" value={f.noticeDate} onChange={e=>set('noticeDate',e.target.value)}/>
              </F>
              <F label="How many advance notice days were given?" req hint="Enter 0 if no advance notice was given">
                <input {...inp('noticeDaysGiven')} type="number" min="0" max="30" value={f.noticeDaysGiven} onChange={e=>set('noticeDaysGiven',e.target.value)} placeholder="0"/>
              </F>
              <p style={{fontSize:14,fontWeight:700,color:'#1565c0',margin:'14px 0 4px'}}>Monthly Salary</p>
              <p style={{fontSize:12,color:'#555',marginBottom:10,lineHeight:1.5,background:'#f5f5f5',padding:'8px 12px',borderRadius:8,border:'1px solid #e0e0e0'}}>
                Your <strong>total salary</strong> = base salary + pocket money.<br/>
                Shabbat payment is calculated separately and is not part of the base salary.
              </p>
              <div className="g2">
                <F label="Base salary per month (NIS)" req err={E('salary')}>
                  <input {...inp('salary')} type="number" min="0" value={f.salary} onChange={e=>set('salary',e.target.value)} placeholder="Amount in NIS"/>
                </F>
                <F label="Pocket money per month (NIS)" hint="Enter 0 if none">
                  <input {...inp('pocketMoney')} type="number" min="0" value={f.pocketMoney} onChange={e=>set('pocketMoney',e.target.value)} placeholder="Amount in NIS"/>
                </F>
              </div>

              <p style={{fontSize:14,fontWeight:700,color:'#1565c0',margin:'14px 0 8px'}}>Salary Updates</p>
              {f.salaryIncreases.map((si,i)=><div key={i} className="sal-blk">
                <button className="rm" onClick={()=>rmSI(i)}>X</button>
                <div className="g2">
                  <F label={`New salary #${i+1} (NIS)`} err={E(`si_${i}_sal`)}>
                    <input {...inp(`si_${i}_sal`)} type="number" min="0" value={si.newSal} onChange={e=>updSI(i,'newSal',e.target.value)} placeholder="NIS"/>
                  </F>
                  <F label="Effective from date" err={E(`si_${i}_date`)}>
                    <input {...inp(`si_${i}_date`)} type="date" value={si.date} onChange={e=>updSI(i,'date',e.target.value)}/>
                  </F>
                </div>
              </div>)}
              <button className="add-btn" onClick={addSI}>+ Add salary increase</button>

              <F label="SHABAT payment (NIS)" hint="Separate from your base salary" err={E('shabat')} style={{marginTop:14}}>
                <input {...inp('shabat')} type="number" min="0" value={f.shabat} onChange={e=>set('shabat',e.target.value)} placeholder="NIS"/>
              </F>

              <div className="field">
                <label style={{fontWeight:700,color:'#1565c0'}}>Do you live at the workplace? <span className="req-star">*</span></label>
                <Chips val={f.liveType} on={v=>set('liveType',v)} opts={[{v:'livein',l:'Live in'},{v:'liveout_clean',l:'Live out - Cleaning'},{v:'construction',l:'Construction'}]} hasErr={showErrs&&errs.liveType}/>
                <Err msg={E('liveType')}/>
              </div>
              <div className="field">
                <label style={{fontWeight:700,color:'#1565c0'}}>Do you work on weekends? <span className="req-star">*</span></label>
                <Chips val={f.worksWeekends} on={v=>set('worksWeekends',v)} opts={YN} hasErr={showErrs&&errs.worksWeekends}/>
                <Err msg={E('worksWeekends')}/>
              </div>
              {f.worksWeekends==='yes'&&<>
                <F label="How many weekends in a month?">
                  <select {...inp('weekendsPerMonth')} style={{maxWidth:200}} value={f.weekendsPerMonth} onChange={e=>set('weekendsPerMonth',e.target.value)}>
                    {['1','2','3','4'].map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                </F>
                <F label="How much do you receive per Shabbat day? (NIS)" hint="The amount your employer pays you for each Shabbat day worked — not the monthly total" err={E('shabat')} style={{marginTop:8}}>
                  <input {...inp('shabat')} type="number" min="0" value={f.shabat} onChange={e=>set('shabat',e.target.value)} placeholder="Amount per single Shabbat"/>
                </F>
              </>}

              <p style={{fontSize:14,fontWeight:700,color:'#1565c0',margin:'16px 0 4px'}}>Vacations in Home Country</p>
              <p style={{fontSize:12,color:'#666',marginBottom:10}}>If you went on vacation to your home country, enter the dates for each trip.</p>
              {f.vacations.map((v,i)=><div key={i} className="vac-blk">
                {f.vacations.length>1&&<button className="rm" onClick={()=>rmV(i)}>X</button>}
                <p style={{fontSize:13,fontWeight:700,color:'#1565c0',marginBottom:10}}>Vacation {i+1}</p>
                <div className="g2">
                  <F label="Departure date" err={E(`vac_${i}_dep`)}>
                    <input {...inp(`vac_${i}_dep`)} type="date" value={v.dep} onChange={e=>updV(i,'dep',e.target.value)}/>
                  </F>
                  <F label="Return date" err={E(`vac_${i}_ret`)}>
                    <input {...inp(`vac_${i}_ret`)} type="date" value={v.ret} onChange={e=>updV(i,'ret',e.target.value)}/>
                  </F>
                </div>
              </div>)}
              <button className="add-btn" onClick={addV}>+ Add vacation</button>

              {(()=>{
                const lessThan1Year = f.start && f.end && ((new Date(f.end) - new Date(f.start)) / (1000*60*60*24)) < 365;
                return <F label="When was the last date you received Recuperation (Avra'a) payment?" hint={lessThan1Year ? "Not applicable — less than 1 year of employment" : "Leave empty if you never received it"} err={E('recuperationDate')} style={{marginTop:14}}>
                  <input {...inp('recuperationDate')} type="date" value={lessThan1Year ? '' : f.recuperationDate} onChange={e=>set('recuperationDate',e.target.value)} disabled={lessThan1Year} style={lessThan1Year ? {opacity:0.5,cursor:'not-allowed'} : {}}/>
                </F>;
              })()}
            </>}

            {/* ΓòÉΓòÉΓòÉ PAGE 4 ΓòÉΓòÉΓòÉ */}
            {page===4&&<>
              <F label="When was the last date you received annual leave (vacation) payment?" hint="Leave empty if you never received it" err={E('annualLeaveDate')}>
                <input {...inp('annualLeaveDate')} type="date" value={f.annualLeaveDate} onChange={e=>set('annualLeaveDate',e.target.value)}/>
              </F>
              <F label="Which holidays do you celebrate?" req err={E('holidayType')}>
                <select {...inp('holidayType')} value={f.holidayType} onChange={e=>set('holidayType',e.target.value)}>
                  <option value="">Select your holidays</option>
                  {holidayTypeOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </F>
              <F label="When was the last date you received holiday payment?" hint="Leave empty if you never received it" err={E('holidaysDate')} style={{marginTop:12}}>
                <input {...inp('holidaysDate')} type="date" value={f.holidaysDate} onChange={e=>set('holidaysDate',e.target.value)}/>
              </F>
              <F label="How many holiday days were you paid from the beginning of the civil year until today?" req err={E('holidayDaysWorked')} hint="Maximum 9 days per year">
                <input {...inp('holidayDaysWorked')} type="number" min="0" max="9" value={f.holidayDaysWorked} onChange={e=>set('holidayDaysWorked',e.target.value)} placeholder="0-9"/>
              </F>
              <div className="field" style={{marginTop:12}}>
                <label style={{fontWeight:700,color:'#1565c0'}}>Did you have an existing pension arrangement before starting this job? <span className="req-star">*</span></label>
                <Chips val={f.existingPension} on={v=>set('existingPension',v)} opts={YN} hasErr={showErrs&&errs.existingPension}/>
                <Err msg={E('existingPension')}/>
                <p className="hint">If yes, pension is calculated from day 1. If no, pension starts from month 7.</p>
              </div>
              <div className="g2" style={{marginTop:12}}>
                <div className="field">
                  <label style={{fontWeight:700,color:'#1565c0'}}>Did you get paid for Pension? <span className="req-star">*</span></label>
                  <Chips val={f.pensionPaid} on={v=>set('pensionPaid',v)} opts={YN} hasErr={showErrs&&errs.pensionPaid}/>
                  <Err msg={E('pensionPaid')}/>
                </div>
                <div className="field">
                  <label style={{fontWeight:700,color:'#1565c0'}}>Did you get paid for compensation (severance)? <span className="req-star">*</span></label>
                  <Chips val={f.severancePaid} on={v=>set('severancePaid',v)} opts={YN} hasErr={showErrs&&errs.severancePaid}/>
                  <Err msg={E('severancePaid')}/>
                </div>
              </div>
              <div className="field">
                <label style={{fontWeight:700,color:'#1565c0'}}>Did you sign an employment agreement? <span className="req-star">*</span></label>
                <Chips val={f.agreement} on={v=>set('agreement',v)} opts={YN} hasErr={showErrs&&errs.agreement}/>
                <Err msg={E('agreement')}/>
              </div>
              {f.agreement==='yes'&&<F label="Upload your employment agreement:">
                <input type="file" accept=".pdf,.doc,.docx,image/*" style={{fontSize:13}} onChange={e=>{
                  const file=e.target.files[0];
                  if(!file)return;
                  if(file.size>5*1024*1024){alert('File too large (max 5MB)');e.target.value='';return;}
                  const reader=new FileReader();
                  reader.onload=()=>{setF(p=>({...p,agreementFile:reader.result,agreementFileName:file.name}));};
                  reader.readAsDataURL(file);
                }}/>
                {f.agreementFileName&&<span style={{fontSize:12,color:'#388e3c',marginTop:4,display:'block'}}>{f.agreementFileName}</span>}
              </F>}
              <div className="field" style={{marginTop:12}}>
                <label style={{fontWeight:700,color:'#1565c0'}}>Do you need to calculate the last month's salary? <span className="req-star">*</span></label>
                <Chips val={f.lastSalaryNeeded} on={v=>set('lastSalaryNeeded',v)} opts={YN} hasErr={showErrs&&errs.lastSalaryNeeded}/>
                <Err msg={E('lastSalaryNeeded')}/>
                <p className="hint">Select "Yes" if the employer did not pay the last month's salary</p>
              </div>
              {f.lastSalaryNeeded==='yes'&&<F label="Last date salary was paid" hint="The last date you received salary payment" err={E('lastSalaryDate')}>
                <input {...inp('lastSalaryDate')} type="date" value={f.lastSalaryDate} onChange={e=>set('lastSalaryDate',e.target.value)}/>
              </F>}
              <F label="Additional comments or information:">
                <textarea {...inp('comments')} style={{...inp('comments').style,minHeight:80,resize:'vertical'}} value={f.comments} onChange={e=>set('comments',e.target.value)}/>
              </F>
            </>}

            {/* Navigation */}
            {sendError&&<div className="err-banner" style={{marginTop:12}}>
              <strong>Submission failed - please try again</strong>
              {sendError}
            </div>}
            <div className="nav">
              <div style={{display:'flex',gap:8}}>
                {page>1&&<button className="btn-o" onClick={()=>{setShowErrs(false);setSendError(null);setPage(p=>p-1);topRef.current?.scrollIntoView({behavior:'smooth'});}}>Previous</button>}
                <button className="btn-g" onClick={saveDraft}>Save draft</button>
              </div>
              {page<4
                ?<button className="btn-b" onClick={tryNext}>Next</button>
                :<button
                    className="btn-b"
                    disabled={sending}
                    style={{opacity:sending?0.7:1,minWidth:160}}
                    onClick={async()=>{
                      setShowErrs(true);
                      if(hasErrs) return;
                      setSending(true);
                      setSendError(null);
                      try {
                        await submitToMake(f);
                        localStorage.removeItem(DRAFT_KEY);
                        setSubmitted(true);
                      } catch(e) {
                        setSendError(e.message || 'Network error. Check your connection.');
                        topRef.current?.scrollIntoView({behavior:'smooth'});
                      } finally {
                        setSending(false);
                      }
                    }}>
                    {sending ? 'Sending...' : 'Send Form'}
                  </button>
              }
            </div>
          </div>
        </div>

        <div className="hk-ftr">
          <p>All calculation forms for foreign workers' rights in Israel created by the Foundation are exclusively owned and protected by copyright. It is prohibited to copy, duplicate or reproduce any content from the website or the forms provided.</p>
          <p>All rights reserved by the Israeli Foundation for Foreign Worker Rights. (C)</p>
          <p>All forms for Social Benefits Calculation for foreign workers in Israel created by Hakeren are proprietary and copyrighted materials. Any unauthorized reproduction, copying, or duplication of content from this website or the forms provided is strictly prohibited. Hakeren reserves all rights. (C)</p>
        </div>
      </div>

    </>
  );
}
