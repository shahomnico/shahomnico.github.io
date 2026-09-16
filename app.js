const WHATSAPP_NUMBER = "9055734067"; // e.g. 9198XXXXXXXX
const ADMIN_PIN = "1234"; // Change this before launch.
const pages=["home","services","apply","status","contact"];
const services=["PAN Card Assistance","Aadhaar Assistance","Voter ID Assistance","Passport Application Assistance","Government Form Filling","Certificate Applications","GST Assistance","Udyam Assistance","FSSAI Assistance","Banking & Financial Documents","Other Online Services"];

function showPage(id){pages.forEach(p=>document.getElementById(p)?.classList.toggle("active",p===id));document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===id));document.getElementById("mobileMenu")?.classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});}
function toggleMenu(){document.getElementById("mobileMenu").classList.toggle("open")}
function selectService(name){document.getElementById("service").value=name;showPage("apply")}
function getRequests(){return JSON.parse(localStorage.getItem("soc_requests")||"[]")}
function saveRequests(r){localStorage.setItem("soc_requests",JSON.stringify(r))}
function submitRequest(e){
 e.preventDefault();const service=document.getElementById("service").value,name=document.getElementById("name").value.trim(),mobile=document.getElementById("mobile").value.trim(),details=document.getElementById("details").value.trim();
 if(!service||!name||!mobile)return;
 const ref="SOC-"+Math.floor(100000+Math.random()*900000);const request={ref,service,name,mobile,details,status:"New",created:new Date().toISOString()};const arr=getRequests();arr.unshift(request);saveRequests(arr);
 const box=document.getElementById("requestResult");box.classList.remove("hidden");box.innerHTML=`<strong>Request created successfully.</strong><br>Reference: <b>${ref}</b><br><small>Save this number. You can also send the request to Shah Omni Co. on WhatsApp.</small><div class="actions"><button class="primary" onclick="sendWhatsApp('${ref}')">Send on WhatsApp</button><button class="secondary" onclick="showPage('status');document.getElementById('statusRef').value='${ref}'">Check Status</button></div>`;
 document.getElementById("applyForm").reset();
}
function sendWhatsApp(ref){const r=getRequests().find(x=>x.ref===ref);if(!r)return;const msg=`Shah Omni Co. Service Request%0AReference: ${r.ref}%0AService: ${r.service}%0AName: ${r.name}%0AMobile: ${r.mobile}%0ARequirement: ${r.details||"Not specified"}`;if(!WHATSAPP_NUMBER||WHATSAPP_NUMBER.startsWith("REPLACE")){alert("Add your WhatsApp number in app.js first.");return}window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,'_blank')}
function checkStatus(){const ref=document.getElementById("statusRef").value.trim().toUpperCase(),box=document.getElementById("statusResult"),r=getRequests().find(x=>x.ref===ref);if(!r){box.innerHTML="<p style='color:#a33'>No request found on this device. If you submitted through another phone, contact Shah Omni Co. with your reference number.</p>";return}box.innerHTML=`<div class="notice"><strong>${r.status}</strong><p><b>Reference:</b> ${r.ref}<br><b>Service:</b> ${r.service}<br><b>Submitted:</b> ${new Date(r.created).toLocaleString()}</p></div>`}
function openAdmin(){const pin=prompt("Enter admin PIN");if(pin!==ADMIN_PIN){alert("Incorrect PIN");return}document.getElementById("adminPanel").classList.remove("hidden");renderAdmin()}
function closeAdmin(){document.getElementById("adminPanel").classList.add("hidden")}
function renderAdmin(){const rows=document.getElementById("adminRows"),req=getRequests();document.getElementById("adminCount").textContent=req.length;rows.innerHTML=req.length?req.map((r,i)=>`<div class="admin-row"><div><b>${r.ref}</b><small>${new Date(r.created).toLocaleString()}</small><span>${r.name} • ${r.mobile}</span><span>${r.service}</span><p>${r.details||"No description"}</p></div><div><select onchange="updateStatus(${i},this.value)"><option ${r.status==='New'?'selected':''}>New</option><option ${r.status==='In Progress'?'selected':''}>In Progress</option><option ${r.status==='Completed'?'selected':''}>Completed</option><option ${r.status==='Need Information'?'selected':''}>Need Information</option></select><button class="secondary" onclick="sendWhatsApp('${r.ref}')">WhatsApp</button></div></div>`).join(""):"<p>No requests yet.</p>"}
function updateStatus(index,status){const req=getRequests();if(req[index]){req[index].status=status;saveRequests(req);renderAdmin()}}
function clearAllRequests(){if(confirm("Delete all locally stored requests on this device?")){localStorage.removeItem("soc_requests");renderAdmin()}}
function installApp(){alert("On Android Chrome: open the hosted app, tap ⋮, then choose 'Add to Home screen' or 'Install app' when available.")}
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
showPage("home");
