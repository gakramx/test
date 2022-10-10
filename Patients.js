const { fetchAllPatients } = require("../Fetch/patients/fetchAll")
const { searchPatient } = require("../Fetch/patients/search")
const { filterPatient } = require("../Fetch/patients/filter")
const { filterstag } = require("../Fetch/patients/filterstag")
const { fetchOneAccount } = require("../Fetch/accounts/fetchOne")
const { addHeader } = require('../header')
const app = document.querySelector("#app")


document.querySelector("#dashboard").addEventListener("click", async () => {
  const patients = await fetchAllPatients()
  const accounts_btn = document.querySelector("#accounts");

  //const user = await fetchOneAccount(userid)
  if(user.is_admin=="Non"){

    accounts_btn.classList.add("disable_a_href")
  }
  addHeader("Gestion Stagiaires")
  app.innerHTML = ""
  const fdata = document.createElement("div")

  fdata.classList.add("justify-content-center")

fdata.style.marginBottom = "2px"
fdata.style.marginLeft = "20%"
fdata.style.marginRight = "20%"
/*
$('.datepicker').datepicker({
  language: 'fr'
});*/
$.fn.datepicker.defaults.language = 'fr';
fdata.insertAdjacentHTML(
    'beforeend',
    ` <form class="form-inline">
    <div class="form-group row">
    <div class="col-md-2" >
<label for="" ><b>Recherche </b> </label>
</div>
  <div class="col-md-4">

    <input type="text" id="search" class="form-control" placeholder="Recherche">


  </div>
  <div class="col-auto" >
  <select id="search_opt"  class="form-control">
  <option selected value="nin">N°insc</option>
  <option value="nom"> Nom</option>
</select>
  </div>
</div>
<br>
    <div class="form-group row">
    <div class="col-md-2" >
<label for="" ><b>Options Filtrage </b> </label>
</div>
  <div class="col-md-3">
  <div id="datepicker" class="input-group date" data-provide="datepicker" data-date-format="dd/mm/yyyy"> 
  <input  class="form-control"  type="text" placeholder="Date d'inscription">
    <span class="add-on"><i class="icon-th"></i></span>
   </div>

  </div>
  <div class="col-auto">
  <select id="fili"  class="form-control">
  <option value="toutes" disabled selected>Filière</option>
  <option value="TSDI">TSDI</option>
  <option value="TDI">TDI</option>
  <option value="TSSRI">TSSRI</option>
  <option value="TSRI">TSRI</option>
  <option value="TSGE">TSGE</option>
  <option value="OS">OS</option>
  <option value="TGI">TGI</option>
  <option value="Autre">Autre</option>
  <option value="toutes">Toutes</option>
</select>
  </div>
  <div class="col-auto" >
  <select id="dretd"  class="form-control">
  <option value="toutes" disabled selected>Niveau Formation</option>
  <option value="Une Année">Une Année</option>
  <option value="1er Année">1er Année</option>
  <option value="2ème Années">2ème Année</option>
  <option value="3ème Année">3ème Année</option>
  <option value="Autre">Autre</option>
  <option value="toutes">Toutes</option>
</select>
  </div>
 
  <div class="col-auto" >
  <h5 id="result-list"> </h5>
  </div>
</div>
<br>
  </form>`)

  console.log("USER:",user)
  fdata.appendChild(AddpatientsBtn())
  
  fdata.appendChild(btnlist())
  
  app.appendChild(fdata)
  const result_p= document.querySelector("#result-list")

  // app.appendChild(date)
 

  const patientsList = document.createElement("div")
  patientsList.setAttribute("id", "patients-list")
  patientsList.appendChild(createPatientsList(patients, "patients"))
  app.appendChild(patientsList)
  //app.classList.add(".bg-info")
  const search = document.querySelector("#search");
  search.addEventListener('input', async (e) => {

    if (e.target.value != ''){
      
  var search_opt = document.getElementById("search_opt");
  if(search_opt.value == "nom"){
      const patientsResult = await searchPatient("FL_NAME",e.target.value)
      document.querySelector("#result-list").innerHTML = ""
      result_p.innerText="Résultat: " + Object.keys(patientsResult).length;
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(patientsResult, "patients"))
    }
    else{
      const patientsResult = await searchPatient("NIN",e.target.value)
      document.querySelector("#result-list").innerHTML = ""
      result_p.innerText="Résultat: " + Object.keys(patientsResult).length;
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(patientsResult, "patients"))

    }
  } else {

      const patients = await fetchAllPatients()
      document.querySelector("#result-list").innerHTML = ""
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(patients, "patients"))

    }
  })
  var fili_opt = document.getElementById("fili");
  var dretd_opt = document.getElementById("dretd");
  var btnlist1 = document.getElementById("btnlist");
  btnlist1.disabled = true;
  fili_opt.addEventListener('change', async function() {
    if(fili_opt.value=="toutes" && dretd_opt.value=="toutes"){
      const patients = await fetchAllPatients()
      btnlist1.disabled = true;
      document.querySelector("#result-list").innerHTML = ""
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(patients, "patients"))
    }
    else{
      const stagResult = await filterstag(fili_opt.value,dretd_opt.value)
      btnlist1.disabled = false;
      document.querySelector("#result-list").innerHTML = ""
      result_p.innerText="Résultat: " + Object.keys(stagResult).length;
      console.log(stagResult)
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(stagResult, "patients"))
    }

  });
  dretd_opt.addEventListener('change', async function() {
    if(fili_opt.value=="toutes" && dretd_opt.value=="toutes"){
      btnlist1.disabled = true;
      const patients = await fetchAllPatients()
      document.querySelector("#result-list").innerHTML = ""
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(patients, "patients"))
    }
    else{
      btnlist1.disabled = false;
      const stagResult = await filterstag(fili_opt.value,dretd_opt.value)
      document.querySelector("#result-list").innerHTML = ""
      result_p.innerText="Résultat: " + Object.keys(stagResult).length;
      document.querySelector("#patients-list").innerHTML = ""
      document.querySelector("#patients-list").appendChild(createPatientsList(stagResult, "patients"))
    }
  });



  $('#datepicker').on('changeDate', async function() {
    var sdate= $('#datepicker').data('datepicker').getFormattedDate('dd-mm-yyyy');
    //var sdate=$('#datepicker').datepicker('getFormattedDate');
    console.log(sdate)
    const patientsResult = await filterPatient(sdate)
    document.querySelector("#result-list").innerHTML = ""
    result_p.innerText="Résultat: " + Object.keys(patientsResult).length;
   // document.querySelector("#result-list").innerHTML = ""
   // result_p.innerText="Résultat: " + Object.keys(patientsResult).length;
    document.querySelector("#patients-list").innerHTML = ""
    console.log(patientsResult)
    document.querySelector("#patients-list").appendChild(createPatientsList(patientsResult, "patients"))
  });
  $('#datepicker').on('clearDate', async function() {
  //  document.querySelector("#result-list").innerHTML = ""
  refersh_patients();
   // const patients = await fetchAllPatients()
    document.querySelector("#result-list").innerHTML = ""
   // document.querySelector("#patients-list").innerHTML = ""
   // document.querySelector("#patients-list").appendChild(createPatientsList(patients, "patients"))
  });
})
const AddpatientsBtn = () => {
  const addClientsBtn = document.createElement("Button")
  addClientsBtn.classList.add("btn", "btn-dark")
  addClientsBtn.setAttribute("style","margin-left:18%;color: white;background-color: rgba(0, 69, 158, 1)")
  addClientsBtn.innerText = "Ajouter Stagiaire"
  //addClientsBtn.style.paddingTop ="10px"
 // addClientsBtn.style.marginLeft = "460px"
  if(user.add=="Non"){
    addClientsBtn.disabled=true
  }
  addClientsBtn.addEventListener("click", () => {
    createAddPatientsWindow()
  })
  return addClientsBtn
}
const btnlist = () => {
  const addClientsBtn = document.createElement("Button")
  addClientsBtn.classList.add("btn", "btn-dark")
  addClientsBtn.setAttribute("id", "btnlist")
  addClientsBtn.setAttribute("style","margin-left:20%;width:16%; color: white;background-color: rgba(0, 69, 158, 1);")
  addClientsBtn.innerText = " Liste  Stagiaire "
  //addClientsBtn.style.paddingTop ="10px"
 // addClientsBtn.style.marginLeft = "460px"
  
  addClientsBtn.addEventListener("click", async () => {
    var fili_opt = document.getElementById("fili");
    var dretd_opt = document.getElementById("dretd");
    const stagResult = await filterstag(fili_opt.value,dretd_opt.value)
    createListWindow(stagResult)
  })
  return addClientsBtn
}

  const createListWindow = (patients) => {
  const remote = require('electron').remote
  const BrowserWindow = remote.BrowserWindow
  const ipc = remote.ipcMain
  let listwindow = new BrowserWindow({
   //frame: false,
    webPreferences: {
    devTools: false,
      nodeIntegration: true,
      enableRemoteModule: true,contextIsolation: false
    }
  })
 // listwindow.setSize(830, 550);
  listwindow.center();
  listwindow.removeMenu(true);
  listwindow.webContents.on("did-finish-load", () => {
    listwindow.webContents.send('patient-data', patients);
   
  })

  listwindow.on("close", () => {
    listwindow = null
  })
  listwindow.loadFile('./Report/list.html')
  listwindow.maximize()
}

async function refersh_patients(){
  const patients = await fetchAllPatients()
  document.querySelector("#result-list").innerHTML = ""
  document.querySelector("#patients-list").innerHTML = ""
  document.querySelector("#patients-list").appendChild(createPatientsList(patients, "patients"))
}

function createAddPatientsWindow() {
  const remote = require('electron').remote
  const BrowserWindow = remote.BrowserWindow
  const ipc = remote.ipcMain
  let patientsWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      devTools: false,
      nodeIntegration: true, enableRemoteModule: true,contextIsolation: false
    }
  })
  ipc.on("reply-patients", async (event, message) => {
    refersh_patients();
  })
 patientsWindow.removeMenu(true);
  patientsWindow.setSize(1200, 700);
  patientsWindow.center();
  patientsWindow.on("close", () => {
    patientsWindow = null
  })
  patientsWindow.loadFile('./windows/AddPatients/AddPatients.html')
}
const createPatientsList = (patients, type) => {
  const pageContent = document.createElement("div")
  pageContent.style.overflowY = "auto"
 // pageContent.style.height = "50%"
  pageContent.style.marginBottom="20%"

  pageContent.classList.add("page-content", "page-container")
  pageContent.setAttribute("id", "page-content")

  const padding = document.createElement("div")
  padding.classList.add("padding")
  
  const rowContainer = document.createElement("div")
  rowContainer.classList.add("row", "d-flex", "justify-content-center", "flex-row",  "flex-wrap")

  const grid = document.createElement("div")
  grid.classList.add("col-lg-12", "grid-margin", "stretch-card")

  const card = document.createElement("div")
  card.classList.add("card")
 


  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  



  const tableRes = document.createElement("div")
  tableRes.classList.add("table-responsive")

  const table = document.createElement("table")
  table.classList.add("table")

  //

  // table.setAttribute("style","overflow-x:hidden;overflow-y:auto;height:100%;width:200px;")
  const thead = document.createElement("thead")
  const tr1 = document.createElement("tr")

   const thni = document.createElement("th")
  thni.innerText = "N° insc"
  const thname = document.createElement("th")
  thname.innerText = "Nom et Prénom"
  const ths_ctl = document.createElement("th")
  ths_ctl.innerText = "Paiements"
  const thas_medicale = document.createElement("th")
  thas_medicale.innerText = "Bourse"
  //const thadresse = document.createElement("th")
  //thadresse.innerText = "Adresse"
  const thresult = document.createElement("th")
  thresult.innerText = "Détails Paiements"
  //const thprice = document.createElement("th")
  //   thprice.innerText = "Prix"
  //const thage = document.createElement("th")
  //thage.innerText = "Âge"

  const thpsr = document.createElement("th")
  thpsr.innerText = "Niveau Formation"

  const thfiliere = document.createElement("th") //
  thfiliere.innerText = "Filière"
  const thcdate = document.createElement("th")
  thcdate.innerText = "Date d'inscription"
 
  const thAction = document.createElement("th")
  thAction.innerHTML="Opérations"

  const tbody = document.createElement("tbody")

  patients.forEach(p => {
    let currentPatients = createPatientsCard(p, type)
    tbody.appendChild(currentPatients)
  })


  tr1.appendChild(thni)
  tr1.appendChild(thname)
  //tr1.appendChild(thadresse)
  tr1.appendChild(ths_ctl)
  tr1.appendChild(thas_medicale)
  // tr1.appendChild(thas_medicale)
  tr1.appendChild(thresult)
  //  tr1.appendChild(thprice)
  //tr1.appendChild(thage)
  tr1.appendChild(thpsr)
  tr1.appendChild(thfiliere)
  tr1.appendChild(thcdate)
 
  tr1.appendChild(thAction)

  thead.appendChild(tr1)

  table.appendChild(thead)
  table.appendChild(tbody)

  tableRes.appendChild(table)

  // cardBody.appendChild(cardTitle)
  // cardBody.appendChild(cardDes)
  cardBody.appendChild(tableRes)

  card.appendChild(cardBody)
  grid.appendChild(card)
  rowContainer.appendChild(grid)
  padding.appendChild(rowContainer)
  pageContent.appendChild(padding)
  return pageContent
}
const createPatientsCard = (patients, type) => {
  const tr = document.createElement("tr")
    const thni = document.createElement("td")
   thni.innerText = patients.NIN
  const thname = document.createElement("td")
  thname.innerText = patients.FL_NAME
 // const thaddrese = document.createElement("td")
 // thaddrese.innerText = patients.ADRESSE
  const ths_ctl = document.createElement("td")
  ths_ctl.classList.add("text-center")
  const space = document.createElement('h5');
  const badge = document.createElement('span');
  badge.setAttribute("class","badge rounded-pill bg-success");
  badge.textContent= patients.s_ctl
  space.appendChild(badge)
  ths_ctl.appendChild(space);
  //ths_ctl.innerText = patients.S_CTL

  const thas_medicale = document.createElement("td")
  thas_medicale.classList.add("text-center")
  const space1 = document.createElement('h5');
  const badge1 = document.createElement('span');
  badge1.setAttribute("class","badge rounded-pill bg-primary");
  badge1.textContent= patients.BOUR
  space1.appendChild(badge1)
  thas_medicale.appendChild(space1);
  //thas_medicale.innerText = patients.AS_MEDICALE
  ////  const thadresse = document.createElement("td")
  //   thadresse.innerText = patients.ADRESSE




  const thpsr = document.createElement("td")
  thpsr.classList.add("text-center")
  const space3 = document.createElement('h5');
  const badge3 = document.createElement('span');
  badge3.setAttribute("class","badge rounded-pill bg-primary");
  badge3.textContent= patients.DURE
  space3.appendChild(badge3)
  thpsr.appendChild(space3);

  
  const thfiliere= document.createElement("td")
   thfiliere.innerText = patients.FILI
  const  tdresult = document.createElement("td")
  tdresult.classList.add("text-center")
  const thresult = document.createElement("a")
  thresult.setAttribute("href", "#")

  thresult.style.textDecoration="none"
  //   const space2 = document.createElement('h6');
  const badge2 = document.createElement('span');
  badge2.setAttribute("class","badge rounded-pill bg-warning text-dark");
  badge2.textContent= "Détails"

  // space2.appendChild(badge2)
  if(user.p_modify=="Non"){
    thresult.classList.add("disable_a_href")
  }
  thresult.appendChild(badge2);
  tdresult.appendChild(thresult);
  
 
  thresult.addEventListener("click", () => {

    createResultWindow(patients)
  })
  const createResultWindow = (patients) => {
    const remote = require('electron').remote
    const BrowserWindow = remote.BrowserWindow
    const ipc = remote.ipcMain
    let resulttWindow = new BrowserWindow({
        //  frame: false,
      webPreferences: {
      devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true,contextIsolation: false
      }
    })
    // resulttWindow.setSize(700, 680);
    resulttWindow.maximize();
    resulttWindow.center();
    ipc.on("reply-rpatients", async (event, message) => {
      refersh_patients();
            })
    resulttWindow.webContents.on("did-finish-load", () => {
      resulttWindow.webContents.send('patint-data', patients.id);
      resulttWindow.webContents.send('account-data', account_id);
    })
   resulttWindow.removeMenu(true);
    resulttWindow.on("close", () => {
      resulttWindow = null
    })
    resulttWindow.loadFile('./windows/ShowResult/ShowResult.html')
    //  resulttWindow.maximize()

  }
  //const thprice = document.createElement("td")
  //  thprice.innerText = patients.PRICE + " DH"
 // const thage = document.createElement("td")
  //thage.innerText = patients.DN
  const thcdate = document.createElement("td")
  //var date = new Date( patients.DS);
  var date = new Date( patients.DS);
  thcdate.innerText = date.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'});
 // thcdate.innerText = patients.DS;
  

  const tdAction = document.createElement("td")



  const infotLink = document.createElement("a")
  infotLink.setAttribute("href", "#")
  infotLink.setAttribute("style", "margin-right:10px;")
  infotLink.classList.add("fas","fa-info-circle","fa-2x")
  infotLink.style.textDecoration="none"

  const editLink = document.createElement("a")
  editLink.setAttribute("href", "#")
  editLink.setAttribute("style", "margin-right:10px;")
  editLink.classList.add("fas","fa-edit","fa-2x")
  editLink.style.textDecoration="none"

  const printLink = document.createElement("a")
  printLink.setAttribute("href", "#")
  printLink.setAttribute("style", "margin-right:10px;")
  printLink.classList.add("fas","fa-print","fa-2x")
  printLink.style.textDecoration="none"

  


  if(user.modify=="Non"){
    editLink.classList.add("disable_a_href")
  }


  editLink.addEventListener("click", () => {

    createEditPatientsWindow(patients)
  })
  const createEditPatientsWindow = (patients) => {
    const remote = require('electron').remote
    const BrowserWindow = remote.BrowserWindow
    const ipc = remote.ipcMain
    let patientWindow = new BrowserWindow({
      frame: false,
      webPreferences: {
        devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true,contextIsolation: false
      }
    })
    patientWindow.setSize(1200, 700);
    patientWindow.center();
    patientWindow.removeMenu(true);
    ipc.on("reply-mpatients", async (event, message) => {
      var fili_opt = document.getElementById("fili");
  var dretd_opt = document.getElementById("dretd");
      if(fili_opt.value!="toutes" && dretd_opt.value!="toutes"){
        const stagResult = await filterstag(fili_opt.value,dretd_opt.value)

        document.querySelector("#result-list").innerHTML = ""
         document.querySelector("#result-list").innerText="Résultat: " + Object.keys(stagResult).length;
        document.querySelector("#patients-list").innerHTML = ""
        document.querySelector("#patients-list").appendChild(createPatientsList(stagResult, "patients"))
      }
      else{
        refersh_patients();
      }
    })
    patientWindow.webContents.on("did-finish-load", () => {
      patientWindow.webContents.send('patient-data', patients.id);
    })

    patientWindow.on("close", () => {
      patientWindow = null
    })
    patientWindow.loadFile('./windows/ModifyPatients/ModifyPatients.html')
    //   patientWindow.maximize()

  }
  printLink.addEventListener("click", () => {

    createPrintWindow(patients)
  })
  const createPrintWindow = (patients) => {
    const remote = require('electron').remote
    const BrowserWindow = remote.BrowserWindow
    const ipc = remote.ipcMain
    let printWindow = new BrowserWindow({
    // frame: false,
      webPreferences: {
       devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true,contextIsolation: false
      }
    })
  //  printWindow.setSize(800, 700);
  printWindow.center();
    printWindow.removeMenu(true);
    printWindow.webContents.on("did-finish-load", () => {
      printWindow.webContents.send('patient-data', patients.id);
    })

    printWindow.on("close", () => {
      printWindow = null
    })
    printWindow.loadFile('./Report/print.html')
    printWindow.maximize()

  }
  





  const deleteLink = document.createElement("a")


  deleteLink.setAttribute("href", "#")

  deleteLink.classList.add("fas","fa-trash-alt","fa-2x")


  if(user.delete=="Non"){
    deleteLink.classList.add("disable_a_href")
  }

  deleteLink.addEventListener("click", () => {
    Swal.fire({
      title: 'Etes vous sûr ?',
      text: "Vous ne pouvez pas récupérer cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,Supprimer ceci !'
    }).then((result) => {
      if (result.isConfirmed) {
        var host_var;
        const storage =  require('electron-json-storage')
        var data_info = storage.getSync('userinfo');
        host_var = data_info.host;

        fetch("http://"+host_var+"/api/patients/"+patients.id+"", {
          method: "DELETE"
        })
        Swal.fire(
          'Supprimé!',
          'avec succès'
        )
      }
      refersh_patients();
    })


  })
  infotLink.addEventListener("click", () => {
  
    createInfoWindow(patients)

  })

  const createInfoWindow = (patients) => {
    const remote = require('electron').remote
    const BrowserWindow = remote.BrowserWindow
    const ipc = remote.ipcMain
    let printWindow = new BrowserWindow({
     frame: false,
      webPreferences: {
       devTools: false,
        nodeIntegration: true,
        enableRemoteModule: true,contextIsolation: false
      }
    })
   printWindow.setSize(830, 550);
  printWindow.center();
   printWindow.removeMenu(true);
    printWindow.webContents.on("did-finish-load", () => {
      printWindow.webContents.send('patient-data', patients);
    })

    printWindow.on("close", () => {
      printWindow = null
    })
    printWindow.loadFile('./Report/info.html')
    //printWindow.maximize()

  }
  tdAction.appendChild(infotLink)
  tdAction.appendChild(editLink)

  tdAction.appendChild(printLink)
  tdAction.appendChild(deleteLink)


   tr.appendChild(thni)
  tr.appendChild(thname)
 // tr.appendChild(thaddrese)
  tr.appendChild(ths_ctl)
  tr.appendChild(thas_medicale)

  // tr.appendChild(thadresse)
  tr.appendChild(tdresult)
  // tr.appendChild(thprice)
  tr.appendChild(thpsr)
  tr.appendChild(thfiliere)

  tr.appendChild(thcdate)
  tr.appendChild(tdAction)
  return tr
}
